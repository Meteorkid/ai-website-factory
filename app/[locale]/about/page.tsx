import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Cpu, Palette, PenTool, Route, Target, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "关于我们 - AI 官网工场",
  description: "了解 AI 官网工场的项目定位、团队分工和阶段路线。",
};

const teamRoles = [
  { role: "A", icon: Target, title: "商业负责人", desc: "负责客户对接、需求评估、项目管理" },
  { role: "B", icon: Cpu, title: "技术负责人", desc: "负责 AI 工具链、全栈开发、系统架构" },
  { role: "C", icon: Palette, title: "设计负责人", desc: "负责视觉设计、交互体验、品牌一致性" },
  { role: "D", icon: PenTool, title: "内容负责人", desc: "负责文案策划、内容运营、SEO 优化" },
];

const roadmap = [
  { title: "第一阶段", desc: "官网获客 + 人工 AI 交付，验证真实客户付费意愿和交付效率。" },
  { title: "第二阶段", desc: "沉淀客户门户、预览系统、模板组件库和半自助 AI 方案生成。" },
  { title: "第三阶段", desc: "逐步升级为 AI 生成、标准模板和专业服务结合的 SaaS 平台。" },
];

export default function AboutPage() {
  return (
    <>
      <section className="pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="section-shell text-center">
          <p className="section-kicker">About</p>
          <h1 className="headline-gradient mx-auto mt-3 max-w-4xl text-[42px] font-extrabold leading-none md:text-[76px]">
            先把交付做好，再把能力产品化。
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            AI 官网工场不是传统外包，也不是一开始就做完整自助建站工具。我们先用 AI 和标准流程提升团队交付效率，再逐步沉淀为 SaaS 能力。
          </p>
        </div>
      </section>

      <section className="bg-surface/55 py-20 md:py-28">
        <div className="reveal section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="section-kicker">Positioning</p>
            <h2 className="mt-3 text-3xl font-bold leading-snug md:text-5xl">客户需要的是可上线、可维护、可增长的官网结果。</h2>
          </div>
          <div className="warm-card rounded-[30px] p-7 text-muted">
            <p>
              早期项目的核心不是追求功能完整的建站平台，而是跑通高质量交付闭环：客户资料收集、AI 生成初稿、人工设计修正、一键预览部署和持续维护。
            </p>
            <p className="mt-4">
              当交付中的重复动作足够稳定后，再把模板、组件、提示词、部署流程和客户门户逐步产品化。
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="section-shell">
          <div className="text-center">
            <p className="section-kicker">Team</p>
            <h2 className="mt-3 text-3xl font-bold leading-snug md:text-5xl">四条主线，各自对结果负责。</h2>
          </div>
          <div className="reveal-stagger mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {teamRoles.map((member) => (
              <div key={member.role} className="warm-card rounded-[28px] p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-accent">{member.role}</span>
                  <member.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold">{member.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface/55 py-20 md:py-28">
        <div className="section-shell">
          <div className="reveal grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="section-kicker">Roadmap</p>
              <h2 className="mt-3 text-3xl font-bold leading-snug md:text-5xl">阶段边界清楚，才不会过早膨胀。</h2>
            </div>
            <div className="relative ml-5 border-l-2 border-accent/30 pl-8">
              {roadmap.map((item, index) => (
                <div key={item.title} className="relative mb-8 last:mb-0">
                  {/* 时间线节点 */}
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
            <h2 className="text-3xl font-bold leading-snug md:text-5xl">看看我们如何交付一个官网。</h2>
            <p className="mx-auto mt-5 max-w-2xl text-muted">
              从需求判断到正式上线，每一步都有输入、输出和修改边界。
            </p>
            <Link href="/process" className="amber-button mt-8 px-7 py-3.5 text-sm">
              查看交付流程
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
