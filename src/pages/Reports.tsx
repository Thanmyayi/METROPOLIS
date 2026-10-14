import {
  Activity,
  BarChart3,
  CarFront,
  Download,
  FileText,
  Gauge,
  TrendingUp,
} from "lucide-react";
import { useMemo } from "react";

import { useVehicleSimulation } from "../hooks/useVehicleSimulation";

export default function Reports() {
  const { vehicles } = useVehicleSimulation();

  const totalVehicles = vehicles.length;

  const movingVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Moving",
  ).length;

  const stoppedVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Stopped",
  ).length;

  const averageSpeed = useMemo(() => {
    if (vehicles.length === 0) {
      return 0;
    }

    return Math.round(
      vehicles.reduce(
        (total, vehicle) => total + vehicle.speed,
        0,
      ) / vehicles.length,
    );
  }, [vehicles]);

  const fastestVehicle = useMemo(() => {
    if (vehicles.length === 0) {
      return null;
    }

    return vehicles.reduce((fastest, vehicle) =>
      vehicle.speed > fastest.speed
        ? vehicle
        : fastest,
    );
  }, [vehicles]);

  const zoneCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    vehicles.forEach((vehicle) => {
      counts[vehicle.zone] =
        (counts[vehicle.zone] || 0) + 1;
    });

    return counts;
  }, [vehicles]);

  const movingPercentage =
    totalVehicles > 0
      ? Math.round(
          (movingVehicles / totalVehicles) * 100,
        )
      : 0;

  const stoppedPercentage =
    totalVehicles > 0
      ? Math.round(
          (stoppedVehicles / totalVehicles) * 100,
        )
      : 0;

  return (
    <div className="metropolis-page">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="page-header">
        <div>
          <h1 className="page-title">
            Operations Reports
          </h1>

          <p className="page-subtitle">
            Smart-city simulation performance and
            operational intelligence reports
          </p>
        </div>

        <button
          type="button"
          className="report-button"
          onClick={() => {
            window.print();
          }}
        >
          <Download size={15} />
          Export Report
        </button>
      </div>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <div className="grid-4">
        <ReportCard
          icon={<CarFront size={21} />}
          label="Total Vehicles"
          value={totalVehicles.toString()}
          description="Currently simulated"
        />

        <ReportCard
          icon={<Activity size={21} />}
          label="Moving Rate"
          value={`${movingPercentage}%`}
          description={`${movingVehicles} vehicles moving`}
        />

        <ReportCard
          icon={<Gauge size={21} />}
          label="Average Speed"
          value={`${averageSpeed} km/h`}
          description="Across all vehicles"
        />

        <ReportCard
          icon={<TrendingUp size={21} />}
          label="Fastest Vehicle"
          value={
            fastestVehicle
              ? `${fastestVehicle.speed} km/h`
              : "0 km/h"
          }
          description={
            fastestVehicle
              ? fastestVehicle.id
              : "No vehicle data"
          }
        />
      </div>

      {/* =================================================
          PERFORMANCE OVERVIEW
      ================================================= */}

      <div
        className="grid-2"
        style={{
          marginTop: 18,
          alignItems: "start",
        }}
      >
        {/* TRAFFIC PERFORMANCE */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Traffic Performance
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Current vehicle movement statistics
              </p>
            </div>

            <BarChart3 size={18} />
          </div>

          <div style={{ padding: 18 }}>
            <PerformanceRow
              label="Moving Vehicles"
              value={movingVehicles}
              total={totalVehicles}
              percentage={movingPercentage}
              type="good"
            />

            <PerformanceRow
              label="Stopped Vehicles"
              value={stoppedVehicles}
              total={totalVehicles}
              percentage={stoppedPercentage}
              type="warning"
            />

            <PerformanceRow
              label="Average Speed"
              value={averageSpeed}
              total={60}
              percentage={Math.min(
                Math.round(
                  (averageSpeed / 60) * 100,
                ),
                100,
              )}
              type="good"
              suffix=" km/h"
            />
          </div>
        </section>

        {/* SYSTEM SUMMARY */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                System Summary
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Current digital twin status
              </p>
            </div>

            <FileText size={18} />
          </div>

          <div style={{ padding: 18 }}>
            <SummaryRow
              label="Simulation Status"
              value="Running"
              status="good"
            />

            <SummaryRow
              label="Vehicle Engine"
              value="Connected"
              status="good"
            />

            <SummaryRow
              label="Traffic Engine"
              value="Active"
              status="good"
            />

            <SummaryRow
              label="Tracked Zones"
              value="3"
              status="good"
            />

            <SummaryRow
              label="System Mode"
              value="Digital Twin"
              status="good"
            />
          </div>
        </section>
      </div>

      {/* =================================================
          ZONE ANALYSIS
      ================================================= */}

      <section
        className="panel"
        style={{
          marginTop: 18,
        }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Zone Performance Report
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Simulated vehicle distribution across
              operational zones
            </p>
          </div>

          <Activity size={18} />
        </div>

        <div
          style={{
            padding: 18,
            display: "grid",
            gridTemplateColumns:
              "repeat(3, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          <ZoneReport
            name="Zone A"
            vehicles={
              zoneCounts["Zone A"] || 0
            }
            percentage={65}
            description="Normal traffic"
          />

          <ZoneReport
            name="Zone B"
            vehicles={
              zoneCounts["Zone B"] || 0
            }
            percentage={82}
            description="High traffic"
          />

          <ZoneReport
            name="Zone C"
            vehicles={
              zoneCounts["Zone C"] || 0
            }
            percentage={32}
            description="Low traffic"
          />
        </div>
      </section>

      {/* =================================================
          VEHICLE REPORT
      ================================================= */}

      <section
        className="panel"
        style={{
          marginTop: 18,
        }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Vehicle Performance Report
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Detailed operational status of simulated
              vehicles
            </p>
          </div>

          <span className="status status-low">
            {vehicles.length} VEHICLES
          </span>
        </div>

        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: 780,
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
                  Vehicle
                </th>

                <th style={tableHeader}>
                  Type
                </th>

                <th style={tableHeader}>
                  Road
                </th>

                <th style={tableHeader}>
                  Zone
                </th>

                <th style={tableHeader}>
                  Speed
                </th>

                <th style={tableHeader}>
                  Status
                </th>

                <th style={tableHeader}>
                  Performance
                </th>
              </tr>
            </thead>

            <tbody>
              {vehicles.slice(0, 10).map(
                (vehicle) => {
                  const performance =
                    vehicle.status ===
                    "Moving"
                      ? vehicle.speed >= 40
                        ? "High"
                        : "Normal"
                      : "Low";

                  return (
                    <tr key={vehicle.id}>
                      <td
                        style={
                          tableCell
                        }
                      >
                        <strong>
                          {vehicle.id}
                        </strong>
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {vehicle.type}
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {vehicle.road}
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {vehicle.zone}
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {vehicle.speed}{" "}
                        km/h
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        <span
                          className={
                            vehicle.status ===
                            "Moving"
                              ? "status status-low"
                              : "status status-medium"
                          }
                        >
                          {
                            vehicle.status
                          }
                        </span>
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        <span
                          className={
                            performance ===
                            "High"
                              ? "status status-low"
                              : performance ===
                                  "Normal"
                                ? "status status-medium"
                                : "status status-high"
                          }
                        >
                          {performance}
                        </span>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* =================================================
          REPORT FOOTER
      ================================================= */}

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

        METROPOLIS reporting engine is using the
        continuously simulated vehicle dataset.
      </div>
    </div>
  );
}

/* =========================================================
   REPORT CARD
========================================================= */

function ReportCard({
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
   PERFORMANCE ROW
========================================================= */

function PerformanceRow({
  label,
  value,
  total,
  percentage,
  type,
  suffix = "",
}: {
  label: string;
  value: number;
  total: number;
  percentage: number;
  type: "good" | "warning";
  suffix?: string;
}) {
  const safePercentage = Math.max(
    0,
    Math.min(percentage, 100),
  );

  return (
    <div
      style={{
        marginBottom: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
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
          {value}
          {suffix}{" "}
          {suffix === ""
            ? `/ ${total}`
            : ""}
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
            width: `${safePercentage}%`,
            height: "100%",
            borderRadius: 20,
            background:
              type === "warning"
                ? "#e5b45b"
                : "#31d29a",
            transition:
              "width .3s ease",
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   SUMMARY ROW
========================================================= */

function SummaryRow({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: "good" | "warning";
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
          width: 8,
          height: 8,
          borderRadius: "50%",
          background:
            status === "good"
              ? "#31d29a"
              : "#e5b45b",
          boxShadow:
            status === "good"
              ? "0 0 10px rgba(49,210,154,.45)"
              : "0 0 10px rgba(229,180,91,.35)",
        }}
      />

      <div
        style={{
          flex: 1,
          fontSize: 11,
          fontWeight: 600,
        }}
      >
        {label}
      </div>

      <span
        className={
          status === "good"
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
   ZONE REPORT
========================================================= */

function ZoneReport({
  name,
  vehicles,
  percentage,
  description,
}: {
  name: string;
  vehicles: number;
  percentage: number;
  description: string;
}) {
  return (
    <div
      style={{
        padding: 16,
        border:
          "1px solid rgba(100,160,190,.09)",
        borderRadius: 9,
        background:
          "rgba(10,28,36,.32)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {name}
        </span>

        <BarChart3
          size={15}
          color="#66828e"
        />
      </div>

      <div
        style={{
          marginTop: 16,
          display: "flex",
          alignItems: "baseline",
          gap: 6,
        }}
      >
        <span
          style={{
            fontSize: 25,
            fontWeight: 700,
          }}
        >
          {vehicles}
        </span>

        <span
          className="muted"
          style={{
            fontSize: 9,
          }}
        >
          vehicles
        </span>
      </div>

      <div
        style={{
          marginTop: 13,
          height: 6,
          borderRadius: 20,
          overflow: "hidden",
          background:
            "rgba(100,160,190,.10)",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            borderRadius: 20,
            background:
              percentage >= 70
                ? "#ef6a78"
                : percentage >= 40
                  ? "#e5b45b"
                  : "#31d29a",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          marginTop: 9,
        }}
      >
        <span
          className="muted"
          style={{
            fontSize: 9,
          }}
        >
          {description}
        </span>

        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
          }}
        >
          {percentage}%
        </span>
      </div>
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

/* =========================================================
   PRINT
========================================================= */

const reportButtonStyle = `
  .report-button {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 9px 13px;
    border: 1px solid rgba(20,190,235,.22);
    border-radius: 7px;
    background: rgba(20,190,235,.08);
    color: #9ddbe8;
    font-size: 10px;
    font-weight: 600;
    cursor: pointer;
  }
`;

if (
  typeof document !== "undefined" &&
  !document.getElementById(
    "metropolis-report-button-style",
  )
) {
  const style =
    document.createElement("style");

  style.id =
    "metropolis-report-button-style";

  style.textContent =
    reportButtonStyle;

  document.head.appendChild(
    style,
  );
}