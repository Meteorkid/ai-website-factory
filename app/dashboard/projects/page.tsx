import type { Metadata } from "next";
import Link from "next/link";
import { FolderOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "我的项目" };

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

const statuses = ["planning", "designing", "developing", "reviewing", "launched", "maintenance"] as const;

const PAGE_SIZE = 10;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const currentStatus = params.status || "";
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));

  const where = currentStatus ? { status: currentStatus } : {};

  const [projects, total, ...statusCounts] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        title: true,
        packageName: true,
        status: true,
        pages: true,
        revisions: true,
        revisionUsed: true,
        deadline: true,
        createdAt: true,
      },
    }),
    prisma.project.count({ where }),
    ...statuses.map((s) => prisma.project.count({ where: { status: s } })),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function buildHref(status: string, page: number) {
    const sp = new URLSearchParams();
    if (status) sp.set("status", status);
    if (page > 1) sp.set("page", String(page));
    const qs = sp.toString();
    return `/dashboard/projects${qs ? `?${qs}` : ""}`;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">我的项目</h1>
        <p className="mt-1 text-sm text-muted">管理并查看所有项目状态</p>
      </div>

      {/* 状态筛选标签 */}
      <div className="reveal-stagger mb-6 flex flex-wrap gap-2">
        <Link
          href="/dashboard/projects"
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
            !currentStatus ? "bg-accent text-white" : "bg-surface-2 text-muted hover:text-foreground"
          }`}
        >
          全部
        </Link>
        {statuses.map((s, i) => (
          <Link
            key={s}
            href={buildHref(s, 1)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              currentStatus === s ? "bg-accent text-white" : "bg-surface-2 text-muted hover:text-foreground"
            }`}
          >
            {statusLabels[s]} ({statusCounts[i]})
          </Link>
        ))}
      </div>

      {/* 项目列表 */}
      {projects.length === 0 ? (
        <div className="warm-card rounded-2xl p-10 text-center">
          <FolderOpen className="mx-auto mb-3 h-10 w-10 text-muted" />
          <p className="text-muted">暂无项目</p>
          <Link href="/contact" className="amber-button mt-4 inline-flex px-5 py-2.5 text-sm">
            提交需求开始第一个项目
          </Link>
        </div>
      ) : (
        <div className="reveal warm-card divide-y divide-border rounded-2xl">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/dashboard/projects/${p.id}`}
              className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-surface-2/50 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{p.title}</p>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted">
                  <span>{p.packageName}</span>
                  <span>{p.pages} 页</span>
                  <span>修订 {p.revisionUsed}/{p.revisions}</span>
                  {p.deadline && (
                    <span>
                      截止 {new Date(p.deadline).toLocaleDateString("zh-CN")}
                    </span>
                  )}
                </div>
              </div>
              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                  statusColors[p.status] || "bg-gray-100 text-gray-700"
                }`}
              >
                {statusLabels[p.status] || p.status}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* 分页 */}
      {totalPages > 1 && (
        <div className="reveal mt-6 flex items-center justify-center gap-2">
          {currentPage > 1 && (
            <Link
              href={buildHref(currentStatus, currentPage - 1)}
              className="glass-button rounded-xl px-4 py-2 text-sm"
            >
              上一页
            </Link>
          )}
          <span className="px-3 text-sm text-muted">
            {currentPage} / {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link
              href={buildHref(currentStatus, currentPage + 1)}
              className="glass-button rounded-xl px-4 py-2 text-sm"
            >
              下一页
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
