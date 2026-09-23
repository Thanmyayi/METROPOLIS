import { useEffect, useMemo, useState } from "react";

import {
  Activity,
  BarChart3,
  Bell,
  Bike,
  Box,
  Car,
  ChevronDown,
  CircleAlert,
  CircleDot,
  Crosshair,
  Gauge,
  Layers,
  LocateFixed,
  Map,
  Minus,
  Navigation,
  Plus,
  Radio,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  TrafficCone,
  Truck,
  Users,
  Zap,
} from "lucide-react";

type Vehicle = {
  id: string;
  plate: string;
  type: string;
  speed: number;
  x: number;
  y: number;
};

const initialVehicles: Vehicle[] = [
  {
    id: "V001",
    plate: "KA-01-AB-1234",
    type: "Car",
    speed: 32,
    x: 28,
    y: 37,
  },
  {
    id: "V002",
    plate: "KA-01-CD-5621",
    type: "Bus",
    speed: 18,
    x: 52,
    y: 55,
  },
  {
    id: "V003",
    plate: "KA-01-EF-8934",
    type: "SUV",
    speed: 41,
    x: 67,
    y: 32,
  },
  {
    id: "V004",
    plate: "KA-05-GH-1245",
    type: "Bike",
    speed: 22,
    x: 76,
    y: 69,
  },
  {
    id: "V005",
    plate: "KA-03-JK-7412",
    type: "Car",
    speed: 28,
    x: 39,
    y: 72,
  },
  {
    id: "V006",
    plate: "KA-02-LM-4128",
    type: "Truck",
    speed: 21,
    x: 58,
    y: 26,
  },
];

const vehicleTypes = [
  {
    label: "Cars",
    value: 72,
    className: "chart-blue",
  },
  {
    label: "Buses",
    value: 18,
    className: "chart-purple",
  },
  {
    label: "Bikes",
    value: 28,
    className: "chart-pink",
  },
  {
    label: "Trucks",
    value: 10,
    className: "chart-yellow",
  },
];

