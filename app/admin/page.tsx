import type { Metadata } from "next";
import Link from "next/link";
import { DollarSign, FileText, FolderOpen, Layout, Plus, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "管理后台" };

const statusLabels: Record<string, string> = {
  new: "新建", contacted: "已联系", qualified: "已筛选", converted: "已转化", closed: "已关闭",
};
const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700", contacted: "bg-amber-100 text-amber-700",
  qualified: "bg-purple-100 text-purple-700", converted: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-700",
};

const projectStatusLabels: Record<string, string> = {
  planning: "规划中", designing: "设计中", developing: "开发中",
  reviewing: "审核中", launched: "已上线", maintenance: "维护中",
};
const projectStatusColors: Record<string, string> = {
  planning: "bg-blue-400", designing: "bg-purple-400", developing: "bg-amber-400",
  reviewing: "bg-cyan-400", launched: "bg-green-400", maintenance: "bg-gray-400",
};

export default async function AdminPage() {
  const [
    totalSubmissions, newSubmissions, totalProjects, activeProjects,
    revenue, recentSubmissions, projectStatusCounts,
  ] = await Promise.all([
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { status: "new" } }),
    prisma.project.count(),
    prisma.project.count({ where: { status: { in: ["planning", "designing", "developing", "reviewing"] } } }),
    prisma.project.aggregate({ _sum: { price: true }, where: { status: { in: ["launched", "maintenance"] } } }),
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { id: true, company: true, contactName: true, status: true, industry: true, createdAt: true },
    }),
    Promise.all(
      ["planning", "designing", "developing", "reviewing", "launched", "maintenance"].map(
        (status) => prisma.project.count({ where: { status } }).then((count) => ({ status, count }))
      )
    ),
  ]);

  const maxCount = Math.max(...projectStatusCounts.map((p) => p.count), 1);

  const stats = [
    { icon: FileText, label: "总提交", value: totalSubmissions, sub: `${newSubmissions} 条新建`, color: "text-blue-500" },
    { icon: FolderOpen, label: "总项目", value: totalProjects, sub: `${activeProjects} 个进行中`, color: "text-amber-500" },
    { icon: DollarSign, label: "总收入", value: `¥${(revenue._sum.price || 0).toLocaleString()}`, sub: "已上线项目", color: "text-green-500" },
    { icon: TrendingUp, label: "转化率", value: totalSubmissions > 0 ? `${Math.round((totalProjects / totalSubmissions) * 100)}%` : "0%", sub: "提交→项目", color: "text-purple-500" },
  ];

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">数据看板</h1>
      <p className="mb-8 text-sm text-muted">系统数据概览</p>

      {/* 统计卡片 */}
      <div className="reveal-stagger mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="warm-card rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted">{s.label}</p>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="mt-2 text-3xl font-bold">{s.value}</p>
            <p className="mt-1 text-xs text-muted">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* 快速操作 */}
      <div className="mb-8">
        <h2 className="mb-3 text-lg font-bold">快速操作</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/projects"
            className="amber-button px-5 py-2.5 text-sm"
          >
            <Plus className="h-4 w-4" />
            新建项目
          </Link>
          <Link
            href="/admin/templates"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2"
          >
            <Layout className="h-4 w-4" />
            新建模板
          </Link>
        </div>
      </div>

      {/* 项目状态分布条形图 */}
      <div className="mb-8">
        <h2 className="mb-3 text-lg font-bold">项目状态分布</h2>
        <div className="warm-card rounded-2xl p-5">
          {projectStatusCounts.map((ps) => (
            <div key={ps.status} className="mb-3 last:mb-0">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium">{projectStatusLabels[ps.status] || ps.status}</span>
                <span className="text-muted">{ps.count} 个</span>
              </div>
              <div className="h-6 overflow-hidden rounded-lg bg-surface-2">
                <div
                  className={`h-full rounded-lg transition-all duration-500 ${projectStatusColors[ps.status] || "bg-gray-400"}`}
                  style={{ width: `${(ps.count / maxCount) * 100}%`, minWidth: ps.count > 0 ? "2rem" : "0" }}
                />
              </div>
            </div>
          ))}
          {projectStatusCounts.every((ps) => ps.count === 0) && (
            <p className="py-4 text-center text-muted text-sm">暂无项目数据</p>
          )}
        </div>
      </div>

      {/* 最近提交 */}
      <div className="reveal">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">最近提交</h2>
          <Link href="/admin/submissions" className="text-sm text-accent hover:underline">查看全部</Link>
        </div>
        <div className="warm-card divide-y divide-border rounded-2xl">
          {recentSubmissions.length === 0 ? (
            <p className="p-10 text-center text-muted">暂无提交</p>
          ) : (
            recentSubmissions.map((s) => (
              <Link
                key={s.id}
                href={`/admin/submissions/${s.id}`}
                className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-surface-2/50"
              >
                <div>
                  <p className="font-semibold">{s.company}</p>
                  <p className="text-xs text-muted">{s.contactName} · {s.industry || "未填"}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[s.status] || ""}`}>
                    {statusLabels[s.status] || s.status}
                  </span>
                  <span className="text-xs text-muted">{new Date(s.createdAt).toLocaleDateString("zh-CN")}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
