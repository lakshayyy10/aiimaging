import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import {
  ButtonLink,
  Container,
  PageHeader,
  Reveal,
  Section,
} from '../components/ui';
import { cx } from '../lib/cx';
import { publishedRegions, regions, totalCatalogued } from '../data/regions';

const upcoming = regions.filter((r) => !r.available);

const XrayLibrary = () => (
  <>
    <PageHeader
      eyebrow="X-ray library"
      title="Reference radiographs by anatomical region"
      lead="Catalogued implant radiographs to compare against, and trained identification models where a region has one."
      actions={
        <ButtonLink to="/implant-library" variant="secondary">
          Open the implant catalogue
        </ButtonLink>
      }
      meta={
        <dl className="grid grid-cols-2 gap-px bg-line">
          <div className="bg-white px-6 py-6">
            <dt className="t-label text-graphite-500">Regions</dt>
            <dd className="mt-3 font-display text-[2rem] leading-none tracking-[-0.03em] text-accent">
              {publishedRegions.length}
            </dd>
          </div>
          <div className="bg-white px-6 py-6">
            <dt className="t-label text-graphite-500">Reference implants</dt>
            <dd className="mt-3 font-display text-[2rem] leading-none tracking-[-0.03em] text-accent">
              {totalCatalogued}
            </dd>
          </div>
        </dl>
      }
    />

    <Section tone="paper">
      <Container>
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {publishedRegions.map((region, i) => (
            <Reveal as="li" key={region.slug} delay={Math.min(i, 6) * 60}>
              <Link to={region.path} className="group flex h-full flex-col">
                <div className="xray-plate aspect-[4/3] overflow-hidden rounded border border-line transition-colors group-hover:border-accent/40">
                  <img
                    src={region.cover}
                    alt={`${region.name} radiograph`}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-entrance group-hover:scale-[1.04]"
                  />
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h2 className="t-h3 transition-colors group-hover:text-accent">{region.name}</h2>
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 shrink-0 text-graphite-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </div>

                <p className="t-small mt-2.5 flex-1">{region.description}</p>

                <p className="t-label mt-5 flex items-center gap-3 border-t border-line pt-4 text-graphite-500">
                  <span>{region.implants.length} implants</span>
                  {region.modelPath && (
                    <>
                      <span aria-hidden className="h-3 w-px bg-line-strong" />
                      <span className="text-accent">AI model</span>
                    </>
                  )}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>

    {upcoming.length > 0 && (
      <Section tone="white" bordered size="tight">
        <Container>
          <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="t-h3">In preparation</h2>
              <p className="t-small mt-3">
                Datasets under curation. These regions are not yet published.
              </p>
            </div>
            <ul className="border-t border-line lg:col-span-7 lg:col-start-6">
              {upcoming.map((r) => (
                <li
                  key={r.slug}
                  className={cx(
                    'flex items-baseline justify-between gap-6 border-b border-line py-5'
                  )}
                >
                  <div>
                    <h3 className="t-h3 text-graphite-500">{r.name}</h3>
                    <p className="t-small mt-1.5">{r.description}</p>
                  </div>
                  <span className="t-label shrink-0 text-graphite-500">Pending</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    )}
  </>
);

export default XrayLibrary;
