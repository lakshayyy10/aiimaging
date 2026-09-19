import { Linkedin, Mail } from 'lucide-react';
import {
  Container,
  Eyebrow,
  PageHeader,
  Reveal,
  Section,
  SectionHeader,
} from '../components/ui';
import { cx } from '../lib/cx';

type Member = {
  name: string;
  title?: string;
  image?: string;
  linkedin?: string;
  email?: string;
};

const founder = {
  name: 'Dr. Vineet Batta',
  role: 'Founder',
  image:
    'https://balbharatiin.wordpress.com/wp-content/uploads/2025/07/whatsapp-image-2025-07-28-at-10.34.34-am1.jpeg',
  email: 'vineet.batta@unicornmedics.com',
  education:
    'MBBS · MS (Trauma) · Dip Sports Med · FRCS (Orth) · MD (Ortho Research & Bio Med Eng.)',
  bio: 'Orthopaedic surgeon specialising in trauma, hip and knee replacement. Senior Clinical Fellow at Luton & Dunstable University NHS Hospital and Honorary Lecturer at the Royal National Orthopaedic Hospital, UCL. Award-winning researcher with over £90k in competitive grants.',
};

const groups: { title: string; members: Member[] }[] = [
  {
    title: 'Collaborators',
    members: [
      {
        name: 'Maxim Horwatiz',
        title: 'Collaborator',
        image:
          'https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/whatsapp-image-2025-09-19-at-21.23.01.jpeg',
      },
    ],
  },
  {
    title: 'Mentors',
    members: [{ name: 'Dr Parth Desai', title: 'Founder & CEO, Implant Identifier' }],
  },
  {
    title: 'Technical advisors',
    members: [
      { name: 'Prof Malathy', title: 'Professor, Networking & Communications' },
      {
        name: 'Asst. Prof Dr Gayathri M',
        title: 'Assistant Professor, Computing Technologies',
        image:
          'https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/whatsapp-image-2025-09-20-at-00.15.16.jpeg',
      },
    ],
  },
  {
    title: 'Core team',
    members: [
      {
        name: 'Kiruthika M',
        title: 'Research Associate',
        image:
          'https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/whatsapp-image-2025-09-20-at-00.35.12.jpeg',
      },
      {
        name: 'Auxilia',
        title: 'Data Curator',
        image:
          'https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/whatsapp-image-2025-09-20-at-00.18.03.jpeg',
      },
      { name: 'Soumya', title: 'Technical Director' },
      { name: 'Ramanathan', title: 'Core Team' },
    ],
  },
  {
    title: 'Interns',
    members: [
      {
        name: 'Lakshay Chhabra',
        title: 'Intern',
        image:
          'https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/whatsapp-image-2025-06-18-at-18.36.55.jpeg',
      },
      {
        name: 'Priyansh Sonthalia',
        title: 'Intern',
        image:
          'https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/whatsapp-image-2025-05-06-at-20.48.32.jpeg',
      },
      {
        name: 'Abhinav',
        title: 'Intern',
        image:
          'https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/whatsapp-image-2025-09-19-at-19.25.51-min-2.jpeg',
      },
      {
        name: 'Shreya',
        title: 'Intern',
        image:
          'https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/whatsapp-image-2025-09-20-at-00.15.47.jpeg',
      },
    ],
  },
];

const partners = [
  {
    name: 'National Joint Registry / NEC Software Solutions',
    location: 'United Kingdom',
    href: 'https://www.necsws.com',
    logo: 'https://www.necsws.com/wp-content/themes/nec/NEC/img/NEC_SWS_Lockup.svg',
  },
  {
    name: 'SRM Institute of Science and Technology',
    location: 'Chennai, India',
    href: 'https://www.srmist.edu.in',
    logo: 'https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/d77541e44be753901dc2a9ce403e7f52.jpg',
  },
  {
    name: 'Implant Identifier',
    location: 'Clinical application partner',
    href: 'https://implantidentifier.app/',
    logo: 'https://implantidentifier.app/assets/img/logo.png',
  },
];

