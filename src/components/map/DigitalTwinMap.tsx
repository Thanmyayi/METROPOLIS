import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Circle,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import {
  Car,
  Bus,
  Bike,
  Navigation,
  Gauge,
  MapPin,
  Radio,
  Activity,
} from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";

import { useVehicleSimulation } from "../../hooks/useVehicleSimulation";

import "leaflet/dist/leaflet.css";

interface DigitalTwinMapProps {
  className?: string;
}

const center: [number, number] = [12.9725, 77.5945];

function createVehicleIcon(
  type: "car" | "bus" | "bike",
  selected: boolean,
) {
  const Icon =
    type === "bus"
      ? Bus
      : type === "bike"
        ? Bike
        : Car;

  const iconMarkup = renderToStaticMarkup(
    <Icon size={18} strokeWidth={2.2} />,
  );

  const selectedStyle = selected
    ? `
      border: 2px solid #67e8f9;
      box-shadow:
        0 0 0 5px rgba(34,211,238,0.15),
        0 0 18px rgba(34,211,238,0.9);
    `
    : `
      border: 1px solid rgba(34,211,238,0.45);
      box-shadow: 0 0 12px rgba(34,211,238,0.45);
    `;

  return L.divIcon({
    className: "metropolis-vehicle-marker",

    html: `
      <div
        style="
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(2, 6, 23, 0.96);
          color: #67e8f9;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.3s ease;
          ${selectedStyle}
        "
      >
        ${iconMarkup}

        ${
          selected
            ? `
              <span
                style="
                  position: absolute;
                  inset: -9px;
                  border: 1px solid rgba(103,232,249,0.45);
                  border-radius: 50%;
                  animation: metropolisPulse 1.5s infinite;
                "
              ></span>
            `
            : ""
        }
      </div>
    `,

    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18],
  });
}

function MapVehicleFocus() {
  const map = useMap();

  const {
    vehicles,
    selectedVehicleId,
  } = useVehicleSimulation();

  useEffect(() => {
    if (!selectedVehicleId) return;

    const vehicle = vehicles.find(
      (item) => item.id === selectedVehicleId,
    );

    if (!vehicle) return;

    map.flyTo(vehicle.position, 17, {
      duration: 1.2,
    });
  }, [selectedVehicleId, map]);

  useEffect(() => {
    if (!selectedVehicleId) return;

    const vehicle = vehicles.find(
      (item) => item.id === selectedVehicleId,
    );

    if (!vehicle) return;

    map.panTo(vehicle.position, {
      animate: true,
      duration: 0.6,
    });
  }, [vehicles, selectedVehicleId, map]);

  return null;
}

function VehiclePopup({
  vehicle,
}: {
  vehicle: ReturnType<
    typeof useVehicleSimulation
  >["vehicles"][number];
}) {
  return (
    <div className="min-w-[220px] bg-slate-950 text-white">
      <div className="mb-3 flex items-center justify-between border-b border-slate-700 pb-3">
        <div>
          <p className="font-mono text-sm font-bold">
            {vehicle.id}
          </p>

          <p className="mt-1 font-mono text-xs text-cyan-400">
            {vehicle.plate}
          </p>
        </div>

        <span
          className={`rounded-full px-2 py-1 text-[9px] font-semibold ${
            vehicle.status === "Moving"
              ? "bg-emerald-400/10 text-emerald-300"
              : "bg-amber-400/10 text-amber-300"
          }`}
        >
          {vehicle.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <PopupItem
          icon={<Gauge size={13} />}
          label="Speed"
          value={`${vehicle.speed} km/h`}
        />

        <PopupItem
          icon={<Navigation size={13} />}
          label="Direction"
          value={vehicle.direction}
        />

        <PopupItem
          icon={<MapPin size={13} />}
          label="Road"
          value={vehicle.road}
        />

        <PopupItem
          icon={<Activity size={13} />}
          label="Zone"
          value={vehicle.zone}
        />
      </div>

      <div className="mt-3 border-t border-slate-800 pt-3">
        <p className="text-[9px] uppercase tracking-wider text-slate-600">
          Last Updated
        </p>

        <p className="mt-1 font-mono text-[11px] text-slate-400">
          {vehicle.lastUpdated}
        </p>
      </div>
    </div>
  );
}

function PopupItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-1 text-cyan-400">
        {icon}

        <span className="text-[9px] uppercase text-slate-500">
          {label}
        </span>
      </div>

      <p className="truncate text-[11px] text-white">
        {value}
      </p>
    </div>
  );
}

