import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import ClassicPlaylist from './pages/ClassicPlaylist';
import OmnitrixVariants from './pages/OmnitrixVariants';
import CoreCharacters from './pages/CoreCharacters';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-on-surface font-body w-full relative overflow-x-hidden">
        {/* Global Scanline Overlay */}
        <div className="hud-scanline fixed inset-0 pointer-events-none z-50 mix-blend-screen opacity-50"></div>
        
        <Navigation />
        
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/classic" element={<ClassicPlaylist />} />
            <Route path="/variants" element={<OmnitrixVariants />} />
            <Route path="/characters" element={<CoreCharacters />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
