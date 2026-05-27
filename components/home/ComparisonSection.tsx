"use client";

import { Users } from "lucide-react";

export default function ComparisonSection({
  rows,
}: {
  rows: [string, string, string, string][];
}) {
  return (
    <section className="bg-surface/55 py-20 md:py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-accent">
            <Users className="h-4 w-4" />
            为什么选择我们
          </div>
          <h2 className="mt-4 text-3xl font-bold leading-snug md:text-5xl">
            不是普通外包，
            <br />
            也不是让客户自己搭模板。
          </h2>
        </div>

        <div className="reveal mt-12 overflow-hidden rounded-[28px] border border-border bg-surface/80">
          <p className="px-6 pt-5 text-xs text-muted md:hidden">
            &larr; 左右滑动查看完整对比 &rarr;
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["对比项", "自助模板建站", "传统外包", "AI 官网工场"].map(
                    (header, index) => (
                      <th
                        key={header}
                        className={`px-6 py-5 text-left font-semibold ${
                          index === 3
                            ? "bg-accent/10 text-accent"
                            : "text-muted"
                        }`}
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, selfServe, outsource, us], index) => (
                  <tr
                    key={label}
                    className={`border-b border-border transition-colors hover:bg-accent/5 ${
                      index % 2 === 0 ? "bg-surface/50" : ""
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold">{label}</td>
                    <td className="px-6 py-4 text-muted">{selfServe}</td>
                    <td className="px-6 py-4 text-muted">{outsource}</td>
                    <td className="px-6 py-4 font-semibold text-accent bg-accent/5">
                      {us}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="reveal mx-auto mt-6 max-w-2xl text-center text-sm text-muted">
          从价格到 SEO，从维护到改版——我们把传统建站中模糊的部分变成明确的交付承诺。
        </p>
      </div>
    </section>
  );
}
