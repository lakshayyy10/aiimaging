import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import {
  Container,
  Wordmark,
} from './ui';
import { cx } from '../lib/cx';

type NavItem = {
  name: string;
  href: string;
  children?: { name: string; href: string; description: string }[];
};

const navigation: NavItem[] = [
  {
    name: 'Platform',
    href: '/implant-identification',
    children: [
      {
        name: 'Implant identification',
        href: '/implant-identification',
        description: 'Upload a radiograph and identify the implant make and model.',
      },
      {
        name: 'X-ray library',
        href: '/xray-library',
        description: 'Reference radiographs across nine anatomical regions.',
      },
      {
        name: 'Implant library',
        href: '/implant-library',
        description: '88 catalogued knee and shoulder implant reference images.',
      },
    ],
  },
  { name: 'Research', href: '/research' },
  { name: 'Team', href: '/team' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number>();

  // Solidify the bar once the hero has begun to scroll away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location.pathname]);

  // Lock the page behind the mobile panel.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Escape closes; a click outside dismisses the dropdown.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, []);

  const isSectionActive = (item: NavItem) =>
    location.pathname === item.href ||
    item.children?.some((c) => location.pathname.startsWith(c.href));

  const hoverOpen = (name: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(name);
  };
  const hoverClose = () => {
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:text-paper-50"
      >
        Skip to content
      </a>

      <header
        className={cx(
          'sticky top-0 z-50 border-b transition-colors duration-300',
          scrolled || mobileOpen
            ? 'border-line bg-paper/92 backdrop-blur-md supports-[backdrop-filter]:bg-paper/80'
            : 'border-transparent bg-paper'
        )}
      >
        <Container>
          <div className="flex h-[4.5rem] items-center justify-between gap-8">
            <Link to="/" aria-label="AIIMAGING — home" className="shrink-0">
              <Wordmark />
            </Link>

            {/* Desktop navigation */}
            <nav
              ref={navRef}
              aria-label="Primary"
              className="hidden items-center gap-1 lg:flex"
            >
              {navigation.map((item) =>
                item.children ? (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => hoverOpen(item.name)}
                    onMouseLeave={hoverClose}
                  >
                    <button
                      type="button"
                      aria-expanded={openMenu === item.name}
                      aria-haspopup="true"
                      onClick={() =>
                        setOpenMenu((c) => (c === item.name ? null : item.name))
                      }
                      className={cx(
                        'relative flex h-9 items-center gap-1.5 rounded px-3 text-sm font-medium transition-colors',
                        isSectionActive(item)
                          ? 'text-accent after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:bg-accent'
                          : 'text-graphite hover:text-ink'
                      )}
                    >
                      {item.name}
                      <ChevronDown
                        aria-hidden
                        className={cx(
                          'h-3.5 w-3.5 transition-transform duration-200',
                          openMenu === item.name && 'rotate-180'
                        )}
                      />
                    </button>

                    {openMenu === item.name && (
                      <div className="absolute left-0 top-[calc(100%+0.5rem)] w-[24rem] animate-panel-in overflow-hidden rounded-lg border border-line bg-white shadow-lift">
                        <ul>
                          {item.children.map((child) => (
                            <li key={child.href} className="border-b border-line last:border-0">
                              <Link
                                to={child.href}
                                className="group/item block px-5 py-4 transition-colors hover:bg-tint"
                              >
                                <span className="block text-sm font-medium text-ink transition-colors group-hover/item:text-accent">
                                  {child.name}
                                </span>
                                <span className="mt-1 block text-[0.8125rem] leading-snug text-graphite-600">
                                  {child.description}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      cx(
                        'relative flex h-9 items-center rounded px-3 text-sm font-medium transition-colors',
                        isActive
                          ? 'text-accent after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:bg-accent'
                          : 'text-graphite hover:text-ink'
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                )
              )}

              <Link
                to="/implant-identification"
                className="btn btn-primary ml-4 h-9 px-4 text-[0.8125rem]"
              >
                Identify an implant
              </Link>
            </nav>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded text-ink transition-colors hover:bg-paper-100 lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile panel */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 animate-fade-in overflow-y-auto overscroll-contain border-t border-line bg-paper lg:hidden"
        >
          <Container>
            <nav aria-label="Mobile" className="py-8">
              <ul className="divide-y divide-line border-y border-line">
                {navigation.map((item) => (
                  <li key={item.name} className="py-5">
                    {item.children ? (
                      <>
                        <p className="t-label text-graphite-500">{item.name}</p>
                        <ul className="mt-4 space-y-4">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                to={child.href}
                                className="font-display text-xl tracking-[-0.02em] text-ink"
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        className="font-display text-xl tracking-[-0.02em] text-ink"
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              <Link
                to="/implant-identification"
                className="btn btn-primary btn-lg mt-8 w-full"
              >
                Identify an implant
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </>
  );
};

export default Header;
