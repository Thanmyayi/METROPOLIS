import { useMemo, useState } from "react";
import {
  Car,
  Search,
  MapPin,
  Gauge,
  Navigation,
  Clock3,
} from "lucide-react";

const vehicles = [
  ["V001", "KA-01-AB-1234", "Car", "Main Road", "Zone A", 32, "North-East", "Moving"],
  ["V002", "KA-01-CD-5621", "Bus", "Park Street", "Zone B", 18, "East", "Moving"],
  ["V003", "KA-01-EF-8934", "SUV", "MG Road", "Zone A", 41, "South", "Moving"],
  ["V004", "KA-05-GH-1245", "Bike", "5th Cross", "Zone C", 22, "West", "Moving"],
  ["V005", "KA-03-JK-7412", "Car", "Ring Road", "Zone D", 28, "North", "Moving"],
  ["V006", "KA-02-LM-4128", "Truck", "Main Road", "Zone B", 21, "South-East", "Stopped"],
];

export default function Vehicles() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(vehicles[0]);

  const filtered = useMemo(
    () =>
      vehicles.filter((v) =>
        v.join(" ").toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <div className="metropolis-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Vehicle Intelligence</h1>
          <p className="page-subtitle">
            Search, monitor and inspect simulated vehicles across the city
          </p>
        </div>

        <div className="search-box" style={{ width: 300 }}>
          <Search size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Number plate, ID, road or zone"
          />
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: 18 }}>
        <div className="panel kpi-card">
          <div className="kpi-label">Total Vehicles</div>
          <div className="kpi-value">128</div>
          <div className="kpi-change">↑ 12%</div>
        </div>

        <div className="panel kpi-card">
          <div className="kpi-label">Cars</div>
          <div className="kpi-value">72</div>
          <div className="kpi-change">56.3% of fleet</div>
        </div>

        <div className="panel kpi-card">
          <div className="kpi-label">Buses</div>
          <div className="kpi-value">18</div>
          <div className="kpi-change">14.1% of fleet</div>
        </div>

        <div className="panel kpi-card">
          <div className="kpi-label">Stopped</div>
          <div className="kpi-value">09</div>
          <div className="kpi-change">Normal range</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Vehicle Directory</h3>
            <span className="muted">{filtered.length} results</span>
          </div>

          <div className="table-wrap">
            <table className="metro-table">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Speed</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((vehicle) => (
                  <tr
                    key={vehicle[0]}
                    onClick={() => setSelected(vehicle)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      <strong>{vehicle[1]}</strong>
                      <div className="muted">{vehicle[0]}</div>
                    </td>
                    <td>{vehicle[2]}</td>
                    <td>
                      {vehicle[3]}
                      <div className="muted">{vehicle[4]}</div>
                    </td>
                    <td>{vehicle[5]} km/h</td>
                    <td>
                      <span
                        className={`status ${
                          vehicle[7] === "Moving"
                            ? "status-moving"
                            : "status-stopped"
                        }`}
                      >
                        {vehicle[7]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Vehicle Details</h3>
            <span className="status status-moving">Vehicle Found ✓</span>
          </div>

          <div style={{ padding: 22 }}>
            <div
              style={{
                padding: 18,
                borderRadius: 13,
                background: "rgba(0, 190, 220, 0.05)",
                border: "1px solid rgba(0, 210, 240, 0.12)",
                marginBottom: 18,
              }}
            >
              <Car size={42} />
              <h2 style={{ margin: "12px 0 4px" }}>{selected[1]}</h2>
              <div className="muted">{selected[2]} • Simulated Vehicle</div>
            </div>

            <div className="metric-row">
              <span className="muted">
                <MapPin size={13} /> Current Location
              </span>
              <strong>{selected[3]}</strong>
            </div>

            <div className="metric-row">
              <span className="muted">Zone</span>
              <strong>{selected[4]}</strong>
            </div>

            <div className="metric-row">
              <span className="muted">
                <Gauge size={13} /> Speed
              </span>
              <strong>{selected[5]} km/h</strong>
            </div>

            <div className="metric-row">
              <span className="muted">
                <Navigation size={13} /> Direction
              </span>
              <strong>{selected[6]}</strong>
            </div>

            <div className="metric-row">
              <span className="muted">
                <Clock3 size={13} /> Last Updated
              </span>
              <strong>10:24:30 AM</strong>
            </div>

            <button className="btn btn-primary" style={{ width: "100%", marginTop: 20 }}>
              <MapPin size={15} style={{ marginRight: 6 }} />
              Show on Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}