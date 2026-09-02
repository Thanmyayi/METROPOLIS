import { useEffect, useState } from "react";
import {
  Layers,
  LocateFixed,
  Minus,
  Navigation,
  Plus,
  Radio,
  Search,
  ShieldAlert,
  TrafficCone,
  Car,
  Box,
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
  { id: "V001", plate: "KA-01-AB-1234", type: "Car", speed: 32, x: 28, y: 37 },
  { id: "V002", plate: "KA-01-CD-5621", type: "Bus", speed: 18, x: 52, y: 55 },
  { id: "V003", plate: "KA-01-EF-8934", type: "SUV", speed: 41, x: 67, y: 32 },
  { id: "V004", plate: "KA-05-GH-1245", type: "Bike", speed: 22, x: 76, y: 69 },
  { id: "V005", plate: "KA-03-JK-7412", type: "Car", speed: 28, x: 39, y: 72 },
  { id: "V006", plate: "KA-02-LM-4128", type: "Truck", speed: 21, x: 58, y: 26 },
];

export default function LiveMap() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [activeLayer, setActiveLayer] = useState("Vehicles");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setVehicles((current) =>
        current.map((vehicle) => ({
          ...vehicle,
          x: vehicle.x > 88 ? 15 : vehicle.x + 0.35,
          speed: Math.max(12, Math.min(55, vehicle.speed + (Math.random() - 0.5) * 3)),
        }))
      );
    }, 900);

    return () => clearInterval(timer);
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.plate.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="metropolis-page">
      <div className="page-header">
        <div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <h1 className="page-title">Live City View</h1>
            <span className="live-pill">
              <span className="live-dot" />
              LIVE
            </span>
          </div>
          <p className="page-subtitle">
            Real-time digital twin simulation and city activity monitoring
          </p>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <div className="search-box" style={{ width: 230 }}>
            <Search size={15} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search vehicle..."
            />
          </div>

          <button className="btn btn-primary">
            <Radio size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />
            Simulation Active
          </button>
        </div>
      </div>

      <div className="grid-2">
        <div className="panel map-shell">
          <div className="map-grid" />

          <div className="road horizontal" style={{ top: "34%" }} />
          <div className="road horizontal" style={{ top: "67%" }} />
          <div className="road vertical" style={{ left: "44%" }} />
          <div className="road vertical" style={{ left: "72%" }} />
          <div className="road diagonal" />

          <div className="building" style={{ left: "12%", top: "18%", height: 65 }} />
          <div className="building" style={{ left: "24%", top: "52%", height: 100 }} />
          <div className="building" style={{ left: "56%", top: "12%", height: 115 }} />
          <div className="building" style={{ left: "80%", top: "44%", height: 90 }} />
          <div className="building" style={{ left: "62%", top: "73%", height: 65 }} />

          <div className="zone-label" style={{ left: "17%", top: "25%" }}>
            <strong>ZONE A</strong>
            <div className="muted">Central District</div>
          </div>

          <div className="zone-label" style={{ left: "71%", top: "19%" }}>
            <strong>ZONE B</strong>
            <div className="muted">Business Hub</div>
          </div>

          <div className="zone-label" style={{ left: "75%", top: "72%" }}>
            <strong>ZONE C</strong>
            <div className="muted">Residential Area</div>
          </div>

          {activeLayer === "Vehicles" &&
            filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="vehicle-marker"
                title={`${vehicle.plate} • ${vehicle.speed.toFixed(0)} km/h`}
                style={{
                  left: `${vehicle.x}%`,
                  top: `${vehicle.y}%`,
                }}
              />
            ))}

          {activeLayer === "Incidents" && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: "39%",
                  top: "30%",
                  color: "#ff5c67",
                  zIndex: 8,
                }}
              >
                <ShieldAlert size={30} />
              </div>

              <div
                style={{
                  position: "absolute",
                  left: "65%",
                  top: "63%",
                  color: "#ffca5a",
                  zIndex: 8,
                }}
              >
                <TrafficCone size={30} />
              </div>
            </>
          )}

          <div className="map-controls">
            <button className="map-control">
              <Plus size={16} />
            </button>
            <button className="map-control">
              <Minus size={16} />
            </button>
            <button className="map-control">
              <Box size={16} />
            </button>
            <button className="map-control">
              <LocateFixed size={16} />
            </button>
            <button className="map-control">
              <Layers size={16} />
            </button>
          </div>

          <div className="map-bottom-controls">
            {["Map Style", "Heatmap", "Traffic", "Incidents", "Vehicles"].map(
              (layer) => (
                <button
                  key={layer}
                  className={activeLayer === layer ? "active" : ""}
                  onClick={() => setActiveLayer(layer)}
                >
                  {layer}
                </button>
              )
            )}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div className="panel">
            <div className="panel-header">
              <h3 className="panel-title">Live Vehicles</h3>
              <span className="muted">Updated now</span>
            </div>

            <div style={{ padding: 20 }}>
              <div className="grid-2">
                <div>
                  <div className="kpi-label">Active Vehicles</div>
                  <div className="kpi-value">128</div>
                  <div className="kpi-change">↑ 12% from previous hour</div>
                </div>

                <div>
                  <div className="kpi-label">Average Speed</div>
                  <div className="kpi-value">32</div>
                  <div className="kpi-change">km/h</div>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h3 className="panel-title">Vehicle Activity</h3>
              <Car size={17} className="muted" />
            </div>

            {filteredVehicles.map((vehicle) => (
              <div className="incident-item" key={vehicle.id}>
                <div className="incident-icon">
                  <Car size={17} />
                </div>

                <div className="incident-main">
                  <div className="incident-title">{vehicle.plate}</div>
                  <div className="incident-meta">
                    {vehicle.type} • {vehicle.speed.toFixed(0)} km/h
                  </div>
                </div>

                <span className="status status-moving">Moving</span>
              </div>
            ))}
          </div>

          <div className="panel">
            <div className="panel-header">
              <h3 className="panel-title">City Status</h3>
              <Navigation size={16} className="muted" />
            </div>

            <div style={{ padding: "5px 20px 18px" }}>
              <div className="metric-row">
                <span className="muted">Traffic Flow</span>
                <strong>78%</strong>
              </div>
              <div className="metric-row">
                <span className="muted">Network Coverage</span>
                <strong>94%</strong>
              </div>
              <div className="metric-row">
                <span className="muted">Simulation Status</span>
                <span className="status status-moving">Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}