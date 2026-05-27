import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Shield } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "维护计划" };

export default async function MaintenancePage() {
  const plans = await prisma.maintenancePlan.findMany({
    orderBy: { createdAt: "desc" },
    include: { project: { select: { id: true, title: true, packageName: true } } },
  });

  const activePlans = plans.filter((p) => p.active);
  const inactivePlans = plans.filter((p) => !p.active);

  function parseFeatures(raw: string): string[] {
    try {
      return JSON.parse(raw) as string[];
    } catch {
      return [];
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">维护计划</h1>
        <p className="mt-1 text-sm text-muted">查看和管理你的网站维护订阅</p>
      </div>

      {plans.length === 0 ? (
        <div className="warm-card rounded-2xl p-10 text-center reveal">
          <Shield className="mx-auto h-10 w-10 text-accent/40" />
          <p className="mt-3 text-muted">暂无维护计划</p>
          <p className="mt-1 text-xs text-muted">项目上线后可在此管理维护订阅</p>
          <Link href="/contact" className="amber-button mt-4 inline-flex px-5 py-2.5 text-sm">
            联系我们
          </Link>
        </div>
      ) : (
        <>
          {activePlans.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 text-lg font-bold">当前计划</h2>
              <div className="grid gap-4 sm:grid-cols-2 reveal-stagger">
                {activePlans.map((plan) => {
                  const features = parseFeatures(plan.features);
                  return (
                    <div key={plan.id} className="warm-card rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-accent" />
                        <p className="font-semibold">{plan.name}</p>
                      </div>
                      <Link
                        href={`/dashboard/projects/${plan.projectId}`}
                        className="text-xs text-accent hover:underline"
                      >
                        {plan.project.title}
                      </Link>
                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-2xl font-bold">¥{plan.price}</span>
                        <span className="text-xs text-muted">/{plan.period === "yearly" ? "年" : "月"}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          开始: {new Date(plan.startDate).toLocaleDateString("zh-CN")}
                        </span>
                        {plan.endDate && (
                          <span>
                            到期: {new Date(plan.endDate).toLocaleDateString("zh-CN")}
                          </span>
                        )}
                      </div>
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
                  );
                })}
              </div>
            </div>
          )}

          {inactivePlans.length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-bold text-muted">历史计划</h2>
              <div className="warm-card divide-y divide-border rounded-2xl">
                {inactivePlans.map((plan) => (
                  <div key={plan.id} className="flex items-center justify-between px-5 py-4 opacity-60">
                    <div>
                      <p className="text-sm font-semibold">{plan.name}</p>
                      <Link
                        href={`/dashboard/projects/${plan.projectId}`}
                        className="text-xs text-accent hover:underline"
                      >
                        {plan.project.title}
                      </Link>
                    </div>
                    <p className="text-xs text-muted">
                      ¥{plan.price}/{plan.period === "yearly" ? "年" : "月"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
