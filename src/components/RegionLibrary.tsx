import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ImageOff } from 'lucide-react';
import { Container, Eyebrow, PageHeader, Reveal, Section, ButtonLink } from './ui';
import { cx } from '../lib/cx';
import { regionBySlug } from '../data/regions';

/* One layout for every anatomical region. Replaces seven near-identical pages. */

const RegionLibrary = ({ slug }: { slug: string }) => {
  const region = regionBySlug(slug);

  if (!region) {
    return (
      <Section tone="paper">
        <Container>
          <h1 className="t-h2">Region not found</h1>
          <p className="t-lead mt-4">
            <Link to="/xray-library" className="link-underline">
              Return to the X-ray library
            </Link>
          </p>
        </Container>
      </Section>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={
          <Link
            to="/xray-library"
            className="inline-flex items-center gap-1.5 text-accent transition-colors hover:text-accent-700"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden />
            X-ray library
          </Link>
        }
        title={`${region.name} implants`}
        lead={region.description}
        actions={
          region.modelPath && (
            <ButtonLink to={region.modelPath}>
              Identify a {region.name.toLowerCase()} implant
              <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          )
        }
        meta={
          <dl className="grid grid-cols-2 gap-px bg-line">
            <div className="bg-white px-6 py-6">
              <dt className="t-label text-graphite-500">Catalogued</dt>
              <dd className="mt-3 font-display text-[2rem] leading-none tracking-[-0.03em] text-accent">
                {region.implants.length}
              </dd>
            </div>
            <div className="bg-white px-6 py-6">
              <dt className="t-label text-graphite-500">AI model</dt>
              <dd
                className={cx(
                  'mt-3 font-display text-[1.25rem] leading-none tracking-[-0.02em]',
                  region.modelPath ? 'text-accent' : 'text-graphite-500'
                )}
              >
                {region.modelPath ? 'Available' : 'In development'}
              </dd>
            </div>
          </dl>
        }
      />

      <Section tone="paper">
        <Container>
          <Eyebrow>Reference radiographs</Eyebrow>

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {region.implants.map((implant, i) => (
              <Reveal as="li" key={implant.name} delay={Math.min(i, 8) * 45}>
                <figure className="group/card">
                  <div className="xray-plate aspect-square overflow-hidden rounded border border-line transition-colors group-hover/card:border-accent/40">
                    {implant.image ? (
                      <img
                        src={implant.image}
                        alt={`${implant.name} — ${region.name.toLowerCase()} radiograph`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain p-3 transition-transform duration-500 ease-entrance hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-white/25">
                        <ImageOff className="h-5 w-5" aria-hidden />
                        <span className="t-label">Image pending</span>
                      </div>
                    )}
                  </div>
                  <figcaption className="mt-3.5">
                    <p className="font-display text-[0.9375rem] leading-snug tracking-[-0.01em] transition-colors group-hover/card:text-accent">
                      {implant.name}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {region.modelPath && (
        <Section tone="ink" size="tight" className="relative overflow-hidden">
          <div aria-hidden className="ink-wash pointer-events-none absolute inset-0" />
          <Container className="relative">
            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <h2 className="t-h2">
                  Not sure which {region.name.toLowerCase()} implant you are looking at?
                </h2>
                <p className="t-lead mt-5 max-w-prose">
                  Upload the radiograph and the model returns ranked candidates with links to
                  manufacturer documentation.
                </p>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
                <ButtonLink to={region.modelPath} size="lg">
                  Open the identifier
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
              </div>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
};

export default RegionLibrary;
