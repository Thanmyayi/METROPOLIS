import { useEffect, useState } from "react";

import {
  vehicles as initialVehicles,
  type Vehicle,
} from "../data/vehicles";

export function useVehicleSimulation() {
  const [vehicles, setVehicles] =
    useState<Vehicle[]>(initialVehicles);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVehicles((currentVehicles) =>
        currentVehicles.map((vehicle) => {
          if (vehicle.status === "Stopped") {
            return vehicle;
          }

          const movement = 0.00012;

          let latitude = vehicle.latitude;
          let longitude = vehicle.longitude;

          switch (vehicle.direction) {
            case "North":
              latitude += movement;
              break;

            case "South":
              latitude -= movement;
              break;

            case "East":
              longitude += movement;
              break;

            case "West":
              longitude -= movement;
              break;

            case "North-East":
              latitude += movement * 0.7;
              longitude += movement * 0.7;
              break;

            case "South-East":
              latitude -= movement * 0.7;
              longitude += movement * 0.7;
              break;

            default:
              longitude += movement * 0.3;
              break;
          }

          return {
            ...vehicle,
            latitude,
            longitude,
          };
        }),
      );
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return vehicles;
}