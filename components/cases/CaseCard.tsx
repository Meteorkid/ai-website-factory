import Link from "next/link";
import { Clock, FileText, Package, ArrowRight } from "lucide-react";

interface CaseCardProps {
  slug: string;
  title: string;
  industry: string;
  clientName: string;
  packageName: string;
  timeline: string;
  result: string;
  tags: string[];
  pages: string[];
}

export default function CaseCard({
  slug,
  title,
  industry,
  clientName,
  packageName,
  timeline,
  result,
  tags,
  pages,
}: CaseCardProps) {
  return (
    <Link href={`/cases/${slug}`} className="group block">
      <article className="warm-card rounded-[30px] p-6 transition-all duration-300 hover:-translate-y-1">
        {/* 浏览器模拟截图 */}
        <div className="liquid-glass mb-5 overflow-hidden rounded-2xl">
          <div className="flex items-center gap-2 bg-surface/80 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <div className="ml-3 flex-1 rounded-lg bg-background/60 px-3 py-1 text-xs text-muted">
              {clientName}.com
            </div>
          </div>
          <div className="aspect-[16/10] bg-gradient-to-br from-surface-2 to-accent-soft/30 p-6">
            <div className="h-6 w-1/3 rounded-lg bg-accent/20" />
            <div className="mt-3 h-3 w-2/3 rounded bg-foreground/10" />
            <div className="mt-2 h-3 w-1/2 rounded bg-foreground/10" />
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="aspect-video rounded-xl bg-accent/10" />
              <div className="aspect-video rounded-xl bg-accent/10" />
              <div className="aspect-video rounded-xl bg-accent/10" />
            </div>
          </div>
        </div>

        {/* 标签 */}
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
            {industry}
          </span>
          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
            {packageName}
          </span>
        </div>

        {/* 标题 */}
        <h3 className="text-lg font-bold leading-snug group-hover:text-accent transition-colors">
          {title}
        </h3>

        {/* 成果摘要 */}
        <p className="mt-2 line-clamp-2 text-sm text-muted">
          {result}
        </p>

        {/* 指标 */}
        <div className="mt-4 flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {timeline}
          </span>
          <span className="flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            {pages.length} 页
          </span>
          <span className="flex items-center gap-1.5">
            <Package className="h-3.5 w-3.5" />
            {packageName}
          </span>
        </div>

        {/* 查看详情 */}
        <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
          查看详情
          <ArrowRight className="h-4 w-4" />
        </div>
      </article>
    </Link>
  );
}
