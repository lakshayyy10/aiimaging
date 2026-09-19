import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Loader2,
  Phone,
  UploadCloud,
  X,
} from 'lucide-react';
import {
  Button,
  Container,
  Eyebrow,
  PageHeader,
} from './ui';
import { cx } from '../lib/cx';
import { regionBySlug } from '../data/regions';

/* Shared identification tool. One implementation for every region, preserving
   the enriched API contract (ranked alternatives + manufacturer resources) and
   degrading cleanly to the minimal {prediction, confidence} response. */

interface Top3Item {
  implant: string;
  confidence: number;
  percentage: string;
}

interface ManufacturerInfo {
  name: string;
  about_implant: string;
  product_page: string | null;
  brochure_url: string | null;
  surgical_technique_url: string | null;
  logo_url: string | null;
  contact_url: string | null;
}

interface PredictionResult {
  prediction: string;
  confidence: number;
  confidence_pct?: string;
  top3?: Top3Item[];
  manufacturer?: ManufacturerInfo;
  predicted_at?: string;
}

const MAX_BYTES = 10 * 1024 * 1024;

const confidenceBand = (c: number) =>
  c >= 0.85
    ? { label: 'High confidence', text: 'text-signal-high', bar: 'bg-signal-high' }
    : c >= 0.6
      ? { label: 'Medium confidence', text: 'text-signal-med', bar: 'bg-signal-med' }
      : { label: 'Low confidence', text: 'text-signal-low', bar: 'bg-signal-low' };

