import { Building2, MapPin, Users, Activity } from "lucide-react";

const zones = [
  ["Zone A", "Central District", 72, "High", 42],
  ["Zone B", "Business Hub", 58, "Moderate", 31],
  ["Zone C", "Residential Area", 41, "Moderate", 27],
  ["Zone D", "Tech Park", 29, "Low", 28],
];

export default function Zones() {
  return (
    <div className="metropolis-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">City Zones</h1>
          <p className="page-subtitle">
            Monitor zones, infrastructure and simulated activity
          </p>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: 18 }}>
        <div className="panel kpi-card">
          <Building2 />
          <div className="kpi-label" style={{ marginTop: 14 }}>
            Total Zones
          </div>
          <div className="kpi-value">04</div>
        </div>

        <div className="panel kpi-card">
          <Activity />
          <div className="kpi-label" style={{ marginTop: 14 }}>
            Active Zones
          </div>
          <div className="kpi-value">04</div>
        </div>

        <div className="panel kpi-card">
          <Users />
          <div className="kpi-label" style={{ marginTop: 14 }}>
            Population Index
          </div>
          <div className="kpi-value">86K</div>
        </div>

        <div className="panel kpi-card">
          <MapPin />
          <div className="kpi-label" style={{ marginTop: 14 }}>
            Infrastructure
          </div>
          <div className="kpi-value">94%</div>
        </div>
      </div>

      <div className="grid-2">
        {zones.map(([name, description, congestion, status, vehicles]) => (
          <div className="panel" key={name}>
            <div className="panel-header">
              <div>
                <h3 className="panel-title">{name}</h3>
                <div className="muted" style={{ marginTop: 5 }}>
                  {description}
                </div>
              </div>

              <span
                className={`status ${
                  status === "High"
                    ? "status-high"
                    : status === "Moderate"
                    ? "status-medium"
                    : "status-low"
                }`}
              >
                {status}
              </span>
            </div>

            <div style={{ padding: 20 }}>
              <div className="metric-row">
                <span className="muted">Traffic Density</span>
                <strong>{congestion}%</strong>
              </div>

              <div className="progress">
                <div
                  className="progress-fill"
                  style={{ width: `${congestion}%` }}
                />
              </div>

              <div className="metric-row">
                <span className="muted">Active Vehicles</span>
                <strong>{vehicles}</strong>
              </div>

              <button className="btn" style={{ width: "100%", marginTop: 12 }}>
                View Zone on Map
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}