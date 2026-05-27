"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

interface Project {
  id: string; title: string; packageName: string; status: string;
  pages: number; revisions: number; price: number | null; deadline: string | null; createdAt: string;
}

const statusLabels: Record<string, string> = {
  planning: "策划中", designing: "设计中", developing: "开发中",
  reviewing: "审核中", launched: "已上线", maintenance: "维护中",
};
const statusColors: Record<string, string> = {
  planning: "bg-blue-100 text-blue-700", designing: "bg-purple-100 text-purple-700",
  developing: "bg-amber-100 text-amber-700", reviewing: "bg-cyan-100 text-cyan-700",
  launched: "bg-green-100 text-green-700", maintenance: "bg-gray-100 text-gray-700",
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", packageName: "Starter", pages: 1, revisions: 1, price: "" });

  useEffect(() => {
    fetch(`/api/projects?page=${page}&limit=10`)
      .then((r) => r.json())
      .then((d) => { setProjects(d.data || []); setTotal(d.total || 0); });
  }, [page]);

  async function createProject(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: form.price ? parseFloat(form.price) : undefined }),
    });
    setShowForm(false);
    setForm({ title: "", packageName: "Starter", pages: 1, revisions: 1, price: "" });
    fetch(`/api/projects?page=${page}&limit=10`).then((r) => r.json()).then((d) => { setProjects(d.data || []); setTotal(d.total || 0); });
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">项目管理</h1>
          <p className="mt-1 text-sm text-muted">管理所有项目</p>
        </div>
        <button type="button" onClick={() => setShowForm(!showForm)} className="amber-button gap-2 px-5 py-2.5 text-sm">
          <Plus className="h-4 w-4" /> 新建项目
        </button>
      </div>

      {showForm && (
        <form onSubmit={createProject} className="warm-card mb-6 rounded-2xl p-6">
          <h3 className="mb-4 font-bold">新建项目</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <input placeholder="项目标题" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
            <select value={form.packageName} onChange={(e) => setForm({ ...form, packageName: e.target.value })}
              className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm">
              <option>Starter</option><option>Pro</option><option>Premium</option>
            </select>
            <input type="number" min={1} placeholder="页面数" value={form.pages} onChange={(e) => setForm({ ...form, pages: parseInt(e.target.value) || 1 })}
              className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm" />
            <input type="number" min={1} placeholder="修改轮次" value={form.revisions} onChange={(e) => setForm({ ...form, revisions: parseInt(e.target.value) || 1 })}
              className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm" />
          </div>
          <div className="mt-4 flex gap-3">
            <input type="number" placeholder="价格（元）" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-48 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm" />
            <button type="submit" className="amber-button px-5 py-2 text-sm">创建</button>
            <button type="button" onClick={() => setShowForm(false)} className="glass-button px-5 py-2 text-sm">取消</button>
          </div>
        </form>
      )}

      <div className="warm-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface/50">
                <th className="px-5 py-3 text-left font-semibold">标题</th>
                <th className="px-5 py-3 text-left font-semibold">套餐</th>
                <th className="px-5 py-3 text-left font-semibold">状态</th>
                <th className="px-5 py-3 text-left font-semibold">页面</th>
                <th className="px-5 py-3 text-left font-semibold">价格</th>
                <th className="px-5 py-3 text-left font-semibold">创建时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projects.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-surface-2/30">
                  <td className="px-5 py-3">
                    <Link href={`/admin/projects/${p.id}`} className="font-semibold hover:text-accent">{p.title}</Link>
                  </td>
                  <td className="px-5 py-3 text-muted">{p.packageName}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[p.status] || ""}`}>
                      {statusLabels[p.status] || p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted">{p.pages}</td>
                  <td className="px-5 py-3 text-muted">{p.price ? `¥${p.price.toLocaleString()}` : "-"}</td>
                  <td className="px-5 py-3 text-muted">{new Date(p.createdAt).toLocaleDateString("zh-CN")}</td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-muted">暂无项目</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
