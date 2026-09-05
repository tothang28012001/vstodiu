'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Fade-and-rise on first entry into the viewport.
 *
 * Deliberately one-way: content that re-animates every time you scroll back up
 * makes a long document feel unstable. Once shown, it stays shown.
 *
 * Renders visible immediately when the reader has asked for reduced motion, and
 * if IntersectionObserver is unavailable — content must never depend on script
 * to be readable.
 */
export function Reveal({
  children,
  delay = 0,
  y = 14,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setShown(true);
      return;
    }


    // Failsafe. A working observer always delivers an initial callback — even
    // for an element that is off-screen, with isIntersecting false. If nothing
    // arrives at all the observer is not running, and content must not stay
    // invisible, so show it. (Genuinely hidden tabs freeze observers too; those
    // resume on their own when the tab is looked at, and this costs nothing.)
    let heard = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        heard = true;
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      // Fire a little before the element reaches the fold, so the movement has
      // finished by the time it is properly in view.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.06 },
    );

    io.observe(el);
    const failsafe = setTimeout(() => {
      if (!heard) setShown(true);
    }, 1500);

    return () => {
      clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      // Hook for the <noscript> rule in the layout: without JS these never get
      // their observer, so the page would render blank. Never remove the pair.
      data-reveal=""
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${y}px)`,
        transition: `opacity 0.62s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.62s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: shown ? undefined : 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  );
}
