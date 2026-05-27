import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, FileText, Package, Quote, TrendingUp, Users, Target, Award, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import CaseCard from "@/components/cases/CaseCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface DesignConfig {
  style: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  gradient: string;
  fontDisplay: string;
  fontBody: string;
  borderRadius: string;
  heroStyle: string;
  cardStyle: string;
}

interface GalleryItem {
  src: string;
  caption: string;
  category?: string;
}

interface CaseImages {
  hero: string;
  gallery: (string | GalleryItem)[];
}

const defaultConfig: DesignConfig = {
  style: "default",
  primary: "#d88900",
  secondary: "#ffcc5c",
  accent: "#d88900",
  background: "#fffdf8",
  surface: "#ffffff",
  text: "#1d1b16",
  muted: "#6f6658",
  gradient: "linear-gradient(135deg, #ffcc5c, #d88900)",
  fontDisplay: "'Noto Sans SC', sans-serif",
  fontBody: "'Noto Sans SC', sans-serif",
  borderRadius: "24px",
  heroStyle: "default",
  cardStyle: "default",
};

function extractMetrics(result: string) {
  const metrics: { icon: any; label: string; value: string; highlight: boolean }[] = [];
  const patterns = [
    { regex: /(\d+)\+?\s*(次|个|位|家|条)/, label: "业务增长" },
    { regex: /增长\s*(\d+%?)/, label: "增长幅度" },
    { regex: /提升\s*(\d+%?)/, label: "效果提升" },
    { regex: /转化率?\s*(?:达到|为|是)\s*(\d+\.?\d*%?)/, label: "转化率" },
    { regex: /(\d+)\s*天/, label: "交付周期" },
  ];

  for (const p of patterns) {
    const m = result.match(p.regex);
    if (m) {
      metrics.push({ icon: TrendingUp, label: p.label, value: m[0], highlight: true });
      if (metrics.length >= 4) break;
    }
  }

  if (metrics.length === 0) {
    metrics.push(
      { icon: Target, label: "项目目标", value: "达成", highlight: true },
      { icon: Users, label: "客户满意度", value: "100%", highlight: true },
      { icon: Award, label: "交付质量", value: "优秀", highlight: true },
    );
  }

  return metrics;
}

