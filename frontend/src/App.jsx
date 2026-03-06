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
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar className="w-64 flex-shrink-0" />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">

          {/* Animated Background Elements */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-electricBlue/20 rounded-full blur-[120px] -z-10 mix-blend-screen animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-neonCyan/10 rounded-full blur-[100px] -z-10 mix-blend-screen animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>

          <Navbar />

          {/* Main Viewport */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent p-6 relative z-10">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/vehicles" element={<VehicleManagement />} />
              <Route path="/owners" element={<OwnerManagement />} />
              <Route path="/insurance" element={<InsuranceManagement />} />
              <Route path="/link" element={<LinkManagement />} />
              <Route path="/verify" element={<Verification />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