export default function DigitalTwinMap({
  className = "",
}: DigitalTwinMapProps) {
  const {
    vehicles,
    selectedVehicleId,
    selectVehicle,
  } = useVehicleSimulation();

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-950 shadow-[0_0_35px_rgba(6,182,212,0.08)] ${className}`}
    >
      <style>
        {`
          @keyframes metropolisPulse {
            0% {
              transform: scale(0.8);
              opacity: 0.9;
            }

            70% {
              transform: scale(1.2);
              opacity: 0;
            }

            100% {
              transform: scale(1.2);
              opacity: 0;
            }
          }

          .metropolis-vehicle-marker {
            background: transparent !important;
            border: none !important;
          }

          .incident-marker {
            background: transparent !important;
            border: none !important;
          }

          .leaflet-popup-content-wrapper,
          .leaflet-popup-tip {
            background: #020617;
            color: white;
            border: 1px solid rgba(34, 211, 238, 0.2);
          }

          .leaflet-popup-content {
            margin: 14px;
          }

          .leaflet-control-zoom a {
            background: rgba(2, 6, 23, 0.9) !important;
            color: #67e8f9 !important;
            border-color: rgba(34, 211, 238, 0.2) !important;
          }

          .leaflet-control-zoom a:hover {
            background: rgba(8, 47, 73, 0.95) !important;
          }

          .leaflet-control-attribution {
            background: rgba(2, 6, 23, 0.75) !important;
            color: #64748b !important;
          }

          .leaflet-control-attribution a {
            color: #38bdf8 !important;
          }
        `}
      </style>

      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom
        className="h-full min-h-[520px] w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapVehicleFocus />

        {/* Zone A */}
        <Polygon
          positions={[
            [12.9745, 77.5915],
            [12.9765, 77.5915],
            [12.9765, 77.5975],
            [12.9745, 77.5975],
          ]}
          pathOptions={{
            color: "#22d3ee",
            weight: 1,
            fillOpacity: 0.05,
          }}
        >
          <Tooltip>METROPOLIS ZONE A</Tooltip>
        </Polygon>

        {/* Zone B */}
        <Polygon
          positions={[
            [12.9670, 77.5905],
            [12.9720, 77.5905],
            [12.9720, 77.5955],
            [12.9670, 77.5955],
          ]}
          pathOptions={{
            color: "#38bdf8",
            weight: 1,
            fillOpacity: 0.04,
          }}
        >
          <Tooltip>METROPOLIS ZONE B</Tooltip>
        </Polygon>

        {/* Digital Twin monitoring radius */}
        <Circle
          center={center}
          radius={650}
          pathOptions={{
            color: "#06b6d4",
            weight: 1,
            opacity: 0.25,
            fillOpacity: 0.015,
          }}
        />

        {/* Simulated vehicles */}
        {vehicles.map((vehicle) => {
          const selected =
            selectedVehicleId === vehicle.id;

          return (
            <Marker
              key={vehicle.id}
              position={vehicle.position}
              icon={createVehicleIcon(
                vehicle.type,
                selected,
              )}
              eventHandlers={{
                click: () => {
                  selectVehicle(vehicle.id);
                },
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -18]}
              >
                <div>
                  <p className="font-mono text-xs font-bold">
                    {vehicle.id}
                  </p>

                  <p className="font-mono text-[10px] text-cyan-400">
                    {vehicle.plate}
                  </p>
                </div>
              </Tooltip>

              <Popup>
                <VehiclePopup vehicle={vehicle} />
              </Popup>
            </Marker>
          );
        })}

        {/* Simulated incident */}
        <Marker
          position={[12.9712, 77.5962]}
          icon={L.divIcon({
            className: "incident-marker",

            html: `
              <div
                style="
                  width: 28px;
                  height: 28px;
                  border-radius: 50%;
                  background: rgba(239,68,68,0.15);
                  border: 2px solid rgba(248,113,113,0.9);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 0 18px rgba(239,68,68,0.6);
                  color: #f87171;
                  font-size: 15px;
                  font-weight: 700;
                "
              >
                !
              </div>
            `,

            iconSize: [28, 28],
            iconAnchor: [14, 14],
          })}
        >
          <Popup>
            <div className="min-w-[180px]">
              <p className="font-semibold text-red-400">
                Traffic Incident
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Simulated congestion event detected.
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Digital Twin header */}
      <div className="pointer-events-none absolute left-4 top-4 z-[1000]">
        <div className="rounded-xl border border-cyan-400/20 bg-slate-950/90 px-4 py-3 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-cyan-400/10 p-2">
              <Radio className="h-4 w-4 text-cyan-400" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold tracking-wider text-white">
                  DIGITAL TWIN
                </p>

                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              </div>

              <p className="mt-1 text-[9px] text-slate-500">
                LIVE CITY SIMULATION
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle counter */}
      <div className="absolute bottom-5 right-5 z-[1000]">
        <div className="rounded-xl border border-cyan-400/20 bg-slate-950/90 px-4 py-3 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Car className="h-5 w-5 text-cyan-400" />

              <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-wider text-slate-500">
                Active Vehicles
              </p>

              <p className="font-mono text-lg font-bold text-white">
                {vehicles.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Selected vehicle indicator */}
      {selectedVehicleId && (
        <div className="absolute bottom-5 left-5 z-[1000]">
          <div className="flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-slate-950/90 px-4 py-3 shadow-[0_0_25px_rgba(6,182,212,0.12)] backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

            <div>
              <p className="text-[9px] uppercase tracking-wider text-slate-500">
                Tracking
              </p>

              <p className="font-mono text-xs font-bold text-cyan-300">
                {selectedVehicleId}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}