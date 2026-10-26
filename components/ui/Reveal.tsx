"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger in milliseconds relative to siblings entering together. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "figure";
  /**
   * "rise" fades and lifts the block; "shutter" opens a picture upward from its bottom edge;
   * "unroll" drops it from its top edge, like a swatch hanging from its mount.
   */
  variant?: "rise" | "shutter" | "unroll";
};

/**
 * Brings its children in once, when they scroll into view.
 * Content stays visible without JavaScript, above the fold, and under reduced motion.
 */
export function Reveal({ children, delay = 0, className, as: Tag = "div", variant = "rise" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    node.dataset.reveal = "hidden";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      data-reveal-variant={variant === "rise" ? undefined : variant}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
