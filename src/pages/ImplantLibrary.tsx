import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import {
  Container,
  Eyebrow,
  PageHeader,
} from '../components/ui';
import { cx } from '../lib/cx';
import { kneeImplants, shoulderImplants, type CatalogueItem } from '../data/catalogue';

const FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="#0A0F10"/><text x="60" y="63" text-anchor="middle" fill="#4A5455" font-family="monospace" font-size="9">NO IMAGE</text></svg>'
  );

const tabs = [
  { id: 'knee', label: 'Knee', items: kneeImplants },
  { id: 'shoulder', label: 'Shoulder', items: shoulderImplants },
] as const;

type TabId = (typeof tabs)[number]['id'];

const ImplantLibrary = () => {
  const [active, setActive] = useState<TabId>('knee');
  const [query, setQuery] = useState('');

  const items: CatalogueItem[] = tabs.find((t) => t.id === active)!.items;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => i.name.toLowerCase().includes(q)) : items;
  }, [items, query]);

  return (
    <>
      <PageHeader
        eyebrow="Reference catalogue"
        title="Implant library"
        lead="Catalogued reference images for knee and shoulder implants, sourced from the clinical radiograph database."
        meta={
          <dl className="grid grid-cols-2 gap-px bg-line">
            {tabs.map((t) => (
              <div key={t.id} className="bg-white px-6 py-6">
                <dt className="t-label text-graphite-500">{t.label}</dt>
                <dd className="mt-3 font-display text-[2rem] leading-none tracking-[-0.03em] text-accent">
                  {t.items.length}
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* Controls */}
      <div className="sticky top-[4.5rem] z-30 border-b border-line bg-paper/92 backdrop-blur-md supports-[backdrop-filter]:bg-paper/80">
        <Container>
          <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div role="tablist" aria-label="Implant category" className="flex gap-1">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active === t.id}
                  onClick={() => {
                    setActive(t.id);
                    setQuery('');
                  }}
                  className={cx(
                    'flex h-10 items-center gap-2 rounded px-4 text-sm font-medium transition-colors',
                    active === t.id
                      ? 'bg-accent text-white'
                      : 'text-graphite hover:bg-tint hover:text-accent'
                  )}
                >
                  {t.label}
                  <span
                    className={cx(
                      'font-mono text-[0.6875rem]',
                      active === t.id ? 'text-white/65' : 'text-graphite-500'
                    )}
                  >
                    {t.items.length}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative sm:w-72">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite-500"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${active} implants`}
                aria-label={`Search ${active} implants`}
                className="h-10 w-full rounded border border-line bg-white pl-10 pr-9 text-sm text-ink placeholder:text-graphite-500 focus:border-graphite-500"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-graphite-500 hover:text-ink"
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                </button>
              )}
            </div>
          </div>
        </Container>
      </div>

      <section className="bg-paper py-[var(--section-y-tight)]">
        <Container>
          <div className="flex items-baseline justify-between gap-4">
            <Eyebrow>{active} implants</Eyebrow>
            <p className="t-label text-graphite-500" aria-live="polite">
              {filtered.length} of {items.length}
            </p>
          </div>

          {filtered.length > 0 ? (
            <ul className="mt-9 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
              {filtered.map((implant) => (
                <li key={implant.image}>
                  <figure>
                    <div className="xray-plate aspect-square overflow-hidden rounded border border-line">
                      <img
                        src={implant.image}
                        alt={`${implant.name} reference image`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain p-3 transition-transform duration-500 ease-entrance hover:scale-[1.04]"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = FALLBACK;
                        }}
                      />
                    </div>
                    <figcaption className="mt-3 text-[0.8125rem] leading-snug text-graphite">
                      {implant.name}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-16 border-t border-line pt-16 text-center">
              <p className="t-h3">No implants match “{query}”</p>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="link-underline mt-4 text-sm"
              >
                Clear the search
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default ImplantLibrary;
