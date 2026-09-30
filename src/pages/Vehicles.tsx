import {
  Bike,
  Bus,
  CarFront,
  CircleGauge,
  MapPin,
  Radio,
  Search,
  Signal,
  SquareArrowOutUpRight,
} from "lucide-react";
import { useMemo, useState } from "react";

type VehicleType = "Car" | "Bus" | "Bike";

type Vehicle = {
  id: string;
  plate: string;
  type: VehicleType;
  model: string;
  road: string;
  zone: string;
  speed: number;
  direction: string;
  status: "Moving" | "Stopped";
  lastUpdated: string;
};

const vehicles: Vehicle[] = [
  {
    id: "VH-001",
    plate: "KA-01-AB-1234",
    type: "Car",
    model: "Sedan",
    road: "MG Road",
    zone: "Zone A",
    speed: 42,
    direction: "North",
    status: "Moving",
    lastUpdated: "Just now",
  },
  {
    id: "VH-002",
    plate: "KA-01-BX-4589",
    type: "Bus",
    model: "City Bus",
    road: "Main Road",
    zone: "Zone A",
    speed: 28,
    direction: "East",
    status: "Moving",
    lastUpdated: "Just now",
  },
  {
    id: "VH-003",
    plate: "KA-05-MN-7788",
    type: "Bike",
    model: "Street Bike",
    road: "Central Avenue",
    zone: "Zone A",
    speed: 36,
    direction: "South",
    status: "Moving",
    lastUpdated: "Just now",
  },
  {
    id: "VH-004",
    plate: "KA-03-CD-9021",
    type: "Car",
    model: "Hatchback",
    road: "Park Road",
    zone: "Zone B",
    speed: 12,
    direction: "West",
    status: "Stopped",
    lastUpdated: "18 sec ago",
  },
  {
    id: "VH-005",
    plate: "KA-02-EF-3456",
    type: "Car",
    model: "SUV",
    road: "Ring Road",
    zone: "Zone A",
    speed: 51,
    direction: "North-East",
    status: "Moving",
    lastUpdated: "Just now",
  },
  {
    id: "VH-006",
    plate: "KA-04-GH-2211",
    type: "Bus",
    model: "Electric Bus",
    road: "Station Road",
    zone: "Zone B",
    speed: 22,
    direction: "South-East",
    status: "Moving",
    lastUpdated: "Just now",
  },
  {
    id: "VH-007",
    plate: "KA-02-JK-6543",
    type: "Bike",
    model: "Sports Bike",
    road: "Market Road",
    zone: "Zone A",
    speed: 44,
    direction: "East",
    status: "Moving",
    lastUpdated: "Just now",
  },
  {
    id: "VH-008",
    plate: "KA-05-LM-8899",
    type: "Car",
    model: "Sedan",
    road: "Airport Road",
    zone: "Zone C",
    speed: 31,
    direction: "South",
    status: "Moving",
    lastUpdated: "Just now",
  },
];

