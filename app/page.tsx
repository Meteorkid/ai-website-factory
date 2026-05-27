import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Layers,
  Rocket,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
  Target,
  Globe,
  Clock,
  Star,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

/* 非首屏组件使用动态导入，减少初始 JS 体积 */
const DynamicServiceValuesSection = dynamic(
  () => import("@/components/home/ServiceValuesSection"),
  { ssr: false, loading: () => <div className="py-20" /> }
);
const DynamicPricingSection = dynamic(
  () => import("@/components/home/PricingSection"),
  { ssr: false, loading: () => <div className="py-20" /> }
);
const DynamicComparisonSection = dynamic(
  () => import("@/components/home/ComparisonSection"),
  { ssr: false, loading: () => <div className="py-20" /> }
);
const DynamicFeaturedCasesSection = dynamic(
  () => import("@/components/home/FeaturedCasesSection"),
  { ssr: false, loading: () => <div className="py-20" /> }
);
const DynamicCtaSection = dynamic(
  () => import("@/components/home/CtaSection"),
  { ssr: false, loading: () => <div className="py-20" /> }
);
const DynamicFaqSection = dynamic(
  () => import("@/components/home/FaqSection"),
  { ssr: false, loading: () => <div className="py-20" /> }
);

const serviceValues = [
  {
    icon: Rocket,
    title: "AI 驱动效率",
    desc: "AI 辅助生成网站结构、初版文案和页面方向，团队再做人工审核与设计落地。",
    stats: "效率提升 3x",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Sparkles,
    title: "专业设计呈现",
    desc: "围绕行业、客户、转化目标和品牌调性组织页面，而不是把模板简单换字。",
    stats: "转化率提升 40%",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Wrench,
    title: "省心维护托管",
    desc: "上线后继续处理托管、证书、备份、小改动、表单检查和基础访问报告。",
    stats: "99.9% 可用性",
    color: "from-emerald-500 to-teal-500",
  },
];

const processSteps = [
  {
    icon: FileText,
    title: "资料提交",
    desc: "客户提交业务介绍、Logo、图片、参考网站和联系方式。",
    output: "需求文档",
    time: "Day 1",
  },
  {
    icon: Sparkles,
    title: "AI 初稿",
    desc: "生成网站定位、页面结构、首页文案、FAQ 和 SEO 建议。",
    output: "策略方案",
    time: "Day 2-3",
  },
  {
    icon: Layers,
    title: "专家打磨",
    desc: "团队完成文案校对、视觉设计、响应式开发和预览站。",
    output: "设计稿 + 预览",
    time: "Day 4-10",
  },
  {
    icon: ShieldCheck,
    title: "上线维护",
    desc: "配置域名、SSL、表单、统计、备份，并交付维护建议。",
    output: "正式官网",
    time: "Day 11-14",
  },
];

const packages = [
  {
    id: "starter",
    name: "Starter",
    title: "单页官网",
    price: "3,000-8,000",
    unit: "元",
    desc: "适合个人品牌、活动页、早期项目和 Waitlist。",
    features: [
      "1 个页面",
      "1 套视觉方向",
      "1 轮修改",
      "基础 SEO",
      "表单接入",
      "3-7 天交付",
    ],
    icon: FileText,
  },
  {
    id: "pro",
    name: "Pro",
    title: "企业官网",
    price: "10,000-30,000",
    unit: "元",
    desc: "适合中小企业、创业公司、校友企业和本地服务公司。",
    features: [
      "5-8 个页面",
      "2 轮修改",
      "基础统计",
      "域名与 SSL 协助",
      "案例或文章结构",
      "7-14 天交付",
    ],
    popular: true,
    icon: Globe,
  },
  {
    id: "premium",
    name: "Premium",
    title: "品牌增长官网",
    price: "50,000",
    unit: "元起",
    desc: "适合品牌表达、招商合作、多语言或 SEO 内容要求更高的客户。",
    features: [
      "8-15 个页面",
      "3 轮修改",
      "品牌策略",
      "深度文案",
      "数据看板可选",
      "14-30 天交付",
    ],
    icon: Star,
  },
];

const comparisons = [
  ["上线方式", "自行操作", "项目外包", "团队交付"],
  ["内容表达", "客户自己整理", "依赖沟通质量", "AI 初稿 + 人工校对"],
  ["设计质量", "模板同质化", "看外包水平", "模板复用 + 定制打磨"],
  ["修改边界", "自己反复调整", "容易失控", "集中反馈，轮次清晰"],
  ["后期维护", "客户自己处理", "常常另算", "可接月度维护"],
  ["价格透明度", "自己比价", "口头报价", "套餐定价 + 明确范围"],
  ["SEO 基础", "需自行配置", "部分包含", "标题/描述/结构/收录建议"],
  ["改版灵活性", "完全自由但耗时", "依赖原团队", "模板复用 + 定制"],
];

