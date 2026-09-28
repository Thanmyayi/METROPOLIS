import {
  Activity,
  Gauge,
  MapPin,
  Route,
  Users,
} from "lucide-react";

const zones = [
  {
    name: "Zone A",
    type: "Central District",
    congestion: 72,
    vehicles: 42,
    speed: 26,
  },
  {
    name: "Zone B",
    type: "Business Hub",
    congestion: 58,
    vehicles: 35,
    speed: 31,
  },
  {
    name: "Zone C",
    type: "Residential Area",
    congestion: 41,
    vehicles: 29,
    speed: 36,
  },
  {
    name: "Zone D",
    type: "Tech Park",
    congestion: 29,
    vehicles: 22,
    speed: 42,
  },
];

export default function Zones() {
  return (
    <div className="metropolis-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            City Zones
          </h1>

          <p className="page-subtitle">
            Monitor traffic conditions across city zones
          </p>
        </div>

        <span className="live-pill">
          <span className="live-dot" />
          LIVE ZONES
        </span>
      </div>

      <div className="zones-grid">
        {zones.map((zone) => (
          <div
            className="panel zone-card"
            key={zone.name}
          >
            <div className="zone-card-header">
              <div>
                <h3>{zone.name}</h3>

                <span>
                  <MapPin size={12} />
                  {zone.type}
                </span>
              </div>

              <Route size={18} />
            </div>

            <div className="zone-congestion">
              <strong>
                {zone.congestion}%
              </strong>

              <span>Congestion</span>
            </div>

            <div className="progress">
              <div
                className="progress-fill"
                style={{
                  width: `${zone.congestion}%`,
                }}
              />
            </div>

            <div className="zone-stats">
              <div>
                <Users size={14} />
                <span>
                  Vehicles
                  <strong>
                    {zone.vehicles}
                  </strong>
                </span>
              </div>

              <div>
                <Gauge size={14} />
                <span>
                  Speed
                  <strong>
                    {zone.speed} km/h
                  </strong>
                </span>
              </div>

              <div>
                <Activity size={14} />
                <span>
                  Flow
                  <strong>Active</strong>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}