import React, { useState } from 'react';
import { UploadCloud, Brain, ShieldCheck, ArrowLeft, ExternalLink, FileText, Phone, ChevronRight } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────
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

// ── Confidence colour helper ──────────────────────────────────────────────────
const getConfidenceStyle = (c: number) => {
  if (c >= 0.85) return { bar: 'bg-green-500',  text: 'text-green-700',  bg: 'bg-green-50',  border: 'border-green-200',  label: 'High Confidence' };
  if (c >= 0.60) return { bar: 'bg-yellow-400', text: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200', label: 'Medium Confidence' };
  return              { bar: 'bg-red-400',    text: 'text-red-700',   bg: 'bg-red-50',   border: 'border-red-200',   label: 'Low Confidence' };
};

// ── Main Component ────────────────────────────────────────────────────────────
const HipModel = () => {
  const [file, setFile]             = useState<File | null>(null);
  const [result, setResult]         = useState<PredictionResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('http://127.0.0.1:8000/predict/hip', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err?.message || 'Prediction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setResult(null);
    setError(null);
    if (selected) setPreviewUrl(URL.createObjectURL(selected));
  };

  const confidencePct = result
    ? result.confidence_pct ?? `${(result.confidence * 100).toFixed(1)}%`
    : '0%';
  const cs   = result ? getConfidenceStyle(result.confidence) : null;
  const mfr  = result?.manufacturer ?? null;
  const top3 = result?.top3 ?? null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6 md:p-10">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto mb-8">
        <button
          onClick={() => { window.location.href = '/hip'; }}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition text-sm mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Hip Library
        </button>
        <h1 className="text-4xl font-bold text-gray-900 text-center">Hip Implant Identification</h1>
        <p className="text-center text-gray-500 mt-2 text-sm">
          Upload an AP or lateral hip X-ray — our AI identifies the implant and links you to the manufacturer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

        {/* ── LEFT: Upload ──────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-gray-800">Upload X-ray Image</h2>

          <label className="block w-full cursor-pointer">
            <div className="flex flex-col items-center justify-center gap-2 bg-gray-50 border-2 border-dashed border-gray-300 hover:border-orange-400 rounded-xl px-6 py-10 transition">
              <UploadCloud className="w-8 h-8 text-orange-400" />
              <span className="font-medium text-sm text-gray-600">Click to select hip X-ray image</span>
              <span className="text-xs text-gray-400">JPEG · PNG · max 10 MB</span>
            </div>
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>

          {previewUrl && (
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <img src={previewUrl} alt="X-ray preview" className="w-full max-h-72 object-contain bg-black" />
              {file && <p className="text-xs text-center text-gray-400 py-1 bg-gray-50">{file.name}</p>}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow hover:from-orange-600 hover:to-amber-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Brain className="w-5 h-5" />
            {loading ? 'Analysing...' : 'Predict Hip Implant'}
          </button>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              ⚠ {error}
            </div>
          )}

          <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-600 space-y-1">
            <p className="font-semibold text-gray-700 mb-2">Upload Guidelines</p>
            <p>• Clear AP or lateral hip X-rays work best</p>
            <p>• Ensure the full implant stem is visible in frame</p>
            <p>• Higher resolution images improve accuracy</p>
            <p>• Supported formats: JPEG, PNG</p>
          </div>
        </div>

        {/* ── RIGHT: Result ─────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-5">
          <h2 className="text-xl font-semibold text-gray-800">Prediction Result</h2>

          {/* Empty state */}
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center flex-1 text-center py-16">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-orange-300" />
              </div>
              <p className="text-base font-medium text-gray-500">Awaiting X-ray upload</p>
              <p className="text-sm mt-2 max-w-xs text-gray-400">
                Our AI identifies 40 hip implant types and links you directly to manufacturer brochures and product pages.
              </p>
            </div>
          )}

          {/* Result */}
          {result && cs && (
            <div className="flex flex-col gap-4">

              {/* Implant name */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                <p className="text-xs text-orange-500 font-semibold uppercase tracking-wide mb-1">Identified Implant</p>
                <h3 className="text-2xl font-bold text-orange-900 leading-tight">{result.prediction}</h3>
                {mfr && <p className="text-sm text-orange-600 mt-1 font-medium">{mfr.name}</p>}
              </div>

              {/* Confidence */}
              <div className={`${cs.bg} ${cs.border} border rounded-xl p-5`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Confidence Score</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${cs.bg} ${cs.text} ${cs.border}`}>
                    {cs.label}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-3xl font-bold ${cs.text}`}>{confidencePct}</span>
                  <ShieldCheck className={`w-6 h-6 ${cs.text}`} />
                </div>
                <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cs.bar} rounded-full`}
                    style={{ width: confidencePct, transition: 'width 0.8s ease' }}
                  />
                </div>
              </div>

              {/* Top 3 */}
              {top3 && top3.length > 0 && (
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                    Top 3 Predictions
                  </p>
                  {top3.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 px-4 py-3 ${i < top3.length - 1 ? 'border-b border-gray-50' : ''} ${i === 0 ? 'bg-orange-50/50' : ''}`}
                    >
                      <span className={`text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${i === 0 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                        {i + 1}
                      </span>
                      <span className="flex-1 text-sm text-gray-700 font-medium truncate">{item.implant}</span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-400 rounded-full" style={{ width: item.percentage }} />
                        </div>
                        <span className="text-xs text-gray-400 w-10 text-right">{item.percentage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* About */}
              {mfr?.about_implant && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-amber-800 mb-1">About this Implant</p>
                  <p className="leading-relaxed text-amber-700">{mfr.about_implant}</p>
                </div>
              )}

              {/* Manufacturer buttons */}
              {mfr && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Manufacturer Resources — {mfr.name}
                  </p>
                  {mfr.product_page && (
                    <a href={mfr.product_page} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition font-medium text-sm">
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1">View Official Product Page</span>
                      <ChevronRight className="w-4 h-4 opacity-60" />
                    </a>
                  )}
                  {mfr.brochure_url && (
                    <a href={mfr.brochure_url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 bg-white border border-orange-200 hover:bg-orange-50 text-orange-700 rounded-xl transition font-medium text-sm">
                      <FileText className="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1">Download Product Brochure (PDF)</span>
                      <ChevronRight className="w-4 h-4 opacity-40" />
                    </a>
                  )}
                  {mfr.surgical_technique_url && (
                    <a href={mfr.surgical_technique_url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 bg-white border border-amber-200 hover:bg-amber-50 text-amber-700 rounded-xl transition font-medium text-sm">
                      <FileText className="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1">Surgical Technique Guide (PDF)</span>
                      <ChevronRight className="w-4 h-4 opacity-40" />
                    </a>
                  )}
                  {mfr.contact_url && (
                    <a href={mfr.contact_url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl transition font-medium text-sm">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1">Contact {mfr.name}</span>
                      <ChevronRight className="w-4 h-4 opacity-40" />
                    </a>
                  )}
                </div>
              )}

              {/* Fallback */}
              {!mfr && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Next Steps</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• View detailed specifications in the implant library</li>
                    <li>• Compare with similar hip implant models</li>
                    <li>• Access surgical technique guides</li>
                    <li>• Review compatibility information</li>
                  </ul>
                </div>
              )}

              <p className="text-xs text-gray-400 leading-relaxed pt-1">
                ⚕ This AI prediction assists in implant identification only. Final verification must be performed by a qualified medical professional.
                {result.predicted_at && <> Predicted at {new Date(result.predicted_at).toLocaleString()}.</>}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Loading Overlay ──────────────────────────────────────────────────── */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-100 border-t-orange-500 mx-auto mb-4" />
            <p className="text-gray-800 font-semibold">Analysing X-ray...</p>
            <p className="text-sm text-gray-500 mt-1">Running InceptionV3 inference</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HipModel;
