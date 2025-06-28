import React from 'react';
import { FileImage, Scan } from 'lucide-react';
import { Link } from 'react-router-dom';

const ImplantIdentification = () => {
  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 to-indigo-100 px-4 pt-4 pb-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Implant Identification System
          </h1>
          <p className="text-gray-600 text-lg">
            Professional medical imaging reference library for accurate implant identification.
            Choose your imaging modality to access comprehensive implant databases.
          </p>
        </div>

        {/* Library Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* X-Ray Library */}
          <Link to="/xray" className="transition-transform transform hover:scale-105">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
              <div className="bg-gray-900 h-56 flex items-center justify-center">
                <FileImage className="h-20 w-20 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">X-ray Library</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Access comprehensive X-ray imaging database with 11 specialized implant categories including hip, knee, shoulder, and more orthopedic devices.
                </p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Hip</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Knee</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Shoulder</span>
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full">+8 more</span>
                </div>
              </div>
            </div>
          </Link>

          {/* CT Scan Library */}
          <Link to="/ct" className="transition-transform transform hover:scale-105">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
              <div className="bg-green-800 h-56 flex items-center justify-center">
                <Scan className="h-20 w-20 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">CT Scan Library</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Explore detailed CT scan imaging database featuring high-resolution cross-sectional views of major joint implants and prosthetic devices.
                </p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">Hip</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">Knee</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">Shoulder</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImplantIdentification;
