import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactPageClient from "./ContactPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "提交需求 - AI 官网工场" : "Submit Request - AI Website Factory",
    description: locale === "zh"
      ? "提交行业、页面范围、上线时间和参考网站，获取 AI 官网工场的初步交付建议。"
      : "Submit your industry, page scope, timeline, and reference websites to get initial delivery suggestions from AI Website Factory.",
  };
}

export default function ContactPage() {
  return <ContactPageClient />;
}
