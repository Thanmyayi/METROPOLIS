import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Bike,
  Box,
  Building2,
  Car,
  ChevronDown,
  CircleGauge,
  Clock3,
  Crosshair,
  Gauge,
  Grid3X3,
  Layers,
  LocateFixed,
  Map as MapIcon,
  MapPin,
  Menu,
  Minus,
  Navigation,
  Play,
  Plus,
  Radio,
  Route,
  Search,
  Settings,
  ShieldAlert,
  Sparkles,
  Sun,
  TrafficCone,
  TrendingUp,
  Truck,
  UserRound,
  Users,
  X,
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
  {
    id: "V007",
    plate: "KA-04-NP-6832",
    type: "Car",
    speed: 36,
    x: 46,
    y: 45,
  },
  {
    id: "V008",
    plate: "KA-01-QS-9137",
    type: "Bike",
    speed: 29,
    x: 83,
    y: 39,
  },
];

const sidebarItems = [
  { label: "Dashboard", icon: Grid3X3 },
  { label: "Live Map", icon: MapIcon, active: true },
  { label: "Vehicles", icon: Car },
  { label: "Traffic", icon: Route },
  { label: "Incidents", icon: AlertTriangle },
  { label: "Zones", icon: Building2 },
  { label: "Analytics", icon: BarChart3 },
  { label: "Scenarios", icon: Sparkles },
  { label: "Reports", icon: Activity },
  { label: "Settings", icon: Settings },
];

const vehicleDistribution = [
  { label: "Cars", value: 72, className: "chart-car" },
  { label: "Buses", value: 18, className: "chart-bus" },
  { label: "Bikes", value: 28, className: "chart-bike" },
  { label: "Trucks", value: 10, className: "chart-truck" },
];

function VehicleIcon({ type }: { type: string }) {
  if (type === "Bus") return <Truck size={12} />;
  if (type === "Bike") return <Bike size={12} />;
  if (type === "Truck") return <Truck size={12} />;
  return <Car size={12} />;
}

function MiniTrafficChart() {
  return (
    <svg
      viewBox="0 0 320 100"
      preserveAspectRatio="none"
      className="traffic-chart-svg"
    >
      <defs>
        <linearGradient id="trafficFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#17d7df" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#17d7df" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d="M0 83 C22 78 27 75 42 80 S70 68 83 72 S103 63 119 68 S143 51 157 58 S177 70 192 45 S213 51 228 31 S249 62 267 40 S288 49 320 34 L320 100 L0 100 Z"
        fill="url(#trafficFill)"
      />

      <path
        d="M0 83 C22 78 27 75 42 80 S70 68 83 72 S103 63 119 68 S143 51 157 58 S177 70 192 45 S213 51 228 31 S249 62 267 40 S288 49 320 34"
        fill="none"
        stroke="#21d7dd"
        strokeWidth="2"
      />

      <circle cx="192" cy="45" r="3" fill="#f3bf4f" />
      <circle cx="228" cy="31" r="3" fill="#21d7dd" />
    </svg>
  );
}

function MiniBars() {
  const values = [32, 46, 38, 61, 48, 73, 54, 67, 44, 78, 58, 84];

  return (
    <div className="mini-bars">
      {values.map((value, index) => (
        <span
          key={index}
          className="mini-bar"
          style={{ height: `${value}%` }}
        />
      ))}
    </div>
  );
}

function DonutChart() {
  return (
    <div className="donut-chart">
      <div className="donut-hole">
        <strong>128</strong>
        <span>ACTIVE</span>
      </div>
    </div>
  );
}

