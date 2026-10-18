import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import LiveMap from "./pages/LiveMap";
import Reports from "./pages/Reports";
import Scenarios from "./pages/Scenarios";
import Settings from "./pages/Settings";
import Traffic from "./pages/Traffic";
import VehicleDetails from "./pages/VehicleDetails";
import Vehicles from "./pages/Vehicles";
import Zones from "./pages/Zones";

import "./index.css";
import "./styles/metropolis.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/live-map"
            element={<LiveMap />}
          />

          <Route
            path="/vehicles"
            element={<Vehicles />}
          />

          <Route
            path="/vehicles/:vehicleId"
            element={<VehicleDetails />}
          />

          <Route
            path="/traffic"
            element={<Traffic />}
          />

          <Route
            path="/incidents"
            element={<Incidents />}
          />

          <Route
            path="/zones"
            element={<Zones />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/scenarios"
            element={<Scenarios />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}