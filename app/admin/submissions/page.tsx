"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Download, Trash2, RefreshCw } from "lucide-react";

interface Submission {
  id: string; company: string; industry: string | null; contactName: string;
  contact: string; package: string | null; status: string; createdAt: string;
}

const statusLabels: Record<string, string> = {
  new: "新建", contacted: "已联系", qualified: "已筛选", converted: "已转化", closed: "已关闭",
};
const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700", contacted: "bg-amber-100 text-amber-700",
  qualified: "bg-purple-100 text-purple-700", converted: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-700",
};
const statusOptions = [
  { value: "all", label: "全部" }, { value: "new", label: "新建" },
  { value: "contacted", label: "已联系" }, { value: "qualified", label: "已筛选" },
  { value: "converted", label: "已转化" }, { value: "closed", label: "已关闭" },
];

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [batchStatus, setBatchStatus] = useState("new");
  const limit = 10;

  const loadData = useCallback(async () => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (search) params.set("search", search);
    const res = await fetch(`/api/admin/submissions?${params}`);
    const d = await res.json();
    setSubmissions(d.data || []);
    setTotal(d.total || 0);
  }, [page, statusFilter, search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const totalPages = Math.ceil(total / limit);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === submissions.length && submissions.length > 0) {
      setSelected(new Set());
    } else {
      setSelected(new Set(submissions.map((s) => s.id)));
    }
  };

  const handleBatchStatus = async () => {
    if (selected.size === 0) return;
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: Array.from(selected), status: batchStatus }),
    });
    setSelected(new Set());
    loadData();
  };

  const handleBatchDelete = async () => {
    if (selected.size === 0) return;
    if (!confirm(`确定删除选中的 ${selected.size} 条记录？`)) return;
    await fetch(`/api/admin/submissions?ids=${Array.from(selected).join(",")}`, {
      method: "DELETE",
    });
    setSelected(new Set());
    loadData();
  };

  const handleExportCSV = () => {
    const headers = ["公司", "联系人", "行业", "套餐", "状态", "联系方式", "创建时间"];
    const rows = submissions.map((s) => [
      s.company,
      s.contactName,
      s.industry || "",
      s.package || "",
      statusLabels[s.status] || s.status,
      s.contact,
      new Date(s.createdAt).toLocaleDateString("zh-CN"),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob(["﻿" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `提交管理_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">提交管理</h1>
      <p className="mb-6 text-sm text-muted">管理所有客户提交的需求</p>

      {/* 搜索与筛选 */}
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="搜索公司或联系人..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); setSelected(new Set()); }}
          className="rounded-xl border border-border bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
        />
        <div className="flex gap-1">
          {statusOptions.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => { setStatusFilter(f.value); setPage(1); setSelected(new Set()); }}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                statusFilter === f.value ? "bg-accent text-white" : "bg-surface-2 text-muted hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 批量操作栏 */}
      <div className="mb-4 flex items-center gap-3">
        <span className="text-sm text-muted">
          已选 {selected.size} 项
        </span>
        {selected.size > 0 && (
          <>
            <select
              value={batchStatus}
              onChange={(e) => setBatchStatus(e.target.value)}
              className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs"
            >
              {statusOptions.filter((f) => f.value !== "all").map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleBatchStatus}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
            >
              <RefreshCw className="h-3 w-3" />
              批量状态变更
            </button>
            <button
              type="button"
              onClick={handleBatchDelete}
              className="inline-flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
            >
              <Trash2 className="h-3 w-3" />
              批量删除
            </button>
          </>
        )}
        <button
          type="button"
          onClick={handleExportCSV}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold hover:bg-surface-2"
        >
          <Download className="h-3 w-3" />
          导出 CSV
        </button>
      </div>

      {/* 表格 */}
      <div className="warm-card overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface/50">
                <th className="w-10 px-3 py-3">
                  <input
                    type="checkbox"
                    checked={selected.size === submissions.length && submissions.length > 0}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded accent-accent"
                  />
                </th>
                <th className="px-4 py-3 text-left font-semibold">公司</th>
                <th className="px-4 py-3 text-left font-semibold">联系人</th>
                <th className="px-4 py-3 text-left font-semibold">行业</th>
                <th className="px-4 py-3 text-left font-semibold">套餐</th>
                <th className="px-4 py-3 text-left font-semibold">状态</th>
                <th className="px-4 py-3 text-left font-semibold">时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {submissions.map((s) => (
                <tr key={s.id} className={`transition-colors hover:bg-surface-2/30 ${selected.has(s.id) ? "bg-accent-soft/30" : ""}`}>
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(s.id)}
                      onChange={() => toggleSelect(s.id)}
                      className="h-4 w-4 rounded accent-accent"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/submissions/${s.id}`} className="font-semibold hover:text-accent">{s.company}</Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{s.contactName}</td>
                  <td className="px-4 py-3 text-muted">{s.industry || "-"}</td>
                  <td className="px-4 py-3 text-muted">{s.package || "-"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[s.status] || ""}`}>
                      {statusLabels[s.status] || s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">{new Date(s.createdAt).toLocaleDateString("zh-CN")}</td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-10 text-center text-muted">暂无数据</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button type="button" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
            className="rounded-lg px-3 py-1.5 text-sm text-muted hover:bg-surface-2 disabled:opacity-40">上一页</button>
          <span className="text-sm text-muted">{page} / {totalPages}</span>
          <button type="button" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
            className="rounded-lg px-3 py-1.5 text-sm text-muted hover:bg-surface-2 disabled:opacity-40">下一页</button>
        </div>
      )}
    </div>
  );
}
