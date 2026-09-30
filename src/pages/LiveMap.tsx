import {
  Activity,
  CarFront,
  Layers,
  MapPin,
  Radio,
  Search,
} from "lucide-react";
import {
  Circle,
  MapContainer,
  Polygon,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";

import { useVehicleSimulation } from "../hooks/useVehicleSimulation";

function MapController({
  selectedVehicle,
}: {
  selectedVehicle:
    | ReturnType<typeof useVehicleSimulation>["vehicles"][number]
    | undefined;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedVehicle) {
      return;
    }

    map.flyTo(
      selectedVehicle.position,
      17,
      {
        duration: 0.8,
      },
    );
  }, [map, selectedVehicle]);

  return null;
}

export default function LiveMap() {
  const {
    vehicles,
    selectedVehicleId,
    selectVehicle,
    clearVehicleSelection,
  } = useVehicleSimulation();

  const [search, setSearch] = useState("");
  const [showZones, setShowZones] = useState(true);

  const selectedVehicle = vehicles.find(
    (vehicle) =>
      vehicle.id === selectedVehicleId,
  );

  const filteredVehicles = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return vehicles;
    }

    return vehicles.filter((vehicle) =>
      [
        vehicle.id,
        vehicle.plate,
        vehicle.type,
        vehicle.model,
        vehicle.road,
        vehicle.zone,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [vehicles, search]);

  const movingVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.status === "Moving",
  ).length;

  const stoppedVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.status === "Stopped",
  ).length;

  return (
    <div className="metropolis-page">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="page-header">
        <div>
          <h1 className="page-title">
            Live Digital Twin
          </h1>

          <p className="page-subtitle">
            Real-time simulated vehicle movement and city operations
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />
          LIVE MAP
        </div>
      </div>

      {/* =====================================================
          MAP STATISTICS
      ====================================================== */}

      <div className="grid-4">
        <MapStat
          icon={<CarFront size={20} />}
          label="Active Vehicles"
          value={vehicles.length.toString()}
        />

        <MapStat
          icon={<Radio size={20} />}
          label="Moving"
          value={movingVehicles.toString()}
        />

        <MapStat
          icon={<Activity size={20} />}
          label="Stopped"
          value={stoppedVehicles.toString()}
        />

        <MapStat
          icon={<MapPin size={20} />}
          label="Active Zones"
          value="3"
        />
      </div>

      {/* =====================================================
          MAP + CONTROL PANEL
      ====================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1fr) 300px",
          gap: 16,
          marginTop: 18,
          alignItems: "stretch",
        }}
      >
        {/* ===================================================
            MAP
        ==================================================== */}

        <section
          className="panel"
          style={{
            minHeight: 620,
            overflow: "hidden",
          }}
        >
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                City Simulation Map
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                OpenStreetMap digital twin with simulated moving vehicles
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                color: "#31d29a",
                fontSize: 10,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#31d29a",
                  boxShadow:
                    "0 0 8px rgba(49,210,154,.6)",
                }}
              />

              SIMULATION ACTIVE
            </div>
          </div>

          <div
            style={{
              height: 540,
              position: "relative",
            }}
          >
            <MapContainer
              center={[
                12.9725,
                77.5945,
              ]}
              zoom={16}
              scrollWheelZoom={true}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <MapController
                selectedVehicle={
                  selectedVehicle
                }
              />

              {/* Zone A */}

              {showZones && (
                <>
                  <Polygon
                    positions={[
                      [
                        12.975,
                        77.590,
                      ],
                      [
                        12.975,
                        77.598,
                      ],
                      [
                        12.969,
                        77.598,
                      ],
                      [
                        12.969,
                        77.590,
                      ],
                    ]}
                    pathOptions={{
                      color: "#16c9ed",
                      weight: 1,
                      fillOpacity: 0.08,
                    }}
                  />

                  {/* Zone B */}

                  <Polygon
                    positions={[
                      [
                        12.969,
                        77.590,
                      ],
                      [
                        12.969,
                        77.594,
                      ],
                      [
                        12.965,
                        77.594,
                      ],
                      [
                        12.965,
                        77.590,
                      ],
                    ]}
                    pathOptions={{
                      color: "#e5b45b",
                      weight: 1,
                      fillOpacity: 0.07,
                    }}
                  />

                  {/* Zone C */}

                  <Polygon
                    positions={[
                      [
                        12.969,
                        77.598,
                      ],
                      [
                        12.969,
                        77.603,
                      ],
                      [
                        12.965,
                        77.603,
                      ],
                      [
                        12.965,
                        77.598,
                      ],
                    ]}
                    pathOptions={{
                      color: "#31d29a",
                      weight: 1,
                      fillOpacity: 0.07,
                    }}
                  />
                </>
              )}

              {/* Central operating radius */}

              <Circle
                center={[
                  12.9725,
                  77.5945,
                ]}
                radius={650}
                pathOptions={{
                  color: "#16c9ed",
                  weight: 1,
                  opacity: 0.45,
                  fillOpacity: 0.025,
                }}
              />

              {/* Vehicle markers */}

              {vehicles.map(
                (vehicle) => {
                  const isSelected =
                    vehicle.id ===
                    selectedVehicleId;

                  return (
                    <Circle
                      key={vehicle.id}
                      center={
                        vehicle.position
                      }
                      radius={
                        isSelected
                          ? 15
                          : 9
                      }
                      eventHandlers={{
                        click: () =>
                          selectVehicle(
                            vehicle.id,
                          ),
                      }}
                      pathOptions={{
                        color:
                          isSelected
                            ? "#ffffff"
                            : vehicle.status ===
                                "Moving"
                              ? "#16c9ed"
                              : "#e5b45b",
                        fillColor:
                          vehicle.status ===
                          "Moving"
                            ? "#16c9ed"
                            : "#e5b45b",
                        fillOpacity:
                          isSelected
                            ? 1
                            : 0.8,
                        weight:
                          isSelected
                            ? 3
                            : 2,
                      }}
                    />
                  );
                },
              )}
            </MapContainer>

            {/* MAP LABEL */}

            <div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                zIndex: 500,
                padding:
                  "8px 11px",
                borderRadius: 7,
                background:
                  "rgba(2,9,18,.90)",
                border:
                  "1px solid rgba(80,170,205,.16)",
                backdropFilter:
                  "blur(8px)",
                color: "#d8edf3",
                fontSize: 10,
                letterSpacing: ".06em",
              }}
            >
              DIGITAL TWIN
            </div>

            {/* VEHICLE COUNT */}

            <div
              style={{
                position: "absolute",
                bottom: 14,
                left: 14,
                zIndex: 500,
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding:
                  "7px 10px",
                borderRadius: 7,
                background:
                  "rgba(2,9,18,.90)",
                border:
                  "1px solid rgba(80,170,205,.16)",
                color: "#c8e0e8",
                fontSize: 10,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius:
                    "50%",
                  background:
                    "#31d29a",
                }}
              />

              {vehicles.length} simulated vehicles
            </div>
          </div>
        </section>

        {/* ===================================================
            CONTROL PANEL
        ==================================================== */}

        <section
          className="panel"
          style={{
            minHeight: 620,
          }}
        >
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Map Controls
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 11,
                }}
              >
                Locate and inspect vehicles
              </p>
            </div>

            <Layers size={18} />
          </div>

          <div style={{ padding: 14 }}>
            {/* SEARCH */}

            <div
              style={{
                position:
                  "relative",
              }}
            >
              <Search
                size={15}
                style={{
                  position:
                    "absolute",
                  left: 11,
                  top: "50%",
                  transform:
                    "translateY(-50%)",
                  opacity: 0.55,
                }}
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target
                      .value,
                  )
                }
                placeholder="Search vehicle ID, plate, road..."
                style={{
                  width: "100%",
                  boxSizing:
                    "border-box",
                  padding:
                    "10px 10px 10px 34px",
                  borderRadius: 7,
                  border:
                    "1px solid rgba(80,170,205,.14)",
                  background:
                    "#061521",
                  color:
                    "#e8f8ff",
                  outline:
                    "none",
                  fontSize: 11,
                }}
              />
            </div>

            {/* ZONE TOGGLE */}

            <button
              type="button"
              onClick={() =>
                setShowZones(
                  !showZones,
                )
              }
              style={{
                width: "100%",
                marginTop: 10,
                padding:
                  "10px 11px",
                display: "flex",
                alignItems:
                  "center",
                gap: 9,
                borderRadius: 7,
                border:
                  "1px solid rgba(80,170,205,.10)",
                background:
                  showZones
                    ? "rgba(20,190,235,.06)"
                    : "rgba(5,20,32,.35)",
                color:
                  "#c8e0e8",
                cursor:
                  "pointer",
                fontSize: 11,
              }}
            >
              <Layers size={14} />

              Zone Boundaries

              <span
                style={{
                  marginLeft:
                    "auto",
                  fontSize: 10,
                  color:
                    showZones
                      ? "#31d29a"
                      : "#708792",
                }}
              >
                {showZones
                  ? "ON"
                  : "OFF"}
              </span>
            </button>

            {/* VEHICLE LIST TITLE */}

            <div
              style={{
                marginTop: 16,
                fontSize: 10,
                color: "#688493",
                textTransform:
                  "uppercase",
                letterSpacing:
                  ".06em",
              }}
            >
              Vehicles
            </div>

            {/* VEHICLE LIST */}

            <div
              style={{
                marginTop: 8,
                maxHeight: 400,
                overflowY:
                  "auto",
              }}
            >
              {filteredVehicles.length ===
              0 ? (
                <div
                  style={{
                    padding: 25,
                    textAlign:
                      "center",
                    color:
                      "#66818e",
                    fontSize: 11,
                  }}
                >
                  No vehicles found
                </div>
              ) : (
                filteredVehicles.map(
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
                          width:
                            "100%",
                          display:
                            "block",
                          textAlign:
                            "left",
                          padding: 11,
                          marginBottom:
                            7,
                          borderRadius:
                            7,
                          border:
                            selected
                              ? "1px solid rgba(24,201,239,.35)"
                              : "1px solid rgba(100,160,190,.07)",
                          background:
                            selected
                              ? "rgba(20,190,235,.07)"
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
                            justifyContent:
                              "space-between",
                            alignItems:
                              "center",
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
                              fontSize: 10,
                              color:
                                vehicle.status ===
                                "Moving"
                                  ? "#31d29a"
                                  : "#e5b45b",
                            }}
                          >
                            {
                              vehicle.status
                            }
                          </span>
                        </div>

                        <div
                          className="muted"
                          style={{
                            marginTop: 4,
                            fontSize: 10,
                          }}
                        >
                          {
                            vehicle.plate
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
                            vehicle.road
                          }{" "}
                          ·{" "}
                          {
                            vehicle.zone
                          }
                        </div>
                      </button>
                    );
                  },
                )
              )}
            </div>

            {/* SELECTED VEHICLE */}

            {selectedVehicle && (
              <div
                style={{
                  marginTop: 12,
                  padding: 12,
                  borderRadius: 8,
                  border:
                    "1px solid rgba(24,201,239,.15)",
                  background:
                    "rgba(20,190,235,.035)",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color:
                      "#688493",
                    textTransform:
                      "uppercase",
                    letterSpacing:
                      ".06em",
                  }}
                >
                  Selected Vehicle
                </div>

                <div
                  style={{
                    marginTop: 7,
                    fontSize: 14,
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
                    fontSize: 10,
                  }}
                >
                  {
                    selectedVehicle.plate
                  }
                </div>

                <div
                  style={{
                    display:
                      "grid",
                    gridTemplateColumns:
                      "1fr 1fr",
                    gap: 7,
                    marginTop: 10,
                  }}
                >
                  <SmallDetail
                    label="Type"
                    value={
                      selectedVehicle.type
                    }
                  />

                  <SmallDetail
                    label="Speed"
                    value={`${selectedVehicle.speed} km/h`}
                  />

                  <SmallDetail
                    label="Direction"
                    value={
                      selectedVehicle.direction
                    }
                  />

                  <SmallDetail
                    label="Status"
                    value={
                      selectedVehicle.status
                    }
                  />

                  <SmallDetail
                    label="Road"
                    value={
                      selectedVehicle.road
                    }
                  />

                  <SmallDetail
                    label="Zone"
                    value={
                      selectedVehicle.zone
                    }
                  />
                </div>

                <div
                  style={{
                    marginTop: 8,
                    padding: 8,
                    borderRadius: 6,
                    background:
                      "rgba(5,20,32,.45)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 8,
                      color:
                        "#617b87",
                      textTransform:
                        "uppercase",
                    }}
                  >
                    Coordinates
                  </div>

                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 9,
                      color:
                        "#c8e0e8",
                    }}
                  >
                    {
                      selectedVehicle.position[0]
                    }
                    {" , "}
                    {
                      selectedVehicle.position[1]
                    }
                  </div>
                </div>

                <button
                  type="button"
                  onClick={
                    clearVehicleSelection
                  }
                  style={{
                    width:
                      "100%",
                    marginTop: 10,
                    padding: 8,
                    borderRadius: 6,
                    border:
                      "1px solid rgba(100,160,190,.10)",
                    background:
                      "rgba(5,20,32,.45)",
                    color:
                      "#8da9b5",
                    cursor:
                      "pointer",
                    fontSize: 10,
                  }}
                >
                  Clear Selection
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div
        style={{
          display: "flex",
          alignItems:
            "center",
          gap: 7,
          marginTop: 13,
          paddingBottom: 20,
          color: "#607c89",
          fontSize: 10,
        }}
      >
        <Activity size={13} />

        Vehicle positions are continuously updated by the
        METROPOLIS simulation engine. This is simulated
        real-time tracking.
      </div>
    </div>
  );
}

/* =========================================================
   MAP STAT
   ========================================================= */

function MapStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
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

      <div
        className="kpi-value"
        style={{
          fontSize:
            value === "RUNNING"
              ? 20
              : undefined,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   SMALL DETAIL
   ========================================================= */

function SmallDetail({
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
          "rgba(5,20,32,.45)",
      }}
    >
      <div
        style={{
          fontSize: 8,
          color: "#617b87",
          textTransform:
            "uppercase",
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