function HeroSection({ caseData, config, images }: { caseData: any; config: DesignConfig; images: CaseImages }) {
  const isDark = config.style === "stripe" || config.style === "vercel" || config.style === "tesla" ||
    config.style === "energetic" || config.style === "industrial" || config.style === "authoritative" ||
    config.style === "tech-automotive";
  const isCultural = config.style === "cultural-heritage";

  return (
    <section className="relative overflow-hidden" style={{ background: config.background }}>
      {/* Hero 背景图 */}
      {images.hero && (
        <div className="absolute inset-0">
          <img
            src={images.hero}
            alt={caseData.title}
            className="h-full w-full object-cover"
            style={{ filter: isDark ? "brightness(0.4)" : "brightness(0.6) saturate(1.2)" }}
          />
          <div className="absolute inset-0" style={{
            background: isDark
              ? `linear-gradient(180deg, ${config.background}CC 0%, ${config.background} 100%)`
              : `linear-gradient(180deg, ${config.background}88 0%, ${config.background}  100%)`
          }} />
        </div>
      )}

      {/* 装饰光效 */}
      {!images.hero && config.heroStyle === "gradient-mesh" && (
        <>
          <div className="absolute inset-0 opacity-30" style={{ background: config.gradient }} />
          <div className="absolute top-20 left-10 h-64 w-64 rounded-full opacity-20 blur-3xl" style={{ background: config.accent }} />
          <div className="absolute bottom-10 right-20 h-48 w-48 rounded-full opacity-15 blur-3xl" style={{ background: config.secondary }} />
        </>
      )}

      {/* 文化遗产风格装饰 */}
      {isCultural && (
        <>
          <div className="absolute top-0 left-0 h-full w-full opacity-5" style={{ background: `repeating-linear-gradient(90deg, ${config.primary} 0px, ${config.primary} 1px, transparent 1px, transparent 80px)` }} />
          <div className="absolute top-0 left-0 h-full w-full opacity-5" style={{ background: `repeating-linear-gradient(0deg, ${config.primary} 0px, ${config.primary} 1px, transparent 1px, transparent 80px)` }} />
          <div className="absolute top-10 right-10 text-9xl font-bold opacity-5" style={{ color: config.primary, fontFamily: config.fontDisplay }}>文</div>
          <div className="absolute bottom-10 left-10 text-9xl font-bold opacity-5" style={{ color: config.accent, fontFamily: config.fontDisplay }}>韵</div>
        </>
      )}

      <div className="relative section-shell py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* 面包屑导航 */}
          <div className="mb-6 flex items-center justify-center gap-2 text-sm" style={{ color: config.muted }}>
            <Link href="/cases" className="hover:opacity-80 transition-opacity">案例</Link>
            <ChevronRight className="h-3 w-3" />
            <span style={{ color: config.accent }}>{caseData.industry}</span>
          </div>

          {/* 标题 */}
          <h1
            className="font-extrabold leading-tight"
            style={{
              color: config.text,
              fontFamily: config.fontDisplay,
              fontSize: "clamp(32px, 5vw, 56px)",
              textShadow: images.hero ? `0 2px 20px ${config.background}88` : undefined,
            }}
          >
            {caseData.title}
          </h1>

          {/* 标签 */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full px-5 py-2 text-sm font-semibold" style={{ background: `${config.accent}22`, color: config.accent, border: `1px solid ${config.accent}33` }}>
              {caseData.industry}
            </span>
            <span className="rounded-full px-5 py-2 text-sm font-semibold" style={{ background: `${config.primary}15`, color: isDark ? config.text : config.primary, border: `1px solid ${config.muted}22` }}>
              {caseData.packageName} 套餐
            </span>
            <span className="rounded-full px-5 py-2 text-sm font-semibold" style={{ background: `${config.secondary}22`, color: config.primary, border: `1px solid ${config.secondary}33` }}>
              {caseData.timeline}交付
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function OverviewBar({ caseData, config, pages }: { caseData: any; config: DesignConfig; pages: string[] }) {
  const items = [
    { icon: Users, label: "客户", value: caseData.clientName },
    { icon: Clock, label: "交付周期", value: caseData.timeline },
    { icon: FileText, label: "页面数量", value: `${pages.length} 页` },
    { icon: Package, label: "套餐", value: caseData.packageName },
  ];

  return (
    <section className="relative z-10 -mt-8 pb-16">
      <div className="section-shell">
        <div
          className="flex flex-wrap items-center justify-center gap-6 px-8 py-6 md:gap-10"
          style={{
            borderRadius: config.borderRadius,
            background: config.surface,
            border: `1px solid ${config.muted}18`,
            boxShadow: `0 8px 32px ${config.primary}12, 0 2px 8px ${config.primary}08`,
          }}
        >
          {items.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${config.accent}12` }}>
                <Icon className="h-5 w-5" style={{ color: config.accent }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: config.muted }}>{label}</p>
                <p className="font-bold" style={{ color: config.text }}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ images, config }: { images: CaseImages; config: DesignConfig }) {
  if (!images.gallery || images.gallery.length === 0) return null;

  const normalizeItem = (item: string | GalleryItem): GalleryItem => {
    if (typeof item === "string") return { src: item, caption: "" };
    return item;
  };

  const heroItem = normalizeItem(images.gallery[0]);
  const galleryItems = images.gallery.slice(1).map(normalizeItem);

  // 分类：按 category 分组
  const categories = new Map<string, GalleryItem[]>();
  galleryItems.forEach((item) => {
    const cat = item.category || "项目实拍";
    if (!categories.has(cat)) categories.set(cat, []);
    categories.get(cat)!.push(item);
  });

  return (
    <section className="py-12 md:py-16">
      <div className="section-shell">
        <h2 className="mb-8 font-bold" style={{ color: config.primary, fontSize: "0.8rem", letterSpacing: "0.04em" }}>项目展示</h2>

        {/* Hero image - full width with caption */}
        <div className="mb-8">
          <div
            className="group relative overflow-hidden"
            style={{
              borderRadius: config.borderRadius,
              border: `1px solid ${config.muted}15`,
              aspectRatio: "16/9",
            }}
          >
            <img
              src={heroItem.src}
              alt={heroItem.caption || "项目主图"}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            {heroItem.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-lg font-medium text-white md:text-xl" style={{ fontFamily: config.fontDisplay }}>{heroItem.caption}</p>
              </div>
            )}
          </div>
        </div>

        {/* Gallery by category */}
        {Array.from(categories.entries()).map(([category, items]) => (
          <div key={category} className="mb-10">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider" style={{ color: config.muted }}>{category}</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden"
                  style={{
                    borderRadius: config.borderRadius,
                    border: `1px solid ${config.muted}15`,
                    background: config.surface,
                  }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  {item.caption && (
                    <div className="p-4">
                      <p className="text-sm leading-relaxed" style={{ color: config.muted }}>{item.caption}</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BackgroundSection({ caseData, config, tags }: { caseData: any; config: DesignConfig; tags: string[] }) {
  return (
    <section className="py-16 md:py-20" style={{ background: `${config.background}99` }}>
      <div className="section-shell grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 font-bold" style={{ color: config.primary, fontSize: "0.8rem", letterSpacing: "0.04em" }}>客户背景</h2>
          <p className="text-base leading-relaxed" style={{ color: config.muted, lineHeight: 1.8 }}>
            {caseData.background}
          </p>
          {tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: `${config.muted}33`, color: config.muted }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center justify-center">
          <div
            className="w-full max-w-md p-8"
            style={{
              borderRadius: config.borderRadius,
              background: config.surface,
              border: `1px solid ${config.muted}15`,
              boxShadow: `0 8px 32px ${config.primary}08`,
            }}
          >
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: `${config.accent}15` }}>
                <Target className="h-8 w-8" style={{ color: config.accent }} />
              </div>
              <h3 className="mt-4 text-lg font-bold" style={{ color: config.text }}>项目目标</h3>
            </div>
            <div className="mt-6 space-y-3">
              {tags.slice(0, 4).map((tag) => (
                <div key={tag} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: `${config.accent}20` }}>
                    <ChevronRight className="h-3 w-3" style={{ color: config.accent }} />
                  </div>
                  <span className="text-sm" style={{ color: config.muted }}>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChallengeSection({ content, config }: { content: string; config: DesignConfig }) {
  return (
    <section className="py-16 md:py-20">
      <div className="section-shell">
        <h2 className="mb-6 font-bold" style={{ color: config.primary, fontSize: "0.8rem", letterSpacing: "0.04em" }}>需求与挑战</h2>
        <div
          className="p-8 md:p-10"
          style={{
            borderRadius: config.borderRadius,
            background: config.surface,
            border: `1px solid ${config.muted}15`,
            boxShadow: `0 4px 24px ${config.primary}08`,
          }}
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-bold" style={{ color: config.text }}>核心挑战</h3>
              <p className="text-sm leading-relaxed" style={{ color: config.muted, lineHeight: 1.8 }}>{content}</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Target, label: "目标明确", desc: "精准定位需求" },
                  { icon: Clock, label: "时间紧迫", desc: "高效交付" },
                  { icon: Users, label: "用户导向", desc: "体验优先" },
                  { icon: Award, label: "品质保证", desc: "专业标准" },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="p-4 text-center" style={{ borderRadius: config.borderRadius, background: `${config.accent}08` }}>
                    <Icon className="mx-auto h-5 w-5" style={{ color: config.accent }} />
                    <p className="mt-2 text-xs font-bold" style={{ color: config.text }}>{label}</p>
                    <p className="mt-1 text-xs" style={{ color: config.muted }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SolutionSection({ content, config }: { content: string; config: DesignConfig }) {
  const isGlass = config.cardStyle === "glass-dark";

  return (
    <section className="py-16 md:py-20" style={{ background: `${config.background}99` }}>
      <div className="section-shell">
        <h2 className="mb-6 font-bold" style={{ color: isGlass ? config.accent : config.primary, fontSize: "0.8rem", letterSpacing: "0.04em" }}>我们的方案</h2>
        <div
          className="p-8 md:p-10"
          style={{
            borderRadius: config.borderRadius,
            background: isGlass ? `${config.primary}CC` : config.surface,
            border: config.cardStyle === "formal-bordered" ? `2px solid ${config.secondary}` : `1px solid ${config.muted}15`,
            backdropFilter: isGlass ? "blur(20px)" : undefined,
            boxShadow: `0 8px 32px ${config.primary}12`,
          }}
        >
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <h3 className="mb-3 text-lg font-bold" style={{ color: isGlass ? config.text : config.text }}>解决方案</h3>
              <p className="text-sm leading-relaxed" style={{ color: isGlass ? `${config.text}CC` : config.muted, lineHeight: 1.8 }}>{content}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              {["需求分析", "视觉设计", "开发实现", "测试上线"].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold" style={{ background: config.gradient, color: config.style === "tesla" || config.style === "vercel" ? "#fff" : "#221407" }}>
                    {i + 1}
                  </div>
                  <span className="text-sm font-semibold" style={{ color: isGlass ? `${config.text}CC` : config.muted }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultSection({ caseData, config, pages }: { caseData: any; config: DesignConfig; pages: string[] }) {
  const metrics = extractMetrics(caseData.result);
  const isDark = config.style === "stripe" || config.style === "vercel" || config.style === "tesla" ||
    config.style === "energetic" || config.style === "industrial";

  return (
    <section className="py-16 md:py-20">
      <div className="section-shell">
        <h2 className="mb-6 font-bold" style={{ color: config.primary, fontSize: "0.8rem", letterSpacing: "0.04em" }}>交付成果</h2>

        {/* 核心数据卡片 */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {metrics.slice(0, 4).map(({ icon: Icon, label, value }, i) => (
            <div
              key={label}
              className="group relative overflow-hidden p-6 text-center transition-transform duration-300 hover:-translate-y-1"
              style={{
                borderRadius: config.borderRadius,
                background: i === 0 ? config.gradient : config.surface,
                border: `1px solid ${i === 0 ? "transparent" : `${config.muted}15`}`,
                boxShadow: `0 4px 24px ${config.primary}08`,
              }}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: i === 0 ? "rgba(255,255,255,0.2)" : `${config.accent}12` }}>
                <Icon className="h-6 w-6" style={{ color: i === 0 ? "#fff" : config.accent }} />
              </div>
              <p className="mt-3 text-sm" style={{ color: i === 0 ? "rgba(255,255,255,0.8)" : config.muted }}>{label}</p>
              <p className="mt-1 text-2xl font-extrabold" style={{ color: i === 0 ? "#fff" : config.text }}>{value}</p>
            </div>
          ))}
        </div>

        {/* 详细成果 */}
        <div
          className="p-8 md:p-10"
          style={{
            borderRadius: config.borderRadius,
            background: config.surface,
            border: `1px solid ${config.muted}15`,
            boxShadow: `0 4px 24px ${config.primary}08`,
          }}
        >
          <p className="text-sm leading-relaxed" style={{ color: config.muted, lineHeight: 1.8 }}>{caseData.result}</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Clock, label: "交付周期", value: caseData.timeline },
              { icon: FileText, label: "页面数量", value: `${pages.length} 页` },
              { icon: Package, label: "套餐方案", value: caseData.packageName },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl p-4 text-center" style={{ background: `${config.accent}08` }}>
                <Icon className="mx-auto h-5 w-5" style={{ color: config.accent }} />
                <p className="mt-2 text-xs" style={{ color: config.muted }}>{label}</p>
                <p className="mt-1 text-sm font-bold" style={{ color: config.text }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialSection({ caseData, config }: { caseData: any; config: DesignConfig }) {
  if (!caseData.testimonial) return null;
  const isGlass = config.cardStyle === "glass-dark";

  return (
    <section className="py-16 md:py-20" style={{ background: `${config.background}99` }}>
      <div className="section-shell">
        <div
          className="relative overflow-hidden p-8 md:p-10"
          style={{
            borderRadius: config.borderRadius,
            background: isGlass ? `${config.primary}CC` : config.surface,
            border: config.cardStyle === "formal-bordered" ? `2px solid ${config.secondary}` : `1px solid ${config.muted}15`,
            backdropFilter: isGlass ? "blur(20px)" : undefined,
            boxShadow: `0 8px 32px ${config.primary}12`,
          }}
        >
          {/* 装饰引号 */}
          <div className="absolute top-4 right-6 text-8xl font-bold leading-none opacity-10" style={{ color: config.accent }}>&ldquo;</div>

          <div className="relative">
            <div className="mb-4 flex items-center gap-2">
              <Quote className="h-6 w-6" style={{ color: config.accent }} />
              <span className="text-sm font-semibold" style={{ color: config.accent }}>客户评价</span>
            </div>
            <p className="text-lg leading-relaxed italic" style={{ color: isGlass ? config.text : config.muted, lineHeight: 1.8 }}>
              &ldquo;{caseData.testimonial}&rdquo;
            </p>
            {caseData.testimonialAuthor && (
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold" style={{ background: config.gradient, color: config.style === "tesla" || config.style === "vercel" ? "#fff" : "#221407" }}>
                  {caseData.testimonialAuthor.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: config.text }}>{caseData.testimonialAuthor}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PagesSection({ pages, config }: { pages: string[]; config: DesignConfig }) {
  return (
    <section className="py-12 md:py-16">
      <div className="section-shell">
        <h2 className="mb-6 font-bold" style={{ color: config.primary, fontSize: "0.8rem", letterSpacing: "0.04em" }}>交付页面</h2>
        <div className="flex flex-wrap gap-3">
          {pages.map((page, i) => (
            <div
              key={page}
              className="flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                borderRadius: config.borderRadius,
                background: config.surface,
                border: `1px solid ${config.muted}15`,
                color: config.text,
                boxShadow: `0 2px 8px ${config.primary}06`,
              }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold" style={{ background: `${config.accent}15`, color: config.accent }}>
                {i + 1}
              </span>
              {page}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface MediaReport {
  source: string;
  title: string;
  url: string;
  date?: string;
}

function MediaReportsSection({ reports, config }: { reports: MediaReport[]; config: DesignConfig }) {
  if (!reports || reports.length === 0) return null;

  return (
    <section className="py-12 md:py-16" style={{ background: `${config.background}99` }}>
      <div className="section-shell">
        <h2 className="mb-2 font-bold" style={{ color: config.primary, fontSize: "0.8rem", letterSpacing: "0.04em" }}>媒体报道</h2>
        <p className="mb-8 text-sm" style={{ color: config.muted }}>项目事迹被多家主流媒体报道</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report, i) => (
            <a
              key={i}
              href={report.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-5 transition-all duration-300 hover:-translate-y-1"
              style={{
                borderRadius: config.borderRadius,
                background: config.surface,
                border: `1px solid ${config.muted}15`,
                boxShadow: `0 2px 12px ${config.primary}06`,
              }}
            >
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="px-2 py-0.5 text-xs font-semibold"
                  style={{
                    borderRadius: "4px",
                    background: `${config.primary}15`,
                    color: config.primary,
                  }}
                >
                  {report.source}
                </span>
                {report.date && (
                  <span className="text-xs" style={{ color: config.muted }}>{report.date}</span>
                )}
              </div>
              <h3
                className="mb-3 text-sm font-medium leading-snug transition-colors duration-200 group-hover:underline"
                style={{ color: config.text, lineHeight: 1.6 }}
              >
                {report.title}
              </h3>
              <div className="flex items-center gap-1 text-xs" style={{ color: config.primary }}>
                <span>阅读原文</span>
                <svg className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const caseData = await prisma.case.findUnique({ where: { slug } });
  if (!caseData) notFound();

  const tags = JSON.parse(caseData.tags) as string[];
  const pages = JSON.parse(caseData.pages) as string[];
  const config = caseData.designConfig ? { ...defaultConfig, ...JSON.parse(caseData.designConfig) } : defaultConfig;
  const images: CaseImages = caseData.images ? JSON.parse(caseData.images) : { hero: "", gallery: [] };
  const mediaReports: MediaReport[] = caseData.mediaReports ? JSON.parse(caseData.mediaReports) : [];

  const relatedCases = await prisma.case.findMany({
    where: { published: true, industry: caseData.industry, id: { not: caseData.id } },
    take: 3,
    orderBy: { sortOrder: "asc" },
  });

  const serializedRelated = relatedCases.map((c) => ({
    ...c,
    tags: JSON.parse(c.tags) as string[],
    pages: JSON.parse(c.pages) as string[],
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }));

  const isDark = config.style === "stripe" || config.style === "vercel" || config.style === "tesla" ||
    config.style === "energetic" || config.style === "industrial" || config.style === "authoritative";

  return (
    <div style={{ fontFamily: config.fontBody, background: isDark ? config.background : undefined, color: isDark ? config.text : undefined }}>
      {/* 返回链接 */}
      <div className="section-shell relative z-10 pt-6">
        <Link href="/cases" className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-80" style={{ color: config.muted }}>
          <ArrowLeft className="h-4 w-4" />
          返回案例列表
        </Link>
      </div>

      <HeroSection caseData={caseData} config={config} images={images} />
      <OverviewBar caseData={caseData} config={config} pages={pages} />
      <GallerySection images={images} config={config} />
      <BackgroundSection caseData={caseData} config={config} tags={tags} />
      <ChallengeSection content={caseData.challenge} config={config} />
      <SolutionSection content={caseData.solution} config={config} />
      <ResultSection caseData={caseData} config={config} pages={pages} />
      <PagesSection pages={pages} config={config} />
      <MediaReportsSection reports={mediaReports} config={config} />
      <TestimonialSection caseData={caseData} config={config} />

      {/* 相关案例 */}
      {serializedRelated.length > 0 && (
        <section className="py-16 md:py-20" style={{ background: `${config.background}99` }}>
          <div className="section-shell">
            <h2 className="mb-8 font-bold" style={{ color: config.primary, fontSize: "0.8rem", letterSpacing: "0.04em" }}>相关案例</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {serializedRelated.map((c) => (
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
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 md:py-28" style={{ background: isDark ? `${config.surface}` : `${config.background}99` }}>
        <div className="section-shell">
          <div
            className="relative overflow-hidden p-10 text-center md:p-14"
            style={{
              borderRadius: "36px",
              background: config.cardStyle === "glass-dark" ? `${config.primary}CC` : config.surface,
              border: config.cardStyle === "formal-bordered" ? `2px solid ${config.secondary}` : `1px solid ${config.muted}15`,
              backdropFilter: config.cardStyle === "glass-dark" ? "blur(20px)" : undefined,
              boxShadow: `0 8px 32px ${config.primary}12`,
            }}
          >
            {/* 装饰光效 */}
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-20 blur-3xl" style={{ background: config.accent }} />
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full opacity-15 blur-3xl" style={{ background: config.secondary }} />

            <div className="relative">
              <h2 className="text-3xl font-bold md:text-4xl" style={{ color: config.text }}>想做类似的官网？</h2>
              <p className="mx-auto mt-4 max-w-xl" style={{ color: config.muted }}>
                提交你的需求，我们会根据行业和目标给出专属方案建议。
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
                  style={{
                    borderRadius: "999px",
                    background: config.gradient,
                    color: config.style === "tesla" || config.style === "vercel" || config.style === "industrial" ? "#fff" : "#221407",
                    boxShadow: `0 4px 16px ${config.primary}33`,
                  }}
                >
                  预约沟通 <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
                  style={{
                    borderRadius: "999px",
                    border: `2px solid ${config.muted}33`,
                    color: config.text,
                  }}
                >
                  查看套餐
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
