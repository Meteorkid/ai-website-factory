import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BarChart3, CheckCircle, RefreshCw, Shield, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "月度维护 - AI 官网工场",
  description: "了解官网上线后的托管、证书、备份、内容小改、访问报告和增长优化维护服务。",
};

const plans = [
  {
    name: "基础维护",
    price: "499-999 元/月",
    desc: "适合只需要保证官网长期可用的小型站点。",
    features: ["托管与可用性检查", "SSL 检查", "备份提醒", "小文案修改", "表单可用性检查"],
  },
  {
    name: "增强维护",
    price: "1,999-4,999 元/月",
    desc: "适合需要稳定更新内容和查看基础数据的企业站。",
    features: ["包含基础维护", "访问报告", "页面性能检查", "内容更新", "维护建议"],
    recommended: true,
  },
  {
    name: "增长优化",
    price: "5,000 元/月起",
    desc: "适合希望官网持续获客、做内容和专题页优化的客户。",
    features: ["SEO 内容建议", "专题页或落地页", "转化路径优化", "数据复盘", "增长计划"],
  },
];

const reasons = [
  { icon: Shield, title: "稳定可用", desc: "定期检查证书、表单、备份和页面访问状态。" },
  { icon: RefreshCw, title: "内容可更新", desc: "官网上线后仍可持续补充案例、动态和服务说明。" },
  { icon: BarChart3, title: "数据可复盘", desc: "通过访问数据和表单反馈判断页面是否需要优化。" },
  { icon: Wrench, title: "改动有边界", desc: "小改动走维护，大范围改版或新功能单独评估。" },
];

export default function MaintenancePage() {
  return (
    <>
      <section className="pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="section-shell text-center">
          <p className="section-kicker">Maintenance</p>
          <h1 className="headline-gradient mx-auto mt-3 max-w-4xl text-[42px] font-extrabold leading-none md:text-[76px]">
            官网上线不是结束。
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            维护服务让网站长期可用、内容可更新、数据可复盘，避免上线后无人处理。
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="section-shell">
          <div className="reveal-stagger grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col rounded-[30px] p-7 ${plan.recommended ? "liquid-glass" : "warm-card"}`}
              >
                {plan.recommended && (
                  <span className="mb-5 self-start rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent">
                    推荐
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
                  咨询维护方案
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface/55 py-20 md:py-28">
        <div className="section-shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker">Why Maintenance</p>
            <h2 className="mt-3 text-3xl font-bold leading-snug md:text-5xl">维护的价值，是让官网持续在线。</h2>
          </div>
          <div className="reveal-stagger mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => (
              <div key={reason.title} className="warm-card rounded-[28px] p-6">
                <reason.icon className="mb-5 h-6 w-6 text-accent" />
                <h3 className="text-xl font-bold">{reason.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="section-shell">
          <div className="liquid-glass rounded-[36px] p-8 text-center md:p-14">
            <h2 className="text-3xl font-bold leading-snug md:text-5xl">需要一起做维护计划吗？</h2>
            <p className="mx-auto mt-5 max-w-2xl text-muted">
              可以根据网站规模、内容更新频率和增长目标选择维护范围。
            </p>
            <Link href="/contact" className="amber-button mt-8 px-7 py-3.5 text-sm">
              提交需求
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
