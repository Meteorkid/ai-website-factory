"use client";

import dynamic from "next/dynamic";
import type { LucideIcon } from "lucide-react";

/* 非首屏组件使用动态导入，减少初始 JS 体积 */
const DynamicServiceValuesSection = dynamic(
  () => import("@/components/home/ServiceValuesSection"),
  { ssr: false, loading: () => <div className="py-20" /> }
);
const DynamicPricingSection = dynamic(
  () => import("@/components/home/PricingSection"),
  { ssr: false, loading: () => <div className="py-20" /> }
);
const DynamicComparisonSection = dynamic(
  () => import("@/components/home/ComparisonSection"),
  { ssr: false, loading: () => <div className="py-20" /> }
);
const DynamicFeaturedCasesSection = dynamic(
  () => import("@/components/home/FeaturedCasesSection"),
  { ssr: false, loading: () => <div className="py-20" /> }
);
const DynamicCtaSection = dynamic(
  () => import("@/components/home/CtaSection"),
  { ssr: false, loading: () => <div className="py-20" /> }
);
const DynamicFaqSection = dynamic(
  () => import("@/components/home/FaqSection"),
  { ssr: false, loading: () => <div className="py-20" /> }
);

interface ServiceValue {
  icon: LucideIcon;
  title: string;
  desc: string;
  stats: string;
  color: string;
}

interface Package {
  id: string;
  name: string;
  title: string;
  price: string;
  unit: string;
  desc: string;
  features: string[];
  popular?: boolean;
  icon: LucideIcon;
}

interface SerializedCase {
  id: string;
  slug: string;
  title: string;
  industry: string;
  clientName: string;
  packageName: string;
  timeline: string;
  result: string;
  tags: string[];
  pages: string[];
}

interface Faq {
  q: string;
  a: string;
}

interface HomeBelowFoldProps {
  serviceValues: ServiceValue[];
  packages: Package[];
  comparisons: [string, string, string, string][];
  serializedCases: SerializedCase[];
  faqs: Faq[];
}

export default function HomeBelowFold({
  serviceValues,
  packages,
  comparisons,
  serializedCases,
  faqs,
}: HomeBelowFoldProps) {
  return (
    <>
      <DynamicServiceValuesSection items={serviceValues} />
      <DynamicPricingSection items={packages} />
      <DynamicComparisonSection rows={comparisons} />
      <DynamicFeaturedCasesSection cases={serializedCases} />
      <DynamicCtaSection />
      <DynamicFaqSection items={faqs} />
    </>
  );
}
