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
        {/* =================================================
            MAIN METROPOLIS LAYOUT
        ================================================= */}

        <Route element={<MainLayout />}>
          {/* DASHBOARD */}

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
            element={
              <Dashboard />
            }
          />

          {/* LIVE MAP */}

          <Route
            path="/live-map"
            element={
              <LiveMap />
            }
          />

          {/* VEHICLES */}

          <Route
            path="/vehicles"
            element={
              <Vehicles />
            }
          />

          {/* =================================================
              VEHICLE DETAILS
              
              Example:
              /vehicles/VH-001
              /vehicles/VH-002
              /vehicles/VH-003
          ================================================= */}

          <Route
            path="/vehicles/:vehicleId"
            element={
              <VehicleDetails />
            }
          />

          {/* TRAFFIC */}

          <Route
            path="/traffic"
            element={
              <Traffic />
            }
          />

          {/* INCIDENTS */}

          <Route
            path="/incidents"
            element={
              <Incidents />
            }
          />

          {/* ZONES */}

          <Route
            path="/zones"
            element={
              <Zones />
            }
          />

          {/* ANALYTICS */}

          <Route
            path="/analytics"
            element={
              <Analytics />
            }
          />

          {/* SCENARIOS */}

          <Route
            path="/scenarios"
            element={
              <Scenarios />
            }
          />

          {/* REPORTS */}

          <Route
            path="/reports"
            element={
              <Reports />
            }
          />

          {/* SETTINGS */}

          <Route
            path="/settings"
            element={
              <Settings />
            }
          />

          {/* =================================================
              UNKNOWN ROUTE
          ================================================= */}

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