import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  MapPin,
  Radio,
  ShieldAlert,
  Siren,
  TriangleAlert,
} from "lucide-react";

const incidents = [
  {
    id: "INC-001",
    type: "Traffic Collision",
    description:
      "Simulated vehicle collision detected near the central junction.",
    road: "MG Road",
    zone: "Zone A",
    severity: "High",
    status: "Active",
    time: "2 min ago",
  },
  {
    id: "INC-002",
    type: "Heavy Congestion",
    description:
      "Vehicle density has exceeded the configured congestion threshold.",
    road: "Main Road",
    zone: "Zone B",
    severity: "Medium",
    status: "Active",
    time: "8 min ago",
  },
  {
    id: "INC-003",
    type: "Vehicle Breakdown",
    description:
      "Simulated vehicle has remained stationary for an extended period.",
    road: "Park Road",
    zone: "Zone B",
    severity: "Low",
    status: "Active",
    time: "16 min ago",
  },
  {
    id: "INC-004",
    type: "Road Obstruction",
    description:
      "Temporary obstruction detected in the simulated road network.",
    road: "Ring Road",
    zone: "Zone C",
    severity: "Medium",
    status: "Resolved",
    time: "42 min ago",
  },
  {
    id: "INC-005",
    type: "Traffic Signal Alert",
    description:
      "Traffic signal simulation generated an abnormal timing event.",
    road: "Central Avenue",
    zone: "Zone A",
    severity: "Low",
    status: "Resolved",
    time: "1 hr ago",
  },
];

const severityStyles = {
  Critical: {
    className: "status-high",
    icon: <ShieldAlert size={13} />,
  },
  High: {
    className: "status-high",
    icon: <TriangleAlert size={13} />,
  },
  Medium: {
    className: "status-medium",
    icon: <AlertTriangle size={13} />,
  },
  Low: {
    className: "status-low",
    icon: <CheckCircle2 size={13} />,
  },
};

