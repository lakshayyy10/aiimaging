import React from 'react';
import { ArrowRight } from 'lucide-react';

const ImplantIdentification: React.FC = () => {
  const handleNavigate = (section: 'xray' | 'ct') => {
    console.log(`Navigating to ${section} section`);
    // Add your navigation logic here
    // For example: navigate(`/implant-identification/${section}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="text-center pt-16 pb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Implant Identification System
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Professional medical imaging reference library for accurate implant identification. 
          Choose your imaging modality to access comprehensive implant databases.
        </p>
      </div>

      {/* Main Options */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* X-ray Option */}
          <div 
            onClick={() => handleNavigate('xray')}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl 
                       transition-all duration-500 ease-out hover:scale-105 overflow-hidden
                       border border-gray-100 hover:border-blue-200"
          >
            <div className="relative h-80 bg-gradient-to-br from-gray-900 to-gray-700 overflow-hidden">
              {/* Medical X-ray Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-8 left-8 w-32 h-32 border-2 border-white rounded-full"></div>
                <div className="absolute top-16 right-12 w-24 h-24 border border-white rounded-lg rotate-45"></div>
                <div className="absolute bottom-12 left-16 w-20 h-20 border border-white rounded-full"></div>
                <div className="absolute bottom-8 right-8 w-16 h-16 border-2 border-white"></div>
              </div>
              
              {/* X-ray Image Simulation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Hip Joint X-ray Simulation */}
                  <div className="w-48 h-48 relative">
                    <div className="absolute inset-0 bg-white opacity-90 rounded-full"></div>
                    <div className="absolute top-8 left-8 w-32 h-32 bg-gray-300 rounded-full opacity-80"></div>
                    <div className="absolute top-12 left-12 w-24 h-24 bg-white rounded-full"></div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-20 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  X-ray Library
                </h2>
                <ArrowRight className="w-8 h-8 text-blue-600 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Access comprehensive X-ray imaging database with 11 specialized implant categories 
                including hip, knee, shoulder, and more orthopedic devices.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">Hip</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">Knee</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">Shoulder</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">+8 more</span>
              </div>
            </div>
          </div>

          {/* CT Scan Option */}
          <div 
            onClick={() => handleNavigate('ct')}
            className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl 
                       transition-all duration-500 ease-out hover:scale-105 overflow-hidden
                       border border-gray-100 hover:border-green-200"
          >
            <div className="relative h-80 bg-gradient-to-br from-green-900 to-teal-700 overflow-hidden">
              {/* Medical CT Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 w-40 h-40 border border-white rounded-full"></div>
                <div className="absolute top-8 left-8 w-32 h-32 border border-white rounded-full"></div>
                <div className="absolute top-12 left-12 w-24 h-24 border border-white rounded-full"></div>
                <div className="absolute top-16 left-16 w-16 h-16 border-2 border-white rounded-full"></div>
              </div>
              
              {/* CT Scan Image Simulation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* CT Cross-section Simulation */}
                  <div className="w-48 h-48 relative">
                    <div className="absolute inset-0 bg-white opacity-90 rounded-full"></div>
                    <div className="absolute top-4 left-4 w-40 h-40 bg-gray-200 rounded-full opacity-80"></div>
                    <div className="absolute top-8 left-8 w-32 h-32 bg-gray-300 rounded-full opacity-70"></div>
                    <div className="absolute top-12 left-12 w-24 h-24 bg-white rounded-full"></div>
                    <div className="absolute top-16 left-16 w-16 h-16 bg-gray-400 rounded-full"></div>
                    {/* Cross lines */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-400 opacity-50"></div>
                    <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gray-400 opacity-50"></div>
                  </div>
                </div>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                  CT Scan Library
                </h2>
                <ArrowRight className="w-8 h-8 text-green-600 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Explore detailed CT scan imaging database featuring high-resolution cross-sectional 
                views of major joint implants and prosthetic devices.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Hip</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Knee</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Shoulder</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Section */}
    </div>
  );
};

export default ImplantIdentification;
