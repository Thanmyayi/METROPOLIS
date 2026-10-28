import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CarFront,
  CircleGauge,
  Clock3,
  Gauge,
  MapPin,
  Plus,
  Radio,
  Route,
  ShieldCheck,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import {
  useVehicleSimulation,
  type NewVehicleInput,
} from "../hooks/useVehicleSimulation";

type VehicleForm = {
  id: string;
  plate: string;
  type: "car" | "bus" | "bike";
  model: string;
  road: string;
  zone: string;
  speed: string;
  direction: string;
  status: "Moving" | "Stopped";
  latitude: string;
  longitude: string;
};

const initialForm: VehicleForm = {
  id: "",
  plate: "",
  type: "car",
  model: "",
  road: "",
  zone: "Zone A",
  speed: "30",
  direction: "North",
  status: "Moving",
  latitude: "12.9718",
  longitude: "77.5945",
};

export default function Dashboard() {
  const {
    vehicles,
    loading,
    error,
    addVehicle,
  } = useVehicleSimulation();

  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [form, setForm] = useState<VehicleForm>(initialForm);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const totalVehicles = vehicles.length;

  const movingVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Moving",
  ).length;

  const stoppedVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Stopped",
  ).length;

  const averageSpeed = useMemo(() => {
    if (!vehicles.length) return 0;

    return Math.round(
      vehicles.reduce(
        (total, vehicle) => total + Number(vehicle.speed || 0),
        0,
      ) / vehicles.length,
    );
  }, [vehicles]);

  const movementRate =
    totalVehicles > 0
      ? Math.round((movingVehicles / totalVehicles) * 100)
      : 0;

  const zoneTraffic = useMemo(() => {
    const zones = ["Zone A", "Zone B", "Zone C"];

    return zones.map((zone) => {
      const list = vehicles.filter((vehicle) => vehicle.zone === zone);
      const stopped = list.filter(
        (vehicle) => vehicle.status === "Stopped",
      ).length;

      const density =
        totalVehicles > 0
          ? Math.round((list.length / totalVehicles) * 100)
          : 0;

      const congestion =
        list.length > 0
          ? Math.min(
              100,
              Math.round(
                density * 0.65 + (stopped / list.length) * 35,
              ),
            )
          : 0;

      return { zone, vehicles: list.length, congestion };
    });
  }, [vehicles, totalVehicles]);

  const incidents = Math.max(2, Math.min(5, stoppedVehicles + 1));
  const attention = Math.min(3, stoppedVehicles);

  const systemState = loading
    ? "INITIALIZING"
    : error
      ? "SIMULATION"
      : "OPERATIONAL";

  function openVehicleModal() {
    setForm(initialForm);
    setFormError("");
    setSuccessMessage("");
    setIsVehicleModalOpen(true);
  }

  function closeVehicleModal() {
    setIsVehicleModalOpen(false);
    setFormError("");
  }

  function updateForm<K extends keyof VehicleForm>(
    key: K,
    value: VehicleForm[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleAddVehicle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setSuccessMessage("");

    const plate = form.plate.trim().toUpperCase();
    const model = form.model.trim();
    const road = form.road.trim();
    const speed = Number(form.speed);
    const latitude = Number(form.latitude);
    const longitude = Number(form.longitude);

    if (!plate || !model || !road) {
      setFormError("Please fill in the number plate, model and road.");
      return;
    }

    if (
      vehicles.some(
        (vehicle) => vehicle.plate.trim().toUpperCase() === plate,
      )
    ) {
      setFormError("This number plate already exists in the current fleet.");
      return;
    }

    if (
      form.id.trim() &&
      vehicles.some(
        (vehicle) =>
          vehicle.id.toLowerCase() === form.id.trim().toLowerCase(),
      )
    ) {
      setFormError("This vehicle ID already exists in the current fleet.");
      return;
    }

    if (!Number.isFinite(speed) || speed < 0 || speed > 300) {
      setFormError("Speed must be between 0 and 300 km/h.");
      return;
    }

    if (
      !Number.isFinite(latitude) ||
      latitude < -90 ||
      latitude > 90 ||
      !Number.isFinite(longitude) ||
      longitude < -180 ||
      longitude > 180
    ) {
      setFormError("Enter valid latitude and longitude coordinates.");
      return;
    }

    const newVehicle: NewVehicleInput = {
      ...(form.id.trim() ? { id: form.id.trim() } : {}),
      plate,
      type: form.type,
      model,
      road,
      zone: form.zone,
      speed: form.status === "Stopped" ? 0 : speed,
      direction: form.direction,
      status: form.status,
      position: [latitude, longitude],
    };

    try {
      const created = addVehicle(newVehicle);

      setSuccessMessage(`Vehicle ${created.id} added successfully.`);
      setForm(initialForm);
      setIsVehicleModalOpen(false);
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Unable to add this vehicle. Please try again.",
      );
    }
  }

  return (
    <div className="metropolis-page dashboard-page">
      {/* HERO */}
      <section className="dashboard-hero">
        <div className="dashboard-hero-grid" />

        <div className="dashboard-hero-content">
          <div className="dashboard-eyebrow">
            <span className="eyebrow-line" />
            <span>METROPOLIS / COMMAND CENTER</span>
            <span className="eyebrow-version">v2.4</span>
          </div>

          <h1 className="dashboard-title">
            City Intelligence
            <span>Dashboard</span>
          </h1>

          <p className="dashboard-subtitle">
            Monitor the simulated city, analyze mobility patterns, detect
            operational anomalies, and control the digital twin in real time.
          </p>

          <div className="dashboard-hero-actions">
            <div className="hero-live-state">
              <span className="hero-live-dot" />
              <div>
                <strong>SYSTEM LIVE</strong>
                <span>Digital twin engine active</span>
              </div>
            </div>

            <div className="hero-clock">
              <Clock3 size={14} />
              <span>REAL-TIME MONITORING</span>
            </div>

            <button
              type="button"
              className="dashboard-add-vehicle"
              onClick={openVehicleModal}
            >
              <Plus size={15} />
              ADD VEHICLE
            </button>
          </div>

          {successMessage && (
            <p className="dashboard-add-success" role="status">
              {successMessage}
            </p>
          )}
        </div>

        <div className="dashboard-hero-metrics">
          <HeroMetric label="CITY LOAD" value="63%" trend="+4.8%" />
          <HeroMetric label="NETWORK HEALTH" value="94%" trend="+2.1%" />
          <HeroMetric label="DATA STREAM" value="LIVE" trend="24 / 24" />
        </div>
      </section>

      {/* KPI GRID */}
      <section className="dashboard-kpi-grid">
        <MetricCard
          icon={<CarFront size={19} />}
          label="Active Vehicles"
          value={String(totalVehicles)}
          detail="Vehicles inside simulation"
          accent="cyan"
          trend="+12.4%"
        />

        <MetricCard
          icon={<Radio size={19} />}
          label="Moving Fleet"
          value={`${movementRate}%`}
          detail={`${movingVehicles} vehicles moving`}
          accent="green"
          trend="+6.8%"
        />

        <MetricCard
          icon={<Gauge size={19} />}
          label="Average Speed"
          value={String(averageSpeed)}
          suffix="km/h"
          detail="Across simulated fleet"
          accent="blue"
          trend="+3.2%"
        />

        <MetricCard
          icon={<AlertTriangle size={19} />}
          label="Active Incidents"
          value={String(incidents)}
          detail={`${attention} requiring attention`}
          accent="amber"
          trend="MONITOR"
        />
      </section>

      {/* OPERATIONS GRID */}
      <section className="dashboard-command-grid">
        <div className="dashboard-panel system-panel">
          <PanelHeading
            eyebrow="SYSTEM MONITOR"
            title="City Operations"
            description="Current digital-twin infrastructure state"
            icon={<Activity size={18} />}
          />

          <div className="operations-list">
            <Operation
              icon={<ShieldCheck size={16} />}
              title="Core System"
              detail="Simulation services"
              value={systemState}
              good={!loading && !error}
            />

            <Operation
              icon={<CarFront size={16} />}
              title="Vehicle Engine"
              detail="Fleet movement processor"
              value={totalVehicles ? "RUNNING" : "WAITING"}
              good={totalVehicles > 0}
            />

            <Operation
              icon={<Radio size={16} />}
              title="Data Stream"
              detail="Live simulation feed"
              value={error ? "SIMULATION" : "CONNECTED"}
              good={!error}
            />

            <Operation
              icon={<MapPin size={16} />}
              title="Digital Twin"
              detail="City spatial model"
              value="ACTIVE"
              good
            />
          </div>

          <div className="system-health">
            <div className="health-header">
              <span>SYSTEM HEALTH</span>
              <strong>94%</strong>
            </div>

            <div className="health-track">
              <div className="health-progress" style={{ width: "94%" }} />
            </div>

            <div className="health-meta">
              <span>CPU 38%</span>
              <span>MEMORY 52%</span>
              <span>STREAM 98%</span>
            </div>
          </div>
        </div>

        <div className="dashboard-panel traffic-panel">
          <PanelHeading
            eyebrow="TRAFFIC ANALYTICS"
            title="Mobility Intelligence"
            description="Vehicle density across city zones"
            icon={<TrendingUp size={18} />}
          />

          <div className="traffic-overview">
            <div className="traffic-score">
              <div className="traffic-score-ring">
                <strong>{Math.round(movementRate * 0.94)}</strong>
                <span>/ 100</span>
              </div>

              <div>
                <strong>Network Flow</strong>
                <span>Optimal mobility</span>
              </div>
            </div>

            <span className="traffic-status">STABLE</span>
          </div>

          <div className="zone-list">
            {zoneTraffic.map((zone) => (
              <div className="zone-row" key={zone.zone}>
                <div className="zone-row-top">
                  <div className="zone-name">
                    <span className="zone-dot" />
                    <strong>{zone.zone}</strong>
                  </div>
                  <span>{zone.vehicles} vehicles</span>
                </div>

                <div className="zone-progress">
                  <div
                    className={
                      zone.congestion >= 70
                        ? "danger"
                        : zone.congestion >= 40
                          ? "warning"
                          : ""
                    }
                    style={{ width: `${Math.max(8, zone.congestion)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE FLEET */}
      <section className="dashboard-panel fleet-panel">
        <PanelHeading
          eyebrow="LIVE DATA STREAM"
          title="Vehicle Command Feed"
          description="Latest simulated fleet telemetry"
          icon={<Zap size={18} />}
          action={
            <span className="panel-live-badge">
              <span />
              LIVE
            </span>
          }
        />

        <div className="fleet-table-wrapper">
          <table className="fleet-table">
            <thead>
              <tr>
                <th>VEHICLE</th>
                <th>TYPE</th>
                <th>LOCATION</th>
                <th>ZONE</th>
                <th>SPEED</th>
                <th>DIRECTION</th>
                <th>STATE</th>
              </tr>
            </thead>

            <tbody>
              {vehicles.slice(0, 7).map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>
                    <div className="vehicle-cell">
                      <div className="vehicle-icon">
                        <CarFront size={14} />
                      </div>
                      <div>
                        <strong>{vehicle.id}</strong>
                        <span>{vehicle.plate}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="type-badge">{vehicle.type}</span>
                  </td>

                  <td>
                    <div className="location-cell">
                      <MapPin size={13} />
                      <span>{vehicle.road}</span>
                    </div>
                  </td>

                  <td>{vehicle.zone}</td>

                  <td>
                    <strong className="speed-value">
                      {vehicle.speed}
                      <small>km/h</small>
                    </strong>
                  </td>

                  <td>
                    <span className="direction-value">
                      {vehicle.direction || "N"}
                    </span>
                  </td>

                  <td>
                    <span
                      className={
                        vehicle.status === "Moving"
                          ? "fleet-status moving"
                          : "fleet-status stopped"
                      }
                    >
                      <span />
                      {vehicle.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!vehicles.length && (
            <div className="fleet-empty">
              No live telemetry available.
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM INSIGHTS */}
      <section className="dashboard-bottom-grid">
        <InsightCard
          icon={<Route size={18} />}
          title="Network Coverage"
          value="87%"
          description="Road network currently represented in the digital twin."
        />

        <InsightCard
          icon={<CircleGauge size={18} />}
          title="Fleet Efficiency"
          value="92%"
          description="Simulated mobility efficiency based on active vehicles."
        />

        <InsightCard
          icon={<ArrowUpRight size={18} />}
          title="Prediction Signal"
          value="HIGH"
          description="Traffic intelligence layer is ready for scenario analysis."
        />
      </section>

      {/* FOOTER */}
      <footer className="dashboard-footer">
        <div>
          <Activity size={13} />
          <span>METROPOLIS DIGITAL TWIN · REAL-TIME SIMULATION</span>
        </div>

        <span>Simulation cycle: 2.4 sec</span>
      </footer>

      {/* DASHBOARD-ONLY ADD VEHICLE MODAL */}
      {isVehicleModalOpen && (
        <div
          className="vehicle-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeVehicleModal();
            }
          }}
        >
          <section
            className="vehicle-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-vehicle-title"
          >
            <div className="vehicle-modal-header">
              <div>
                <span className="vehicle-modal-eyebrow">
                  METROPOLIS / FLEET CONTROL
                </span>
                <h2 id="add-vehicle-title">Add Vehicle</h2>
                <p>Register a new vehicle in the simulated city.</p>
              </div>

              <button
                type="button"
                className="vehicle-modal-close"
                aria-label="Close add vehicle form"
                onClick={closeVehicleModal}
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleAddVehicle}>
              <div className="vehicle-form-grid">
                <label>
                  Vehicle ID <span className="form-optional">OPTIONAL</span>
                  <input
                    value={form.id}
                    onChange={(event) => updateForm("id", event.target.value)}
                    placeholder="Auto-generated if empty"
                    maxLength={30}
                  />
                </label>

                <label>
                  Number Plate *
                  <input
                    value={form.plate}
                    onChange={(event) =>
                      updateForm("plate", event.target.value.toUpperCase())
                    }
                    placeholder="KA01AB1234"
                    maxLength={20}
                    required
                  />
                </label>

                <label>
                  Vehicle Type *
                  <select
                    value={form.type}
                    onChange={(event) =>
                      updateForm(
                        "type",
                        event.target.value as VehicleForm["type"],
                      )
                    }
                  >
                    <option value="car">Car</option>
                    <option value="bus">Bus</option>
                    <option value="bike">Bike</option>
                  </select>
                </label>

                <label>
                  Model *
                  <input
                    value={form.model}
                    onChange={(event) => updateForm("model", event.target.value)}
                    placeholder="e.g. Sedan"
                    maxLength={60}
                    required
                  />
                </label>

                <label>
                  Road / Street *
                  <input
                    value={form.road}
                    onChange={(event) => updateForm("road", event.target.value)}
                    placeholder="e.g. MG Road"
                    maxLength={100}
                    required
                  />
                </label>

                <label>
                  Zone *
                  <select
                    value={form.zone}
                    onChange={(event) => updateForm("zone", event.target.value)}
                  >
                    <option>Zone A</option>
                    <option>Zone B</option>
                    <option>Zone C</option>
                  </select>
                </label>

                <label>
                  Speed (km/h) *
                  <input
                    type="number"
                    min="0"
                    max="300"
                    step="1"
                    value={form.speed}
                    onChange={(event) => updateForm("speed", event.target.value)}
                    required
                  />
                </label>

                <label>
                  Direction *
                  <select
                    value={form.direction}
                    onChange={(event) =>
                      updateForm("direction", event.target.value)
                    }
                  >
                    <option>North</option>
                    <option>South</option>
                    <option>East</option>
                    <option>West</option>
                    <option>North-East</option>
                    <option>North-West</option>
                    <option>South-East</option>
                    <option>South-West</option>
                  </select>
                </label>

                <label>
                  Vehicle State *
                  <select
                    value={form.status}
                    onChange={(event) =>
                      updateForm(
                        "status",
                        event.target.value as VehicleForm["status"],
                      )
                    }
                  >
                    <option value="Moving">Moving</option>
                    <option value="Stopped">Stopped</option>
                  </select>
                </label>

                <label>
                  Latitude *
                  <input
                    type="number"
                    min="-90"
                    max="90"
                    step="any"
                    value={form.latitude}
                    onChange={(event) =>
                      updateForm("latitude", event.target.value)
                    }
                    required
                  />
                </label>

                <label>
                  Longitude *
                  <input
                    type="number"
                    min="-180"
                    max="180"
                    step="any"
                    value={form.longitude}
                    onChange={(event) =>
                      updateForm("longitude", event.target.value)
                    }
                    required
                  />
                </label>
              </div>

              <p className="vehicle-form-note">
                Coordinates default to the central Bengaluru simulation point.
                A stopped vehicle will be registered at 0 km/h.
              </p>

              {formError && (
                <div className="vehicle-form-error" role="alert">
                  <AlertTriangle size={15} />
                  <span>{formError}</span>
                </div>
              )}

              <div className="vehicle-modal-actions">
                <button
                  type="button"
                  className="vehicle-cancel-button"
                  onClick={closeVehicleModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="vehicle-submit-button"
                >
                  <Plus size={16} />
                  Register Vehicle
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

/* HERO METRIC */
function HeroMetric({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="hero-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{trend}</small>
    </div>
  );
}

/* METRIC CARD */
function MetricCard({
  icon,
  label,
  value,
  suffix,
  detail,
  trend,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix?: string;
  detail: string;
  trend: string;
  accent: "cyan" | "green" | "blue" | "amber";
}) {
  return (
    <article className={`metric-card accent-${accent}`}>
      <div className="metric-card-top">
        <div className="metric-icon">{icon}</div>
        <span className="metric-trend">{trend}</span>
      </div>

      <div className="metric-label">{label}</div>

      <div className="metric-number">
        {value}
        {suffix && <small>{suffix}</small>}
      </div>

      <div className="metric-detail">{detail}</div>

      <div className="metric-sparkline">
        <span /><span /><span /><span />
        <span /><span /><span /><span />
      </div>
    </article>
  );
}

/* PANEL HEADING */
function PanelHeading({
  eyebrow,
  title,
  description,
  icon,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="advanced-panel-header">
      <div className="advanced-panel-title">
        <div className="panel-icon">{icon}</div>
        <div>
          <span>{eyebrow}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

/* OPERATION */
function Operation({
  icon,
  title,
  detail,
  value,
  good,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
  value: string;
  good: boolean;
}) {
  return (
    <div className="advanced-operation">
      <div className="advanced-operation-icon">{icon}</div>
      <div className="advanced-operation-copy">
        <strong>{title}</strong>
        <span>{detail}</span>
      </div>
      <div className={good ? "operation-state good" : "operation-state warning"}>
        <span />
        {value}
      </div>
    </div>
  );
}

/* INSIGHT CARD */
function InsightCard({
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
    <article className="insight-card">
      <div className="insight-icon">{icon}</div>
      <div className="insight-copy">
        <span>{title}</span>
        <strong>{value}</strong>
        <p>{description}</p>
      </div>
    </article>
  );
}