"use client";

import { useCallback, useRef, useState } from "react";
import { Search, X } from "lucide-react";

interface CaseFilterProps {
  industries: string[];
  onFilterChange: (filters: { industry: string | null; search: string }) => void;
}

export default function CaseFilter({ industries, onFilterChange }: CaseFilterProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 行业筛选立即生效
  const handleIndustryChange = (industry: string | null) => {
    setSelectedIndustry(industry);
    onFilterChange({ industry, search });
  };

  // 搜索框输入防抖，300ms 后才触发筛选
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onFilterChange({ industry: selectedIndustry, search: value });
      }, 300);
    },
    [selectedIndustry, onFilterChange],
  );

  const clearFilters = () => {
    setSelectedIndustry(null);
    setSearch("");
    onFilterChange({ industry: null, search: "" });
  };

  const hasFilters = selectedIndustry || search;

  return (
    <div className="mb-10 space-y-4">
      {/* 搜索框 */}
      <div className="relative mx-auto max-w-md">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="搜索案例..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
        />
        {search && (
          <button
            type="button"
            onClick={() => handleSearchChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 行业筛选标签 */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => handleIndustryChange(null)}
          className={`rounded-full px-4 py-2 text-sm transition-colors ${
            !selectedIndustry
              ? "bg-accent text-white"
              : "border border-border text-muted hover:text-foreground hover:border-accent/50"
          }`}
        >
          全部
        </button>
        {industries.map((industry) => (
          <button
            key={industry}
            type="button"
            onClick={() => handleIndustryChange(industry)}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              selectedIndustry === industry
                ? "bg-accent text-white"
                : "border border-border text-muted hover:text-foreground hover:border-accent/50"
            }`}
          >
            {industry}
          </button>
        ))}
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 rounded-full px-3 py-2 text-sm text-accent hover:underline"
          >
            <X className="h-3.5 w-3.5" />
            清除筛选
          </button>
        )}
      </div>
    </div>
  );
}
