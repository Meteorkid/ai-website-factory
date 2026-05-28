import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle, ClipboardList, FileText, Palette, Rocket, Search, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

const stageIcons = [Search, ClipboardList, FileText, Palette, CheckCircle, Rocket, ShieldCheck];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "交付流程 - AI 官网工场" : "Our Process - AI Website Factory",
    description: locale === "zh"
      ? "了解 AI 官网工场从需求收集、策略文案、页面制作到正式上线的标准交付流程。"
      : "Learn about AI Website Factory's standard delivery process from requirements gathering to launch.",
  };
}

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "process" });

  const stages = t.raw("stages.items") as Array<{
    title: string;
    customer: string[];
    team: string[];
    output: string;
    outputDesc: string;
  }>;
  const acceptanceItems = t.raw("acceptance.items") as string[];

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
          <div className="reveal-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {stages.map((stage, index) => {
              const Icon = stageIcons[index];
              return (
                <div key={stage.title} className="liquid-glass rounded-[28px] p-5 lg:col-span-1">
                  <Icon className="h-6 w-6 text-accent" />
                  <p className="mt-5 font-mono text-sm text-accent">0{index + 1}</p>
                  <h2 className="mt-1 text-lg font-bold">{stage.title}</h2>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface/55 py-20 md:py-28">
        <div className="section-shell max-w-4xl">
          <div className="reveal grid gap-4">
            {stages.map((stage, index) => {
              const Icon = stageIcons[index];
              return (
                <div key={stage.title} className="warm-card rounded-[30px] p-7">
                  <div className="mb-6 flex flex-wrap items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-accent-soft text-accent">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-mono text-sm text-accent">{t("stages.stagePrefix")}{index + 1}</p>
                      <h2 className="text-2xl font-bold">{stage.title}</h2>
                    </div>
                    <p className="ml-auto rounded-full border border-border px-4 py-2 text-sm text-muted">
                      {t("stages.outputPrefix")}{stage.output}
                    </p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-3 font-semibold">{t("stages.customerLabel")}</h3>
                      <ul className="space-y-2">
                        {stage.customer.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm text-muted">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-3 font-semibold">{t("stages.teamLabel")}</h3>
                      <ul className="space-y-2">
                        {stage.team.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm text-muted">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="liquid-glass mt-5 rounded-2xl p-4">
                    <p className="text-xs font-semibold text-accent">{t("stages.outputLabel")}</p>
                    <p className="mt-1 text-sm font-bold">{stage.output}</p>
                    <p className="mt-1 text-xs text-muted">{stage.outputDesc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="section-shell max-w-3xl">
          <div className="text-center">
            <p className="section-kicker">{t("acceptance.kicker")}</p>
            <h2 className="mt-3 text-3xl font-bold leading-snug md:text-5xl">{t("acceptance.title")}</h2>
          </div>
          <div className="warm-card mt-10 rounded-[30px] p-7">
            <ul className="space-y-3">
              {acceptanceItems.map((standard) => (
                <li key={standard} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {standard}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface/55 py-20 md:py-28">
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
