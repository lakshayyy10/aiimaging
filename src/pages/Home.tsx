import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  Button,
  ButtonLink,
  Container,
  Eyebrow,
  Reveal,
  Section,
  SectionHeader,
} from '../components/ui';
import { publishedRegions, totalCatalogued } from '../data/regions';

const outcomes = [
  {
    title: 'Faster pre-operative identification',
    body: 'Recognise the implant in situ before theatre, rather than from incomplete or missing operative records.',
  },
  {
    title: 'Better-prepared revision surgery',
    body: 'Knowing make and model ahead of time informs instrument selection and reduces intra-operative surprises.',
  },
  {
    title: 'Fewer revision errors',
    body: 'Component-level identification narrows the possibility of mismatched or unavailable extraction hardware.',
  },
  {
    title: 'Evidence-based decisions',
    body: 'Every prediction links through to the manufacturer product page, brochure and surgical technique guide.',
  },
  {
    title: 'A consistent clinical workflow',
    body: 'One reference library across nine anatomical regions, shared between surgeons, registrars and radiology.',
  },
];

const capabilities = [
  {
    title: 'Deep learning classification',
    body: 'Convolutional architectures fine-tuned per anatomical region on curated radiographic datasets.',
  },
  {
    title: 'Multi-modal imaging',
    body: 'Plain radiographs today, with CT and MRI analysis under active development.',
  },
  {
    title: 'Component-level output',
    body: 'Make, model and ranked alternatives — not just a region or a generic implant class.',
  },
  {
    title: 'Peer-reviewed foundation',
    body: 'Nine publications across Radiology: AI, Indian Journal of Orthopaedics, IEEE and Springer.',
  },
];

const pipeline = [
  { step: '01', title: 'Acquire', body: 'AP or lateral radiograph, uploaded as JPEG or PNG.' },
  { step: '02', title: 'Preprocess', body: 'Normalisation, contrast handling and region-of-interest framing.' },
  { step: '03', title: 'Classify', body: 'Region-specific network returns ranked candidate implants.' },
  { step: '04', title: 'Resolve', body: 'Make and model with links to manufacturer documentation.' },
];

const selectedResearch = [
  {
    title: 'Automated identification of orthopedic implants on radiographs using deep learning',
    venue: 'Radiology: Artificial Intelligence',
    year: '2021',
  },
  {
    title: 'Knee implant identification by fine-tuning deep learning models',
    venue: 'Indian Journal of Orthopaedics',
    year: '2021',
  },
  {
    title: 'Harnessing the potential of deep learning for total shoulder implant classification',
    venue: 'MIUA, Springer',
    year: '2023',
  },
];

const collaborators = [
  {
    name: 'National Joint Registry / NEC Software Solutions',
    href: 'https://www.necsws.com',
    logo: 'https://www.necsws.com/wp-content/themes/nec/NEC/img/NEC_SWS_Lockup.svg',
  },
  {
    name: 'SRM Institute of Science and Technology',
    href: 'https://www.srmist.edu.in',
    logo: 'https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/d77541e44be753901dc2a9ce403e7f52.jpg',
  },
  {
    name: 'Implant Identifier',
    href: 'https://implantidentifier.app/',
    logo: 'https://implantidentifier.app/assets/img/logo.png',
  },
];

