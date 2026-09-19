import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* Restore scroll position on navigation — the router does not do this itself. */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
