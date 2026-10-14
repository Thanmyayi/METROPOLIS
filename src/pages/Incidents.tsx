import {
  Activity,
  AlertTriangle,
  CarFront,
  Clock,
  MapPin,
  Radio,
  ShieldAlert,
  Siren,
  TriangleAlert,
} from "lucide-react";
import { useMemo, useState } from "react";

import { useVehicleSimulation } from "../hooks/useVehicleSimulation";

type IncidentStatus = "Active" | "Resolved";
type IncidentSeverity = "High" | "Medium" | "Low";

type Incident = {
  id: string;
  type: string;
  location: string;
  zone: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  vehicles: number;
  time: string;
  description: string;
};

export default function Incidents() {
  const { vehicles } = useVehicleSimulation();

  const [statusFilter, setStatusFilter] = useState<
    "All" | IncidentStatus
  >("All");

  const [severityFilter, setSeverityFilter] = useState<
    "All" | IncidentSeverity
  >("All");

  const incidents = useMemo<Incident[]>(() => {
    const stoppedVehicles = vehicles.filter(
      (vehicle) => vehicle.status === "Stopped",
    );

    const generated: Incident[] = [];

    if (stoppedVehicles.length > 0) {
      const first = stoppedVehicles[0];

      generated.push({
        id: "INC-001",
        type: "Vehicle Congestion",
        location: first.road,
        zone: first.zone,
        severity:
          stoppedVehicles.length >= 5
            ? "High"
            : stoppedVehicles.length >= 2
              ? "Medium"
              : "Low",
        status: "Active",
        vehicles: stoppedVehicles.length,
        time: "Just now",
        description:
          "Multiple stopped vehicles detected in the simulated traffic network.",
      });
    }

    if (vehicles.length > 0) {
      const slowVehicles = vehicles.filter(
        (vehicle) => vehicle.speed < 20,
      );

      if (slowVehicles.length > 0) {
        const first = slowVehicles[0];

        generated.push({
          id: "INC-002",
          type: "Slow Traffic",
          location: first.road,
          zone: first.zone,
          severity:
            slowVehicles.length >= 6
              ? "High"
              : slowVehicles.length >= 3
                ? "Medium"
                : "Low",
          status: "Active",
          vehicles: slowVehicles.length,
          time: "2 min ago",
          description:
            "Low-speed vehicle activity detected in the monitored zone.",
        });
      }
    }

    if (vehicles.length >= 5) {
      const first = vehicles[0];

      generated.push({
        id: "INC-003",
        type: "Traffic Monitoring Alert",
        location: first.road,
        zone: first.zone,
        severity: "Low",
        status: "Resolved",
        vehicles: vehicles.length,
        time: "8 min ago",
        description:
          "Traffic conditions are being monitored by the digital twin engine.",
      });
    }

    return generated;
  }, [vehicles]);

  const filteredIncidents = incidents.filter((incident) => {
    const matchesStatus =
      statusFilter === "All" ||
      incident.status === statusFilter;

    const matchesSeverity =
      severityFilter === "All" ||
      incident.severity === severityFilter;

    return matchesStatus && matchesSeverity;
  });

  const activeCount = incidents.filter(
    (incident) => incident.status === "Active",
  ).length;

  const highCount = incidents.filter(
    (incident) => incident.severity === "High",
  ).length;

  const resolvedCount = incidents.filter(
    (incident) => incident.status === "Resolved",
  ).length;

  const getSeverityClass = (
    severity: IncidentSeverity,
  ) => {
    if (severity === "High") {
      return "status status-high";
    }

    if (severity === "Medium") {
      return "status status-medium";
    }

    return "status status-low";
  };

  const getStatusClass = (
    status: IncidentStatus,
  ) => {
    return status === "Active"
      ? "status status-medium"
      : "status status-low";
  };

  return (
    <div className="metropolis-page">
      {/* HEADER */}

      <div className="page-header">
        <div>
          <h1 className="page-title">
            Incident Intelligence
          </h1>

          <p className="page-subtitle">
            Real-time simulated incident detection,
            monitoring and response management
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />
          INCIDENT MONITORING
        </div>
      </div>

      {/* KPI CARDS */}

      <div className="grid-4">
        <IncidentCard
          icon={<TriangleAlert size={21} />}
          label="Total Incidents"
          value={incidents.length.toString()}
          description="Detected by simulation"
        />

        <IncidentCard
          icon={<Siren size={21} />}
          label="Active"
          value={activeCount.toString()}
          description="Currently requiring attention"
        />

        <IncidentCard
          icon={<ShieldAlert size={21} />}
          label="High Severity"
          value={highCount.toString()}
          description="Priority incidents"
        />

        <IncidentCard
          icon={<Activity size={21} />}
          label="Resolved"
          value={resolvedCount.toString()}
          description="Previously monitored"
        />
      </div>

      {/* OVERVIEW */}

      <div
        className="grid-2"
        style={{
          marginTop: 18,
          alignItems: "start",
        }}
      >
        {/* INCIDENT ENGINE */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Incident Detection Engine
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Current digital twin monitoring status
              </p>
            </div>

            <Radio size={18} />
          </div>

          <div style={{ padding: 18 }}>
            <IncidentStatusRow
              icon={<Radio size={16} />}
              title="Detection Engine"
              value="Active"
              good
            />

            <IncidentStatusRow
              icon={<Activity size={16} />}
              title="Vehicle Stream"
              value="Connected"
              good
            />

            <IncidentStatusRow
              icon={<TriangleAlert size={16} />}
              title="Incident Monitoring"
              value="Running"
              good
            />

            <IncidentStatusRow
              icon={<CarFront size={16} />}
              title="Vehicles Monitored"
              value={vehicles.length.toString()}
              good
            />
          </div>
        </section>

        {/* SEVERITY SUMMARY */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Severity Summary
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Current incident priority distribution
              </p>
            </div>

            <ShieldAlert size={18} />
          </div>

          <div style={{ padding: 18 }}>
            <SeverityRow
              label="High"
              value={
                incidents.filter(
                  (incident) =>
                    incident.severity === "High",
                ).length
              }
              total={incidents.length}
            />

            <SeverityRow
              label="Medium"
              value={
                incidents.filter(
                  (incident) =>
                    incident.severity === "Medium",
                ).length
              }
              total={incidents.length}
            />

            <SeverityRow
              label="Low"
              value={
                incidents.filter(
                  (incident) =>
                    incident.severity === "Low",
                ).length
              }
              total={incidents.length}
            />
          </div>
        </section>
      </div>

      {/* FILTERS */}

      <section
        className="panel"
        style={{
          marginTop: 18,
        }}
      >
        <div
          style={{
            padding: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <span
            className="muted"
            style={{
              fontSize: 10,
              marginRight: 4,
            }}
          >
            STATUS
          </span>

          <FilterButton
            active={statusFilter === "All"}
            onClick={() => setStatusFilter("All")}
          >
            All
          </FilterButton>

          <FilterButton
            active={statusFilter === "Active"}
            onClick={() =>
              setStatusFilter("Active")
            }
          >
            Active
          </FilterButton>

          <FilterButton
            active={statusFilter === "Resolved"}
            onClick={() =>
              setStatusFilter("Resolved")
            }
          >
            Resolved
          </FilterButton>

          <div
            style={{
              width: 1,
              height: 24,
              background:
                "rgba(100,160,190,.12)",
              margin: "0 6px",
            }}
          />

          <span
            className="muted"
            style={{
              fontSize: 10,
              marginRight: 4,
            }}
          >
            SEVERITY
          </span>

          <FilterButton
            active={severityFilter === "All"}
            onClick={() =>
              setSeverityFilter("All")
            }
          >
            All
          </FilterButton>

          <FilterButton
            active={severityFilter === "High"}
            onClick={() =>
              setSeverityFilter("High")
            }
          >
            High
          </FilterButton>

          <FilterButton
            active={severityFilter === "Medium"}
            onClick={() =>
              setSeverityFilter("Medium")
            }
          >
            Medium
          </FilterButton>

          <FilterButton
            active={severityFilter === "Low"}
            onClick={() =>
              setSeverityFilter("Low")
            }
          >
            Low
          </FilterButton>
        </div>
      </section>

      {/* INCIDENT REGISTRY */}

      <section
        className="panel"
        style={{
          marginTop: 18,
        }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Incident Registry
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              {filteredIncidents.length} incidents
              matching the selected filters
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <AlertTriangle size={15} />

            <span className="status status-low">
              MONITORING
            </span>
          </div>
        </div>

        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: 950,
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  color: "#688493",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                <th style={tableHeader}>
                  Incident
                </th>

                <th style={tableHeader}>
                  Type
                </th>

                <th style={tableHeader}>
                  Location
                </th>

                <th style={tableHeader}>
                  Zone
                </th>

                <th style={tableHeader}>
                  Vehicles
                </th>

                <th style={tableHeader}>
                  Severity
                </th>

                <th style={tableHeader}>
                  Status
                </th>

                <th style={tableHeader}>
                  Time
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredIncidents.length > 0 ? (
                filteredIncidents.map(
                  (incident) => (
                    <tr key={incident.id}>
                      <td style={tableCell}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <div
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: 8,
                              display: "flex",
                              alignItems: "center",
                              justifyContent:
                                "center",
                              background:
                                "rgba(239,106,120,.07)",
                            }}
                          >
                            <TriangleAlert
                              size={16}
                            />
                          </div>

                          <div>
                            <strong
                              style={{
                                fontSize: 11,
                              }}
                            >
                              {incident.id}
                            </strong>

                            <div
                              className="muted"
                              style={{
                                fontSize: 9,
                                marginTop: 3,
                              }}
                            >
                              Incident ID
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={tableCell}>
                        <strong
                          style={{
                            fontSize: 11,
                          }}
                        >
                          {incident.type}
                        </strong>

                        <div
                          className="muted"
                          style={{
                            fontSize: 9,
                            marginTop: 3,
                            maxWidth: 230,
                          }}
                        >
                          {incident.description}
                        </div>
                      </td>

                      <td style={tableCell}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          <MapPin size={13} />
                          {incident.location}
                        </div>
                      </td>

                      <td style={tableCell}>
                        <span className="status status-medium">
                          {incident.zone}
                        </span>
                      </td>

                      <td style={tableCell}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          <CarFront size={13} />
                          {incident.vehicles}
                        </div>
                      </td>

                      <td style={tableCell}>
                        <span
                          className={getSeverityClass(
                            incident.severity,
                          )}
                        >
                          {incident.severity}
                        </span>
                      </td>

                      <td style={tableCell}>
                        <span
                          className={getStatusClass(
                            incident.status,
                          )}
                        >
                          {incident.status}
                        </span>
                      </td>

                      <td style={tableCell}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          <Clock size={13} />
                          {incident.time}
                        </div>
                      </td>
                    </tr>
                  ),
                )
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      padding: "45px 20px",
                      textAlign: "center",
                      color: "#64808d",
                      fontSize: 12,
                    }}
                  >
                    No incidents found
                    matching the selected
                    filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* RESPONSE STATUS */}

      <div
        className="grid-2"
        style={{
          marginTop: 18,
          alignItems: "start",
        }}
      >
        <section className="panel">
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
                Automated incident response readiness
              </p>
            </div>

            <Siren size={18} />
          </div>

          <div style={{ padding: 18 }}>
            <ResponseRow
              title="Incident Detection"
              value="Online"
              good
            />

            <ResponseRow
              title="Traffic Monitoring"
              value="Active"
              good
            />

            <ResponseRow
              title="Vehicle Tracking"
              value="Connected"
              good
            />

            <ResponseRow
              title="Alert Processing"
              value="Ready"
              good
            />
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Incident Summary
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Current digital twin statistics
              </p>
            </div>

            <Activity size={18} />
          </div>

          <div style={{ padding: 18 }}>
            <SummaryItem
              label="Total Incidents"
              value={incidents.length}
            />

            <SummaryItem
              label="Active Incidents"
              value={activeCount}
            />

            <SummaryItem
              label="High Severity"
              value={highCount}
            />

            <SummaryItem
              label="Resolved Incidents"
              value={resolvedCount}
            />
          </div>
        </section>
      </div>

      {/* FOOTER */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 14,
          paddingBottom: 20,
          color: "#64808d",
          fontSize: 10,
        }}
      >
        <Activity size={13} />

        METROPOLIS incident intelligence engine
        continuously monitors simulated traffic
        activity and generates alerts.
      </div>
    </div>
  );
}

