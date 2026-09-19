import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import RegionLibrary from './components/RegionLibrary';
import IdentifyTool from './components/IdentifyTool';
import Home from './pages/Home';
import Team from './pages/Team';
import ImplantIdentification from './pages/ImplantIdentification';
import Publications from './pages/Publications';
import XrayLibrary from './pages/XrayLibrary';
import ImplantLibrary from './pages/ImplantLibrary';
import NotFound from './pages/NotFound';

/* Region library and identification pages are one component each, driven by
   src/data/regions.ts. Every original route is preserved. */

function App() {
  return (
    <Router basename="/">
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-paper">
        <Header />

        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/research" element={<Publications />} />

            <Route path="/implant-identification" element={<ImplantIdentification />} />
            <Route path="/implant-identification/xray" element={<XrayLibrary />} />
            <Route path="/xray-library" element={<XrayLibrary />} />
            <Route path="/implant-library" element={<ImplantLibrary />} />

            <Route path="/xray/knee" element={<RegionLibrary slug="knee" />} />
            <Route path="/xray/hip" element={<RegionLibrary slug="hip" />} />
            <Route path="/xray/shoulder" element={<RegionLibrary slug="shoulder" />} />
            <Route path="/xray/wrist" element={<RegionLibrary slug="wrist" />} />
            <Route path="/xray/spine" element={<RegionLibrary slug="spine" />} />
            <Route path="/xray/thumb" element={<RegionLibrary slug="thumb" />} />
            <Route path="/xray/finger" element={<RegionLibrary slug="finger" />} />

            <Route path="/knee-model" element={<IdentifyTool slug="knee" />} />
            <Route path="/hip-model" element={<IdentifyTool slug="hip" />} />
            <Route path="/shoulder-model" element={<IdentifyTool slug="shoulder" />} />
            <Route path="/wrist-model" element={<IdentifyTool slug="wrist" />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