function CityBuilding({
  left,
  top,
  width,
  height,
  tall = false,
}: {
  left: string;
  top: string;
  width: number;
  height: number;
  tall?: boolean;
}) {
  return (
    <div
      className={`city-building ${tall ? "city-building-tall" : ""}`}
      style={{
        left,
        top,
        width,
        height,
      }}
    >
      <div className="building-top" />
      <div className="building-body">
        <div className="building-window-grid">
          {Array.from({ length: tall ? 24 : 12 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LiveMap() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [activeLayer, setActiveLayer] = useState("Vehicles");
  const [search, setSearch] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(
    "V001",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [scenarioValue, setScenarioValue] = useState(20);

  useEffect(() => {
    const timer = setInterval(() => {
      setVehicles((current) =>
        current.map((vehicle) => ({
          ...vehicle,
          x: vehicle.x > 91 ? 10 : vehicle.x + 0.25,
          speed: Math.max(
            12,
            Math.min(
              55,
              vehicle.speed + (Math.random() - 0.5) * 2,
            ),
          ),
        })),
      );
    }, 900);

    return () => clearInterval(timer);
  }, []);

  const filteredVehicles = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return vehicles;

    return vehicles.filter(
      (vehicle) =>
        vehicle.plate.toLowerCase().includes(query) ||
        vehicle.id.toLowerCase().includes(query) ||
        vehicle.type.toLowerCase().includes(query),
    );
  }, [vehicles, search]);

  const selected =
    vehicles.find((vehicle) => vehicle.id === selectedVehicle) ??
    vehicles[0];

  return (
    <div className="metro-command-center">
      {/* SIDEBAR */}
      <aside className={`metro-sidebar ${menuOpen ? "mobile-open" : ""}`}>
        <div className="metro-brand">
          <div className="metro-brand-icon">
            <Building2 size={23} />
          </div>

          <div>
            <div className="metro-brand-name">METROPOLIS</div>
            <div className="metro-brand-sub">AI-Enabled Digital Twin</div>
          </div>
        </div>

        <button
          className="sidebar-mobile-close"
          onClick={() => setMenuOpen(false)}
        >
          <X size={18} />
        </button>

        <nav className="metro-nav">
          {sidebarItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`metro-nav-item ${
                  item.active ? "active" : ""
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-status">
          <div className="sidebar-status-title">System Status</div>

          <div className="system-online">
            <span />
            <div>
              <strong>All Systems</strong>
              <small>Operational</small>
            </div>
          </div>

          <div className="sidebar-city-icon">
            <Building2 size={35} />
          </div>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="metro-main">
        {/* TOP BAR */}
        <header className="metro-topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu-button"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} />
            </button>

            <div>
              <div className="topbar-title-row">
                <h1>Live City View</h1>

                <span className="top-live">
                  <span />
                  LIVE
                </span>
              </div>

              <p>
                AI-powered real-time digital twin and city activity
                monitoring
              </p>
            </div>
          </div>

          <div className="topbar-right">
            <div className="topbar-time">
              <strong>10:24:35 AM</strong>
              <span>May 18, 2026</span>
            </div>

            <button className="top-icon-button">
              <Bell size={17} />
              <span className="notification-dot" />
            </button>

            <button className="top-icon-button">
              <Sun size={17} />
            </button>

            <div className="admin-profile">
              <div className="admin-avatar">
                <UserRound size={18} />
              </div>

              <div>
                <strong>Admin</strong>
                <span>City Planner</span>
              </div>

              <ChevronDown size={13} />
            </div>
          </div>
        </header>

        {/* HERO ROW */}
        <section className="hero-dashboard-grid">
          {/* DIGITAL TWIN MAP */}
          <div className="digital-twin-card">
            <div className="digital-map">
              <div className="map-atmosphere" />
              <div className="map-stars" />

              {/* CITY GRID */}
              <div className="city-grid" />

              {/* ROADS */}
              <div
                className="city-road city-road-horizontal"
                style={{ top: "39%" }}
              />

              <div
                className="city-road city-road-horizontal"
                style={{ top: "70%" }}
              />

              <div
                className="city-road city-road-vertical"
                style={{ left: "42%" }}
              />

              <div
                className="city-road city-road-vertical"
                style={{ left: "73%" }}
              />

              <div className="city-road city-road-diagonal" />

              <div className="city-road city-road-diagonal second" />

              {/* BUILDINGS */}
              <CityBuilding
                left="8%"
                top="16%"
                width={50}
                height={62}
              />

              <CityBuilding
                left="17%"
                top="28%"
                width={70}
                height={85}
              />

              <CityBuilding
                left="27%"
                top="18%"
                width={42}
                height={62}
              />

              <CityBuilding
                left="34%"
                top="8%"
                width={45}
                height={116}
                tall
              />

              <CityBuilding
                left="47%"
                top="17%"
                width={45}
                height={70}
              />

              <CityBuilding
                left="53%"
                top="7%"
                width={65}
                height={115}
                tall
              />

              <CityBuilding
                left="63%"
                top="23%"
                width={46}
                height={65}
              />

              <CityBuilding
                left="78%"
                top="15%"
                width={45}
                height={76}
              />

              <CityBuilding
                left="12%"
                top="59%"
                width={46}
                height={62}
              />

              <CityBuilding
                left="23%"
                top="73%"
                width={48}
                height={70}
              />

              <CityBuilding
                left="57%"
                top="59%"
                width={48}
                height={72}
              />

              <CityBuilding
                left="68%"
                top="76%"
                width={42}
                height={60}
              />

              <CityBuilding
                left="83%"
                top="52%"
                width={48}
                height={80}
              />

              {/* ZONES */}
              <div
                className="city-zone zone-a"
                style={{ left: "13%", top: "21%" }}
              >
                <strong>ZONE A</strong>
                <span>Central District</span>
              </div>

              <div
                className="city-zone"
                style={{ left: "70%", top: "18%" }}
              >
                <strong>ZONE B</strong>
                <span>Business Hub</span>
              </div>

              <div
                className="city-zone"
                style={{ left: "74%", top: "66%" }}
              >
                <strong>ZONE C</strong>
                <span>Residential Area</span>
              </div>

              <div
                className="city-zone"
                style={{ left: "46%", top: "63%" }}
              >
                <strong>ZONE D</strong>
                <span>Tech Park</span>
              </div>

              {/* VEHICLES */}
              {activeLayer === "Vehicles" &&
                filteredVehicles.map((vehicle) => (
                  <button
                    key={vehicle.id}
                    className={`city-vehicle ${
                      selectedVehicle === vehicle.id ? "selected" : ""
                    }`}
                    style={{
                      left: `${vehicle.x}%`,
                      top: `${vehicle.y}%`,
                    }}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                    title={vehicle.plate}
                  >
                    <span className="vehicle-ring" />
                    <span className="vehicle-light" />
                    <VehicleIcon type={vehicle.type} />
                  </button>
                ))}

              {/* INCIDENTS */}
              {activeLayer === "Incidents" && (
                <>
                  <div className="map-incident incident-danger">
                    <ShieldAlert size={19} />
                  </div>

                  <div className="map-incident incident-warning">
                    <TrafficCone size={19} />
                  </div>
                </>
              )}

              {/* MAP CONTROLS */}
              <div className="digital-map-controls">
                <button>
                  <Plus size={16} />
                </button>

                <button>
                  <Minus size={16} />
                </button>

                <button>
                  <span className="control-3d">3D</span>
                </button>

                <button>
                  <Crosshair size={15} />
                </button>

                <button>
                  <Layers size={15} />
                </button>

                <button>
                  <LocateFixed size={15} />
                </button>
              </div>

              {/* MAP LEGEND */}
              <div className="map-bottom-tabs">
                {[
                  { label: "Map Style", icon: MapIcon },
                  { label: "Heatmap", icon: Activity },
                  { label: "Traffic", icon: Route },
                  { label: "Incidents", icon: AlertTriangle },
                  { label: "Vehicles", icon: Car },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.label}
                      className={
                        activeLayer === item.label ? "active" : ""
                      }
                      onClick={() => {
                        if (
                          item.label === "Vehicles" ||
                          item.label === "Incidents"
                        ) {
                          setActiveLayer(item.label);
                        }
                      }}
                    >
                      <Icon size={11} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT STATISTICS */}
          <div className="hero-side-column">
            {/* LIVE VEHICLES */}
            <div className="metro-card">
              <div className="card-header">
                <div>
                  <h3>Live Vehicles</h3>
                  <span>Real-time fleet monitoring</span>
                </div>

                <button className="view-all-button">
                  View All
                </button>
              </div>

              <div className="vehicle-summary">
                <div className="summary-number">
                  <span>Total Vehicles</span>
                  <strong>128</strong>

                  <small>
                    <TrendingUp size={10} />
                    12%
                  </small>

                  <label>Active Now</label>
                </div>

                <DonutChart />

                <div className="vehicle-legend">
                  {vehicleDistribution.map((item) => (
                    <div key={item.label}>
                      <span className={`legend-dot ${item.className}`} />
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* TRAFFIC */}
            <div className="metro-card traffic-card">
              <div className="card-header">
                <div>
                  <h3>Traffic Status</h3>
                  <span>City-wide traffic conditions</span>
                </div>

                <span className="traffic-badge">
                  <Gauge size={10} />
                  Moderate
                </span>
              </div>

              <div className="traffic-number">
                <strong>32</strong>
                <span>km/h</span>
                <small>
                  <TrendingUp size={10} />
                  5%
                </small>
              </div>

              <MiniTrafficChart />

              <div className="chart-labels">
                <span>08 AM</span>
                <span>10 AM</span>
                <span>12 PM</span>
                <span>02 PM</span>
                <span>04 PM</span>
              </div>
            </div>

            {/* INCIDENTS */}
            <div className="metro-card incidents-card">
              <div className="card-header">
                <div>
                  <h3>Active Incidents</h3>
                  <span>Current city alerts</span>
                </div>

                <button className="view-all-button danger">
                  View All
                </button>
              </div>

              <div className="incident-row">
                <div className="incident-symbol danger">
                  <AlertTriangle size={16} />
                </div>

                <div>
                  <strong>Road Closure</strong>
                  <span>Main Street, Zone A</span>
                </div>

                <label className="incident-level high">High</label>
              </div>

              <div className="incident-row">
                <div className="incident-symbol warning">
                  <TrafficCone size={16} />
                </div>

                <div>
                  <strong>Accident</strong>
                  <span>5th Cross, Zone C</span>
                </div>

                <label className="incident-level medium">
                  Medium
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* LOWER DASHBOARD */}
        <section className="lower-dashboard-grid">
          {/* OVERVIEW */}
          <div className="metro-card overview-card">
            <div className="mini-window-header">
              <div className="mini-brand">
                <Building2 size={14} />
                <strong>METROPOLIS</strong>
              </div>

              <span>Dashboard Overview</span>

              <UserRound size={14} />
            </div>

            <div className="overview-kpis">
              <div>
                <span>Total Vehicles</span>
                <strong>128</strong>
                <small>↑ 12%</small>
              </div>

              <div>
                <span>Average Speed</span>
                <strong>32 km/h</strong>
                <small>↑ 5%</small>
              </div>

              <div>
                <span>Active Incidents</span>
                <strong>08</strong>
                <small className="negative">↓ 2</small>
              </div>

              <div>
                <span>AI Quality</span>
                <strong className="good">Good</strong>
                <small>92%</small>
              </div>
            </div>

            <div className="overview-charts">
              <div className="overview-chart-panel">
                <div className="chart-panel-title">
                  <span>Traffic Flow</span>
                  <MoreDots />
                </div>

                <MiniTrafficChart />

                <div className="chart-labels">
                  <span>08 AM</span>
                  <span>10 AM</span>
                  <span>12 PM</span>
                  <span>02 PM</span>
                  <span>04 PM</span>
                </div>
              </div>

              <div className="overview-chart-panel">
                <div className="chart-panel-title">
                  <span>Vehicles by Type</span>
                </div>

                <div className="small-donut-row">
                  <DonutChart />

                  <div className="small-legend">
                    {vehicleDistribution.map((item) => (
                      <div key={item.label}>
                        <span
                          className={`legend-dot ${item.className}`}
                        />
                        {item.label}
                        <strong>{item.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="overview-bottom">
              <div className="overview-table">
                <div className="chart-panel-title">
                  <span>Top Congested Zones</span>
                </div>

                {[
                  ["Zone A", "72%"],
                  ["Zone B", "58%"],
                  ["Zone C", "41%"],
                  ["Zone D", "29%"],
                ].map(([zone, value], index) => (
                  <div className="zone-progress" key={zone}>
                    <span>{index + 1}</span>
                    <strong>{zone}</strong>
                    <div>
                      <span
                        style={{
                          width: value,
                        }}
                      />
                    </div>
                    <label>{value}</label>
                  </div>
                ))}
              </div>

              <div className="overview-table">
                <div className="chart-panel-title">
                  <span>Incident Trend</span>
                </div>

                <MiniBars />

                <div className="chart-labels">
                  <span>08 AM</span>
                  <span>10 AM</span>
                  <span>12 PM</span>
                  <span>02 PM</span>
                  <span>04 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* VEHICLE SEARCH */}
          <div className="metro-card vehicle-search-card">
            <div className="mini-window-header">
              <div className="mini-brand">
                <Building2 size={14} />
                <strong>METROPOLIS</strong>
              </div>

              <span>Vehicle Search &amp; Details</span>

              <Users size={14} />
            </div>

            <div className="vehicle-search-input">
              <Search size={13} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="KA-01-AB-1234"
              />
              <span>⌕</span>
            </div>

            <div className="vehicle-detail-layout">
              <div className="vehicle-list">
                {filteredVehicles.slice(0, 4).map((vehicle) => (
                  <button
                    key={vehicle.id}
                    className={`vehicle-list-item ${
                      selectedVehicle === vehicle.id
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedVehicle(vehicle.id)
                    }
                  >
                    <div className="vehicle-list-icon">
                      <VehicleIcon type={vehicle.type} />
                    </div>

                    <div>
                      <strong>{vehicle.plate}</strong>
                      <span>
                        {vehicle.type} • {vehicle.speed.toFixed(0)} km/h
                      </span>
                      <small>
                        {vehicle.id === "V001"
                          ? "Main Road, Zone A"
                          : "5th Cross, Zone C"}
                      </small>
                    </div>

                    <span className="mini-moving">Moving</span>
                  </button>
                ))}
              </div>

              <div className="selected-vehicle">
                <span className="found-label">
                  Vehicle Found ✓
                </span>

                <h3>{selected?.plate ?? "KA-01-AB-1234"}</h3>

                <div className="vehicle-image">
                  <Car size={65} strokeWidth={1.1} />
                </div>

                <div className="vehicle-data-grid">
                  <span>Vehicle Type</span>
                  <strong>{selected?.type ?? "Car"}</strong>

                  <span>Model</span>
                  <strong>Swift Dzire</strong>

                  <span>Current Location</span>
                  <strong>Main Road, Zone A</strong>

                  <span>Speed</span>
                  <strong>
                    {selected?.speed.toFixed(0) ?? 32} km/h
                  </strong>

                  <span>Direction</span>
                  <strong>North-East</strong>

                  <span>Status</span>
                  <strong className="green-text">Moving</strong>

                  <span>Last Updated</span>
                  <strong>10:24:30 AM</strong>
                </div>

                <button
                  className="show-map-button"
                  onClick={() => {
                    setActiveLayer("Vehicles");
                    setSelectedVehicle(selected?.id ?? "V001");
                  }}
                >
                  <MapPin size={14} />
                  Show on Map
                </button>
              </div>
            </div>
          </div>

          {/* VEHICLE ON MAP */}
          <div className="metro-card small-map-card">
            <div className="mini-window-header">
              <strong>Vehicle on Map</strong>

              <button className="close-mini">
                <X size={13} />
              </button>
            </div>

            <div className="small-city-map">
              <div className="small-road r1" />
              <div className="small-road r2" />
              <div className="small-road r3" />

              <div className="small-city-building b1" />
              <div className="small-city-building b2" />
              <div className="small-city-building b3" />

              <div className="small-map-label">
                <strong>
                  {selected?.plate ?? "KA-01-AB-1234"}
                </strong>
                <span>
                  {selected?.type ?? "Car"} (Sedan)
                </span>
                <strong>
                  {selected?.speed.toFixed(0) ?? 32} km/h
                </strong>
                <span>North-East</span>
                <b>Moving</b>
              </div>

              <div className="focused-map-car">
                <span />
                <Car size={14} />
              </div>

              <div className="small-map-controls">
                <button>
                  <Plus size={12} />
                </button>
                <button>
                  <Minus size={12} />
                </button>
                <button>
                  <span>3D</span>
                </button>
                <button>
                  <Layers size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* WHAT IF */}
          <div className="metro-card scenario-card">
            <div className="mini-window-header">
              <div className="mini-brand">
                <Building2 size={14} />
                <strong>METROPOLIS</strong>
              </div>

              <span>What-if Scenarios</span>
            </div>

            <div className="scenario-city">
              <div className="scenario-buildings">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="scenario-content">
              <span className="scenario-label">
                Increase Vehicles by
              </span>

              <strong className="scenario-number">
                {scenarioValue}%
              </strong>

              <input
                type="range"
                min="0"
                max="100"
                value={scenarioValue}
                onChange={(event) =>
                  setScenarioValue(Number(event.target.value))
                }
              />

              <div className="slider-labels">
                <span>0%</span>
                <span>100%</span>
              </div>

              <span className="scenario-impact-title">
                Scenario Impact
              </span>

              <div className="scenario-impact">
                <div>
                  <CircleGauge size={13} />
                  <span>Average Speed</span>
                  <strong>24 km/h ↓</strong>
                </div>

                <div>
                  <Activity size={13} />
                  <span>Traffic Density</span>
                  <strong>High</strong>
                </div>

                <div>
                  <TrendingUp size={13} />
                  <span>Congestion</span>
                  <strong>75% ↑</strong>
                </div>

                <div>
                  <AlertTriangle size={13} />
                  <span>Incidents Likelihood</span>
                  <strong>Medium ↑</strong>
                </div>
              </div>

              <button className="run-simulation">
                <Play size={13} />
                Run Simulation
              </button>

              <button className="save-scenario">
                Save Scenario
              </button>
            </div>
          </div>
        </section>

        {/* BOTTOM FEATURE STRIP */}
        <section className="metro-feature-strip">
          <div className="feature-item">
            <div className="feature-icon">
              <Box size={21} />
            </div>

            <div>
              <strong>DIGITAL TWIN</strong>
              <span>Realistic 2D/3D City Model</span>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <Radio size={21} />
            </div>

            <div>
              <strong>REAL-TIME SIMULATION</strong>
              <span>Traffic, Vehicles &amp; Incidents</span>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <BarChart3 size={21} />
            </div>

            <div>
              <strong>AI POWERED ANALYTICS</strong>
              <span>Smart Insights &amp; Predictions</span>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <Sparkles size={21} />
            </div>

            <div>
              <strong>WHAT-IF SCENARIOS</strong>
              <span>Plan Better, Decide Smarter</span>
            </div>
          </div>

          <div className="feature-brand">
            <Building2 size={35} />
            <strong>METROPOLIS</strong>
          </div>
        </section>
      </main>
    </div>
  );
}

function MoreDots() {
  return (
    <span className="more-dots">
      •••
    </span>
  );
}