import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  ButtonLink,
  Container,
  Eyebrow,
  PageHeader,
  Reveal,
  Section,
  SectionHeader,
} from '../components/ui';
import { cx } from '../lib/cx';
import { publishedRegions, totalCatalogued } from '../data/regions';

const modalities = [
  {
    name: 'X-ray',
    status: 'Available',
    to: '/xray-library',
    available: true,
    description:
      'Plain radiograph reference library and trained identification models across nine anatomical regions.',
    image:
      'https://balbharatiin.wordpress.com/wp-content/uploads/2025/09/whatsapp-image-2025-09-13-at-12.48.33-am.jpeg',
    imageAlt: 'Anteroposterior hip radiograph showing a total hip replacement',
  },
  {
    name: 'CT',
    status: 'In development',
    to: '/xray-library',
    available: false,
    description:
      'Cross-sectional analysis for geometric parameter extraction and component positioning. Under active research.',
    image:
      'https://balbharatiin.wordpress.com/wp-content/uploads/2025/09/whatsapp-image-2025-09-14-at-11.42.53-pm.jpeg',
    imageAlt: 'Spinal radiograph showing posterior instrumentation',
  },
];

const ImplantIdentification = () => (
  <>
    <PageHeader
      eyebrow="Platform"
      title="Implant identification"
      lead="A clinical reference library and trained identification models for orthopaedic implants. Choose an imaging modality to begin, or go straight to a region."
      actions={
        <>
          <ButtonLink to="/xray-library">
            Browse X-ray library
            <ArrowRight className="h-4 w-4" aria-hidden />
          </ButtonLink>
          <ButtonLink to="/implant-library" variant="secondary">
            Implant catalogue
          </ButtonLink>
        </>
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

    {/* Modalities */}
    <Section tone="paper">
      <Container>
        <Eyebrow>Imaging modality</Eyebrow>

        <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {modalities.map((m, i) => {
            const Body = (
              <>
                <div className="xray-plate aspect-[5/4] overflow-hidden rounded border border-line transition-colors group-hover:border-accent/40">
                  <img
                    src={m.image}
                    alt={m.imageAlt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className={cx(
                      'h-full w-full object-cover transition-transform duration-700 ease-entrance',
                      m.available ? 'group-hover:scale-[1.03]' : 'opacity-45'
                    )}
                  />
                </div>

                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h2 className="t-h2 transition-colors group-hover:text-accent">{m.name}</h2>
                  <span
                    className={cx(
                      't-label',
                      m.available ? 'text-accent' : 'text-graphite-500'
                    )}
                  >
                    {m.status}
                  </span>
                </div>
                <p className="t-body mt-4 max-w-prose">{m.description}</p>

                {m.available && (
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink">
                    Open the library
                    <ArrowRight
                      aria-hidden
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                )}
              </>
            );

            return (
              <Reveal key={m.name} delay={i * 90}>
                {m.available ? (
                  <Link to={m.to} className="group block">
                    {Body}
                  </Link>
                ) : (
                  <div aria-disabled="true">{Body}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>

    {/* Direct region access */}
    <Section tone="white" bordered size="tight">
      <Container>
        <SectionHeader
          eyebrow="Jump to a region"
          title="Go directly to the anatomy you are reviewing."
        />
        <ul className="mt-10 flex flex-wrap gap-2.5">
          {publishedRegions.map((r) => (
            <li key={r.slug}>
              <Link
                to={r.path}
                className="inline-flex items-center gap-2 rounded border border-line px-4 py-2.5 text-sm text-ink transition-colors hover:border-accent/50 hover:bg-tint hover:text-accent"
              >
                {r.name}
                <span className="font-mono text-[0.6875rem] text-graphite-500">
                  {r.implants.length}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  </>
);

export default ImplantIdentification;
