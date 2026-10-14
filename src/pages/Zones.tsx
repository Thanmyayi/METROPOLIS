import {
  Activity,
  AlertTriangle,
  CarFront,
  CircleGauge,
  MapPin,
  Navigation,
  Radio,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useMemo } from "react";

import { useVehicleSimulation } from "../hooks/useVehicleSimulation";

interface ZoneData {
  name: string;
  description: string;
  capacity: number;
  trafficLevel: "Low" | "Medium" | "High";
  baseCongestion: number;
}

const zones: ZoneData[] = [
  {
    name: "Zone A",
    description: "Central Business District",
    capacity: 120,
    trafficLevel: "High",
    baseCongestion: 78,
  },
  {
    name: "Zone B",
    description: "Residential & Commercial Area",
    capacity: 100,
    trafficLevel: "Medium",
    baseCongestion: 54,
  },
  {
    name: "Zone C",
    description: "Airport & Industrial Corridor",
    capacity: 80,
    trafficLevel: "Low",
    baseCongestion: 32,
  },
];

export default function Zones() {
  const { vehicles } = useVehicleSimulation();

  const zoneStats = useMemo(() => {
    return zones.map((zone) => {
      const zoneVehicles = vehicles.filter(
        (vehicle) => vehicle.zone === zone.name,
      );

      const moving = zoneVehicles.filter(
        (vehicle) => vehicle.status === "Moving",
      ).length;

      const stopped = zoneVehicles.filter(
        (vehicle) => vehicle.status === "Stopped",
      ).length;

      const averageSpeed =
        zoneVehicles.length === 0
          ? 0
          : Math.round(
              zoneVehicles.reduce(
                (total, vehicle) =>
                  total + vehicle.speed,
                0,
              ) / zoneVehicles.length,
            );

      const occupancy = Math.min(
        100,
        Math.round(
          (zoneVehicles.length /
            zone.capacity) *
            100,
        ),
      );

      const congestion = Math.min(
        100,
        Math.max(
          zone.baseCongestion +
            Math.round(
              (zoneVehicles.length - 10) *
                1.5,
            ),
          5,
        ),
      );

      return {
        ...zone,
        vehicleCount: zoneVehicles.length,
        moving,
        stopped,
        averageSpeed,
        occupancy,
        congestion,
      };
    });
  }, [vehicles]);

  const totalVehicles = vehicles.length;

  const totalMoving = vehicles.filter(
    (vehicle) => vehicle.status === "Moving",
  ).length;

  const totalStopped = vehicles.filter(
    (vehicle) => vehicle.status === "Stopped",
  ).length;

  const averageSpeed =
    vehicles.length === 0
      ? 0
      : Math.round(
          vehicles.reduce(
            (total, vehicle) =>
              total + vehicle.speed,
            0,
          ) / vehicles.length,
        );

  const highestTrafficZone =
    [...zoneStats].sort(
      (a, b) =>
        b.congestion -
        a.congestion,
    )[0];

  return (
    <div className="metropolis-page">
      {/* =========================================
          HEADER
      ========================================= */}

      <div className="page-header">
        <div>
          <h1 className="page-title">
            Zone Intelligence
          </h1>

          <p className="page-subtitle">
            Monitor traffic, occupancy and vehicle
            activity across simulated city zones
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />
          ZONE MONITOR
        </div>
      </div>

      {/* =========================================
          KPI CARDS
      ========================================= */}

      <div className="grid-4">
        <ZoneCard
          icon={<MapPin size={21} />}
          label="Active Zones"
          value={zones.length.toString()}
          description="Digitally monitored"
        />

        <ZoneCard
          icon={<CarFront size={21} />}
          label="Total Vehicles"
          value={totalVehicles.toString()}
          description={`${totalMoving} currently moving`}
        />

        <ZoneCard
          icon={<CircleGauge size={21} />}
          label="Average Speed"
          value={`${averageSpeed} km/h`}
          description="Across all zones"
        />

        <ZoneCard
          icon={<AlertTriangle size={21} />}
          label="Highest Traffic"
          value={
            highestTrafficZone?.name ||
            "N/A"
          }
          description={
            highestTrafficZone
              ? `${highestTrafficZone.congestion}% congestion`
              : "No data"
          }
        />
      </div>

      {/* =========================================
          ZONE CARDS
      ========================================= */}

      <div
        className="grid-3"
        style={{
          marginTop: 18,
          alignItems: "stretch",
        }}
      >
        {zoneStats.map(
          (zone) => (
            <ZonePanel
              key={zone.name}
              zone={zone}
            />
          ),
        )}
      </div>

      {/* =========================================
          ZONE TABLE
      ========================================= */}

      <section
        className="panel"
        style={{
          marginTop: 18,
        }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Zone Operations
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Real-time simulated activity by
              monitored zone
            </p>
          </div>

          <Activity size={18} />
        </div>

        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: 850,
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
                  letterSpacing:
                    ".06em",
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
                  Occupancy
                </th>

                <th style={tableHeader}>
                  Congestion
                </th>

                <th style={tableHeader}>
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {zoneStats.map(
                (zone) => (
                  <tr
                    key={zone.name}
                  >
                    <td
                      style={
                        tableCell
                      }
                    >
                      <div
                        style={{
                          display:
                            "flex",
                          alignItems:
                            "center",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 7,
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            background:
                              "rgba(20,190,235,.07)",
                          }}
                        >
                          <MapPin
                            size={15}
                          />
                        </div>

                        <div>
                          <strong>
                            {
                              zone.name
                            }
                          </strong>

                          <div
                            className="muted"
                            style={{
                              fontSize: 9,
                              marginTop: 3,
                            }}
                          >
                            {
                              zone.description
                            }
                          </div>
                        </div>
                      </div>
                    </td>

                    <td
                      style={
                        tableCell
                      }
                    >
                      <strong>
                        {
                          zone.vehicleCount
                        }
                      </strong>
                    </td>

                    <td
                      style={
                        tableCell
                      }
                    >
                      <span className="status status-low">
                        {
                          zone.moving
                        }
                      </span>
                    </td>

                    <td
                      style={
                        tableCell
                      }
                    >
                      <span className="status status-medium">
                        {
                          zone.stopped
                        }
                      </span>
                    </td>

                    <td
                      style={
                        tableCell
                      }
                    >
                      {
                        zone.averageSpeed
                      }{" "}
                      km/h
                    </td>

                    <td
                      style={
                        tableCell
                      }
                    >
                      <div
                        style={{
                          minWidth: 100,
                        }}
                      >
                        <div
                          style={{
                            display:
                              "flex",
                            justifyContent:
                              "space-between",
                            marginBottom: 5,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 10,
                            }}
                          >
                            {
                              zone.occupancy
                            }
                            %
                          </span>
                        </div>

                        <ProgressBar
                          percentage={
                            zone.occupancy
                          }
                        />
                      </div>
                    </td>

                    <td
                      style={
                        tableCell
                      }
                    >
                      <span
                        className={`status ${getTrafficStatusClass(
                          zone.congestion,
                        )}`}
                      >
                        {
                          zone.congestion
                        }
                        %
                      </span>
                    </td>

                    <td
                      style={
                        tableCell
                      }
                    >
                      <span
                        className={`status ${getTrafficStatusClass(
                          zone.congestion,
                        )}`}
                      >
                        {getTrafficStatus(
                          zone.congestion,
                        )}
                      </span>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================
          TRAFFIC DISTRIBUTION
      ========================================= */}

      <div
        className="grid-2"
        style={{
          marginTop: 18,
          alignItems: "start",
        }}
      >
        {/* DISTRIBUTION */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Traffic Distribution
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Vehicle distribution across
                monitored zones
              </p>
            </div>

            <TrendingUp size={18} />
          </div>

          <div
            style={{
              padding: 18,
            }}
          >
            {zoneStats.map(
              (zone) => {
                const percentage =
                  totalVehicles ===
                  0
                    ? 0
                    : Math.round(
                        (zone.vehicleCount /
                          totalVehicles) *
                          100,
                      );

                return (
                  <div
                    key={
                      zone.name
                    }
                    style={{
                      marginBottom:
                        18,
                    }}
                  >
                    <div
                      style={{
                        display:
                          "flex",
                        justifyContent:
                          "space-between",
                        marginBottom:
                          7,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight:
                            600,
                        }}
                      >
                        {
                          zone.name
                        }
                      </span>

                      <span
                        className="muted"
                        style={{
                          fontSize: 10,
                        }}
                      >
                        {
                          zone.vehicleCount
                        }{" "}
                        vehicles ·{" "}
                        {
                          percentage
                        }
                        %
                      </span>
                    </div>

                    <ProgressBar
                      percentage={
                        percentage
                      }
                    />
                  </div>
                );
              },
            )}
          </div>
        </section>

        {/* SYSTEM STATUS */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Zone System Status
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Digital twin monitoring services
              </p>
            </div>

            <Radio size={18} />
          </div>

          <div
            style={{
              padding: 18,
            }}
          >
            <StatusRow
              icon={
                <ShieldCheck
                  size={16}
                />
              }
              title="Zone Monitoring"
              value="Active"
              good
            />

            <StatusRow
              icon={
                <Navigation
                  size={16}
                />
              }
              title="Vehicle Position Engine"
              value="Connected"
              good
            />

            <StatusRow
              icon={
                <Activity
                  size={16}
                />
              }
              title="Traffic Simulation"
              value="Running"
              good
            />

            <StatusRow
              icon={
                <AlertTriangle
                  size={16}
                />
              }
              title="Congestion Alerts"
              value={
                highestTrafficZone
                  ? highestTrafficZone.name
                  : "None"
              }
              good={
                !highestTrafficZone ||
                highestTrafficZone.congestion <
                  70
              }
            />
          </div>
        </section>
      </div>

      {/* =========================================
          BOTTOM STATUS
      ========================================= */}

      <div
        style={{
          display:
            "flex",
          alignItems:
            "center",
          gap: 8,
          marginTop: 14,
          paddingBottom: 20,
          color: "#64808d",
          fontSize: 10,
        }}
      >
        <Activity size={13} />

        METROPOLIS zone engine is continuously
        updating vehicle density, occupancy and
        congestion conditions.
      </div>

      <div
        style={{
          color: "#506b78",
          fontSize: 10,
          paddingBottom: 20,
        }}
      >
        Moving vehicles:{" "}
        {totalMoving} · Stopped vehicles:{" "}
        {totalStopped} · Monitored zones:{" "}
        {zones.length} · Simulation mode: Digital
        Twin
      </div>
    </div>
  );
}

/* =========================================================
   ZONE CARD
========================================================= */

function ZoneCard({
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
   ZONE PANEL
========================================================= */

function ZonePanel({
  zone,
}: {
  zone: ZoneData & {
    vehicleCount: number;
    moving: number;
    stopped: number;
    averageSpeed: number;
    occupancy: number;
    congestion: number;
  };
}) {
  return (
    <section className="panel">
      <div
        style={{
          padding: 18,
        }}
      >
        {/* HEADER */}

        <div
          style={{
            display:
              "flex",
            alignItems:
              "flex-start",
            justifyContent:
              "space-between",
            gap: 12,
          }}
        >
          <div
            style={{
              display:
                "flex",
              alignItems:
                "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 9,
                display:
                  "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                background:
                  "rgba(20,190,235,.07)",
              }}
            >
              <MapPin
                size={18}
              />
            </div>

            <div>
              <h3
                className="panel-title"
                style={{
                  fontSize: 14,
                }}
              >
                {zone.name}
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 4,
                  fontSize: 9,
                }}
              >
                {
                  zone.description
                }
              </p>
            </div>
          </div>

          <span
            className={`status ${getTrafficStatusClass(
              zone.congestion,
            )}`}
          >
            {getTrafficStatus(
              zone.congestion,
            )}
          </span>
        </div>

        {/* CONGESTION */}

        <div
          style={{
            marginTop: 20,
          }}
        >
          <div
            style={{
              display:
                "flex",
              justifyContent:
                "space-between",
              marginBottom: 7,
            }}
          >
            <span
              className="muted"
              style={{
                fontSize: 10,
              }}
            >
              Traffic congestion
            </span>

            <strong
              style={{
                fontSize: 11,
              }}
            >
              {zone.congestion}%
            </strong>
          </div>

          <ProgressBar
            percentage={
              zone.congestion
            }
          />
        </div>

        {/* STATS */}

        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: 10,
            marginTop: 18,
          }}
        >
          <MiniStat
            icon={
              <CarFront
                size={14}
              />
            }
            label="Vehicles"
            value={
              zone.vehicleCount.toString()
            }
          />

          <MiniStat
            icon={
              <CircleGauge
                size={14}
              />
            }
            label="Avg Speed"
            value={`${zone.averageSpeed} km/h`}
          />

          <MiniStat
            icon={
              <Activity
                size={14}
              />
            }
            label="Moving"
            value={
              zone.moving.toString()
            }
          />

          <MiniStat
            icon={
              <AlertTriangle
                size={14}
              />
            }
            label="Stopped"
            value={
              zone.stopped.toString()
            }
          />
        </div>

        {/* OCCUPANCY */}

        <div
          style={{
            marginTop: 18,
            paddingTop: 15,
            borderTop:
              "1px solid rgba(100,160,190,.07)",
          }}
        >
          <div
            style={{
              display:
                "flex",
              justifyContent:
                "space-between",
              marginBottom: 7,
            }}
          >
            <span
              className="muted"
              style={{
                fontSize: 10,
              }}
            >
              Zone occupancy
            </span>

            <span
              style={{
                fontSize: 10,
              }}
            >
              {zone.occupancy}%
            </span>
          </div>

          <ProgressBar
            percentage={
              zone.occupancy
            }
          />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        padding: 10,
        borderRadius: 7,
        background:
          "rgba(100,160,190,.035)",
        border:
          "1px solid rgba(100,160,190,.06)",
      }}
    >
      <div
        style={{
          display:
            "flex",
          alignItems:
            "center",
          gap: 6,
          color: "#64808d",
          fontSize: 9,
        }}
      >
        {icon}
        {label}
      </div>

      <div
        style={{
          marginTop: 6,
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   STATUS ROW
========================================================= */

function StatusRow({
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
        display:
          "flex",
        alignItems:
          "center",
        gap: 12,
        padding:
          "13px 0",
        borderBottom:
          "1px solid rgba(100,160,190,.07)",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          display:
            "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          background:
            good
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
        className={`status ${
          good
            ? "status-low"
            : "status-medium"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   PROGRESS BAR
========================================================= */

function ProgressBar({
  percentage,
}: {
  percentage: number;
}) {
  const safePercentage =
    Math.min(
      100,
      Math.max(
        0,
        percentage,
      ),
    );

  return (
    <div
      style={{
        height: 6,
        borderRadius: 20,
        overflow: "hidden",
        background:
          "rgba(100,160,190,.10)",
      }}
    >
      <div
        style={{
          width: `${safePercentage}%`,
          height: "100%",
          borderRadius: 20,
          background:
            safePercentage >= 70
              ? "#ef6a78"
              : safePercentage >= 40
                ? "#e5b45b"
                : "#31d29a",
          transition:
            "width .3s ease",
        }}
      />
    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function getTrafficStatus(
  congestion: number,
) {
  if (congestion >= 75) {
    return "High";
  }

  if (congestion >= 45) {
    return "Moderate";
  }

  return "Low";
}

function getTrafficStatusClass(
  congestion: number,
) {
  if (congestion >= 75) {
    return "status-high";
  }

  if (congestion >= 45) {
    return "status-medium";
  }

  return "status-low";
}

/* =========================================================
   TABLE STYLES
========================================================= */

const tableHeader: React.CSSProperties = {
  textAlign: "left",
  padding:
    "13px 16px",
  borderBottom:
    "1px solid rgba(100,160,190,.08)",
};

const tableCell: React.CSSProperties = {
  padding:
    "14px 16px",
  borderBottom:
    "1px solid rgba(100,160,190,.06)",
  fontSize: 11,
};