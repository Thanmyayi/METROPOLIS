import { useEffect, useState } from "react";
import {
  Activity,
  Bike,
  Car,
  Layers,
  LocateFixed,
  Map,
  Minus,
  Plus,
  ShieldAlert,
  Truck,
} from "lucide-react";

interface Vehicle {
  id: string;
  plate: string;
  type: "Car" | "Bus" | "Bike" | "Truck";
  speed: number;
  x: number;
  y: number;
}

const initialVehicles: Vehicle[] = [
  {
    id: "VH-001",
    plate: "KA-01-AB-1234",
    type: "Car",
    speed: 32,
    x: 25,
    y: 35,
  },
  {
    id: "VH-002",
    plate: "KA-01-CD-5621",
    type: "Bus",
    speed: 18,
    x: 52,
    y: 55,
  },
  {
    id: "VH-003",
    plate: "KA-01-EF-8934",
    type: "Car",
    speed: 41,
    x: 67,
    y: 30,
  },
  {
    id: "VH-004",
    plate: "KA-05-GH-1245",
    type: "Bike",
    speed: 22,
    x: 76,
    y: 69,
  },
  {
    id: "VH-005",
    plate: "KA-03-JK-7412",
    type: "Car",
    speed: 28,
    x: 39,
    y: 72,
  },
  {
    id: "VH-006",
    plate: "KA-02-LM-4128",
    type: "Truck",
    speed: 21,
    x: 58,
    y: 26,
  },
];

export default function LiveMap() {
  const [vehicles, setVehicles] =
    useState(initialVehicles);

  const [selected, setSelected] =
    useState<Vehicle>(initialVehicles[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setVehicles((current) =>
        current.map((vehicle) => ({
          ...vehicle,
          x:
            vehicle.x > 90
              ? 10
              : vehicle.x + 0.35,
          speed: Math.max(
            12,
            Math.min(
              55,
              vehicle.speed +
                (Math.random() - 0.5) * 2,
            ),
          ),
        })),
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updated = vehicles.find(
      (vehicle) =>
        vehicle.id === selected.id,
    );

    if (updated) {
      setSelected(updated);
    }
  }, [vehicles]);

  return (
    <div className="metropolis-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Live City Map
          </h1>

          <p className="page-subtitle">
            Real-time digital twin vehicle simulation
          </p>
        </div>

        <span className="live-pill">
          <span className="live-dot" />
          LIVE SIMULATION
        </span>
      </div>

      <div className="panel live-map-container">
        <div className="live-city-map">
          <div className="map-grid" />

          <div className="live-road horizontal-one" />
          <div className="live-road horizontal-two" />
          <div className="live-road vertical-one" />
          <div className="live-road vertical-two" />

          <span className="map-zone zone-a">
            ZONE A
          </span>

          <span className="map-zone zone-b">
            ZONE B
          </span>

          <span className="map-zone zone-c">
            ZONE C
          </span>

          {vehicles.map((vehicle) => (
            <button
              key={vehicle.id}
              className={`map-vehicle ${
                selected.id === vehicle.id
                  ? "selected"
                  : ""
              }`}
              style={{
                left: `${vehicle.x}%`,
                top: `${vehicle.y}%`,
              }}
              onClick={() =>
                setSelected(vehicle)
              }
            >
              {vehicle.type === "Bus" ? (
                <Truck size={13} />
              ) : vehicle.type === "Bike" ? (
                <Bike size={13} />
              ) : (
                <Car size={13} />
              )}
            </button>
          ))}

          <div className="map-controls">
            <button>
              <Plus size={15} />
            </button>

            <button>
              <Minus size={15} />
            </button>

            <button>
              <Layers size={15} />
            </button>

            <button>
              <LocateFixed size={15} />
            </button>
          </div>

          <div className="map-live-badge">
            <Activity size={13} />
            {vehicles.length} active vehicles
          </div>
        </div>

        <div className="map-selected-info">
          <div>
            <span>Selected Vehicle</span>

            <strong>
              {selected.plate}
            </strong>
          </div>

          <div>
            <span>Type</span>
            <strong>{selected.type}</strong>
          </div>

          <div>
            <span>Speed</span>
            <strong>
              {selected.speed.toFixed(0)} km/h
            </strong>
          </div>

          <div>
            <span>Status</span>
            <strong className="green-text">
              Moving
            </strong>
          </div>

          <div>
            <span>Location</span>
            <strong>Zone A</strong>
          </div>

          <ShieldAlert
            size={20}
            className="muted"
          />

          <Map
            size={20}
            className="muted"
          />
        </div>
      </div>
    </div>
  );
}