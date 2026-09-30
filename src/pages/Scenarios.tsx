import { useState } from "react";
import {
  Activity,
  BrainCircuit,
  CarFront,
  CheckCircle2,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

const scenarioTemplates = [
  {
    name: "Peak Hour Simulation",
    description:
      "Simulate increased vehicle activity during morning and evening peak hours.",
    traffic: 25,
    vehicles: 30,
    congestion: 18,
  },
  {
    name: "Road Closure",
    description:
      "Simulate the effect of closing a major road on surrounding traffic.",
    traffic: 40,
    vehicles: 10,
    congestion: 35,
  },
  {
    name: "Public Transport Increase",
    description:
      "Increase simulated public transport activity and evaluate congestion.",
    traffic: -10,
    vehicles: 15,
    congestion: -12,
  },
];

export default function Scenarios() {
  const [trafficChange, setTrafficChange] = useState(20);
  const [vehicleChange, setVehicleChange] = useState(15);
  const [congestionChange, setCongestionChange] = useState(10);
  const [selectedTemplate, setSelectedTemplate] =
    useState("Custom Scenario");

  const [isRunning, setIsRunning] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const runSimulation = () => {
    setIsRunning(true);
    setHasResult(false);

    setTimeout(() => {
      setIsRunning(false);
      setHasResult(true);
    }, 1200);
  };

  const resetSimulation = () => {
    setTrafficChange(20);
    setVehicleChange(15);
    setCongestionChange(10);
    setSelectedTemplate("Custom Scenario");
    setIsRunning(false);
    setHasResult(false);
  };

  const applyTemplate = (
    name: string,
    traffic: number,
    vehicles: number,
    congestion: number
  ) => {
    setSelectedTemplate(name);
    setTrafficChange(traffic);
    setVehicleChange(vehicles);
    setCongestionChange(congestion);
    setHasResult(false);
  };

  return (
    <div className="metropolis-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1 className="page-title">What-If Scenarios</h1>

          <p className="page-subtitle">
            Simulate possible city conditions and analyze their impact
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />
          SIMULATION ENGINE
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
            Active Scenario
          </div>

          <div
            className="kpi-value"
            style={{ fontSize: 21 }}
          >
            {selectedTemplate}
          </div>

          <div className="kpi-change">
            Simulation ready
          </div>
        </div>

        <div className="panel kpi-card">
          <CarFront size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Vehicle Change
          </div>

          <div className="kpi-value">
            {vehicleChange > 0 ? "+" : ""}
            {vehicleChange}%
          </div>

          <div className="kpi-change">
            Simulated vehicles
          </div>
        </div>

        <div className="panel kpi-card">
          <TrendingUp size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Traffic Change
          </div>

          <div className="kpi-value">
            {trafficChange > 0 ? "+" : ""}
            {trafficChange}%
          </div>

          <div className="kpi-change">
            Traffic flow
          </div>
        </div>

        <div className="panel kpi-card">
          <Zap size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Congestion Impact
          </div>

          <div className="kpi-value">
            {congestionChange > 0 ? "+" : ""}
            {congestionChange}%
          </div>

          <div className="kpi-change">
            Predicted impact
          </div>
        </div>
      </div>

      {/* MAIN SIMULATION AREA */}
      <div
        className="grid-2"
        style={{
          marginTop: 18,
          alignItems: "stretch",
        }}
      >
        {/* SCENARIO CONTROLS */}
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Scenario Configuration
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Adjust simulation parameters
              </p>
            </div>

            <SlidersHorizontal size={18} />
          </div>

          <div style={{ padding: 20 }}>
            <div className="report-field">
              <label>Scenario Template</label>

              <select
                value={selectedTemplate}
                onChange={(event) => {
                  const value = event.target.value;

                  if (value === "Custom Scenario") {
                    setSelectedTemplate(value);
                    return;
                  }

                  const template = scenarioTemplates.find(
                    (item) => item.name === value
                  );

                  if (template) {
                    applyTemplate(
                      template.name,
                      template.traffic,
                      template.vehicles,
                      template.congestion
                    );
                  }
                }}
              >
                <option value="Custom Scenario">
                  Custom Scenario
                </option>

                {scenarioTemplates.map((template) => (
                  <option
                    key={template.name}
                    value={template.name}
                  >
                    {template.name}
                  </option>
                ))}
              </select>
            </div>

            <ScenarioSlider
              label="Traffic Flow Change"
              value={trafficChange}
              min={-50}
              max={100}
              unit="%"
              onChange={(value) => {
                setTrafficChange(value);
                setSelectedTemplate("Custom Scenario");
                setHasResult(false);
              }}
            />

            <ScenarioSlider
              label="Vehicle Activity Change"
              value={vehicleChange}
              min={-50}
              max={100}
              unit="%"
              onChange={(value) => {
                setVehicleChange(value);
                setSelectedTemplate("Custom Scenario");
                setHasResult(false);
              }}
            />

            <ScenarioSlider
              label="Expected Congestion Change"
              value={congestionChange}
              min={-50}
              max={100}
              unit="%"
              onChange={(value) => {
                setCongestionChange(value);
                setSelectedTemplate("Custom Scenario");
                setHasResult(false);
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                marginTop: 22,
              }}
            >
              <button
                type="button"
                className="report-action-button"
                onClick={resetSimulation}
              >
                <RotateCcw size={15} />
                Reset
              </button>

              <button
                type="button"
                className="report-generate-button"
                onClick={runSimulation}
                disabled={isRunning}
                style={{
                  opacity: isRunning ? 0.65 : 1,
                  cursor: isRunning
                    ? "wait"
                    : "pointer",
                }}
              >
                <Play size={15} />

                {isRunning
                  ? "Running..."
                  : "Run Simulation"}
              </button>
            </div>
          </div>
        </div>

        {/* PREDICTION PANEL */}
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Predicted Impact
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Simulation engine projection
              </p>
            </div>

            <BrainCircuit size={18} />
          </div>

          <div style={{ padding: 20 }}>
            {!hasResult && !isRunning && (
              <div
                style={{
                  minHeight: 270,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: 20,
                }}
              >
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "rgba(20,190,235,.08)",
                    border:
                      "1px solid rgba(20,190,235,.16)",
                  }}
                >
                  <Sparkles size={25} />
                </div>

                <h3
                  style={{
                    marginTop: 15,
                    fontSize: 15,
                  }}
                >
                  Ready to Simulate
                </h3>

                <p
                  className="muted"
                  style={{
                    marginTop: 7,
                    fontSize: 12,
                    maxWidth: 300,
                    lineHeight: 1.6,
                  }}
                >
                  Configure the scenario parameters and run
                  the simulation to generate predicted results.
                </p>
              </div>
            )}

            {isRunning && (
              <div
                style={{
                  minHeight: 270,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div
                  className="scenario-spinner"
                />

                <h3
                  style={{
                    marginTop: 18,
                    fontSize: 15,
                  }}
                >
                  Running Simulation
                </h3>

                <p
                  className="muted"
                  style={{
                    marginTop: 7,
                    fontSize: 12,
                  }}
                >
                  Processing digital-twin conditions...
                </p>
              </div>
            )}

            {hasResult && (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: 12,
                    borderRadius: 8,
                    background:
                      "rgba(30,205,150,.07)",
                    border:
                      "1px solid rgba(30,205,150,.15)",
                    marginBottom: 16,
                  }}
                >
                  <CheckCircle2 size={17} />

                  <div>
                    <strong
                      style={{ fontSize: 13 }}
                    >
                      Simulation completed
                    </strong>

                    <div
                      className="muted"
                      style={{
                        marginTop: 3,
                        fontSize: 11,
                      }}
                    >
                      Predicted city response generated
                    </div>
                  </div>
                </div>

                <ImpactMetric
                  label="Traffic Flow"
                  value={trafficChange}
                  suffix="%"
                />

                <ImpactMetric
                  label="Vehicle Activity"
                  value={vehicleChange}
                  suffix="%"
                />

                <ImpactMetric
                  label="Congestion"
                  value={congestionChange}
                  suffix="%"
                  inverse
                />

                <div
                  style={{
                    marginTop: 18,
                    padding: 14,
                    borderRadius: 8,
                    background:
                      "rgba(20,190,235,.05)",
                    border:
                      "1px solid rgba(20,190,235,.12)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                    }}
                  >
                    <BrainCircuit size={16} />

                    <strong
                      style={{ fontSize: 13 }}
                    >
                      AI Analysis
                    </strong>
                  </div>

                  <p
                    className="muted"
                    style={{
                      marginTop: 8,
                      fontSize: 12,
                      lineHeight: 1.6,
                    }}
                  >
                    The simulated scenario indicates that
                    changes in vehicle activity may affect
                    traffic flow and congestion across the
                    monitored zones.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PREDEFINED SCENARIOS */}
      <div
        className="panel"
        style={{ marginTop: 18 }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Scenario Templates
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Quickly configure common city conditions
            </p>
          </div>

          <Activity size={18} />
        </div>

        <div
          style={{
            padding: 20,
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 14,
          }}
        >
          {scenarioTemplates.map((template) => (
            <button
              key={template.name}
              type="button"
              onClick={() =>
                applyTemplate(
                  template.name,
                  template.traffic,
                  template.vehicles,
                  template.congestion
                )
              }
              style={{
                textAlign: "left",
                padding: 17,
                borderRadius: 9,
                border:
                  selectedTemplate === template.name
                    ? "1px solid rgba(20,200,240,.35)"
                    : "1px solid rgba(100,160,190,.10)",
                background:
                  selectedTemplate === template.name
                    ? "rgba(20,190,235,.07)"
                    : "rgba(5,20,32,.45)",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="quick-report-icon">
                  <Zap size={18} />
                </div>

                {selectedTemplate === template.name && (
                  <CheckCircle2 size={17} />
                )}
              </div>

              <h4
                style={{
                  marginTop: 14,
                  fontSize: 14,
                }}
              >
                {template.name}
              </h4>

              <p
                className="muted"
                style={{
                  marginTop: 7,
                  fontSize: 12,
                  lineHeight: 1.55,
                }}
              >
                {template.description}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  marginTop: 13,
                }}
              >
                <MiniValue
                  label="Traffic"
                  value={`${template.traffic > 0 ? "+" : ""}${template.traffic}%`}
                />

                <MiniValue
                  label="Vehicles"
                  value={`${template.vehicles > 0 ? "+" : ""}${template.vehicles}%`}
                />

                <MiniValue
                  label="Congestion"
                  value={`${template.congestion > 0 ? "+" : ""}${template.congestion}%`}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SCENARIO SLIDER
   ========================================================= */

function ScenarioSlider({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (value: number) => void;
}) {
  return (
    <div style={{ marginTop: 22 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          marginBottom: 9,
        }}
      >
        <span style={{ fontSize: 13 }}>
          {label}
        </span>

        <strong style={{ fontSize: 13 }}>
          {value > 0 ? "+" : ""}
          {value}
          {unit}
        </strong>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) =>
          onChange(Number(event.target.value))
        }
        style={{
          width: "100%",
          accentColor: "#18c9ef",
          cursor: "pointer",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 5,
          fontSize: 10,
          color: "#718693",
        }}
      >
        <span>{min}%</span>
        <span>0%</span>
        <span>+{max}%</span>
      </div>
    </div>
  );
}

/* =========================================================
   IMPACT METRIC
   ========================================================= */

function ImpactMetric({
  label,
  value,
  suffix,
  inverse = false,
}: {
  label: string;
  value: number;
  suffix: string;
  inverse?: boolean;
}) {
  const positive = value > 0;

  const isGood =
    inverse ? !positive : positive;

  return (
    <div
      style={{
        padding: "12px 0",
        borderBottom:
          "1px solid rgba(100,160,190,.09)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 13 }}>
          {label}
        </span>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontWeight: 700,
          }}
        >
          {positive ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}

          {value > 0 ? "+" : ""}
          {value}
          {suffix}
        </span>
      </div>

      <div
        className="muted"
        style={{
          fontSize: 10,
          marginTop: 4,
        }}
      >
        {isGood
          ? "Potentially favorable impact"
          : "Requires operational attention"}
      </div>
    </div>
  );
}

/* =========================================================
   MINI VALUE
   ========================================================= */

function MiniValue({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <span
      style={{
        fontSize: 10,
        padding: "5px 7px",
        borderRadius: 5,
        background:
          "rgba(100,160,190,.07)",
        border:
          "1px solid rgba(100,160,190,.10)",
      }}
    >
      {label}: <strong>{value}</strong>
    </span>
  );
}