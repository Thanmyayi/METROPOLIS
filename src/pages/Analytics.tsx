import {
  Activity,
  BarChart3,
  CarFront,
  CircleGauge,
  MapPin,
  Radio,
  TrendingUp,
} from "lucide-react";
import { useMemo } from "react";

import { useVehicleSimulation } from "../hooks/useVehicleSimulation";

export default function Analytics() {
  const { vehicles } = useVehicleSimulation();

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

  const slowestVehicle = useMemo(() => {
    if (vehicles.length === 0) {
      return null;
    }

    return vehicles.reduce((slowest, vehicle) =>
      vehicle.speed < slowest.speed
        ? vehicle
        : slowest,
    );
  }, [vehicles]);

  const zoneData = useMemo(() => {
    const data: Record<
      string,
      {
        total: number;
        moving: number;
        stopped: number;
        speed: number;
      }
    > = {};

    vehicles.forEach((vehicle) => {
      if (!data[vehicle.zone]) {
        data[vehicle.zone] = {
          total: 0,
          moving: 0,
          stopped: 0,
          speed: 0,
        };
      }

      data[vehicle.zone].total += 1;
      data[vehicle.zone].speed += vehicle.speed;

      if (vehicle.status === "Moving") {
        data[vehicle.zone].moving += 1;
      } else {
        data[vehicle.zone].stopped += 1;
      }
    });

    Object.keys(data).forEach((zone) => {
      if (data[zone].total > 0) {
        data[zone].speed = Math.round(
          data[zone].speed /
            data[zone].total,
        );
      }
    });

    return data;
  }, [vehicles]);

  const vehicleTypeData = useMemo(() => {
    const data: Record<string, number> = {};

    vehicles.forEach((vehicle) => {
      data[vehicle.type] =
        (data[vehicle.type] || 0) + 1;
    });

    return data;
  }, [vehicles]);

  const trafficScore = useMemo(() => {
    if (vehicles.length === 0) {
      return 0;
    }

    const movingPercentage =
      (movingVehicles / vehicles.length) * 100;

    return Math.round(
      Math.max(
        0,
        Math.min(100, movingPercentage),
      ),
    );
  }, [
    movingVehicles,
    vehicles.length,
  ]);

  return (
    <div className="metropolis-page">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="page-header">
        <div>
          <h1 className="page-title">
            Analytics
          </h1>

          <p className="page-subtitle">
            Smart-city traffic analytics and
            simulation intelligence
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />
          ANALYTICS LIVE
        </div>
      </div>

      {/* =================================================
          KPI CARDS
      ================================================= */}

      <div className="grid-4">
        <AnalyticsCard
          icon={<CarFront size={21} />}
          label="Tracked Vehicles"
          value={vehicles.length.toString()}
          description="Vehicles in simulation"
        />

        <AnalyticsCard
          icon={<TrendingUp size={21} />}
          label="Moving Rate"
          value={`${trafficScore}%`}
          description="Vehicles currently moving"
        />

        <AnalyticsCard
          icon={<CircleGauge size={21} />}
          label="Average Speed"
          value={`${averageSpeed} km/h`}
          description="Fleet-wide average"
        />

        <AnalyticsCard
          icon={<MapPin size={21} />}
          label="Active Zones"
          value={Object.keys(
            zoneData,
          ).length.toString()}
          description="Zones with traffic"
        />
      </div>

      {/* =================================================
          TRAFFIC OVERVIEW
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
                Current simulation performance
              </p>
            </div>

            <BarChart3 size={18} />
          </div>

          <div style={{ padding: 18 }}>
            <AnalyticsMetric
              label="Moving Vehicles"
              value={movingVehicles}
              total={vehicles.length}
              suffix="vehicles"
              percentage={
                vehicles.length > 0
                  ? Math.round(
                      (movingVehicles /
                        vehicles.length) *
                        100,
                    )
                  : 0
              }
            />

            <AnalyticsMetric
              label="Stopped Vehicles"
              value={stoppedVehicles}
              total={vehicles.length}
              suffix="vehicles"
              percentage={
                vehicles.length > 0
                  ? Math.round(
                      (stoppedVehicles /
                        vehicles.length) *
                        100,
                    )
                  : 0
              }
            />

            <AnalyticsMetric
              label="Average Speed"
              value={averageSpeed}
              total={60}
              suffix="km/h"
              percentage={Math.min(
                100,
                Math.round(
                  (averageSpeed / 60) *
                    100,
                ),
              )}
            />
          </div>
        </section>

        {/* VEHICLE TYPES */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Vehicle Distribution
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Vehicle types in simulation
              </p>
            </div>

            <CarFront size={18} />
          </div>

          <div style={{ padding: 18 }}>
            {Object.keys(
              vehicleTypeData,
            ).length === 0 ? (
              <div
                className="muted"
                style={{
                  textAlign: "center",
                  padding: 30,
                  fontSize: 11,
                }}
              >
                No vehicle data available.
              </div>
            ) : (
              Object.entries(
                vehicleTypeData,
              ).map(
                ([type, count]) => {
                  const percentage =
                    vehicles.length > 0
                      ? Math.round(
                          (count /
                            vehicles.length) *
                            100,
                        )
                      : 0;

                  return (
                    <div
                      key={type}
                      style={{
                        marginBottom: 18,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          marginBottom: 7,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        >
                          {type}
                        </span>

                        <span
                          className="muted"
                          style={{
                            fontSize: 10,
                          }}
                        >
                          {count} ·{" "}
                          {percentage}%
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
                            background:
                              "#31d29a",
                          }}
                        />
                      </div>
                    </div>
                  );
                },
              )
            )}
          </div>
        </section>
      </div>

      {/* =================================================
          ZONE ANALYTICS
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
              Zone Analytics
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Traffic performance across city zones
            </p>
          </div>

          <MapPin size={18} />
        </div>

        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: 720,
              borderCollapse:
                "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  color: "#688493",
                  fontSize: 10,
                  textTransform:
                    "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                <th style={tableHeader}>
                  Zone
                </th>

                <th style={tableHeader}>
                  Vehicles
                </th>

                <th style={tableHeader}>
                  Moving
                </th>

                <th style={tableHeader}>
                  Stopped
                </th>

                <th style={tableHeader}>
                  Avg Speed
                </th>

                <th style={tableHeader}>
                  Condition
                </th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(
                zoneData,
              ).map(
                ([zone, data]) => {
                  const condition =
                    data.stopped >
                    data.moving
                      ? "High"
                      : data.stopped > 0
                        ? "Moderate"
                        : "Low";

                  return (
                    <tr key={zone}>
                      <td
                        style={
                          tableCell
                        }
                      >
                        <strong>
                          {zone}
                        </strong>
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {data.total}
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {data.moving}
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {data.stopped}
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {data.speed}{" "}
                        km/h
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        <span
                          className={
                            condition ===
                            "High"
                              ? "status status-high"
                              : condition ===
                                  "Moderate"
                                ? "status status-medium"
                                : "status status-low"
                          }
                        >
                          {condition}
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
          VEHICLE PERFORMANCE
      ================================================= */}

      <div
        className="grid-2"
        style={{
          marginTop: 18,
          alignItems: "start",
        }}
      >
        {/* FASTEST */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Fastest Vehicle
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Highest current simulated speed
              </p>
            </div>

            <TrendingUp size={18} />
          </div>

          <div style={{ padding: 20 }}>
            {fastestVehicle ? (
              <VehicleHighlight
                vehicleId={
                  fastestVehicle.id
                }
                road={
                  fastestVehicle.road
                }
                zone={
                  fastestVehicle.zone
                }
                speed={
                  fastestVehicle.speed
                }
                status={
                  fastestVehicle.status
                }
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </section>

        {/* SLOWEST */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Slowest Vehicle
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Lowest current simulated speed
              </p>
            </div>

            <Activity size={18} />
          </div>

          <div style={{ padding: 20 }}>
            {slowestVehicle ? (
              <VehicleHighlight
                vehicleId={
                  slowestVehicle.id
                }
                road={
                  slowestVehicle.road
                }
                zone={
                  slowestVehicle.zone
                }
                speed={
                  slowestVehicle.speed
                }
                status={
                  slowestVehicle.status
                }
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </section>
      </div>

      {/* =================================================
          SYSTEM STATUS
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
              Analytics Engine Status
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              METROPOLIS intelligence services
            </p>
          </div>

          <Radio size={18} />
        </div>

        <div
          style={{
            padding: 18,
            display: "grid",
            gridTemplateColumns:
              "repeat(3, 1fr)",
            gap: 12,
          }}
        >
          <SystemStatus
            title="Vehicle Data"
            value="Connected"
          />

          <SystemStatus
            title="Traffic Analysis"
            value="Running"
          />

          <SystemStatus
            title="Analytics Engine"
            value="Operational"
          />
        </div>
      </section>

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

        Analytics are generated from the live
        METROPOLIS vehicle simulation engine.
      </div>
    </div>
  );
}

/* =========================================================
   ANALYTICS CARD
========================================================= */

function AnalyticsCard({
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
   ANALYTICS METRIC
========================================================= */

function AnalyticsMetric({
  label,
  value,
  total,
  suffix,
  percentage,
}: {
  label: string;
  value: number;
  total: number;
  suffix: string;
  percentage: number;
}) {
  return (
    <div
      style={{
        marginBottom: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
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
          {value} {suffix}
          {total > 0 &&
            label !== "Average Speed" &&
            ` / ${total}`}
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
            background:
              "#31d29a",
            transition:
              "width .3s ease",
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   VEHICLE HIGHLIGHT
========================================================= */

function VehicleHighlight({
  vehicleId,
  road,
  zone,
  speed,
  status,
}: {
  vehicleId: string;
  road: string;
  zone: string;
  speed: number;
  status: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "auto 1fr auto",
        gap: 15,
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 9,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "rgba(20,190,235,.06)",
        }}
      >
        <CarFront size={21} />
      </div>

      <div>
        <strong
          style={{
            fontSize: 13,
          }}
        >
          {vehicleId}
        </strong>

        <div
          className="muted"
          style={{
            marginTop: 5,
            fontSize: 10,
          }}
        >
          {road} · {zone}
        </div>
      </div>

      <div
        style={{
          textAlign: "right",
        }}
      >
        <strong
          style={{
            fontSize: 18,
          }}
        >
          {speed}
        </strong>

        <div
          className="muted"
          style={{
            fontSize: 9,
          }}
        >
          km/h
        </div>

        <span
          className={
            status === "Moving"
              ? "status status-low"
              : "status status-medium"
          }
        >
          {status}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   SYSTEM STATUS
========================================================= */

function SystemStatus({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        padding: 15,
        border:
          "1px solid rgba(100,160,190,.08)",
        borderRadius: 9,
        background:
          "rgba(100,160,190,.025)",
      }}
    >
      <div
        className="muted"
        style={{
          fontSize: 10,
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          fontSize: 11,
          fontWeight: 600,
        }}
      >
        <span
          className="live-dot"
          style={{
            width: 6,
            height: 6,
          }}
        />

        {value}
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState() {
  return (
    <div
      className="muted"
      style={{
        textAlign: "center",
        padding: 25,
        fontSize: 11,
      }}
    >
      No vehicle data available.
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