import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LiveMap from "./pages/LiveMap";
import Dashboard from "./pages/Dashboard";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/live-map" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/live-map" element={<LiveMap />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/traffic" element={<Traffic />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/zones" element={<Zones />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/scenarios" element={<Scenarios />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="*" element={<Navigate to="/live-map" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;