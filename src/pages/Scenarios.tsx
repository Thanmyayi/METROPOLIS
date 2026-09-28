import {
  Activity,
  Gauge,
  Play,
  Save,
  ShieldAlert,
  Sparkles,
  TrendingDown,
} from "lucide-react";
import { useState } from "react";

export default function Scenarios() {
  const [vehicles, setVehicles] =
    useState(20);

  const speed =
    Math.max(
      12,
      32 - vehicles * 0.4,
    ).toFixed(0);

  const congestion =
    Math.min(
      100,
      55 + vehicles * 0.8,
    ).toFixed(0);

  return (
    <div className="metropolis-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            What-If Scenarios
          </h1>

          <p className="page-subtitle">
            Simulate changes and analyze their impact on the city
          </p>
        </div>

        <span className="live-pill">
          <Sparkles size={13} />
          SIMULATION READY
        </span>
      </div>

      <div className="scenario-layout">
        <div className="panel scenario-control-panel">
          <div className="panel-header">
            <h3 className="panel-title">
              Scenario Configuration
            </h3>

            <Sparkles
              size={17}
              className="muted"
            />
          </div>

          <label>
            Increase Vehicles
          </label>

          <div className="scenario-value">
            {vehicles}%
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={vehicles}
            onChange={(e) =>
              setVehicles(
                Number(e.target.value),
              )
            }
          />

          <div className="range-labels">
            <span>0%</span>
            <span>100%</span>
          </div>

          <button className="run-simulation-button">
            <Play size={15} />
            Run Simulation
          </button>

          <button className="save-scenario-button">
            <Save size={15} />
            Save Scenario
          </button>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">
              Scenario Impact
            </h3>
          </div>

          <div className="scenario-results">
            <div>
              <Gauge />
              <span>
                Average Speed
              </span>
              <strong>
                {speed} km/h
                <TrendingDown />
              </strong>
            </div>

            <div>
              <Activity />
              <span>
                Traffic Density
              </span>
              <strong>
                High
              </strong>
            </div>

            <div>
              <Activity />
              <span>
                Congestion
              </span>
              <strong>
                {congestion}%
              </strong>
            </div>

            <div>
              <ShieldAlert />
              <span>
                Incident Likelihood
              </span>
              <strong>
                Medium
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}