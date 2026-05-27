import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const plans = await prisma.maintenancePlan.findMany({
      include: { project: { select: { id: true, title: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: plans });
  } catch {
    return NextResponse.json({ error: "查询失败" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, price, period, features, projectId } = body;

    if (!name?.trim() || !price || !projectId) {
      return NextResponse.json({ error: "缺少必填字段" }, { status: 400 });
    }

    const plan = await prisma.maintenancePlan.create({
      data: {
        name: name.trim(),
        price: parseFloat(price),
        period: period || "monthly",
        features: JSON.stringify(features || []),
        projectId,
      },
    });

    return NextResponse.json({ data: plan }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "创建失败" }, { status: 500 });
  }
}
