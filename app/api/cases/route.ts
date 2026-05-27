import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const industry = searchParams.get("industry");
  const tag = searchParams.get("tag");
  const search = searchParams.get("search");

  const showAll = searchParams.get("all") === "true";
  const where: Record<string, unknown> = showAll ? {} : { published: true };

  if (industry) {
    where.industry = industry;
  }

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { clientName: { contains: search } },
    ];
  }

  const cases = await prisma.case.findMany({
    where,
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
  });

  // 按标签筛选（SQLite JSON 字段需要应用层过滤）
  let filtered = cases;
  if (tag) {
    filtered = cases.filter((c) => {
      const tags = JSON.parse(c.tags) as string[];
      return tags.includes(tag);
    });
  }

  return NextResponse.json({ data: filtered, total: filtered.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { slug, title, industry, clientName, background, challenge, solution, result, packageName, timeline, tags, pages, featured, testimonial, testimonialAuthor } = body;

  if (!slug || !title || !industry || !clientName || !background || !challenge || !solution || !result || !packageName || !timeline) {
    return NextResponse.json({ error: "缺少必填字段" }, { status: 400 });
  }

  const existing = await prisma.case.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: "slug 已存在" }, { status: 409 });
  }

  const newCase = await prisma.case.create({
    data: {
      slug,
      title,
      industry,
      clientName,
      background,
      challenge,
      solution,
      result,
      packageName,
      timeline,
      tags: JSON.stringify(tags || []),
      pages: JSON.stringify(pages || []),
      featured: featured || false,
      testimonial: testimonial || null,
      testimonialAuthor: testimonialAuthor || null,
    },
  });

  return NextResponse.json({ data: newCase }, { status: 201 });
}
