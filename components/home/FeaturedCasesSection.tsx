"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import CaseCard from "@/components/cases/CaseCard";

interface SerializedCase {
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
}

export default function FeaturedCasesSection({
  cases,
}: {
  cases: SerializedCase[];
}) {
  if (cases.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-accent">
            <Star className="h-4 w-4" />
            精选案例
          </div>
          <h2 className="mt-4 text-3xl font-bold leading-snug md:text-5xl">
            看看我们交付过的官网。
          </h2>
          <p className="mt-4 text-lg text-muted">
            真实项目，真实交付。每个案例都经历了从策略到上线的完整流程。
          </p>
        </div>

        <div className="reveal-stagger mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
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

        <div className="mt-12 text-center">
          <Link
            href="/cases"
            className="glass-button inline-flex items-center gap-2 px-8 py-4 text-base"
          >
            查看更多案例
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
