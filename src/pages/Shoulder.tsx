import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Zap, Eye, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const implantList = [
  "Accumed Polarus",
  "Arthex Inverse", 
  "Arthex universe",
  "Biomet Bio-Angular",
  "Biomet Comprehensive",
  "Biomet verso",
  "DJO Encore Reverse",
  "DePuy Global Advantage CTA Head",
  "Depuy Delta",
  "Depuy Global",
  "EXATECH Equinox",
  "Evolutis UNIC",
  "Exatech Interspace",
  "Stryker O leary",
  "Stryker solar",
  "Tornier Aequalis Modular",
  "Tornier Press Fit",
  "Zimmer Bigliani",
  "Zimmer Biomet Sidus",
  "Zimmer Fenlin total shoulder system",
  "Smith and Nephew Promos"
];

const implantImages: Record<string, string> = {
  "Accumed Polarus": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/polarus-4.png",
  "Arthex Inverse": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/arthex-inverse-6.png",
  "Arthex universe": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/universe-4.png",
  "Biomet Bio-Angular": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/biometbipolar.jpg",
  "Biomet Comprehensive": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/comprehensive-7.png",
  "Biomet verso": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/verso-biomet-1.png",
  "DJO Encore Reverse": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/encorereversexray3.jpg",
  "DePuy Global Advantage CTA Head": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/depuyglobabladva.jpg",
  "Depuy Delta": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/depuydelya.png",
  "Depuy Global": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/depuyglobal.png",
  "EXATECH Equinox": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/exactechequinoxexray5.png",
  "Evolutis UNIC": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/evolutis-unic.png",
  "Exatech Interspace": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/interspace-8.png",
  "Stryker O leary": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/o-leary-5.png",
  "Stryker solar": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/strykersolar.jpg",
  "Tornier Aequalis Modular": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/tornieraequalisxray5.jpg",
  "Tornier Press Fit": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/pressfit.jpg",
  "Zimmer Bigliani": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/zimmerbiglianixray250.jpg",
  "Zimmer Biomet Sidus": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/biomet.png",
  "Zimmer Fenlin total shoulder system": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/fenlinxray.jpg",
  "Smith and Nephew Promos": "https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09/promos-4.png"
};

const Shoulder = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleModelNavigation = () => {
    navigate('/shoulder-model');
  };

  const handleCardClick = (implantName: string) => {
    const implantRoute = implantName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    navigate(`/${implantRoute}`);
  };

  const handleBackToMain = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50">
      {/* Background glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className={`mb-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
            <button 
              onClick={handleBackToMain}
              className="group flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-all duration-300 hover:translate-x-1"
            >
              <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to Main</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-gray-900 via-pink-900 to-rose-900 bg-clip-text text-transparent mb-4">
                Shoulder Implant Library
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Comprehensive collection of shoulder implants with AI-powered identification
              </p>
            </div>
          </div>

          {/* Hero Section */}
          <div className={`mb-16 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-rose-500/5"></div>
              
              <div className="relative flex flex-col lg:flex-row items-center justify-center lg:space-x-12 space-y-8 lg:space-y-0">
                {/* Icon */}
                <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Zap className="w-12 h-12 text-white" />
                </div>

                {/* Content */}
                <div className="text-center lg:text-left max-w-xl">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                    AI-Powered Shoulder{" "}
                    <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Analysis</span>
                  </h2>
                  <p className="text-gray-600 mb-8 text-lg">
                    Upload your X-ray and let our intelligent system identify shoulder implant specifications instantly.
                  </p>
                  
                  <button
                    onClick={handleModelNavigation}
                    className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:from-pink-700 hover:to-rose-700 transition transform hover:scale-105"
                  >
                    <div className="flex items-center space-x-2">
                      <Search className="w-5 h-5" />
                      <span>Identify Implant</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Implant Grid */}
          <div className={`transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center mb-8">
                <Eye className="w-8 h-8 text-pink-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Shoulder Implant Collection</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {implantList.map((implant, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer"
                    onClick={() => handleCardClick(implant)}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Image */}
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-pink-50 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={implantImages[implant]}
                        alt={implant}
                        className="max-w-[80%] max-h-[80%] object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Content */}
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-pink-700 transition-colors text-sm">
                      {implant}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {['X-ray', '3D', 'Specs'].map((tag, tagIndex) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            hoveredCard === index
                              ? 'bg-pink-100 text-pink-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shoulder;