const ResourceLink = ({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: typeof FileText;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 border-b border-line py-3.5 text-sm text-ink transition-colors hover:text-accent"
  >
    <Icon className="h-4 w-4 shrink-0 text-graphite-500" aria-hidden />
    <span className="flex-1">{children}</span>
    <ChevronRight className="h-4 w-4 shrink-0 text-graphite-500" aria-hidden />
  </a>
);

const IdentifyTool = ({ slug }: { slug: string }) => {
  const region = regionBySlug(slug);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Revoke the object URL whenever it is replaced or the page unmounts.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const accept = useCallback((selected: File | null) => {
    setResult(null);
    setError(null);
    if (!selected) return;
    if (!selected.type.startsWith('image/')) {
      setError('Please select an image file (JPEG or PNG).');
      return;
    }
    if (selected.size > MAX_BYTES) {
      setError('That image is larger than 10 MB. Please use a smaller file.');
      return;
    }
    setFile(selected);
    setPreviewUrl((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(selected);
    });
  }, []);

  const reset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setPreviewUrl((old) => {
      if (old) URL.revokeObjectURL(old);
      return null;
    });
    if (inputRef.current) inputRef.current.value = '';
  };

  if (!region?.endpoint) {
    return (
      <Container>
        <div className="py-24">
          <h1 className="t-h2">Identification model unavailable</h1>
          <p className="t-lead mt-4">
            <Link to="/xray-library" className="link-underline">
              Return to the X-ray library
            </Link>
          </p>
        </div>
      </Container>
    );
  }

  const submit = async () => {
    if (!file) return;
    const body = new FormData();
    body.append('file', file);
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(region.endpoint!, { method: 'POST', body });
      if (!res.ok) throw new Error(`The prediction service responded with ${res.status}.`);
      setResult(await res.json());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Prediction failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const band = result ? confidenceBand(result.confidence) : null;
  const pct = result
    ? (result.confidence_pct ?? `${(result.confidence * 100).toFixed(1)}%`)
    : '0%';
  const mfr = result?.manufacturer ?? null;
  const top3 = result?.top3 ?? null;
  const lower = region.name.toLowerCase();

  return (
    <>
      <PageHeader
        eyebrow={
          <Link
            to={region.path}
            className="inline-flex items-center gap-1.5 text-accent transition-colors hover:text-accent-700"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden />
            {region.name} library
          </Link>
        }
        title={`${region.name} implant identification`}
        lead={`Upload an AP or lateral ${lower} radiograph. The model returns the most likely implant make and model, with ranked alternatives and manufacturer documentation.`}
      />

      <section className="bg-paper py-[var(--section-y-tight)]">
        <Container>
          <div className="grid gap-x-12 gap-y-12 lg:grid-cols-2">
            {/* ---------------- Upload ---------------- */}
            <div>
              <Eyebrow>Step 1 — Upload</Eyebrow>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  accept(e.dataTransfer.files?.[0] ?? null);
                }}
                className="mt-6"
              >
                {!previewUrl ? (
                  <label
                    className={cx(
                      'flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed px-6 py-16 text-center transition-colors',
                      dragging
                        ? 'border-accent bg-accent-50'
                        : 'border-line-strong bg-white hover:border-graphite-500'
                    )}
                  >
                    <UploadCloud className="h-6 w-6 text-graphite-500" aria-hidden />
                    <span className="mt-4 text-sm font-medium text-ink">
                      Drop a radiograph, or browse
                    </span>
                    <span className="t-label mt-2 text-graphite-500">
                      JPEG or PNG · max 10 MB
                    </span>
                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => accept(e.target.files?.[0] ?? null)}
                    />
                  </label>
                ) : (
                  <figure className="overflow-hidden rounded-lg border border-line">
                    <div className="xray-plate relative">
                      <img
                        src={previewUrl}
                        alt="Selected radiograph preview"
                        className="mx-auto max-h-[22rem] w-full object-contain p-4"
                      />
                      <button
                        type="button"
                        onClick={reset}
                        aria-label="Remove image"
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded border border-white/20 bg-ink/70 text-paper-50 transition-colors hover:bg-ink"
                      >
                        <X className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                    <figcaption className="truncate border-t border-line bg-white px-4 py-3 text-xs text-graphite-600">
                      {file?.name}
                    </figcaption>
                  </figure>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={submit} disabled={!file || loading} size="lg">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                  {loading ? 'Analysing…' : `Identify ${lower} implant`}
                </Button>
                {file && !loading && (
                  <Button variant="secondary" size="lg" onClick={reset}>
                    Clear
                  </Button>
                )}
              </div>

              {error && (
                <p
                  role="alert"
                  className="mt-5 border-l-2 border-signal-low bg-white px-4 py-3 text-sm text-signal-low"
                >
                  {error}
                </p>
              )}

              <div className="mt-10 border-t border-line pt-6">
                <h2 className="t-label text-graphite-500">Upload guidance</h2>
                <ul className="mt-4 space-y-2.5">
                  {[
                    `Clear AP or lateral ${lower} radiographs work best.`,
                    'Ensure the full implant is visible within the frame.',
                    'Higher resolution images improve accuracy.',
                    'Supported formats: JPEG and PNG.',
                  ].map((tip) => (
                    <li key={tip} className="flex gap-3 text-sm text-graphite">
                      <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-line-strong" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ---------------- Result ---------------- */}
            <div aria-live="polite">
              <Eyebrow>Step 2 — Result</Eyebrow>

              {!result && (
                <div className="mt-6 flex min-h-[18rem] flex-col justify-center rounded-lg border border-line bg-white px-8 py-12">
                  <p className="t-h3 text-graphite-500">
                    {loading ? 'Running inference…' : 'Awaiting a radiograph'}
                  </p>
                  <p className="t-small mt-3 max-w-sm">
                    {loading
                      ? 'This can take a few moments on first request while the service wakes.'
                      : `Results appear here once an image is analysed — including ranked alternatives across the ${region.implants.length} catalogued ${lower} implants.`}
                  </p>
                </div>
              )}

              {result && band && (
                <div className="edge-accent mt-6 animate-reveal-up rounded-lg border border-line bg-white">
                  {/* Headline result */}
                  <div className="border-b border-line bg-tint px-7 py-7">
                    <p className="t-label text-accent">Identified implant</p>
                    <h2 className="t-h2 mt-3">{result.prediction}</h2>
                    {mfr && <p className="t-small mt-2">{mfr.name}</p>}
                  </div>

                  {/* Confidence */}
                  <div className="border-b border-line px-7 py-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="t-label text-graphite-500">Confidence</p>
                      <p className={cx('t-label', band.text)}>{band.label}</p>
                    </div>
                    <p className="mt-3 font-display text-[2.5rem] leading-none tracking-[-0.03em]">
                      {pct}
                    </p>
                    <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-paper-200">
                      <div
                        className={cx('h-full rounded-full transition-[width] duration-700 ease-entrance', band.bar)}
                        style={{ width: pct }}
                      />
                    </div>
                  </div>

                  {/* Ranked alternatives */}
                  {top3 && top3.length > 0 && (
                    <div className="border-b border-line px-7 py-6">
                      <p className="t-label text-graphite-500">Ranked candidates</p>
                      <ol className="mt-4">
                        {top3.map((item, i) => (
                          <li
                            key={item.implant}
                            className="flex items-center gap-4 border-b border-line py-3 last:border-0"
                          >
                            <span className="t-label w-5 shrink-0 text-graphite-500">
                              {i + 1}
                            </span>
                            <span className="flex-1 truncate text-sm text-ink">
                              {item.implant}
                            </span>
                            <span className="h-1 w-16 shrink-0 overflow-hidden rounded-full bg-paper-200">
                              <span
                                className="block h-full rounded-full bg-accent"
                                style={{ width: item.percentage }}
                              />
                            </span>
                            <span className="w-12 shrink-0 text-right font-mono text-xs text-graphite-600">
                              {item.percentage}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* About */}
                  {mfr?.about_implant && (
                    <div className="border-b border-line px-7 py-6">
                      <p className="t-label text-graphite-500">About this implant</p>
                      <p className="t-body mt-3">{mfr.about_implant}</p>
                    </div>
                  )}

                  {/* Manufacturer resources */}
                  {mfr && (
                    <div className="border-b border-line px-7 py-6">
                      <p className="t-label text-graphite-500">
                        Manufacturer resources — {mfr.name}
                      </p>
                      <div className="mt-2">
                        {mfr.product_page && (
                          <ResourceLink href={mfr.product_page} icon={ExternalLink}>
                            Official product page
                          </ResourceLink>
                        )}
                        {mfr.brochure_url && (
                          <ResourceLink href={mfr.brochure_url} icon={FileText}>
                            Product brochure (PDF)
                          </ResourceLink>
                        )}
                        {mfr.surgical_technique_url && (
                          <ResourceLink href={mfr.surgical_technique_url} icon={FileText}>
                            Surgical technique guide (PDF)
                          </ResourceLink>
                        )}
                        {mfr.contact_url && (
                          <ResourceLink href={mfr.contact_url} icon={Phone}>
                            Contact {mfr.name}
                          </ResourceLink>
                        )}
                      </div>
                    </div>
                  )}

                  {!mfr && (
                    <div className="border-b border-line px-7 py-6">
                      <p className="t-label text-graphite-500">Next steps</p>
                      <ul className="mt-4 space-y-2.5">
                        {[
                          `Compare against the ${region.name.toLowerCase()} reference library.`,
                          'Review similar models before confirming.',
                          'Consult the surgical technique guide for the confirmed implant.',
                        ].map((s) => (
                          <li key={s} className="flex gap-3 text-sm text-graphite">
                            <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-line-strong" />
                            {s}
                          </li>
                        ))}
                      </ul>
                      <Link to={region.path} className="link-underline mt-5 inline-block text-sm">
                        Open the {lower} library
                      </Link>
                    </div>
                  )}

                  <p className="px-7 py-5 text-xs leading-relaxed text-graphite-500">
                    This prediction assists implant identification only. Final verification
                    must be performed by a qualified medical professional.
                    {result.predicted_at &&
                      ` Predicted ${new Date(result.predicted_at).toLocaleString()}.`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default IdentifyTool;
