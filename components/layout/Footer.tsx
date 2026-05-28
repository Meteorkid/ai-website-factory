"use client";

import { Link } from "@/lib/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  const footerSections = [
    {
      title: t("nav.services"),
      links: [
        { label: t("links.pricing"), href: "/pricing" },
        { label: t("links.process"), href: "/process" },
        { label: t("links.maintenance"), href: "/maintenance" },
        { label: t("links.contact"), href: "/contact" },
      ],
    },
    {
      title: t("nav.resources"),
      links: [
        { label: "Starter", href: "/pricing#starter" },
        { label: "Pro", href: "/pricing#pro" },
        { label: "Premium", href: "/pricing#premium" },
        { label: t("links.maintenance"), href: "/maintenance" },
      ],
    },
    {
      title: t("links.about"),
      links: [
        { label: t("links.cases"), href: "/cases" },
        { label: t("links.about"), href: "/about" },
        { label: t("links.faq"), href: "/pricing#faq" },
        { label: t("links.contact"), href: "/contact" },
      ],
    },
    {
      title: t("nav.contact"),
      links: [
        { label: t("links.contact"), href: "/contact" },
        { label: t("links.about"), href: "/about" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-surface/70">
      <div className="section-shell py-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <Link href="/" className="text-base font-bold">
              {t("brandName")}
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {t("desc")}
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
          &copy; 2026 {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
