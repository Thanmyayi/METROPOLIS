import {
  BrainCircuit,
  TrendingDown,
  TrendingUp,
  Activity,
  Sparkles,
} from "lucide-react";

export default function Analytics() {
  return (
    <div className="metropolis-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Powered Analytics</h1>
          <p className="page-subtitle">
            Smart insights, predictions and city performance analysis
          </p>
        </div>

        <span className="live-pill">
          <Sparkles size={13} />
          AI ENGINE ONLINE
        </span>
      </div>

      <div className="grid-4">
        <div className="panel kpi-card">
          <Activity />
          <div className="kpi-label" style={{ marginTop: 13 }}>
            Traffic Score
          </div>
          <div className="kpi-value">78%</div>
          <div className="kpi-change">↑ 4.2%</div>
        </div>

        <div className="panel kpi-card">
          <TrendingDown />
          <div className="kpi-label" style={{ marginTop: 13 }}>
            Congestion Risk
          </div>
          <div className="kpi-value">31%</div>
          <div className="kpi-change">↓ 7%</div>
        </div>

        <div className="panel kpi-card">
          <BrainCircuit />
          <div className="kpi-label" style={{ marginTop: 13 }}>
            Prediction Accuracy
          </div>
          <div className="kpi-value">92%</div>
          <div className="kpi-change">Stable</div>
        </div>

        <div className="panel kpi-card">
          <TrendingUp />
          <div className="kpi-label" style={{ marginTop: 13 }}>
            City Efficiency
          </div>
          <div className="kpi-value">84%</div>
          <div className="kpi-change">↑ 9%</div>
        </div>
      </div>

      <div className="grid-2" style={{ marginTop: 18 }}>
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Traffic Prediction</h3>
            <span className="muted">Next 6 hours</span>
          </div>

          <div className="chart-area">
            {[30, 38, 43, 48, 61, 72, 81, 70, 63, 55, 47, 42].map(
              (height, i) => (
                <div
                  key={i}
                  className="chart-line"
                  style={{ "--height": `${height}%` } as React.CSSProperties}
                />
              )
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">AI Recommendations</h3>
            <BrainCircuit size={16} className="muted" />
          </div>

          <div style={{ padding: 20 }}>
            <div className="incident-item">
              <div className="incident-icon">
                <TrendingDown size={17} />
              </div>
              <div className="incident-main">
                <div className="incident-title">
                  Optimize Zone A traffic
                </div>
                <div className="incident-meta">
                  Predicted congestion increase within 30 minutes.
                </div>
              </div>
            </div>

            <div className="incident-item">
              <div className="incident-icon">
                <Activity size={17} />
              </div>
              <div className="incident-main">
                <div className="incident-title">
                  Reroute vehicles from Main Road
                </div>
                <div className="incident-meta">
                  Alternative route can reduce density by 14%.
                </div>
              </div>
            </div>

            <div className="incident-item">
              <div className="incident-icon">
                <Sparkles size={17} />
              </div>
              <div className="incident-main">
                <div className="incident-title">
                  Improve traffic signal timing
                </div>
                <div className="incident-meta">
                  Estimated city efficiency improvement: 8%.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}