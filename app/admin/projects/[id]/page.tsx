"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

interface Project {
  id: string; title: string; description: string | null; packageName: string; status: string;
  pages: number; revisions: number; revisionUsed: number; price: number | null;
  deadline: string | null; domain: string | null; createdAt: string;
}

const statusOptions = [
  { value: "planning", label: "策划中" }, { value: "designing", label: "设计中" },
  { value: "developing", label: "开发中" }, { value: "reviewing", label: "审核中" },
  { value: "launched", label: "已上线" }, { value: "maintenance", label: "维护中" },
];

export default function AdminProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [form, setForm] = useState({ title: "", description: "", packageName: "Starter", status: "planning", pages: 1, revisions: 1, price: "", deadline: "", domain: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/projects/${id}`).then((r) => r.json()).then((d) => {
      if (d.data) {
        setProject(d.data);
        setForm({
          title: d.data.title, description: d.data.description || "", packageName: d.data.packageName,
          status: d.data.status, pages: d.data.pages, revisions: d.data.revisions,
          price: d.data.price || "", deadline: d.data.deadline?.split("T")[0] || "", domain: d.data.domain || "",
        });
      }
    });
  }, [id]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: form.price ? parseFloat(String(form.price)) : null,
        deadline: form.deadline || null,
        pages: Number(form.pages), revisions: Number(form.revisions),
      }),
    });
    setSaving(false);
    router.refresh();
  }

  if (!project) return <div className="py-20 text-center text-muted">加载中...</div>;

  return (
    <div>
      <Link href="/admin/projects" className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> 返回项目列表
      </Link>

      <h1 className="mb-8 text-2xl font-bold">编辑项目</h1>

      <form onSubmit={save} className="warm-card rounded-2xl p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold">项目标题</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">套餐</label>
            <select value={form.packageName} onChange={(e) => setForm({ ...form, packageName: e.target.value })}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm">
              <option>Starter</option><option>Pro</option><option>Premium</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">状态</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm">
              {statusOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">价格（元）</label>
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">页面数量</label>
            <input type="number" min={1} value={form.pages} onChange={(e) => setForm({ ...form, pages: parseInt(e.target.value) || 1 })}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">修改轮次</label>
            <input type="number" min={0} value={form.revisions} onChange={(e) => setForm({ ...form, revisions: parseInt(e.target.value) || 0 })}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">截止日期</label>
            <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold">域名</label>
            <input value={form.domain} onChange={(e) => setForm({ ...form, domain: e.target.value })}
              placeholder="example.com" className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm" />
          </div>
        </div>
        <div className="mt-5">
          <label className="mb-1.5 block text-sm font-semibold">项目描述</label>
          <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
        </div>
        <div className="mt-6 flex gap-3">
          <button type="submit" disabled={saving} className="amber-button gap-2 px-6 py-2.5 text-sm disabled:opacity-60">
            <Save className="h-4 w-4" /> {saving ? "保存中..." : "保存修改"}
          </button>
        </div>
      </form>
    </div>
  );
}
