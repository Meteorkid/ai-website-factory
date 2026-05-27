"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3, BookOpen, FileText, FolderOpen, Layout, Menu, Shield, X,
} from "lucide-react";

const sidebarItems = [
  { label: "数据看板", href: "/admin", icon: BarChart3 },
  { label: "提交管理", href: "/admin/submissions", icon: FileText },
  { label: "项目管理", href: "/admin/projects", icon: FolderOpen },
  { label: "模板管理", href: "/admin/templates", icon: Layout },
  { label: "案例管理", href: "/admin/cases", icon: BookOpen },
  { label: "维护管理", href: "/admin/maintenance", icon: Shield },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed left-4 top-4 z-50 grid h-10 w-10 place-items-center rounded-full liquid-glass md:hidden"
        aria-label={open ? "关闭菜单" : "打开菜单"}
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 border-r border-border bg-surface/90 backdrop-blur-xl transition-transform duration-200 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center border-b border-border px-5">
          <Link href="/" className="text-sm font-bold text-accent">
            AI 官网工场
          </Link>
          <span className="ml-2 rounded bg-red-100 px-2 py-0.5 text-xs text-red-700">Admin</span>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {sidebarItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                  active
                    ? "bg-accent-soft font-semibold text-accent"
                    : "text-muted hover:bg-surface-2 hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {open && (
        <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setOpen(false)} />
      )}

      <main className="flex-1 overflow-x-hidden md:ml-60">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">{children}</div>
      </main>
    </div>
  );
}
