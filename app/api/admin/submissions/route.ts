import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};
    if (status && status !== "all") where.status = status;
    if (search) {
      where.OR = [
        { company: { contains: search } },
        { contactName: { contains: search } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.contactSubmission.count({ where }),
    ]);

    return NextResponse.json({ data, total, page, limit });
  } catch {
    return NextResponse.json({ error: "查询失败" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ids, status, notes } = body;

    // 批量更新
    if (ids && Array.isArray(ids) && ids.length > 0) {
      const data: Record<string, unknown> = {};
      if (status !== undefined) data.status = status;
      if (notes !== undefined) data.notes = notes;

      const result = await prisma.contactSubmission.updateMany({
        where: { id: { in: ids } },
        data,
      });

      return NextResponse.json({ data: { updated: result.count } });
    }

    // 单条更新
    if (!id) {
      return NextResponse.json({ error: "缺少 id" }, { status: 400 });
    }

    const updated = await prisma.contactSubmission.update({
      where: { id },
      data: {
        ...(status !== undefined && { status }),
        ...(notes !== undefined && { notes }),
      },
    });

    return NextResponse.json({ data: updated });
  } catch {
    return NextResponse.json({ error: "更新失败" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get("ids");

    if (!idsParam) {
      return NextResponse.json({ error: "缺少 ids 参数" }, { status: 400 });
    }

    const ids = idsParam.split(",").filter(Boolean);
    if (ids.length === 0) {
      return NextResponse.json({ error: "ids 为空" }, { status: 400 });
    }

    const result = await prisma.contactSubmission.deleteMany({
      where: { id: { in: ids } },
    });

    return NextResponse.json({ data: { deleted: result.count } });
  } catch {
    return NextResponse.json({ error: "删除失败" }, { status: 500 });
  }
}
