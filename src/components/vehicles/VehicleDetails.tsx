import {
  Car,
  Bus,
  Bike,
  Gauge,
  MapPin,
  Navigation,
  Radio,
  Clock3,
  X,
  Route,
  Crosshair,
} from "lucide-react";
import { useVehicleSimulation } from "../../hooks/useVehicleSimulation";

interface VehicleDetailsProps {
  vehicleId?: string | null;
  onClose?: () => void;
}

export default function VehicleDetails({
  vehicleId,
  onClose,
}: VehicleDetailsProps) {
  const {
    vehicles,
    selectedVehicleId,
    clearVehicleSelection,
  } = useVehicleSimulation();

  const activeVehicleId =
    vehicleId ?? selectedVehicleId;

  const vehicle = vehicles.find(
    (item) => item.id === activeVehicleId,
  );

  const handleClose = () => {
    clearVehicleSelection();
    onClose?.();
  };

  if (!vehicle) {
    return (
      <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
        <div className="text-center">
          <Crosshair className="mx-auto mb-3 h-8 w-8 text-slate-600" />

          <p className="text-sm text-slate-400">
            Select a vehicle
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Vehicle information will appear here
          </p>
        </div>
      </div>
    );
  }

  const VehicleIcon =
    vehicle.type === "bus"
      ? Bus
      : vehicle.type === "bike"
        ? Bike
        : Car;

  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-slate-950/80 p-5 shadow-[0_0_30px_rgba(6,182,212,0.08)] backdrop-blur-xl">
      <div className="mb-5 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3">
            <VehicleIcon className="h-6 w-6 text-cyan-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-mono text-lg font-bold text-white">
                {vehicle.id}
              </h2>

              <span className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-1 text-[9px] font-semibold text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                LIVE
              </span>
            </div>

            <p className="mt-1 font-mono text-xs text-cyan-400">
              {vehicle.plate}
            </p>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-5 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Current Status
          </span>

          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
              vehicle.status === "Moving"
                ? "bg-emerald-400/10 text-emerald-300"
                : "bg-amber-400/10 text-amber-300"
            }`}
          >
            {vehicle.status}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-cyan-400" />

          <span className="text-sm text-white">
            Vehicle telemetry active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <InfoCard
          icon={<Gauge className="h-4 w-4" />}
          label="Speed"
          value={`${vehicle.speed} km/h`}
        />

        <InfoCard
          icon={<Navigation className="h-4 w-4" />}
          label="Direction"
          value={vehicle.direction}
        />

        <InfoCard
          icon={<Route className="h-4 w-4" />}
          label="Road"
          value={vehicle.road}
        />

        <InfoCard
          icon={<MapPin className="h-4 w-4" />}
          label="Zone"
          value={vehicle.zone}
        />

        <InfoCard
          icon={<Car className="h-4 w-4" />}
          label="Model"
          value={vehicle.model}
        />

        <InfoCard
          icon={<Clock3 className="h-4 w-4" />}
          label="Updated"
          value={vehicle.lastUpdated}
        />
      </div>

      <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-cyan-400" />

          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Live Coordinates
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] text-slate-600">
              LATITUDE
            </p>

            <p className="mt-1 font-mono text-sm text-cyan-300">
              {vehicle.position[0].toFixed(6)}
            </p>
          </div>

          <div>
            <p className="text-[10px] text-slate-600">
              LONGITUDE
            </p>

            <p className="mt-1 font-mono text-sm text-cyan-300">
              {vehicle.position[1].toFixed(6)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-cyan-400/10 bg-cyan-400/5 p-3">
        <p className="text-[10px] leading-relaxed text-slate-500">
          Vehicle position is simulated in real time by the
          METROPOLIS digital-twin engine.
        </p>
      </div>
    </div>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoCard({
  icon,
  label,
  value,
}: InfoCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
      <div className="mb-2 flex items-center gap-2 text-cyan-400">
        {icon}

        <span className="text-[10px] uppercase tracking-wider text-slate-500">
          {label}
        </span>
      </div>

      <p className="truncate text-sm font-medium text-white">
        {value}
      </p>
    </div>
  );
}