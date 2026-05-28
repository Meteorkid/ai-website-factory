import type { Metadata } from "next";
import Link from "next-intl/link";
import {
  ArrowRight,
  FileText,
  Layers,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import HomeBelowFold from "@/components/home/HomeBelowFold";
import { routing } from "@/lib/i18n/config";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: locale === "zh" ? "AI 官网工场 - 7 天上线专业官网" : "AI Website Factory - Professional Websites in 7 Days",
    description: t("subtitle"),
    openGraph: {
      title: locale === "zh" ? "AI 官网工场 - 7 天上线专业官网" : "AI Website Factory - Professional Websites in 7 Days",
      description: t("subtitle"),
      url: "/",
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const trustBadges = [
    { label: t("trustBadges.served.label"), value: t("trustBadges.served.value"), suffix: t("trustBadges.served.suffix") },
    { label: t("trustBadges.delivery.label"), value: t("trustBadges.delivery.value"), suffix: t("trustBadges.delivery.suffix") },
    { label: t("trustBadges.satisfaction.label"), value: t("trustBadges.satisfaction.value"), suffix: t("trustBadges.satisfaction.suffix") },
    { label: t("trustBadges.renewal.label"), value: t("trustBadges.renewal.value"), suffix: t("trustBadges.renewal.suffix") },
  ];

  const processSteps = [
    { icon: FileText, title: t("process.steps.0.title"), desc: t("process.steps.0.desc"), output: t("process.steps.0.output"), time: t("process.steps.0.time") },
    { icon: Sparkles, title: t("process.steps.1.title"), desc: t("process.steps.1.desc"), output: t("process.steps.1.output"), time: t("process.steps.1.time") },
    { icon: Layers, title: t("process.steps.2.title"), desc: t("process.steps.2.desc"), output: t("process.steps.2.output"), time: t("process.steps.2.time") },
    { icon: ShieldCheck, title: t("process.steps.3.title"), desc: t("process.steps.3.desc"), output: t("process.steps.3.output"), time: t("process.steps.3.time") },
  ];

  const serviceValues = [
    { iconName: "Rocket", title: t("serviceValues.items.0.title"), desc: t("serviceValues.items.0.desc"), stats: t("serviceValues.items.0.stats"), color: "from-amber-500 to-orange-500" },
    { iconName: "Sparkles", title: t("serviceValues.items.1.title"), desc: t("serviceValues.items.1.desc"), stats: t("serviceValues.items.1.stats"), color: "from-purple-500 to-pink-500" },
    { iconName: "Wrench", title: t("serviceValues.items.2.title"), desc: t("serviceValues.items.2.desc"), stats: t("serviceValues.items.2.stats"), color: "from-emerald-500 to-teal-500" },
  ];

  const packages = [
    { id: "starter", name: t("packages.items.0.name"), title: t("packages.items.0.title"), price: t("packages.items.0.price"), unit: t("packages.items.0.unit"), desc: t("packages.items.0.desc"), features: [0, 1, 2, 3, 4, 5].map((i) => t(`packages.items.0.features.${i}`)), iconName: "FileText" },
    { id: "pro", name: t("packages.items.1.name"), title: t("packages.items.1.title"), price: t("packages.items.1.price"), unit: t("packages.items.1.unit"), desc: t("packages.items.1.desc"), features: [0, 1, 2, 3, 4, 5].map((i) => t(`packages.items.1.features.${i}`)), popular: true, iconName: "Globe" },
    { id: "premium", name: t("packages.items.2.name"), title: t("packages.items.2.title"), price: t("packages.items.2.price"), unit: t("packages.items.2.unit"), desc: t("packages.items.2.desc"), features: [0, 1, 2, 3, 4, 5].map((i) => t(`packages.items.2.features.${i}`)), iconName: "Star" },
  ];

  const comparisons: [string, string, string, string][] = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => [
    t(`comparison.rows.${i}.0`), t(`comparison.rows.${i}.1`), t(`comparison.rows.${i}.2`), t(`comparison.rows.${i}.3`),
  ]);

  const faqs = [0, 1, 2, 3, 4].map((i) => ({
    q: t(`faq.items.${i}.q`),
    a: t(`faq.items.${i}.a`),
  }));

  const featuredCases = await prisma.case.findMany({
    where: { published: true, featured: true },
    take: 3,
    orderBy: { sortOrder: "asc" },
  });

  const serializedCases = featuredCases.map((c) => ({
    ...c,
    tags: JSON.parse(c.tags) as string[],
    pages: JSON.parse(c.pages) as string[],
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }));

  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden pb-20 pt-20 md:pb-32 md:pt-28">
        <div className="floating-orb floating-orb-1" />
        <div className="floating-orb floating-orb-2" />
        <div className="floating-orb floating-orb-3" />
        <div className="absolute inset-0 glass-grid opacity-30" />

        <div className="section-shell relative z-10">
          <div className="animate-hero-in animate-hero-in-delay-1 flex justify-center">
            <div className="floating-label liquid-glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
              <span className="pulse-ring relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-muted">{t("hero.badge")}</span>
            </div>
          </div>

          <div className="animate-hero-in animate-hero-in-delay-2 mx-auto mt-8 max-w-5xl text-center">
            <h1 className="text-[44px] font-extrabold leading-[1.08] md:text-[72px] lg:text-[88px]">
              <span className="block">{t("hero.title1")}</span>
              <span className="headline-gradient block mt-2">{t("hero.title2")}</span>
            </h1>
          </div>

          <p className="animate-hero-in animate-hero-in-delay-3 mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted md:text-xl">
            {t("hero.subtitle")}
          </p>

          <div className="animate-hero-in animate-hero-in-delay-4 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="amber-button group relative overflow-hidden px-8 py-4 text-base"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t("hero.ctaPrimary")}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              href="/process"
              className="glass-button px-8 py-4 text-base"
            >
              <span className="flex items-center gap-2">
                {t("hero.ctaSecondary")}
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          <div className="animate-hero-in animate-hero-in-delay-4 mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="gradient-border-card rounded-2xl p-4 text-center"
              >
                <div className="counter-value font-mono text-3xl font-bold md:text-4xl">
                  {badge.value}
                  <span className="text-lg">{badge.suffix}</span>
                </div>
                <p className="mt-1 text-xs text-muted">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 交付流程可视化 ========== */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 deco-dots" />

        <div className="section-shell relative z-10">
          <div className="reveal grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-accent">
                <Zap className="h-4 w-4" />
                {t("process.badge")}
              </div>
              <h2 className="mt-4 text-3xl font-bold leading-snug md:text-5xl">
                {t("process.title1")}
                <br />
                <span className="text-flow">{t("process.title2")}</span>
              </h2>
              <p className="mt-5 text-lg text-muted">
                {t("process.subtitle")}
              </p>
              <Link
                href="/process"
                className="glass-button mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm"
              >
                {t("process.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-accent via-accent-secondary to-transparent" />

              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="glow-card liquid-glass group relative rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-bold text-white shadow-lg shadow-accent/30">
                        {index + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold">{step.title}</h3>
                          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                            {step.time}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted">{step.desc}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-xs text-muted">{t("process.outputLabel")}</span>
                          <span className="rounded-lg bg-background/60 px-3 py-1 text-xs font-semibold text-accent">
                            {step.output}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeBelowFold serviceValues={serviceValues} packages={packages} comparisons={comparisons} serializedCases={serializedCases} faqs={faqs} />
    </>
  );
}
