import {
  Activity,
  CarFront,
  ChevronRight,
  MapPin,
  Navigation,
  Radio,
  ShieldCheck,
  Users,
  Waves,
} from "lucide-react";
import { useMemo, useState } from "react";

import { useVehicleSimulation } from "../hooks/useVehicleSimulation";

type ZoneLevel =
  | "Low"
  |  | "Medium"
  | "High";

interface ZoneData {
  name: string;
  description: string;
  population: number;
  trafficLevel: ZoneLevel;
  capacity: number;
  roads: number;
  incidents: number;
}

const zones: ZoneData[] = [
  {
    name: "Zone A",
    description:
      "Central District and primary city operations area",
    population: 45000,
    trafficLevel: "Medium",
    capacity: 250,
    roads: 12,
    incidents: 2,
  },
  {
    name: "Zone B",
    description:
      "Business Hub with high commercial activity",
    population: 32000,
    trafficLevel: "High",
    capacity: 180,
    roads: 9,
    incidents: 4,
  },
  {
    name: "Zone C",
    description:
      "Residential Area with lower traffic density",
    population: 28000,
    trafficLevel: "Low",
    capacity: 160,
    roads: 8,
    incidents: 1,
  },
];

export default function Zones() {
  const {
    vehicles,
    selectedVehicleId,
    selectVehicle,
  } = useVehicleSimulation();

  const [selectedZone, setSelectedZone] =
    useState("Zone A");

  const activeZone =
    zones.find(
      (zone) =>
        zone.name === selectedZone,
    ) ?? zones[0];

  const zoneVehicles = useMemo(
    () =>
      vehicles.filter(
        (vehicle) =>
          vehicle.zone ===
          activeZone.name,
      ),
    [vehicles, activeZone.name],
  );

  const movingVehicles =
    zoneVehicles.filter(
      (vehicle) =>
        vehicle.status === "Moving",
    ).length;

  const stoppedVehicles =
    zoneVehicles.filter(
      (vehicle) =>
        vehicle.status === "Stopped",
    ).length;

  const averageSpeed =
    zoneVehicles.length > 0
      ? Math.round(
          zoneVehicles.reduce(
            (sum, vehicle) =>
              sum + vehicle.speed,
            0,
          ) /
            zoneVehicles.length,
        )
      : 0;

  const utilization =
    Math.min(
      100,
      Math.round(
        (zoneVehicles.length /
          activeZone.capacity) *
          100,
      ),
    );

  const highTrafficZones =
    zones.filter(
      (zone) =>
        zone.trafficLevel ===
        "High",
    ).length;

  return (
    <div className="metropolis-page">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="page-header">
        <div>
          <h1 className="page-title">
            Zone Operations
          </h1>

          <p className="page-subtitle">
            Monitor city zones, traffic density,
            population and operational activity
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />
          ZONE MONITORING LIVE
        </div>
      </div>

      {/* =====================================================
          KPI CARDS
      ====================================================== */}

      <div className="grid-4">
        <ZoneKpi
          icon={<MapPin size={21} />}
          label="Active Zones"
          value={zones.length.toString()}
          detail="City operational areas"
        />

        <ZoneKpi
          icon={<Users size={21} />}
          label="Population"
          value="105K"
          detail="Across monitored zones"
        />

        <ZoneKpi
          icon={<CarFront size={21} />}
          label="Active Vehicles"
          value={vehicles.length.toString()}
          detail="Live simulated fleet"
        />

        <ZoneKpi
          icon={<Activity size={21} />}
          label="High Traffic Zones"
          value={highTrafficZones.toString()}
          detail="Requires monitoring"
        />
      </div>

      {/* =====================================================
          ZONE CARDS
      ====================================================== */}

      <section
        style={{
          marginTop: 18,
        }}
      >
        <div
          style={{
            marginBottom: 10,
            color: "#688493",
            fontSize: 10,
            textTransform:
              "uppercase",
            letterSpacing:
              ".07em",
          }}
        >
          City Zone Overview
        </div>

        <div className="grid-3">
          {zones.map((zone) => {
            const zoneVehicleCount =
              vehicles.filter(
                (vehicle) =>
                  vehicle.zone ===
                  zone.name,
              ).length;

            const isSelected =
              zone.name ===
              selectedZone;

            return (
              <ZoneCard
                key={zone.name}
                zone={zone}
                vehicleCount={
                  zoneVehicleCount
                }
                selected={
                  isSelected
                }
                onClick={() =>
                  setSelectedZone(
                    zone.name,
                  )
                }
              />
            );
          })}
        </div>
      </section>

      {/* =====================================================
          ZONE DETAIL AREA
      ====================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1fr) 320px",
          gap: 16,
          marginTop: 18,
          alignItems:
            "start",
        }}
      >
        {/* ===================================================
            SELECTED ZONE
        ==================================================== */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                {activeZone.name}
                {" · "}
                Operational Detail
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 11,
                }}
              >
                {activeZone.description}
              </p>
            </div>

            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                gap: 6,
                color:
                  trafficColor(
                    activeZone.trafficLevel,
                  ),
                fontSize: 9,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius:
                    "50%",
                  background:
                    trafficColor(
                      activeZone.trafficLevel,
                    ),
                }}
              />

              {
                activeZone.trafficLevel
              }{" "}
              TRAFFIC
            </div>
          </div>

          <div
            style={{
              padding: 16,
            }}
          >
            {/* DETAIL METRICS */}

            <div className="grid-4">
              <MiniMetric
                icon={
                  <CarFront
                    size={17}
                  />
                }
                label="Vehicles"
                value={
                  zoneVehicles.length.toString()
                }
              />

              <MiniMetric
                icon={
                  <Radio
                    size={17}
                  />
                }
                label="Moving"
                value={
                  movingVehicles.toString()
                }
              />

              <MiniMetric
                icon={
                  <Activity
                    size={17}
                  />
                }
                label="Stopped"
                value={
                  stoppedVehicles.toString()
                }
              />

              <MiniMetric
                icon={
                  <Navigation
                    size={17}
                  />
                }
                label="Avg Speed"
                value={`${averageSpeed} km/h`}
              />
            </div>

            {/* CAPACITY */}

            <div
              style={{
                marginTop: 18,
                padding: 15,
                borderRadius: 8,
                border:
                  "1px solid rgba(100,160,190,.08)",
                background:
                  "rgba(5,20,32,.35)",
              }}
            >
              <div
                style={{
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    Vehicle Capacity
                  </div>

                  <div
                    className="muted"
                    style={{
                      marginTop: 4,
                      fontSize: 9,
                    }}
                  >
                    Current simulated fleet
                    utilization
                  </div>
                </div>

                <strong
                  style={{
                    fontSize: 16,
                  }}
                >
                  {utilization}%
                </strong>
              </div>

              <div
                style={{
                  height: 7,
                  marginTop: 12,
                  borderRadius: 20,
                  overflow:
                    "hidden",
                  background:
                    "rgba(100,160,190,.08)",
                }}
              >
                <div
                  style={{
                    width: `${utilization}%`,
                    height: "100%",
                    borderRadius:
                      20,
                    background:
                      utilization >
                      75
                        ? "#e5b45b"
                        : "#16c9ed",
                    transition:
                      "width .3s ease",
                  }}
                />
              </div>

              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  marginTop: 7,
                  color:
                    "#617b87",
                  fontSize: 8,
                }}
              >
                <span>
                  {zoneVehicles.length}{" "}
                  active
                </span>

                <span>
                  Capacity{" "}
                  {
                    activeZone.capacity
                  }
                </span>
              </div>
            </div>

            {/* ZONE INFORMATION */}

            <div
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "repeat(3, 1fr)",
                gap: 10,
                marginTop: 10,
              }}
            >
              <InfoBlock
                label="Population"
                value={formatNumber(
                  activeZone.population,
                )}
              />

              <InfoBlock
                label="Road Network"
                value={`${activeZone.roads} roads`}
              />

              <InfoBlock
                label="Incidents"
                value={activeZone.incidents.toString()}
              />
            </div>
          </div>
        </section>

        {/* ===================================================
            ZONE STATUS
        ==================================================== */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Zone Status
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 10,
                }}
              >
                Current operational condition
              </p>
            </div>

            <ShieldCheck size={18} />
          </div>

          <div
            style={{
              padding: 15,
            }}
          >
            <div
              style={{
                padding: 14,
                borderRadius: 8,
                border:
                  `1px solid ${trafficColor(
                    activeZone.trafficLevel,
                  )}25`,
                background:
                  `${trafficColor(
                    activeZone.trafficLevel,
                  )}08`,
              }}
            >
              <div
                style={{
                  display:
                    "flex",
                  alignItems:
                    "center",
                  gap: 9,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius:
                      "50%",
                    background:
                      trafficColor(
                        activeZone.trafficLevel,
                      ),
                    boxShadow:
                      `0 0 10px ${trafficColor(
                        activeZone.trafficLevel,
                      )}70`,
                  }}
                />

                <strong
                  style={{
                    fontSize: 13,
                  }}
                >
                  {
                    activeZone.trafficLevel
                  } Traffic
                </strong>
              </div>

              <p
                className="muted"
                style={{
                  marginTop: 9,
                  fontSize: 9,
                  lineHeight:
                    1.6,
                }}
              >
                Zone activity is being
                monitored by the METROPOLIS
                simulation engine.
              </p>
            </div>

            {/* STATUS ROWS */}

            <StatusRow
              label="Traffic Level"
              value={
                activeZone.trafficLevel
              }
              valueColor={trafficColor(
                activeZone.trafficLevel,
              )}
            />

            <StatusRow
              label="Vehicles"
              value={`${zoneVehicles.length} active`}
            />

            <StatusRow
              label="Average Speed"
              value={`${averageSpeed} km/h`}
            />

            <StatusRow
              label="Roads Monitored"
              value={activeZone.roads.toString()}
            />

            <StatusRow
              label="Incidents"
              value={activeZone.incidents.toString()}
              valueColor={
                activeZone.incidents >
                3
                  ? "#e5b45b"
                  : "#31d29a"
              }
            />
          </div>
        </section>
      </div>

      {/* =====================================================
          VEHICLES IN SELECTED ZONE
      ====================================================== */}

      <section
        className="panel"
        style={{
          marginTop: 18,
        }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Vehicles in {activeZone.name}
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 10,
              }}
            >
              Live simulated vehicles currently operating
              inside this zone
            </p>
          </div>

          <CarFront size={18} />
        </div>

        <div
          style={{
            padding: 15,
          }}
        >
          {zoneVehicles.length ===
          0 ? (
            <div
              style={{
                padding: 35,
                textAlign:
                  "center",
                color:
                  "#66818e",
                fontSize: 10,
              }}
            >
              No simulated vehicles are
              currently present in this zone.
            </div>
          ) : (
            <div
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "repeat(3, minmax(0, 1fr))",
                gap: 10,
              }}
            >
              {zoneVehicles.map(
                (vehicle) => {
                  const selected =
                    vehicle.id ===
                    selectedVehicleId;

                  return (
                    <button
                      type="button"
                      key={
                        vehicle.id
                      }
                      onClick={() =>
                        selectVehicle(
                          vehicle.id,
                        )
                      }
                      style={{
                        textAlign:
                          "left",
                        padding: 12,
                        borderRadius:
                          8,
                        border:
                          selected
                            ? "1px solid rgba(22,201,237,.35)"
                            : "1px solid rgba(100,160,190,.08)",
                        background:
                          selected
                            ? "rgba(20,190,235,.06)"
                            : "rgba(5,20,32,.30)",
                        color:
                          "#d8edf3",
                        cursor:
                          "pointer",
                      }}
                    >
                      <div
                        style={{
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "space-between",
                        }}
                      >
                        <strong
                          style={{
                            fontSize: 11,
                          }}
                        >
                          {
                            vehicle.id
                          }
                        </strong>

                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius:
                              "50%",
                            background:
                              vehicle.status ===
                              "Moving"
                                ? "#31d29a"
                                : "#e5b45b",
                          }}
                        />
                      </div>

                      <div
                        className="muted"
                        style={{
                          marginTop: 5,
                          fontSize: 9,
                        }}
                      >
                        {
                          vehicle.plate
                        }
                      </div>

                      <div
                        style={{
                          display:
                            "flex",
                          justifyContent:
                            "space-between",
                          marginTop: 10,
                          fontSize: 9,
                        }}
                      >
                        <span>
                          {
                            vehicle.speed
                          }{" "}
                          km/h
                        </span>

                        <span className="muted">
                          {
                            vehicle.direction
                          }
                        </span>
                      </div>
                    </button>
                  );
                },
              )}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          ZONE COMPARISON
      ====================================================== */}

      <section
        className="panel"
        style={{
          marginTop: 18,
          marginBottom: 20,
        }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Zone Comparison
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 10,
              }}
            >
              Operational indicators across all city zones
            </p>
          </div>

          <Waves size={18} />
        </div>

        <div
          style={{
            overflowX:
              "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse:
                "collapse",
              minWidth: 650,
            }}
          >
            <thead>
              <tr>
                <TableHeader>
                  Zone
                </TableHeader>

                <TableHeader>
                  Population
                </TableHeader>

                <TableHeader>
                  Vehicles
                </TableHeader>

                <TableHeader>
                  Traffic
                </TableHeader>

                <TableHeader>
                  Roads
                </TableHeader>

                <TableHeader>
                  Incidents
                </TableHeader>

                <TableHeader>
                  Action
                </TableHeader>
              </tr>
            </thead>

            <tbody>
              {zones.map(
                (zone) => {
                  const count =
                    vehicles.filter(
                      (vehicle) =>
                        vehicle.zone ===
                        zone.name,
                    ).length;

                  return (
                    <tr
                      key={
                        zone.name
                      }
                    >
                      <td
                        style={
                          tableCell
                        }
                      >
                        <strong
                          style={{
                            fontSize: 11,
                          }}
                        >
                          {
                            zone.name
                          }
                        </strong>

                        <div
                          className="muted"
                          style={{
                            marginTop: 3,
                            fontSize: 9,
                          }}
                        >
                          {
                            zone.description
                          }
                        </div>
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {formatNumber(
                          zone.population,
                        )}
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {count}
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        <span
                          style={{
                            color:
                              trafficColor(
                                zone.trafficLevel,
                              ),
                            fontSize: 10,
                            fontWeight: 600,
                          }}
                        >
                          {
                            zone.trafficLevel
                          }
                        </span>
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {zone.roads}
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {zone.incidents}
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedZone(
                              zone.name,
                            )
                          }
                          style={{
                            display:
                              "inline-flex",
                            alignItems:
                              "center",
                            gap: 5,
                            padding:
                              "6px 9px",
                            borderRadius:
                              5,
                            border:
                              "1px solid rgba(100,160,190,.12)",
                            background:
                              zone.name ===
                              selectedZone
                                ? "rgba(20,190,235,.08)"
                                : "rgba(5,20,32,.35)",
                            color:
                              zone.name ===
                              selectedZone
                                ? "#55dfff"
                                : "#8da9b5",
                            cursor:
                              "pointer",
                            fontSize: 9,
                          }}
                        >
                          View

                          <ChevronRight
                            size={11}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div
        style={{
          display:
            "flex",
          alignItems:
            "center",
          gap: 7,
          paddingBottom:
            20,
          color:
            "#607c89",
          fontSize: 10,
        }}
      >
        <Radio size={13} />

        METROPOLIS zone intelligence module ·
        simulated city operations active
      </div>
    </div>
  );
}

/* =========================================================
   KPI
========================================================= */

function ZoneKpi({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="panel kpi-card">
      {icon}

      <div
        className="kpi-label"
        style={{
          marginTop: 12,
        }}
      >
        {label}
      </div>

      <div className="kpi-value">
        {value}
      </div>

      <div
        className="kpi-change"
        style={{
          fontSize: 9,
        }}
      >
        {detail}
      </div>
    </div>
  );
}

/* =========================================================
   ZONE CARD
========================================================= */

function ZoneCard({
  zone,
  vehicleCount,
  selected,
  onClick,
}: {
  zone: ZoneData;
  vehicleCount: number;
  selected: boolean;
  onClick: () => void;
}) {
  const color =
    trafficColor(
      zone.trafficLevel,
    );

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: "left",
        padding: 0,
        borderRadius: 9,
        border: selected
          ? "1px solid rgba(22,201,237,.30)"
          : "1px solid rgba(100,160,190,.08)",
        background:
          selected
            ? "rgba(20,190,235,.045)"
            : "#061521",
        color: "#d8edf3",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 4,
          background: color,
        }}
      />

      <div
        style={{
          padding: 15,
        }}
      >
        <div
          style={{
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "space-between",
          }}
        >
          <div
            style={{
              display:
                "flex",
              alignItems:
                "center",
              gap: 9,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                display:
                  "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                background:
                  `${color}12`,
                color,
              }}
            >
              <MapPin size={18} />
            </div>

            <div>
              <strong
                style={{
                  fontSize: 12,
                }}
              >
                {zone.name}
              </strong>

              <div
                className="muted"
                style={{
                  marginTop: 3,
                  fontSize: 9,
                }}
              >
                {zone.roads} monitored
                roads
              </div>
            </div>
          </div>

          <ChevronRight
            size={16}
            style={{
              opacity: 0.5,
            }}
          />
        </div>

        <div
          className="muted"
          style={{
            marginTop: 13,
            fontSize: 9,
            lineHeight: 1.5,
          }}
        >
          {zone.description}
        </div>

        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: 7,
            marginTop: 13,
          }}
        >
          <SmallZoneMetric
            label="Population"
            value={formatNumber(
              zone.population,
            )}
          />

          <SmallZoneMetric
            label="Vehicles"
            value={vehicleCount.toString()}
          />
        </div>

        <div
          style={{
            display:
              "flex",
            alignItems:
              "center",
            justifyContent:
              "space-between",
            marginTop: 11,
            paddingTop: 10,
            borderTop:
              "1px solid rgba(100,160,190,.07)",
          }}
        >
          <span
            style={{
              color,
              fontSize: 9,
              fontWeight: 600,
            }}
          >
            {zone.trafficLevel} Traffic
          </span>

          <span
            className="muted"
            style={{
              fontSize: 9,
            }}
          >
            {zone.incidents} incidents
          </span>
        </div>
      </div>
    </button>
  );
}

