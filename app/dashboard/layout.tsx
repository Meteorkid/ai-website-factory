"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FolderOpen, Menu, Shield, X } from "lucide-react";

const sidebarItems = [
  { label: "项目概览", href: "/dashboard", icon: BarChart3 },
  { label: "我的项目", href: "/dashboard/projects", icon: FolderOpen },
  { label: "维护计划", href: "/dashboard/maintenance", icon: Shield },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed left-4 top-4 z-50 grid h-10 w-10 place-items-center rounded-full liquid-glass md:hidden"
        aria-label={open ? "关闭菜单" : "打开菜单"}
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 border-r border-border bg-surface/90 backdrop-blur-xl transition-transform duration-200 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center border-b border-border px-5">
          <Link href="/" className="text-sm font-bold text-accent">
            AI 官网工场
          </Link>
          <span className="ml-2 text-xs text-muted">/ 管理</span>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {sidebarItems.map((item) => {
            const active = pathname === item.href;
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

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden md:ml-60">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">{children}</div>
      </main>
    </div>
  );
}
