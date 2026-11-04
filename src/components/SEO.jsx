import { useEffect } from 'react';

/**
 * SEO — sets document title and meta description per page.
 * Also sets Open Graph tags.
 */
export default function SEO({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;

    const setMeta = (attr, key, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
  }, [title, description]);

  return null;
}