/* =========================================================
   MINI METRIC
========================================================= */

function MiniMetric({
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
        padding: 11,
        borderRadius: 7,
        border:
          "1px solid rgba(100,160,190,.07)",
        background:
          "rgba(5,20,32,.32)",
      }}
    >
      <div
        style={{
          color: "#55dfff",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          marginTop: 8,
          fontSize: 15,
          fontWeight: 700,
        }}
      >
        {value}
      </div>

      <div
        className="muted"
        style={{
          marginTop: 3,
          fontSize: 8,
          textTransform:
            "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* =========================================================
   INFO BLOCK
========================================================= */

function InfoBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        padding: 11,
        borderRadius: 7,
        background:
          "rgba(5,20,32,.35)",
        border:
          "1px solid rgba(100,160,190,.07)",
      }}
    >
      <div
        className="muted"
        style={{
          fontSize: 8,
          textTransform:
            "uppercase",
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: 5,
          fontSize: 11,
          fontWeight: 600,
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
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div
      style={{
        display:
          "flex",
        justifyContent:
          "space-between",
        alignItems:
          "center",
        padding:
          "10px 0",
        borderBottom:
          "1px solid rgba(100,160,190,.06)",
      }}
    >
      <span
        className="muted"
        style={{
          fontSize: 9,
        }}
      >
        {label}
      </span>

      <strong
        style={{
          color:
            valueColor ||
            "#c8e0e8",
          fontSize: 10,
        }}
      >
        {value}
      </strong>
    </div>
  );
}

