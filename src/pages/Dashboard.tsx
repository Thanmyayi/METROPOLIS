import {
  Activity,
  Car,
  Gauge,
  Map,
  Radio,
  Route,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

const zones = [
  {
    name: "Zone A",
    value: 72,
    status: "High",
  },
  {
    name: "Zone B",
    value: 58,
    status: "Moderate",
  },
  {
    name: "Zone C",
    value: 41,
    status: "Moderate",
  },
  {
    name: "Zone D",
    value: 29,
    status: "Low",
  },
];

export default function Dashboard() {
  return (
    <div className="metropolis-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            City Intelligence Dashboard
          </h1>

          <p className="page-subtitle">
            Real-time overview of the METROPOLIS digital twin
          </p>
        </div>

        <span className="live-pill">
          <span className="live-dot" />
          SYSTEM LIVE
        </span>
      </div>

      {/* KPI CARDS */}

      <div className="grid-4">
        <div className="panel kpi-card">
          <Radio />

          <span className="kpi-label">
            System Status
          </span>

          <strong className="kpi-value">
            Operational
          </strong>

          <span className="kpi-change">
            Live simulation
          </span>
        </div>

        <div className="panel kpi-card">
          <Car />

          <span className="kpi-label">
            Active Vehicles
          </span>

          <strong className="kpi-value">
            128
          </strong>

          <span className="kpi-change">
            ↑ 12%
          </span>
        </div>

        <div className="panel kpi-card">
          <Gauge />

          <span className="kpi-label">
            Average Speed
          </span>

          <strong className="kpi-value">
            32 km/h
          </strong>

          <span className="kpi-change">
            ↑ 5%
          </span>
        </div>

        <div className="panel kpi-card">
          <ShieldAlert />

          <span className="kpi-label">
            Active Incidents
          </span>

          <strong className="kpi-value">
            08
          </strong>

          <span className="kpi-change">
            ↓ 2 today
          </span>
        </div>
      </div>

      {/* MAIN GRID */}

      <div
        className="grid-2"
        style={{ marginTop: 18 }}
      >
        {/* LIVE MAP */}

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Live City Map
              </h3>

              <p className="muted">
                Simulated real-time vehicle movement
              </p>
            </div>

            <Map
              size={18}
              className="muted"
            />
          </div>

          <div
            style={{
              height: 300,
              position: "relative",
              overflow: "hidden",
              background:
                "linear-gradient(135deg,#071827,#06111d)",
            }}
          >
            <div className="dashboard-map-grid" />

            <div className="dashboard-road road-one" />
            <div className="dashboard-road road-two" />
            <div className="dashboard-road road-three" />

            <span className="dashboard-zone zone-one">
              ZONE A
            </span>

            <span className="dashboard-zone zone-two">
              ZONE B
            </span>

            <span className="dashboard-zone zone-three">
              ZONE C
            </span>

            {[
              [25, 32],
              [48, 54],
              [68, 28],
              [76, 67],
              [38, 72],
            ].map(([left, top], index) => (
              <span
                key={index}
                className="dashboard-vehicle"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
              >
                <Car size={12} />
              </span>
            ))}
          </div>
        </div>

        {/* TRAFFIC */}

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Traffic Intelligence
              </h3>

              <p className="muted">
                Congestion by zone
              </p>
            </div>

            <Activity
              size={18}
              className="muted"
            />
          </div>

          <div style={{ padding: 20 }}>
            {zones.map((zone) => (
              <div
                key={zone.name}
                style={{ marginBottom: 22 }}
              >
                <div className="metric-row">
                  <span>{zone.name}</span>

                  <strong>
                    {zone.value}%
                  </strong>
                </div>

                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${zone.value}%`,
                    }}
                  />
                </div>

                <span
                  className={`status ${
                    zone.status === "High"
                      ? "status-high"
                      : zone.status === "Moderate"
                      ? "status-medium"
                      : "status-low"
                  }`}
                >
                  {zone.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM */}

      <div
        className="grid-3"
        style={{ marginTop: 18 }}
      >
        <div className="panel">
          <Route />
          <h3 className="panel-title">
            Traffic Flow
          </h3>

          <strong className="big-stat">
            78%
          </strong>

          <p className="kpi-change">
            ↑ 6.2% from previous period
          </p>
        </div>

        <div className="panel">
          <TrendingUp />
          <h3 className="panel-title">
            AI Analytics
          </h3>

          <strong className="big-stat">
            Good
          </strong>

          <p className="kpi-change">
            Prediction quality ↑ 4%
          </p>
        </div>

        <div className="panel">
          <Map />
          <h3 className="panel-title">
            Digital Twin
          </h3>

          <strong className="big-stat">
            ACTIVE
          </strong>

          <p className="kpi-change">
            2D simulation engine running
          </p>
        </div>
      </div>
    </div>
  );
}