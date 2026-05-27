"use client";

import dynamic from "next/dynamic";

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
  icon: React.ComponentType<{ className?: string }>;
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
  icon: React.ComponentType<{ className?: string }>;
}

interface SerializedCase {
  id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  pages: string[];
  thumbnail: string;
  client: string;
  industry: string;
  createdAt: string;
  updatedAt: string;
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
