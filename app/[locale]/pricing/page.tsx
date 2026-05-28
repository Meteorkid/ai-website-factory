import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle, ChevronDown, Star, X } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "服务套餐 - AI 官网工场" : "Pricing - AI Website Factory",
    description: locale === "zh"
      ? "查看 Starter、Pro、Premium 官网建设套餐和月度维护服务。"
      : "View Starter, Pro, Premium website packages and monthly maintenance services.",
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });

  const packages = t.raw("packages.items") as Array<{
    id: string; name: string; title: string; price: string; target: string;
    period: string; revisions: string; features: string[];
  }>;
  const featureMatrix = t.raw("features.items") as Array<{
    feature: string; starter: string | boolean; pro: string | boolean; premium: string | boolean;
  }>;
  const maintenanceItems = t.raw("maintenance.items") as string[][];
  const includedItems = t.raw("scope.included") as string[];
  const excludedItems = t.raw("scope.excluded") as string[];
  const faqItems = t.raw("faq.items") as Array<{ q: string; a: string }>;

  return (
    <>
      <section className="pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="section-shell text-center">
          <p className="section-kicker">{t("hero.kicker")}</p>
          <h1 className="headline-gradient mx-auto mt-3 max-w-4xl text-[42px] font-extrabold leading-none md:text-[76px]">
            {t("hero.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="section-shell">
          <div className="reveal-stagger grid gap-4 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                id={pkg.id}
                className={`relative flex flex-col rounded-[30px] p-7 ${pkg.id === "pro" ? "liquid-glass" : "warm-card"}`}
              >
                {pkg.id === "pro" && (
                  <span className="mb-5 inline-flex items-center gap-1 self-start rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent">
                    <Star className="h-3.5 w-3.5" /> {t("packages.popular")}
                  </span>
                )}
                <p className="font-mono text-sm font-bold text-accent">{pkg.name}</p>
                <h2 className="mt-2 text-2xl font-bold">{pkg.title}</h2>
                <p className="mt-3 text-2xl font-bold">{pkg.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{pkg.target}</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-accent-soft p-3">
                    <p className="text-xs text-muted">{t("packages.periodLabel")}</p>
                    <p className="font-bold text-accent">{pkg.period}</p>
                  </div>
                  <div className="rounded-2xl bg-accent-soft p-3">
                    <p className="text-xs text-muted">{t("packages.revisionsLabel")}</p>
                    <p className="font-bold text-accent">{pkg.revisions}</p>
                  </div>
                </div>
                <ul className="my-7 space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="amber-button mt-auto px-5 py-3 text-sm">
                  {t("packages.cta")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="section-shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker">{t("features.kicker")}</p>
            <h2 className="mt-3 text-3xl font-bold leading-snug md:text-5xl">{t("features.title")}</h2>
            <p className="mt-4 text-muted">{t("features.subtitle")}</p>
          </div>
          <div className="reveal warm-card mt-12 overflow-x-auto rounded-[28px]">
            <p className="px-6 pt-5 text-xs text-muted md:hidden">{"←"} {"左右滑动查看完整对比"} {"→"}</p>
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-muted">{t("features.featureHeader")}</th>
                  <th className="px-6 py-4 text-left font-semibold text-muted">Starter</th>
                  <th className="px-6 py-4 text-left font-semibold text-accent bg-accent/8">Pro</th>
                  <th className="px-6 py-4 text-left font-semibold text-muted">Premium</th>
                </tr>
              </thead>
              <tbody>
                {featureMatrix.map((row, index) => (
                  <tr key={row.feature} className={index % 2 === 0 ? "bg-surface/30" : ""}>
                    <td className="px-6 py-4 font-semibold">{row.feature}</td>
                    {(["starter", "pro", "premium"] as const).map((tier) => {
                      const val = row[tier];
                      const isHighlight = tier === "pro";
                      return (
                        <td
                          key={tier}
                          className={`px-6 py-4 ${isHighlight ? "bg-accent/5 font-semibold text-accent" : "text-muted"}`}
                        >
                          {typeof val === "boolean" ? (
                            val ? (
                              <CheckCircle className="h-4 w-4 text-accent" />
                            ) : (
                              <X className="h-4 w-4 text-foreground/20" />
                            )
                          ) : (
                            val
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-surface/55 py-20 md:py-28">
        <div className="section-shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker">{t("maintenance.kicker")}</p>
            <h2 className="mt-3 text-3xl font-bold leading-snug md:text-5xl">{t("maintenance.title")}</h2>
          </div>
          <div className="reveal-stagger mt-12 grid gap-4 md:grid-cols-3">
            {maintenanceItems.map(([name, price, desc]) => (
              <div key={name} className="warm-card rounded-[28px] p-6">
                <h3 className="text-xl font-bold">{name}</h3>
                <p className="mt-3 text-2xl font-bold text-accent">{price}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="reveal section-shell grid gap-6 lg:grid-cols-2">
          <div className="warm-card rounded-[30px] p-7">
            <h2 className="text-2xl font-bold">{t("scope.includedTitle")}</h2>
            <ul className="mt-6 space-y-3">
              {includedItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="warm-card rounded-[30px] p-7">
            <h2 className="text-2xl font-bold">{t("scope.excludedTitle")}</h2>
            <ul className="mt-6 space-y-3">
              {excludedItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-surface/55 py-20 md:py-28">
        <div className="section-shell max-w-3xl">
          <h2 className="text-center text-3xl font-bold leading-snug md:text-5xl">{t("faq.title")}</h2>
          <div className="warm-card mt-10 divide-y divide-border rounded-[28px] px-5 md:px-7">
            {faqItems.map((faq) => (
              <details key={faq.q} className="group">
                <summary className="flex cursor-pointer items-center justify-between gap-5 py-6 text-left font-semibold transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:rounded-lg">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="pb-6 text-sm leading-relaxed text-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="section-shell">
          <div className="liquid-glass rounded-[36px] p-8 text-center md:p-14">
            <h2 className="text-3xl font-bold leading-snug md:text-5xl">{t("cta.title")}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-muted">{t("cta.subtitle")}</p>
            <Link href="/contact" className="amber-button mt-8 px-7 py-3.5 text-sm">
              {t("cta.button")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
