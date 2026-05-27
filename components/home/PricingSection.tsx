"use client";

import Link from "next/link";
import { CheckCircle, Globe, type LucideIcon } from "lucide-react";

interface Package {
  id: string;
  name: string;
  title: string;
  price: string;
  unit: string;
  desc: string;
  features: string[];
  icon: LucideIcon;
  popular?: boolean;
}

export default function PricingSection({ items }: { items: Package[] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-accent">
            <Globe className="h-4 w-4" />
            透明定价
          </div>
          <h2 className="mt-4 text-3xl font-bold leading-snug md:text-5xl">
            三档套餐，边界清楚。
          </h2>
          <p className="mt-4 text-lg text-muted">
            页面数量、修改轮次、交付周期和维护建议都会在项目启动前确认。
          </p>
        </div>

        <div className="reveal-stagger mt-14 grid gap-6 lg:grid-cols-3">
          {items.map((pkg) => (
            <div
              key={pkg.id}
              className={`glow-card relative flex flex-col rounded-[30px] p-8 transition-all duration-300 ${
                pkg.popular
                  ? "liquid-glass ring-2 ring-accent/30"
                  : "gradient-border-card"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gradient-to-r from-accent to-accent-secondary px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-accent/30">
                    最受欢迎
                  </span>
                </div>
              )}

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <pkg.icon className="h-6 w-6" />
              </div>

              <p className="font-mono text-sm font-bold text-accent">
                {pkg.name}
              </p>
              <h3 className="mt-2 text-2xl font-bold">{pkg.title}</h3>
              <div className="mt-4">
                <span className="text-4xl font-extrabold">{pkg.price}</span>
                <span className="ml-1 text-lg text-muted">{pkg.unit}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {pkg.desc}
              </p>

              <ul className="my-8 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`mt-auto px-6 py-3.5 text-sm ${
                  pkg.popular ? "amber-button" : "glass-button"
                }`}
              >
                获取报价
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
