import React, { useState } from 'react';
import { UploadCloud, Brain, ShieldCheck } from 'lucide-react';

const Shoulder = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ prediction: string; confidence: number } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    const res = await fetch('https://aiimaging-1.onrender.com/predict/', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setResult(null);
    if (selected) {
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">Shoulder Implant Identification</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* LEFT: Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload X-ray Image</h2>
          <label className="block w-full">
            <div className="flex items-center justify-center gap-3 bg-gray-100 border-2 border-dashed border-gray-300 hover:border-blue-400 text-gray-700 rounded-lg px-6 py-10 cursor-pointer transition duration-200">
              <UploadCloud className="w-6 h-6" />
              <span className="font-medium text-sm">Click to select image</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {previewUrl && (
            <div className="mt-6">
              <img
                src={previewUrl}
                alt="Selected"
                className="w-full max-h-96 object-contain rounded-lg shadow"
              />
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
            >
              <Brain className="w-5 h-5" />
              {loading ? 'Analyzing...' : 'Predict Implant'}
            </button>
          </div>
        </div>

        {/* RIGHT: Prediction Result */}
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Prediction Result</h2>

          {!result && (
            <div className="text-gray-500 text-center mt-8">
              <p className="text-lg">Prediction result will appear here after upload.</p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-inner">
                <p className="text-sm text-gray-500">Predicted Implant</p>
                <h3 className="text-3xl font-bold text-blue-800 mt-1">{result.prediction}</h3>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 shadow-inner">
                <p className="text-sm text-gray-500">Confidence Score</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-2xl font-bold text-green-700">{(result.confidence * 100).toFixed(2)}%</span>
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                </div>
              </div>

              <p className="text-sm text-gray-400 mt-6">
                Note: This AI prediction assists identification. Final verification should be clinical.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shoulder;
