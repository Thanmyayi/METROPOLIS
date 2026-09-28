import {
  AlertTriangle,
  Car,
  Clock,
  MapPin,
  ShieldAlert,
} from "lucide-react";

const incidents = [
  {
    id: "INC-001",
    title: "Road Closure",
    location: "Main Street, Zone A",
    severity: "High",
    time: "10:42 AM",
  },
  {
    id: "INC-002",
    title: "Vehicle Accident",
    location: "5th Cross, Zone C",
    severity: "Medium",
    time: "11:15 AM",
  },
  {
    id: "INC-003",
    title: "Traffic Congestion",
    location: "Ring Road, Zone B",
    severity: "Low",
    time: "12:05 PM",
  },
];

export default function Incidents() {
  return (
    <div className="metropolis-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Incident Management
          </h1>

          <p className="page-subtitle">
            Monitor active city incidents and alerts
          </p>
        </div>

        <span className="live-pill">
          <span className="live-dot" />
          LIVE MONITORING
        </span>
      </div>

      <div className="grid-4">
        <div className="panel kpi-card">
          <ShieldAlert />

          <span className="kpi-label">
            Active Incidents
          </span>

          <strong className="kpi-value">
            08
          </strong>
        </div>

        <div className="panel kpi-card">
          <AlertTriangle />

          <span className="kpi-label">
            High Severity
          </span>

          <strong className="kpi-value">
            02
          </strong>
        </div>

        <div className="panel kpi-card">
          <Car />

          <span className="kpi-label">
            Vehicle Incidents
          </span>

          <strong className="kpi-value">
            05
          </strong>
        </div>

        <div className="panel kpi-card">
          <Clock />

          <span className="kpi-label">
            Avg Response
          </span>

          <strong className="kpi-value">
            06 min
          </strong>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 18 }}>
        <div className="panel-header">
          <h3 className="panel-title">
            Active Incidents
          </h3>
        </div>

        <div className="incident-list">
          {incidents.map((incident) => (
            <div
              className="incident-row"
              key={incident.id}
            >
              <div
                className={`incident-icon ${
                  incident.severity === "High"
                    ? "danger"
                    : incident.severity ===
                      "Medium"
                    ? "warning"
                    : "normal"
                }`}
              >
                <AlertTriangle size={18} />
              </div>

              <div className="incident-main">
                <strong>
                  {incident.title}
                </strong>

                <span>
                  <MapPin size={12} />
                  {incident.location}
                </span>
              </div>

              <span className="incident-time">
                {incident.time}
              </span>

              <span
                className={`status ${
                  incident.severity === "High"
                    ? "status-high"
                    : incident.severity ===
                      "Medium"
                    ? "status-medium"
                    : "status-low"
                }`}
              >
                {incident.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}