const faqs = [
  {
    q: "你们是不是让 AI 自动生成一个网站就交付？",
    a: "不是。AI 只负责提高策略、文案和初稿效率，客户可见页面会经过人工审核、设计修正、响应式适配和上线 QA。",
  },
  {
    q: "官网多久可以上线？",
    a: "单页官网通常 3-7 天，标准企业官网通常 7-14 天，复杂品牌增长官网按页面范围和素材完整度评估。",
  },
  {
    q: "客户需要准备什么资料？",
    a: "建议准备公司简介、产品服务、目标客户、联系方式、Logo、图片素材、参考网站、域名或备案信息。资料越完整，交付越快。",
  },
  {
    q: "是否承诺 SEO 排名？",
    a: "不承诺具体排名。我们会提供基础 SEO 标题、描述、页面结构和收录建议，后续增长内容可单独评估。",
  },
  {
    q: "上线后还能继续维护吗？",
    a: "可以。维护服务包括托管、SSL、备份、小文案修改、表单检查、访问报告和后续页面优化建议。",
  },
];

const trustBadges = [
  { label: "已服务", value: "50+", suffix: "家企业" },
  { label: "平均交付", value: "10", suffix: "天" },
  { label: "客户满意度", value: "98", suffix: "%" },
  { label: "续维护率", value: "85", suffix: "%" },
];

export default async function Home() {
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
        {/* 浮动光球背景 */}
        <div className="floating-orb floating-orb-1" />
        <div className="floating-orb floating-orb-2" />
        <div className="floating-orb floating-orb-3" />

        {/* 玻璃网格背景 */}
        <div className="absolute inset-0 glass-grid opacity-30" />

        <div className="section-shell relative z-10">
          {/* 顶部徽章 */}
          <div className="animate-hero-in animate-hero-in-delay-1 flex justify-center">
            <div className="floating-label liquid-glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
              <span className="pulse-ring relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-muted">AI 初稿 · 专家打磨 · 上线维护</span>
            </div>
          </div>

          {/* 主标题 */}
          <div className="animate-hero-in animate-hero-in-delay-2 mx-auto mt-8 max-w-5xl text-center">
            <h1 className="text-[44px] font-extrabold leading-[1.08] md:text-[72px] lg:text-[88px]">
              <span className="block">让官网像产品一样</span>
              <span className="headline-gradient block mt-2">被认真设计</span>
            </h1>
          </div>

          {/* 副标题 */}
          <p className="animate-hero-in animate-hero-in-delay-3 mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted md:text-xl">
            面向创业团队、中小企业和本地服务公司。
            <br className="hidden md:block" />
            你提交资料，我们完成网站策略、文案、设计、开发、部署与持续维护。
          </p>

          {/* CTA 按钮组 */}
          <div className="animate-hero-in animate-hero-in-delay-4 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="amber-button group relative overflow-hidden px-8 py-4 text-base"
            >
              <span className="relative z-10 flex items-center gap-2">
                立即提交需求
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              href="/process"
              className="glass-button px-8 py-4 text-base"
            >
              <span className="flex items-center gap-2">
                查看交付流程
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          {/* 信任指标 */}
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
        {/* 装饰背景 */}
        <div className="absolute inset-0 deco-dots" />

        <div className="section-shell relative z-10">
          <div className="reveal grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            {/* 左侧文案 */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-accent">
                <Zap className="h-4 w-4" />
                高效交付
              </div>
              <h2 className="mt-4 text-3xl font-bold leading-snug md:text-5xl">
                从资料提交到正式上线，
                <br />
                <span className="text-flow">流程清楚才省心。</span>
              </h2>
              <p className="mt-5 text-lg text-muted">
                第一阶段不做复杂自助编辑器，而是先把高质量官网交付跑通，再把重复动作沉淀为模板和内部工具。
              </p>
              <Link
                href="/process"
                className="glass-button mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm"
              >
                查看完整流程
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* 右侧流程卡片 */}
            <div className="relative">
              {/* 连接线 */}
              <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-accent via-accent-secondary to-transparent" />

              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="glow-card liquid-glass group relative rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      {/* 步骤编号 */}
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
                          <span className="text-xs text-muted">输出物：</span>
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

      <DynamicServiceValuesSection items={serviceValues} />

      <DynamicPricingSection items={packages} />

      <DynamicComparisonSection rows={comparisons} />

      <DynamicFeaturedCasesSection cases={serializedCases} />

      <DynamicCtaSection />

      <DynamicFaqSection items={faqs} />
    </>
  );
}
