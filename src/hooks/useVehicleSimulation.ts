import { useEffect, useState } from "react";
import { getVehicles } from "../services/api";
import { vehicles as baseVehicles } from "../data/vehicles";
import type { VehicleData } from "../data/vehicles";

/* =========================================================
   SIMULATED VEHICLE
   ========================================================= */

export interface SimulatedVehicle extends VehicleData {
  latitude: number;
  longitude: number;
  lastUpdated: string;
  routeIndex: number;
}

/* =========================================================
   HOOK RETURN TYPE
   ========================================================= */

interface UseVehicleSimulationReturn {
  vehicles: SimulatedVehicle[];

  selectedVehicleId: string | null;

  setSelectedVehicleId: (
    id: string | null
  ) => void;

  selectVehicle: (
    vehicleId: string
  ) => void;

  clearVehicleSelection: () => void;

  loading: boolean;

  error: string | null;

  refreshVehicles: () => Promise<void>;
}

/* =========================================================
   FALLBACK VEHICLES
   ========================================================= */

const createFallbackVehicles =
  (): SimulatedVehicle[] => {
    return baseVehicles.map(
      (vehicle, index) => {
        const vehicleWithCoordinates =
          vehicle as VehicleData & {
            latitude?: number;
            longitude?: number;
          };

        return {
          ...vehicle,

          latitude:
            Number(
              vehicleWithCoordinates.latitude ??
                12.9718
            ),

          longitude:
            Number(
              vehicleWithCoordinates.longitude ??
                77.5945
            ),

          lastUpdated: "Just now",

          routeIndex: index,
        };
      }
    );
  };

/* =========================================================
   NORMALIZE BACKEND VEHICLE
   ========================================================= */

const normalizeVehicle = (
  vehicle: any,
  index: number
): SimulatedVehicle => {
  const vehicleId =
    vehicle.vehicle_id ??
    vehicle.id ??
    `VH-${String(
      index + 1
    ).padStart(3, "0")}`;

  const plateNumber =
    vehicle.plate_number ??
    vehicle.number_plate ??
    vehicle.plate ??
    "KA-01-XX-0000";

  const vehicleType =
    vehicle.vehicle_type ??
    vehicle.type ??
    "car";

  const vehicleModel =
    vehicle.model ??
    vehicle.vehicle_name ??
    vehicle.name ??
    "Simulated Vehicle";

  const roadName =
    vehicle.road ??
    vehicle.road_name ??
    "Main Road";

  const zoneName =
    vehicle.zone ??
    vehicle.zone_name ??
    "Zone A";

  const speed =
    Number(
      vehicle.speed ?? 0
    );

  const direction =
    vehicle.direction ??
    "North";

  const status =
    vehicle.status ??
    "Moving";

  const latitude =
    Number(
      vehicle.latitude ??
        vehicle.lat ??
        12.9718
    );

  const longitude =
    Number(
      vehicle.longitude ??
        vehicle.lng ??
        77.5945
    );

  const lastUpdated =
    vehicle.last_updated ??
    vehicle.lastUpdated ??
    "Just now";

  return {
    ...vehicle,

    /* Frontend ID */
    id: vehicleId,

    /* Frontend plate */
    plate: plateNumber,

    /* Frontend type */
    type: vehicleType,

    /* Vehicle model */
    model: vehicleModel,

    /* Road */
    road: roadName,

    /* Zone */
    zone: zoneName,

    /* Speed */
    speed,

    /* Direction */
    direction,

    /* Status */
    status,

    /* Coordinates */
    latitude,

    longitude,

    /* Backend-compatible fields */
    vehicle_id: vehicleId,

    plate_number: plateNumber,

    vehicle_type: vehicleType,

    /* Simulation fields */
    lastUpdated,

    routeIndex: index,
  } as SimulatedVehicle;
};

/* =========================================================
   MAIN HOOK
   ========================================================= */

