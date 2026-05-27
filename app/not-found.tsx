import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="section-shell text-center">
        <p className="section-kicker">404</p>
        <h1 className="headline-gradient mx-auto mt-3 max-w-4xl text-[42px] font-extrabold leading-none md:text-[76px]">
          页面不存在
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          你访问的页面可能已被移除、更名或暂时不可用。
        </p>
        <Link href="/" className="amber-button mt-8 inline-flex px-7 py-3.5 text-sm">
          返回首页
        </Link>
      </div>
    </section>
  );
}
