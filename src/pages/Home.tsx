import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Shield, Zap, Users, CheckCircle, Brain, Scan, Target } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-primary-500" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze medical imaging data with unprecedented accuracy."
    },
    {
      icon: <Scan className="w-8 h-8 text-emerald-500" />,
      title: "Multi-Modal Imaging",
      description: "Support for CT, MRI, and Edge Radiograph Detection across multiple imaging modalities."
    },
    {
      icon: <Target className="w-8 h-8 text-primary-500" />,
      title: "Precise Identification",
      description: "Accurately identify implant types and geometric parameters for patient-specific insights."
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-500" />,
      title: "Clinical Validation",
      description: "Rigorously tested and validated in clinical environments with proven accuracy rates."
    }
  ];

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
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-emerald-50 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-emerald-500/5"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-200 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-emerald-200 rounded-full blur-xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
            Automated Identification{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-emerald-600">
               & Analysis of medical  Implants visible on radiographic images X-ray ,CT & MRI scan
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-up delay-100">
            Our system delivers patient-specific implant make and model detection, enhancing surgical planning, reducing revision errors, and improving clinical outcomes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up delay-200">
            <Link
              to="/implant-identification"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Explore Technology
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg border-2 border-primary-600 hover:bg-primary-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Play className="mr-2 w-5 h-5" />
              Request Demo
            </Link>
          </div>

          {/* Tech Stack Indicators */}
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-500 animate-slide-up delay-300">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
              <span>X-RAY detection</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span>CT Imaging</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>MRI Analysis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overview of Needs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Implant Identification Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Accurate implant identification is critical for successful revision surgeries, especially for glenoid and orthopedic implants where precision determines patient outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Current Challenges</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Manual identification is time-consuming and error-prone
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Limited accuracy in complex cases
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Inconsistent results across different radiologists
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Delayed surgical planning and patient care
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Impact</h3>
                <ul className="space-y-2 text-gray-600">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-emerald-50 p-8 rounded-2xl">
              <div className="aspect-square bg-white rounded-xl shadow-lg p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scan className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Advanced AI Analysis
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Our AI algorithms process medical imaging data to provide accurate implant identification and geometric analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-20 bg-gray-50">
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
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 group">
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

          {/* Workflow Visualization */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              AI Processing Workflow
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Input</h4>
                <p className="text-sm text-gray-600">X-RAY/CT/MRI imaging data</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Preprocessing</h4>
                <p className="text-sm text-gray-600">Image enhancement & filtering</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI Model</h4>
                <p className="text-sm text-gray-600">Deep learning analysis</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">4</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Output</h4>
                <p className="text-sm text-gray-600">Implant type & geometry</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Clients */}
      <section className="py-20 bg-white">
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
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-900">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Acknowledgement Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-emerald-50">
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
            <Link
              to="/implant-identification"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-200"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/research"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-200"
            >
              View Research
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
