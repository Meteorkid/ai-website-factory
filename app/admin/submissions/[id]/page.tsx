"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Clock, FileText, Mail, Phone, Tag } from "lucide-react";

interface Submission {
  id: string; company: string; industry: string | null; contactName: string; contact: string;
  package: string | null; timeline: string | null; reference: string | null; description: string | null;
  status: string; notes: string | null; createdAt: string;
}

const statusLabels: Record<string, string> = {
  new: "新建", contacted: "已联系", qualified: "已筛选", converted: "已转化", closed: "已关闭",
};

const statusFlow = ["new", "contacted", "qualified", "converted"];

export default function SubmissionDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/submissions?search=&status=all&limit=100`)
      .then((r) => r.json())
      .then((d) => {
        const found = d.data?.find((s: Submission) => s.id === id);
        if (found) { setSubmission(found); setNotes(found.notes || ""); }
      });
  }, [id]);

  async function updateStatus(newStatus: string) {
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    setSubmission((prev) => prev ? { ...prev, status: newStatus } : null);
  }

  async function saveNotes() {
    setSaving(true);
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, notes }),
    });
    setSaving(false);
  }

  if (!submission) return <div className="py-20 text-center text-muted">加载中...</div>;

  return (
    <div>
      <Link href="/admin/submissions" className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> 返回列表
      </Link>

      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{submission.company}</h1>
          <p className="mt-1 text-sm text-muted">{submission.industry || "未填行业"}</p>
        </div>
        <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-white">
          {statusLabels[submission.status] || submission.status}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Info */}
        <div className="warm-card rounded-2xl p-6">
          <h2 className="mb-4 font-bold">提交信息</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center gap-3"><dt className="flex w-20 items-center gap-2 text-muted"><FileText className="h-4 w-4" />联系人</dt><dd className="font-semibold">{submission.contactName}</dd></div>
            <div className="flex items-center gap-3"><dt className="flex w-20 items-center gap-2 text-muted"><Phone className="h-4 w-4" />联系方式</dt><dd className="font-semibold">{submission.contact}</dd></div>
            <div className="flex items-center gap-3"><dt className="flex w-20 items-center gap-2 text-muted"><Tag className="h-4 w-4" />意向套餐</dt><dd className="font-semibold">{submission.package || "未选"}</dd></div>
            <div className="flex items-center gap-3"><dt className="flex w-20 items-center gap-2 text-muted"><Clock className="h-4 w-4" />上线时间</dt><dd className="font-semibold">{submission.timeline || "未填"}</dd></div>
            <div className="flex items-center gap-3"><dt className="flex w-20 items-center gap-2 text-muted"><Mail className="h-4 w-4" />提交时间</dt><dd className="font-semibold">{new Date(submission.createdAt).toLocaleString("zh-CN")}</dd></div>
          </dl>
          {submission.reference && (
            <div className="mt-4 rounded-xl bg-surface-2 p-4">
              <p className="text-xs text-muted">参考网站</p>
              <p className="mt-1 break-all text-sm">{submission.reference}</p>
            </div>
          )}
          {submission.description && (
            <div className="mt-4 rounded-xl bg-surface-2 p-4">
              <p className="text-xs text-muted">需求描述</p>
              <p className="mt-1 text-sm leading-relaxed">{submission.description}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Status Actions */}
          <div className="warm-card rounded-2xl p-6">
            <h2 className="mb-4 font-bold">状态操作</h2>
            <div className="flex flex-wrap gap-2">
              {statusFlow.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => updateStatus(s)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    submission.status === s ? "bg-accent text-white" : "bg-surface-2 text-muted hover:text-foreground"
                  }`}
                >
                  {statusLabels[s]}
                </button>
              ))}
              <button
                type="button"
                onClick={() => updateStatus("closed")}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  submission.status === "closed" ? "bg-gray-500 text-white" : "bg-surface-2 text-muted hover:text-foreground"
                }`}
              >
                关闭
              </button>
            </div>
          </div>

          {/* Notes */}
          <div className="warm-card rounded-2xl p-6">
            <h2 className="mb-4 font-bold">备注</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="添加内部备注..."
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
            <button
              type="button"
              onClick={saveNotes}
              disabled={saving}
              className="amber-button mt-3 px-5 py-2 text-sm disabled:opacity-60"
            >
              {saving ? "保存中..." : "保存备注"}
            </button>
          </div>

          {/* Create Project */}
          <Link
            href="/admin/projects"
            className="glass-button flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm"
          >
            为该客户创建项目 →
          </Link>
        </div>
      </div>
    </div>
  );
}
