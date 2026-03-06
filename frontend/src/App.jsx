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
      {/* Dynamic Vibrant Background Mesh */}
      <div className="fixed inset-0 bg-mesh-pattern opacity-40 mix-blend-screen pointer-events-none z-0"></div>

      {/* Floating Animated Orbs for intense color */}
      <div className="fixed top-[10%] left-[20%] w-96 h-96 bg-neonPink rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-float-slow opacity-30 z-0"></div>
      <div className="fixed bottom-[10%] right-[10%] w-[500px] h-[500px] bg-neonCyan rounded-full blur-[150px] mix-blend-screen pointer-events-none animate-float-fast opacity-30 z-0"></div>
      <div className="fixed top-[40%] right-[40%] w-80 h-80 bg-neonYellow rounded-full blur-[100px] mix-blend-screen pointer-events-none animate-pulse-glow opacity-20 z-0"></div>

      <div className="flex h-screen overflow-hidden relative z-10 p-4 gap-4">
        {/* Sidebar wrapper for floating effect */}
        <div className="w-72 flex-shrink-0 h-full">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden gap-4">
          <Navbar />

          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="h-full pb-8">
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
