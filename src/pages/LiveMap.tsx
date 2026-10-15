import {
  Activity,
  CarFront,
  LocateFixed,
  Navigation,
  Radio,
  RefreshCw,
  Search,
  Signal,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

import { useVehicleSimulation } from "../hooks/useVehicleSimulation";

export default function LiveMap() {
  const { vehicles } = useVehicleSimulation();

  const [search, setSearch] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] =
    useState<string | null>(null);

  const filteredVehicles = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return vehicles;
    }

    return vehicles.filter((vehicle) =>
      [
        vehicle.id,
        vehicle.plate,
        vehicle.type,
        vehicle.road,
        vehicle.zone,
        vehicle.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [vehicles, search]);

  const selectedVehicle = vehicles.find(
    (vehicle) => vehicle.id === selectedVehicleId,
  );

  const movingVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Moving",
  ).length;

  const stoppedVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Stopped",
  ).length;

  return (
    <div className="metropolis-page">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="page-header">
        <div>
          <h1 className="page-title">
            Live Digital Twin
          </h1>

          <p className="page-subtitle">
            Real-time simulated vehicle tracking and
            smart-city traffic visualization
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />
          LIVE SIMULATION
        </div>
      </div>

      {/* =================================================
          TOP STATUS
      ================================================= */}

      <div className="grid-4">
        <MapCard
          icon={<CarFront size={21} />}
          label="Tracked Vehicles"
          value={vehicles.length.toString()}
          description="Active simulation objects"
        />

        <MapCard
          icon={<Navigation size={21} />}
          label="Moving"
          value={movingVehicles.toString()}
          description="Vehicles in motion"
        />

        <MapCard
          icon={<LocateFixed size={21} />}
          label="Stopped"
          value={stoppedVehicles.toString()}
          description="Stationary vehicles"
        />

        <MapCard
          icon={<Signal size={21} />}
          label="Connection"
          value="LIVE"
          description="Simulation engine connected"
        />
      </div>

      {/* =================================================
          MAIN MAP AREA
      ================================================= */}

      <section
        className="panel"
        style={{
          marginTop: 18,
          overflow: "hidden",
        }}
      >
        {/* MAP HEADER */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 15,
            padding: "14px 18px",
            borderBottom:
              "1px solid rgba(100,160,190,.08)",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3 className="panel-title">
              METROPOLIS City Map
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 4,
                fontSize: 10,
              }}
            >
              Simulated real-time vehicle positions
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "#6d8794",
                fontSize: 9,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#31d29a",
                }}
              />

              Moving
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "#6d8794",
                fontSize: 9,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#e5b45b",
                }}
              />

              Stopped
            </div>
          </div>
        </div>

        {/* MAP */}

        <div
          style={{
            position: "relative",
            height: 540,
            overflow: "hidden",
            background:
              "radial-gradient(circle at 50% 50%, rgba(20,190,235,.08), transparent 45%), #071218",
          }}
        >
          {/* GRID */}

          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.18,
              backgroundImage:
                "linear-gradient(rgba(90,170,195,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(90,170,195,.12) 1px, transparent 1px)",
              backgroundSize:
                "42px 42px",
            }}
          />

          {/* ROAD NETWORK */}

          <div
            style={{
              position: "absolute",
              left: "8%",
              right: "8%",
              top: "22%",
              height: 3,
              background:
                "rgba(90,160,180,.25)",
              boxShadow:
                "0 0 14px rgba(20,190,235,.10)",
              transform:
                "rotate(-7deg)",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "10%",
              right: "10%",
              top: "50%",
              height: 3,
              background:
                "rgba(90,160,180,.25)",
              boxShadow:
                "0 0 14px rgba(20,190,235,.10)",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "12%",
              right: "12%",
              top: "76%",
              height: 3,
              background:
                "rgba(90,160,180,.25)",
              transform:
                "rotate(6deg)",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "8%",
              bottom: "8%",
              left: "30%",
              width: 3,
              background:
                "rgba(90,160,180,.20)",
              transform:
                "rotate(4deg)",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "8%",
              bottom: "8%",
              left: "62%",
              width: 3,
              background:
                "rgba(90,160,180,.20)",
              transform:
                "rotate(-5deg)",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "12%",
              bottom: "12%",
              left: "82%",
              width: 3,
              background:
                "rgba(90,160,180,.16)",
            }}
          />

          {/* ZONES */}

          <ZoneLabel
            name="ZONE A"
            top="15%"
            left="14%"
          />

          <ZoneLabel
            name="ZONE B"
            top="43%"
            left="42%"
          />

          <ZoneLabel
            name="ZONE C"
            top="68%"
            left="70%"
          />

          {/* VEHICLE MARKERS */}

          {filteredVehicles.map(
            (vehicle, index) => {
              const left =
                14 +
                ((index * 17) % 72);

              const top =
                15 +
                ((index * 23) % 68);

              const isSelected =
                selectedVehicleId ===
                vehicle.id;

              return (
                <button
                  type="button"
                  key={vehicle.id}
                  onClick={() =>
                    setSelectedVehicleId(
                      vehicle.id,
                    )
                  }
                  title={`${vehicle.id} • ${vehicle.speed} km/h`}
                  style={{
                    position:
                      "absolute",
                    left: `${left}%`,
                    top: `${top}%`,
                    transform:
                      "translate(-50%, -50%)",
                    width: isSelected
                      ? 34
                      : 27,
                    height: isSelected
                      ? 34
                      : 27,
                    borderRadius: "50%",
                    border: isSelected
                      ? "2px solid rgba(255,255,255,.85)"
                      : "1px solid rgba(255,255,255,.22)",
                    background:
                      vehicle.status ===
                      "Moving"
                        ? "rgba(49,210,154,.88)"
                        : "rgba(229,180,91,.90)",
                    color: "#061015",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    cursor: "pointer",
                    boxShadow:
                      vehicle.status ===
                      "Moving"
                        ? "0 0 18px rgba(49,210,154,.42)"
                        : "0 0 18px rgba(229,180,91,.35)",
                    zIndex:
                      isSelected ? 10 : 3,
                  }}
                >
                  <CarFront
                    size={
                      isSelected
                        ? 16
                        : 13
                    }
                  />
                </button>
              );
            },
          )}

          {/* SEARCH */}

          <div
            style={{
              position:
                "absolute",
              top: 16,
              left: 16,
              width: 270,
              zIndex: 20,
            }}
          >
            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                gap: 8,
                padding:
                  "10px 12px",
                border:
                  "1px solid rgba(100,180,200,.15)",
                borderRadius: 8,
                background:
                  "rgba(5,15,20,.88)",
                backdropFilter:
                  "blur(10px)",
              }}
            >
              <Search
                size={14}
                color="#6f8d99"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target
                      .value,
                  )
                }
                placeholder="Search vehicle, plate, road..."
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  background:
                    "transparent",
                  color:
                    "#d9edf2",
                  fontSize: 10,
                }}
              />
            </div>

            {search &&
              filteredVehicles.length >
                0 && (
                <div
                  style={{
                    marginTop: 5,
                    maxHeight: 180,
                    overflowY:
                      "auto",
                    border:
                      "1px solid rgba(100,180,200,.12)",
                    borderRadius: 8,
                    background:
                      "rgba(5,15,20,.94)",
                    backdropFilter:
                      "blur(10px)",
                  }}
                >
                  {filteredVehicles
                    .slice(0, 6)
                    .map(
                      (
                        vehicle,
                      ) => (
                        <button
                          type="button"
                          key={
                            vehicle.id
                          }
                          onClick={() => {
                            setSelectedVehicleId(
                              vehicle.id,
                            );
                            setSearch(
                              vehicle.id,
                            );
                          }}
                          style={{
                            width: "100%",
                            border:
                              "none",
                            background:
                              "transparent",
                            color:
                              "#c8e0e7",
                            padding:
                              "9px 11px",
                            textAlign:
                              "left",
                            cursor:
                              "pointer",
                            fontSize: 10,
                          }}
                        >
                          <strong>
                            {
                              vehicle.id
                            }
                          </strong>

                          <span
                            className="muted"
                            style={{
                              marginLeft: 7,
                            }}
                          >
                            {
                              vehicle.road
                            }
                          </span>
                        </button>
                      ),
                    )}
                </div>
              )}
          </div>

          {/* MAP CONTROLS */}

          <div
            style={{
              position:
                "absolute",
              top: 16,
              right: 16,
              zIndex: 20,
              display:
                "flex",
              flexDirection:
                "column",
              gap: 7,
            }}
          >
            <MapControl
              icon={
                <LocateFixed
                  size={14}
                />
              }
            />

            <MapControl
              icon={
                <RefreshCw
                  size={14}
                />
              }
            />

            <MapControl
              icon={
                <Zap
                  size={14}
                />
              }
            />
          </div>

          {/* MAP FOOTER */}

          <div
            style={{
              position:
                "absolute",
              left: 16,
              bottom: 16,
              zIndex: 20,
              display:
                "flex",
              alignItems:
                "center",
              gap: 8,
              padding:
                "8px 11px",
              border:
                "1px solid rgba(100,180,200,.12)",
              borderRadius: 7,
              background:
                "rgba(5,15,20,.88)",
              color:
                "#718d98",
              fontSize: 9,
            }}
          >
            <Radio
              size={12}
            />

            Simulation engine
            updating vehicle
            positions
          </div>

          {/* SELECTED VEHICLE */}

          {selectedVehicle && (
            <div
              style={{
                position:
                  "absolute",
                right: 16,
                bottom: 16,
                width: 260,
                zIndex: 20,
                padding: 15,
                border:
                  "1px solid rgba(100,180,200,.15)",
                borderRadius: 9,
                background:
                  "rgba(5,15,20,.93)",
                backdropFilter:
                  "blur(12px)",
              }}
            >
              <div
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    {
                      selectedVehicle.id
                    }
                  </div>

                  <div
                    className="muted"
                    style={{
                      marginTop: 3,
                      fontSize: 9,
                    }}
                  >
                    {
                      selectedVehicle.plate
                    }
                  </div>
                </div>

                <span
                  className={
                    selectedVehicle.status ===
                    "Moving"
                      ? "status status-low"
                      : "status status-medium"
                  }
                >
                  {
                    selectedVehicle.status
                  }
                </span>
              </div>

              <div
                style={{
                  display:
                    "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gap: 10,
                  marginTop: 14,
                }}
              >
                <Detail
                  label="Type"
                  value={
                    selectedVehicle.type
                  }
                />

                <Detail
                  label="Speed"
                  value={`${selectedVehicle.speed} km/h`}
                />

                <Detail
                  label="Road"
                  value={
                    selectedVehicle.road
                  }
                />

                <Detail
                  label="Zone"
                  value={
                    selectedVehicle.zone
                  }
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =================================================
          VEHICLE LIST
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
              Live Vehicle Registry
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Select a vehicle to inspect its
              current simulation state
            </p>
          </div>

          <span className="status status-low">
            {filteredVehicles.length} TRACKED
          </span>
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
              minWidth: 760,
              borderCollapse:
                "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  color:
                    "#688493",
                  fontSize: 10,
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    ".06em",
                }}
              >
                <th
                  style={
                    tableHeader
                  }
                >
                  Vehicle
                </th>

                <th
                  style={
                    tableHeader
                  }
                >
                  Plate
                </th>

                <th
                  style={
                    tableHeader
                  }
                >
                  Type
                </th>

                <th
                  style={
                    tableHeader
                  }
                >
                  Road
                </th>

                <th
                  style={
                    tableHeader
                  }
                >
                  Zone
                </th>

                <th
                  style={
                    tableHeader
                  }
                >
                  Speed
                </th>

                <th
                  style={
                    tableHeader
                  }
                >
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredVehicles
                .slice(0, 10)
                .map(
                  (vehicle) => (
                    <tr
                      key={
                        vehicle.id
                      }
                      onClick={() =>
                        setSelectedVehicleId(
                          vehicle.id,
                        )
                      }
                      style={{
                        cursor:
                          "pointer",
                      }}
                    >
                      <td
                        style={
                          tableCell
                        }
                      >
                        <strong>
                          {
                            vehicle.id
                          }
                        </strong>
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {
                          vehicle.plate
                        }
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {
                          vehicle.type
                        }
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {
                          vehicle.road
                        }
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {
                          vehicle.zone
                        }
                      </td>

                      <td
                        style={
                          tableCell
                        }
                      >
                        {
                          vehicle.speed
                        }{" "}
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
                    </tr>
                  ),
                )}
            </tbody>
          </table>
        </div>
      </section>

      {/* =================================================
          FOOTER
      ================================================= */}

      <div
        style={{
          display:
            "flex",
          alignItems:
            "center",
          gap: 8,
          marginTop: 14,
          paddingBottom: 20,
          color:
            "#64808d",
          fontSize: 10,
        }}
      >
        <Activity
          size={13}
        />

        METROPOLIS digital twin continuously
        visualizes simulated vehicle movement,
        locations and traffic conditions.
      </div>
    </div>
  );
}

