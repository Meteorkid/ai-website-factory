"use client";

import { useCallback, useRef, useState } from "react";
import {
  Search,
  X,
  ArrowUpDown,
  LayoutGrid,
  List,
  ChevronDown,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Package tier ordering (for display and sorting)                    */
/* ------------------------------------------------------------------ */
const PACKAGE_ORDER: Record<string, number> = {
  starter: 1,
  basic: 1,
  pro: 2,
  professional: 2,
  premium: 3,
  enterprise: 3,
};

export function getPackageTier(pkg: string): number {
  const key = pkg.toLowerCase().trim();
  if (PACKAGE_ORDER[key]) return PACKAGE_ORDER[key];
  for (const [keyword, tier] of Object.entries(PACKAGE_ORDER)) {
    if (key.includes(keyword) || keyword.includes(key)) return tier;
  }
  return 0;
}

/* ------------------------------------------------------------------ */
/*  Sort option type                                                   */
/* ------------------------------------------------------------------ */
export type SortOption =
  | "newest"
  | "oldest"
  | "package-high"
  | "package-low"
  | "size-large"
  | "size-small";

/* ------------------------------------------------------------------ */
/*  Filter state type                                                  */
/* ------------------------------------------------------------------ */
export interface FilterState {
  industry: string | null;
  package: string | null;
  sizeRange: string | null; // "1-5" | "6-10" | "11+"
  search: string;
  sort: SortOption;
}

/* ------------------------------------------------------------------ */
/*  Size range helpers                                                 */
/* ------------------------------------------------------------------ */
const SIZE_RANGES = [
  { key: "1-5", label: "1-5" },
  { key: "6-10", label: "6-10" },
  { key: "11+", label: "11+" },
] as const;

export function matchesSizeRange(pageCount: number, range: string | null): boolean {
  if (!range) return true;
  if (range === "1-5") return pageCount >= 1 && pageCount <= 5;
  if (range === "6-10") return pageCount >= 6 && pageCount <= 10;
  if (range === "11+") return pageCount >= 11;
  return true;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
interface CaseFilterProps {
  industries: string[];
  packages: string[];
  onFilterChange: (filters: FilterState) => void;
  searchPlaceholder: string;
  allLabel: string;
  clearLabel: string;
  allPackagesLabel: string;
  allSizesLabel: string;
  sortByLabel: string;
  newestLabel: string;
  oldestLabel: string;
  packageHighLabel: string;
  packageLowLabel: string;
  sizeLargeLabel: string;
  sizeSmallLabel: string;
  gridViewLabel: string;
  listViewLabel: string;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export default function CaseFilter({
  industries,
  packages,
  onFilterChange,
  searchPlaceholder,
  allLabel,
  clearLabel,
  allPackagesLabel,
  allSizesLabel,
  sortByLabel,
  newestLabel,
  oldestLabel,
  packageHighLabel,
  packageLowLabel,
  sizeLargeLabel,
  sizeSmallLabel,
  gridViewLabel,
  listViewLabel,
  viewMode,
  onViewModeChange,
}: CaseFilterProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Persist filters to parent */
  const emitFilters = useCallback(
    (overrides: Partial<FilterState> = {}) => {
      onFilterChange({
        industry: overrides.industry ?? selectedIndustry,
        package: overrides.package ?? selectedPackage,
        sizeRange: overrides.sizeRange ?? selectedSize,
        search: overrides.search ?? search,
        sort: overrides.sort ?? sort,
      });
    },
    [selectedIndustry, selectedPackage, selectedSize, search, sort, onFilterChange],
  );

  const handleIndustryChange = (industry: string | null) => {
    setSelectedIndustry(industry);
    emitFilters({ industry });
  };

  const handlePackageChange = (pkg: string | null) => {
    setSelectedPackage(pkg);
    emitFilters({ package: pkg });
  };

  const handleSizeChange = (size: string | null) => {
    setSelectedSize(size);
    emitFilters({ sizeRange: size });
  };

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    setSortOpen(false);
    emitFilters({ sort: newSort });
  };

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        emitFilters({ search: value });
      }, 300);
    },
    [emitFilters],
  );

  const clearFilters = () => {
    setSelectedIndustry(null);
    setSelectedPackage(null);
    setSelectedSize(null);
    setSearch("");
    setSort("newest");
    onFilterChange({
      industry: null,
      package: null,
      sizeRange: null,
      search: "",
      sort: "newest",
    });
  };

  const hasFilters = selectedIndustry || selectedPackage || selectedSize || search;

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "newest", label: newestLabel },
    { value: "oldest", label: oldestLabel },
    { value: "package-high", label: packageHighLabel },
    { value: "package-low", label: packageLowLabel },
    { value: "size-large", label: sizeLargeLabel },
    { value: "size-small", label: sizeSmallLabel },
  ];

  const currentSortLabel =
    sortOptions.find((o) => o.value === sort)?.label || newestLabel;

  return (
    <div className="mb-6 space-y-3">
      {/* Search bar + view toggle */}
      <div className="flex items-center gap-3 mx-auto max-w-xl">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            id="case-search"
            type="text"
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
          />
          {search && (
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
              aria-label={clearLabel}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* View mode toggle */}
        <div className="flex shrink-0 items-center rounded-full border border-border bg-surface p-1">
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            className={`rounded-full p-2 transition-colors ${
              viewMode === "grid"
                ? "bg-accent text-white"
                : "text-muted hover:text-foreground"
            }`}
            aria-label={gridViewLabel}
            aria-pressed={viewMode === "grid"}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            className={`rounded-full p-2 transition-colors ${
              viewMode === "list"
                ? "bg-accent text-white"
                : "text-muted hover:text-foreground"
            }`}
            aria-label={listViewLabel}
            aria-pressed={viewMode === "list"}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Industry filter tags */}
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <button
          type="button"
          onClick={() => handleIndustryChange(null)}
          className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
            !selectedIndustry
              ? "bg-accent text-white"
              : "border border-border text-muted hover:text-foreground hover:border-accent/50"
          }`}
        >
          {allLabel}
        </button>
        {industries.map((industry) => (
          <button
            key={industry}
            type="button"
            onClick={() => handleIndustryChange(industry)}
            className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
              selectedIndustry === industry
                ? "bg-accent text-white"
                : "border border-border text-muted hover:text-foreground hover:border-accent/50"
            }`}
          >
            {industry}
          </button>
        ))}
      </div>

      {/* Secondary filters row: package, size, sort */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* Package filter */}
        <select
          value={selectedPackage || ""}
          onChange={(e) =>
            handlePackageChange(e.target.value || null)
          }
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent appearance-none cursor-pointer"
          aria-label={allPackagesLabel}
        >
          <option value="">{allPackagesLabel}</option>
          {packages.map((pkg) => (
            <option key={pkg} value={pkg}>
              {pkg}
            </option>
          ))}
        </select>

        {/* Size range filter */}
        <select
          value={selectedSize || ""}
          onChange={(e) =>
            handleSizeChange(e.target.value || null)
          }
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent appearance-none cursor-pointer"
          aria-label={allSizesLabel}
        >
          <option value="">{allSizesLabel}</option>
          {SIZE_RANGES.map((range) => (
            <option key={range.key} value={range.key}>
              {range.label}
            </option>
          ))}
        </select>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground transition-colors hover:border-accent/50"
            aria-label={sortByLabel}
            aria-expanded={sortOpen}
          >
            <ArrowUpDown className="h-3.5 w-3.5 text-muted" />
            {currentSortLabel}
            <ChevronDown
              className={`h-3.5 w-3.5 text-muted transition-transform ${
                sortOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {sortOpen && (
            <>
              {/* Backdrop to close dropdown */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setSortOpen(false)}
              />
              <div className="absolute right-0 top-full z-20 mt-2 w-52 overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSortChange(option.value)}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-accent-soft ${
                      sort === option.value
                        ? "font-semibold text-accent"
                        : "text-foreground"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Clear filters */}
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 rounded-full px-3 py-2 text-sm text-accent hover:underline"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            {clearLabel}
          </button>
        )}
      </div>
    </div>
  );
}
