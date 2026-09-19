import { useMemo, useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import {
  Container,
  Eyebrow,
  PageHeader,
  Reveal,
  Section,
} from '../components/ui';
import { cx } from '../lib/cx';
import { publications, type PublicationType } from '../data/publications';

type Filter = 'All' | PublicationType;

const Publications = () => {
  const [filter, setFilter] = useState<Filter>('All');

  const counts = useMemo(() => {
    const base: Record<string, number> = { All: publications.length };
    for (const p of publications) base[p.type] = (base[p.type] ?? 0) + 1;
    return base;
  }, []);

  const filters: Filter[] = ['All', 'Journal', 'Conference', 'Poster'];

  const visible = useMemo(
    () => (filter === 'All' ? publications : publications.filter((p) => p.type === filter)),
    [filter]
  );

  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Publications"
        lead="Peer-reviewed articles, conference proceedings and presentations advancing AI-based identification of orthopaedic implants from medical imaging."
        meta={
          <dl className="grid grid-cols-3 gap-px bg-line">
            {[
              { label: 'Total', value: String(counts.All) },
              { label: 'Journal', value: String(counts.Journal ?? 0) },
              { label: 'Conference', value: String(counts.Conference ?? 0) },
            ].map((s) => (
              <div key={s.label} className="bg-white px-5 py-6">
                <dt className="t-label text-graphite-500">{s.label}</dt>
                <dd className="mt-3 font-display text-[2rem] leading-none tracking-[-0.03em] text-accent">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* Award */}
      <Section tone="white" size="tight">
        <Container>
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-4">
              <a
                href="/certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded border border-line bg-paper-100"
              >
                <img
                  src="/certificate-preview.png"
                  alt="Certificate — RCR 2nd Global AI Conference, Pitch Your Idea winner"
                  loading="lazy"
                  className="w-full transition-transform duration-700 ease-entrance group-hover:scale-[1.02]"
                />
              </a>
            </Reveal>

            <Reveal delay={80} className="lg:col-span-7 lg:col-start-6">
              <Eyebrow>Winner · Pitch Your Idea</Eyebrow>
              <h2 className="t-h2 mt-5">RCR 2nd Global AI Conference</h2>
              <p className="t-lead mt-5 max-w-prose">
                Awarded to Vineet Batta for “Automated Identification &amp; Analysis of
                implanted orthopedic prosthesis visible on radiographs using AI” — the
                research behind this platform.
              </p>
              <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4">
                <div>
                  <dt className="t-label text-graphite-500">Presented by</dt>
                  <dd className="mt-2 text-sm text-ink">The Royal College of Radiologists</dd>
                </div>
                <div>
                  <dt className="t-label text-graphite-500">Date</dt>
                  <dd className="mt-2 text-sm text-ink">29–30 June 2026</dd>
                </div>
              </dl>
              <a
                href="/certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-8 inline-flex items-center gap-2 text-sm"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                View certificate
              </a>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Publication index */}
      <Section tone="paper">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Eyebrow>Index</Eyebrow>
            <div role="tablist" aria-label="Filter publications" className="flex flex-wrap gap-1">
              {filters.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={cx(
                    'flex h-9 items-center gap-2 rounded px-3.5 text-sm font-medium transition-colors',
                    filter === f
                      ? 'bg-accent text-white'
                      : 'text-graphite hover:bg-tint hover:text-accent'
                  )}
                >
                  {f}
                  <span
                    className={cx(
                      'font-mono text-[0.6875rem]',
                      filter === f ? 'text-white/65' : 'text-graphite-500'
                    )}
                  >
                    {counts[f] ?? 0}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <ol className="mt-10 border-t border-line">
            {visible.map((pub, i) => (
              <Reveal as="li" key={pub.link + pub.title} delay={Math.min(i, 6) * 45}>
                <article className="border-b border-line py-8">
                  <div className="grid gap-x-10 gap-y-4 lg:grid-cols-12">
                    <div className="lg:col-span-3">
                      <p className="t-label text-accent">{pub.type}</p>
                      <p className="t-label mt-2 text-graphite-500">{pub.date}</p>
                    </div>

                    <div className="flex gap-6 lg:col-span-9">
                      <div className="min-w-0 flex-1">
                        <h2 className="t-h3">
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-accent"
                          >
                            {pub.title}
                          </a>
                        </h2>

                        <p className="t-small mt-3">{pub.authors}</p>
                        <p className="mt-1.5 text-sm italic text-graphite-600">{pub.journal}</p>
                        <p className="t-body mt-4 max-w-prose">{pub.abstract}</p>

                        <ul className="mt-5 flex flex-wrap gap-2">
                          {pub.tags.map((tag) => (
                            <li
                              key={tag}
                              className="t-label rounded-full border border-line px-3 py-1 text-graphite-600"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <ArrowUpRight
                        aria-hidden
                        className="mt-1.5 h-5 w-5 shrink-0 text-graphite-500"
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
};

export default Publications;
