import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/PageTransition";
import RevealOnScroll from "@/components/RevealOnScroll";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-workshop.example.com"),
  title: {
    default: "AI 官网工场 - 7 天上线专业官网",
    template: "%s - AI 官网工场",
  },
  description:
    "AI 官网工场面向创业团队、中小企业和本地服务公司，提供 AI 辅助生成、专业团队设计开发、部署上线和持续维护的一体化官网交付服务。",
  keywords: [
    "AI 官网建设",
    "企业官网设计",
    "官网部署",
    "官网维护",
    "中小企业官网",
    "创业公司官网",
  ],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "AI 官网工场",
    title: "AI 官网工场 - 7 天上线专业官网",
    description:
      "AI 辅助生成、专业团队交付。帮助创业团队和中小企业更快上线专业、可信、可维护的官网。",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI 官网工场 - 7 天上线专业官网",
    description:
      "AI 辅助生成、专业团队交付。帮助创业团队和中小企业更快上线专业、可信、可维护的官网。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <RevealOnScroll />
      </body>
    </html>
  );
}
