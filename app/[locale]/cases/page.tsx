import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CasesPageClient from "./CasesPageClient";

export const metadata: Metadata = {
  title: "案例展示",
  description: "查看 AI 官网工场为各行业客户交付的官网案例，了解我们的设计标准和服务质量。",
};

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
