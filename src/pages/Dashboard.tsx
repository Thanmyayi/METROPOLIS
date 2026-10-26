import {
  Activity,
  ArrowUpRight,
  Bell,
  CarFront,
  ChevronRight,
  CircleGauge,
  Clock3,
  MapPin,
  Navigation,
  Plus,
  Radio,
  Search,
  ShieldAlert,
  Signal,
  SlidersHorizontal,
  Truck,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";

import {
  useVehicleSimulation,
  type NewVehicleInput,
} from "../hooks/useVehicleSimulation";

type VehicleStatus = "Moving" | "Stopped";
type VehicleType = "car" | "bus" | "bike";

const DEFAULT_POSITION: [number, number] = [12.9718, 77.5945];

export default function Dashboard() {
  const {
    vehicles,
    loading,
    error,
    addVehicle,
    selectVehicle: selectFromHook,
    selectedVehicleId: hookSelectedVehicleId,
    setSelectedVehicleId: setHookSelectedVehicleId,
  } = useVehicleSimulation();

  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState({
    id: "",
    type: "car" as VehicleType,
    plate: "",
    model: "Sedan",
    road: "MG Road",
    zone: "Zone A",
    speed: "30",
    direction: "North",
    status: "Moving" as VehicleStatus,
    latitude: String(DEFAULT_POSITION[0]),
    longitude: String(DEFAULT_POSITION[1]),
  });

  useEffect(() => {
    if (hookSelectedVehicleId) {
      setSelectedVehicleId(hookSelectedVehicleId);
    }
  }, [hookSelectedVehicleId]);

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
      vehicles.reduce((sum, vehicle) => sum + Number(vehicle.speed || 0), 0) /
        vehicles.length,
    );
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return vehicles;

    return vehicles.filter((vehicle) =>
      [
        vehicle.id,
        vehicle.plate,
        vehicle.type,
        vehicle.road,
        vehicle.zone,
        vehicle.model,
      ].some((value) => String(value ?? "").toLowerCase().includes(query)),
    );
  }, [vehicles, search]);

  const selectedVehicle =
    vehicles.find((vehicle) => vehicle.id === selectedVehicleId) ??
    filteredVehicles[0] ??
    vehicles[0] ??
    null;

  const zoneData = useMemo(() => {
    const map: Record<string, number> = {};

    vehicles.forEach((vehicle) => {
      const zone = vehicle.zone || "Central District";
      map[zone] = (map[zone] || 0) + 1;
    });

    return Object.entries(map)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4);
  }, [vehicles]);

  const systemState = loading
    ? "Synchronizing"
    : error
      ? "Simulation"
      : "Operational";

  function selectVehicle(id: string) {
    setSelectedVehicleId(id);
    setHookSelectedVehicleId(id);
    selectFromHook(id);
  }

  function updateForm<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function openAddModal() {
    setFormError("");
    setSuccessMessage("");
    setForm({
      id: "",
      type: "car",
      plate: "",
      model: "Sedan",
      road: "MG Road",
      zone: "Zone A",
      speed: "30",
      direction: "North",
      status: "Moving",
      latitude: String(DEFAULT_POSITION[0]),
      longitude: String(DEFAULT_POSITION[1]),
    });
    setAddModalOpen(true);
  }

  function handleAddVehicle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setSuccessMessage("");

    const plate = form.plate.trim().toUpperCase();
    const customId = form.id.trim().toUpperCase();
    const speed = Number(form.speed);
    const latitude = Number(form.latitude);
    const longitude = Number(form.longitude);

    if (!plate || !form.road.trim() || !form.zone.trim()) {
      setFormError("Please fill in the number plate, road, and zone.");
      return;
    }

    if (!Number.isFinite(speed) || speed < 0 || speed > 300) {
      setFormError("Enter a valid speed between 0 and 300 km/h.");
      return;
    }

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      setFormError("Enter valid latitude and longitude coordinates.");
      return;
    }

    if (
      vehicles.some(
        (vehicle) =>
          vehicle.plate.trim().toUpperCase() === plate ||
          (customId && vehicle.id.toUpperCase() === customId),
      )
    ) {
      setFormError("This vehicle ID or number plate already exists.");
      return;
    }

    const newVehicle: NewVehicleInput = {
      ...(customId ? { id: customId } : {}),
      type: form.type,
      plate,
      model: form.model.trim() || defaultModel(form.type),
      road: form.road.trim(),
      zone: form.zone.trim(),
      speed: form.status === "Stopped" ? 0 : speed,
      direction: form.direction,
      status: form.status,
      position: [latitude, longitude],
    };

    try {
      const created = addVehicle(newVehicle);

      selectVehicle(created.id);
      setSearch("");
      setAddModalOpen(false);
      setSuccessMessage(`${created.plate} was added successfully.`);
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Unable to add this vehicle.",
      );
    }
  }

  return (
    <div className="metro-dashboard">
      <header className="metro-dashboard-header">
        <div className="metro-breadcrumb">
          <span className="metro-eyebrow">METROPOLIS</span>
          <ChevronRight size={14} />
          <span>Live City Dashboard</span>
        </div>

        <div className="metro-header-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by number plate, vehicle ID, road or zone..."
          />
          <button
            type="button"
            className="metro-search-filter"
            aria-label="Search filters"
            title="Search filters"
          >
            <SlidersHorizontal size={17} />
          </button>
        </div>

        <div className="metro-header-actions">
          <div className="metro-header-status">
            <span className="metro-live-dot" />
            <div>
              <strong>{systemState}</strong>
              <small>Simulation engine</small>
            </div>
          </div>

          <div className="metro-header-divider" />

          <button
            type="button"
            className="metro-icon-button"
            title="Notifications"
          >
            <Bell size={19} />
            <span className="metro-notification-count">3</span>
          </button>

          <div className="metro-user">
            <div className="metro-user-avatar">CP</div>
            <div className="metro-user-info">
              <strong>City Planner</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>
      </header>

      <main className="metro-dashboard-content">
        <section className="metro-dashboard-intro">
          <div>
            <div className="metro-section-kicker">
              METROPOLIS / COMMAND CENTER
            </div>
            <h1>Live City Dashboard</h1>
            <p>
              Monitor vehicles, traffic and city zones in real time with the
              METROPOLIS digital twin.
            </p>
          </div>

          <div className="metro-intro-meta">
            <div className="metro-clock-box">
              <Clock3 size={17} />
              <div>
                <strong>LIVE MONITORING</strong>
                <span>
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            <div className="metro-system-chip">
              <Signal size={15} />
              DATA STREAM ACTIVE
            </div>
          </div>
        </section>

        <div className="metro-dashboard-actions">
          <div className="metro-dashboard-action-copy">
            <strong>Vehicle management</strong>
            <span>Add a vehicle to the city simulation manually.</span>
          </div>
          <button
            type="button"
            className="metro-add-vehicle-button"
            onClick={openAddModal}
          >
            <Plus size={18} />
            Add Vehicle
          </button>
        </div>

        {successMessage && (
          <div className="metro-inline-success" role="status">
            <span className="metro-live-dot" />
            {successMessage}
            <button
              type="button"
              aria-label="Dismiss success message"
              onClick={() => setSuccessMessage("")}
            >
              <X size={15} />
            </button>
          </div>
        )}

        <section className="metro-kpi-grid">
          <MetroKpi
            icon={<CarFront size={22} />}
            color="blue"
            label="Total Vehicles"
            value={String(totalVehicles)}
            helper="in monitored area"
            trend="Fleet total"
          />
          <MetroKpi
            icon={<Navigation size={22} />}
            color="green"
            label="Moving Vehicles"
            value={String(movingVehicles)}
            helper="currently moving"
            trend="In motion"
          />
          <MetroKpi
            icon={<ShieldAlert size={22} />}
            color="rose"
            label="Stopped Vehicles"
            value={String(stoppedVehicles)}
            helper="need attention"
            trend={stoppedVehicles > 0 ? "Monitor" : "Clear"}
          />
          <MetroKpi
            icon={<CircleGauge size={22} />}
            color="purple"
            label="Average Speed"
            value={`${averageSpeed} km/h`}
            helper="across all vehicles"
            trend="Fleet average"
          />
        </section>

        <section className="metro-dashboard-grid">
          <div className="metro-map-card">
            <div className="metro-card-header">
              <div>
                <div className="metro-card-title-row">
                  <h2>City Map — Live View</h2>
                  <span className="metro-simulated-label">SIMULATED</span>
                </div>
                <p>Vehicle movement and traffic intelligence</p>
              </div>

              <div className="metro-map-legend">
                <span><i className="legend-blue" />Car</span>
                <span><i className="legend-green" />Bus</span>
                <span><i className="legend-purple" />Bike</span>
                <span><i className="legend-orange" />Other</span>
                <span><i className="legend-rose" />Stopped</span>
              </div>
            </div>

            <div className="metro-dashboard-map">
              <DashboardMapFallback
                vehicles={vehicles}
                selectedVehicleId={selectedVehicleId}
                onSelect={selectVehicle}
              />
            </div>

            <div className="metro-map-footer">
              <div className="metro-map-location">
                <MapPin size={15} />
                <span>METROPOLIS CENTRAL DISTRICT</span>
              </div>
              <div className="metro-map-status">
                <span className="metro-live-dot" />
                LIVE VEHICLE FEED
              </div>
            </div>
          </div>

          <aside className="metro-dashboard-side">
            <section className="metro-selected-card">
              <div className="metro-card-header compact">
                <div>
                  <div className="metro-card-title-row">
                    <h2>Selected Vehicle</h2>
                    <span className="metro-live-label">LIVE</span>
                  </div>
                  <p>Vehicle intelligence</p>
                </div>

                <button
                  type="button"
                  className="metro-close-button"
                  onClick={() => {
                    setSelectedVehicleId(null);
                    setHookSelectedVehicleId(null);
                  }}
                  title="Clear selection"
                >
                  <X size={17} />
                </button>
              </div>

              {selectedVehicle ? (
                <SelectedVehicle vehicle={selectedVehicle} />
              ) : (
                <div className="metro-empty-selection">
                  <CarFront size={30} />
                  <strong>No vehicle selected</strong>
                  <span>Select a vehicle from the live monitor.</span>
                </div>
              )}
            </section>

            <section className="metro-system-card">
              <div className="metro-card-header compact">
                <div>
                  <h2>City Systems</h2>
                  <p>Operational status</p>
                </div>
                <Activity size={18} />
              </div>

              <div className="metro-system-list">
                <SystemItem
                  icon={<Radio size={16} />}
                  label="Vehicle Simulation"
                  value="Running"
                  good
                />
                <SystemItem
                  icon={<Signal size={16} />}
                  label="Data Engine"
                  value={error ? "Simulation" : "Connected"}
                  good={!error}
                />
                <SystemItem
                  icon={<MapPin size={16} />}
                  label="Digital Twin"
                  value="Active"
                  good
                />
              </div>
            </section>
          </aside>
        </section>

        <section className="metro-vehicle-section">
          <div className="metro-section-header">
            <div>
              <div className="metro-section-kicker">MOBILITY INTELLIGENCE</div>
              <h2>Live Vehicle Monitor</h2>
              <p>
                Continuously updated fleet activity from the simulation engine.
              </p>
            </div>
            <span className="metro-view-all">
              {filteredVehicles.length} vehicle
              {filteredVehicles.length === 1 ? "" : "s"}
              {search ? " found" : " tracked"}
              <ArrowUpRight size={16} />
            </span>
          </div>

          <div className="metro-vehicle-grid">
            {filteredVehicles.slice(0, 6).map((vehicle) => (
              <VehicleMonitorCard
                key={vehicle.id}
                vehicle={vehicle}
                selected={vehicle.id === selectedVehicleId}
                onClick={() => selectVehicle(vehicle.id)}
              />
            ))}
          </div>

          {!filteredVehicles.length && (
            <div className="metro-no-results">
              <Search size={22} />
              <span>No vehicles match "{search}"</span>
            </div>
          )}
        </section>

        <section className="metro-intelligence-grid">
          <IntelligenceCard
            icon={<MapPin size={19} />}
            color="blue"
            label="Active Zones"
            value={String(zoneData.length)}
          />
          <IntelligenceCard
            icon={<Truck size={19} />}
            color="green"
            label="Fleet Utilization"
            value={`${totalVehicles ? Math.round((movingVehicles / totalVehicles) * 100) : 0}%`}
          />
          <IntelligenceCard
            icon={<CircleGauge size={19} />}
            color="purple"
            label="Network Speed"
            value={`${averageSpeed} km/h`}
          />
          <IntelligenceCard
            icon={<ShieldAlert size={19} />}
            color="orange"
            label="Attention Required"
            value={String(stoppedVehicles)}
          />
        </section>
      </main>

      {addModalOpen && (
        <div
          className="metro-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setAddModalOpen(false);
            }
          }}
        >
          <section
            className="metro-add-vehicle-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="metro-add-vehicle-title"
          >
            <div className="metro-modal-header">
              <div>
                <span className="metro-section-kicker">
                  MOBILITY MANAGEMENT
                </span>
                <h2 id="metro-add-vehicle-title">Add Vehicle</h2>
                <p>Register a vehicle in the simulated city network.</p>
              </div>
              <button
                type="button"
                className="metro-close-button"
                aria-label="Close form"
                onClick={() => setAddModalOpen(false)}
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleAddVehicle}>
              <div className="metro-form-grid">
                <FormField label="Vehicle ID (optional)">
                  <input
                    value={form.id}
                    onChange={(event) => updateForm("id", event.target.value)}
                    placeholder="Auto-generated, e.g. VH-009"
                  />
                </FormField>

                <FormField label="Vehicle type">
                  <select
                    value={form.type}
                    onChange={(event) => {
                      const type = event.target.value as VehicleType;
                      setForm((current) => ({
                        ...current,
                        type,
                        model: defaultModel(type),
                      }));
                    }}
                  >
                    <option value="car">Car</option>
                    <option value="bus">Bus</option>
                    <option value="bike">Bike</option>
                  </select>
                </FormField>

                <FormField label="Number plate *">
                  <input
                    required
                    value={form.plate}
                    onChange={(event) => updateForm("plate", event.target.value)}
                    placeholder="KA-01-AB-1234"
                  />
                </FormField>

                <FormField label="Model">
                  <input
                    value={form.model}
                    onChange={(event) => updateForm("model", event.target.value)}
                    placeholder="Sedan"
                  />
                </FormField>

                <FormField label="Road *">
                  <input
                    required
                    value={form.road}
                    onChange={(event) => updateForm("road", event.target.value)}
                    placeholder="MG Road"
                  />
                </FormField>

                <FormField label="Zone *">
                  <select
                    required
                    value={form.zone}
                    onChange={(event) => updateForm("zone", event.target.value)}
                  >
                    <option>Zone A</option>
                    <option>Zone B</option>
                    <option>Zone C</option>
                    <option>Zone D</option>
                    <option>Central District</option>
                  </select>
                </FormField>

                <FormField label="Speed (km/h)">
                  <input
                    type="number"
                    min="0"
                    max="300"
                    required
                    value={form.speed}
                    disabled={form.status === "Stopped"}
                    onChange={(event) => updateForm("speed", event.target.value)}
                  />
                </FormField>

                <FormField label="Direction">
                  <select
                    value={form.direction}
                    onChange={(event) => updateForm("direction", event.target.value)}
                  >
                    <option>North</option>
                    <option>North-East</option>
                    <option>East</option>
                    <option>South-East</option>
                    <option>South</option>
                    <option>South-West</option>
                    <option>West</option>
                    <option>North-West</option>
                  </select>
                </FormField>

                <FormField label="Movement status">
                  <select
                    value={form.status}
                    onChange={(event) => updateForm("status", event.target.value as VehicleStatus)}
                  >
                    <option value="Moving">Moving</option>
                    <option value="Stopped">Stopped</option>
                  </select>
                </FormField>

                <FormField label="Latitude">
                  <input
                    type="number"
                    step="any"
                    required
                    value={form.latitude}
                    onChange={(event) => updateForm("latitude", event.target.value)}
                  />
                </FormField>

                <FormField label="Longitude">
                  <input
                    type="number"
                    step="any"
                    required
                    value={form.longitude}
                    onChange={(event) => updateForm("longitude", event.target.value)}
                  />
                </FormField>
              </div>

              {formError && (
                <div className="metro-form-error" role="alert">
                  <ShieldAlert size={17} />
                  {formError}
                </div>
              )}

              <div className="metro-modal-footer">
                <button
                  type="button"
                  className="metro-modal-cancel"
                  onClick={() => setAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="metro-add-vehicle-button">
                  <Plus size={17} />
                  Add Vehicle
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

function defaultModel(type: VehicleType) {
  if (type === "bus") return "City Bus";
  if (type === "bike") return "Street Bike";
  return "Sedan";
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="metro-form-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function MetroKpi({
  icon,
  color,
  label,
  value,
  helper,
  trend,
}: {
  icon: ReactNode;
  color: "blue" | "green" | "rose" | "purple";
  label: string;
  value: string;
  helper: string;
  trend: string;
}) {
  return (
    <article className={`metro-kpi-card ${color}`}>
      <div className={`metro-kpi-icon ${color}`}>{icon}</div>
      <div className="metro-kpi-content">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{helper}</small>
      </div>
      <div className="metro-kpi-trend">
        <ArrowUpRight size={13} />
        {trend}
      </div>
    </article>
  );
}

