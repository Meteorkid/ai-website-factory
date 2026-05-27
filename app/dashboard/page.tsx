import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Clock, FolderOpen, Plus, Shield, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";

export const metadata: Metadata = { title: "项目概览" };

const statusLabels: Record<string, string> = {
  planning: "策划中",
  designing: "设计中",
  developing: "开发中",
  reviewing: "审核中",
  launched: "已上线",
  maintenance: "维护中",
};

const statusColors: Record<string, string> = {
  planning: "bg-blue-100 text-blue-700",
  designing: "bg-purple-100 text-purple-700",
  developing: "bg-amber-100 text-amber-700",
  reviewing: "bg-cyan-100 text-cyan-700",
  launched: "bg-green-100 text-green-700",
  maintenance: "bg-gray-100 text-gray-700",
};

export default async function DashboardPage() {
  const [totalProjects, activeProjects, completedProjects, totalMaintenance, recentProjects] =
    await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: { in: ["planning", "designing", "developing", "reviewing"] } } }),
      prisma.project.count({ where: { status: "launched" } }),
      prisma.maintenancePlan.count({ where: { active: true } }),
      prisma.project.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, title: true, packageName: true, status: true, createdAt: true },
      }),
    ]);

  const stats = [
    { icon: FolderOpen, label: "总项目", value: totalProjects, color: "text-accent" },
    { icon: TrendingUp, label: "进行中", value: activeProjects, color: "text-blue-500" },
    { icon: BarChart3, label: "已上线", value: completedProjects, color: "text-green-500" },
    { icon: Shield, label: "维护计划", value: totalMaintenance, color: "text-purple-500" },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">项目概览</h1>
          <p className="mt-1 text-sm text-muted">查看你的项目状态和数据概览</p>
        </div>
        <Link href="/contact" className="amber-button gap-2 px-5 py-2.5 text-sm">
          <Plus className="h-4 w-4" /> 新建项目
        </Link>
      </div>

      <div className="reveal-stagger mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="warm-card rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted">{s.label}</p>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="mt-2 text-3xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="reveal">
        <h2 className="mb-4 text-lg font-bold">最近项目</h2>
        {recentProjects.length === 0 ? (
          <div className="warm-card rounded-2xl p-10 text-center">
            <p className="text-muted">暂无项目</p>
            <Link href="/contact" className="amber-button mt-4 inline-flex px-5 py-2.5 text-sm">
              提交需求开始第一个项目
            </Link>
          </div>
        ) : (
          <div className="warm-card divide-y divide-border rounded-2xl">
            {recentProjects.map((p) => (
              <Link
                key={p.id}
                href={`/dashboard/projects/${p.id}`}
                className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-surface-2/50"
              >
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-xs text-muted">{p.packageName}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[p.status] || "bg-gray-100 text-gray-700"}`}>
                  {statusLabels[p.status] || p.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 reveal">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-bold">最近动态</h2>
        </div>
        <div className="warm-card rounded-2xl p-5">
          <ActivityTimeline limit={5} />
        </div>
      </div>
    </div>
  );
}
