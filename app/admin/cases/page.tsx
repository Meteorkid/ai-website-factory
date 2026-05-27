"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Plus, Pencil, Trash2, BookOpen } from "lucide-react";

interface CaseItem {
  id: string;
  slug: string;
  title: string;
  industry: string;
  clientName: string;
  packageName: string;
  timeline: string;
  background: string;
  challenge: string;
  solution: string;
  result: string;
  tags: string;
  pages: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
}

const industryOptions = ["AI / SaaS", "企业服务", "教育培训", "本地服务", "制造业", "招商展示", "其他"];

const emptyForm = {
  slug: "",
  title: "",
  industry: industryOptions[0],
  clientName: "",
  packageName: "",
  timeline: "",
  background: "",
  challenge: "",
  solution: "",
  result: "",
  tags: "",
  pages: "",
};

export default function AdminCasesPage() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadCases = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cases?all=true");
      const d = await res.json();
      setCases(d.data || []);
    } catch {
      setError("加载失败");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCases();
  }, [loadCases]);

  const handleCreate = async () => {
    setSaving(true);
    setError("");
    try {
      const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
      const pages = form.pages.split(",").map((p) => p.trim()).filter(Boolean);

      const res = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tags, pages }),
      });

      if (!res.ok) {
        const d = await res.json();
        setError(d.error || "创建失败");
        return;
      }

      setForm(emptyForm);
      setShowForm(false);
      loadCases();
    } catch {
      setError("网络错误");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`确定删除案例「${slug}」？`)) return;
    try {
      await fetch(`/api/cases/${slug}`, { method: "DELETE" });
      loadCases();
    } catch {
      setError("删除失败");
    }
  };

  const handleToggle = async (slug: string, field: "featured" | "published", value: boolean) => {
    try {
      await fetch(`/api/cases/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      loadCases();
    } catch {
      setError("更新失败");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold">案例管理</h1>
          <p className="text-sm text-muted">管理所有展示案例</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="amber-button px-4 py-2 text-sm"
        >
          <Plus className="h-4 w-4" />
          新建案例
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
          <button type="button" onClick={() => setError("")} className="ml-2 underline">关闭</button>
        </div>
      )}

      {/* 新建案例表单 */}
      {showForm && (
        <div className="mb-6 warm-card rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">新建案例</h2>
            <button type="button" onClick={() => setShowForm(false)} className="text-muted hover:text-foreground">
              <ChevronUp className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block text-muted">Slug *</span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="my-awesome-case"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-muted">标题 *</span>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-muted">行业 *</span>
              <select
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
              >
                {industryOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-muted">客户名称 *</span>
              <input
                type="text"
                value={form.clientName}
                onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-muted">套餐 *</span>
              <input
                type="text"
                value={form.packageName}
                onChange={(e) => setForm({ ...form, packageName: e.target.value })}
                className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="Starter / Pro / Premium"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-muted">交付周期 *</span>
              <input
                type="text"
                value={form.timeline}
                onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="2 周"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-muted">标签（逗号分隔）</span>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="AI, SaaS, 企业级"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-muted">页面（逗号分隔）</span>
              <input
                type="text"
                value={form.pages}
                onChange={(e) => setForm({ ...form, pages: e.target.value })}
                className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                placeholder="首页, 产品, 定价"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-1">
            <label className="block text-sm">
              <span className="mb-1 block text-muted">项目背景 *</span>
              <textarea
                value={form.background}
                onChange={(e) => setForm({ ...form, background: e.target.value })}
                rows={3}
                className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-muted">挑战 *</span>
              <textarea
                value={form.challenge}
                onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                rows={3}
                className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-muted">解决方案 *</span>
              <textarea
                value={form.solution}
                onChange={(e) => setForm({ ...form, solution: e.target.value })}
                rows={3}
                className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-muted">成果 *</span>
              <textarea
                value={form.result}
                onChange={(e) => setForm({ ...form, result: e.target.value })}
                rows={3}
                className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </label>
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-xl px-4 py-2 text-sm text-muted hover:bg-surface-2"
            >
              取消
            </button>
            <button
              type="button"
              onClick={handleCreate}
              disabled={saving}
              className="amber-button px-5 py-2 text-sm disabled:opacity-50"
            >
              {saving ? "保存中..." : "创建案例"}
            </button>
          </div>
        </div>
      )}

      {/* 案例列表 */}
      <div className="warm-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface/50">
                <th className="px-5 py-3 text-left font-semibold">标题</th>
                <th className="px-5 py-3 text-left font-semibold">行业</th>
                <th className="px-5 py-3 text-left font-semibold">客户</th>
                <th className="px-5 py-3 text-left font-semibold">套餐</th>
                <th className="px-5 py-3 text-left font-semibold">状态</th>
                <th className="px-5 py-3 text-right font-semibold">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {cases.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-surface-2/30">
                  <td className="px-5 py-3">
                    <Link href={`/admin/cases/${c.slug}`} className="font-semibold hover:text-accent">
                      {c.title}
                    </Link>
                    <p className="text-xs text-muted">{c.slug}</p>
                  </td>
                  <td className="px-5 py-3 text-muted">{c.industry}</td>
                  <td className="px-5 py-3 text-muted">{c.clientName}</td>
                  <td className="px-5 py-3 text-muted">{c.packageName}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleToggle(c.slug, "published", !c.published)}
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold transition-colors ${
                          c.published
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {c.published ? "已发布" : "草稿"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggle(c.slug, "featured", !c.featured)}
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold transition-colors ${
                          c.featured
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {c.featured ? "推荐" : "普通"}
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/cases/${c.slug}`}
                        className="rounded-lg p-1.5 text-muted hover:bg-surface-2 hover:text-accent"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(c.slug)}
                        className="rounded-lg p-1.5 text-muted hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {cases.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-muted">
                    暂无案例，点击「新建案例」添加
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {loading && (
        <div className="mt-4 text-center text-sm text-muted">加载中...</div>
      )}
    </div>
  );
}
