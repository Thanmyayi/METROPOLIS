import {
  Activity,
  CarFront,
  Gauge,
  Route,
  TrendingUp,
} from "lucide-react";

const trafficZones = [
  ["Zone A", 72, "High"],
  ["Zone B", 58, "Moderate"],
  ["Zone C", 41, "Moderate"],
  ["Zone D", 29, "Low"],
];

export default function Traffic() {
  return (
    <div className="metropolis-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Traffic Intelligence
          </h1>

          <p className="page-subtitle">
            Monitor traffic flow, congestion and vehicle speeds
          </p>
        </div>

        <span className="live-pill">
          <span className="live-dot" />
          LIVE TRAFFIC
        </span>
      </div>

      <div className="grid-4">
        <div className="panel kpi-card">
          <Activity />

          <span className="kpi-label">
            Traffic Flow
          </span>

          <strong className="kpi-value">
            78%
          </strong>

          <span className="kpi-change">
            ↑ 6.2%
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
          <CarFront />

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
          <Route />

          <span className="kpi-label">
            Congested Roads
          </span>

          <strong className="kpi-value">
            08
          </strong>

          <span className="kpi-change">
            ↓ 2 roads
          </span>
        </div>
      </div>

      <div
        className="grid-2"
        style={{ marginTop: 18 }}
      >
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">
              Traffic Flow — Today
            </h3>

            <TrendingUp
              size={17}
              className="muted"
            />
          </div>

          <div className="chart-area">
            {[
              32, 44, 51, 39, 67, 61,
              73, 58, 79, 65, 82, 74,
            ].map((height, index) => (
              <div
                key={index}
                className="chart-line"
                style={{
                  height: `${height}%`,
                }}
              />
            ))}
          </div>

          <div className="chart-labels">
            <span>08 AM</span>
            <span>12 PM</span>
            <span>04 PM</span>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">
              Congestion by Zone
            </h3>
          </div>

          <div style={{ padding: 20 }}>
            {trafficZones.map(
              ([zone, value, status]) => (
                <div
                  key={zone}
                  style={{ marginBottom: 20 }}
                >
                  <div className="metric-row">
                    <span>{zone}</span>
                    <strong>
                      {value}%
                    </strong>
                  </div>

                  <div className="progress">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${value}%`,
                      }}
                    />
                  </div>

                  <span
                    className={`status ${
                      status === "High"
                        ? "status-high"
                        : status === "Moderate"
                        ? "status-medium"
                        : "status-low"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}