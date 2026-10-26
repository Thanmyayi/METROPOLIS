import { useCallback, useEffect, useState } from "react";
import { getVehicles } from "../services/api";
import { vehicles as baseVehicles, type VehicleData } from "../data/vehicles";

export interface SimulatedVehicle extends VehicleData {
  latitude: number;
  longitude: number;
  lastUpdated: string;
  routeIndex: number;
  vehicle_id?: string;
  plate_number?: string;
  vehicle_type?: string;
}

export type NewVehicleInput = Omit<VehicleData, "id"> & {
  id?: string;
};

interface UseVehicleSimulationReturn {
  vehicles: SimulatedVehicle[];
  selectedVehicleId: string | null;
  setSelectedVehicleId: (id: string | null) => void;
  selectVehicle: (vehicleId: string) => void;
  clearVehicleSelection: () => void;
  loading: boolean;
  error: string | null;
  refreshVehicles: () => Promise<void>;
  addVehicle: (vehicle: NewVehicleInput) => SimulatedVehicle;
}

const LOCAL_VEHICLES_KEY = "metropolis_manual_vehicles";
const DEFAULT_LATITUDE = 12.9718;
const DEFAULT_LONGITUDE = 77.5945;

function toSimulatedVehicle(
  vehicle: Partial<SimulatedVehicle> & Partial<VehicleData>,
  index: number,
): SimulatedVehicle {
  const position = vehicle.position ?? [
    vehicle.latitude ?? DEFAULT_LATITUDE,
    vehicle.longitude ?? DEFAULT_LONGITUDE,
  ];

  const latitude = Number(position[0]) || DEFAULT_LATITUDE;
  const longitude = Number(position[1]) || DEFAULT_LONGITUDE;

  return {
    id: vehicle.id || `VH-${String(index + 1).padStart(3, "0")}`,
    plate: vehicle.plate || "",
    type: vehicle.type || "car",
    model: vehicle.model || "Sedan",
    road: vehicle.road || "Unknown Road",
    zone: vehicle.zone || "Zone A",
    speed: Number(vehicle.speed) || 0,
    direction: vehicle.direction || "North",
    status: vehicle.status === "Stopped" ? "Stopped" : "Moving",
    position: [latitude, longitude],
    latitude,
    longitude,
    lastUpdated: vehicle.lastUpdated || "Just now",
    routeIndex: vehicle.routeIndex ?? index,
    vehicle_id: vehicle.vehicle_id,
    plate_number: vehicle.plate_number,
    vehicle_type: vehicle.vehicle_type,
  };
}

function createFallbackVehicles(): SimulatedVehicle[] {
  return baseVehicles.map((vehicle, index) =>
    toSimulatedVehicle(vehicle, index),
  );
}

