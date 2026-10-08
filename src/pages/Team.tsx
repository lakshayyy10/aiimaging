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
  country?: string;
  institution?: string;
  image?: string;
  linkedin?: string;
  email?: string;
};

const founder = {
  name: 'Dr. Vineet Batta',
  role: 'Founder',
  image:
    'https://balbharatiin.wordpress.com/wp-content/uploads/2025/07/whatsapp-image-2025-07-28-at-10.34.34-am1.jpeg',
  email: 'battavineet77@gmail.com',
  linkedin: 'https://www.linkedin.com/in/vineet-batta-2864934?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  education:
    'MBBS · MS (Trauma) · Dip Sports Med · FRCS (Orth) · MD (Ortho Research & Bio Med Eng.)',
  bio: 'Orthopaedic surgeon specialising in trauma, hip and knee replacement. Senior Clinical Fellow at Luton & Dunstable University NHS Hospital and Honorary Lecturer at the Royal National Orthopaedic Hospital, UCL. Award-winning researcher with over £90k in competitive grants.',
};

const groups: { title: string; members: Member[] }[] = [
  {
    title: 'Technical advisors',
    members: [
      { name: 'Dr. Malathy C', title: 'Professor, Networking & Communications', image: `${import.meta.env.BASE_URL}team/dr-malathy-c.png` },
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
      { name: 'Soumya', title: 'Core Team', image: 'team/soumya.png' },
      { name: 'Ramanathan', title: 'Technical Director', image: 'team/ramanathan.png' },
      { name: 'Mohammed Adan', title: 'Engineer', image: 'team/mohammed-adan.png' },
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

const collaborators: Member[] = [
  {
    "name": "Dr Andrew Kurmis",
    "country": "Australia",
    "email": "andrew_kurmis@hotmail.com",
    "institution": "A/Professor Andrew Kurmis",
    "linkedin": "https://www.linkedin.com/in/andrew-kurmis-07206b88/",
    "image": "team/collaborators/andrew-kurmis-ppt.png"
  },
  {
    "name": "Dr Douglas Chonko",
    "country": "USA",
    "email": "Douglas.Chonko@osumc.edu",
    "institution": "Ohio State University Wexner Medical Center",
    "linkedin": "https://www.linkedin.com/in/douglas-chonko-589a6824/",
    "image": "team/collaborators/douglas-chonko-ppt.png"
  },
  {
    "name": "Dr Glen Purnomo",
    "country": "Indonesia",
    "email": "glen.purnomo@yahoo.com",
    "institution": "Orthopaedic and traumatology",
    "linkedin": "https://www.linkedin.com/in/glen-purnomo-a2807115a/",
    "image": "team/collaborators/glen-purnomo-ppt.png"
  },
  {
    "name": "Dr Asep Santoso",
    "country": "Indonesia",
    "email": "glen.purnomo@yahoo.com",
    "institution": "OrthoTV",
    "linkedin": "https://www.linkedin.com/in/asep-santoso-aa524115/",
    "image": "team/collaborators/asep-santoso-ppt.png"
  },
  {
    "name": "Nguyen Quang Ton Quyen",
    "country": "Vietnam",
    "email": "glen.purnomo@yahoo.com",
    "institution": "Bệnh viện Đa khoa Tâm Anh",
    "linkedin": "https://www.linkedin.com/in/drqtnguyen/",
    "image": "team/collaborators/nguyen-quang-ton-quyen-ppt.png"
  },
  {
    "name": "Gianluca Cusmà Dovico Guatteri M.D",
    "country": "Bahrain",
    "email": "gcdg@me.com",
    "institution": "Burjeel, Abu Dhabi",
    "linkedin": "https://www.linkedin.com/in/gianluca-cusm%C3%A0-dovico-guatteri-a2943a40/",
    "image": "team/collaborators/gianluca-ppt.png"
  },
  {
    "name": "Dr Kartik Varadarajan",
    "country": "USA",
    "email": "mvkartik@gmail.com",
    "institution": "Kartik Varadarajan",
    "linkedin": "https://www.linkedin.com/in/kartikmv/",
    "image": "team/collaborators/kartik-varadarajan-ppt.png"
  },
  {
    "name": "Ryohei Takada",
    "country": "Japan",
    "email": "",
    "institution": "Tokyo Medical and Dental University Hospital · Google Scholar",
    "image": "team/collaborators/ryohei-takada-ppt.jpg"
  },
  {
    "name": "Maxim Horwitz",
    "country": "London, UK",
    "email": "maximhorwitz@gmail.com",
    "institution": "The Hand Doctor – Orthopaedic Hand and Wrist Surgeon",
    "linkedin": "https://www.linkedin.com/in/maxim-horwitz-59b38112/",
    "image": "team/collaborators/maxim-horwitz-ppt.png"
  },
  {
    "name": "Berisha Florent",
    "country": "Germany",
    "email": "Florent.Berisha@klsmartin.com",
    "institution": "KLS Martin Group",
    "linkedin": "https://www.linkedin.com/in/florent-berisha-06a786211/",
    "image": "team/collaborators/florent-berisha-ppt.png"
  },
  {
    "name": "Prof Sashin Ahuja",
    "country": "UK",
    "email": "sashinahuja@gmail.com",
    "institution": "Professor Sashin Ahuja",
    "linkedin": "https://www.linkedin.com/in/sashin-ahuja-a52bb835/",
    "image": "team/collaborators/sashin-ahuja-ppt.png"
  },
  {
    "name": "Manish Gupta",
    "country": "India",
    "email": "manishgupta1307@gmail.com",
    "institution": "",
    "linkedin": "https://www.linkedin.com/in/manish-gupta-7666a059/"
  },
  {
    "name": "Dr Srinath Kamineni",
    "country": "",
    "email": "srinathkamineni@gmail.com",
    "institution": ""
  }
];

const partners = [
  {
    name: 'National Joint Registry / NEC Software Solutions',
    location: 'United Kingdom',
    href: 'https://www.necsws.com',
    logo: `${import.meta.env.BASE_URL}team/nec-software-solutions.svg`,
  },
  {
    name: 'SRM Institute of Science and Technology',
    location: 'Chennai, India',
    href: 'https://www.srmist.edu.in',
    logo: 'https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/d77541e44be753901dc2a9ce403e7f52.jpg',
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
          src={member.image.startsWith('http') || member.image.startsWith('/') ? member.image : `${import.meta.env.BASE_URL}${member.image}`}
          alt={member.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top grayscale transition duration-700 ease-entrance hover:scale-[1.03] hover:grayscale-0"
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
      {member.country && <p className="t-small mt-1">{member.country}</p>}
      {member.institution && <p className="mt-2 text-xs text-graphite-600">{member.institution}</p>}
      {member.email && (
        <a href={`mailto:${member.email}`} className="mt-3 block break-all text-sm text-accent hover:underline">{member.email}</a>
      )}
      {member.linkedin && (
        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm text-accent hover:underline">
          <Linkedin className="h-4 w-4" aria-hidden /> LinkedIn
        </a>
      )}
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

            <a href={`mailto:${founder.email}`} className="mt-7 inline-block text-sm text-accent hover:underline">{founder.email}</a>
            <div className="mt-4 flex gap-2">
              <a
                href={`mailto:${founder.email}`}
                aria-label={`Email ${founder.name}`}
                className="flex h-10 w-10 items-center justify-center rounded border border-line text-graphite transition-colors hover:border-graphite-500 hover:text-ink"
              >
                <Mail className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={founder.linkedin}
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
    {groups.flatMap((group) => group.title === 'Core team' ? [group, { title: 'Collaborators', members: collaborators }] : [group]).map((group, gi) => (
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