/* =========================================================
   MAP CARD
========================================================= */

function MapCard({
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
   ZONE LABEL
========================================================= */

function ZoneLabel({
  name,
  top,
  left,
}: {
  name: string;
  top: string;
  left: string;
}) {
  return (
    <div
      style={{
        position:
          "absolute",
        top,
        left,
        color:
          "rgba(125,185,200,.42)",
        fontSize: 9,
        fontWeight: 700,
        letterSpacing:
          ".12em",
        pointerEvents:
          "none",
      }}
    >
      {name}
    </div>
  );
}

/* =========================================================
   MAP CONTROL
========================================================= */

function MapControl({
  icon,
}: {
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      style={{
        width: 34,
        height: 34,
        border:
          "1px solid rgba(100,180,200,.14)",
        borderRadius: 7,
        background:
          "rgba(5,15,20,.88)",
        color:
          "#7b9aa5",
        display:
          "flex",
        alignItems:
          "center",
        justifyContent:
          "center",
        cursor:
          "pointer",
      }}
    >
      {icon}
    </button>
  );
}

/* =========================================================
   DETAIL
========================================================= */

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div
        className="muted"
        style={{
          fontSize: 8,
          textTransform:
            "uppercase",
          letterSpacing:
            ".08em",
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: 3,
          fontSize: 10,
          fontWeight: 600,
          whiteSpace:
            "nowrap",
          overflow:
            "hidden",
          textOverflow:
            "ellipsis",
        }}
      >
        {value}
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