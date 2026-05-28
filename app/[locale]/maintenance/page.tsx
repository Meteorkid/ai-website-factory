import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BarChart3, CheckCircle, RefreshCw, Shield, Wrench } from "lucide-react";
import { getTranslations } from "next-intl/server";

const reasonIcons = [Shield, RefreshCw, BarChart3, Wrench];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "月度维护 - AI 官网工场" : "Monthly Maintenance - AI Website Factory",
    description: locale === "zh"
      ? "了解官网上线后的托管、证书、备份、内容小改、访问报告和增长优化维护服务。"
      : "Learn about post-launch hosting, certificates, backups, minor edits, analytics reports, and growth optimization maintenance services.",
  };
}

export default async function MaintenancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "maintenance" });

  const plans = t.raw("plans.items") as Array<{ name: string; price: string; desc: string; features: string[] }>;
  const reasons = t.raw("reasons.items") as Array<{ title: string; desc: string }>;

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
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`flex flex-col rounded-[30px] p-7 ${index === 1 ? "liquid-glass" : "warm-card"}`}
              >
                {index === 1 && (
                  <span className="mb-5 self-start rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent">
                    {t("plans.recommended")}
                  </span>
                )}
                <h2 className="text-2xl font-bold">{plan.name}</h2>
                <p className="mt-3 text-2xl font-bold text-accent">{plan.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{plan.desc}</p>
                <ul className="my-7 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="amber-button mt-auto px-5 py-3 text-sm">
                  {t("plans.cta")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface/55 py-20 md:py-28">
        <div className="section-shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker">{t("reasons.kicker")}</p>
            <h2 className="mt-3 text-3xl font-bold leading-snug md:text-5xl">{t("reasons.title")}</h2>
          </div>
          <div className="reveal-stagger mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, index) => {
              const Icon = reasonIcons[index];
              return (
                <div key={reason.title} className="warm-card rounded-[28px] p-6">
                  <Icon className="mb-5 h-6 w-6 text-accent" />
                  <h3 className="text-xl font-bold">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{reason.desc}</p>
                </div>
              );
            })}
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
