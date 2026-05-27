"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface CaseData {
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
  testimonial: string | null;
  testimonialAuthor: string | null;
}

const industryOptions = ["AI / SaaS", "企业服务", "教育培训", "本地服务", "制造业", "招商展示", "其他"];

export default function CaseEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [form, setForm] = useState<CaseData | null>(null);
  const [tagsInput, setTagsInput] = useState("");
  const [pagesInput, setPagesInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  const loadCase = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/cases/${slug}`);
      if (!res.ok) {
        setError("案例不存在");
        return;
      }
      const d = await res.json();
      const c: CaseData = d.data;
      setForm(c);
      setTagsInput(JSON.parse(c.tags || "[]").join(", "));
      setPagesInput(JSON.parse(c.pages || "[]").join(", "));
    } catch {
      setError("加载失败");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadCase();
  }, [loadCase]);

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
      const pages = pagesInput.split(",").map((p) => p.trim()).filter(Boolean);

      const res = await fetch(`/api/cases/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tags, pages }),
      });

      if (!res.ok) {
        const d = await res.json();
        setError(d.error || "保存失败");
        return;
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("网络错误");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-muted">加载中...</div>;
  }

  if (!form) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted">{error || "案例不存在"}</p>
        <Link href="/admin/cases" className="mt-4 inline-block text-sm text-accent hover:underline">返回列表</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/cases" className="rounded-lg p-2 text-muted hover:bg-surface-2 hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">编辑案例</h1>
            <p className="text-sm text-muted">{form.slug}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="amber-button px-5 py-2 text-sm disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? "保存中..." : "保存"}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      {success && (
        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">保存成功</div>
      )}

      <div className="warm-card rounded-2xl p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1 block text-muted">Slug</span>
            <input
              type="text"
              value={form.slug}
              disabled
              className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2 text-sm opacity-60"
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
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-muted">交付周期 *</span>
            <input
              type="text"
              value={form.timeline}
              onChange={(e) => setForm({ ...form, timeline: e.target.value })}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-muted">标签（逗号分隔）</span>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-muted">页面（逗号分隔）</span>
            <input
              type="text"
              value={pagesInput}
              onChange={(e) => setPagesInput(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </label>
        </div>

        <div className="mt-4 grid gap-4">
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
          <label className="block text-sm">
            <span className="mb-1 block text-muted">客户评价</span>
            <textarea
              value={form.testimonial || ""}
              onChange={(e) => setForm({ ...form, testimonial: e.target.value || null })}
              rows={2}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-muted">评价人</span>
            <input
              type="text"
              value={form.testimonialAuthor || ""}
              onChange={(e) => setForm({ ...form, testimonialAuthor: e.target.value || null })}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </label>
        </div>

        <div className="mt-4 flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="h-4 w-4 rounded accent-accent"
            />
            已发布
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="h-4 w-4 rounded accent-accent"
            />
            推荐
          </label>
          <label className="block text-sm">
            <span className="mr-2 text-muted">排序</span>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
              className="w-20 rounded-xl border border-border bg-surface px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
