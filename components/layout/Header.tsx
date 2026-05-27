"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";

const navItems = [
  { label: "首页", href: "/" },
  { label: "套餐", href: "/pricing" },
  { label: "案例", href: "/cases" },
  { label: "流程", href: "/process" },
  { label: "维护", href: "/maintenance" },
  { label: "关于", href: "/about" },
  { label: "联系", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const toggleTheme = useCallback(() => {
    const shouldUseDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", shouldUseDark);
    localStorage.setItem("theme", shouldUseDark ? "dark" : "light");
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    toggleButtonRef.current?.focus();
  }, []);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isOpen) return;

    const menu = menuRef.current;
    if (!menu) return;

    const focusableElements = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }

      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    firstElement?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMenu]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        跳转到主要内容
      </a>
      <header className="sticky top-0 z-50 px-3 py-3">
        <nav
          className="liquid-glass mx-auto flex h-14 max-w-[1120px] items-center justify-between rounded-full px-3 pl-5"
          role="navigation"
          aria-label="主导航"
        >
          <Link href="/" className="flex items-center gap-2 text-sm font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-soft text-accent">
              <Sparkles className="h-4 w-4" />
            </span>
            <span>AI 官网工场</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-accent-soft text-accent"
                      : "text-muted hover:text-foreground"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Link href="/dashboard" className="glass-button px-4 py-2.5 text-sm">
              我的项目
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              className="glass-button h-10 w-10 p-0"
              aria-label="切换浅色或深色模式"
              title="切换浅色或深色模式"
            >
              <Sun className="theme-icon-sun h-4 w-4" />
              <Moon className="theme-icon-moon h-4 w-4" />
            </button>
            <Link href="/contact" className="amber-button px-5 py-2.5 text-sm">
              预约沟通
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="glass-button h-10 w-10 p-0"
              aria-label="切换浅色或深色模式"
            >
              <Sun className="theme-icon-sun h-4 w-4" />
              <Moon className="theme-icon-moon h-4 w-4" />
            </button>
            <button
              ref={toggleButtonRef}
              type="button"
              className="glass-button h-10 w-10 p-0"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "关闭菜单" : "打开菜单"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-label="移动端导航菜单"
          aria-modal="true"
          className="md:hidden"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(-8px)",
            pointerEvents: isOpen ? "auto" : "none",
            transition: "opacity 200ms ease, transform 200ms ease",
          }}
        >
          <div className="liquid-glass mx-auto mt-2 max-w-[1120px] rounded-3xl p-3">
            <div className="grid gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-2xl px-4 py-3 text-sm transition-colors ${
                      isActive ? "bg-accent-soft text-accent" : "text-muted hover:text-foreground"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="amber-button mt-2 px-5 py-3 text-sm"
                onClick={closeMenu}
              >
                预约沟通
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
