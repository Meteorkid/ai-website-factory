import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: { submission: true, maintenancePlans: true },
    });

    if (!project) {
      return NextResponse.json({ error: "项目不存在" }, { status: 404 });
    }

    return NextResponse.json({ data: project });
  } catch {
    return NextResponse.json({ error: "查询失败" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return NextResponse.json({ error: "项目不存在" }, { status: 404 });
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.packageName !== undefined && { packageName: body.packageName }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.pages !== undefined && { pages: body.pages }),
        ...(body.revisions !== undefined && { revisions: body.revisions }),
        ...(body.revisionUsed !== undefined && { revisionUsed: body.revisionUsed }),
        ...(body.price !== undefined && { price: body.price }),
        ...(body.deadline !== undefined && { deadline: body.deadline ? new Date(body.deadline) : null }),
        ...(body.launchedAt !== undefined && { launchedAt: body.launchedAt ? new Date(body.launchedAt) : null }),
        ...(body.domain !== undefined && { domain: body.domain }),
        ...(body.referenceUrl !== undefined && { referenceUrl: body.referenceUrl }),
      },
    });

    return NextResponse.json({ data: updated });
  } catch {
    return NextResponse.json({ error: "更新失败" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ data: { ok: true } });
  } catch {
    return NextResponse.json({ error: "删除失败" }, { status: 500 });
  }
}
