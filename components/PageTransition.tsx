"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<"enter" | "idle">("enter");

  useEffect(() => {
    requestAnimationFrame(() => {
      setDisplayChildren(children);
      setTransitionStage("enter");
    });
    const timer = setTimeout(() => setTransitionStage("idle"), 400);
    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <div className={transitionStage === "enter" ? "page-enter" : ""}>
      {displayChildren}
    </div>
  );
}
