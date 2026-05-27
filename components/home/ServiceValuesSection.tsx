"use client";

import { TrendingUp, Zap, type LucideIcon } from "lucide-react";

interface ServiceValue {
  icon: LucideIcon;
  title: string;
  desc: string;
  stats: string;
  color: string;
}

export default function ServiceValuesSection({
  items,
}: {
  items: ServiceValue[];
}) {
  return (
    <section className="bg-surface/55 py-20 md:py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-accent">
            <TrendingUp className="h-4 w-4" />
            核心优势
          </div>
          <h2 className="mx-auto mt-4 max-w-3xl text-[34px] font-bold leading-snug md:text-[48px]">
            客户买的是上线结果，
            <br />
            不是建站工具。
          </h2>
          <p className="mt-4 text-lg text-muted">
            我们把 AI、模板、设计、前端和部署流程组合成一套可控交付服务。
          </p>
        </div>

        <div className="reveal-stagger mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="glow-card gradient-border-card group relative overflow-hidden rounded-[28px] p-8 transition-all duration-300"
            >
              <div
                className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${item.color} opacity-10 blur-3xl transition-opacity group-hover:opacity-20`}
              />
              <div className="relative z-10">
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent transition-transform group-hover:scale-110">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-bold text-accent">
                  <Zap className="h-3 w-3" />
                  {item.stats}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
