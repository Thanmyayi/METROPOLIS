import {
  Activity,
  CarFront,
  CheckCircle2,
  Clock3,
  Gauge,
  Play,
  RotateCcw,
  Settings2,
  ShieldAlert,
  TrafficCone,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

type Scenario = {
  id: number;
  name: string;
  description: string;
  duration: string;
  vehicles: number;
  trafficLevel: string;
  impact: string;
  icon: React.ReactNode;
};

const scenarios: Scenario[] = [
  {
    id: 1,
    name: "Normal City Flow",
    description:
      "Simulate normal vehicle movement across all major city zones.",
    duration: "10 min",
    vehicles: 8,
    trafficLevel: "Moderate",
    impact: "Low",
    icon: <CarFront size={18} />,
  },
  {
    id: 2,
    name: "Peak Hour Traffic",
    description:
      "Simulate increased traffic volume during morning or evening peak hours.",
    duration: "15 min",
    vehicles: 18,
    trafficLevel: "High",
    impact: "Medium",
    icon: <TrafficCone size={18} />,
  },
  {
    id: 3,
    name: "Major Road Incident",
    description:
      "Simulate a road incident causing congestion and reduced vehicle speed.",
    duration: "12 min",
    vehicles: 14,
    trafficLevel: "Critical",
    impact: "High",
    icon: <ShieldAlert size={18} />,
  },
  {
    id: 4,
    name: "Emergency Response",
    description:
      "Simulate emergency vehicle movement and operational response.",
    duration: "8 min",
    vehicles: 10,
    trafficLevel: "High",
    impact: "High",
    icon: <Zap size={18} />,
  },
  {
    id: 5,
    name: "Low Traffic Period",
    description:
      "Simulate low-density traffic conditions during off-peak hours.",
    duration: "10 min",
    vehicles: 5,
    trafficLevel: "Low",
    impact: "Low",
    icon: <Gauge size={18} />,
  },
];

export default function Scenarios() {
  const [selectedScenario, setSelectedScenario] =
    useState<Scenario | null>(null);

  const [runningScenario, setRunningScenario] =
    useState<number | null>(null);

  const [completedScenario, setCompletedScenario] =
    useState<number | null>(null);

  const handleRunScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setRunningScenario(scenario.id);
    setCompletedScenario(null);

    setTimeout(() => {
      setRunningScenario(null);
      setCompletedScenario(scenario.id);
    }, 3000);
  };

  const handleReset = () => {
    setSelectedScenario(null);
    setRunningScenario(null);
    setCompletedScenario(null);
  };

  return (
    <div className="metropolis-page">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="page-header">
        <div>
          <h1 className="page-title">
            Traffic Scenarios
          </h1>

          <p className="page-subtitle">
            Simulate different urban traffic conditions
            and evaluate operational impact
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />
          SIMULATION READY
        </div>
      </div>

      {/* =================================================
          TOP STATUS
      ================================================= */}

      <div className="grid-4">
        <ScenarioStatusCard
          icon={<Activity size={21} />}
          label="Scenario Engine"
          value={
            runningScenario
              ? "Running"
              : "Ready"
          }
          status={
            runningScenario
              ? "running"
              : "good"
          }
        />

        <ScenarioStatusCard
          icon={<CarFront size={21} />}
          label="Simulated Vehicles"
          value={
            selectedScenario
              ? selectedScenario.vehicles.toString()
              : "8"
          }
          status="good"
        />

        <ScenarioStatusCard
          icon={<Gauge size={21} />}
          label="Traffic Level"
          value={
            selectedScenario
              ? selectedScenario.trafficLevel
              : "Moderate"
          }
          status={
            selectedScenario?.trafficLevel ===
            "Critical"
              ? "danger"
              : selectedScenario?.trafficLevel ===
                  "High"
                ? "warning"
                : "good"
          }
        />

        <ScenarioStatusCard
          icon={<Clock3 size={21} />}
          label="Duration"
          value={
            selectedScenario
              ? selectedScenario.duration
              : "10 min"
          }
          status="good"
        />
      </div>

      {/* =================================================
          ACTIVE SCENARIO
      ================================================= */}

      {selectedScenario && (
        <section
          className="panel"
          style={{
            marginTop: 18,
          }}
        >
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Active Scenario
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Current digital twin simulation
              </p>
            </div>

            {runningScenario ? (
              <span className="status status-medium">
                RUNNING
              </span>
            ) : completedScenario ===
              selectedScenario.id ? (
              <span className="status status-low">
                COMPLETED
              </span>
            ) : (
              <span className="status status-low">
                READY
              </span>
            )}
          </div>

          <div
            style={{
              padding: 18,
              display: "grid",
              gridTemplateColumns:
                "1fr auto",
              gap: 20,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  className="scenario-icon-large"
                >
                  {selectedScenario.icon}
                </div>

                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: 17,
                    }}
                  >
                    {selectedScenario.name}
                  </h2>

                  <p
                    className="muted"
                    style={{
                      marginTop: 6,
                      fontSize: 10,
                      lineHeight: 1.6,
                    }}
                  >
                    {selectedScenario.description}
                  </p>
                </div>
              </div>

              {runningScenario ===
                selectedScenario.id && (
                <div
                  style={{
                    marginTop: 18,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      marginBottom: 7,
                    }}
                  >
                    <span
                      className="muted"
                      style={{
                        fontSize: 9,
                      }}
                    >
                      Simulation progress
                    </span>

                    <span
                      className="muted"
                      style={{
                        fontSize: 9,
                      }}
                    >
                      Processing...
                    </span>
                  </div>

                  <div
                    style={{
                      height: 7,
                      borderRadius: 20,
                      background:
                        "rgba(100,160,190,.10)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      className="scenario-progress"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="settings-secondary-button"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>
        </section>
      )}

      {/* =================================================
          SCENARIO LIST
      ================================================= */}

      <section
        className="panel"
        style={{
          marginTop: 18,
        }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Available Scenarios
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Select a scenario to run inside the
              METROPOLIS digital twin
            </p>
          </div>

          <Settings2 size={18} />
        </div>

        <div
          style={{
            padding: 18,
            display: "grid",
            gridTemplateColumns:
              "repeat(2, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          {scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              running={
                runningScenario ===
                scenario.id
              }
              completed={
                completedScenario ===
                scenario.id
              }
              onRun={() =>
                handleRunScenario(
                  scenario,
                )
              }
            />
          ))}
        </div>
      </section>

      {/* =================================================
          SCENARIO IMPACT
      ================================================= */}

      <section
        className="panel"
        style={{
          marginTop: 18,
        }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Simulation Impact
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Operational metrics affected by the
              selected scenario
            </p>
          </div>

          <TrendingUp size={18} />
        </div>

        <div
          style={{
            padding: 18,
            display: "grid",
            gridTemplateColumns:
              "repeat(3, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          <ImpactCard
            icon={<CarFront size={17} />}
            title="Vehicle Volume"
            value={
              selectedScenario
                ? `${selectedScenario.vehicles}`
                : "8"
            }
            description="Simulated vehicles"
          />

          <ImpactCard
            icon={<Gauge size={17} />}
            title="Traffic Pressure"
            value={
              selectedScenario
                ? selectedScenario.trafficLevel
                : "Moderate"
            }
            description="Estimated traffic condition"
          />

          <ImpactCard
            icon={<Users size={17} />}
            title="Operational Impact"
            value={
              selectedScenario
                ? selectedScenario.impact
                : "Low"
            }
            description="Expected city impact"
          />
        </div>
      </section>

      {/* =================================================
          FOOTER
      ================================================= */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 14,
          paddingBottom: 20,
          color: "#64808d",
          fontSize: 10,
        }}
      >
        <Activity size={13} />

        METROPOLIS scenario engine digitally simulates
        traffic conditions without requiring physical
        IoT hardware.
      </div>

      {/* =================================================
          LOCAL STYLES
      ================================================= */}

      <style>{`
        .scenario-icon-large {
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          color: #20c7df;
          background: rgba(20,190,235,.08);
          border: 1px solid rgba(20,190,235,.12);
        }

        .scenario-card {
          padding: 17px;
          border: 1px solid rgba(100,160,190,.09);
          border-radius: 9px;
          background: rgba(10,28,36,.28);
          transition:
            transform .2s ease,
            border-color .2s ease,
            background .2s ease;
        }

        .scenario-card:hover {
          transform: translateY(-2px);
          border-color: rgba(20,190,235,.2);
          background: rgba(10,35,45,.38);
        }

        .scenario-card.selected {
          border-color: rgba(20,190,235,.35);
          background: rgba(20,190,235,.045);
        }

        .scenario-card-header {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .scenario-card-icon {
          width: 34px;
          height: 34px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          color: #82a4af;
          background: rgba(100,160,190,.06);
        }

        .scenario-card-title {
          font-size: 12px;
          font-weight: 700;
          color: #c2d5dc;
        }

        .scenario-card-description {
          margin-top: 5px;
          color: #5f7c88;
          font-size: 9px;
          line-height: 1.6;
        }

        .scenario-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 15px;
        }

        .scenario-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 7px;
          border-radius: 5px;
          color: #718c97;
          background: rgba(100,160,190,.05);
          font-size: 9px;
        }

        .scenario-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 15px;
        }

        .scenario-run-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 12px;
          border: 1px solid rgba(20,190,235,.25);
          border-radius: 6px;
          background: rgba(20,190,235,.08);
          color: #8ecbd6;
          font-family: inherit;
          font-size: 9px;
          font-weight: 600;
          cursor: pointer;
          transition: all .2s ease;
        }

        .scenario-run-button:hover {
          background: rgba(20,190,235,.16);
          border-color: rgba(20,190,235,.45);
        }

        .scenario-run-button.running {
          cursor: wait;
          opacity: .65;
        }

        .scenario-run-button.completed {
          border-color: rgba(49,210,154,.25);
          background: rgba(49,210,154,.07);
          color: #71d8b1;
        }

        .scenario-progress {
          width: 100%;
          height: 100%;
          border-radius: 20px;
          background: #20c7df;
          animation: scenarioProgress 3s linear forwards;
        }

        @keyframes scenarioProgress {
          from {
            width: 0%;
          }

          to {
            width: 100%;
          }
        }

        @media (max-width: 900px) {
          .scenario-card {
            grid-column: span 2;
          }
        }
      `}</style>
    </div>
  );
}

/* =========================================================
   SCENARIO STATUS CARD
========================================================= */

function ScenarioStatusCard({
  icon,
  label,
  value,
  status,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  status:
    | "good"
    | "warning"
    | "danger"
    | "running";
}) {
  const statusClass =
    status === "good"
      ? "status-low"
      : status === "warning"
        ? "status-medium"
        : status === "danger"
          ? "status-high"
          : "status-medium";

  return (
    <div className="panel kpi-card">
      {icon}

      <div
        className="kpi-label"
        style={{
          marginTop: 14,
        }}
      >
        {label}
      </div>

      <div
        className="kpi-value"
        style={{
          fontSize: 18,
        }}
      >
        {value}
      </div>

      <div
        style={{
          marginTop: 7,
        }}
      >
        <span
          className={`status ${statusClass}`}
        >
          {status === "running"
            ? "RUNNING"
            : status === "good"
              ? "READY"
              : status === "warning"
                ? "WATCH"
                : "ALERT"}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   SCENARIO CARD
========================================================= */

function ScenarioCard({
  scenario,
  running,
  completed,
  onRun,
}: {
  scenario: Scenario;
  running: boolean;
  completed: boolean;
  onRun: () => void;
}) {
  return (
    <div
      className={`scenario-card ${
        running || completed
          ? "selected"
          : ""
      }`}
    >
      <div className="scenario-card-header">
        <div className="scenario-card-icon">
          {scenario.icon}
        </div>

        <div style={{ flex: 1 }}>
          <div className="scenario-card-title">
            {scenario.name}
          </div>

          <div className="scenario-card-description">
            {scenario.description}
          </div>
        </div>

        {completed && (
          <CheckCircle2
            size={16}
            style={{
              color: "#31d29a",
              flexShrink: 0,
            }}
          />
        )}
      </div>

      <div className="scenario-meta">
        <div className="scenario-meta-item">
          <Clock3 size={11} />
          {scenario.duration}
        </div>

        <div className="scenario-meta-item">
          <CarFront size={11} />
          {scenario.vehicles} vehicles
        </div>

        <div className="scenario-meta-item">
          <Gauge size={11} />
          {scenario.trafficLevel}
        </div>

        <div className="scenario-meta-item">
          <ShieldAlert size={11} />
          {scenario.impact} impact
        </div>
      </div>

      <div className="scenario-actions">
        <button
          type="button"
          onClick={onRun}
          disabled={running}
          className={`scenario-run-button ${
            running
              ? "running"
              : completed
                ? "completed"
                : ""
          }`}
        >
          {running ? (
            <>
              <Activity size={13} />
              Running...
            </>
          ) : completed ? (
            <>
              <CheckCircle2 size={13} />
              Completed
            </>
          ) : (
            <>
              <Play size={13} />
              Run Scenario
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   IMPACT CARD
========================================================= */

function ImpactCard({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div
      style={{
        padding: 16,
        border:
          "1px solid rgba(100,160,190,.09)",
        borderRadius: 9,
        background:
          "rgba(10,28,36,.32)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          color: "#7898a4",
        }}
      >
        {icon}

        <span
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: ".05em",
          }}
        >
          {title}
        </span>
      </div>

      <div
        style={{
          marginTop: 13,
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        {value}
      </div>

      <div
        className="muted"
        style={{
          marginTop: 7,
          fontSize: 9,
        }}
      >
        {description}
      </div>
    </div>
  );
}