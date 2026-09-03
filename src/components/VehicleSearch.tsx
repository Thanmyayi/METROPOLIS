import { useMemo, useState } from "react";
import {
  Search,
  Car,
  Bus,
  Bike,
  MapPin,
  Gauge,
  Radio,
} from "lucide-react";
import { useVehicleSimulation } from "../../hooks/useVehicleSimulation";

interface VehicleSearchProps {
  onVehicleSelect?: (vehicleId: string) => void;
}

export default function VehicleSearch({
  onVehicleSelect,
}: VehicleSearchProps) {
  const { vehicles, selectedVehicleId, selectVehicle } =
    useVehicleSimulation();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredVehicles = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    if (!query) {
      return vehicles;
    }

    return vehicles.filter(
      (vehicle) =>
        vehicle.id.toLowerCase().includes(query) ||
        vehicle.plate.toLowerCase().includes(query) ||
        vehicle.road.toLowerCase().includes(query) ||
        vehicle.zone.toLowerCase().includes(query) ||
        vehicle.type.toLowerCase().includes(query),
    );
  }, [searchTerm, vehicles]);

  const handleSelect = (vehicleId: string) => {
    selectVehicle(vehicleId);
    onVehicleSelect?.(vehicleId);
  };

  const getVehicleIcon = (type: string) => {
    if (type === "bus") return Bus;
    if (type === "bike") return Bike;
    return Car;
  };

  return (
    <div className="w-full rounded-2xl border border-cyan-400/20 bg-slate-950/80 p-5 shadow-[0_0_30px_rgba(6,182,212,0.08)] backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-cyan-400" />

            <h2 className="text-lg font-semibold text-white">
              Vehicle Tracking
            </h2>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            Search and locate simulated live vehicles
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

          <span className="text-[10px] font-semibold tracking-wider text-emerald-300">
            LIVE
          </span>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-400" />

        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search Vehicle ID, Number Plate, Road or Zone..."
          className="w-full rounded-xl border border-slate-700 bg-slate-900/80 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30"
        />
      </div>

      <div className="mt-4 max-h-[420px] space-y-2 overflow-y-auto pr-1">
        {filteredVehicles.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 py-10 text-center">
            <Search className="mx-auto mb-3 h-7 w-7 text-slate-600" />

            <p className="text-sm text-slate-400">
              No vehicles found
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Try another ID, plate or location
            </p>
          </div>
        ) : (
          filteredVehicles.map((vehicle) => {
            const VehicleIcon = getVehicleIcon(vehicle.type);

            const isSelected =
              selectedVehicleId === vehicle.id;

            return (
              <button
                key={vehicle.id}
                onClick={() => handleSelect(vehicle.id)}
                className={`group w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
                    : "border-slate-800 bg-slate-900/50 hover:border-cyan-400/30 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`rounded-lg p-2 ${
                        isSelected
                          ? "bg-cyan-400/20 text-cyan-300"
                          : "bg-slate-800 text-slate-400 group-hover:text-cyan-400"
                      }`}
                    >
                      <VehicleIcon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-semibold text-white">
                          {vehicle.id}
                        </span>

                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            vehicle.status === "Moving"
                              ? "bg-emerald-400"
                              : "bg-amber-400"
                          }`}
                        />
                      </div>

                      <p className="mt-1 font-mono text-xs text-cyan-400">
                        {vehicle.plate}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2 py-1 text-[9px] font-semibold uppercase ${
                      vehicle.status === "Moving"
                        ? "bg-emerald-400/10 text-emerald-300"
                        : "bg-amber-400/10 text-amber-300"
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="h-3.5 w-3.5 text-cyan-400" />

                    <span className="truncate">
                      {vehicle.road}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    <Gauge className="h-3.5 w-3.5 text-cyan-400" />

                    <span>{vehicle.speed} km/h</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                  <span>{vehicle.zone}</span>

                  <span>{vehicle.direction}</span>
                </div>
              </button>
            );
          })
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-4">
        <span className="text-xs text-slate-500">
          Showing {filteredVehicles.length} of {vehicles.length} vehicles
        </span>

        <span className="font-mono text-xs text-cyan-400">
          {vehicles.filter((v) => v.status === "Moving").length} MOVING
        </span>
      </div>
    </div>
  );
}