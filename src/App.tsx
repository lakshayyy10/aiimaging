import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home.tsx';
import Team from './pages/Team.tsx';
import ImplantIdentification from './pages/ImplantIdentification.tsx';
import Publications from './pages/Publications.tsx';
import XrayLibrary from './pages/XrayLibrary.tsx'
import Shoulder from './pages/Shoulder.tsx';
import Hip from './pages/Hip.tsx';
import Wrist from './pages/Wrist.tsx';
import WristModel from './pages/wrist-model.tsx';
import Knee from './pages/Knee.tsx';
import KneeModel from './pages/knee-model.tsx'
import ShoulderModel from './pages/shoulder-model.tsx'
import Thumb from './pages/thumb.tsx';
import Spine from './pages/spine.tsx';
import Finger from './pages/finger.tsx';

function App() {
  return (
    <Router basename="/">
      <div className="min-h-screen bg-gray-50 font-inter">
        <Header />
        <main>
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/team" element={<Team />} />
  <Route path="/implant-identification" element={<ImplantIdentification />} />
  <Route path="/implant-identification/xray" element={<XrayLibrary />} />
  <Route path="/research" element={<Publications />} />
  <Route path="/xray-library" element={<XrayLibrary />} />
  <Route path="/xray/shoulder" element={<Shoulder />} />
  <Route path="/xray/hip" element={<Hip />} />
  <Route path="/xray/wrist" element={<Wrist />} />
  <Route path="/wrist-model" element={<WristModel />} />
  <Route path="/xray/knee" element={<Knee />} />
  <Route path="/knee-model" element={<KneeModel />} />
  <Route path="/shoulder-model" element={<ShoulderModel />} />
  <Route path="/xray/thumb" element={<Thumb />} />
  <Route path="/xray/spine" element={<Spine/>} />
  <Route path="/xray/finger" element={<Finger/>} />
</Routes>

        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
