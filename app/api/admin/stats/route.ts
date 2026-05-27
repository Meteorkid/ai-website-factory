import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalSubmissions,
      submissionsByStatus,
      totalProjects,
      projectsByStatus,
      totalRevenue,
      recentSubmissions,
    ] = await Promise.all([
      prisma.contactSubmission.count(),
      prisma.contactSubmission.groupBy({ by: ["status"], _count: true }),
      prisma.project.count({ where: { deleted: false } }),
      prisma.project.groupBy({ by: ["status"], _count: true, where: { deleted: false } }),
      prisma.project.aggregate({ _sum: { price: true }, where: { deleted: false, status: { in: ["launched", "maintenance"] } } }),
      prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: { id: true, company: true, contactName: true, status: true, createdAt: true, industry: true },
      }),
    ]);

    const statusMap = (arr: { status: string; _count: number }[]) =>
      Object.fromEntries(arr.map((s) => [s.status, s._count]));

    return NextResponse.json({
      data: {
        totalSubmissions,
        submissionsByStatus: statusMap(submissionsByStatus),
        totalProjects,
        projectsByStatus: statusMap(projectsByStatus),
        totalRevenue: totalRevenue._sum.price || 0,
        recentSubmissions,
      },
    });
  } catch {
    return NextResponse.json({ error: "统计失败" }, { status: 500 });
  }
}
