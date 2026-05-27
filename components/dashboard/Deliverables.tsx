"use client";

import { useEffect, useState } from "react";
import { FileText, FolderOpen } from "lucide-react";

interface ActivityLog {
  id: string;
  type: string;
  content: string;
  author: string;
  createdAt: string;
}

interface DeliverablesProps {
  projectId: string;
}

export default function Deliverables({ projectId }: DeliverablesProps) {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/activity?projectId=${projectId}&type=file_upload&limit=50`)
      .then((res) => res.json())
      .then((json) => setLogs(json.data || []))
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="flex animate-pulse items-center gap-3 rounded-xl border border-border p-3">
            <div className="h-8 w-8 rounded bg-border" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/2 rounded bg-border" />
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
        <FolderOpen className="mb-3 h-10 w-10 text-muted/40" />
        <p className="text-sm text-muted">暂无交付物</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {logs.map((log) => (
        <div
          key={log.id}
          className="flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-surface-2/50"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
            <FileText className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{log.content}</p>
            <p className="text-xs text-muted">
              {log.author} · {new Date(log.createdAt).toLocaleDateString("zh-CN")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
