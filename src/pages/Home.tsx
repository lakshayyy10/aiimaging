import React, { useState, useEffect } from 'react'
import { ArrowRight, Play, Shield, Zap, Users, CheckCircle, Brain, Scan, Target, Heart, Activity, Stethoscope, Zap as Lightning, Crosshair, Microscope, Monitor, Cpu, Database, Wifi, Radio, Eye } from 'lucide-react';

const Home = () => {
  // Floating medical icons configuration
  const floatingIcons = [
    { Icon: Heart, x: 10, y: 20, delay: 0, color: 'text-red-500' },
    { Icon: Activity, x: 80, y: 15, delay: 1, color: 'text-blue-500' },
    { Icon: Stethoscope, x: 20, y: 70, delay: 2, color: 'text-emerald-500' },
    { Icon: Brain, x: 90, y: 60, delay: 0.5, color: 'text-purple-500' },
    { Icon: Scan, x: 15, y: 45, delay: 1.5, color: 'text-cyan-500' },
    { Icon: Monitor, x: 85, y: 35, delay: 2.5, color: 'text-orange-500' },
    { Icon: Target, x: 60, y: 10, delay: 3, color: 'text-pink-500' },
    { Icon: Microscope, x: 40, y: 80, delay: 1.2, color: 'text-indigo-500' },
  ];

  // Data flow particles
  const [dataParticles, setDataParticles] = useState([]);

  // Generate data flow particles
  useEffect(() => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.5 + Math.random() * 1,
      size: 2 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.7,
      color: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 5)]
    }));
    setDataParticles(particles);
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze medical imaging data with unprecedented accuracy."
    },
    {
      icon: <Scan className="w-8 h-8 text-emerald-500" />,
      title: "Multi-Modal Imaging",
      description: "Support for CT, MRI, and Edge Radiograph Detection across multiple imaging modalities."
    },
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: "Precise Identification",
      description: "Accurately identify implant types and geometric parameters for patient-specific insights."
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-500" />,
      title: "Clinical Validation",
      description: "Rigorously tested and validated in clinical environments with proven accuracy rates."
    }
  ];

  const images = [
    '../../public/slide1.png',
    'https://via.placeholder.com/600x400/10B981/FFFFFF?text=CT+Scan+Processing',
    'https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=MRI+Detection'
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Animation state for the cycling text
  const imagingTypes = ["X-RAY", "CT SCAN", "MRI"];
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(150);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect for imaging types
  useEffect(() => {
    const handleTyping = () => {
      const currentType = imagingTypes[currentTypeIndex];
      
      if (isDeleting) {
        setDisplayText(currentType.substring(0, displayText.length - 1));
        setTypeSpeed(75);
      } else {
        setDisplayText(currentType.substring(0, displayText.length + 1));
        setTypeSpeed(150);
      }

      if (!isDeleting && displayText === currentType) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentTypeIndex((prevIndex) => (prevIndex + 1) % imagingTypes.length);
      }
    };

    const typingTimer = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(typingTimer);
  }, [displayText, isDeleting, currentTypeIndex, typeSpeed]);
  
  const clients = [
    "General Hospital",
    "Medical Research Center",
    "Orthopedic Institute",
    "University Medical Center",
    "Surgical Innovation Lab",
    "Advanced Imaging Center"
  ];

  const benefits = [
    "Reduce diagnostic time by up to 75%",
    "Improve surgical planning accuracy",
    "Enhance patient safety outcomes",
    "Streamline clinical workflows",
    "Support evidence-based decisions"
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes dataFlow {
          0% { transform: translateX(-20px) translateY(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(100vw) translateY(-50px); opacity: 0; }
        }
        
        @keyframes morph1 {
          0%, 100% { 
            border-radius: 50% 30% 70% 40%;
            transform: rotate(0deg) scale(1);
          }
          25% { 
            border-radius: 30% 60% 40% 70%;
            transform: rotate(90deg) scale(1.1);
          }
          50% { 
            border-radius: 60% 40% 30% 70%;
            transform: rotate(180deg) scale(0.9);
          }
          75% { 
            border-radius: 40% 70% 60% 30%;
            transform: rotate(270deg) scale(1.2);
          }
        }
        
        @keyframes morph2 {
          0%, 100% { 
            border-radius: 40% 60% 30% 70%;
            transform: rotate(0deg) scale(1);
          }
          33% { 
            border-radius: 70% 30% 60% 40%;
            transform: rotate(120deg) scale(1.3);
          }
          66% { 
            border-radius: 30% 70% 40% 60%;
            transform: rotate(240deg) scale(0.8);
          }
        }
        
        @keyframes morph3 {
          0%, 100% { 
            border-radius: 60% 40% 80% 20%;
            transform: rotate(0deg) scale(1);
          }
          20% { 
            border-radius: 20% 80% 40% 60%;
            transform: rotate(72deg) scale(1.1);
          }
          40% { 
            border-radius: 80% 20% 60% 40%;
            transform: rotate(144deg) scale(0.9);
          }
          60% { 
            border-radius: 40% 60% 20% 80%;
            transform: rotate(216deg) scale(1.2);
          }
          80% { 
            border-radius: 60% 40% 80% 20%;
            transform: rotate(288deg) scale(0.95);
          }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg) scale(1); }
          to { transform: rotate(360deg) scale(1.1); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg) scale(1); }
          to { transform: rotate(0deg) scale(0.9); }
        }
        
        @keyframes wobble {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(3deg) scale(1.05); }
          75% { transform: rotate(-3deg) scale(0.95); }
        }

        @keyframes rotate-y {
          0% { transform: perspective(1000px) rotateY(0deg); }
          100% { transform: perspective(1000px) rotateY(360deg); }
        }
        
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes dash {
          0% { stroke-dasharray: 0 100; }
          100% { stroke-dasharray: 100 0; }
        }
        
        @keyframes dash-reverse {
          0% { stroke-dasharray: 100 0; }
          100% { stroke-dasharray: 0 100; }
        }
        
        .animate-morph1 {
          animation: morph1 8s ease-in-out infinite;
        }
        
        .animate-morph2 {
          animation: morph2 12s ease-in-out infinite;
        }
        
        .animate-morph3 {
          animation: morph3 10s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 6s linear infinite;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-wobble {
          animation: wobble 3s ease-in-out infinite;
        }

        .animate-rotate-y {
          animation: rotate-y 10s ease-in-out infinite alternate;
        }
        
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }

        .animate-dash {
          stroke-dasharray: 20 10;
          animation: dash 3s ease-in-out infinite;
        }
        
        .animate-dash-reverse {
          stroke-dasharray: 20 10;
          animation: dash-reverse 3s ease-in-out infinite 1.5s;
        }
      `}</style>

      {/* Floating Medical Icons Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.color} opacity-20`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              animation: `float 6s infinite ease-in-out ${item.delay}s, rotate 12s infinite linear`
            }}
          >
            <item.Icon className="w-12 h-12" />
          </div>
        ))}
      </div>

      {/* Data Flow Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {dataParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              animation: `dataFlow 8s infinite linear ${particle.id * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Morphing Shapes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-morph1"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full animate-morph2"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full animate-morph3"></div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-20 lg:py-32 overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-emerald-500/5"></div>
        
        {/* 3D Rotating Medical Imagery */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-10 transform-gpu">
            <div className="relative w-24 h-24 animate-spin-slow">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg transform rotate-12 animate-pulse"></div>
              <div className="absolute inset-2 bg-gradient-to-r from-emerald-500/40 to-teal-500/40 rounded-lg transform -rotate-12"></div>
              <Scan className="absolute inset-0 m-auto w-8 h-8 text-blue-600 animate-bounce" />
            </div>
          </div>
          
          <div className="absolute top-1/3 right-16 transform-gpu">
            <div className="relative w-20 h-20 animate-spin-reverse">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full transform scale-110 animate-ping"></div>
              <div className="absolute inset-1 bg-gradient-to-r from-indigo-500/40 to-purple-500/40 rounded-full"></div>
              <Brain className="absolute inset-0 m-auto w-6 h-6 text-purple-600" />
            </div>
          </div>
          
          <div className="absolute bottom-1/4 left-1/4 transform-gpu">
            <div className="relative w-28 h-28 animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl transform rotate-45 animate-pulse"></div>
              <div className="absolute inset-3 bg-gradient-to-r from-teal-500/30 to-emerald-500/30 rounded-xl transform -rotate-45"></div>
              <Target className="absolute inset-0 m-auto w-10 h-10 text-emerald-600 animate-pulse" />
            </div>
          </div>
          
          <div className="absolute bottom-1/3 right-1/4 transform-gpu">
            <div className="relative w-22 h-22 animate-wobble">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-lg transform skew-y-12 animate-pulse"></div>
              <div className="absolute inset-2 bg-gradient-to-r from-yellow-500/40 to-orange-500/40 rounded-lg transform -skew-y-12"></div>
              <Heart className="absolute inset-0 m-auto w-7 h-7 text-red-600 animate-pulse" />
            </div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Automated Identification{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
               & Analysis of medical Implants visible on radiographic images{' '}
               <span className="inline-block min-w-[140px] text-left">
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">{displayText}</span>
                 <span className="animate-pulse text-purple-600">|</span>
               </span>
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Our system delivers patient-specific implant make and model detection, enhancing surgical planning, reducing revision errors, and improving clinical outcomes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Explore Technology
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              <Play className="mr-2 w-5 h-5" />
              Request Demo
            </button>
          </div>

          {/* Tech Stack Indicators */}
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span>X-RAY detection</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>CT Imaging</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span>MRI Analysis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overview of Needs */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Benefits on the Left */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Transforming Clinical Outcomes
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-emerald-500 mt-1 mr-3 flex-shrink-0 animate-pulse" />
                    <p className="text-lg text-gray-700">{benefit}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image Carousel on the Right with 3D Animation */}
            <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg transform-gpu">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 animate-pulse"></div>
              
              {/* 3D Rotating Frame */}
              <div className="absolute inset-2 bg-white rounded-lg shadow-inner transform animate-rotate-y">
                <img
                  src={images[currentImageIndex]}
                  alt="AI Visualization"
                  className="w-full h-full object-cover rounded-lg transition-all duration-700 transform hover:scale-105"
                />
                
                {/* Data Flow Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-4 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                  <div className="absolute top-8 right-8 w-3 h-3 bg-emerald-500 rounded-full animate-bounce"></div>
                  <div className="absolute bottom-6 left-6 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 right-4 w-4 h-4 bg-orange-500 rounded-full animate-spin"></div>
                  
                  {/* Scanning Line Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent transform translate-x-[-100%] animate-scan"></div>
                </div>
              </div>
              
              {/* Floating Analysis Indicators */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center animate-float shadow-lg">
                <Eye className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                <Cpu className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-20 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our AI-Powered Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive workflow that transforms medical imaging into actionable surgical insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group transform hover:scale-105">
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Workflow Visualization with Enhanced Animations */}
          <div className="bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-emerald-500 transform rotate-45 scale-150 animate-pulse"></div>
            </div>
            
            {/* Data Flow Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 200">
              <defs>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0"/>
                  <stop offset="50%" stopColor="#10B981" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path 
                d="M 100 100 Q 300 50 500 100 T 700 100" 
                stroke="url(#flowGradient)" 
                strokeWidth="2" 
                fill="none"
                className="animate-dash"
              />
              <path 
                d="M 100 120 Q 300 170 500 120 T 700 120" 
                stroke="url(#flowGradient)" 
                strokeWidth="2" 
                fill="none"
                className="animate-dash-reverse"
              />
            </svg>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center relative z-10">
              AI Processing Workflow
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
              <div className="text-center group relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                  <span className="text-white font-bold animate-pulse">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Input</h4>
                <p className="text-sm text-gray-600">X-RAY/CT/MRI imaging data</p>
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full animate-bounce opacity-60"></div>
              </div>
              <div className="text-center group relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                  <span className="text-white font-bold animate-pulse">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Preprocessing</h4>
                <p className="text-sm text-gray-600">Image enhancement & filtering</p>
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-purple-500 rounded-full animate-ping opacity-60"></div>
              </div>
              <div className="text-center group relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                  <span className="text-white font-bold animate-pulse">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI Model</h4>
                <p className="text-sm text-gray-600">Deep learning analysis</p>
                <div className="absolute -bottom-2 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-spin opacity-40"></div>
              </div>
              <div className="text-center group relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                  <span className="text-white font-bold animate-pulse">4</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Output</h4>
                <p className="text-sm text-gray-600">Implant type & geometry</p>
                <div className="absolute -bottom-1 -left-2 w-3 h-3 bg-orange-500 rounded-full animate-bounce opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Clients */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Institutions
            </h2>
            <p className="text-xl text-gray-600">
              Healthcare providers worldwide rely on our AI technology for accurate implant identification.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {clients.map((client, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center hover:bg-gray-100 transition-colors duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-900">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Acknowledgement Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
            Supported by Excellence
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Our research and development is supported by leading medical institutions and research advisors.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Research Institutions</h3>
              <p className="text-gray-600">
                Collaborative partnerships with top-tier medical universities and research centers worldwide.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Advisors</h3>
              <p className="text-gray-600">
                Expert guidance from leading orthopedic surgeons and radiologists in the field.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinical Validation</h3>
              <p className="text-gray-600">
                Rigorous testing and validation through clinical trials and real-world applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the growing number of healthcare providers using AI-powered implant identification to improve patient outcomes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200">
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-200">
              View Research
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
