import {
  Activity,
  CarFront,
  LocateFixed,
  Navigation,
  Radio,
  RefreshCw,
  Search,
  Signal,
  Zap,
  Bus,
  Bike,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import { useVehicleSimulation } from "../hooks/useVehicleSimulation";

const DEFAULT_LATITUDE = 12.9718;
const DEFAULT_LONGITUDE = 77.5945;

function getSchematicPosition(latitude: number, longitude: number) {
  const minLat = 12.965;
  const maxLat = 12.980;
  const minLng = 77.585;
  const maxLng = 77.605;

  const safeLat = Number.isFinite(latitude)
    ? latitude
    : DEFAULT_LATITUDE;

  const safeLng = Number.isFinite(longitude)
    ? longitude
    : DEFAULT_LONGITUDE;

  const left = ((safeLng - minLng) / (maxLng - minLng)) * 100;
  const top = (1 - (safeLat - minLat) / (maxLat - minLat)) * 100;

  return {
    left: `${Math.max(3, Math.min(97, left))}%`,
    top: `${Math.max(5, Math.min(95, top))}%`,
  };
}

function getVehicleIcon(type: string) {
  switch (type.toLowerCase()) {
    case "bus":
      return Bus;
    case "bike":
      return Bike;
    default:
      return CarFront;
  }
}

export default function LiveMap() {
  const {
    vehicles,
    loading,
    error,
    refreshVehicles,
    selectVehicle,
  } = useVehicleSimulation();

  const [search, setSearch] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] =
    useState<string | null>(null);

  const filteredVehicles = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return vehicles;

    return vehicles.filter((vehicle) =>
      [
        vehicle.id,
        vehicle.plate,
        vehicle.type,
        vehicle.model,
        vehicle.road,
        vehicle.zone,
        vehicle.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [vehicles, search]);

  const selectedVehicle = vehicles.find(
    (vehicle) => vehicle.id === selectedVehicleId,
  );

  const movingVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Moving",
  ).length;

  const stoppedVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Stopped",
  ).length;

  function handleSelectVehicle(vehicleId: string) {
    setSelectedVehicleId(vehicleId);
    selectVehicle(vehicleId);
  }

  function focusFirstVehicle() {
    if (filteredVehicles.length > 0) {
      handleSelectVehicle(filteredVehicles[0].id);
    }
  }

  function clearSelection() {
    setSelectedVehicleId(null);
  }

  return (
    <div className="metropolis-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Live Digital Twin</h1>
          <p className="page-subtitle">
            Real-time simulated vehicle tracking and smart-city traffic
            visualization
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />
          LIVE SIMULATION
        </div>
      </div>

      {error && (
        <div
          role="status"
          style={{
            marginTop: 14,
            padding: "11px 14px",
            border: "1px solid rgba(229,180,91,.22)",
            borderRadius: 10,
            color: "#e5b45b",
            background: "rgba(229,180,91,.06)",
            fontSize: 12,
          }}
        >
          {error}
        </div>
      )}

      <div className="grid-4" style={{ marginTop: 18 }}>
        <MapCard
          icon={<CarFront size={21} />}
          label="Tracked Vehicles"
          value={vehicles.length.toString()}
          description="Simulation objects registered"
        />

        <MapCard
          icon={<Navigation size={21} />}
          label="Moving"
          value={movingVehicles.toString()}
          description="Vehicles in motion"
        />

        <MapCard
          icon={<LocateFixed size={21} />}
          label="Stopped"
          value={stoppedVehicles.toString()}
          description="Stationary vehicles"
        />

        <MapCard
          icon={<Signal size={21} />}
          label="Connection"
          value={loading ? "SYNCING" : "LIVE"}
          description="Simulation data available"
        />
      </div>

      <section
        className="panel"
        style={{
          marginTop: 18,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 15,
            padding: "14px 18px",
            borderBottom: "1px solid rgba(100,160,190,.08)",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3 className="panel-title">METROPOLIS City Map</h3>
            <p
              className="muted"
              style={{ marginTop: 4, fontSize: 10 }}
            >
              Vehicle markers are positioned from saved coordinates
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <LegendDot color="#31d29a" label="Moving" />
            <LegendDot color="#e5b45b" label="Stopped" />
            <LegendDot color="#42c8f5" label="Selected" />
          </div>
        </div>

        <div
          style={{
            position: "relative",
            height: 540,
            overflow: "hidden",
            background:
              "radial-gradient(circle at 50% 50%, rgba(20,190,235,.08), transparent 45%), #071218",
          }}
        >
          <style>{`
            @keyframes metroVehiclePulse {
              0% { transform: scale(.8); opacity: .8; }
              70% { transform: scale(1.6); opacity: 0; }
              100% { transform: scale(1.6); opacity: 0; }
            }

            .metro-schematic-marker {
              transition: left .5s ease, top .5s ease, transform .2s ease;
            }

            .metro-schematic-marker:hover {
              transform: translate(-50%, -50%) scale(1.15) !important;
            }

            .metro-schematic-marker:focus-visible {
              outline: 2px solid #67e8f9;
              outline-offset: 4px;
            }

            .metro-registry-row:hover {
              background: rgba(34,211,238,.045);
            }

            .metro-registry-row-selected {
              background: rgba(34,211,238,.075);
            }

            .metro-map-control:hover {
              color: #67e8f9 !important;
              border-color: rgba(34,211,238,.45) !important;
            }

            .metro-empty-state {
              padding: 28px 16px;
              text-align: center;
              color: #718d98;
              font-size: 12px;
            }
          `}</style>

          {/* Map grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.45,
              backgroundImage:
                "linear-gradient(rgba(20,121,208,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(20,121,208,.09) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />

          {/* Roads */}
          <Road
            left="8%"
            right="8%"
            top="22%"
            transform="rotate(-7deg)"
          />
          <Road left="10%" right="10%" top="50%" />
          <Road
            left="12%"
            right="12%"
            top="76%"
            transform="rotate(6deg)"
          />

          <Road
            vertical
            left="30%"
            top="8%"
            bottom="8%"
            transform="rotate(4deg)"
          />
          <Road
            vertical
            left="62%"
            top="8%"
            bottom="8%"
            transform="rotate(-5deg)"
          />
          <Road vertical left="82%" top="12%" bottom="12%" />

          <ZoneLabel name="ZONE A" top="15%" left="14%" />
          <ZoneLabel name="ZONE B" top="43%" left="42%" />
          <ZoneLabel name="ZONE C" top="68%" left="70%" />

          {/* Vehicles: use actual coordinates instead of list index */}
          {filteredVehicles.map((vehicle) => {
            const position = getSchematicPosition(
              vehicle.latitude,
              vehicle.longitude,
            );

            const isSelected = selectedVehicleId === vehicle.id;
            const VehicleIcon = getVehicleIcon(vehicle.type);

            return (
              <button
                type="button"
                key={vehicle.id}
                className="metro-schematic-marker"
                onClick={() => handleSelectVehicle(vehicle.id)}
                title={`${vehicle.id} · ${vehicle.plate} · ${vehicle.speed} km/h`}
                aria-label={`Select vehicle ${vehicle.id}, plate ${vehicle.plate}`}
                aria-pressed={isSelected}
                style={{
                  position: "absolute",
                  left: position.left,
                  top: position.top,
                  transform: "translate(-50%, -50%)",
                  width: isSelected ? 36 : 28,
                  height: isSelected ? 36 : 28,
                  borderRadius: "50%",
                  border: isSelected
                    ? "2px solid #e0fbff"
                    : "1px solid rgba(255,255,255,.22)",
                  background:
                    vehicle.status === "Moving"
                      ? "rgba(49,210,154,.92)"
                      : "rgba(229,180,91,.94)",
                  color: "#061015",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: isSelected
                    ? "0 0 0 5px rgba(34,211,238,.15), 0 0 24px rgba(34,211,238,.75)"
                    : vehicle.status === "Moving"
                      ? "0 0 18px rgba(49,210,154,.42)"
                      : "0 0 18px rgba(229,180,91,.35)",
                  zIndex: isSelected ? 10 : 3,
                }}
              >
                {isSelected && (
                  <span
                    style={{
                      position: "absolute",
                      inset: -8,
                      border: "1px solid rgba(103,232,249,.65)",
                      borderRadius: "50%",
                      pointerEvents: "none",
                      animation: "metroVehiclePulse 1.5s infinite",
                    }}
                  />
                )}

                <VehicleIcon size={isSelected ? 17 : 13} />
              </button>
            );
          })}

          {/* Search */}
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              width: "min(270px, calc(100% - 32px))",
              zIndex: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 12px",
                border: "1px solid rgba(100,180,200,.15)",
                borderRadius: 8,
                background: "rgba(5,15,20,.92)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Search size={14} color="#6f8d99" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search vehicle, plate, road..."
                aria-label="Search vehicles"
                style={{
                  width: "100%",
                  minWidth: 0,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "#d9edf2",
                  fontSize: 10,
                }}
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear vehicle search"
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#718d98",
                    cursor: "pointer",
                    display: "flex",
                  }}
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {search && filteredVehicles.length > 0 && (
              <div
                style={{
                  marginTop: 5,
                  maxHeight: 180,
                  overflowY: "auto",
                  border: "1px solid rgba(100,180,200,.12)",
                  borderRadius: 8,
                  background: "rgba(5,15,20,.96)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {filteredVehicles.slice(0, 6).map((vehicle) => (
                  <button
                    type="button"
                    key={vehicle.id}
                    onClick={() => handleSelectVehicle(vehicle.id)}
                    style={{
                      width: "100%",
                      border: "none",
                      background:
                        selectedVehicleId === vehicle.id
                          ? "rgba(34,211,238,.09)"
                          : "transparent",
                      color: "#c8e0e7",
                      padding: "9px 11px",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: 10,
                    }}
                  >
                    <strong>{vehicle.id}</strong>
                    <span
                      className="muted"
                      style={{ marginLeft: 7 }}
                    >
                      {vehicle.plate} · {vehicle.road}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {search && filteredVehicles.length === 0 && (
              <div
                style={{
                  marginTop: 5,
                  padding: 12,
                  borderRadius: 8,
                  background: "rgba(5,15,20,.96)",
                  color: "#718d98",
                  fontSize: 10,
                }}
              >
                No vehicles match this search.
              </div>
            )}
          </div>

          {/* Functional map controls */}
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              gap: 7,
            }}
          >
            <MapControl
              icon={<LocateFixed size={14} />}
              label="Focus first matching vehicle"
              onClick={focusFirstVehicle}
            />
            <MapControl
              icon={<RefreshCw size={14} />}
              label="Refresh vehicle data"
              onClick={() => void refreshVehicles()}
            />
            <MapControl
              icon={<Zap size={14} />}
              label="Clear vehicle selection"
              onClick={clearSelection}
            />
          </div>

          {/* Map footer */}
          <div
            style={{
              position: "absolute",
              left: 16,
              bottom: 16,
              zIndex: 15,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 11px",
              border: "1px solid rgba(100,180,200,.12)",
              borderRadius: 7,
              background: "rgba(5,15,20,.9)",
              color: "#718d98",
              fontSize: 9,
            }}
          >
            <Radio size={12} />
            <span>
              Simulation engine · {vehicles.length} registered vehicles
            </span>
          </div>

          {/* Selected vehicle details */}
          {selectedVehicle && (
            <div
              style={{
                position: "absolute",
                right: 16,
                bottom: 16,
                width: "min(260px, calc(100% - 32px))",
                zIndex: 20,
                padding: 15,
                border: "1px solid rgba(100,180,200,.2)",
                borderRadius: 9,
                background: "rgba(5,15,20,.95)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 25px rgba(0,0,0,.2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#e0faff",
                    }}
                  >
                    {selectedVehicle.id}
                  </div>
                  <div
                    className="muted"
                    style={{ marginTop: 3, fontSize: 9 }}
                  >
                    {selectedVehicle.plate}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    className={
                      selectedVehicle.status === "Moving"
                        ? "status status-low"
                        : "status status-medium"
                    }
                  >
                    {selectedVehicle.status}
                  </span>

                  <button
                    type="button"
                    onClick={clearSelection}
                    aria-label="Close selected vehicle details"
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#718d98",
                      cursor: "pointer",
                      display: "flex",
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginTop: 14,
                }}
              >
                <Detail label="Type" value={selectedVehicle.type} />
                <Detail
                  label="Speed"
                  value={`${selectedVehicle.speed} km/h`}
                />
                <Detail label="Road" value={selectedVehicle.road} />
                <Detail label="Zone" value={selectedVehicle.zone} />
                <Detail
                  label="Direction"
                  value={selectedVehicle.direction}
                />
                <Detail
                  label="Coordinates"
                  value={`${selectedVehicle.latitude.toFixed(5)}, ${selectedVehicle.longitude.toFixed(5)}`}
                />
              </div>

              <p
                style={{
                  marginTop: 12,
                  color: "#718d98",
                  fontSize: 9,
                }}
              >
                Updated: {selectedVehicle.lastUpdated}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Live Vehicle Registry */}
      <section className="panel" style={{ marginTop: 18 }}>
        <div className="panel-header">
          <div>
            <h3 className="panel-title">Live Vehicle Registry</h3>
            <p
              className="muted"
              style={{ marginTop: 5, fontSize: 12 }}
            >
              Select a vehicle to inspect and track its simulation state
            </p>
          </div>

          <span className="status status-low">
            {filteredVehicles.length} TRACKED
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              minWidth: 820,
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  color: "#688493",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                }}
              >
                <th style={tableHeader}>Vehicle</th>
                <th style={tableHeader}>Plate</th>
                <th style={tableHeader}>Type</th>
                <th style={tableHeader}>Road</th>
                <th style={tableHeader}>Zone</th>
                <th style={tableHeader}>Speed</th>
                <th style={tableHeader}>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredVehicles.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="metro-empty-state">
                      {search
                        ? "No vehicles match your search."
                        : loading
                          ? "Loading vehicle registry..."
                          : "No vehicles are currently registered."}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredVehicles.map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    className={`metro-registry-row ${
                      selectedVehicleId === vehicle.id
                        ? "metro-registry-row-selected"
                        : ""
                    }`}
                    onClick={() => handleSelectVehicle(vehicle.id)}
                    style={{ cursor: "pointer" }}
                    aria-selected={selectedVehicleId === vehicle.id}
                  >
                    <td style={tableCell}>
                      <strong style={{ color: "#d9edf2" }}>
                        {vehicle.id}
                      </strong>
                    </td>
                    <td style={tableCell}>{vehicle.plate}</td>
                    <td style={tableCell}>{vehicle.type}</td>
                    <td style={tableCell}>{vehicle.road}</td>
                    <td style={tableCell}>{vehicle.zone}</td>
                    <td style={tableCell}>{vehicle.speed} km/h</td>
                    <td style={tableCell}>
                      <span
                        className={
                          vehicle.status === "Moving"
                            ? "status status-low"
                            : "status status-medium"
                        }
                      >
                        {vehicle.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid rgba(100,160,190,.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span className="muted" style={{ fontSize: 10 }}>
            Showing {filteredVehicles.length} of {vehicles.length} vehicles
          </span>

          <button
            type="button"
            onClick={() => void refreshVehicles()}
            disabled={loading}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "8px 11px",
              border: "1px solid rgba(34,211,238,.2)",
              borderRadius: 7,
              background: "rgba(34,211,238,.05)",
              color: "#67e8f9",
              fontSize: 10,
              cursor: loading ? "wait" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            <RefreshCw
              size={12}
              style={{
                animation: loading ? "spin 1s linear infinite" : "none",
              }}
            />
            Refresh registry
          </button>
        </div>
      </section>

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
        METROPOLIS digital twin visualizes simulated vehicle positions,
        movement and traffic conditions.
      </div>
    </div>
  );
}