function SelectedVehicle({ vehicle }: { vehicle: any }) {
  return (
    <div className="metro-selected-content">
      <div className="metro-selected-top">
        <div className="metro-vehicle-avatar-large">
          {vehicle.type === "bus" ? <Truck size={30} /> : <CarFront size={30} />}
        </div>
        <div>
          <div className="metro-selected-name-row">
            <strong>{vehicle.model || vehicle.type || "Vehicle"}</strong>
            <span>{String(vehicle.type || "CAR").toUpperCase()}</span>
          </div>
          <h3>{vehicle.plate || vehicle.id}</h3>
          <small>{vehicle.id}</small>
        </div>
      </div>

      <div className="metro-selected-status">
        <span className={vehicle.status === "Moving" ? "metro-status moving" : "metro-status stopped"}>
          <span />
          {vehicle.status || "Unknown"}
        </span>
        <strong>{vehicle.speed ?? 0} km/h</strong>
      </div>

      <div className="metro-vehicle-details">
        <VehicleDetail icon={<Navigation size={16} />} label="Direction" value={vehicle.direction || "North"} />
        <VehicleDetail icon={<MapPin size={16} />} label="Zone" value={vehicle.zone || "Central District"} />
        <VehicleDetail icon={<Truck size={16} />} label="Road" value={vehicle.road || "MG Road"} />
        <VehicleDetail icon={<Clock3 size={16} />} label="Last Seen" value={vehicle.lastUpdated || "Just now"} />
      </div>
    </div>
  );
}

