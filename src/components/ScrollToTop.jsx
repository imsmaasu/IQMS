import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Ensures route transitions start at the top of the viewport,
 * or scrolls smoothly to the #hash target when deep-linked (including lazy routes).
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
      return undefined;
    }

    const targetId = hash.slice(1);
    let attempts = 0;
    let timer = null;

    const tryScroll = () => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      attempts += 1;
      if (attempts < 20) {
        timer = setTimeout(tryScroll, 80);
      }
    };

    tryScroll();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [pathname, search, hash]);

  return null;
}
