import { useMemo, useState } from "react";
import {
  Bike,
  Bus,
  Car,
  Gauge,
  MapPin,
  Radio,
  Search,
  Truck,
} from "lucide-react";

const vehicles = [
  {
    id: "VH-001",
    plate: "KA-01-AB-1234",
    type: "Car",
    road: "Main Road",
    zone: "Zone A",
    speed: 32,
    status: "Moving",
    direction: "North",
  },
  {
    id: "VH-002",
    plate: "KA-01-CD-5621",
    type: "Bus",
    road: "Ring Road",
    zone: "Zone B",
    speed: 18,
    status: "Moving",
    direction: "East",
  },
  {
    id: "VH-003",
    plate: "KA-01-EF-8934",
    type: "Car",
    road: "Tech Road",
    zone: "Zone C",
    speed: 41,
    status: "Moving",
    direction: "South",
  },
  {
    id: "VH-004",
    plate: "KA-05-GH-1245",
    type: "Bike",
    road: "5th Cross",
    zone: "Zone C",
    speed: 22,
    status: "Stopped",
    direction: "West",
  },
  {
    id: "VH-005",
    plate: "KA-03-JK-7412",
    type: "Truck",
    road: "Industrial Road",
    zone: "Zone D",
    speed: 21,
    status: "Moving",
    direction: "North",
  },
];

export default function Vehicles() {
  const [search, setSearch] =
    useState("");

  const filtered = useMemo(() => {
    const query =
      search.toLowerCase().trim();

    if (!query) return vehicles;

    return vehicles.filter(
      (vehicle) =>
        vehicle.id
          .toLowerCase()
          .includes(query) ||
        vehicle.plate
          .toLowerCase()
          .includes(query) ||
        vehicle.road
          .toLowerCase()
          .includes(query) ||
        vehicle.zone
          .toLowerCase()
          .includes(query),
    );
  }, [search]);

  return (
    <div className="metropolis-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Vehicle Tracking
          </h1>

          <p className="page-subtitle">
            Search and monitor simulated city vehicles
          </p>
        </div>

        <span className="live-pill">
          <span className="live-dot" />
          LIVE VEHICLES
        </span>
      </div>

      <div className="panel">
        <div className="vehicle-search-header">
          <div className="search-input-wrapper">
            <Search size={17} />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search Vehicle ID, Number Plate, Road or Zone..."
            />
          </div>

          <div className="vehicle-count">
            <Radio size={15} />
            {filtered.length} vehicles
          </div>
        </div>

        <div className="vehicle-table">
          <div className="vehicle-table-header">
            <span>Vehicle</span>
            <span>Type</span>
            <span>Location</span>
            <span>Speed</span>
            <span>Direction</span>
            <span>Status</span>
          </div>

          {filtered.map((vehicle) => (
            <div
              className="vehicle-table-row"
              key={vehicle.id}
            >
              <div className="vehicle-id">
                {vehicle.type === "Bus" ? (
                  <Bus />
                ) : vehicle.type === "Bike" ? (
                  <Bike />
                ) : vehicle.type === "Truck" ? (
                  <Truck />
                ) : (
                  <Car />
                )}

                <div>
                  <strong>
                    {vehicle.id}
                  </strong>

                  <span>
                    {vehicle.plate}
                  </span>
                </div>
              </div>

              <span>{vehicle.type}</span>

              <span className="location-cell">
                <MapPin size={13} />
                {vehicle.road},{" "}
                {vehicle.zone}
              </span>

              <span className="speed-cell">
                <Gauge size={13} />
                {vehicle.speed} km/h
              </span>

              <span>
                {vehicle.direction}
              </span>

              <span
                className={`status ${
                  vehicle.status === "Moving"
                    ? "status-low"
                    : "status-medium"
                }`}
              >
                {vehicle.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}