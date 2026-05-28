import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Cpu, Palette, PenTool, Route, Target, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

const iconMap = [Target, Cpu, Palette, PenTool];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: locale === "zh" ? "关于我们 - AI 官网工场" : "About Us - AI Website Factory",
    description: locale === "zh"
      ? "了解 AI 官网工场的项目定位、团队分工和阶段路线。"
      : "Learn about AI Website Factory's positioning, team roles, and roadmap.",
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const teamRoles = t.raw("team.items") as Array<{ role: string; title: string; desc: string }>;
  const roadmapItems = t.raw("roadmap.items") as Array<{ title: string; desc: string }>;

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

      <section className="bg-surface/55 py-20 md:py-28">
        <div className="reveal section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="section-kicker">{t("positioning.kicker")}</p>
            <h2 className="mt-3 text-3xl font-bold leading-snug md:text-5xl">{t("positioning.title")}</h2>
          </div>
          <div className="warm-card rounded-[30px] p-7 text-muted">
            <p>{t("positioning.p1")}</p>
            <p className="mt-4">{t("positioning.p2")}</p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="section-shell">
          <div className="text-center">
            <p className="section-kicker">{t("team.kicker")}</p>
            <h2 className="mt-3 text-3xl font-bold leading-snug md:text-5xl">{t("team.title")}</h2>
          </div>
          <div className="reveal-stagger mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {teamRoles.map((member, index) => {
              const Icon = iconMap[index];
              return (
                <div key={member.role} className="warm-card rounded-[28px] p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-mono text-2xl font-bold text-accent">{member.role}</span>
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold">{member.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{member.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface/55 py-20 md:py-28">
        <div className="section-shell">
          <div className="reveal grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="section-kicker">{t("roadmap.kicker")}</p>
              <h2 className="mt-3 text-3xl font-bold leading-snug md:text-5xl">{t("roadmap.title")}</h2>
            </div>
            <div className="relative ml-5 border-l-2 border-accent/30 pl-8">
              {roadmapItems.map((item, index) => (
                <div key={item.title} className="relative mb-8 last:mb-0">
                  <div className="absolute -left-[41px] top-1 grid h-5 w-5 place-items-center rounded-full border-2 border-accent bg-background">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                  </div>
                  <div className="liquid-glass rounded-[28px] p-6">
                    <div className="flex gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                        {index === 0 ? <Route className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="section-shell">
          <div className="liquid-glass rounded-[36px] p-8 text-center md:p-14">
            <h2 className="text-3xl font-bold leading-snug md:text-5xl">{t("cta.title")}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-muted">{t("cta.subtitle")}</p>
            <Link href="/process" className="amber-button mt-8 px-7 py-3.5 text-sm">
              {t("cta.button")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
