import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const implantList = [
  'Depuy Bias',
  'Depuy total modular wrist system',
  'Fischer Medical Universal 2',
  'Pyrodisk',
  'RCPI',
  'Swemac Motec',
  'Tornier-Bioprofile Amandys',
  'Tornier-Bioprofile APSI',
  'Tornier-Bioprofile Eclypse',
  'Wright Medical-Tornier STPI',
  'Zimmer Biomet Maestro'
];
const Wrist = () => {
const navigate = useNavigate(); // ✅ Add this line

const handleModelNavigation = () => {
  console.log('Launching AI Model...');
  navigate('/wrist-model');
};

const handleCardClick = (implantName) => {
  console.log(`Navigating to ${implantName}`);
  const implantRoute = implantName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  navigate(`/${implantRoute}`);
};

const handleBackToMain = () => {
  console.log('Back to Main');
  navigate('/');
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Wrist Implant Library</h1>
            <p className="text-gray-600">Browse wrist implant X-ray images, 3D models, and specifications</p>
          </div>
        </div>

        {/* AI Model Launch Section */}
        <div className="mb-12 text-center">
          <div className="bg-white rounded-3xl p-8 shadow-lg max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-8">
              {/* Animated Wrist Joint Illustration */}
              <div className="relative">
                <div className="w-64 h-64 relative">
                  {/* Animated Wrist Joint */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Forearm bones (Radius and Ulna) */}
                      <div className="flex space-x-2">
                        <div className="w-5 h-24 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-lg animate-pulse"></div>
                        <div className="w-4 h-24 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-lg animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      
                      {/* Wrist bones (Carpal bones) */}
                      <div className="absolute top-20 left-0 grid grid-cols-2 gap-1">
                        <div className="w-3 h-3 bg-gray-400 rounded-sm animate-pulse" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-3 h-3 bg-gray-400 rounded-sm animate-pulse" style={{animationDelay: '0.3s'}}></div>
                        <div className="w-3 h-3 bg-gray-400 rounded-sm animate-pulse" style={{animationDelay: '0.5s'}}></div>
                        <div className="w-3 h-3 bg-gray-400 rounded-sm animate-pulse" style={{animationDelay: '0.7s'}}></div>
                      </div>
                      
                      {/* Metacarpal bones */}
                      <div className="absolute top-28 left-0 flex space-x-1">
                        <div className="w-2 h-12 bg-gradient-to-b from-gray-400 to-gray-500 rounded-b-lg animate-pulse"></div>
                        <div className="w-2 h-12 bg-gradient-to-b from-gray-400 to-gray-500 rounded-b-lg animate-pulse" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-12 bg-gradient-to-b from-gray-400 to-gray-500 rounded-b-lg animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-12 bg-gradient-to-b from-gray-400 to-gray-500 rounded-b-lg animate-pulse" style={{animationDelay: '0.3s'}}></div>
                      </div>
                      
                      {/* Implant Highlight */}
                      <div className="absolute top-18 left-1/2 transform -translate-x-1/2 w-12 h-8 border-4 border-blue-500 rounded-lg animate-ping opacity-75"></div>
                      
                      {/* AI Scanning Lines */}
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
                        <div className="absolute top-6 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
                        <div className="absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
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
                  Identify your wrist implant with our AI technology
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Upload your X-ray image and let our advanced AI model identify the implant type, manufacturer, and specifications instantly.
                </p>
                <button
                  onClick={handleModelNavigation}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                >
                  <span>Identify your implant</span>
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Wrist Implant Library Grid */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Wrist Implant Library</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {implantList.map((implant, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-blue-300 group"
                onClick={() => handleCardClick(implant)}
              >
                <div className="aspect-square bg-gradient-to-br from-green-50 to-blue-50 rounded-xl mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-8 h-4 bg-green-600 rounded-md"></div>
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

export default Wrist;
