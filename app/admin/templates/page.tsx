"use client";

import { useState, useEffect } from "react";
import { Layout, Plus, X } from "lucide-react";

interface Template {
  id: string; name: string; industry: string; description: string | null;
  pages: string; active: boolean; createdAt: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", industry: "AI / SaaS", description: "", pages: "" });

  function load() {
    fetch("/api/templates").then((r) => r.json()).then((d) => setTemplates(d.data || []));
  }
  useEffect(() => { load(); }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    const pages = form.pages.split(",").map((s) => s.trim()).filter(Boolean);
    await fetch("/api/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, pages }),
    });
    setForm({ name: "", industry: "AI / SaaS", description: "", pages: "" });
    setShowForm(false);
    load();
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">模板管理</h1>
          <p className="mt-1 text-sm text-muted">管理行业网站模板</p>
        </div>
        <button type="button" onClick={() => setShowForm(!showForm)} className="amber-button gap-2 px-5 py-2.5 text-sm">
          <Plus className="h-4 w-4" /> 新建模板
        </button>
      </div>

      {showForm && (
        <form onSubmit={create} className="warm-card mb-6 rounded-2xl p-6">
          <h3 className="mb-4 font-bold">新建模板</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <input placeholder="模板名称" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
            <select value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })}
              className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm">
              {["AI / SaaS", "企业服务", "教育培训", "本地服务", "制造业", "招商展示", "其他"].map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>
          <input placeholder="描述" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mt-4 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm" />
          <input placeholder="页面列表（逗号分隔：首页, 关于, 服务, 联系）" value={form.pages} onChange={(e) => setForm({ ...form, pages: e.target.value })}
            className="mt-4 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm" />
          <div className="mt-4 flex gap-3">
            <button type="submit" className="amber-button px-5 py-2 text-sm">创建</button>
            <button type="button" onClick={() => setShowForm(false)} className="glass-button px-5 py-2 text-sm">取消</button>
          </div>
        </form>
      )}

      {templates.length === 0 ? (
        <div className="warm-card rounded-2xl p-10 text-center">
          <Layout className="mx-auto mb-4 h-10 w-10 text-muted" />
          <p className="text-muted">暂无模板</p>
        </div>
      ) : (
        <div className="reveal-stagger grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => {
            let pages: string[] = [];
            try { pages = JSON.parse(t.pages); } catch { /* ignore */ }
            return (
              <div key={t.id} className="warm-card rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">{t.name}</h3>
                  {t.active ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">启用</span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">停用</span>
                  )}
                </div>
                <p className="mt-1 text-xs text-accent">{t.industry}</p>
                {t.description && <p className="mt-3 text-sm text-muted">{t.description}</p>}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {pages.map((p) => (
                    <span key={p} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">{p}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
