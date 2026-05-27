import Link from "next/link";

const footerSections = [
  {
    title: "服务",
    links: [
      { label: "官网建设", href: "/pricing" },
      { label: "交付流程", href: "/process" },
      { label: "月度维护", href: "/maintenance" },
      { label: "资料提交", href: "/contact" },
    ],
  },
  {
    title: "方案",
    links: [
      { label: "Starter", href: "/pricing#starter" },
      { label: "Pro", href: "/pricing#pro" },
      { label: "Premium", href: "/pricing#premium" },
      { label: "维护套餐", href: "/maintenance" },
    ],
  },
  {
    title: "了解",
    links: [
      { label: "案例展示", href: "/cases" },
      { label: "关于我们", href: "/about" },
      { label: "常见问题", href: "/pricing#faq" },
      { label: "联系我们", href: "/contact" },
    ],
  },
  {
    title: "联系",
    links: [
      { label: "提交需求表", href: "/contact" },
      { label: "预约 30 分钟沟通", href: "/contact" },
      { label: "广州", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/70">
      <div className="section-shell py-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <Link href="/" className="text-base font-bold">
              AI 官网工场
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              AI 辅助生成，专业团队交付。帮助创业团队和中小企业更快上线专业、可信、可维护的官网。
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-3 text-sm font-semibold text-foreground">{section.title}</h4>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-5 text-sm text-muted">
          © 2026 AI 官网工场。保留所有权利。
        </div>
      </div>
    </footer>
  );
}