export default function LiveMap() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(
    initialVehicles,
  );

  const [activeLayer, setActiveLayer] =
    useState("Vehicles");

  const [search, setSearch] = useState("");

  const [selectedVehicle, setSelectedVehicle] =
    useState<Vehicle | null>(initialVehicles[0]);

  /*
   * REAL-TIME VEHICLE SIMULATION
   */
  useEffect(() => {
    const timer = window.setInterval(() => {
      setVehicles((current) =>
        current.map((vehicle) => ({
          ...vehicle,

          x:
            vehicle.x > 91
              ? 10
              : vehicle.x + 0.28,

          speed: Math.max(
            12,
            Math.min(
              55,
              vehicle.speed +
                (Math.random() - 0.5) * 2.5,
            ),
          ),
        })),
      );
    }, 900);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  /*
   * KEEP SELECTED VEHICLE UPDATED
   */
  useEffect(() => {
    if (!selectedVehicle) {
      return;
    }

    const updatedVehicle = vehicles.find(
      (vehicle) =>
        vehicle.id === selectedVehicle.id,
    );

    if (updatedVehicle) {
      setSelectedVehicle(updatedVehicle);
    }
  }, [vehicles, selectedVehicle]);

  /*
   * SEARCH
   */
  const filteredVehicles = useMemo(() => {
    const query = search
      .toLowerCase()
      .trim();

    if (!query) {
      return vehicles;
    }

    return vehicles.filter(
      (vehicle) =>
        vehicle.id
          .toLowerCase()
          .includes(query) ||
        vehicle.plate
          .toLowerCase()
          .includes(query) ||
        vehicle.type
          .toLowerCase()
          .includes(query),
    );
  }, [vehicles, search]);

  /*
   * AVERAGE SPEED
   */
  const averageSpeed =
    vehicles.length > 0
      ? Math.round(
          vehicles.reduce(
            (total, vehicle) =>
              total + vehicle.speed,
            0,
          ) / vehicles.length,
        )
      : 0;

  return (
    <div className="metropolis-dashboard">
      {/* =====================================================
          MAIN AREA
      ====================================================== */}

      <main className="metro-main">
        {/* ===================================================
            TOP HEADER
        ==================================================== */}

        <header className="metro-topbar">
          <div className="topbar-left">
            <div className="topbar-title">
              <h1>Live City View</h1>

              <span className="live-pill">
                <span className="live-dot" />
                LIVE
              </span>
            </div>
          </div>

          <div className="topbar-right">
            <div className="topbar-time">
              <strong>
                {new Date().toLocaleTimeString()}
              </strong>

              <span>
                {new Date().toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  },
                )}
              </span>
            </div>

            <button
              className="topbar-icon"
              aria-label="Notifications"
            >
              <Bell size={17} />

              <span className="notification-dot" />
            </button>

            <button
              className="topbar-icon"
              aria-label="AI Assistant"
            >
              <Sparkles size={17} />
            </button>

            <div className="admin-profile">
              <div className="admin-avatar">
                A
              </div>

              <div>
                <strong>Admin</strong>

                <span>
                  City Planner
                </span>
              </div>

              <ChevronDown size={13} />
            </div>
          </div>
        </header>

        {/* ===================================================
            MAIN CONTENT
        ==================================================== */}

        <section className="metro-content">
          {/* =================================================
              TOP ROW
          ================================================== */}

          <div className="metro-top-grid">
            {/* =================================================
                CITY MAP
            ================================================== */}

            <section className="metro-map-card">
              <div className="city-map">
                <div className="map-atmosphere" />

                <div className="map-grid" />

                {/* ROADS */}

                <div
                  className="city-road city-road-horizontal"
                  style={{
                    top: "35%",
                  }}
                />

                <div
                  className="city-road city-road-horizontal"
                  style={{
                    top: "68%",
                  }}
                />

                <div
                  className="city-road city-road-vertical"
                  style={{
                    left: "43%",
                  }}
                />

                <div
                  className="city-road city-road-vertical"
                  style={{
                    left: "73%",
                  }}
                />

                <div className="city-road city-road-diagonal" />

                <div className="city-road city-road-diagonal-2" />

                {/* BUILDINGS */}

                <div
                  className="city-building city-building-tall"
                  style={{
                    left: "27%",
                    top: "25%",
                  }}
                />

                <div
                  className="city-building"
                  style={{
                    left: "17%",
                    top: "55%",
                  }}
                />

                <div
                  className="city-building city-building-tall-2"
                  style={{
                    left: "51%",
                    top: "8%",
                  }}
                />

                <div
                  className="city-building"
                  style={{
                    left: "67%",
                    top: "22%",
                  }}
                />

                <div
                  className="city-building"
                  style={{
                    left: "79%",
                    top: "48%",
                  }}
                />

                <div
                  className="city-building"
                  style={{
                    left: "58%",
                    top: "67%",
                  }}
                />

                <div
                  className="city-building-small"
                  style={{
                    left: "8%",
                    top: "25%",
                  }}
                />

                <div
                  className="city-building-small"
                  style={{
                    left: "37%",
                    top: "62%",
                  }}
                />

                {/* PARKS */}

                <div
                  className="city-park"
                  style={{
                    left: "77%",
                    top: "7%",
                  }}
                />

                <div
                  className="city-park city-park-large"
                  style={{
                    left: "50%",
                    top: "72%",
                  }}
                />

                <div
                  className="city-park"
                  style={{
                    left: "5%",
                    top: "72%",
                  }}
                />

                {/* ZONE LABELS */}

                <div
                  className="reference-zone-label"
                  style={{
                    left: "11%",
                    top: "15%",
                  }}
                >
                  <strong>
                    ZONE A
                  </strong>

                  <span>
                    Central District
                  </span>
                </div>

                <div
                  className="reference-zone-label"
                  style={{
                    left: "65%",
                    top: "12%",
                  }}
                >
                  <strong>
                    ZONE B
                  </strong>

                  <span>
                    Business Hub
                  </span>
                </div>

                <div
                  className="reference-zone-label"
                  style={{
                    left: "73%",
                    top: "40%",
                  }}
                >
                  <strong>
                    ZONE C
                  </strong>

                  <span>
                    Residential Area
                  </span>
                </div>

                <div
                  className="reference-zone-label"
                  style={{
                    left: "48%",
                    top: "67%",
                  }}
                >
                  <strong>
                    ZONE D
                  </strong>

                  <span>
                    Tech Park
                  </span>
                </div>

                {/* =================================================
                    VEHICLES
                ================================================== */}

                {activeLayer === "Vehicles" &&
                  filteredVehicles.map(
                    (vehicle) => {
                      const isSelected =
                        selectedVehicle?.id ===
                        vehicle.id;

                      return (
                        <button
                          key={vehicle.id}
                          className={`reference-vehicle ${
                            isSelected
                              ? "reference-vehicle-selected"
                              : ""
                          }`}
                          style={{
                            left: `${vehicle.x}%`,
                            top: `${vehicle.y}%`,
                          }}
                          onClick={() =>
                            setSelectedVehicle(
                              vehicle,
                            )
                          }
                          title={vehicle.plate}
                        >
                          <span className="vehicle-ring" />

                          <span className="vehicle-body">
                            {vehicle.type ===
                            "Bus" ? (
                              <Truck
                                size={11}
                              />
                            ) : vehicle.type ===
                              "Bike" ? (
                              <Bike
                                size={11}
                              />
                            ) : (
                              <Car
                                size={11}
                              />
                            )}
                          </span>
                        </button>
                      );
                    },
                  )}

                {/* =================================================
                    INCIDENT MARKERS
                ================================================== */}

                {activeLayer === "Incidents" && (
                  <>
                    <div
                      className="map-incident map-incident-red"
                      style={{
                        left: "39%",
                        top: "29%",
                      }}
                    >
                      <ShieldAlert
                        size={21}
                      />
                    </div>

                    <div
                      className="map-incident map-incident-yellow"
                      style={{
                        left: "66%",
                        top: "62%",
                      }}
                    >
                      <TrafficCone
                        size={21}
                      />
                    </div>
                  </>
                )}

                {/* =================================================
                    SELECTED VEHICLE CARD
                ================================================== */}

                {selectedVehicle &&
                  activeLayer ===
                    "Vehicles" && (
                    <div
                      className="selected-map-card"
                      style={{
                        left: `${Math.min(
                          Math.max(
                            selectedVehicle.x -
                              8,
                            5,
                          ),
                          72,
                        )}%`,

                        top: `${Math.min(
                          Math.max(
                            selectedVehicle.y -
                              17,
                            5,
                          ),
                          67,
                        )}%`,
                      }}
                    >
                      <div className="selected-map-card-close">
                        ×
                      </div>

                      <strong>
                        {
                          selectedVehicle.plate
                        }
                      </strong>

                      <span>
                        {
                          selectedVehicle.type
                        }{" "}
                        •{" "}
                        {selectedVehicle.speed.toFixed(
                          0,
                        )}{" "}
                        km/h
                      </span>

                      <span>
                        North-East
                      </span>

                      <b>
                        Moving
                      </b>
                    </div>
                  )}

                {/* =================================================
                    MAP CONTROLS
                ================================================== */}

                <div className="reference-map-controls">
                  <button
                    aria-label="Zoom in"
                  >
                    <Plus size={15} />
                  </button>

                  <button
                    aria-label="Zoom out"
                  >
                    <Minus size={15} />
                  </button>

                  <button
                    aria-label="3D view"
                  >
                    <span className="three-d">
                      3D
                    </span>
                  </button>

                  <button
                    aria-label="Center map"
                  >
                    <Crosshair
                      size={15}
                    />
                  </button>

                  <button
                    aria-label="Layers"
                  >
                    <Layers
                      size={15}
                    />
                  </button>

                  <button
                    aria-label="Locate"
                  >
                    <LocateFixed
                      size={15}
                    />
                  </button>
                </div>

                {/* =================================================
                    LAYER BAR
                ================================================== */}

                <div className="reference-layer-bar">
                  {[
                    {
                      label: "Map Style",
                      icon: Map,
                    },
                    {
                      label: "Heatmap",
                      icon: Activity,
                    },
                    {
                      label: "Traffic",
                      icon: Navigation,
                    },
                    {
                      label: "Incidents",
                      icon: ShieldAlert,
                    },
                    {
                      label: "Vehicles",
                      icon: Car,
                    },
                  ].map((layer) => {
                    const Icon =
                      layer.icon;

                    return (
                      <button
                        key={layer.label}
                        className={
                          activeLayer ===
                          layer.label
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          setActiveLayer(
                            layer.label,
                          )
                        }
                      >
                        <Icon
                          size={11}
                        />

                        {layer.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* =================================================
                RIGHT COLUMN
            ================================================== */}

            <aside className="metro-right-column">
              {/* =================================================
                  LIVE VEHICLES
              ================================================== */}

              <section className="reference-panel live-vehicles-panel">
                <div className="reference-panel-header">
                  <h3>
                    Live Vehicles
                  </h3>

                  <button>
                    View All
                  </button>
                </div>

                <div className="live-vehicle-content">
                  <div>
                    <span className="small-label">
                      Total Vehicles
                    </span>

                    <div className="large-number">
                      128

                      <span className="positive-change">
                        ↑ 12%
                      </span>
                    </div>

                    <span className="small-label active-now">
                      Active Now
                    </span>
                  </div>

                  <div className="donut-wrapper">
                    <div className="donut-chart">
                      <div className="donut-hole">
                        128
                      </div>
                    </div>
                  </div>

                  <div className="vehicle-legend">
                    {vehicleTypes.map(
                      (item) => (
                        <div
                          key={item.label}
                        >
                          <span
                            className={`legend-dot ${item.className}`}
                          />

                          <span>
                            {
                              item.label
                            }
                          </span>

                          <strong>
                            {item.value}
                          </strong>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </section>

              {/* =================================================
                  TRAFFIC STATUS
              ================================================== */}

              <section className="reference-panel traffic-status-panel">
                <div className="reference-panel-header">
                  <h3>
                    Traffic Status
                  </h3>

                  <span className="traffic-moderate">
                    ◉ Moderate
                  </span>
                </div>

                <div className="traffic-speed">
                  <span>
                    Average Speed
                  </span>

                  <div>
                    <strong>
                      {averageSpeed}
                    </strong>

                    <span>
                      {" "}
                      km/h
                    </span>

                    <b>
                      ↑ 5%
                    </b>
                  </div>
                </div>

                <div className="mini-chart">
                  <div className="chart-axis">
                    <span>
                      60
                    </span>

                    <span>
                      30
                    </span>

                    <span>
                      0
                    </span>
                  </div>

                  <div className="chart-lines">
                    <span
                      style={{
                        height: "24%",
                      }}
                    />

                    <span
                      style={{
                        height: "31%",
                      }}
                    />

                    <span
                      style={{
                        height: "37%",
                      }}
                    />

                    <span
                      style={{
                        height: "32%",
                      }}
                    />

                    <span
                      style={{
                        height: "46%",
                      }}
                    />

                    <span
                      style={{
                        height: "41%",
                      }}
                    />

                    <span
                      style={{
                        height: "61%",
                      }}
                    />

                    <span
                      style={{
                        height: "76%",
                      }}
                    />

                    <span
                      style={{
                        height: "65%",
                      }}
                    />

                    <span
                      style={{
                        height: "70%",
                      }}
                    />

                    <span
                      style={{
                        height: "66%",
                      }}
                    />
                  </div>
                </div>

                <div className="chart-time">
                  <span>
                    08 AM
                  </span>

                  <span>
                    10 AM
                  </span>

                  <span>
                    12 PM
                  </span>

                  <span>
                    02 PM
                  </span>

                  <span>
                    04 PM
                  </span>
                </div>
              </section>

              {/* =================================================
                  ACTIVE INCIDENTS
              ================================================== */}

              <section className="reference-panel incidents-panel">
                <div className="reference-panel-header">
                  <h3 className="danger-title">
                    Active Incidents
                  </h3>

                  <button>
                    View All
                  </button>
                </div>

                <div className="reference-incident">
                  <div className="incident-symbol danger">
                    <ShieldAlert
                      size={17}
                    />
                  </div>

                  <div>
                    <strong>
                      Road Closure
                    </strong>

                    <span>
                      Main Street,
                      Zone A
                    </span>
                  </div>

                  <em className="severity-high">
                    High
                  </em>
                </div>

                <div className="reference-incident">
                  <div className="incident-symbol warning">
                    <CircleAlert
                      size={17}
                    />
                  </div>

                  <div>
                    <strong>
                      Accident
                    </strong>

                    <span>
                      5th Cross,
                      Zone C
                    </span>
                  </div>

                  <em className="severity-medium">
                    Medium
                  </em>
                </div>
              </section>
            </aside>
          </div>

          {/* =================================================
              LOWER DASHBOARD
          ================================================== */}

          <div className="reference-bottom-grid">
            {/* =================================================
                DASHBOARD OVERVIEW
            ================================================== */}

            <section className="reference-panel overview-panel">
              <div className="reference-panel-header">
                <div className="panel-brand-title">
                  <span className="mini-brand-icon">
                    <Activity
                      size={13}
                    />
                  </span>

                  <h3>
                    Dashboard Overview
                  </h3>
                </div>

                <CircleDot
                  size={14}
                  className="muted"
                />
              </div>

              <div className="overview-kpis">
                <div>
                  <span>
                    Total Vehicles
                  </span>

                  <strong>
                    128{" "}
                    <b>
                      ↑ 12%
                    </b>
                  </strong>
                </div>

                <div>
                  <span>
                    Average Speed
                  </span>

                  <strong>
                    32{" "}
                    <small>
                      km/h
                    </small>{" "}
                    <b>
                      ↑ 5%
                    </b>
                  </strong>
                </div>

                <div>
                  <span>
                    Active Incidents
                  </span>

                  <strong>
                    08{" "}
                    <i>
                      ↓ 2
                    </i>
                  </strong>
                </div>

                <div>
                  <span>
                    AI Quality
                  </span>

                  <strong className="quality-good">
                    Good{" "}
                    <b>
                      ↑ 4%
                    </b>
                  </strong>
                </div>
              </div>

              <div className="overview-chart-grid">
                {/* TRAFFIC FLOW */}

                <div className="small-dashboard-chart">
                  <h4>
                    Traffic Flow
                  </h4>

                  <div className="purple-line-chart">
                    <span
                      style={{
                        height: "35%",
                      }}
                    />

                    <span
                      style={{
                        height: "43%",
                      }}
                    />

                    <span
                      style={{
                        height: "38%",
                      }}
                    />

                    <span
                      style={{
                        height: "55%",
                      }}
                    />

                    <span
                      style={{
                        height: "48%",
                      }}
                    />

                    <span
                      style={{
                        height: "64%",
                      }}
                    />

                    <span
                      style={{
                        height: "57%",
                      }}
                    />

                    <span
                      style={{
                        height: "76%",
                      }}
                    />

                    <span
                      style={{
                        height: "62%",
                      }}
                    />

                    <span
                      style={{
                        height: "81%",
                      }}
                    />
                  </div>

                  <div className="chart-time">
                    <span>
                      08 AM
                    </span>

                    <span>
                      10 AM
                    </span>

                    <span>
                      12 PM
                    </span>

                    <span>
                      02 PM
                    </span>

                    <span>
                      04 PM
                    </span>
                  </div>
                </div>

                {/* VEHICLE TYPES */}

                <div className="small-dashboard-chart vehicle-type-chart">
                  <h4>
                    Vehicles by Type
                  </h4>

                  <div className="mini-donut-row">
                    <div className="mini-donut">
                      <span>
                        128
                      </span>
                    </div>

                    <div className="mini-legend">
                      {vehicleTypes.map(
                        (item) => (
                          <div
                            key={
                              item.label
                            }
                          >
                            <span
                              className={`legend-dot ${item.className}`}
                            />

                            <span>
                              {
                                item.label
                              }
                            </span>

                            <b>
                              {
                                item.value
                              }
                            </b>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  ZONES + INCIDENT TREND
              ================================================== */}

              <div className="overview-bottom-grid">
                <div>
                  <h4>
                    Top Congested
                    Zones
                  </h4>

                  <div className="zone-ranking">
                    <div>
                      <span>
                        1
                      </span>

                      <strong>
                        Zone A
                      </strong>

                      <i>
                        <b
                          style={{
                            width: "72%",
                          }}
                        />
                      </i>

                      <em>
                        72%
                      </em>
                    </div>

                    <div>
                      <span>
                        2
                      </span>

                      <strong>
                        Zone B
                      </strong>

                      <i>
                        <b
                          style={{
                            width: "58%",
                          }}
                        />
                      </i>

                      <em>
                        58%
                      </em>
                    </div>

                    <div>
                      <span>
                        3
                      </span>

                      <strong>
                        Zone C
                      </strong>

                      <i>
                        <b
                          style={{
                            width: "41%",
                          }}
                        />
                      </i>

                      <em>
                        41%
                      </em>
                    </div>

                    <div>
                      <span>
                        4
                      </span>

                      <strong>
                        Zone D
                      </strong>

                      <i>
                        <b
                          style={{
                            width: "29%",
                          }}
                        />
                      </i>

                      <em>
                        29%
                      </em>
                    </div>
                  </div>
                </div>

                <div>
                  <h4>
                    Incident Trend
                  </h4>

                  <div className="incident-bars">
                    <span
                      style={{
                        height: "42%",
                      }}
                    />

                    <span
                      style={{
                        height: "70%",
                      }}
                    />

                    <span
                      style={{
                        height: "35%",
                      }}
                    />

                    <span
                      style={{
                        height: "58%",
                      }}
                    />

                    <span
                      style={{
                        height: "77%",
                      }}
                    />

                    <span
                      style={{
                        height: "38%",
                      }}
                    />

                    <span
                      style={{
                        height: "61%",
                      }}
                    />
                  </div>

                  <div className="chart-time">
                    <span>
                      08 AM
                    </span>

                    <span>
                      10 AM
                    </span>

                    <span>
                      12 PM
                    </span>

                    <span>
                      02 PM
                    </span>

                    <span>
                      04 PM
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                VEHICLE SEARCH
            ================================================== */}

            <section className="reference-panel vehicle-search-panel">
              <div className="reference-panel-header">
                <div className="panel-brand-title">
                  <span className="mini-brand-icon">
                    <Car
                      size={13}
                    />
                  </span>

                  <h3>
                    Vehicle Search &
                    Details
                  </h3>
                </div>

                <Users
                  size={14}
                  className="muted"
                />
              </div>

              <div className="vehicle-search-box">
                <Search
                  size={13}
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value,
                    )
                  }
                  placeholder="KA-01-AB-1234"
                />
              </div>

              <div className="vehicle-detail-content">
                {/* VEHICLE LIST */}

                <div className="vehicle-list">
                  {filteredVehicles
                    .slice(0, 4)
                    .map((vehicle) => (
                      <button
                        key={vehicle.id}
                        className={`vehicle-list-item ${
                          selectedVehicle?.id ===
                          vehicle.id
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedVehicle(
                            vehicle,
                          )
                        }
                      >
                        <div className="vehicle-list-icon">
                          {vehicle.type ===
                          "Bus" ? (
                            <Truck
                              size={13}
                            />
                          ) : vehicle.type ===
                            "Bike" ? (
                            <Bike
                              size={13}
                            />
                          ) : (
                            <Car
                              size={13}
                            />
                          )}
                        </div>

                        <div>
                          <strong>
                            {
                              vehicle.plate
                            }
                          </strong>

                          <span>
                            {
                              vehicle.type
                            }{" "}
                            •{" "}
                            {vehicle.speed.toFixed(
                              0,
                            )}{" "}
                            km/h
                          </span>

                          <small>
                            Main Road,
                            Zone A
                          </small>
                        </div>

                        <em>
                          Moving
                        </em>
                      </button>
                    ))}
                </div>

                {/* SELECTED VEHICLE */}

                <div className="selected-vehicle-details">
                  <span className="found-label">
                    Vehicle Found ✓
                  </span>

                  {selectedVehicle && (
                    <>
                      <h4>
                        {
                          selectedVehicle.plate
                        }
                      </h4>

                      <div className="vehicle-photo">
                        <Car
                          size={70}
                          strokeWidth={
                            1
                          }
                        />
                      </div>

                      <div className="vehicle-info-grid">
                        <div>
                          <span>
                            Vehicle Type
                          </span>

                          <strong>
                            {
                              selectedVehicle.type
                            }
                          </strong>
                        </div>

                        <div>
                          <span>
                            Model
                          </span>

                          <strong>
                            Swift Sedan
                          </strong>
                        </div>

                        <div>
                          <span>
                            Current
                            Location
                          </span>

                          <strong>
                            Main Road,
                            Zone A
                          </strong>
                        </div>

                        <div>
                          <span>
                            Speed
                          </span>

                          <strong>
                            {selectedVehicle.speed.toFixed(
                              0,
                            )}{" "}
                            km/h
                          </strong>
                        </div>

                        <div>
                          <span>
                            Direction
                          </span>

                          <strong>
                            North-East
                          </strong>
                        </div>

                        <div>
                          <span>
                            Status
                          </span>

                          <strong className="green-text">
                            Moving
                          </strong>
                        </div>

                        <div>
                          <span>
                            Last Updated
                          </span>

                          <strong>
                            {new Date().toLocaleTimeString()}
                          </strong>
                        </div>
                      </div>

                      <button
                        className="show-map-button"
                        onClick={() =>
                          setActiveLayer(
                            "Vehicles",
                          )
                        }
                      >
                        <Map
                          size={14}
                        />

                        Show on Map
                      </button>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* =================================================
                VEHICLE ON MAP
            ================================================== */}

            <section className="reference-panel vehicle-on-map-panel">
              <div className="reference-panel-header">
                <h3>
                  Vehicle on Map
                </h3>

                <span className="close-small">
                  ×
                </span>
              </div>

              <div className="mini-city-map">
                <div className="mini-road mini-road-1" />

                <div className="mini-road mini-road-2" />

                <div className="mini-road mini-road-3" />

                <div className="mini-map-park" />

                <div className="mini-selected-car">
                  <span />

                  <Car
                    size={15}
                  />
                </div>

                <div className="mini-map-popup">
                  <strong>
                    {selectedVehicle?.plate ??
                      "KA-01-AB-1234"}
                  </strong>

                  <span>
                    {selectedVehicle?.type ??
                      "Car"}{" "}
                    (Sedan)
                  </span>

                  <b>
                    {selectedVehicle?.speed.toFixed(
                      0,
                    ) ?? "32"}{" "}
                    km/h
                  </b>

                  <span>
                    North-East
                  </span>

                  <em>
                    Moving
                  </em>
                </div>

                <div className="mini-map-controls">
                  <button>
                    <Plus size={13} />
                  </button>

                  <button>
                    <Minus size={13} />
                  </button>

                  <button>
                    <span>
                      3D
                    </span>
                  </button>

                  <button>
                    <Layers
                      size={13}
                    />
                  </button>

                  <button>
                    <LocateFixed
                      size={13}
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* =================================================
                WHAT-IF SCENARIOS
            ================================================== */}

            <section className="reference-panel scenario-panel">
              <div className="reference-panel-header">
                <div className="panel-brand-title">
                  <Sparkles
                    size={14}
                  />

                  <h3>
                    What-If
                    Scenarios
                  </h3>
                </div>
              </div>

              <div className="scenario-map-preview">
                <div className="scenario-city-grid" />

                <div className="scenario-buildings">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="scenario-body">
                <div className="scenario-question">
                  <span>
                    Increase
                    Vehicles by
                  </span>

                  <strong>
                    20%
                  </strong>
                </div>

                <input
                  className="scenario-slider"
                  type="range"
                  min="0"
                  max="100"
                  value="20"
                  readOnly
                  aria-label="Increase vehicles"
                />

                <div className="slider-labels">
                  <span>
                    0%
                  </span>

                  <span>
                    100%
                  </span>
                </div>

                <h4>
                  Scenario Impact
                </h4>

                <div className="impact-row">
                  <span>
                    <Gauge
                      size={12}
                    />

                    Average Speed
                  </span>

                  <strong>
                    24 km/h{" "}
                    <b>
                      ↓
                    </b>
                  </strong>
                </div>

                <div className="impact-row">
                  <span>
                    <Activity
                      size={12}
                    />

                    Traffic Density
                  </span>

                  <strong className="yellow-text">
                    High{" "}
                    <b>
                      ↑
                    </b>
                  </strong>
                </div>

                <div className="impact-row">
                  <span>
                    <Navigation
                      size={12}
                    />

                    Congestion
                  </span>

                  <strong className="yellow-text">
                    75%{" "}
                    <b>
                      ↑
                    </b>
                  </strong>
                </div>

                <div className="impact-row">
                  <span>
                    <ShieldAlert
                      size={12}
                    />

                    Incidents
                    Likelihood
                  </span>

                  <strong className="yellow-text">
                    Medium{" "}
                    <b>
                      ↑
                    </b>
                  </strong>
                </div>

                <button className="run-simulation-button">
                  <Zap
                    size={13}
                  />

                  Run Simulation
                </button>

                <button className="save-scenario-button">
                  Save Scenario
                </button>
              </div>
            </section>
          </div>
        </section>

        {/* =================================================
            BOTTOM FEATURE BAR
        ================================================== */}

        <footer className="metro-feature-bar">
          <div className="feature-item">
            <div className="feature-icon">
              <Box
                size={19}
              />
            </div>

            <div>
              <strong>
                DIGITAL TWIN
              </strong>

              <span>
                Realistic 2D/3D
                City Model
              </span>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <Radio
                size={19}
              />
            </div>

            <div>
              <strong>
                REAL-TIME
                SIMULATION
              </strong>

              <span>
                Traffic, Vehicles
                & Incidents
              </span>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <BarChart3
                size={19}
              />
            </div>

            <div>
              <strong>
                AI POWERED
                ANALYTICS
              </strong>

              <span>
                Smart Insights &
                Predictions
              </span>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <SlidersHorizontal
                size={19}
              />
            </div>

            <div>
              <strong>
                WHAT-IF
                SCENARIOS
              </strong>

              <span>
                Plan Better,
                Decide Smarter
              </span>
            </div>
          </div>

          <div className="footer-logo">
            <div className="footer-building-icon">
              <span />
              <span />
              <span />
              <span />
            </div>

            <strong>
              METROPOLIS
            </strong>
          </div>
        </footer>
      </main>
    </div>
  );
}