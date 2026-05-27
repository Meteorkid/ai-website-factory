"use client";

import { useEffect, useRef } from "react";

export default function RevealOnScroll() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observerRef.current = observer;

    function observeNewElements() {
      document.querySelectorAll(".reveal:not(.revealed), .reveal-stagger:not(.revealed)").forEach((el) => {
        observer.observe(el);
      });
    }

    observeNewElements();

    // SPA 路由切换后，新页面的元素需要重新观察
    const mutationObserver = new MutationObserver(() => {
      observeNewElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
