import {
  Activity,
  CarFront,
  Gauge,
  Radio,
  Route,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const trafficZones = [
  {
    zone: "Zone A",
    congestion: 72,
    speed: 32,
    vehicles: 48,
    status: "High",
  },
  {
    zone: "Zone B",
    congestion: 58,
    speed: 36,
    vehicles: 35,
    status: "Medium",
  },
  {
    zone: "Zone C",
    congestion: 41,
    speed: 42,
    vehicles: 27,
    status: "Medium",
  },
  {
    zone: "Zone D",
    congestion: 29,
    speed: 48,
    vehicles: 18,
    status: "Low",
  },
];

const roads = [
  {
    road: "MG Road",
    zone: "Zone A",
    level: "High",
    speed: 24,
    vehicles: 21,
    congestion: 78,
  },
  {
    road: "Main Road",
    zone: "Zone A",
    level: "High",
    speed: 28,
    vehicles: 18,
    congestion: 69,
  },
  {
    road: "Central Avenue",
    zone: "Zone B",
    level: "Medium",
    speed: 35,
    vehicles: 15,
    congestion: 54,
  },
  {
    road: "Park Road",
    zone: "Zone B",
    level: "Medium",
    speed: 38,
    vehicles: 12,
    congestion: 48,
  },
  {
    road: "Ring Road",
    zone: "Zone C",
    level: "Low",
    speed: 46,
    vehicles: 10,
    congestion: 31,
  },
];

export default function Traffic() {
  return (
    <div className="metropolis-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Traffic Intelligence</h1>

          <p className="page-subtitle">
            Monitor traffic flow, congestion and simulated road activity
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />
          LIVE TRAFFIC
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid-4">
        <div className="panel kpi-card">
          <Activity size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Traffic Flow
          </div>

          <div className="kpi-value">78%</div>

          <div className="kpi-change">
            <TrendingUp size={13} />
            6.2% from previous period
          </div>
        </div>

        <div className="panel kpi-card">
          <Gauge size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Average Speed
          </div>

          <div className="kpi-value">32 km/h</div>

          <div className="kpi-change">
            <TrendingUp size={13} />
            5% improvement
          </div>
        </div>

        <div className="panel kpi-card">
          <CarFront size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Active Vehicles
          </div>

          <div className="kpi-value">128</div>

          <div className="kpi-change">
            <TrendingUp size={13} />
            12% activity increase
          </div>
        </div>

        <div className="panel kpi-card">
          <Route size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Congested Roads
          </div>

          <div className="kpi-value">08</div>

          <div className="kpi-change">
            <TrendingDown size={13} />
            2 roads improved
          </div>
        </div>
      </div>

      {/* TRAFFIC CHART + ZONES */}
      <div
        className="grid-2"
        style={{
          marginTop: 18,
          alignItems: "stretch",
        }}
      >
        {/* TRAFFIC FLOW */}
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Traffic Flow — Today
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Simulated traffic activity throughout the day
              </p>
            </div>

            <TrendingUp size={18} />
          </div>

          <div
            style={{
              height: 270,
              padding: "25px 20px 10px",
              display: "flex",
              alignItems: "flex-end",
              gap: 9,
            }}
          >
            {[32, 44, 51, 39, 67, 61, 73, 58, 79, 65, 82, 74].map(
              (height, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    height: `${height}%`,
                    minWidth: 7,
                    borderRadius: "5px 5px 2px 2px",
                    background:
                      "linear-gradient(180deg, #18c9ef, rgba(24,201,239,.18))",
                    boxShadow:
                      "0 0 12px rgba(24,201,239,.12)",
                  }}
                />
              )
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 20px 18px",
            }}
          >
            <span className="muted">08 AM</span>
            <span className="muted">12 PM</span>
            <span className="muted">04 PM</span>
            <span className="muted">08 PM</span>
          </div>
        </div>

        {/* ZONE CONGESTION */}
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Congestion by Zone
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Current simulated congestion levels
              </p>
            </div>

            <Activity size={18} />
          </div>

          <div style={{ padding: 20 }}>
            {trafficZones.map((item) => (
              <div
                key={item.zone}
                style={{
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                    marginBottom: 7,
                  }}
                >
                  <span>{item.zone}</span>

                  <strong>
                    {item.congestion}%
                  </strong>
                </div>

                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${item.congestion}%`,
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 6,
                  }}
                >
                  <span
                    className={`status ${
                      item.status === "High"
                        ? "status-high"
                        : item.status === "Medium"
                          ? "status-medium"
                          : "status-low"
                    }`}
                  >
                    {item.status}
                  </span>

                  <span
                    className="muted"
                    style={{ fontSize: 11 }}
                  >
                    {item.vehicles} vehicles
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TRAFFIC STATUS */}
      <div
        className="panel"
        style={{ marginTop: 18 }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Road Traffic Status
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Live traffic conditions across monitored roads
            </p>
          </div>

          <Radio size={18} />
        </div>

        <div className="report-table-wrapper">
          <table className="report-table">
            <thead>
              <tr>
                <th>Road</th>
                <th>Zone</th>
                <th>Traffic</th>
                <th>Avg. Speed</th>
                <th>Vehicles</th>
                <th>Congestion</th>
              </tr>
            </thead>

            <tbody>
              {roads.map((road) => (
                <tr key={road.road}>
                  <td>
                    <strong>{road.road}</strong>
                  </td>

                  <td className="muted">
                    {road.zone}
                  </td>

                  <td>
                    <span
                      className={`status ${
                        road.level === "High"
                          ? "status-high"
                          : road.level === "Medium"
                            ? "status-medium"
                            : "status-low"
                      }`}
                    >
                      {road.level}
                    </span>
                  </td>

                  <td>
                    {road.speed} km/h
                  </td>

                  <td>
                    {road.vehicles}
                  </td>

                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        minWidth: 130,
                      }}
                    >
                      <div
                        className="progress"
                        style={{ flex: 1 }}
                      >
                        <div
                          className="progress-fill"
                          style={{
                            width: `${road.congestion}%`,
                          }}
                        />
                      </div>

                      <strong>
                        {road.congestion}%
                      </strong>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TRAFFIC INSIGHTS */}
      <div
        className="panel"
        style={{ marginTop: 18 }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Traffic Intelligence Summary
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Automated observations from the simulated traffic network
            </p>
          </div>

          <Gauge size={18} />
        </div>

        <div
          style={{
            padding: 20,
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
          }}
        >
          <InsightCard
            title="Peak Traffic"
            value="06:00 PM"
            description="Highest simulated traffic activity occurs during the evening period."
          />

          <InsightCard
            title="Highest Congestion"
            value="Zone A"
            description="Central District currently records the highest congestion level."
          />

          <InsightCard
            title="Fastest Zone"
            value="Zone C"
            description="Residential Area currently has the highest average simulated speed."
          />

          <InsightCard
            title="Network Status"
            value="Operational"
            description="Traffic monitoring and simulation services are running normally."
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   INSIGHT CARD
   ========================================================= */

function InsightCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 9,
        border:
          "1px solid rgba(100,160,190,.10)",
        background: "rgba(5,20,32,.45)",
      }}
    >
      <div
        className="muted"
        style={{
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: ".08em",
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: 8,
          fontSize: 17,
          fontWeight: 700,
        }}
      >
        {value}
      </div>

      <p
        className="muted"
        style={{
          marginTop: 7,
          fontSize: 11,
          lineHeight: 1.55,
        }}
      >
        {description}
      </p>
    </div>
  );
}