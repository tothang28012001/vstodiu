'use client';

import { useEffect, useState } from 'react';

/** Document outline with scroll-spy. Sticky on desktop, hidden on small screens. */
export function OutlineRail({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Whichever tracked section is nearest the top of the viewport wins.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-88px 0px -65% 0px', threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-24">
      <div className="label mb-4">Contents</div>
      <ul className="space-y-0.5 border-l border-line">
        {items.map((item) => {
          const on = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={on ? 'true' : undefined}
                className={`-ml-px block border-l py-1.5 pl-4 text-[13px] transition-colors duration-200 ${
                  on ? 'text-fg-hi' : 'border-transparent text-fg-dim hover:text-fg-lo'
                }`}
                style={on ? { borderColor: 'var(--accent)' } : undefined}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
