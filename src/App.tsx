import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home.tsx';
import Team from './pages/Team.tsx';
import ImplantIdentification from './pages/ImplantIdentification.tsx';
import Publications from './pages/Publications.tsx'; // 👈 Import the Publications page
import XrayLibrary from './pages/Xraylibrary.tsx';




function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-inter">
        <Header />
        <main>
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/team" element={<Team />} />
  <Route path="/implant-identification" element={<ImplantIdentification />} />
  <Route path="/implant-identification/xray" element={<XrayLibrary />} />
  <Route path="/research" element={<Publications />} />
</Routes>

        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