export default function Vehicles() {
  const [search, setSearch] = useState("");
  const [selectedVehicle, setSelectedVehicle] =
    useState<Vehicle | null>(vehicles[0]);

  const filteredVehicles = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return vehicles;
    }

    return vehicles.filter((vehicle) =>
      [
        vehicle.id,
        vehicle.plate,
        vehicle.type,
        vehicle.model,
        vehicle.road,
        vehicle.zone,
        vehicle.direction,
        vehicle.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  const movingVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Moving"
  ).length;

  const stoppedVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "Stopped"
  ).length;

  const cars = vehicles.filter(
    (vehicle) => vehicle.type === "Car"
  ).length;

  const buses = vehicles.filter(
    (vehicle) => vehicle.type === "Bus"
  ).length;

  const bikes = vehicles.filter(
    (vehicle) => vehicle.type === "Bike"
  ).length;

  return (
    <div className="metropolis-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Vehicle Intelligence</h1>

          <p className="page-subtitle">
            Monitor and locate simulated vehicles across the digital twin
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />
          LIVE VEHICLE TRACKING
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid-4">
        <div className="panel kpi-card">
          <Radio size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Total Vehicles
          </div>

          <div className="kpi-value">
            {vehicles.length}
          </div>

          <div className="kpi-change">
            Simulated vehicles
          </div>
        </div>

        <div className="panel kpi-card">
          <Signal size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Moving
          </div>

          <div className="kpi-value">
            {movingVehicles}
          </div>

          <div className="kpi-change">
            Live movement
          </div>
        </div>

        <div className="panel kpi-card">
          <CircleGauge size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Stopped
          </div>

          <div className="kpi-value">
            {stoppedVehicles}
          </div>

          <div className="kpi-change">
            Stationary vehicles
          </div>
        </div>

        <div className="panel kpi-card">
          <CarFront size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Vehicle Types
          </div>

          <div
            className="kpi-value"
            style={{ fontSize: 22 }}
          >
            {cars}C / {buses}B / {bikes}Bk
          </div>

          <div className="kpi-change">
            Cars / Buses / Bikes
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div
        className="panel"
        style={{ marginTop: 18 }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Find Any Vehicle
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Search by Vehicle ID, number plate, road, zone or vehicle type
            </p>
          </div>

          <Search size={18} />
        </div>

        <div style={{ padding: 20 }}>
          <div
            style={{
              position: "relative",
              maxWidth: 700,
            }}
          >
            <Search
              size={17}
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                opacity: 0.55,
              }}
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Example: VH-001, KA-01-AB-1234, Zone A, MG Road..."
              style={{
                width: "100%",
                padding: "13px 15px 13px 42px",
                borderRadius: 8,
                border:
                  "1px solid rgba(80,170,205,.18)",
                background: "#061521",
                color: "#e8f8ff",
                outline: "none",
                fontSize: 13,
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 12,
            }}
          >
            <SearchTag text="VH-001" />
            <SearchTag text="KA-01-AB-1234" />
            <SearchTag text="Zone A" />
            <SearchTag text="MG Road" />
          </div>
        </div>
      </div>

      {/* VEHICLE LIST + DETAILS */}
      <div
        className="grid-2"
        style={{
          marginTop: 18,
          alignItems: "start",
        }}
      >
        {/* VEHICLE LIST */}
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Live Vehicle Feed
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                {filteredVehicles.length} vehicles shown
              </p>
            </div>

            <Radio size={18} />
          </div>

          <div
            style={{
              padding: 12,
              maxHeight: 540,
              overflowY: "auto",
            }}
          >
            {filteredVehicles.length === 0 ? (
              <div
                style={{
                  padding: 40,
                  textAlign: "center",
                }}
              >
                <Search size={25} />

                <div
                  style={{
                    marginTop: 12,
                    fontWeight: 600,
                  }}
                >
                  No vehicle found
                </div>

                <div
                  className="muted"
                  style={{
                    marginTop: 5,
                    fontSize: 12,
                  }}
                >
                  Try another Vehicle ID, plate number or location.
                </div>
              </div>
            ) : (
              filteredVehicles.map((vehicle) => (
                <VehicleListItem
                  key={vehicle.id}
                  vehicle={vehicle}
                  selected={
                    selectedVehicle?.id === vehicle.id
                  }
                  onClick={() =>
                    setSelectedVehicle(vehicle)
                  }
                />
              ))
            )}
          </div>
        </div>

        {/* VEHICLE DETAILS */}
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Vehicle Information
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Selected vehicle details
              </p>
            </div>

            <MapPin size={18} />
          </div>

          {selectedVehicle ? (
            <div style={{ padding: 20 }}>
              {/* VEHICLE IDENTITY */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  paddingBottom: 18,
                  borderBottom:
                    "1px solid rgba(100,160,190,.10)",
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "rgba(20,190,235,.08)",
                    border:
                      "1px solid rgba(20,190,235,.15)",
                  }}
                >
                  <VehicleIcon
                    type={selectedVehicle.type}
                    size={25}
                  />
                </div>

                <div>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                    }}
                  >
                    {selectedVehicle.id}
                  </div>

                  <div
                    className="muted"
                    style={{
                      marginTop: 4,
                      fontSize: 12,
                    }}
                  >
                    {selectedVehicle.plate}
                  </div>
                </div>

                <span
                  className="status status-low"
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  {selectedVehicle.status}
                </span>
              </div>

              {/* DETAILS */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(2, minmax(0, 1fr))",
                  gap: 10,
                  marginTop: 18,
                }}
              >
                <DetailBox
                  label="Vehicle Type"
                  value={selectedVehicle.type}
                />

                <DetailBox
                  label="Model"
                  value={selectedVehicle.model}
                />

                <DetailBox
                  label="Current Road"
                  value={selectedVehicle.road}
                />

                <DetailBox
                  label="Current Zone"
                  value={selectedVehicle.zone}
                />

                <DetailBox
                  label="Speed"
                  value={`${selectedVehicle.speed} km/h`}
                />

                <DetailBox
                  label="Direction"
                  value={selectedVehicle.direction}
                />

                <DetailBox
                  label="Last Updated"
                  value={selectedVehicle.lastUpdated}
                />

                <DetailBox
                  label="Traffic Status"
                  value={
                    selectedVehicle.speed < 20
                      ? "Slow"
                      : selectedVehicle.speed < 35
                        ? "Moderate"
                        : "Normal"
                  }
                />
              </div>

              {/* MAP PREVIEW */}
              <div
                style={{
                  marginTop: 18,
                  height: 170,
                  borderRadius: 9,
                  overflow: "hidden",
                  position: "relative",
                  border:
                    "1px solid rgba(80,160,195,.12)",
                  background:
                    "linear-gradient(135deg, #071c2c, #03111d)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "8%",
                    right: "8%",
                    top: "52%",
                    height: 2,
                    background:
                      "rgba(50,180,220,.24)",
                    transform: "rotate(-7deg)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: "8%",
                    bottom: "8%",
                    left: "55%",
                    width: 2,
                    background:
                      "rgba(50,180,220,.18)",
                    transform: "rotate(14deg)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    left: "52%",
                    top: "48%",
                    transform:
                      "translate(-50%, -50%)",
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "rgba(24,201,239,.15)",
                    border:
                      "1px solid rgba(24,201,239,.5)",
                    boxShadow:
                      "0 0 20px rgba(24,201,239,.25)",
                  }}
                >
                  <VehicleIcon
                    type={selectedVehicle.type}
                    size={17}
                  />
                </div>

                <div
                  style={{
                    position: "absolute",
                    left: 12,
                    top: 11,
                    fontSize: 10,
                    letterSpacing: ".08em",
                  }}
                >
                  DIGITAL TWIN
                </div>

                <div
                  style={{
                    position: "absolute",
                    right: 12,
                    bottom: 11,
                    fontSize: 10,
                    color: "#7d9aaa",
                  }}
                >
                  {selectedVehicle.road}
                </div>
              </div>

              {/* ACTION */}
              <button
                type="button"
                className="report-action-button"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: 14,
                }}
                onClick={() =>
                  alert(
                    `${selectedVehicle.id} selected on digital twin map`
                  )
                }
              >
                <SquareArrowOutUpRight size={15} />
                Locate on Digital Twin
              </button>
            </div>
          ) : (
            <div
              style={{
                padding: 50,
                textAlign: "center",
              }}
            >
              Select a vehicle to view its information.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   VEHICLE LIST ITEM
   ========================================================= */

function VehicleListItem({
  vehicle,
  selected,
  onClick,
}: {
  vehicle: Vehicle;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: 13,
        marginBottom: 8,
        textAlign: "left",
        borderRadius: 8,
        border: selected
          ? "1px solid rgba(24,201,239,.35)"
          : "1px solid rgba(100,160,190,.08)",
        background: selected
          ? "rgba(20,190,235,.07)"
          : "rgba(5,20,32,.40)",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          flexShrink: 0,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "rgba(20,190,235,.07)",
        }}
      >
        <VehicleIcon
          type={vehicle.type}
          size={19}
        />
      </div>

      <div
        style={{
          minWidth: 0,
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <strong style={{ fontSize: 13 }}>
            {vehicle.id}
          </strong>

          <span
            style={{
              fontSize: 11,
            }}
          >
            {vehicle.speed} km/h
          </span>
        </div>

        <div
          className="muted"
          style={{
            fontSize: 11,
            marginTop: 4,
          }}
        >
          {vehicle.plate} · {vehicle.road}
        </div>

        <div
          className="muted"
          style={{
            fontSize: 10,
            marginTop: 3,
          }}
        >
          {vehicle.zone} · {vehicle.direction}
        </div>
      </div>

      <span
        style={{
          width: 7,
          height: 7,
          flexShrink: 0,
          borderRadius: "50%",
          background:
            vehicle.status === "Moving"
              ? "#25d59b"
              : "#f2b84b",
          boxShadow:
            vehicle.status === "Moving"
              ? "0 0 8px rgba(37,213,155,.5)"
              : "0 0 8px rgba(242,184,75,.4)",
        }}
      />
    </button>
  );
}

/* =========================================================
   VEHICLE ICON
   ========================================================= */

function VehicleIcon({
  type,
  size = 20,
}: {
  type: VehicleType;
  size?: number;
}) {
  if (type === "Bus") {
    return <Bus size={size} />;
  }

  if (type === "Bike") {
    return <Bike size={size} />;
  }

  return <CarFront size={size} />;
}

/* =========================================================
   DETAIL BOX
   ========================================================= */

function DetailBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 7,
        background: "rgba(5,20,32,.45)",
        border:
          "1px solid rgba(100,160,190,.08)",
      }}
    >
      <div
        className="muted"
        style={{
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: ".06em",
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: 6,
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   SEARCH TAG
   ========================================================= */

function SearchTag({
  text,
}: {
  text: string;
}) {
  return (
    <button
      type="button"
      style={{
        border: "1px solid rgba(80,170,205,.12)",
        background: "rgba(20,190,235,.04)",
        color: "#91b6c5",
        borderRadius: 20,
        padding: "5px 10px",
        fontSize: 10,
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
}