function MapCard({
  icon,
  label,
  value,
  description,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="panel kpi-card">
      {icon}
      <div className="kpi-label" style={{ marginTop: 14 }}>
        {label}
      </div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-change">{description}</div>
    </div>
  );
}

function LegendDot({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        color: "#6d8794",
        fontSize: 9,
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: color,
        }}
      />
      {label}
    </div>
  );
}

function Road({
  left,
  right,
  top,
  bottom,
  vertical = false,
  transform,
}: {
  left: string;
  right?: string;
  top: string;
  bottom?: string;
  vertical?: boolean;
  transform?: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        right: vertical ? undefined : right,
        top,
        bottom: vertical ? bottom : undefined,
        width: vertical ? 3 : undefined,
        height: vertical ? undefined : 3,
        background: "rgba(20,121,208,.24)",
        boxShadow: "0 0 14px rgba(20,190,235,.1)",
        transform,
      }}
    />
  );
}

function ZoneLabel({
  name,
  top,
  left,
}: {
  name: string;
  top: string;
  left: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        color: "rgba(20,85,145,.75)",
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: ".12em",
        pointerEvents: "none",
      }}
    >
      {name}
    </div>
  );
}

function MapControl({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="metro-map-control"
      onClick={onClick}
      title={label}
      aria-label={label}
      style={{
        width: 34,
        height: 34,
        border: "1px solid rgba(100,180,200,.14)",
        borderRadius: 7,
        background: "rgba(5,15,20,.9)",
        color: "#7b9aa5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {icon}
    </button>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div
        className="muted"
        style={{
          fontSize: 8,
          textTransform: "uppercase",
          letterSpacing: ".08em",
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: 3,
          fontSize: 10,
          fontWeight: 600,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "#d9edf2",
        }}
      >
        {value}
      </div>
    </div>
  );
}

const tableHeader: CSSProperties = {
  textAlign: "left",
  padding: "13px 16px",
  borderBottom: "1px solid rgba(100,160,190,.08)",
};

const tableCell: CSSProperties = {
  padding: "14px 16px",
  borderBottom: "1px solid rgba(100,160,190,.06)",
  fontSize: 11,
  color: "#9ab5c0",
};