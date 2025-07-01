import React from "react";
import { useNavigate } from "react-router-dom";

const parts = [
  { name: "Hip", color: "bg-indigo-100", to: "/xray/hip" },
  { name: "Knee", color: "bg-purple-100", to: "/xray/knee" },
  { name: "Shoulder", color: "bg-pink-100", to: "/xray/shoulder" },
  // Add more as needed
];

const XrayLibrary = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-6">Select an Implant Type</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {parts.map((part) => (
          <div
            key={part.name}
            className={`rounded-xl p-6 shadow hover:shadow-xl transition cursor-pointer ${part.color}`}
            onClick={() => navigate(part.to)}
          >
            <h2 className="text-xl font-semibold mb-2">{part.name}</h2>
            <p className="text-sm text-gray-600">
              View and identify X-ray implants for the {part.name.toLowerCase()}.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default XrayLibrary;
