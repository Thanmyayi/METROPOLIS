import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import LiveMap from "./pages/LiveMap";
import Vehicles from "./pages/Vehicles";
import Traffic from "./pages/Traffic";
import Incidents from "./pages/Incidents";
import Zones from "./pages/Zones";
import Analytics from "./pages/Analytics";
import Scenarios from "./pages/Scenarios";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import "./index.css";
import "./styles/metropolis.css";

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#020914]">
      <Sidebar />

      <main className="min-h-screen pl-[230px]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/live-map" element={<LiveMap />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/traffic" element={<Traffic />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/zones" element={<Zones />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/scenarios" element={<Scenarios />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}