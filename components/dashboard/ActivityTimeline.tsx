"use client";

import { useEffect, useState } from "react";
import { ArrowRight, FileText, MessageSquare, RotateCcw, Upload } from "lucide-react";

interface ActivityLog {
  id: string;
  projectId: string | null;
  type: string;
  content: string;
  author: string;
  createdAt: string;
}

const typeConfig: Record<string, { icon: typeof ArrowRight; label: string; color: string }> = {
  status_change: { icon: ArrowRight, label: "状态变更", color: "bg-blue-100 text-blue-600" },
  comment: { icon: MessageSquare, label: "留言", color: "bg-amber-100 text-amber-600" },
  file_upload: { icon: Upload, label: "文件上传", color: "bg-green-100 text-green-600" },
  revision: { icon: RotateCcw, label: "修改", color: "bg-purple-100 text-purple-600" },
};

function formatRelativeTime(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = now - date;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return "刚刚";
  if (diff < hour) return `${Math.floor(diff / minute)}分钟前`;
  if (diff < day) return `${Math.floor(diff / hour)}小时前`;
  if (diff < 7 * day) return `${Math.floor(diff / day)}天前`;
  return new Date(dateStr).toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" });
}

interface ActivityTimelineProps {
  projectId?: string;
  limit?: number;
  showProjectLabel?: boolean;
}

export default function ActivityTimeline({ projectId, limit = 50, showProjectLabel = false }: ActivityTimelineProps) {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (projectId) params.set("projectId", projectId);
    params.set("limit", String(limit));

    fetch(`/api/activity?${params}`)
      .then((res) => res.json())
      .then((json) => setLogs(json.data || []))
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  }, [projectId, limit]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex animate-pulse gap-3">
            <div className="h-8 w-8 shrink-0 rounded-full bg-border" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="h-3 w-2/3 rounded bg-border" />
              <div className="h-2 w-1/3 rounded bg-border" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <FileText className="mb-3 h-10 w-10 text-muted/40" />
        <p className="text-sm text-muted">暂无记录</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* 竖线 */}
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />

      <div className="space-y-0">
        {logs.map((log) => {
          const config = typeConfig[log.type] || typeConfig.comment;
          const Icon = config.icon;

          return (
            <div key={log.id} className="relative flex gap-3 py-3">
              {/* 节点图标 */}
              <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.color}`}>
                <Icon className="h-4 w-4" />
              </div>

              {/* 内容 */}
              <div className="min-w-0 flex-1 pt-1">
                <p className="text-sm leading-snug">{log.content}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                  <span>{log.author}</span>
                  <span>·</span>
                  <span>{formatRelativeTime(log.createdAt)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
