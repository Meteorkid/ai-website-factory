import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, FileText, Globe, Layers, PenTool, Shield } from "lucide-react";
import { prisma } from "@/lib/prisma";

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

const statusSteps = ["planning", "designing", "developing", "reviewing", "launched", "maintenance"];

function getProgress(status: string) {
  const idx = statusSteps.indexOf(status);
  return idx >= 0 ? Math.round(((idx + 1) / (statusSteps.length - 1)) * 100) : 0;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id }, select: { title: true } });
  return { title: project ? project.title : "项目详情" };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { maintenancePlans: { orderBy: { createdAt: "desc" } } },
  });
  if (!project) notFound();

  const progress = getProgress(project.status);
  const features = project.maintenancePlans.flatMap((mp) => {
    try {
      return JSON.parse(mp.features) as string[];
    } catch {
      return [];
    }
  });

  return (
    <div>
      <Link href="/dashboard/projects" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> 返回项目列表
      </Link>

      {/* Header */}
      <div className="mb-8 reveal">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{project.title}</h1>
            {project.description && <p className="mt-1 text-sm text-muted">{project.description}</p>}
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[project.status] || "bg-gray-100 text-gray-700"}`}>
            {statusLabels[project.status] || project.status}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 warm-card rounded-2xl p-5 reveal">
        <p className="mb-3 text-sm font-semibold">项目进度</p>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-surface-2">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex justify-between text-xs text-muted">
          {statusSteps.map((step, i) => {
            const reached = statusSteps.indexOf(project.status) >= i;
            return (
              <span key={step} className={reached ? "font-semibold text-foreground" : ""}>
                {statusLabels[step]}
              </span>
            );
          })}
        </div>
      </div>

      {/* Info Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 reveal-stagger">
        <div className="warm-card rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="h-4 w-4 text-accent" />
            <p className="text-xs text-muted">套餐</p>
          </div>
          <p className="font-semibold">{project.packageName}</p>
        </div>

        <div className="warm-card rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4 text-accent" />
            <p className="text-xs text-muted">页面数</p>
          </div>
          <p className="font-semibold">{project.pages}</p>
        </div>

        <div className="warm-card rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <PenTool className="h-4 w-4 text-accent" />
            <p className="text-xs text-muted">修改次数</p>
          </div>
          <p className="font-semibold">{project.revisionUsed} / {project.revisions}</p>
        </div>

        {project.deadline && (
          <div className="warm-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-accent" />
              <p className="text-xs text-muted">截止日期</p>
            </div>
            <p className="font-semibold">{new Date(project.deadline).toLocaleDateString("zh-CN")}</p>
          </div>
        )}

        {project.launchedAt && (
          <div className="warm-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-accent" />
              <p className="text-xs text-muted">上线日期</p>
            </div>
            <p className="font-semibold">{new Date(project.launchedAt).toLocaleDateString("zh-CN")}</p>
          </div>
        )}

        {project.domain && (
          <div className="warm-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-accent" />
              <p className="text-xs text-muted">域名</p>
            </div>
            <p className="font-semibold break-all">{project.domain}</p>
          </div>
        )}
      </div>

      {/* Maintenance Plans */}
      {project.maintenancePlans.length > 0 && (
        <div className="reveal">
          <h2 className="mb-4 text-lg font-bold">维护计划</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.maintenancePlans.map((mp) => (
              <div key={mp.id} className="warm-card rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-accent" />
                  <p className="font-semibold">{mp.name}</p>
                  {!mp.active && <span className="text-xs text-muted">（已停用）</span>}
                </div>
                <p className="text-sm text-muted">
                  ¥{mp.price}/{mp.period === "yearly" ? "年" : "月"}
                </p>
                {features.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {features.map((f, i) => (
                      <li key={i} className="text-xs text-muted flex items-start gap-1.5">
                        <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
