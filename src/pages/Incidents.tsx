import {
  AlertTriangle,
  BellRing,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldAlert,
} from "lucide-react";

const incidents = [
  ["Road Closure", "Main Street, Zone A", "High", "12 min ago"],
  ["Accident", "5th Cross, Zone C", "Medium", "18 min ago"],
  ["Traffic Signal Failure", "MG Road, Zone B", "High", "26 min ago"],
  ["Vehicle Breakdown", "Ring Road, Zone D", "Low", "34 min ago"],
  ["Waterlogging", "Central Avenue, Zone A", "Medium", "42 min ago"],
];

export default function Incidents() {
  return (
    <div className="metropolis-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Incident Command Center</h1>
          <p className="page-subtitle">
            Monitor and manage simulated city incidents
          </p>
        </div>

        <button className="btn btn-primary">
          <BellRing size={15} style={{ marginRight: 6 }} />
          Create Incident
        </button>
      </div>

      <div className="grid-4" style={{ marginBottom: 18 }}>
        <div className="panel kpi-card">
          <div className="kpi-label">Active Incidents</div>
          <div className="kpi-value">08</div>
          <div className="kpi-change">2 new today</div>
        </div>

        <div className="panel kpi-card">
          <div className="kpi-label">High Priority</div>
          <div className="kpi-value">02</div>
          <div className="kpi-change" style={{ color: "#ff6b72" }}>
            Immediate attention
          </div>
        </div>

        <div className="panel kpi-card">
          <div className="kpi-label">Resolved Today</div>
          <div className="kpi-value">17</div>
          <div className="kpi-change">↑ 8%</div>
        </div>

        <div className="panel kpi-card">
          <div className="kpi-label">Avg. Response</div>
          <div className="kpi-value">06m</div>
          <div className="kpi-change">↓ 12%</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Active Incidents</h3>
            <span className="muted">Live</span>
          </div>

          {incidents.map((incident, index) => (
            <div className="incident-item" key={index}>
              <div className="incident-icon">
                {incident[0].includes("Accident") ? (
                  <AlertTriangle size={18} />
                ) : (
                  <ShieldAlert size={18} />
                )}
              </div>

              <div className="incident-main">
                <div className="incident-title">{incident[0]}</div>

                <div className="incident-meta">
                  <MapPin size={11} style={{ marginRight: 4 }} />
                  {incident[1]}
                </div>

                <div className="incident-meta">
                  <Clock size={11} style={{ marginRight: 4 }} />
                  {incident[3]}
                </div>
              </div>

              <span
                className={`status ${
                  incident[2] === "High"
                    ? "status-high"
                    : incident[2] === "Medium"
                    ? "status-medium"
                    : "status-low"
                }`}
              >
                {incident[2]}
              </span>
            </div>
          ))}
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Incident Response</h3>
          </div>

          <div style={{ padding: 22 }}>
            <div
              style={{
                padding: 20,
                borderRadius: 13,
                background: "rgba(255, 80, 90, 0.05)",
                border: "1px solid rgba(255, 80, 90, 0.12)",
              }}
            >
              <ShieldAlert size={30} />
              <h2 style={{ margin: "12px 0 6px" }}>Road Closure</h2>
              <p className="muted">
                Main Street, Zone A has been marked as closed in the digital
                twin simulation.
              </p>

              <div className="metric-row">
                <span className="muted">Severity</span>
                <span className="status status-high">High</span>
              </div>

              <div className="metric-row">
                <span className="muted">Affected Vehicles</span>
                <strong>24</strong>
              </div>

              <div className="metric-row">
                <span className="muted">Estimated Delay</span>
                <strong>11 min</strong>
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: "100%", marginTop: 18 }}>
              Simulate Response
            </button>

            <button className="btn" style={{ width: "100%", marginTop: 9 }}>
              <CheckCircle2 size={15} style={{ marginRight: 6 }} />
              Mark Resolved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}