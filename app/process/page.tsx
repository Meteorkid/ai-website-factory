import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle, ClipboardList, FileText, Palette, Rocket, Search, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "交付流程 - AI 官网工场",
  description: "了解 AI 官网工场从需求收集、策略文案、页面制作到正式上线的标准交付流程。",
};

const stages = [
  {
    icon: Search,
    title: "初步沟通",
    customer: ["说明行业、业务、预算和上线时间", "提供已有官网或参考网站"],
    team: ["判断需求范围", "推荐套餐和下一步资料清单"],
    output: "初步方案方向",
    outputDesc: "包含需求范围、建议套餐、时间线",
  },
  {
    icon: ClipboardList,
    title: "资料提交",
    customer: ["填写资料表", "上传 Logo、图片、业务介绍和联系方式"],
    team: ["检查资料完整度", "整理客户 Brief"],
    output: "项目 Brief",
    outputDesc: "客户资料整理、图片素材清单、竞品分析",
  },
  {
    icon: FileText,
    title: "网站策划",
    customer: ["确认页面结构和重点内容", "补充必要事实信息"],
    team: ["生成网站结构", "整理文案方向和转化路径"],
    output: "网站结构稿",
    outputDesc: "页面层级、导航结构、内容大纲",
  },
  {
    icon: Palette,
    title: "页面制作",
    customer: ["反馈偏好的视觉方向", "集中确认预览站"],
    team: ["设计页面", "开发响应式前端", "生成预览站"],
    output: "预览站链接",
    outputDesc: "可在线预览的响应式页面",
  },
  {
    icon: CheckCircle,
    title: "集中修改",
    customer: ["一次性提交修改意见", "确认是否超出范围"],
    team: ["合并反馈", "完成约定轮次修改"],
    output: "修改版预览",
    outputDesc: "整合反馈后的更新版本",
  },
  {
    icon: Rocket,
    title: "正式上线",
    customer: ["确认验收并支付尾款", "配合域名或备案资料"],
    team: ["绑定域名", "配置 SSL、统计、备份和表单"],
    output: "正式官网",
    outputDesc: "域名上线、SSL/统计/备份就绪",
  },
  {
    icon: ShieldCheck,
    title: "后期维护",
    customer: ["提出维护或增长需求", "确认维护套餐"],
    team: ["内容小改", "证书检查", "访问报告和优化建议"],
    output: "维护记录",
    outputDesc: "月度报告、更新日志",
  },
];

const standards = ["页面范围符合约定", "桌面端和移动端可访问", "导航、链接、表单和联系方式可正常使用", "域名、SSL、统计和备份配置完成", "约定修改轮次内的问题已处理", "客户确认正式上线"];

export default function ProcessPage() {
  return (
    <>
      <section className="pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="section-shell text-center">
          <p className="section-kicker">Process</p>
          <h1 className="headline-gradient mx-auto mt-3 max-w-4xl text-[42px] font-extrabold leading-none md:text-[76px]">
            交付流程清楚，项目才不会失控。
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            我们用集中反馈、明确输出物和约定修改轮次，控制传统建站项目最容易失控的沟通成本。
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="section-shell">
          <div className="reveal-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {stages.map((stage, index) => (
              <div key={stage.title} className="liquid-glass rounded-[28px] p-5 lg:col-span-1">
                <stage.icon className="h-6 w-6 text-accent" />
                <p className="mt-5 font-mono text-sm text-accent">0{index + 1}</p>
                <h2 className="mt-1 text-lg font-bold">{stage.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface/55 py-20 md:py-28">
        <div className="section-shell max-w-4xl">
          <div className="reveal grid gap-4">
            {stages.map((stage, index) => (
              <div key={stage.title} className="warm-card rounded-[30px] p-7">
                <div className="mb-6 flex flex-wrap items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-accent-soft text-accent">
                    <stage.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-mono text-sm text-accent">阶段 0{index + 1}</p>
                    <h2 className="text-2xl font-bold">{stage.title}</h2>
                  </div>
                  <p className="ml-auto rounded-full border border-border px-4 py-2 text-sm text-muted">
                    输出：{stage.output}
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 font-semibold">客户需要做</h3>
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
                    <h3 className="mb-3 font-semibold">我们负责</h3>
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
                  <p className="text-xs font-semibold text-accent">输出物</p>
                  <p className="mt-1 text-sm font-bold">{stage.output}</p>
                  <p className="mt-1 text-xs text-muted">{stage.outputDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="section-shell max-w-3xl">
          <div className="text-center">
            <p className="section-kicker">Acceptance</p>
            <h2 className="mt-3 text-3xl font-bold leading-snug md:text-5xl">验收标准</h2>
          </div>
          <div className="warm-card mt-10 rounded-[30px] p-7">
            <ul className="space-y-3">
              {standards.map((standard) => (
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
            <h2 className="text-3xl font-bold leading-snug md:text-5xl">准备好开始第 1 步了吗？</h2>
            <p className="mx-auto mt-5 max-w-2xl text-muted">
              先提交基础资料，我们会判断适合的页面范围和交付节奏。
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