function VehicleDetail({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="metro-detail-item">
      <div className="metro-detail-icon">{icon}</div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function VehicleMonitorCard({
  vehicle,
  selected,
  onClick,
}: {
  vehicle: any;
  selected: boolean;
  onClick: () => void;
}) {
  const moving = vehicle.status === "Moving";

  return (
    <button
      type="button"
      className={`metro-vehicle-monitor-card ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className={`metro-vehicle-type-icon ${moving ? "moving" : "stopped"}`}>
        {vehicle.type === "bus" ? <Truck size={18} /> : <CarFront size={18} />}
      </div>

      <div className="metro-monitor-main">
        <div className="metro-monitor-title">
          <strong>{vehicle.plate || vehicle.id}</strong>
          <span>{vehicle.type || "Vehicle"}</span>
        </div>
        <p>{vehicle.road || "Road network"}</p>
        <small>{vehicle.zone || "Central District"}</small>
      </div>

      <div className="metro-monitor-right">
        <strong>
          {vehicle.speed ?? 0} <small>km/h</small>
        </strong>
        <span className={moving ? "metro-status moving" : "metro-status stopped"}>
          {vehicle.status || "Unknown"}
        </span>
      </div>
    </button>
  );
}

function SystemItem({
  icon,
  label,
  value,
  good,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  good: boolean;
}) {
  return (
    <div className="metro-system-item">
      <div className="metro-system-item-icon">{icon}</div>
      <div>
        <strong>{label}</strong>
        <span>{value}</span>
      </div>
      <i className={good ? "system-good" : "system-warning"} />
    </div>
  );
}

function IntelligenceCard({
  icon,
  color,
  label,
  value,
}: {
  icon: ReactNode;
  color: "blue" | "green" | "purple" | "orange";
  label: string;
  value: string;
}) {
  return (
    <div className="metro-intelligence-card">
      <div className={`metro-intelligence-icon ${color}`}>{icon}</div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function DashboardMapFallback({
  vehicles,
  selectedVehicleId,
  onSelect,
}: {
  vehicles: any[];
  selectedVehicleId: string | null;
  onSelect: (id: string) => void;
}) {
  const points = [
    { left: "18%", top: "45%" },
    { left: "34%", top: "29%" },
    { left: "53%", top: "52%" },
    { left: "70%", top: "35%" },
    { left: "78%", top: "65%" },
    { left: "45%", top: "72%" },
  ];

  return (
    <div className="metro-map-simulation">
      <div className="metro-map-grid-lines" />
      <div className="metro-map-water water-one" />
      <div className="metro-map-water water-two" />
      <div className="metro-road road-one" />
      <div className="metro-road road-two" />
      <div className="metro-road road-three" />
      <div className="metro-road road-four" />

      <div className="metro-map-label label-tech">TECH PARK</div>
      <div className="metro-map-label label-business">BUSINESS HUB</div>
      <div className="metro-map-label label-central">CENTRAL DISTRICT</div>
      <div className="metro-map-label label-residential">RESIDENTIAL AREA</div>

      {vehicles.slice(0, 6).map((vehicle: any, index: number) => {
        const point = points[index % points.length];
        const vehicleClass = vehicle.type === "bus"
          ? "bus"
          : vehicle.type === "bike"
            ? "bike"
            : "car";

        return (
          <button
            type="button"
            key={vehicle.id}
            className={`metro-map-vehicle ${vehicle.status === "Stopped" ? "stopped" : ""} ${selectedVehicleId === vehicle.id ? "selected" : ""}`}
            style={{ left: point.left, top: point.top }}
            onClick={() => onSelect(vehicle.id)}
            title={`${vehicle.plate || vehicle.id} • ${vehicle.speed ?? 0} km/h • Select vehicle`}
            aria-label={`Select ${vehicle.plate || vehicle.id}`}
          >
            <div className={`metro-map-marker ${vehicleClass}`}>
              {vehicle.type === "bus" ? <Truck size={15} /> : <CarFront size={15} />}
            </div>
            <div className="metro-map-tooltip">
              <strong>{vehicle.plate || vehicle.id}</strong>
              <span>{vehicle.speed ?? 0} km/h</span>
            </div>
          </button>
        );
      })}

      <div className="metro-map-control-stack">
        <button type="button" aria-label="Zoom in">+</button>
        <button type="button" aria-label="Zoom out">−</button>
        <button type="button" aria-label="Reset map view">◎</button>
      </div>

      <div className="metro-map-compass">N</div>

      <div className="metro-map-overlay">
        <span><i /> LIVE</span>
        <strong>{vehicles.length}</strong>
        <small>tracked vehicles</small>
      </div>
    </div>
  );
}