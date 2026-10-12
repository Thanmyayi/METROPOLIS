import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  CarFront,
  MapPin,
  Radio,
  Search,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

import { useVehicleSimulation } from "../hooks/useVehicleSimulation";
import type { VehicleData } from "../data/vehicles";

type ZoneLevel = "Low" | "Medium" | "High";

interface ZoneData {
  name: string;
  description: string;
  population: number;
  trafficLevel: ZoneLevel;
  congestion: number;
  capacity: number;
  roads: number;
  incidents: number;
}

const initialZones: ZoneData[] = [
  {
    name: "Zone A",
    description: "Central District",
    population: 45000,
    trafficLevel: "Medium",
    congestion: 54,
    capacity: 120,
    roads: 8,
    incidents: 2,
  },
  {
    name: "Zone B",
    description: "Business Hub",
    population: 32000,
    trafficLevel: "High",
    congestion: 82,
    capacity: 95,
    roads: 6,
    incidents: 4,
  },
  {
    name: "Zone C",
    description: "Residential Area",
    population: 28000,
    trafficLevel: "Low",
    congestion: 23,
    capacity: 80,
    roads: 5,
    incidents: 1,
  },
];

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-IN").format(value);

const levelClass = (level: ZoneLevel) => {
  if (level === "High") return "zone-level-high";
  if (level === "Medium") return "zone-level-medium";
  return "zone-level-low";
};

