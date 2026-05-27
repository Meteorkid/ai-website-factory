"use client";

import { ChevronDown, FileText } from "lucide-react";

interface Faq {
  q: string;
  a: string;
}

export default function FaqSection({ items }: { items: Faq[] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="section-shell max-w-3xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-accent">
            <FileText className="h-4 w-4" />
            常见问题
          </div>
          <h2 className="mt-4 text-3xl font-bold leading-snug md:text-5xl">
            你可能想知道的
          </h2>
        </div>

        <div className="reveal mt-10 divide-y divide-border overflow-hidden rounded-[28px] border border-border bg-surface/80 px-5 md:px-7">
          {items.map((faq) => (
            <details key={faq.q} className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-5 py-6 text-left font-semibold transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:rounded-lg">
                {faq.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-6 text-sm leading-relaxed text-muted">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