const initials = (name: string) =>
  name
    .replace(/^(Dr|Prof|Asst\.?|Ass\.?)\.?\s+/gi, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

const Portrait = ({ member }: { member: Member }) => (
  <figure>
    <div className="aspect-[4/5] overflow-hidden rounded border border-line bg-paper-100">
      {member.image ? (
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover grayscale transition duration-700 ease-entrance hover:scale-[1.03] hover:grayscale-0"
        />
      ) : (
        // Decorative monogram: the name is printed directly beneath it, so it is
        // hidden from assistive tech rather than announced twice.
        <div className="flex h-full w-full items-center justify-center bg-tint">
          <span
            aria-hidden
            className="font-display text-3xl tracking-[-0.03em] text-accent/45"
          >
            {initials(member.name)}
          </span>
        </div>
      )}
    </div>
    <figcaption className="mt-4">
      <p className="font-display text-[1.0625rem] tracking-[-0.015em]">{member.name}</p>
      {member.title && <p className="t-small mt-1">{member.title}</p>}
    </figcaption>
  </figure>
);

const Team = () => (
  <>
    <PageHeader
      eyebrow="Organisation"
      title="Team & collaborators"
      lead="Orthopaedic surgeons, biomedical engineers and machine learning researchers building implant identification into everyday clinical practice."
    />

    {/* Founder */}
    <Section tone="white">
      <Container>
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="aspect-[4/5] overflow-hidden rounded border border-line bg-paper-100">
              <img
                src={founder.image}
                alt={founder.name}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-7 lg:col-start-6">
            <Eyebrow>{founder.role}</Eyebrow>
            <h2 className="t-h2 mt-5">{founder.name}</h2>
            <p className="mt-4 text-sm text-graphite-600">{founder.education}</p>
            <p className="t-lead mt-7 max-w-prose">{founder.bio}</p>

            <div className="mt-9 flex gap-2">
              <a
                href={`mailto:${founder.email}`}
                aria-label={`Email ${founder.name}`}
                className="flex h-10 w-10 items-center justify-center rounded border border-line text-graphite transition-colors hover:border-graphite-500 hover:text-ink"
              >
                <Mail className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${founder.name} on LinkedIn`}
                className="flex h-10 w-10 items-center justify-center rounded border border-line text-graphite transition-colors hover:border-graphite-500 hover:text-ink"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>

    {/* Groups */}
    {groups.map((group, gi) => (
      <Section
        key={group.title}
        tone={gi % 2 === 0 ? 'paper' : 'white'}
        size="tight"
        bordered={gi % 2 === 1}
      >
        <Container>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <h2 className="t-h3">{group.title}</h2>
              <p className="t-label mt-3 text-graphite-500">
                {group.members.length} {group.members.length === 1 ? 'person' : 'people'}
              </p>
            </div>

            <ul
              className={cx(
                'grid gap-x-6 gap-y-10 lg:col-span-9',
                group.members.length === 1
                  ? 'max-w-[15rem] grid-cols-1'
                  : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
              )}
            >
              {group.members.map((m, i) => (
                <Reveal as="li" key={m.name} delay={i * 60}>
                  <Portrait member={m} />
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    ))}

    {/* Partners */}
    <Section tone="ink" className="relative overflow-hidden">
      <div aria-hidden className="ink-wash pointer-events-none absolute inset-0" />
      <Container className="relative">
        <SectionHeader
          eyebrow="Institutional partners"
          title="Built with hospitals, registries and universities."
          lead="We work with organisations leading orthopaedic surgery and biomedical innovation."
        />

        <ul className="mt-14 border-t border-white/10">
          {partners.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 70}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-1 items-center gap-x-8 gap-y-4 border-b border-white/10 py-7 sm:grid-cols-12"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded bg-white/95 p-2 sm:col-span-2">
                  <img src={p.logo} alt="" loading="lazy" className="max-h-full max-w-full object-contain" />
                </span>
                <h3 className="t-h3 transition-colors group-hover:text-accent-300 sm:col-span-6">
                  {p.name}
                </h3>
                <p className="t-label text-[#7E8888] sm:col-span-3">{p.location}</p>
                <span className="t-label text-accent-300 transition-opacity group-hover:opacity-70 sm:col-span-1 sm:text-right">
                  Visit
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  </>
);

export default Team;
