import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import VehicleManagement from './pages/VehicleManagement/VehicleManagement';
import OwnerManagement from './pages/OwnerManagement/OwnerManagement';
import InsuranceManagement from './pages/InsuranceManagement/InsuranceManagement';
import LinkManagement from './pages/LinkManagement/LinkManagement';
import Verification from './pages/Verification/Verification';

function App() {
  return (
    <BrowserRouter>
      {/* Global Scanline Overlay */}
      <div className="fixed inset-0 scanline-overlay pointer-events-none z-50"></div>

      <div className="flex h-screen overflow-hidden text-slate-200 font-sans relative">
        <Sidebar className="w-64 flex-shrink-0" />

        <div className="flex-1 flex flex-col overflow-hidden relative">

          {/* Animated Background Ambience */}
          <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-cyberBlue/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none animate-pulse-glow"></div>
          <div className="absolute bottom-[-20%] left-[10%] w-[600px] h-[600px] bg-deepPurple/10 rounded-full blur-[180px] mix-blend-screen pointer-events-none animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>

          <Navbar />

          <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 relative z-10">
            <div className="max-w-7xl mx-auto h-full relative">
              {/* Decorative structural line */}
              <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyberBlue/50 via-deepPurple/20 to-transparent"></div>

              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/vehicles" element={<VehicleManagement />} />
                <Route path="/owners" element={<OwnerManagement />} />
                <Route path="/insurance" element={<InsuranceManagement />} />
                <Route path="/link" element={<LinkManagement />} />
                <Route path="/verify" element={<Verification />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