export default function Incidents() {
  const activeIncidents = incidents.filter(
    (incident) => incident.status === "Active"
  ).length;

  const resolvedIncidents = incidents.filter(
    (incident) => incident.status === "Resolved"
  ).length;

  const highPriority = incidents.filter(
    (incident) =>
      incident.severity === "High" ||
      incident.severity === "Critical"
  ).length;

  return (
    <div className="metropolis-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Incident Management</h1>

          <p className="page-subtitle">
            Monitor, analyze and manage simulated city incidents
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />
          INCIDENT MONITORING
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid-4">
        <div className="panel kpi-card">
          <Radio size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Active Incidents
          </div>

          <div className="kpi-value">
            {activeIncidents}
          </div>

          <div className="kpi-change">
            Requires monitoring
          </div>
        </div>

        <div className="panel kpi-card">
          <ShieldAlert size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            High Priority
          </div>

          <div className="kpi-value">
            {highPriority}
          </div>

          <div className="kpi-change">
            Priority incidents
          </div>
        </div>

        <div className="panel kpi-card">
          <CheckCircle2 size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Resolved
          </div>

          <div className="kpi-value">
            {resolvedIncidents}
          </div>

          <div className="kpi-change">
            Successfully closed
          </div>
        </div>

        <div className="panel kpi-card">
          <Clock3 size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Response Time
          </div>

          <div className="kpi-value">
            04:28
          </div>

          <div className="kpi-change">
            Average response
          </div>
        </div>
      </div>

      {/* INCIDENT OVERVIEW */}
      <div
        className="grid-2"
        style={{
          marginTop: 18,
          alignItems: "stretch",
        }}
      >
        {/* INCIDENT DISTRIBUTION */}
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Incident Distribution
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Current incidents by severity
              </p>
            </div>

            <AlertTriangle size={18} />
          </div>

          <div style={{ padding: 20 }}>
            <IncidentLevel
              label="Critical"
              value={0}
              total={incidents.length}
            />

            <IncidentLevel
              label="High"
              value={2}
              total={incidents.length}
            />

            <IncidentLevel
              label="Medium"
              value={2}
              total={incidents.length}
            />

            <IncidentLevel
              label="Low"
              value={1}
              total={incidents.length}
            />
          </div>
        </div>

        {/* INCIDENT RESPONSE */}
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Response Status
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Current operational response
              </p>
            </div>

            <Siren size={18} />
          </div>

          <div
            style={{
              padding: 20,
              display: "grid",
              gap: 12,
            }}
          >
            <ResponseCard
              title="Detection"
              value="Automatic"
              description="Simulation engine monitoring"
              active
            />

            <ResponseCard
              title="Location Tracking"
              value="Enabled"
              description="Incident coordinates available"
              active
            />

            <ResponseCard
              title="Response Team"
              value="Standby"
              description="No manual dispatch required"
              active
            />

            <ResponseCard
              title="System Status"
              value="Operational"
              description="Incident service functioning normally"
              active
            />
          </div>
        </div>
      </div>

      {/* INCIDENT TABLE */}
      <div
        className="panel"
        style={{ marginTop: 18 }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Incident Feed
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Latest incidents detected by the METROPOLIS simulation
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              fontSize: 12,
            }}
          >
            <span className="live-dot" />
            Live feed
          </div>
        </div>

        <div className="report-table-wrapper">
          <table className="report-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Incident</th>
                <th>Location</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Detected</th>
              </tr>
            </thead>

            <tbody>
              {incidents.map((incident) => {
                const severity =
                  severityStyles[
                    incident.severity as keyof typeof severityStyles
                  ];

                return (
                  <tr key={incident.id}>
                    <td>
                      <strong>{incident.id}</strong>
                    </td>

                    <td>
                      <div>
                        <strong>{incident.type}</strong>

                        <div
                          className="muted"
                          style={{
                            fontSize: 11,
                            marginTop: 4,
                            maxWidth: 300,
                          }}
                        >
                          {incident.description}
                        </div>
                      </div>
                    </td>

                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <MapPin size={14} />

                        <div>
                          <div>{incident.road}</div>

                          <div
                            className="muted"
                            style={{
                              fontSize: 11,
                              marginTop: 2,
                            }}
                          >
                            {incident.zone}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`status ${severity.className}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        {severity.icon}
                        {incident.severity}
                      </span>
                    </td>

                    <td>
                      {incident.status === "Active" ? (
                        <span
                          className="status status-high"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          <span className="live-dot" />
                          Active
                        </span>
                      ) : (
                        <span
                          className="status status-low"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          <CheckCircle2 size={12} />
                          Resolved
                        </span>
                      )}
                    </td>

                    <td className="muted">
                      {incident.time}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* INCIDENT MAP PREVIEW */}
      <div
        className="panel"
        style={{ marginTop: 18 }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Incident Locations
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Simulated incident locations across the digital twin
            </p>
          </div>

          <MapPin size={18} />
        </div>

        <div
          style={{
            margin: 20,
            height: 180,
            borderRadius: 10,
            border:
              "1px solid rgba(80,160,195,.12)",
            background:
              "linear-gradient(135deg, rgba(8,31,48,.95), rgba(3,15,27,.95))",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* ROAD LINES */}
          <div
            style={{
              position: "absolute",
              left: "8%",
              right: "8%",
              top: "50%",
              height: 1,
              background:
                "rgba(45,180,220,.25)",
              transform: "rotate(-8deg)",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "5%",
              bottom: "5%",
              width: 1,
              background:
                "rgba(45,180,220,.20)",
              transform: "rotate(12deg)",
            }}
          />

          {/* INCIDENT MARKERS */}
          <IncidentMarker
            left="27%"
            top="38%"
            severity="high"
          />

          <IncidentMarker
            left="63%"
            top="30%"
            severity="medium"
          />

          <IncidentMarker
            left="48%"
            top="67%"
            severity="low"
          />

          <IncidentMarker
            left="78%"
            top="66%"
            severity="medium"
          />

          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: 14,
              fontSize: 10,
              letterSpacing: ".08em",
              color: "#7d9aaa",
            }}
          >
            DIGITAL TWIN INCIDENT OVERLAY
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   INCIDENT LEVEL
   ========================================================= */

function IncidentLevel({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  const percentage =
    total === 0 ? 0 : (value / total) * 100;

  const className =
    label === "Critical" || label === "High"
      ? "status-high"
      : label === "Medium"
        ? "status-medium"
        : "status-low";

  return (
    <div style={{ marginBottom: 19 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 7,
        }}
      >
        <span>{label}</span>

        <strong>{value}</strong>
      </div>

      <div className="progress">
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div style={{ marginTop: 6 }}>
        <span className={`status ${className}`}>
          {percentage.toFixed(0)}% of incidents
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   RESPONSE CARD
   ========================================================= */

function ResponseCard({
  title,
  value,
  description,
  active,
}: {
  title: string;
  value: string;
  description: string;
  active: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 15,
        padding: 13,
        borderRadius: 8,
        border:
          "1px solid rgba(100,160,190,.10)",
        background: "rgba(5,20,32,.45)",
      }}
    >
      <div>
        <div
          style={{
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          {title}
        </div>

        <div
          className="muted"
          style={{
            marginTop: 4,
            fontSize: 11,
          }}
        >
          {description}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: active
              ? "#25d59b"
              : "#77838c",
          }}
        />

        {value}
      </div>
    </div>
  );
}

/* =========================================================
   INCIDENT MARKER
   ========================================================= */

function IncidentMarker({
  left,
  top,
  severity,
}: {
  left: string;
  top: string;
  severity: "high" | "medium" | "low";
}) {
  const color =
    severity === "high"
      ? "#ff5d6c"
      : severity === "medium"
        ? "#f2b84b"
        : "#25d59b";

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: 22,
        height: 22,
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: color,
        boxShadow: `0 0 18px ${color}`,
      }}
    >
      <AlertTriangle
        size={12}
        color="#06111a"
      />
    </div>
  );
}