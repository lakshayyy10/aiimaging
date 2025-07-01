import React from "react";
import { ArrowLeft, ArrowRight, Eye } from "lucide-react";

const parts = [
  { 
    name: "Hip", 
    color: "bg-indigo-100",
    hoverColor: "hover:bg-indigo-200",
    borderColor: "border-indigo-300",
    textColor: "text-indigo-800",
    to: "/xray/hip",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format",
    description: "Total hip replacements, hip resurfacing, and acetabular components",
    count: "45 implants"
  },
  { 
    name: "Knee", 
    color: "bg-purple-100",
    hoverColor: "hover:bg-purple-200", 
    borderColor: "border-purple-300",
    textColor: "text-purple-800",
    to: "/xray/knee",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&auto=format",
    description: "Total knee replacements, unicondylar, and patellofemoral implants",
    count: "52 implants"
  },
  { 
    name: "Shoulder", 
    color: "bg-pink-100",
    hoverColor: "hover:bg-pink-200",
    borderColor: "border-pink-300", 
    textColor: "text-pink-800",
    to: "/xray/shoulder",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop&auto=format",
    description: "Total shoulder, reverse shoulder, and hemiarthroplasty implants",
    count: "29 implants"
  },
  {
    name: "Spine",
    color: "bg-green-100",
    hoverColor: "hover:bg-green-200",
    borderColor: "border-green-300",
    textColor: "text-green-800", 
    to: "/xray/spine",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop&auto=format",
    description: "Pedicle screws, rods, cages, and spinal fusion hardware",
    count: "34 implants"
  },
  {
    name: "Ankle",
    color: "bg-blue-100",
    hoverColor: "hover:bg-blue-200",
    borderColor: "border-blue-300",
    textColor: "text-blue-800",
    to: "/xray/ankle", 
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format",
    description: "Total ankle replacements and ankle fusion hardware",
    count: "18 implants"
  },
  {
    name: "Wrist",
    color: "bg-yellow-100",
    hoverColor: "hover:bg-yellow-200",
    borderColor: "border-yellow-300", 
    textColor: "text-yellow-800",
    to: "/xray/wrist",
    image: "https://images.unsplash.com/photo-1576669801820-2dd1c7a7e4f1?w=400&h=300&fit=crop&auto=format", 
    description: "Wrist fusion plates, screws, and joint replacement implants",
    count: "15 implants"
  }
];

const XrayLibrary = () => {
  const handleNavigate = (to) => {
    console.log(`Navigating to ${to}`);
    // Add your navigation logic here
    // navigate(to);
  };

  const handleBack = () => {
    console.log('Navigating back to main page');
    // Add navigation logic to go back
    // navigate('/implant-identification');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="font-medium">Back to Main</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">X-ray Implant Library</h1>
                <p className="text-gray-600 mt-1">Select an implant category to browse X-ray images</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">193</div>
                <div className="text-gray-500">Total Implants</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">6</div>
                <div className="text-gray-500">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {parts.map((part) => (
            <div
              key={part.name}
              className={`group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-2xl 
                         transition-all duration-500 ease-out hover:scale-105 overflow-hidden
                         border-2 ${part.borderColor} ${part.hoverColor}`}
              onClick={() => handleNavigate(part.to)}
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={part.image}
                  alt={`${part.name} X-ray implant`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* X-ray Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Medical Grid Overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full" style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>
                
                {/* View Icon */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                
                {/* Count Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {part.count}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className={`p-6 ${part.color}`}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className={`text-2xl font-bold ${part.textColor} group-hover:text-opacity-80 transition-colors duration-300`}>
                    {part.name} Implants
                  </h2>
                  <ArrowRight className={`w-6 h-6 ${part.textColor} group-hover:translate-x-2 transition-transform duration-300`} />
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {part.description}
                </p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-white/60 text-gray-700 text-xs font-medium rounded-md">
                    X-ray Images
                  </span>
                  <span className="px-2 py-1 bg-white/60 text-gray-700 text-xs font-medium rounded-md">
                    3D Models
                  </span>
                  <span className="px-2 py-1 bg-white/60 text-gray-700 text-xs font-medium rounded-md">
                    Specifications
                  </span>
                </div>
                
                {/* Action Button */}
                <button className={`w-full ${part.textColor} font-semibold py-3 px-4 rounded-lg 
                                   bg-white/80 hover:bg-white transition-all duration-200
                                   flex items-center justify-center space-x-2 group-hover:shadow-md`}>
                  <span>Browse {part.name} Implants</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Professional Medical Imaging Database
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our comprehensive X-ray library contains high-quality radiographic images of orthopedic implants 
              from leading manufacturers. Each image is professionally annotated with key identifying features, 
              manufacturer information, and technical specifications to assist in accurate implant identification.
            </p>
            <div className="flex justify-center items-center space-x-8 mt-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Regularly Updated</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Professional Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Detailed Annotations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XrayLibrary;
