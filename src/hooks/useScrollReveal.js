import { useEffect, useRef } from 'react';

export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial state for CSS to pick up
    el.setAttribute('data-reveal', 'hidden');

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.setAttribute('data-reveal', 'visible');
        observer.unobserve(el);
      }
    }, { threshold: 0.15, ...options });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
