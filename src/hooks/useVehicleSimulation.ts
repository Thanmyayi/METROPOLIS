import { useCallback, useEffect, useState } from "react";
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

  /* Backend-compatible fields */
  vehicle_id?: string;
  plate_number?: string;
  vehicle_type?: string;
}

/* =========================================================
   HOOK RETURN TYPE
========================================================= */

interface UseVehicleSimulationReturn {
  vehicles: SimulatedVehicle[];

  selectedVehicleId: string | null;

  setSelectedVehicleId: (
    id: string | null,
  ) => void;

  selectVehicle: (
    vehicleId: string,
  ) => void;

  clearVehicleSelection: () => void;

  loading: boolean;

  error: string | null;

  refreshVehicles: () => Promise<void>;
}

/* =========================================================
   DEFAULT COORDINATES
========================================================= */

const DEFAULT_LATITUDE = 12.9718;
const DEFAULT_LONGITUDE = 77.5945;

/* =========================================================
   FALLBACK VEHICLES
========================================================= */

const createFallbackVehicles =
  (): SimulatedVehicle[] => {
    return baseVehicles.map(
      (vehicle, index) => {
        /*
         * Your vehicles.ts already stores:
         *
         * position: [latitude, longitude]
         *
         * Therefore use that first.
         */

        const latitude =
          Number(
            vehicle.position?.[0] ??
              DEFAULT_LATITUDE,
          );

        const longitude =
          Number(
            vehicle.position?.[1] ??
              DEFAULT_LONGITUDE,
          );

        return {
          ...vehicle,

          latitude,

          longitude,

          lastUpdated:
            "Just now",

          routeIndex: index,
        };
      },
    );
  };

/* =========================================================
   NORMALIZE BACKEND VEHICLE
========================================================= */

