import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "提交需求 - AI 官网工场",
  description: "提交行业、页面范围、上线时间和参考网站，获取 AI 官网工场的初步交付建议。",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
