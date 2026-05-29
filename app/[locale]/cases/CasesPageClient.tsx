"use client";

import { useCallback, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import { useTranslations } from "next-intl";
import CaseCard from "@/components/cases/CaseCard";
import CaseFilter, {
  type FilterState,
  type SortOption,
  getPackageTier,
  matchesSizeRange,
} from "@/components/cases/CaseFilter";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface CaseItem {
  id: string;
  slug: string;
  title: string;
  industry: string;
  clientName: string;
  packageName: string;
  timeline: string;
  result: string;
  tags: string[];
  pages: string[];
  featured: boolean;
  coverImage?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface CasesPageClientProps {
  cases: CaseItem[];
  industries: string[];
}

/* ------------------------------------------------------------------ */
/*  localStorage helpers                                               */
/* ------------------------------------------------------------------ */
const VIEW_STORAGE_KEY = "cases-view-mode";

function getSavedViewMode(): "grid" | "list" {
  if (typeof window === "undefined") return "grid";
  try {
    const saved = localStorage.getItem(VIEW_STORAGE_KEY);
    if (saved === "grid" || saved === "list") return saved;
  } catch {
    /* localStorage may be unavailable */
  }
  return "grid";
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function CasesPageClient({
  cases,
  industries,
}: CasesPageClientProps) {
  const t = useTranslations("cases");

  /* ---- State (initialize from localStorage on client) ---- */
  const [filters, setFilters] = useState<FilterState>({
    industry: null,
    package: null,
    sizeRange: null,
    search: "",
    sort: "newest",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">(() =>
    getSavedViewMode(),
  );

  /* Persist view mode on change */
  const handleViewModeChange = useCallback((mode: "grid" | "list") => {
    setViewMode(mode);
    try {
      localStorage.setItem(VIEW_STORAGE_KEY, mode);
    } catch {
      /* ignore */
    }
  }, []);

  /* ---- Derived data ---- */
  const packages = useMemo(
    () => [...new Set(cases.map((c) => c.packageName))].sort(
      (a, b) => getPackageTier(a) - getPackageTier(b),
    ),
    [cases],
  );

  /* ---- Filter + Sort ---- */
  const filteredCases = useMemo(() => {
    const result = cases.filter((c) => {
      /* Industry */
      if (filters.industry && c.industry !== filters.industry) return false;
      /* Package */
      if (filters.package && c.packageName !== filters.package) return false;
      /* Size range */
      if (filters.sizeRange && !matchesSizeRange(c.pages.length, filters.sizeRange)) {
        return false;
      }
      /* Search */
      if (filters.search) {
        const q = filters.search.toLowerCase();
        return (
          c.title.toLowerCase().includes(q) ||
          c.clientName.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q) ||
          c.result.toLowerCase().includes(q)
        );
      }
      return true;
    });

    /* Sort */
    const sortFn: Record<SortOption, (a: CaseItem, b: CaseItem) => number> = {
      newest: (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      oldest: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      "package-high": (a, b) =>
        getPackageTier(b.packageName) - getPackageTier(a.packageName),
      "package-low": (a, b) =>
        getPackageTier(a.packageName) - getPackageTier(b.packageName),
      "size-large": (a, b) => b.pages.length - a.pages.length,
      "size-small": (a, b) => a.pages.length - b.pages.length,
    };

    result.sort(sortFn[filters.sort]);
    return result;
  }, [cases, filters]);

  /* ---- Render ---- */
  return (
    <>
      {/* Hero */}
      <section className="pb-8 pt-20 md:pb-12 md:pt-28">
        <div className="section-shell text-center">
          <p className="section-kicker">{t("list.kicker")}</p>
          <h1 className="headline-gradient mx-auto mt-3 max-w-4xl text-[42px] font-extrabold leading-none md:text-[76px]">
            {t("list.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {t("list.subtitle")}
          </p>
        </div>
      </section>

      {/* Filter + Cards */}
      <section className="py-8 md:py-12">
        <div className="section-shell">
          <CaseFilter
            industries={industries}
            packages={packages}
            onFilterChange={setFilters}
            searchPlaceholder={t("filter.searchPlaceholder")}
            allLabel={t("filter.all")}
            clearLabel={t("filter.clear")}
            allPackagesLabel={t("filter.allPackages")}
            allSizesLabel={t("filter.allSizes")}
            sortByLabel={t("filter.sortBy")}
            newestLabel={t("filter.newest")}
            oldestLabel={t("filter.oldest")}
            packageHighLabel={t("filter.packageHigh")}
            packageLowLabel={t("filter.packageLow")}
            sizeLargeLabel={t("filter.sizeLarge")}
            sizeSmallLabel={t("filter.sizeSmall")}
            gridViewLabel={t("filter.gridView")}
            listViewLabel={t("filter.listView")}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
          />

          {filteredCases.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg text-muted">{t("list.noResults")}</p>
              <button
                type="button"
                onClick={() =>
                  setFilters({
                    industry: null,
                    package: null,
                    sizeRange: null,
                    search: "",
                    sort: "newest",
                  })
                }
                className="mt-4 text-sm text-accent hover:underline"
              >
                {t("list.clearFilters")}
              </button>
            </div>
          ) : (
            <>
              <h2 className="sr-only">{t("list.allCases")}</h2>
              <div
                className={`reveal-stagger gap-6 ${
                  viewMode === "list"
                    ? "flex flex-col"
                    : "grid md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
              {filteredCases.map((c) => (
                <CaseCard
                  key={c.id}
                  slug={c.slug}
                  title={c.title}
                  industry={c.industry}
                  clientName={c.clientName}
                  packageName={c.packageName}
                  timeline={c.timeline}
                  result={c.result}
                  tags={c.tags}
                  pages={c.pages}
                  pagesLabel={t("pages")}
                  viewDetailsLabel={t("viewDetails")}
                  featured={c.featured}
                  featuredLabel={t("filter.featured")}
                  searchQuery={filters.search || undefined}
                  viewMode={viewMode}
                  coverImage={c.coverImage ?? undefined}
                />
              ))}
            </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface/55 py-20 md:py-28">
        <div className="section-shell">
          <div className="liquid-glass rounded-[36px] p-10 text-center md:p-14">
            <h2 className="text-3xl font-bold md:text-4xl">{t("list.ctaTitle")}</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              {t("list.ctaSubtitle")}
            </p>
            <Link
              href="/contact"
              className="amber-button mt-8 inline-flex items-center gap-2 px-8 py-3.5 text-sm"
            >
              {t("list.ctaButton")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