/* =========================================================
   INCIDENT CARD
========================================================= */

function IncidentCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="panel kpi-card">
      {icon}

      <div
        className="kpi-label"
        style={{
          marginTop: 14,
        }}
      >
        {label}
      </div>

      <div className="kpi-value">
        {value}
      </div>

      <div className="kpi-change">
        {description}
      </div>
    </div>
  );
}

/* =========================================================
   FILTER BUTTON
========================================================= */

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: active
          ? "1px solid rgba(20,190,235,.35)"
          : "1px solid rgba(100,160,190,.10)",
        background: active
          ? "rgba(20,190,235,.09)"
          : "rgba(100,160,190,.035)",
        color: active
          ? "#d8f8ff"
          : "#78929e",
        borderRadius: 7,
        padding: "8px 14px",
        fontSize: 10,
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

/* =========================================================
   INCIDENT STATUS ROW
========================================================= */

function IncidentStatusRow({
  icon,
  title,
  value,
  good,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  good: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 0",
        borderBottom:
          "1px solid rgba(100,160,190,.07)",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: good
            ? "rgba(49,210,154,.07)"
            : "rgba(239,106,120,.07)",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          flex: 1,
          fontSize: 11,
          fontWeight: 600,
        }}
      >
        {title}
      </div>

      <span
        className={
          good
            ? "status status-low"
            : "status status-medium"
        }
      >
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   SEVERITY ROW
========================================================= */