function readManualVehicles(): SimulatedVehicle[] {
  try {
    const saved = localStorage.getItem(LOCAL_VEHICLES_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((vehicle, index) =>
      toSimulatedVehicle(vehicle, baseVehicles.length + index),
    );
  } catch {
    return [];
  }
}

function saveManualVehicles(vehicles: SimulatedVehicle[]) {
  try {
    localStorage.setItem(LOCAL_VEHICLES_KEY, JSON.stringify(vehicles));
  } catch (error) {
    console.error("Could not save manual vehicles locally:", error);
  }
}

function normalizeBackendVehicle(vehicle: any, index: number): SimulatedVehicle {
  const id = String(
    vehicle.vehicle_id ?? vehicle.id ?? `VH-${String(index + 1).padStart(3, "0")}`,
  );

  const typeValue = String(vehicle.vehicle_type ?? vehicle.type ?? "car").toLowerCase();
  const type: VehicleData["type"] =
    typeValue === "bus" || typeValue === "bike" ? typeValue : "car";

  const latitude = Number(
    vehicle.latitude ?? vehicle.lat ?? vehicle.position?.[0] ?? DEFAULT_LATITUDE,
  );
  const longitude = Number(
    vehicle.longitude ?? vehicle.lng ?? vehicle.position?.[1] ?? DEFAULT_LONGITUDE,
  );

  return toSimulatedVehicle(
    {
      id,
      plate: String(vehicle.plate_number ?? vehicle.number_plate ?? vehicle.plate ?? ""),
      type,
      model: String(vehicle.model ?? vehicle.vehicle_name ?? vehicle.name ?? "Vehicle"),
      road: String(vehicle.road ?? vehicle.road_name ?? "Unknown Road"),
      zone: String(vehicle.zone ?? vehicle.zone_name ?? "Zone A"),
      speed: Number(vehicle.speed ?? 0),
      direction: String(vehicle.direction ?? "North"),
      status: vehicle.status === "Stopped" ? "Stopped" : "Moving",
      position: [latitude, longitude],
      latitude,
      longitude,
      lastUpdated: String(vehicle.last_updated ?? vehicle.lastUpdated ?? "Just now"),
      routeIndex: index,
      vehicle_id: vehicle.vehicle_id,
      plate_number: vehicle.plate_number,
      vehicle_type: vehicle.vehicle_type,
    },
    index,
  );
}

export function useVehicleSimulation(): UseVehicleSimulationReturn {
  const [vehicles, setVehicles] = useState<SimulatedVehicle[]>(() => [
    ...createFallbackVehicles(),
    ...readManualVehicles(),
  ]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshVehicles = useCallback(async () => {
    try {
      const response = await getVehicles();
      const data = response?.data ?? [];
      const manualVehicles = readManualVehicles();

      if (Array.isArray(data) && data.length > 0) {
        const backendVehicles = data.map(normalizeBackendVehicle);
        const backendIds = new Set(backendVehicles.map((vehicle) => vehicle.id));

        const combined = [
          ...backendVehicles,
          ...manualVehicles.filter((vehicle) => !backendIds.has(vehicle.id)),
        ];

        setVehicles(combined);
        setError(null);
      } else {
        setVehicles([...createFallbackVehicles(), ...manualVehicles]);
        setError(null);
      }
    } catch {
      setVehicles([...createFallbackVehicles(), ...readManualVehicles()]);
      setError("Backend vehicle data unavailable. Using simulation data.");
    } finally {
      setLoading(false);
    }
  }, []);

  const addVehicle = useCallback((input: NewVehicleInput): SimulatedVehicle => {
    const manualVehicles = readManualVehicles();
    const currentVehicles = vehicles;

    const requestedId = input.id?.trim();
    const nextNumber = [...currentVehicles, ...manualVehicles].reduce(
      (maximum, vehicle) => {
        const match = vehicle.id.match(/VH-(\d+)/i);
        return match ? Math.max(maximum, Number(match[1])) : maximum;
      },
      0,
    ) + 1;

    const id = requestedId || `VH-${String(nextNumber).padStart(3, "0")}`;

    if (
      [...currentVehicles, ...manualVehicles].some(
        (vehicle) =>
          vehicle.id.toLowerCase() === id.toLowerCase() ||
          vehicle.plate.toLowerCase() === input.plate.trim().toLowerCase(),
      )
    ) {
      throw new Error("A vehicle with this ID or number plate already exists.");
    }

    const newVehicle = toSimulatedVehicle(
      {
        ...input,
        id,
        plate: input.plate.trim().toUpperCase(),
        latitude: input.position[0],
        longitude: input.position[1],
        position: input.position,
        lastUpdated: "Just now",
        routeIndex: currentVehicles.length,
      },
      currentVehicles.length,
    );

    const updatedManualVehicles = [...manualVehicles, newVehicle];
    saveManualVehicles(updatedManualVehicles);
    setVehicles((current) => [...current, newVehicle]);

    return newVehicle;
  }, [vehicles]);

  useEffect(() => {
    void refreshVehicles();
  }, [refreshVehicles]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVehicles((currentVehicles) =>
        currentVehicles.map((vehicle) => {
          if (vehicle.status === "Stopped") {
            return { ...vehicle, lastUpdated: "Just now" };
          }

          let latitude = vehicle.latitude;
          let longitude = vehicle.longitude;

          switch (vehicle.direction.toLowerCase()) {
            case "north":
              latitude += 0.00005;
              break;
            case "south":
              latitude -= 0.00005;
              break;
            case "east":
              longitude += 0.00005;
              break;
            case "west":
              longitude -= 0.00005;
              break;
            case "north-east":
            case "northeast":
              latitude += 0.000035;
              longitude += 0.000035;
              break;
            case "north-west":
            case "northwest":
              latitude += 0.000035;
              longitude -= 0.000035;
              break;
            case "south-east":
            case "southeast":
              latitude -= 0.000035;
              longitude += 0.000035;
              break;
            case "south-west":
            case "southwest":
              latitude -= 0.000035;
              longitude -= 0.000035;
              break;
            default:
              latitude += 0.00003;
          }

          if (
            latitude < 12.965 ||
            latitude > 12.980 ||
            longitude < 77.585 ||
            longitude > 77.605
          ) {
            latitude = DEFAULT_LATITUDE;
            longitude = DEFAULT_LONGITUDE;
          }

          return {
            ...vehicle,
            latitude,
            longitude,
            position: [latitude, longitude],
            lastUpdated: "Just now",
            routeIndex: vehicle.routeIndex + 1,
          };
        }),
      );
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (
      selectedVehicleId &&
      !vehicles.some((vehicle) => vehicle.id === selectedVehicleId)
    ) {
      setSelectedVehicleId(null);
    }
  }, [vehicles, selectedVehicleId]);

  const selectVehicle = useCallback((vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
  }, []);

  const clearVehicleSelection = useCallback(() => {
    setSelectedVehicleId(null);
  }, []);

  return {
    vehicles,
    selectedVehicleId,
    setSelectedVehicleId,
    selectVehicle,
    clearVehicleSelection,
    loading,
    error,
    refreshVehicles,
    addVehicle,
  };
}