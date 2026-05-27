import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));
    const status = searchParams.get("status");

    const where = status ? { status } : {};

    const [data, total] = await Promise.all([
      prisma.project.findMany({
        where,
        select: {
          id: true,
          title: true,
          packageName: true,
          status: true,
          pages: true,
          price: true,
          deadline: true,
          launchedAt: true,
          clientName: true,
          createdAt: true,
          maintenancePlans: {
            select: {
              id: true,
              name: true,
              price: true,
              period: true,
              active: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.project.count({ where }),
    ]);

    return NextResponse.json({ data, total, page, limit });
  } catch {
    return NextResponse.json({ error: "查询失败" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, packageName, pages, revisions, price, deadline, submissionId } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: "请填写项目标题" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title: title.trim(),
        description: description || null,
        packageName: packageName || "Starter",
        pages: pages || 1,
        revisions: revisions || 1,
        price: price || null,
        deadline: deadline ? new Date(deadline) : null,
        submissionId: submissionId || null,
      },
    });

    return NextResponse.json({ data: project }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "创建失败" }, { status: 500 });
  }
}
