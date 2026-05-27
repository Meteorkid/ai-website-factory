import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const templates = await prisma.template.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: templates });
  } catch {
    return NextResponse.json({ error: "查询失败" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, industry, description, pages } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "请填写模板名称" }, { status: 400 });
    }

    const template = await prisma.template.create({
      data: {
        name: name.trim(),
        industry: industry || "其他",
        description: description || null,
        pages: JSON.stringify(pages || []),
      },
    });

    return NextResponse.json({ data: template }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "创建失败" }, { status: 500 });
  }
}
