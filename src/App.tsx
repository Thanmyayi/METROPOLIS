import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./components/AppLayout";

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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}