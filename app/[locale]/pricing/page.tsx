import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle, ChevronDown, Star, X } from "lucide-react";

export const metadata: Metadata = {
  title: "服务套餐 - AI 官网工场",
  description: "查看 Starter、Pro、Premium 官网建设套餐和月度维护服务。",
};

const packages = [
  {
    id: "starter",
    name: "Starter",
    title: "单页官网",
    price: "3,000-8,000 元",
    target: "个人品牌、活动页、早期项目、Waitlist",
    period: "3-7 天",
    revisions: "1 轮修改",
    features: ["1 个页面", "1 套视觉方向", "基础文案整理", "响应式页面", "基础 SEO", "咨询表单"],
  },
  {
    id: "pro",
    name: "Pro",
    title: "企业官网",
    price: "10,000-30,000 元",
    target: "中小企业、创业公司、校友企业、本地服务公司",
    period: "7-14 天",
    revisions: "2 轮修改",
    popular: true,
    features: ["5-8 个页面", "首页/关于/服务/案例/联系", "基础统计", "域名与 SSL 协助", "文章或动态结构", "上线检查"],
  },
  {
    id: "premium",
    name: "Premium",
    title: "品牌增长官网",
    price: "50,000 元起",
    target: "品牌展示、招商合作、多语言或 SEO 要求较高的客户",
    period: "14-30 天",
    revisions: "3 轮修改",
    features: ["8-15 个页面", "品牌策略", "深度文案", "多语言可选", "数据看板可选", "增长建议"],
  },
];

const maintenance = [
  ["基础维护", "499-999 元/月", "托管、SSL、备份、小文案修改、表单检查"],
  ["增强维护", "1,999-4,999 元/月", "访问报告、页面性能检查、内容更新和维护建议"],
  ["增长优化", "5,000 元/月起", "SEO 内容、专题页、广告落地页和转化优化建议"],
];

const boundaries = [
  "标准官网页面设计与开发",
  "基础文案整理与优化",
  "响应式适配",
  "咨询表单或联系方式入口",
  "基础 SEO 标题和描述",
  "预览站与正式站部署协助",
  "约定轮次内集中修改",
];

const notIncluded = [
  "复杂会员系统",
  "电商交易系统",
  "小程序或 App 开发",
  "大型后台管理系统",
  "广告投放执行",
  "SEO 排名承诺",
  "无限次改稿",
];

const featureMatrix = [
  { feature: "页面数量", starter: "1页", pro: "5-8页", premium: "8-15页" },
  { feature: "视觉定制", starter: "基础模板", pro: "深度定制", premium: "全定制" },
  { feature: "修改轮次", starter: "1轮", pro: "2轮", premium: "3轮" },
  { feature: "文案深度", starter: "基础整理", pro: "深度优化", premium: "品牌策略" },
  { feature: "响应式适配", starter: true, pro: true, premium: true },
  { feature: "SEO 基础", starter: true, pro: true, premium: true },
  { feature: "统计分析", starter: false, pro: true, premium: true },
  { feature: "域名协助", starter: false, pro: true, premium: true },
  { feature: "SSL 配置", starter: true, pro: true, premium: true },
  { feature: "在线表单", starter: false, pro: true, premium: true },
  { feature: "多语言", starter: false, pro: false, premium: true },
  { feature: "数据看板", starter: false, pro: false, premium: true },
  { feature: "交付周期", starter: "3-7天", pro: "7-14天", premium: "14-30天" },
  { feature: "售后支持", starter: "邮件", pro: "邮件+微信", premium: "专属对接" },
  { feature: "品牌策略", starter: false, pro: "基础", premium: "完整" },
  { feature: "内容策划", starter: false, pro: true, premium: true },
];

const faqs = [
  { q: "报价是否固定？", a: "页面数量、文案深度、素材完整度、语言版本和上线要求都会影响报价。我们会在沟通后给出明确范围。" },
  { q: "付款方式如何安排？", a: "建议签约后支付 50% 首款，正式上线前支付 50% 尾款，具体以双方合同为准。" },
  { q: "超出套餐范围怎么办？", a: "超出页面数量、修改轮次或功能范围的需求会单独评估报价，不默认进入标准套餐。" },
  { q: "域名、备案和服务器包含吗？", a: "我们提供协助和建议，具体域名、备案、托管和第三方服务费用按实际情况确认。" },
];

export default function PricingPage() {
  return (
    <>
      <section className="pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="section-shell text-center">
          <p className="section-kicker">Pricing</p>
          <h1 className="headline-gradient mx-auto mt-3 max-w-4xl text-[42px] font-extrabold leading-none md:text-[76px]">
            价格要清楚，边界也要清楚。
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            官网建设按页面范围、交付周期和修改轮次分层。正式报价会根据需求沟通后确认。
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
                className={`relative flex flex-col rounded-[30px] p-7 ${pkg.popular ? "liquid-glass" : "warm-card"}`}
              >
                {pkg.popular && (
                  <span className="mb-5 inline-flex items-center gap-1 self-start rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent">
                    <Star className="h-3.5 w-3.5" /> 推荐
                  </span>
                )}
                <p className="font-mono text-sm font-bold text-accent">{pkg.name}</p>
                <h2 className="mt-2 text-2xl font-bold">{pkg.title}</h2>
                <p className="mt-3 text-2xl font-bold">{pkg.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{pkg.target}</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-accent-soft p-3">
                    <p className="text-xs text-muted">周期</p>
                    <p className="font-bold text-accent">{pkg.period}</p>
                  </div>
                  <div className="rounded-2xl bg-accent-soft p-3">
                    <p className="text-xs text-muted">修改</p>
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
                  获取报价
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="section-shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker">Features</p>
            <h2 className="mt-3 text-3xl font-bold leading-snug md:text-5xl">功能对比</h2>
            <p className="mt-4 text-muted">
              每档套餐包含什么、不包含什么，一目了然。
            </p>
          </div>
          <div className="reveal warm-card mt-12 overflow-x-auto rounded-[28px]">
            <p className="px-6 pt-5 text-xs text-muted md:hidden">← 左右滑动查看完整对比 →</p>
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-muted">功能项</th>
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
            <p className="section-kicker">Maintenance</p>
            <h2 className="mt-3 text-3xl font-bold leading-snug md:text-5xl">上线后继续维护。</h2>
          </div>
          <div className="reveal-stagger mt-12 grid gap-4 md:grid-cols-3">
            {maintenance.map(([name, price, desc]) => (
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
            <h2 className="text-2xl font-bold">标准包含</h2>
            <ul className="mt-6 space-y-3">
              {boundaries.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="warm-card rounded-[30px] p-7">
            <h2 className="text-2xl font-bold">标准不包含</h2>
            <ul className="mt-6 space-y-3">
              {notIncluded.map((item) => (
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
          <h2 className="text-center text-3xl font-bold leading-snug md:text-5xl">常见问题</h2>
          <div className="warm-card mt-10 divide-y divide-border rounded-[28px] px-5 md:px-7">
            {faqs.map((faq) => (
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
            <h2 className="text-3xl font-bold leading-snug md:text-5xl">不确定选哪个？</h2>
            <p className="mx-auto mt-5 max-w-2xl text-muted">
              提交行业、页面数量、上线时间和参考网站，我们会先判断适合的范围。
            </p>
            <Link href="/contact" className="amber-button mt-8 px-7 py-3.5 text-sm">
              预约沟通
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
