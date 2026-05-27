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

const heroStats = [
  { value: "3-7天", label: "单页官网上线", icon: Zap },
  { value: "7-14天", label: "企业官网交付", icon: Clock },
  { value: "1-3轮", label: "集中修改边界", icon: Target },
  { value: "持续", label: "上线后维护托管", icon: ShieldCheck },
];

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

      {/* ========== 套餐定价 ========== */}
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
            {packages.map((pkg) => (
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

      {/* ========== 对比表格 ========== */}
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
              ← 左右滑动查看完整对比 →
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
                  {comparisons.map(
                    ([label, selfServe, outsource, us], index) => (
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
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <p className="reveal mx-auto mt-6 max-w-2xl text-center text-sm text-muted">
            从价格到 SEO，从维护到改版——我们把传统建站中模糊的部分变成明确的交付承诺。
          </p>
        </div>
      </section>

      {/* ========== 案例展示 ========== */}
      {serializedCases.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="section-shell">
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-accent">
                <Star className="h-4 w-4" />
                精选案例
              </div>
              <h2 className="mt-4 text-3xl font-bold leading-snug md:text-5xl">
                看看我们交付过的官网。
              </h2>
              <p className="mt-4 text-lg text-muted">
                真实项目，真实交付。每个案例都经历了从策略到上线的完整流程。
              </p>
            </div>

            <div className="reveal-stagger mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {serializedCases.map((c) => (
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

            <div className="mt-12 text-center">
              <Link
                href="/cases"
                className="glass-button inline-flex items-center gap-2 px-8 py-4 text-base"
              >
                查看更多案例
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ========== CTA ========== */}
      <section className="bg-surface/55 py-20 md:py-28">
        <div className="section-shell">
          <div className="reveal relative overflow-hidden rounded-[36px] p-10 text-center md:p-16">
            {/* 背景光效 */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-secondary/10" />
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-accent-secondary/20 blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-sm font-semibold text-accent">
                <Rocket className="h-4 w-4" />
                开始你的项目
              </div>
              <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold leading-snug md:text-5xl">
                先用 30 分钟，
                <br />
                判断你的官网应该怎么做。
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
                我们会先确认行业、页面范围、上线时间、素材完整度和转化目标，再给出适合的套餐建议。
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="amber-button group relative overflow-hidden px-8 py-4 text-base"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    预约 30 分钟沟通
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
                <Link
                  href="/pricing"
                  className="glass-button px-8 py-4 text-base"
                >
                  查看套餐详情
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="py-20 md:py-28">
        <div className="section-shell max-w-3xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-2 text-sm font-semibold text-accent">
              <FileText className="h-4 w-4" />
              常见问题
            </div>
            <h2 className="mt-4 text-3xl font-bold leading-snug md:text-5xl">
              你可能想知道的
            </h2>
          </div>

          <div className="reveal mt-10 divide-y divide-border overflow-hidden rounded-[28px] border border-border bg-surface/80 px-5 md:px-7">
            {faqs.map((faq) => (
              <details key={faq.q} className="group">
                <summary className="flex cursor-pointer items-center justify-between gap-5 py-6 text-left font-semibold transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:rounded-lg">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180" />
                </summary>
                <p className="pb-6 text-sm leading-relaxed text-muted">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
