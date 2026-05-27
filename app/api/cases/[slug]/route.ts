import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const caseData = await prisma.case.findUnique({
    where: { slug },
  });

  if (!caseData) {
    return NextResponse.json({ error: "案例不存在" }, { status: 404 });
  }

  return NextResponse.json({ data: caseData });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await request.json();

  const existing = await prisma.case.findUnique({ where: { slug } });
  if (!existing) {
    return NextResponse.json({ error: "案例不存在" }, { status: 404 });
  }

  const updated = await prisma.case.update({
    where: { slug },
    data: {
      title: body.title,
      industry: body.industry,
      clientName: body.clientName,
      background: body.background,
      challenge: body.challenge,
      solution: body.solution,
      result: body.result,
      packageName: body.packageName,
      timeline: body.timeline,
      tags: body.tags ? JSON.stringify(body.tags) : undefined,
      pages: body.pages ? JSON.stringify(body.pages) : undefined,
      featured: body.featured,
      sortOrder: body.sortOrder,
      published: body.published,
      testimonial: body.testimonial,
      testimonialAuthor: body.testimonialAuthor,
    },
  });

  return NextResponse.json({ data: updated });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const existing = await prisma.case.findUnique({ where: { slug } });
  if (!existing) {
    return NextResponse.json({ error: "案例不存在" }, { status: 404 });
  }

  await prisma.case.delete({ where: { slug } });

  return NextResponse.json({ success: true });
}
