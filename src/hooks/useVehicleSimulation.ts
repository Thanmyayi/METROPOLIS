import { useSyncExternalStore } from "react";
import { vehicles as baseVehicles } from "../data/vehicles";
import type { VehicleData } from "../data/vehicles";

export interface SimulatedVehicle extends VehicleData {
  lastUpdated: string;
  routeIndex: number;
}

interface VehicleState {
  vehicles: SimulatedVehicle[];
  selectedVehicleId: string | null;
}

const initialVehicles: SimulatedVehicle[] = baseVehicles.map(
  (vehicle) => ({
    ...vehicle,
    lastUpdated: "Just now",
    routeIndex: 0,
  }),
);

const routes: Record<string, [number, number][]> = {
  "VH-001": [
    [12.9718, 77.5945],
    [12.9724, 77.5947],
    [12.9730, 77.5949],
    [12.9736, 77.5951],
    [12.9742, 77.5953],
    [12.9748, 77.5955],
    [12.9752, 77.5957],
    [12.9748, 77.5955],
    [12.9742, 77.5953],
    [12.9736, 77.5951],
    [12.9730, 77.5949],
    [12.9724, 77.5947],
  ],

  "VH-002": [
    [12.9731, 77.5928],
    [12.9731, 77.5935],
    [12.9732, 77.5942],
    [12.9732, 77.5949],
    [12.9733, 77.5956],
    [12.9733, 77.5963],
    [12.9734, 77.5970],
    [12.9733, 77.5963],
    [12.9733, 77.5956],
    [12.9732, 77.5949],
    [12.9732, 77.5942],
    [12.9731, 77.5935],
  ],

  "VH-003": [
    [12.9698, 77.5962],
    [12.9702, 77.5957],
    [12.9707, 77.5952],
    [12.9712, 77.5947],
    [12.9717, 77.5942],
    [12.9722, 77.5937],
    [12.9727, 77.5932],
    [12.9722, 77.5937],
    [12.9717, 77.5942],
    [12.9712, 77.5947],
    [12.9707, 77.5952],
    [12.9702, 77.5957],
  ],

  "VH-004": [
    [12.9687, 77.5917],
    [12.9691, 77.5921],
    [12.9695, 77.5925],
    [12.9699, 77.5929],
    [12.9703, 77.5933],
    [12.9707, 77.5937],
    [12.9711, 77.5941],
    [12.9707, 77.5937],
    [12.9703, 77.5933],
    [12.9699, 77.5929],
    [12.9695, 77.5925],
    [12.9691, 77.5921],
  ],

  "VH-005": [
    [12.9742, 77.5971],
    [12.9740, 77.5965],
    [12.9738, 77.5959],
    [12.9736, 77.5953],
    [12.9734, 77.5947],
    [12.9732, 77.5941],
    [12.9730, 77.5935],
    [12.9732, 77.5941],
    [12.9734, 77.5947],
    [12.9736, 77.5953],
    [12.9738, 77.5959],
    [12.9740, 77.5965],
  ],

  "VH-006": [
    [12.9679, 77.5942],
    [12.9684, 77.5946],
    [12.9689, 77.5950],
    [12.9694, 77.5954],
    [12.9699, 77.5958],
    [12.9704, 77.5962],
    [12.9709, 77.5966],
    [12.9704, 77.5962],
    [12.9699, 77.5958],
    [12.9694, 77.5954],
    [12.9689, 77.5950],
    [12.9684, 77.5946],
  ],

  "VH-007": [
    [12.9725, 77.5908],
    [12.9727, 77.5915],
    [12.9729, 77.5922],
    [12.9731, 77.5929],
    [12.9733, 77.5936],
    [12.9735, 77.5943],
    [12.9737, 77.5950],
    [12.9735, 77.5943],
    [12.9733, 77.5936],
    [12.9731, 77.5929],
    [12.9729, 77.5922],
    [12.9727, 77.5915],
  ],

  "VH-008": [
    [12.9760, 77.5960],
    [12.9756, 77.5956],
    [12.9752, 77.5952],
    [12.9748, 77.5948],
    [12.9744, 77.5944],
    [12.9740, 77.5940],
    [12.9736, 77.5936],
    [12.9740, 77.5940],
    [12.9744, 77.5944],
    [12.9748, 77.5948],
    [12.9752, 77.5952],
    [12.9756, 77.5956],
  ],
};

let state: VehicleState = {
  vehicles: initialVehicles,
  selectedVehicleId: null,
};

const listeners = new Set<() => void>();

let simulationTimer: ReturnType<typeof setInterval> | null = null;
let subscribers = 0;

function notify() {
  listeners.forEach((listener) => listener());
}

function updateVehicles() {
  state = {
    ...state,

    vehicles: state.vehicles.map((vehicle) => {
      const route = routes[vehicle.id];

      if (!route || vehicle.status === "Stopped") {
        return {
          ...vehicle,
          lastUpdated: new Date().toLocaleTimeString(),
        };
      }

      const nextIndex =
        (vehicle.routeIndex + 1) % route.length;

      return {
        ...vehicle,
        position: route[nextIndex],
        routeIndex: nextIndex,
        lastUpdated: new Date().toLocaleTimeString(),
      };
    }),
  };

  notify();
}

function startSimulation() {
  if (simulationTimer) return;

  simulationTimer = setInterval(
    updateVehicles,
    1000,
  );
}

function stopSimulation() {
  if (!simulationTimer) return;

  clearInterval(simulationTimer);
  simulationTimer = null;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  subscribers++;

  if (subscribers === 1) {
    startSimulation();
  }

  return () => {
    listeners.delete(listener);
    subscribers--;

    if (subscribers === 0) {
      stopSimulation();
    }
  };
}

function getSnapshot() {
  return state;
}

function selectVehicle(vehicleId: string) {
  const vehicleExists = state.vehicles.some(
    (vehicle) => vehicle.id === vehicleId,
  );

  if (!vehicleExists) return;

  state = {
    ...state,
    selectedVehicleId: vehicleId,
  };

  notify();
}

function clearVehicleSelection() {
  state = {
    ...state,
    selectedVehicleId: null,
  };

  notify();
}

export function useVehicleSimulation() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot,
  );

  return {
    vehicles: snapshot.vehicles,
    selectedVehicleId: snapshot.selectedVehicleId,
    selectVehicle,
    clearVehicleSelection,
  };
}