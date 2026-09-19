import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { cx } from '../../lib/cx';

/* ===========================================================================
   Design primitives.
   Every page composes from these so spacing, width and type stay on one grid.
   =========================================================================== */

type Div = React.HTMLAttributes<HTMLDivElement>;


/* ---- Container ----------------------------------------------------------- */

export const Container = ({ className, children, ...rest }: Div) => (
  <div
    className={cx('mx-auto w-full max-w-container px-[var(--gutter)]', className)}
    {...rest}
  >
    {children}
  </div>
);

/* ---- Section ------------------------------------------------------------- */

type SectionProps = Div & {
  as?: 'section' | 'div' | 'footer' | 'header';
  tone?: 'paper' | 'muted' | 'tint' | 'ink' | 'white';
  size?: 'default' | 'tight';
  bordered?: boolean;
};

const TONES: Record<NonNullable<SectionProps['tone']>, string> = {
  paper: 'bg-paper',
  muted: 'bg-paper-100',
  tint: 'bg-tint',
  white: 'bg-white',
  ink: 'on-ink',
};

export const Section = ({
  as: Tag = 'section',
  tone = 'paper',
  size = 'default',
  bordered = false,
  className,
  children,
  ...rest
}: SectionProps) => (
  <Tag
    className={cx(TONES[tone], bordered && 'border-t border-line', className)}
    style={{
      paddingTop: size === 'tight' ? 'var(--section-y-tight)' : 'var(--section-y)',
      paddingBottom: size === 'tight' ? 'var(--section-y-tight)' : 'var(--section-y)',
    }}
    {...rest}
  >
    {children}
  </Tag>
);

/* ---- Eyebrow ------------------------------------------------------------- */

export const Eyebrow = ({
  children,
  className,
  rule = true,
}: {
  children: React.ReactNode;
  className?: string;
  rule?: boolean;
}) => (
  <p className={cx('t-label flex items-center gap-3 text-accent', className)}>
    {rule && <span aria-hidden className="h-0.5 w-7 shrink-0 bg-current" />}
    {children}
  </p>
);

/* ---- Section header ------------------------------------------------------ */

export const SectionHeader = ({
  eyebrow,
  title,
  lead,
  align = 'start',
  className,
  children,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: 'start' | 'center';
  className?: string;
  children?: React.ReactNode;
}) => (
  <div
    className={cx(
      align === 'center' ? 'mx-auto max-w-lead text-center' : 'max-w-lead',
      className
    )}
  >
    {eyebrow && (
      <Eyebrow className={align === 'center' ? 'justify-center' : ''}>{eyebrow}</Eyebrow>
    )}
    <h2 className={cx('t-h2', eyebrow && 'mt-5')}>{title}</h2>
    {lead && <p className="t-lead mt-5">{lead}</p>}
    {children}
  </div>
);

/* ---- Buttons ------------------------------------------------------------- */

type Variant = 'primary' | 'secondary' | 'link';
type Size = 'default' | 'lg';

/* Written out in full, never interpolated: Tailwind tree-shakes component
   classes it cannot find as literal strings in the source. */
const VARIANT: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  link: 'btn-link',
};

const btn = (variant: Variant, size: Size, className?: string) =>
  cx('btn', VARIANT[variant], size === 'lg' && variant !== 'link' && 'btn-lg', className);

export const Button = ({
  variant = 'primary',
  size = 'default',
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) => (
  <button className={btn(variant, size, className)} {...rest} />
);

export const ButtonLink = ({
  to,
  variant = 'primary',
  size = 'default',
  className,
  external,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
}) =>
  external ? (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className={btn(variant, size, className)}
      {...rest}
    />
  ) : (
    <Link to={to} className={btn(variant, size, className)} {...rest} />
  );

/* ---- Reveal -------------------------------------------------------------- */
/* Single IntersectionObserver-based entrance. No scroll listeners, no parallax.
   Honours prefers-reduced-motion via the .reveal stylesheet rule. */

export const Reveal = ({
  delay = 0,
  as: Tag = 'div',
  className,
  children,
}: {
  delay?: number;
  as?: 'div' | 'li' | 'article' | 'section';
  className?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref as never}
      data-shown={shown}
      className={cx('reveal', className)}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
};

/* ---- Wordmark ------------------------------------------------------------ */
/* A precise aperture glyph — drawn, not a gradient chip. */

export const Wordmark = ({
  className,
  tone = 'ink',
}: {
  className?: string;
  tone?: 'ink' | 'paper';
}) => (
  <span
    className={cx(
      'inline-flex items-center gap-2.5',
      tone === 'paper' ? 'text-paper-50' : 'text-ink',
      className
    )}
  >
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] shrink-0" aria-hidden focusable="false">
      <circle cx="12" cy="12" r="10.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 0.5v5M12 18.5v5M0.5 12h5M18.5 12h5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
    <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.01em]">
      AIIMAGING
    </span>
  </span>
);

/* ---- Page header --------------------------------------------------------- */
/* Shared masthead for every interior route, so no page invents its own. */

export const PageHeader = ({
  eyebrow,
  title,
  lead,
  actions,
  meta,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  actions?: React.ReactNode;
  meta?: React.ReactNode;
}) => (
  <header className="border-b border-line bg-white">
    <Container>
      <div className="grid gap-x-16 gap-y-10 py-[var(--section-y-tight)] lg:grid-cols-12">
        <div className="lg:col-span-7">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className={cx('t-h1', eyebrow && 'mt-5')}>{title}</h1>
          {lead && <p className="t-lead mt-6 max-w-prose">{lead}</p>}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {meta && (
          <div className="lg:col-span-5 lg:justify-self-end lg:pt-2">{meta}</div>
        )}
      </div>
    </Container>
  </header>
);

/* ---- Stat ---------------------------------------------------------------- */

export const StatRow = ({
  items,
  className,
}: {
  items: { value: string; label: string }[];
  className?: string;
}) => (
  <dl className={cx('grid grid-cols-2 gap-px overflow-hidden bg-line sm:grid-cols-3', className)}>
    {items.map((s) => (
      <div key={s.label} className="bg-white px-5 py-6 sm:px-6 sm:py-7">
        <dt className="t-label text-graphite-500">{s.label}</dt>
        <dd className="mt-3 font-display text-[2rem] font-medium leading-none tracking-[-0.03em] text-accent">
          {s.value}
        </dd>
      </div>
    ))}
  </dl>
);
