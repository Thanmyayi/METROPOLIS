import {
  Activity,
  CarFront,
  CircleGauge,
  MapPin,
  Radio,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
import { useMemo } from "react";

import { useVehicleSimulation } from "../hooks/useVehicleSimulation";

export default function Traffic() {
  const { vehicles } = useVehicleSimulation();

  const movingVehicles = useMemo(
    () => vehicles.filter((vehicle) => vehicle.status === "Moving"),
    [vehicles],
  );

  const stoppedVehicles = useMemo(
    () => vehicles.filter((vehicle) => vehicle.status === "Stopped"),
    [vehicles],
  );

  const averageSpeed = useMemo(() => {
    if (vehicles.length === 0) {
      return 0;
    }

    return Math.round(
      vehicles.reduce((total, vehicle) => total + vehicle.speed, 0) /
        vehicles.length,
    );
  }, [vehicles]);

  const zoneData = useMemo(() => {
    const zones: Record<
      string,
      {
        vehicles: number;
        moving: number;
        stopped: number;
        averageSpeed: number;
      }
    > = {};

    vehicles.forEach((vehicle) => {
      if (!zones[vehicle.zone]) {
        zones[vehicle.zone] = {
          vehicles: 0,
          moving: 0,
          stopped: 0,
          averageSpeed: 0,
        };
      }

      zones[vehicle.zone].vehicles += 1;

      if (vehicle.status === "Moving") {
        zones[vehicle.zone].moving += 1;
      }

      if (vehicle.status === "Stopped") {
        zones[vehicle.zone].stopped += 1;
      }

      zones[vehicle.zone].averageSpeed += vehicle.speed;
    });

    Object.keys(zones).forEach((zone) => {
      if (zones[zone].vehicles > 0) {
        zones[zone].averageSpeed = Math.round(
          zones[zone].averageSpeed / zones[zone].vehicles,
        );
      }
    });

    return zones;
  }, [vehicles]);

  const trafficLevel = useMemo(() => {
    if (vehicles.length === 0) {
      return "Low";
    }

    const stoppedPercentage =
      (stoppedVehicles.length / vehicles.length) * 100;

    if (stoppedPercentage >= 40) {
      return "High";
    }

    if (stoppedPercentage >= 20) {
      return "Moderate";
    }

    return "Low";
  }, [vehicles.length, stoppedVehicles.length]);

  const getTrafficClass = (level: string) => {
    if (level === "High") {
      return "status status-high";
    }

    if (level === "Moderate") {
      return "status status-medium";
    }

    return "status status-low";
  };

  return (
    <div className="metropolis-page">
      {/* HEADER */}

      <div className="page-header">
        <div>
          <h1 className="page-title">Traffic Intelligence</h1>

          <p className="page-subtitle">
            Real-time simulated traffic monitoring and congestion analysis
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />
          TRAFFIC LIVE
        </div>
      </div>

      {/* KPI CARDS */}

      <div className="grid-4">
        <TrafficCard
          icon={<CarFront size={21} />}
          label="Total Vehicles"
          value={vehicles.length.toString()}
          description="Currently simulated"
        />

        <TrafficCard
          icon={<Radio size={21} />}
          label="Moving Vehicles"
          value={movingVehicles.length.toString()}
          description="Vehicles in motion"
        />

        <TrafficCard
          icon={<CircleGauge size={21} />}
          label="Average Speed"
          value={`${averageSpeed} km/h`}
          description="Across all vehicles"
        />

        <TrafficCard
          icon={<TriangleAlert size={21} />}
          label="Traffic Level"
          value={trafficLevel}
          description="Current simulation status"
        />
      </div>

      {/* TRAFFIC OVERVIEW */}

      <div
        className="grid-2"
        style={{
          marginTop: 18,
          alignItems: "start",
        }}
      >
        {/* CURRENT TRAFFIC STATUS */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">Current Traffic Status</h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Simulated city-wide traffic conditions
              </p>
            </div>

            <Activity size={18} />
          </div>

          <div style={{ padding: 18 }}>
            <TrafficStatusRow
              icon={<TrendingUp size={17} />}
              title="Overall Traffic"
              value={trafficLevel}
              className={getTrafficClass(trafficLevel)}
            />

            <TrafficStatusRow
              icon={<CarFront size={17} />}
              title="Moving Vehicles"
              value={`${movingVehicles.length} vehicles`}
              className="status status-low"
            />

            <TrafficStatusRow
              icon={<TriangleAlert size={17} />}
              title="Stopped Vehicles"
              value={`${stoppedVehicles.length} vehicles`}
              className={
                stoppedVehicles.length > 0
                  ? "status status-medium"
                  : "status status-low"
              }
            />

            <TrafficStatusRow
              icon={<CircleGauge size={17} />}
              title="Average Speed"
              value={`${averageSpeed} km/h`}
              className="status status-low"
            />

            <TrafficStatusRow
              icon={<Radio size={17} />}
              title="Simulation Engine"
              value="Active"
              className="status status-low"
            />
          </div>
        </section>

        {/* SPEED MONITOR */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">Speed Monitoring</h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Current vehicle speed distribution
              </p>
            </div>

            <CircleGauge size={18} />
          </div>

          <div style={{ padding: 18 }}>
            <SpeedBar
              label="Low Speed"
              value={
                vehicles.filter((vehicle) => vehicle.speed < 20).length
              }
              total={vehicles.length}
            />

            <SpeedBar
              label="Normal Speed"
              value={
                vehicles.filter(
                  (vehicle) => vehicle.speed >= 20 && vehicle.speed < 50,
                ).length
              }
              total={vehicles.length}
            />

            <SpeedBar
              label="High Speed"
              value={
                vehicles.filter((vehicle) => vehicle.speed >= 50).length
              }
              total={vehicles.length}
            />
          </div>
        </section>
      </div>

      {/* ZONE TRAFFIC */}

      <section
        className="panel"
        style={{ marginTop: 18 }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">Traffic by Zone</h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Vehicle activity across simulated zones
            </p>
          </div>

          <MapPin size={18} />
        </div>

        <div style={{ padding: 18 }}>
          {Object.keys(zoneData).length === 0 ? (
            <div
              className="muted"
              style={{
                padding: 25,
                textAlign: "center",
              }}
            >
              No vehicle data available.
            </div>
          ) : (
            Object.entries(zoneData).map(([zone, data]) => {
              const percentage =
                vehicles.length > 0
                  ? Math.round((data.vehicles / vehicles.length) * 100)
                  : 0;

              const zoneTraffic =
                data.stopped > data.moving
                  ? "High"
                  : data.stopped > 0
                    ? "Moderate"
                    : "Low";

              return (
                <div
                  key={zone}
                  style={{
                    marginBottom: 22,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        {zone}
                      </div>

                      <div
                        className="muted"
                        style={{
                          fontSize: 10,
                          marginTop: 3,
                        }}
                      >
                        {data.moving} moving · {data.stopped} stopped ·{" "}
                        {data.averageSpeed} km/h
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <span className={getTrafficClass(zoneTraffic)}>
                        {zoneTraffic}
                      </span>

                      <span
                        className="muted"
                        style={{
                          fontSize: 11,
                        }}
                      >
                        {data.vehicles} vehicles
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      height: 8,
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
                          zoneTraffic === "High"
                            ? "#ef6a78"
                            : zoneTraffic === "Moderate"
                              ? "#e5b45b"
                              : "#31d29a",
                        transition: "width .3s ease",
                      }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* LIVE TRAFFIC TABLE */}

      <section
        className="panel"
        style={{ marginTop: 18 }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">Live Traffic Monitor</h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Vehicle-level traffic information
            </p>
          </div>

          <span className="status status-low">LIVE</span>
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
              minWidth: 760,
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
                <th style={tableHeader}>Vehicle</th>
                <th style={tableHeader}>Road</th>
                <th style={tableHeader}>Zone</th>
                <th style={tableHeader}>Speed</th>
                <th style={tableHeader}>Status</th>
                <th style={tableHeader}>Traffic</th>
              </tr>
            </thead>

            <tbody>
              {vehicles.slice(0, 10).map((vehicle) => {
                const vehicleTraffic =
                  vehicle.status === "Stopped"
                    ? "High"
                    : vehicle.speed < 20
                      ? "Moderate"
                      : "Low";

                return (
                  <tr key={vehicle.id}>
                    <td style={tableCell}>
                      <strong>{vehicle.id}</strong>
                    </td>

                    <td style={tableCell}>{vehicle.road}</td>

                    <td style={tableCell}>{vehicle.zone}</td>

                    <td style={tableCell}>{vehicle.speed} km/h</td>

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

                    <td style={tableCell}>
                      <span className={getTrafficClass(vehicleTraffic)}>
                        {vehicleTraffic}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* FOOTER STATUS */}

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

        METROPOLIS traffic engine is continuously analyzing simulated vehicle
        movement and congestion.
      </div>

      <div
        style={{
          marginTop: 18,
          paddingBottom: 20,
          color: "#506b78",
          fontSize: 10,
        }}
      >
        Total vehicles: {vehicles.length} · Moving:{" "}
        {movingVehicles.length} · Stopped: {stoppedVehicles.length} · Mode:
        Digital Twin
      </div>
    </div>
  );
}

/* =========================================================
   TRAFFIC CARD
========================================================= */

function TrafficCard({
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

      <div className="kpi-value">{value}</div>

      <div className="kpi-change">{description}</div>
    </div>
  );
}

/* =========================================================
   TRAFFIC STATUS ROW
========================================================= */

function TrafficStatusRow({
  icon,
  title,
  value,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  className: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "13px 0",
        borderBottom: "1px solid rgba(100,160,190,.07)",
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

      <div
        style={{
          flex: 1,
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {title}
      </div>

      <span className={className}>{value}</span>
    </div>
  );
}

/* =========================================================
   SPEED BAR
========================================================= */

function SpeedBar({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  const percentage =
    total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div
      style={{
        marginBottom: 20,
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
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {label}
        </span>

        <span
          className="muted"
          style={{
            fontSize: 11,
          }}
        >
          {value} vehicles · {percentage}%
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
              label === "High Speed"
                ? "#ef6a78"
                : label === "Normal Speed"
                  ? "#31d29a"
                  : "#e5b45b",
            transition: "width .3s ease",
          }}
        />
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
  borderBottom: "1px solid rgba(100,160,190,.08)",
};

const tableCell: React.CSSProperties = {
  padding: "14px 16px",
  borderBottom: "1px solid rgba(100,160,190,.06)",
  fontSize: 11,
};