import React, { useRef, useEffect, useState } from 'react';

/**
 * FadeIn — Intersection-observer-driven fade-up.
 * Respects prefers-reduced-motion (the CSS class handles that).
 */
export default function FadeIn({ children, className = '', delay = 0, tag = 'div', ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = tag;

  return (
    <Tag
      ref={ref}
      className={`fade-in${visible ? ' visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

