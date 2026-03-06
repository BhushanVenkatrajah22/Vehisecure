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
      <div className="flex h-screen bg-background overflow-hidden text-textMain font-sans">
        {/* Sidebar */}
        <Sidebar className="w-64 flex-shrink-0" />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />

          {/* Main Viewport */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-8">
            <div className="max-w-7xl mx-auto">
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
