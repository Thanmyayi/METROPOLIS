import {
  Activity,
  BrainCircuit,
  Gauge,
  Lightbulb,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

const zoneAnalytics = [
  {
    zone: "Zone A",
    congestion: 72,
    speed: 32,
    vehicles: 48,
    trend: "+8%",
  },
  {
    zone: "Zone B",
    congestion: 58,
    speed: 36,
    vehicles: 35,
    trend: "-4%",
  },
  {
    zone: "Zone C",
    congestion: 41,
    speed: 42,
    vehicles: 27,
    trend: "+3%",
  },
];

const insights = [
  {
    title: "Congestion Pattern Detected",
    description:
      "Vehicle density is increasing around the central road network during peak hours.",
    type: "Traffic",
  },
  {
    title: "Average Speed Improving",
    description:
      "Average vehicle speed has increased across monitored roads compared with the previous period.",
    type: "Performance",
  },
  {
    title: "Zone A Requires Attention",
    description:
      "Zone A currently has the highest simulated congestion level in the digital twin.",
    type: "Zone",
  },
];

export default function Analytics() {
  return (
    <div className="metropolis-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Analytics</h1>
          <p className="page-subtitle">
            Analyze simulated city data and discover operational patterns
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />
          AI ANALYTICS ACTIVE
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid-4">
        <div className="panel kpi-card">
          <BrainCircuit size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            AI Insights
          </div>

          <div className="kpi-value">24</div>

          <div className="kpi-change">
            ↑ 6 new insights
          </div>
        </div>

        <div className="panel kpi-card">
          <Gauge size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Avg. Speed
          </div>

          <div className="kpi-value">32 km/h</div>

          <div className="kpi-change">
            ↑ 5.2%
          </div>
        </div>

        <div className="panel kpi-card">
          <Activity size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Traffic Efficiency
          </div>

          <div className="kpi-value">78%</div>

          <div className="kpi-change">
            ↑ 4.8%
          </div>
        </div>

        <div className="panel kpi-card">
          <Zap size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Prediction Accuracy
          </div>

          <div className="kpi-value">91%</div>

          <div className="kpi-change">
            Model confidence
          </div>
        </div>
      </div>

      {/* ANALYTICS OVERVIEW */}
      <div
        className="grid-2"
        style={{
          marginTop: 18,
          alignItems: "stretch",
        }}
      >
        {/* TRAFFIC TREND */}
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Traffic Intelligence
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Simulated traffic activity over the current period
              </p>
            </div>

            <TrendingUp size={18} />
          </div>

          <div
            style={{
              height: 260,
              padding: "25px 20px 15px",
              display: "flex",
              alignItems: "flex-end",
              gap: 10,
            }}
          >
            {[42, 55, 48, 67, 58, 72, 64, 81, 69, 76, 84, 73].map(
              (height, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    height: `${height}%`,
                    minWidth: 8,
                    borderRadius: "5px 5px 2px 2px",
                    background:
                      "linear-gradient(180deg, #18c9ef, rgba(24,201,239,.22))",
                    boxShadow:
                      "0 0 12px rgba(24,201,239,.15)",
                    opacity:
                      index === 11 ? 1 : 0.75,
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

        {/* AI PERFORMANCE */}
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                AI Model Performance
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Current analytical engine status
              </p>
            </div>

            <BrainCircuit size={18} />
          </div>

          <div style={{ padding: 20 }}>
            <AnalyticsMetric
              label="Traffic Prediction"
              value="91%"
              progress={91}
            />

            <AnalyticsMetric
              label="Congestion Detection"
              value="88%"
              progress={88}
            />

            <AnalyticsMetric
              label="Incident Pattern Analysis"
              value="84%"
              progress={84}
            />

            <AnalyticsMetric
              label="Vehicle Flow Prediction"
              value="93%"
              progress={93}
            />

            <AnalyticsMetric
              label="Zone Risk Detection"
              value="86%"
              progress={86}
            />
          </div>
        </div>
      </div>

      {/* ZONE ANALYTICS */}
      <div
        className="panel"
        style={{ marginTop: 18 }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Zone Analytics
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Compare simulated activity across city zones
            </p>
          </div>

          <Activity size={18} />
        </div>

        <div className="report-table-wrapper">
          <table className="report-table">
            <thead>
              <tr>
                <th>Zone</th>
                <th>Congestion</th>
                <th>Avg. Speed</th>
                <th>Vehicles</th>
                <th>Trend</th>
              </tr>
            </thead>

            <tbody>
              {zoneAnalytics.map((item) => (
                <tr key={item.zone}>
                  <td>
                    <strong>{item.zone}</strong>
                  </td>

                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        minWidth: 150,
                      }}
                    >
                      <div
                        className="progress"
                        style={{
                          flex: 1,
                        }}
                      >
                        <div
                          className="progress-fill"
                          style={{
                            width: `${item.congestion}%`,
                          }}
                        />
                      </div>

                      <strong>
                        {item.congestion}%
                      </strong>
                    </div>
                  </td>

                  <td>{item.speed} km/h</td>

                  <td>{item.vehicles}</td>

                  <td>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      {item.trend.startsWith("+") ? (
                        <TrendingUp size={14} />
                      ) : (
                        <TrendingDown size={14} />
                      )}

                      {item.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI INSIGHTS */}
      <div
        className="panel"
        style={{ marginTop: 18 }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              AI-Generated Insights
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Patterns identified from simulated city activity
            </p>
          </div>

          <Lightbulb size={18} />
        </div>

        <div
          style={{
            padding: 20,
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 14,
          }}
        >
          {insights.map((insight) => (
            <div
              key={insight.title}
              style={{
                padding: 17,
                borderRadius: 9,
                background:
                  "rgba(4,20,33,.65)",
                border:
                  "1px solid rgba(80,160,195,.12)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <BrainCircuit size={18} />

                <span
                  style={{
                    fontSize: 10,
                    padding: "4px 8px",
                    borderRadius: 20,
                    border:
                      "1px solid rgba(24,201,239,.2)",
                    background:
                      "rgba(24,201,239,.06)",
                  }}
                >
                  {insight.type}
                </span>
              </div>

              <h4
                style={{
                  marginTop: 14,
                  fontSize: 14,
                }}
              >
                {insight.title}
              </h4>

              <p
                className="muted"
                style={{
                  marginTop: 7,
                  fontSize: 12,
                  lineHeight: 1.6,
                }}
              >
                {insight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ANALYTICS METRIC
   ========================================================= */

function AnalyticsMetric({
  label,
  value,
  progress,
}: {
  label: string;
  value: string;
  progress: number;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          marginBottom: 7,
        }}
      >
        <span>{label}</span>

        <strong>{value}</strong>
      </div>

      <div className="progress">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}