function SeverityRow({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  const percentage =
    total > 0
      ? Math.round((value / total) * 100)
      : 0;

  const background =
    label === "High"
      ? "#ef6a78"
      : label === "Medium"
        ? "#e5b45b"
        : "#31d29a";

  return (
    <div
      style={{
        marginBottom: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 7,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {label}
        </span>

        <span
          className="muted"
          style={{
            fontSize: 10,
          }}
        >
          {value} incidents · {percentage}%
        </span>
      </div>

      <div
        style={{
          height: 7,
          borderRadius: 20,
          background:
            "rgba(100,160,190,.10)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            borderRadius: 20,
            background,
            transition: "width .3s ease",
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   RESPONSE ROW
========================================================= */

function ResponseRow({
  title,
  value,
  good,
}: {
  title: string;
  value: string;
  good: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 0",
        borderBottom:
          "1px solid rgba(100,160,190,.07)",
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
        }}
      >
        {title}
      </span>

      <span
        className={
          good
            ? "status status-low"
            : "status status-medium"
        }
      >
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   SUMMARY ITEM
========================================================= */

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 0",
        borderBottom:
          "1px solid rgba(100,160,190,.07)",
      }}
    >
      <span
        className="muted"
        style={{
          fontSize: 10,
        }}
      >
        {label}
      </span>

      <strong
        style={{
          fontSize: 12,
        }}
      >
        {value}
      </strong>
    </div>
  );
}

/* =========================================================
   TABLE STYLES
========================================================= */

const tableHeader: React.CSSProperties = {
  textAlign: "left",
  padding: "13px 16px",
  borderBottom:
    "1px solid rgba(100,160,190,.08)",
};

const tableCell: React.CSSProperties = {
  padding: "14px 16px",
  borderBottom:
    "1px solid rgba(100,160,190,.06)",
  fontSize: 11,
};