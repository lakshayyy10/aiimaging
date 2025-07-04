import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const implantList = [
  'Stryker Exeter',
  'Stryker Accolade II',
  'Smith and Nephew POLAR CUP',
  'Depuy Trilock',
  'Depuy SROM',
  'Depuy Corail',
  'Depuy Charnley',
  'Biomet-Arcos',
  'Biomet - Taperloc',
  'Biomet - Echo Biometric',
  'Aesculap Bicontact'
];

const Hip = () => {
  const handleModelNavigation = () => {
    console.log('Launching AI Model...');
  };
  
  const handleCardClick = (implantName) => {
    console.log(`Navigating to ${implantName}`);
  };

  const handleBackToMain = () => {
    console.log('Back to Main');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={handleBackToMain}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Main
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Hip Implant Library</h1>
            <p className="text-gray-600">Browse hip implant X-ray images, 3D models, and specifications</p>
          </div>
        </div>

        {/* AI Model Launch Section */}
        <div className="mb-12 text-center">
          <div className="bg-white rounded-3xl p-8 shadow-lg max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-8">
              {/* Animated Hip Joint Illustration */}
              <div className="relative">
                <div className="w-64 h-64 relative">
                  {/* Animated Hip Joint */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Pelvis */}
                      <div className="w-32 h-20 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-full relative animate-pulse">
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-500 rounded-full"></div>
                      </div>
                      
                      {/* Femur */}
                      <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                        <div className="w-6 h-24 bg-gradient-to-b from-gray-400 to-gray-500 rounded-b-lg animate-pulse"></div>
                        <div className="absolute top-0 -left-2 w-10 h-10 bg-gray-500 rounded-full"></div>
                      </div>
                      
                      {/* Implant Highlight */}
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-16 h-16 border-4 border-blue-500 rounded-full animate-ping opacity-75"></div>
                      
                      {/* AI Scanning Lines */}
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
                        <div className="absolute top-8 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
                        <div className="absolute top-16 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating AI Elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute top-1/2 right-2 w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
              
              {/* Text Content */}
              <div className="text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Identify your hip implant with our AI technology
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Upload your X-ray image and let our advanced AI model identify the implant type, manufacturer, and specifications instantly.
                </p>
                <button
                  onClick={handleModelNavigation}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                >
                  <span>Launch AI Model</span>
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hip Implant Library Grid */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Hip Implant Library</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {implantList.map((implant, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-blue-300 group"
                onClick={() => handleCardClick(implant)}
              >
                <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-sm"></div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {implant}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  View X-rays, specs, and 3D models
                </p>
                <div className="flex space-x-2">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    X-ray
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    3D
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    Specs
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hip;