export default function Zones() {
  const { vehicles, selectVehicle } = useVehicleSimulation();

  const [selectedZoneName, setSelectedZoneName] = useState("Zone A");
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");

  const zones = useMemo(() => {
    return initialZones.map((zone) => {
      const zoneVehicles = vehicles.filter(
        (vehicle) => vehicle.zone === zone.name
      );

      const moving = zoneVehicles.filter(
        (vehicle) => vehicle.status === "Moving"
      ).length;

      const averageSpeed = zoneVehicles.length
        ? Math.round(
            zoneVehicles.reduce(
              (total, vehicle) => total + Number(vehicle.speed || 0),
              0
            ) / zoneVehicles.length
          )
        : 0;

      return {
        ...zone,
        activeVehicles: zoneVehicles.length,
        movingVehicles: moving,
        averageSpeed,
      };
    });
  }, [vehicles]);

  const selectedZone =
    zones.find((zone) => zone.name === selectedZoneName) ?? zones[0];

  const zoneVehicles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return vehicles.filter((vehicle) => {
      const matchesZone = vehicle.zone === selectedZoneName;

      const matchesSearch =
        !query ||
        vehicle.id.toLowerCase().includes(query) ||
        vehicle.plate.toLowerCase().includes(query) ||
        vehicle.road.toLowerCase().includes(query) ||
        vehicle.type.toLowerCase().includes(query);

      return matchesZone && matchesSearch;
    });
  }, [vehicles, selectedZoneName, search]);

  const filteredZones = zones.filter((zone) => {
    const matchesLevel =
      levelFilter === "All" || zone.trafficLevel === levelFilter;

    const query = search.trim().toLowerCase();

    const matchesSearch =
      !query ||
      zone.name.toLowerCase().includes(query) ||
      zone.description.toLowerCase().includes(query);

    return matchesLevel && matchesSearch;
  });

  const totalPopulation = zones.reduce(
    (sum, zone) => sum + zone.population,
    0
  );

  const totalVehicles = zones.reduce(
    (sum, zone) => sum + zone.activeVehicles,
    0
  );

  const totalIncidents = zones.reduce(
    (sum, zone) => sum + zone.incidents,
    0
  );

  return (
    <div className="zones-page">
      <style>{`
        .zones-page {
          min-height: 100vh;
          padding: 28px;
          color: #e6f2ff;
          background:
            radial-gradient(ellipse at 80% 0%, rgba(0, 183, 255, .07), transparent 38%),
            #050d18;
          font-family: Inter, system-ui, sans-serif;
        }

        .zones-page * { box-sizing: border-box; }

        .zones-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 25px;
        }

        .zones-eyebrow {
          color: #3dd5ff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .zones-title {
          margin: 8px 0;
          font-size: clamp(25px, 3vw, 34px);
          font-weight: 750;
          letter-spacing: -1px;
        }

        .zones-subtitle {
          margin: 0;
          color: #8ca4bd;
          font-size: 13px;
          line-height: 1.6;
        }

        .zones-live {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 13px;
          color: #7ef0bc;
          background: rgba(23, 201, 139, .08);
          border: 1px solid rgba(23, 201, 139, .22);
          border-radius: 9px;
          font-size: 11px;
          font-weight: 700;
        }

        .zones-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #26df9b;
          box-shadow: 0 0 12px rgba(38, 223, 155, .8);
        }

        .zones-kpis {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 24px;
        }

        .zones-kpi {
          padding: 18px;
          border: 1px solid #192b3e;
          border-radius: 13px;
          background: linear-gradient(145deg, #0d1a2a, #091421);
        }

        .zones-kpi-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          color: #91a9c2;
          font-size: 12px;
        }

        .zones-icon {
          display: grid;
          place-items: center;
          width: 34px;
          height: 34px;
          color: #40d7ff;
          background: rgba(34, 197, 255, .09);
          border-radius: 9px;
        }

        .zones-kpi-value {
          margin-top: 17px;
          font-size: 27px;
          font-weight: 750;
          letter-spacing: -.7px;
        }

        .zones-kpi-note {
          margin-top: 6px;
          color: #7e96b0;
          font-size: 11px;
        }

        .zones-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(330px, .9fr);
          gap: 18px;
          align-items: start;
        }

        .zones-panel {
          min-width: 0;
          overflow: hidden;
          border: 1px solid #192b3e;
          border-radius: 13px;
          background: rgba(9, 21, 35, .92);
        }

        .zones-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          padding: 18px;
          border-bottom: 1px solid #192b3e;
        }

        .zones-panel-title {
          margin: 0;
          font-size: 14px;
          font-weight: 700;
        }

        .zones-panel-subtitle {
          margin-top: 5px;
          color: #7e96b0;
          font-size: 11px;
        }

        .zones-search {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
          padding: 10px 11px;
          color: #7e96b0;
          border: 1px solid #24394d;
          border-radius: 8px;
          background: #07111e;
        }

        .zones-search input {
          width: 100%;
          min-width: 0;
          color: #e6f2ff;
          background: transparent;
          border: 0;
          outline: 0;
          font: inherit;
          font-size: 12px;
        }

        .zones-filter {
          padding: 9px 10px;
          color: #c7d8e9;
          background: #07111e;
          border: 1px solid #24394d;
          border-radius: 8px;
          font-size: 12px;
          outline: none;
        }

        .zones-card-list {
          display: grid;
          gap: 10px;
          padding: 14px;
        }

        .zone-card {
          width: 100%;
          padding: 16px;
          text-align: left;
          color: inherit;
          border: 1px solid #1b3044;
          border-radius: 11px;
          background: #0a1726;
          cursor: pointer;
          transition: border-color .2s, background .2s, transform .2s;
        }

        .zone-card:hover {
          border-color: #28617a;
          transform: translateY(-1px);
        }

        .zone-card.selected {
          border-color: #17bce9;
          background: linear-gradient(110deg, rgba(0, 183, 255, .10), #0a1726 75%);
          box-shadow: inset 3px 0 #25c8f5;
        }

        .zone-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .zone-name {
          font-size: 14px;
          font-weight: 750;
        }

        .zone-description {
          margin-top: 5px;
          color: #829bb4;
          font-size: 11px;
        }

        .zone-level {
          padding: 5px 8px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 750;
        }

        .zone-level-low {
          color: #64e5af;
          background: rgba(32, 201, 138, .12);
        }

        .zone-level-medium {
          color: #ffd36e;
          background: rgba(255, 190, 55, .12);
        }

        .zone-level-high {
          color: #ff8585;
          background: rgba(255, 75, 75, .13);
        }

        .zone-card-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 18px;
        }

        .zone-stat-label {
          color: #7e96b0;
          font-size: 10px;
        }

        .zone-stat-value {
          margin-top: 6px;
          font-size: 15px;
          font-weight: 700;
        }

        .zone-progress {
          height: 5px;
          margin-top: 17px;
          overflow: hidden;
          border-radius: 5px;
          background: #1b2c3d;
        }

        .zone-progress-fill {
          height: 100%;
          border-radius: inherit;
          transition: width .3s;
        }

        .zone-progress-fill.zone-level-low { background: #2dd7a0; }
        .zone-progress-fill.zone-level-medium { background: #f5bd48; }
        .zone-progress-fill.zone-level-high { background: #ff6565; }

        .zones-detail {
          padding: 18px;
        }

        .zones-detail-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
        }

        .zones-detail-name {
          margin: 0;
          font-size: 22px;
          font-weight: 750;
        }

        .zones-detail-description {
          margin-top: 6px;
          color: #8ca4bd;
          font-size: 12px;
        }

        .zones-detail-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin: 20px 0;
        }

        .zones-detail-stat {
          padding: 14px;
          border: 1px solid #1c3044;
          border-radius: 9px;
          background: #0b1827;
        }

        .zones-detail-stat-label {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #8ca4bd;
          font-size: 11px;
        }

        .zones-detail-stat-value {
          margin-top: 11px;
          font-size: 21px;
          font-weight: 750;
        }

        .zones-section-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin: 23px 0 12px;
          font-size: 12px;
          font-weight: 700;
        }

        .zones-count {
          color: #8ca4bd;
          font-size: 11px;
          font-weight: 500;
        }

        .zones-table-wrap {
          overflow-x: auto;
          border: 1px solid #1c3044;
          border-radius: 9px;
        }

        .zones-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 11px;
          white-space: nowrap;
        }

        .zones-table th {
          padding: 11px 12px;
          color: #829bb4;
          background: #0c1b2b;
          text-align: left;
          font-size: 10px;
          font-weight: 650;
        }

        .zones-table td {
          padding: 12px;
          border-top: 1px solid #1a2a3b;
        }

        .zones-table tbody tr:hover {
          background: rgba(33, 190, 245, .045);
        }

        .zones-vehicle-id {
          color: #48d4ff;
          font-weight: 700;
        }

        .zones-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #70e6b2;
        }

        .zones-status.stopped { color: #ffcc70; }

        .zones-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }

        .zones-action {
          padding: 6px 9px;
          color: #52d8ff;
          border: 1px solid #244a60;
          border-radius: 6px;
          background: #0b2030;
          font-size: 10px;
          cursor: pointer;
        }

        .zones-action:hover { background: #12344a; }

        .zones-empty {
          padding: 26px 14px;
          color: #829bb4;
          text-align: center;
          font-size: 12px;
        }

        .zones-note {
          margin-top: 14px;
          color: #7189a3;
          font-size: 10px;
          line-height: 1.6;
        }

        @media (max-width: 1100px) {
          .zones-layout { grid-template-columns: 1fr; }
        }

        @media (max-width: 760px) {
          .zones-page { padding: 17px; }
          .zones-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .zones-panel-header { align-items: stretch; }
          .zones-panel-header > * { max-width: 100%; }
        }

        @media (max-width: 420px) {
          .zones-kpi { padding: 13px; }
          .zones-kpi-value { font-size: 23px; }
          .zones-detail-grid { grid-template-columns: 1fr 1fr; }
          .zone-card-stats { gap: 6px; }
        }
      `}</style>

      <header className="zones-header">
        <div>
          <div className="zones-eyebrow">City Operations / Zones</div>
          <h1 className="zones-title">Zone Management</h1>
          <p className="zones-subtitle">
            Monitor district activity, traffic conditions and simulated
            vehicle distribution across the city.
          </p>
        </div>

        <div className="zones-live">
          <span className="zones-live-dot" />
          SIMULATION ACTIVE
        </div>
      </header>

      <section className="zones-kpis">
        <article className="zones-kpi">
          <div className="zones-kpi-top">
            Total Zones
            <span className="zones-icon"><Building2 size={17} /></span>
          </div>
          <div className="zones-kpi-value">{zones.length}</div>
          <div className="zones-kpi-note">Configured city districts</div>
        </article>

        <article className="zones-kpi">
          <div className="zones-kpi-top">
            Population
            <span className="zones-icon"><Users size={17} /></span>
          </div>
          <div className="zones-kpi-value">{formatNumber(totalPopulation)}</div>
          <div className="zones-kpi-note">Across configured zones</div>
        </article>

        <article className="zones-kpi">
          <div className="zones-kpi-top">
            Simulated Vehicles
            <span className="zones-icon"><CarFront size={17} /></span>
          </div>
          <div className="zones-kpi-value">{totalVehicles}</div>
          <div className="zones-kpi-note">Vehicles assigned to zones</div>
        </article>

        <article className="zones-kpi">
          <div className="zones-kpi-top">
            Recorded Incidents
            <span className="zones-icon"><ShieldCheck size={17} /></span>
          </div>
          <div className="zones-kpi-value">{totalIncidents}</div>
          <div className="zones-kpi-note">Configured demo statistics</div>
        </article>
      </section>

      <section className="zones-layout">
        <div className="zones-panel">
          <div className="zones-panel-header">
            <div>
              <h2 className="zones-panel-title">City Zones</h2>
              <div className="zones-panel-subtitle">
                Select a zone to inspect its simulated activity
              </div>
            </div>

            <select
              className="zones-filter"
              value={levelFilter}
              onChange={(event) => setLevelFilter(event.target.value)}
              aria-label="Filter zones by traffic level"
            >
              <option value="All">All traffic levels</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="zones-panel-header">
            <label className="zones-search" style={{ flex: 1 }}>
              <Search size={15} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search zones, vehicles or roads..."
                aria-label="Search zones and vehicles"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  style={{
                    display: "grid",
                    placeItems: "center",
                    color: "#8ca4bd",
                    border: 0,
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </label>
          </div>

          <div className="zones-card-list">
            {filteredZones.map((zone) => (
              <button
                type="button"
                key={zone.name}
                className={`zone-card ${
                  selectedZoneName === zone.name ? "selected" : ""
                }`}
                onClick={() => setSelectedZoneName(zone.name)}
              >
                <div className="zone-card-top">
                  <div>
                    <div className="zone-name">{zone.name}</div>
                    <div className="zone-description">{zone.description}</div>
                  </div>

                  <span className={`zone-level ${levelClass(zone.trafficLevel)}`}>
                    {zone.trafficLevel} Traffic
                  </span>
                </div>

                <div className="zone-card-stats">
                  <div>
                    <div className="zone-stat-label">Vehicles</div>
                    <div className="zone-stat-value">{zone.activeVehicles}</div>
                  </div>
                  <div>
                    <div className="zone-stat-label">Average Speed</div>
                    <div className="zone-stat-value">{zone.averageSpeed} km/h</div>
                  </div>
                  <div>
                    <div className="zone-stat-label">Congestion</div>
                    <div className="zone-stat-value">{zone.congestion}%</div>
                  </div>
                </div>

                <div className="zone-progress">
                  <div
                    className={`zone-progress-fill ${levelClass(zone.trafficLevel)}`}
                    style={{ width: `${zone.congestion}%` }}
                  />
                </div>
              </button>
            ))}

            {filteredZones.length === 0 && (
              <div className="zones-empty">
                No zones match the current search and filter.
              </div>
            )}
          </div>
        </div>

        <div className="zones-panel">
          <div className="zones-panel-header">
            <div>
              <h2 className="zones-panel-title">Zone Overview</h2>
              <div className="zones-panel-subtitle">
                Detailed operational status
              </div>
            </div>
            <span className={`zone-level ${levelClass(selectedZone.trafficLevel)}`}>
              {selectedZone.trafficLevel} Traffic
            </span>
          </div>

          <div className="zones-detail">
            <div className="zones-detail-heading">
              <div>
                <h2 className="zones-detail-name">{selectedZone.name}</h2>
                <div className="zones-detail-description">
                  {selectedZone.description}
                </div>
              </div>
              <span className="zones-icon"><MapPin size={19} /></span>
            </div>

            <div className="zones-detail-grid">
              <div className="zones-detail-stat">
                <div className="zones-detail-stat-label">
                  <CarFront size={14} /> Active Vehicles
                </div>
                <div className="zones-detail-stat-value">
                  {selectedZone.activeVehicles}
                </div>
              </div>

              <div className="zones-detail-stat">
                <div className="zones-detail-stat-label">
                  <Radio size={14} /> Moving Vehicles
                </div>
                <div className="zones-detail-stat-value">
                  {selectedZone.movingVehicles}
                </div>
              </div>

              <div className="zones-detail-stat">
                <div className="zones-detail-stat-label">
                  <Activity size={14} /> Congestion
                </div>
                <div className="zones-detail-stat-value">
                  {selectedZone.congestion}%
                </div>
              </div>

              <div className="zones-detail-stat">
                <div className="zones-detail-stat-label">
                  <Users size={14} /> Population
                </div>
                <div className="zones-detail-stat-value">
                  {formatNumber(selectedZone.population)}
                </div>
              </div>
            </div>

            <div className="zones-section-title">
              <span>Vehicles in {selectedZone.name}</span>
              <span className="zones-count">{zoneVehicles.length} found</span>
            </div>

            <label className="zones-search" style={{ marginBottom: 12 }}>
              <Search size={14} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Filter by ID, plate or road..."
                aria-label="Filter selected zone vehicles"
              />
            </label>

            <div className="zones-table-wrap">
              <table className="zones-table">
                <thead>
                  <tr>
                    <th>Vehicle</th>
                    <th>Road</th>
                    <th>Speed</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {zoneVehicles.map((vehicle: VehicleData) => (
                    <tr key={vehicle.id}>
                      <td>
                        <div className="zones-vehicle-id">{vehicle.id}</div>
                        <div style={{ marginTop: 4, color: "#829bb4" }}>
                          {vehicle.plate}
                        </div>
                      </td>
                      <td>{vehicle.road}</td>
                      <td>{vehicle.speed} km/h</td>
                      <td>
                        <span
                          className={`zones-status ${
                            vehicle.status === "Stopped" ? "stopped" : ""
                          }`}
                        >
                          <span className="zones-status-dot" />
                          {vehicle.status}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="zones-action"
                          onClick={() => selectVehicle(vehicle.id)}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {zoneVehicles.length === 0 && (
                <div className="zones-empty">
                  No simulated vehicles match this zone and search.
                </div>
              )}
            </div>

            <div className="zones-section-title">
              <span>Operational Summary</span>
            </div>

            <div
              style={{
                display: "grid",
                gap: 12,
                color: "#8ca4bd",
                fontSize: 12,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span>Roads configured</span>
                <strong style={{ color: "#e6f2ff" }}>{selectedZone.roads}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span>Vehicle capacity (demo)</span>
                <strong style={{ color: "#e6f2ff" }}>{selectedZone.capacity}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span>Average simulated speed</span>
                <strong style={{ color: "#e6f2ff" }}>
                  {selectedZone.averageSpeed} km/h
                </strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <span>Congestion trend</span>
                <strong
                  style={{
                    color:
                      selectedZone.trafficLevel === "High"
                        ? "#ff8585"
                        : selectedZone.trafficLevel === "Medium"
                        ? "#ffd36e"
                        : "#64e5af",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {selectedZone.trafficLevel === "High" ? (
                    <ArrowUpRight size={14} />
                  ) : selectedZone.trafficLevel === "Low" ? (
                    <ArrowDownRight size={14} />
                  ) : (
                    <Activity size={14} />
                  )}
                  {selectedZone.trafficLevel}
                </strong>
              </div>
            </div>

            <p className="zones-note">
              Vehicle counts and average speeds are derived from the local
              vehicle simulation. Population, congestion, capacity, road and
              incident values are demonstration data until the Zones API is
              connected to the database.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}