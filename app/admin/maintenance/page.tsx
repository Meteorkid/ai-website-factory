"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

interface MaintenancePlan {
  id: string; name: string; price: number; period: string; features: string;
  active: boolean; startDate: string; project: { id: string; title: string };
}

export default function AdminMaintenancePage() {
  const [plans, setPlans] = useState<MaintenancePlan[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", period: "monthly", features: "", projectId: "" });

  function load() {
    fetch("/api/admin/maintenance").then((r) => r.json()).then((d) => setPlans(d.data || []));
  }
  useEffect(() => { load(); }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    const features = form.features.split(",").map((s) => s.trim()).filter(Boolean);
    await fetch("/api/admin/maintenance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: parseFloat(form.price), features }),
    });
    setForm({ name: "", price: "", period: "monthly", features: "", projectId: "" });
    setShowForm(false);
    load();
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">维护管理</h1>
          <p className="mt-1 text-sm text-muted">管理维护订阅计划</p>
        </div>
        <button type="button" onClick={() => setShowForm(!showForm)} className="amber-button gap-2 px-5 py-2.5 text-sm">
          <Plus className="h-4 w-4" /> 新建计划
        </button>
      </div>

      {showForm && (
        <form onSubmit={create} className="warm-card mb-6 rounded-2xl p-6">
          <h3 className="mb-4 font-bold">新建维护计划</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <input placeholder="计划名称" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm" />
            <input type="number" placeholder="月费（元）" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm" />
            <input placeholder="项目 ID" required value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })}
              className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm" />
            <select value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })}
              className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm">
              <option value="monthly">月付</option><option value="yearly">年付</option>
            </select>
          </div>
          <input placeholder="功能列表（逗号分隔）" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })}
            className="mt-4 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm" />
          <div className="mt-4 flex gap-3">
            <button type="submit" className="amber-button px-5 py-2 text-sm">创建</button>
            <button type="button" onClick={() => setShowForm(false)} className="glass-button px-5 py-2 text-sm">取消</button>
          </div>
        </form>
      )}

      <div className="warm-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface/50">
                <th className="px-5 py-3 text-left font-semibold">名称</th>
                <th className="px-5 py-3 text-left font-semibold">关联项目</th>
                <th className="px-5 py-3 text-left font-semibold">价格</th>
                <th className="px-5 py-3 text-left font-semibold">周期</th>
                <th className="px-5 py-3 text-left font-semibold">状态</th>
                <th className="px-5 py-3 text-left font-semibold">开始时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {plans.map((p) => {
                let features: string[] = [];
                try { features = JSON.parse(p.features); } catch { /* ignore */ }
                return (
                  <tr key={p.id} className="transition-colors hover:bg-surface-2/30">
                    <td className="px-5 py-3">
                      <p className="font-semibold">{p.name}</p>
                      <p className="mt-1 text-xs text-muted">{features.slice(0, 3).join("、")}</p>
                    </td>
                    <td className="px-5 py-3 text-muted">{p.project.title}</td>
                    <td className="px-5 py-3 font-semibold text-accent">¥{p.price.toLocaleString()}</td>
                    <td className="px-5 py-3 text-muted">{p.period === "monthly" ? "月付" : "年付"}</td>
                    <td className="px-5 py-3">
                      {p.active ? (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">生效中</span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">已停用</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-muted">{new Date(p.startDate).toLocaleDateString("zh-CN")}</td>
                  </tr>
                );
              })}
              {plans.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-muted">暂无维护计划</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