const Home = () => {
  const videoRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* ================= Hero ================= */}
      <section className="relative overflow-hidden border-b border-line bg-paper">
        <div aria-hidden className="tech-grid pointer-events-none absolute inset-0" />
        <Container className="relative">
          <div className="grid items-center gap-x-16 gap-y-14 pb-[var(--section-y-tight)] pt-16 lg:grid-cols-12 lg:pb-24 lg:pt-24">
            <div className="lg:col-span-6 xl:col-span-6">
              <Reveal>
                <Eyebrow>Orthopaedic imaging AI</Eyebrow>
              </Reveal>

              <Reveal delay={60}>
                <h1 className="t-display mt-6">
                  Identify the implant on any orthopaedic radiograph.
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="t-lead mt-7 max-w-prose">
                  AIIMAGING performs patient-specific implant make and model detection from
                  radiographic imaging — supporting surgical planning, reducing revision
                  errors and improving clinical outcomes.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <ButtonLink to="/implant-identification" size="lg">
                    Identify an implant
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </ButtonLink>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() =>
                      videoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }
                  >
                    Watch the walkthrough
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Product-truthful visual: a real radiograph with the detection readout */}
            <Reveal delay={140} className="lg:col-span-6 xl:col-span-5 xl:col-start-8">
              <div className="relative">
                <div
                  aria-hidden
                  className="glow-accent pointer-events-none absolute -inset-24"
                />
              <figure className="xray-plate relative overflow-hidden rounded-lg ring-1 ring-accent/15">
                <div className="aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]">
                  <img
                    src="https://balbharatiin.wordpress.com/wp-content/uploads/2025/09/vanguard-1.png"
                    alt="Anteroposterior knee radiograph showing a total knee replacement"
                    className="h-full w-full object-contain p-6 sm:p-10"
                    width={800}
                    height={1000}
                    // @ts-expect-error React 18 forwards the lowercase attribute
                    fetchpriority="high"
                  />
                </div>

                {/* Detection frame */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-[22%] inset-y-[26%] border border-accent-500/45"
                >
                  {['-top-px -left-px border-l-2 border-t-2', '-top-px -right-px border-r-2 border-t-2',
                    '-bottom-px -left-px border-b-2 border-l-2', '-bottom-px -right-px border-b-2 border-r-2'
                  ].map((pos) => (
                    <span key={pos} className={`absolute h-4 w-4 border-accent-300 ${pos}`} />
                  ))}
                </div>

                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 border-t border-white/10 bg-ink/85 px-5 py-4 backdrop-blur-sm">
                  <div>
                    <p className="t-label text-accent-300">Detected implant</p>
                    <p className="mt-1.5 font-display text-base text-paper-50">Zimmer Vanguard</p>
                  </div>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[#8B96A8]">
                    Knee · AP view
                  </p>
                </figcaption>
              </figure>
              </div>
            </Reveal>
          </div>
        </Container>

        {/* Spec strip */}
        <div className="border-t border-line">
          <Container>
            <dl className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
              {[
                { k: 'Modalities', v: 'X-ray · CT · MRI' },
                { k: 'Regions catalogued', v: `${publishedRegions.length}` },
                { k: 'Reference implants', v: `${totalCatalogued}+` },
                { k: 'Publications', v: '9' },
              ].map((item) => (
                <div key={item.k} className="bg-paper py-6 pr-6 sm:px-6 sm:first:pl-0">
                  <dt className="t-label text-graphite-500">{item.k}</dt>
                  <dd className="mt-2 font-display text-lg tracking-[-0.02em] text-accent">
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </section>

      {/* ================= The problem ================= */}
      <Section tone="white">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>The problem</Eyebrow>
                <h2 className="t-h2 mt-5">
                  A revision begins with a question nobody can answer.
                </h2>
                <p className="t-lead mt-6">
                  When a patient presents years after their primary procedure, the operative
                  record is often incomplete, transferred or lost. The radiograph is the only
                  evidence left — and reading the implant from it is expert, slow and
                  inconsistent work.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <ol className="border-t border-line">
                {outcomes.map((item, i) => (
                  <Reveal as="li" key={item.title} delay={i * 60}>
                    <div className="flex gap-6 border-b border-line py-6">
                      <span className="t-label shrink-0 pt-1 text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="t-h3">{item.title}</h3>
                        <p className="t-body mt-2">{item.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      {/* ================= Platform + walkthrough ================= */}
      <Section tone="tint">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div ref={videoRef} className="overflow-hidden rounded-lg border border-line bg-ink">
                <video
                  className="block h-auto w-full"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  preload="metadata"
                  aria-label="AIIMAGING platform walkthrough"
                >
                  <source src="./into.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </Reveal>

            <div className="lg:col-span-5">
              <Reveal delay={80}>
                <Eyebrow>The platform</Eyebrow>
                <h2 className="t-h2 mt-5">Built for the way implants are actually read.</h2>
              </Reveal>

              <dl className="mt-10 border-t border-line">
                {capabilities.map((c, i) => (
                  <Reveal key={c.title} delay={120 + i * 60}>
                    <div className="border-b border-line py-5">
                      <dt className="font-display text-base font-medium tracking-[-0.015em]">
                        {c.title}
                      </dt>
                      <dd className="t-small mt-1.5">{c.body}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* ================= Pipeline (ink) ================= */}
      <Section tone="ink" className="relative overflow-hidden">
        <div aria-hidden className="ink-wash pointer-events-none absolute inset-0" />
        <Container className="relative">
          <Reveal>
            <SectionHeader
              eyebrow="How it works"
              title="From radiograph to component in four steps."
            />
          </Reveal>

          <ol className="mt-14 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {pipeline.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 80}>
                <div className="h-full border-b border-white/10 py-8 sm:px-8 sm:first:pl-0 sm:[&:nth-child(2n)]:border-l lg:border-b-0 lg:border-l lg:first:border-l-0 lg:[&:nth-child(2n)]:border-l">
                  <span className="t-label text-accent-300">{s.step}</span>
                  <h3 className="t-h3 mt-5">{s.title}</h3>
                  <p className="t-body mt-2.5">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ================= Coverage ================= */}
      <Section tone="white" bordered>
        <Container>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <SectionHeader
                eyebrow="Coverage"
                title="Nine anatomical regions, one reference library."
              />
            </Reveal>
            <Reveal delay={80}>
              <ButtonLink to="/xray-library" variant="secondary" className="shrink-0">
                Browse the full library
                <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
            </Reveal>
          </div>

          <ul className="mt-14 border-t border-line">
            {publishedRegions.map((region, i) => (
              <Reveal as="li" key={region.slug} delay={i * 40}>
                <Link
                  to={region.path}
                  className="group grid grid-cols-1 items-baseline gap-x-8 gap-y-2 border-b border-line py-6 transition-colors hover:bg-tint sm:grid-cols-12 sm:py-7"
                >
                  <span className="t-label hidden text-accent sm:col-span-1 sm:block">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="t-h3 transition-colors group-hover:text-accent sm:col-span-3">
                    {region.name}
                  </h3>
                  <p className="t-small sm:col-span-5">{region.description}</p>
                  <span className="t-label text-graphite-500 sm:col-span-2">
                    {region.implants.length} implants
                  </span>
                  <span className="hidden justify-end sm:col-span-1 sm:flex">
                    <ArrowUpRight
                      aria-hidden
                      className="h-5 w-5 text-graphite-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ================= Research ================= */}
      <Section tone="paper">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Evidence</Eyebrow>
                <h2 className="t-h2 mt-5">The research came first.</h2>
                <p className="t-lead mt-6">
                  The methods behind the platform are published and peer-reviewed, developed
                  with orthopaedic surgeons, radiologists and academic partners.
                </p>
                <div className="mt-9">
                  <ButtonLink to="/research" variant="secondary">
                    All publications
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={80}>
                {/* Award */}
                <article className="edge-accent rounded-lg border border-line bg-tint p-7">
                  <p className="t-label text-accent">Winner · Pitch Your Idea</p>
                  <h3 className="t-h3 mt-4">
                    RCR 2nd Global AI Conference
                  </h3>
                  <p className="t-small mt-3">
                    Awarded to Vineet Batta for “Automated Identification &amp; Analysis of
                    implanted orthopedic prosthesis visible on radiographs using AI” —
                    presented by The Royal College of Radiologists.
                  </p>
                </article>
              </Reveal>

              <ul className="mt-10 border-t border-line">
                {selectedResearch.map((pub, i) => (
                  <Reveal as="li" key={pub.title} delay={140 + i * 60}>
                    <div className="border-b border-line py-5">
                      <p className="font-display text-[1.0625rem] leading-snug tracking-[-0.015em]">
                        {pub.title}
                      </p>
                      <p className="t-label mt-2.5 text-graphite-500">
                        {pub.venue} · {pub.year}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ================= Collaborators ================= */}
      <Section tone="white" size="tight" bordered>
        <Container>
          <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-3">
              <p className="t-label text-graphite-500">In collaboration with</p>
            </Reveal>
            <Reveal delay={80} className="lg:col-span-9">
              <ul className="flex flex-wrap items-center gap-x-12 gap-y-8">
                {collaborators.map((c) => (
                  <li key={c.name}>
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-line bg-white p-1.5">
                        <img
                          src={c.logo}
                          alt=""
                          loading="lazy"
                          className="max-h-full max-w-full object-contain"
                        />
                      </span>
                      <span className="max-w-[16rem] text-sm text-graphite transition-colors group-hover:text-ink">
                        {c.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ================= CTA ================= */}
      <Section tone="ink" className="relative overflow-hidden">
        <div aria-hidden className="ink-wash pointer-events-none absolute inset-0" />
        <Container className="relative">
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <h2 className="t-h1">Bring implant identification into your workflow.</h2>
            </Reveal>
            <Reveal delay={80} className="lg:col-span-5">
              <p className="t-lead">
                Upload a radiograph and see the platform work, or read the research behind it.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink to="/implant-identification" size="lg">
                  Identify an implant
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
                <ButtonLink to="/research" variant="secondary" size="lg">
                  View research
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Home;
