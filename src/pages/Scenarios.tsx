import { useState } from "react";
import {
  Play,
  Save,
  Zap,
  TrendingDown,
  TrafficCone,
  AlertTriangle,
} from "lucide-react";

export default function Scenarios() {
  const [vehicles, setVehicles] = useState(20);
  const [traffic, setTraffic] = useState(35);

  const speed = Math.max(14, 32 - traffic * 0.22);
  const congestion = Math.min(98, 42 + vehicles * 0.65);
  const incidents = Math.min(90, 22 + traffic * 0.7);

  return (
    <div className="metropolis-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">What-If Scenarios</h1>
          <p className="page-subtitle">
            Test possible city conditions before implementing decisions
          </p>
        </div>

        <div style={{ display: "flex", gap: 9 }}>
          <button className="btn">
            <Save size={14} style={{ marginRight: 6 }} />
            Save Scenario
          </button>

          <button className="btn btn-purple">
            <Play size={14} style={{ marginRight: 6 }} />
            Run Simulation
          </button>
        </div>
      </div>

      <div className="grid-2">
        <div className="panel scenario-card">
          <h3 className="panel-title">Simulation Parameters</h3>

          <div style={{ marginTop: 28 }}>
            <div className="metric-row">
              <span>Increase Vehicles</span>
              <strong>{vehicles}%</strong>
            </div>

            <input
              className="slider"
              type="range"
              min="0"
              max="100"
              value={vehicles}
              onChange={(e) => setVehicles(Number(e.target.value))}
            />
          </div>

          <div style={{ marginTop: 28 }}>
            <div className="metric-row">
              <span>Traffic Pressure</span>
              <strong>{traffic}%</strong>
            </div>

            <input
              className="slider"
              type="range"
              min="0"
              max="100"
              value={traffic}
              onChange={(e) => setTraffic(Number(e.target.value))}
            />
          </div>

          <div
            style={{
              marginTop: 30,
              padding: 20,
              borderRadius: 13,
              background: "rgba(25, 111, 220, 0.07)",
              border: "1px solid rgba(50, 150, 240, 0.12)",
            }}
          >
            <Zap size={25} />
            <div className="scenario-value">Scenario Impact</div>
            <p className="muted">
              Simulation predicts how traffic conditions change when these
              parameters are applied.
            </p>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Predicted Impact</h3>
          </div>

          <div style={{ padding: 20 }}>
            <div className="metric-row">
              <span className="muted">
                <TrendingDown size={14} /> Average Speed
              </span>
              <strong>{speed.toFixed(0)} km/h ↓</strong>
            </div>

            <div className="metric-row">
              <span className="muted">
                <TrafficCone size={14} /> Traffic Density
              </span>
              <strong>{congestion.toFixed(0)}% ↑</strong>
            </div>

            <div className="metric-row">
              <span className="muted">
                <AlertTriangle size={14} /> Incidents Likelihood
              </span>
              <strong>{incidents.toFixed(0)}% ↑</strong>
            </div>

            <div style={{ marginTop: 25 }}>
              <div className="kpi-label">Overall Scenario Risk</div>
              <div className="kpi-value">
                {congestion > 70 ? "High" : congestion > 50 ? "Medium" : "Low"}
              </div>

              <div className="progress" style={{ marginTop: 12 }}>
                <div
                  className="progress-fill"
                  style={{ width: `${congestion}%` }}
                />
              </div>
            </div>

            <button className="btn btn-purple" style={{ width: "100%", marginTop: 25 }}>
              <Play size={15} style={{ marginRight: 6 }} />
              Run Scenario Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}