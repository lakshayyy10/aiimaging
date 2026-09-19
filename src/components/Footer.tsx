import { Link } from 'react-router-dom';
import { Linkedin, Mail } from 'lucide-react';
import { Container, Wordmark } from './ui';

const columns: { title: string; links: { name: string; href: string }[] }[] = [
  {
    title: 'Platform',
    links: [
      { name: 'Implant identification', href: '/implant-identification' },
      { name: 'X-ray library', href: '/xray-library' },
      { name: 'Implant library', href: '/implant-library' },
    ],
  },
  {
    title: 'Regions',
    links: [
      { name: 'Knee', href: '/xray/knee' },
      { name: 'Hip', href: '/xray/hip' },
      { name: 'Shoulder', href: '/xray/shoulder' },
      { name: 'Wrist', href: '/xray/wrist' },
    ],
  },
  {
    title: 'Organisation',
    links: [
      { name: 'Research publications', href: '/research' },
      { name: 'Team & collaborators', href: '/team' },
    ],
  },
];

const Footer = () => (
  <footer className="on-ink relative overflow-hidden border-t border-white/10">
    <div aria-hidden className="rule-accent absolute inset-x-0 top-0 h-px" />
    <div aria-hidden className="ink-wash pointer-events-none absolute inset-0" />
    <Container className="relative">
      <div className="grid gap-x-12 gap-y-14 py-[var(--section-y-tight)] lg:grid-cols-12">
        {/* Identity */}
        <div className="lg:col-span-4">
          <Wordmark tone="paper" />
          <p className="t-body mt-6 max-w-sm">
            Automated identification and analysis of orthopaedic implants visible on
            radiographic images — built with surgeons, validated in peer-reviewed research.
          </p>
          <div className="mt-8 flex gap-2">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded border border-white/15 text-[#A7B2C4] transition-colors hover:border-accent-300/60 hover:bg-accent/10 hover:text-accent-300"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="mailto:vineet.batta@unicornmedics.com"
              aria-label="Email AIIMAGING"
              className="flex h-10 w-10 items-center justify-center rounded border border-white/15 text-[#A7B2C4] transition-colors hover:border-accent-300/60 hover:bg-accent/10 hover:text-accent-300"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="t-label text-[#7E8A9C]">{col.title}</h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-[#A7B2C4] transition-colors hover:text-accent-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Legal */}
      <div className="flex flex-col gap-4 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-small">
          © {new Date().getFullYear()} AIIMAGING. All rights reserved.
        </p>
        <p className="t-small max-w-md sm:text-right">
          For research and clinical decision support. Final implant verification must be
          performed by a qualified medical professional.
        </p>
      </div>
    </Container>
  </footer>
);

export default Footer;