const normalizeVehicle = (
  vehicle: any,
  index: number,
): SimulatedVehicle => {
  /* -------------------------------------------------------
     VEHICLE ID
  ------------------------------------------------------- */

  const vehicleId =
    vehicle.vehicle_id ??
    vehicle.id ??
    `VH-${String(
      index + 1,
    ).padStart(3, "0")}`;

  /* -------------------------------------------------------
     PLATE
  ------------------------------------------------------- */

  const plateNumber =
    vehicle.plate_number ??
    vehicle.number_plate ??
    vehicle.plate ??
    `KA-01-XX-${String(
      index + 1,
    ).padStart(4, "0")}`;

  /* -------------------------------------------------------
     VEHICLE TYPE
  ------------------------------------------------------- */

  const vehicleType =
    vehicle.vehicle_type ??
    vehicle.type ??
    "car";

  /* -------------------------------------------------------
     MODEL
  ------------------------------------------------------- */

  const vehicleModel =
    vehicle.model ??
    vehicle.vehicle_name ??
    vehicle.name ??
    "Simulated Vehicle";

  /* -------------------------------------------------------
     ROAD
  ------------------------------------------------------- */

  const roadName =
    vehicle.road ??
    vehicle.road_name ??
    "Main Road";

  /* -------------------------------------------------------
     ZONE
  ------------------------------------------------------- */

  const zoneName =
    vehicle.zone ??
    vehicle.zone_name ??
    "Zone A";

  /* -------------------------------------------------------
     SPEED
  ------------------------------------------------------- */

  const speed =
    Number(
      vehicle.speed ?? 0,
    );

  /* -------------------------------------------------------
     DIRECTION
  ------------------------------------------------------- */

  const direction =
    vehicle.direction ??
    "North";

  /* -------------------------------------------------------
     STATUS
  ------------------------------------------------------- */

  const status =
    vehicle.status ===
    "Stopped"
      ? "Stopped"
      : "Moving";

  /* -------------------------------------------------------
     POSITION
  ------------------------------------------------------- */

  /*
   * Backend can provide:
   *
   * latitude
   * longitude
   *
   * OR:
   *
   * lat
   * lng
   *
   * OR:
   *
   * position: [lat, lng]
   */

  const latitude =
    Number(
      vehicle.latitude ??
        vehicle.lat ??
        vehicle.position?.[0] ??
        DEFAULT_LATITUDE,
    );

  const longitude =
    Number(
      vehicle.longitude ??
        vehicle.lng ??
        vehicle.position?.[1] ??
        DEFAULT_LONGITUDE,
    );

  /* -------------------------------------------------------
     LAST UPDATED
  ------------------------------------------------------- */

  const lastUpdated =
    vehicle.last_updated ??
    vehicle.lastUpdated ??
    "Just now";

  /* -------------------------------------------------------
     RETURN NORMALIZED VEHICLE
  ------------------------------------------------------- */

  return {
    ...vehicle,

    /* Frontend fields */

    id: vehicleId,

    plate: plateNumber,

    type: vehicleType,

    model: vehicleModel,

    road: roadName,

    zone: zoneName,

    speed,

    direction,

    status,

    latitude,

    longitude,

    /* Backend-compatible fields */

    vehicle_id:
      vehicleId,

    plate_number:
      plateNumber,

    vehicle_type:
      vehicleType,

    /* Simulation fields */

    lastUpdated,

    routeIndex:
      index,
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
      useState<
        SimulatedVehicle[]
      >(
        createFallbackVehicles(),
      );

    /* =====================================================
       SELECTED VEHICLE
    ===================================================== */

    const [
      selectedVehicleId,
      setSelectedVehicleId,
    ] =
      useState<
        string | null
      >(null);

    /* =====================================================
       LOADING
    ===================================================== */

    const [
      loading,
      setLoading,
    ] =
      useState<boolean>(
        true,
      );

    /* =====================================================
       ERROR
    ===================================================== */

    const [
      error,
      setError,
    ] =
      useState<
        string | null
      >(null);

    /* =====================================================
       SELECT VEHICLE
    ===================================================== */

    const selectVehicle =
      useCallback(
        (
          vehicleId: string,
        ) => {
          setSelectedVehicleId(
            vehicleId,
          );
        },
        [],
      );

    /* =====================================================
       CLEAR SELECTION
    ===================================================== */

    const clearVehicleSelection =
      useCallback(
        () => {
          setSelectedVehicleId(
            null,
          );
        },
        [],
      );

    /* =====================================================
       LOAD VEHICLES
    ===================================================== */

    const refreshVehicles =
      useCallback(
        async () => {
          try {
            setLoading(true);

            setError(null);

            const response =
              await getVehicles();

            const backendVehicles =
              response?.data ??
              [];

            /* ---------------------------------------------
               BACKEND DATA AVAILABLE
            --------------------------------------------- */

            if (
              Array.isArray(
                backendVehicles,
              ) &&
              backendVehicles.length >
                0
            ) {
              const normalizedVehicles =
                backendVehicles.map(
                  (
                    vehicle: any,
                    index: number,
                  ) =>
                    normalizeVehicle(
                      vehicle,
                      index,
                    ),
                );

              setVehicles(
                normalizedVehicles,
              );

              return;
            }

            /* ---------------------------------------------
               EMPTY BACKEND RESPONSE
            --------------------------------------------- */

            setVehicles(
              createFallbackVehicles(),
            );
          } catch (err) {
            console.error(
              "Failed to load vehicles from backend:",
              err,
            );

            setError(
              "Backend vehicle data unavailable. Using simulation data.",
            );

            setVehicles(
              createFallbackVehicles(),
            );
          } finally {
            setLoading(false);
          }
        },
        [],
      );

    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    useEffect(
      () => {
        refreshVehicles();
      },
      [
        refreshVehicles,
      ],
    );

    /* =====================================================
       LIVE VEHICLE SIMULATION
    ===================================================== */

    useEffect(
      () => {
        const interval =
          window.setInterval(
            () => {
              setVehicles(
                (
                  currentVehicles,
                ) => {
                  if (
                    currentVehicles.length ===
                    0
                  ) {
                    return currentVehicles;
                  }

                  return currentVehicles.map(
                    (
                      vehicle,
                    ) => {
                      /* -----------------------------------
                         STOPPED VEHICLE
                      ----------------------------------- */

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

                      /* -----------------------------------
                         MOVEMENT
                      ----------------------------------- */

                      const movement =
                        0.00005;

                      let newLatitude =
                        Number(
                          vehicle.latitude,
                        );

                      let newLongitude =
                        Number(
                          vehicle.longitude,
                        );

                      /* -----------------------------------
                         DIRECTION
                      ----------------------------------- */

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

                        /*
                         * For diagonal directions
                         */

                        case "north-east":
                        case "northeast":
                          newLatitude +=
                            movement;
                          newLongitude +=
                            movement;
                          break;

                        case "north-west":
                        case "northwest":
                          newLatitude +=
                            movement;
                          newLongitude -=
                            movement;
                          break;

                        case "south-east":
                        case "southeast":
                          newLatitude -=
                            movement;
                          newLongitude +=
                            movement;
                          break;

                        case "south-west":
                        case "southwest":
                          newLatitude -=
                            movement;
                          newLongitude -=
                            movement;
                          break;

                        default:
                          newLongitude +=
                            movement;
                          break;
                      }

                      /* -----------------------------------
                         KEEP SIMULATION WITHIN
                         REASONABLE DIGITAL-TWIN AREA
                      ----------------------------------- */

                      if (
                        newLatitude >
                        13.1
                      ) {
                        newLatitude =
                          12.9718;
                      }

                      if (
                        newLatitude <
                        12.85
                      ) {
                        newLatitude =
                          12.9718;
                      }

                      if (
                        newLongitude >
                        77.75
                      ) {
                        newLongitude =
                          77.5945;
                      }

                      if (
                        newLongitude <
                        77.45
                      ) {
                        newLongitude =
                          77.5945;
                      }

                      /* -----------------------------------
                         UPDATED VEHICLE
                      ----------------------------------- */

                      return {
                        ...vehicle,

                        latitude:
                          Number(
                            newLatitude.toFixed(
                              7,
                            ),
                          ),

                        longitude:
                          Number(
                            newLongitude.toFixed(
                              7,
                            ),
                          ),

                        /*
                         * Keep position synchronized
                         * with latitude/longitude.
                         */

                        position: [
                          Number(
                            newLatitude.toFixed(
                              7,
                            ),
                          ),
                          Number(
                            newLongitude.toFixed(
                              7,
                            ),
                          ),
                        ],

                        lastUpdated:
                          "Just now",

                        routeIndex:
                          vehicle.routeIndex +
                          1,
                      };
                    },
                  );
                },
              );
            },
            3000,
          );

        return () => {
          window.clearInterval(
            interval,
          );
        };
      },
      [],
    );

    /* =====================================================
       CLEAR INVALID SELECTION
    ===================================================== */

    useEffect(
      () => {
        if (
          selectedVehicleId &&
          !vehicles.some(
            (
              vehicle,
            ) =>
              vehicle.id.toLowerCase() ===
              selectedVehicleId.toLowerCase(),
          )
        ) {
          setSelectedVehicleId(
            null,
          );
        }
      },
      [
        vehicles,
        selectedVehicleId,
      ],
    );

    /* =====================================================
       RETURN
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