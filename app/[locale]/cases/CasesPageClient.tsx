"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import CaseCard from "@/components/cases/CaseCard";
import CaseFilter from "@/components/cases/CaseFilter";

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
}

interface CasesPageClientProps {
  cases: CaseItem[];
  industries: string[];
}

export default function CasesPageClient({ cases, industries }: CasesPageClientProps) {
  const t = useTranslations("cases");
  const [filters, setFilters] = useState<{ industry: string | null; search: string }>({
    industry: null,
    search: "",
  });

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      if (filters.industry && c.industry !== filters.industry) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        return (
          c.title.toLowerCase().includes(q) ||
          c.clientName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [cases, filters]);

  return (
    <>
      <section className="pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="section-shell text-center">
          <p className="section-kicker">Cases</p>
          <h1 className="headline-gradient mx-auto mt-3 max-w-4xl text-[42px] font-extrabold leading-none md:text-[76px]">
            {t("list.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {t("list.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="section-shell">
          <CaseFilter industries={industries} onFilterChange={setFilters} />

          {filteredCases.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg text-muted">{t("list.noResults")}</p>
              <button
                type="button"
                onClick={() => setFilters({ industry: null, search: "" })}
                className="mt-4 text-sm text-accent hover:underline"
              >
                {t("list.clearFilters")}
              </button>
            </div>
          ) : (
            <div className="reveal-stagger grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-surface/55 py-20 md:py-28">
        <div className="section-shell">
          <div className="liquid-glass rounded-[36px] p-10 text-center md:p-14">
            <h2 className="text-3xl font-bold md:text-4xl">你的行业不在列表里？</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              我们已经为多个行业交付了官网项目。无论你从事什么行业，都可以联系我们了解方案。
            </p>
            <Link
              href="/contact"
              className="amber-button mt-8 inline-flex items-center gap-2 px-8 py-3.5 text-sm"
            >
              提交需求 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
