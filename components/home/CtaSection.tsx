"use client";

import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="bg-surface/55 py-20 md:py-28">
      <div className="section-shell">
        <div className="reveal relative overflow-hidden rounded-[36px] p-10 text-center md:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-secondary/10" />
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-accent-secondary/20 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-sm font-semibold text-accent">
              <Rocket className="h-4 w-4" />
              开始你的项目
            </div>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold leading-snug md:text-5xl">
              先用 30 分钟，
              <br />
              判断你的官网应该怎么做。
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
              我们会先确认行业、页面范围、上线时间、素材完整度和转化目标，再给出适合的套餐建议。
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="amber-button group relative overflow-hidden px-8 py-4 text-base"
              >
                <span className="relative z-10 flex items-center gap-2">
                  预约 30 分钟沟通
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/pricing"
                className="glass-button px-8 py-4 text-base"
              >
                查看套餐详情
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
