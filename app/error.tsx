"use client";

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="section-shell text-center">
        <p className="section-kicker">Error</p>
        <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-bold md:text-5xl">
          页面加载出错
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-muted">
          {error.digest
            ? `错误编号：${error.digest}`
            : "发生了意外错误，请尝试刷新页面。"}
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="amber-button px-7 py-3.5 text-sm"
          >
            重试
          </button>
          <a href="/" className="glass-button px-7 py-3.5 text-sm">
            返回首页
          </a>
        </div>
      </div>
    </section>
  );
}
