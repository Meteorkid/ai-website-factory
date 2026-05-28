import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import type { Metadata, Viewport } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/PageTransition";
import RevealOnScroll from "@/components/RevealOnScroll";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { routing } from "@/lib/i18n/config";

const themeScript = `
(() => {
  try {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", shouldUseDark);
  } catch {
    document.documentElement.classList.remove("dark");
  }
})();
`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffdf8" },
    { media: "(prefers-color-scheme: dark)", color: "#090704" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-workshop.example.com"),
  manifest: "/manifest.json",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "zh" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: locale === "zh" ? "AI 官网工场" : "AI Website Factory",
            url: "https://ai-workshop.example.com",
            description:
              locale === "zh"
                ? "AI 辅助生成、专业团队交付的官网建设服务。面向创业团队和中小企业，7 天上线专业官网。"
                : "AI-assisted, professionally delivered website building service for startups and SMBs.",
            sameAs: [],
          }),
        }}
      />
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <RevealOnScroll />
      <GoogleAnalytics />
      <Script id="sw-register" strategy="afterInteractive">{`
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.register("/sw.js").catch(() => {});
        }
      `}</Script>
    </NextIntlClientProvider>
  );
}
