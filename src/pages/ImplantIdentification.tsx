import React from 'react';
import { FileImage, Scan } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Upload, Play, ArrowRight, CheckCircle, AlertCircle, Users, Settings, Zap, Shield } from 'lucide-react';// Ensure you're using React Router

const ImplantIdentification = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Implant Identification System
          </h1>
          <p className="text-gray-600 text-lg italic">
            "See Our Technology in Action"
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          
          {/* X-Ray Section */}
          <Link to="/xray">
            <div 
              className="
                relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 
                cursor-pointer transform hover:scale-105 border-2 overflow-hidden border-gray-200 hover:border-blue-300
              "
            >
              <div className="aspect-[4/3] relative">
                <img 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="X-Ray Medical Imaging"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-4">
                    <FileImage size={48} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-center">X-Ray Analysis</h2>
                  <p className="text-gray-200 text-center text-sm">
                    Advanced imaging for implant identification
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* CT Scan Section */}
          <Link to="/ct">
            <div 
              className="
                relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 
                cursor-pointer transform hover:scale-105 border-2 overflow-hidden border-gray-200 hover:border-green-300
              "
            >
              <div className="aspect-[4/3] relative">
                <img 
                  src="https://images.unsplash.com/photo-1616012480717-fd9867059ca0?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="CT Scan Medical Imaging"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-4">
                    <Scan size={48} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-center">CT Scan Analysis</h2>
                  <p className="text-gray-200 text-center text-sm">
                    3D imaging for comprehensive assessment
                  </p>
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

