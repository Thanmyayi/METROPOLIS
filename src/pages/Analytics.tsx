import {
  Activity,
  BrainCircuit,
  Gauge,
  TrendingUp,
  Zap,
} from "lucide-react";

export default function Analytics() {
  return (
    <div className="metropolis-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            AI Analytics
          </h1>

          <p className="page-subtitle">
            Intelligent insights generated from simulated city data
          </p>
        </div>

        <span className="live-pill">
          <span className="live-dot" />
          AI ENGINE ACTIVE
        </span>
      </div>

      <div className="grid-4">
        <div className="panel kpi-card">
          <BrainCircuit />

          <span className="kpi-label">
            AI Quality
          </span>

          <strong className="kpi-value">
            Good
          </strong>

          <span className="kpi-change">
            ↑ 4%
          </span>
        </div>

        <div className="panel kpi-card">
          <TrendingUp />

          <span className="kpi-label">
            Predictions
          </span>

          <strong className="kpi-value">
            94%
          </strong>

          <span className="kpi-change">
            Confidence
          </span>
        </div>

        <div className="panel kpi-card">
          <Gauge />

          <span className="kpi-label">
            Avg Speed
          </span>

          <strong className="kpi-value">
            32 km/h
          </strong>
        </div>

        <div className="panel kpi-card">
          <Zap />

          <span className="kpi-label">
            AI Alerts
          </span>

          <strong className="kpi-value">
            12
          </strong>
        </div>
      </div>

      <div
        className="grid-2"
        style={{ marginTop: 18 }}
      >
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">
              Traffic Prediction
            </h3>

            <TrendingUp
              size={17}
              className="muted"
            />
          </div>

          <div className="analytics-chart">
            {[35, 44, 48, 57, 51, 65, 72, 68, 81, 76].map(
              (height, index) => (
                <div
                  key={index}
                  style={{
                    height: `${height}%`,
                  }}
                />
              ),
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">
              AI Insights
            </h3>

            <BrainCircuit
              size={17}
              className="muted"
            />
          </div>

          <div className="insight-list">
            <div>
              <Activity />
              <span>
                Zone A congestion expected to increase
              </span>
            </div>

            <div>
              <Gauge />
              <span>
                Average speed likely to decrease during peak hours
              </span>
            </div>

            <div>
              <Zap />
              <span>
                Traffic optimization opportunity detected
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}