export const useVehicleSimulation =
  (): UseVehicleSimulationReturn => {
    /* =====================================================
       VEHICLE STATE
       ===================================================== */

    const [
      vehicles,
      setVehicles,
    ] =
      useState<SimulatedVehicle[]>(
        createFallbackVehicles()
      );

    /* =====================================================
       SELECTED VEHICLE
       ===================================================== */

    const [
      selectedVehicleId,
      setSelectedVehicleId,
    ] =
      useState<string | null>(
        null
      );

    /* =====================================================
       LOADING STATE
       ===================================================== */

    const [
      loading,
      setLoading,
    ] =
      useState<boolean>(true);

    /* =====================================================
       ERROR STATE
       ===================================================== */

    const [
      error,
      setError,
    ] =
      useState<string | null>(
        null
      );

    /* =====================================================
       SELECT VEHICLE
       ===================================================== */

    const selectVehicle = (
      vehicleId: string
    ) => {
      setSelectedVehicleId(
        vehicleId
      );
    };

    /* =====================================================
       CLEAR VEHICLE SELECTION
       ===================================================== */

    const clearVehicleSelection =
      () => {
        setSelectedVehicleId(
          null
        );
      };

    /* =====================================================
       LOAD VEHICLES FROM BACKEND
       ===================================================== */

    const refreshVehicles =
      async () => {
        try {
          setLoading(true);

          setError(null);

          const response =
            await getVehicles();

          const backendVehicles =
            response?.data ?? [];

          /* -----------------------------------------------
             BACKEND DATA AVAILABLE
             ----------------------------------------------- */

          if (
            Array.isArray(
              backendVehicles
            ) &&
            backendVehicles.length >
              0
          ) {
            const normalizedVehicles =
              backendVehicles.map(
                (
                  vehicle: any,
                  index: number
                ) =>
                  normalizeVehicle(
                    vehicle,
                    index
                  )
              );

            setVehicles(
              normalizedVehicles
            );

            return;
          }

          /* -----------------------------------------------
             EMPTY BACKEND RESPONSE
             ----------------------------------------------- */

          setVehicles(
            createFallbackVehicles()
          );
        } catch (err) {
          console.error(
            "Failed to load vehicles from backend:",
            err
          );

          setError(
            "Backend vehicle data unavailable. Using simulation data."
          );

          setVehicles(
            createFallbackVehicles()
          );
        } finally {
          setLoading(false);
        }
      };

    /* =====================================================
       INITIAL BACKEND LOAD
       ===================================================== */

    useEffect(() => {
      refreshVehicles();
    }, []);

    /* =====================================================
       LIVE VEHICLE SIMULATION
       ===================================================== */

    useEffect(() => {
      if (
        vehicles.length ===
        0
      ) {
        return;
      }

      const interval =
        setInterval(() => {
          setVehicles(
            (
              currentVehicles
            ) => {
              return currentVehicles.map(
                (
                  vehicle
                ) => {
                  /* -----------------------------------------
                     STOPPED VEHICLE
                     ----------------------------------------- */

                  if (
                    vehicle.status
                      ?.toLowerCase() ===
                    "stopped"
                  ) {
                    return {
                      ...vehicle,

                      lastUpdated:
                        "Just now",
                    };
                  }

                  /* -----------------------------------------
                     MOVEMENT
                     ----------------------------------------- */

                  const movement =
                    0.00005;

                  let newLatitude =
                    Number(
                      vehicle.latitude
                    );

                  let newLongitude =
                    Number(
                      vehicle.longitude
                    );

                  /* -----------------------------------------
                     DIRECTION
                     ----------------------------------------- */

                  switch (
                    vehicle.direction?.toLowerCase()
                  ) {
                    case "north":
                      newLatitude +=
                        movement;
                      break;

                    case "south":
                      newLatitude -=
                        movement;
                      break;

                    case "east":
                      newLongitude +=
                        movement;
                      break;

                    case "west":
                      newLongitude -=
                        movement;
                      break;

                    default:
                      newLongitude +=
                        movement;
                      break;
                  }

                  /* -----------------------------------------
                     UPDATED VEHICLE
                     ----------------------------------------- */

                  return {
                    ...vehicle,

                    latitude:
                      Number(
                        newLatitude.toFixed(
                          7
                        )
                      ),

                    longitude:
                      Number(
                        newLongitude.toFixed(
                          7
                        )
                      ),

                    lastUpdated:
                      "Just now",

                    routeIndex:
                      vehicle.routeIndex +
                      1,
                  };
                }
              );
            }
          );
        }, 3000);

      /* -----------------------------------------------
         CLEANUP
         ----------------------------------------------- */

      return () => {
        clearInterval(
          interval
        );
      };
    }, [vehicles.length]);

    /* =====================================================
       RETURN HOOK DATA
       ===================================================== */

    return {
      vehicles,

      selectedVehicleId,

      setSelectedVehicleId,

      selectVehicle,

      clearVehicleSelection,

      loading,

      error,

      refreshVehicles,
    };
  };