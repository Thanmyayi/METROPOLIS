import { Activity, CarFront, Gauge, Route, TrendingUp } from "lucide-react";

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
          <h1 className="page-title">Traffic Intelligence</h1>
          <p className="page-subtitle">
            Monitor traffic flow, congestion and average vehicle speeds
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
          <div className="kpi-label" style={{ marginTop: 15 }}>
            Traffic Flow
          </div>
          <div className="kpi-value">78%</div>
          <div className="kpi-change">↑ 6.2%</div>
        </div>

        <div className="panel kpi-card">
          <Gauge />
          <div className="kpi-label" style={{ marginTop: 15 }}>
            Average Speed
          </div>
          <div className="kpi-value">32 km/h</div>
          <div className="kpi-change">↑ 5%</div>
        </div>

        <div className="panel kpi-card">
          <CarFront />
          <div className="kpi-label" style={{ marginTop: 15 }}>
            Active Vehicles
          </div>
          <div className="kpi-value">128</div>
          <div className="kpi-change">↑ 12%</div>
        </div>

        <div className="panel kpi-card">
          <Route />
          <div className="kpi-label" style={{ marginTop: 15 }}>
            Congested Roads
          </div>
          <div className="kpi-value">08</div>
          <div className="kpi-change">↓ 2 roads</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: 18 }}>
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Traffic Flow — Today</h3>
            <TrendingUp size={16} className="muted" />
          </div>

          <div className="chart-area">
            {[32, 44, 51, 39, 67, 61, 73, 58, 79, 65, 82, 74].map(
              (height, i) => (
                <div
                  key={i}
                  className="chart-line"
                  style={{ "--height": `${height}%` } as React.CSSProperties}
                />
              )
            )}
          </div>

          <div style={{ padding: "0 20px 18px", display: "flex", justifyContent: "space-between" }}>
            <span className="muted">08 AM</span>
            <span className="muted">12 PM</span>
            <span className="muted">04 PM</span>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Congestion by Zone</h3>
          </div>

          <div style={{ padding: 20 }}>
            {trafficZones.map(([zone, value, status]) => (
              <div key={zone} style={{ marginBottom: 20 }}>
                <div className="metric-row">
                  <span>{zone}</span>
                  <strong>{value}%</strong>
                </div>

                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{ width: `${value}%` }}
                  />
                </div>

                <div style={{ marginTop: 6 }}>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}