import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Portfolio from './pages/Portfolio';
import { SparklesCore } from './components/ui/sparkles'; // Pastikan path benar

function App() {
  return (
    <HelmetProvider>
      <div className="relative min-h-screen">
        {/* Background Sparkles Effect */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <SparklesCore
            id="app-sparkles"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={50}
            particleColor="#ffffff"  // Warna default, bisa disesuaikan
          />
        </div>

        <Router>
          <div className="relative z-10 min-h-screen flex flex-col">
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/projects" element={<Portfolio />} />
                <Route path="/skills" element={<Portfolio />} />
                <Route path="/contact" element={<Portfolio />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </div>
    </HelmetProvider>
  );
}

export default App;