/* =========================================================
   SMALL ZONE METRIC
========================================================= */

function SmallZoneMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        padding: 8,
        borderRadius: 6,
        background:
          "rgba(5,20,32,.40)",
      }}
    >
      <div
        className="muted"
        style={{
          fontSize: 8,
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: 4,
          fontSize: 10,
          fontWeight: 600,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   TABLE HEADER
========================================================= */

function TableHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th
      style={{
        padding:
          "12px 14px",
        textAlign:
          "left",
        color:
          "#688493",
        fontSize: 9,
        fontWeight: 600,
        textTransform:
          "uppercase",
        letterSpacing:
          ".06em",
        borderBottom:
          "1px solid rgba(100,160,190,.08)",
      }}
    >
      {children}
    </th>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function trafficColor(
  level: ZoneLevel,
) {
  if (level === "High") {
    return "#ef6b73";
  }

  if (level === "Medium") {
    return "#e5b45b";
  }

  return "#31d29a";
}

function formatNumber(
  value: number,
) {
  return new Intl.NumberFormat(
    "en-IN",
  ).format(value);
}

const tableCell: React.CSSProperties = {
  padding:
    "13px 14px",
  borderBottom:
    "1px solid rgba(100,160,190,.06)",
  fontSize: 10,
  verticalAlign:
    "middle",
};