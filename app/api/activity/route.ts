import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");
  const type = searchParams.get("type");
  const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);

  const where: Record<string, unknown> = {};
  if (projectId) where.projectId = projectId;
  if (type) where.type = type;

  const logs = await prisma.activityLog.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return NextResponse.json({ data: logs });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { projectId, type, content, author } = body;

  if (!projectId || !type || !content) {
    return NextResponse.json({ error: "缺少必填字段" }, { status: 400 });
  }

  const log = await prisma.activityLog.create({
    data: {
      projectId,
      type,
      content,
      author: author || "system",
    },
  });

  return NextResponse.json({ data: log }, { status: 201 });
}
