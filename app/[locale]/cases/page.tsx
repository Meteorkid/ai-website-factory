import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import CasesPageClient from "./CasesPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default async function CasesPage() {
  const cases = await prisma.case.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
  });

  const industries = [...new Set(cases.map((c) => c.industry))];

  const serializedCases = cases.map((c) => ({
    ...c,
    tags: JSON.parse(c.tags) as string[],
    pages: JSON.parse(c.pages) as string[],
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }));

  return <CasesPageClient cases={serializedCases} industries={industries} />;
}
