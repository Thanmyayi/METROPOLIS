import {
  Activity,
  AlertTriangle,
  CarFront,
  CircleGauge,
  MapPin,
  Radio,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useMemo } from "react";

import { useVehicleSimulation } from "../hooks/useVehicleSimulation";

export default function Dashboard() {
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

  const zoneCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    vehicles.forEach((vehicle) => {
      counts[vehicle.zone] =
        (counts[vehicle.zone] || 0) + 1;
    });

    return counts;
  }, [vehicles]);

  return (
    <div className="metropolis-page">
      {/* HEADER */}

      <div className="page-header">
        <div>
          <h1 className="page-title">
            METROPOLIS Dashboard
          </h1>

          <p className="page-subtitle">
            AI-enabled digital twin and smart city simulation command center
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />
          SYSTEM LIVE
        </div>
      </div>

      {/* KPI CARDS */}

      <div className="grid-4">
        <DashboardCard
          icon={<CarFront size={22} />}
          label="Active Vehicles"
          value={totalVehicles.toString()}
          description="Simulated vehicles"
        />

        <DashboardCard
          icon={<Radio size={22} />}
          label="Moving Vehicles"
          value={movingVehicles.toString()}
          description="Currently moving"
        />

        <DashboardCard
          icon={<CircleGauge size={22} />}
          label="Average Speed"
          value={`${averageSpeed} km/h`}
          description="Across active vehicles"
        />

        <DashboardCard
          icon={<AlertTriangle size={22} />}
          label="Incidents"
          value="5"
          description="2 requiring attention"
        />
      </div>

      {/* MAIN CONTENT */}

      <div
        className="grid-2"
        style={{
          marginTop: 18,
          alignItems: "start",
        }}
      >
        {/* CITY STATUS */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                City Operations
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Current simulated operational status
              </p>
            </div>

            <Activity size={18} />
          </div>

          <div style={{ padding: 18 }}>
            <OperationRow
              icon={<ShieldCheck size={17} />}
              title="System Status"
              value="Operational"
              status="good"
            />

            <OperationRow
              icon={<CarFront size={17} />}
              title="Vehicle Simulation"
              value="Running"
              status="good"
            />

            <OperationRow
              icon={<Radio size={17} />}
              title="Real-Time Data Engine"
              value="Connected"
              status="good"
            />

            <OperationRow
              icon={<MapPin size={17} />}
              title="Digital Twin Map"
              value="Active"
              status="good"
            />

            <OperationRow
              icon={<AlertTriangle size={17} />}
              title="Incident Monitoring"
              value="2 Attention"
              status="warning"
            />
          </div>
        </section>

        {/* TRAFFIC SUMMARY */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Traffic Intelligence
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Simulated vehicle distribution by zone
              </p>
            </div>

            <TrendingUp size={18} />
          </div>

          <div style={{ padding: 18 }}>
            <ZoneTraffic
              name="Zone A"
              vehicles={zoneCounts["Zone A"] || 0}
              percentage={65}
            />

            <ZoneTraffic
              name="Zone B"
              vehicles={zoneCounts["Zone B"] || 0}
              percentage={82}
            />

            <ZoneTraffic
              name="Zone C"
              vehicles={zoneCounts["Zone C"] || 0}
              percentage={32}
            />
          </div>
        </section>
      </div>

      {/* VEHICLE MONITOR */}

      <section
        className="panel"
        style={{ marginTop: 18 }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Live Vehicle Monitor
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Continuously simulated vehicle activity
            </p>
          </div>

          <span className="status status-low">
            LIVE
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
              borderCollapse: "collapse",
              minWidth: 700,
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
                  Plate
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
              </tr>
            </thead>

            <tbody>
              {vehicles.slice(0, 6).map((vehicle) => (
                <tr key={vehicle.id}>
                  <td style={tableCell}>
                    <strong>{vehicle.id}</strong>
                  </td>

                  <td style={tableCell}>
                    {vehicle.plate}
                  </td>

                  <td style={tableCell}>
                    {vehicle.type}
                  </td>

                  <td style={tableCell}>
                    {vehicle.road}
                  </td>

                  <td style={tableCell}>
                    {vehicle.zone}
                  </td>

                  <td style={tableCell}>
                    {vehicle.speed} km/h
                  </td>

                  <td style={tableCell}>
                    <span
                      className={
                        vehicle.status === "Moving"
                          ? "status status-low"
                          : "status status-medium"
                      }
                    >
                      {vehicle.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* BOTTOM STATUS */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 14,
          color: "#64808d",
          fontSize: 10,
        }}
      >
        <Activity size={13} />

        METROPOLIS simulation engine is continuously updating vehicle
        positions and traffic conditions.
      </div>

      <div
        style={{
          marginTop: 20,
          paddingBottom: 20,
          color: "#506b78",
          fontSize: 10,
        }}
      >
        Stopped vehicles: {stoppedVehicles} · Active zones: 3 ·
        Simulation mode: Digital Twin
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD CARD
   ========================================================= */

function DashboardCard({
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
        style={{ marginTop: 14 }}
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
   OPERATION ROW
   ========================================================= */

function OperationRow({
  icon,
  title,
  value,
  status,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  status: "good" | "warning";
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "13px 0",
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
          background: "rgba(20,190,235,.06)",
        }}
      >
        {icon}
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {title}
        </div>
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
   ZONE TRAFFIC
   ========================================================= */

function ZoneTraffic({
  name,
  vehicles,
  percentage,
}: {
  name: string;
  vehicles: number;
  percentage: number;
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 7,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {name}
        </span>

        <span
          className="muted"
          style={{ fontSize: 11 }}
        >
          {vehicles} vehicles
        </span>
      </div>

      <div
        style={{
          height: 7,
          borderRadius: 20,
          background: "rgba(100,160,190,.10)",
          overflow: "hidden",
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
    </div>
  );
}

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