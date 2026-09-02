import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Circle,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Car,
  Bus,
  Bike,
  AlertTriangle,
  MapPin,
  Radio,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

// ===============================
// TYPES
// ===============================

type VehicleType = "car" | "bus" | "bike";

interface Vehicle {
  id: string;
  type: VehicleType;
  plate: string;
  position: [number, number];
  speed: number;
  status: "Moving" | "Stopped";
}

// ===============================
// SIMULATED VEHICLES
// ===============================

const vehicles: Vehicle[] = [
  {
    id: "VH-001",
    type: "car",
    plate: "KA-01-AB-1234",
    position: [12.9718, 77.5945],
    speed: 42,
    status: "Moving",
  },
  {
    id: "VH-002",
    type: "bus",
    plate: "KA-01-BX-4589",
    position: [12.9731, 77.5928],
    speed: 28,
    status: "Moving",
  },
  {
    id: "VH-003",
    type: "bike",
    plate: "KA-05-MN-7788",
    position: [12.9698, 77.5962],
    speed: 36,
    status: "Moving",
  },
  {
    id: "VH-004",
    type: "car",
    plate: "KA-03-CD-9021",
    position: [12.9687, 77.5917],
    speed: 12,
    status: "Stopped",
  },
  {
    id: "VH-005",
    type: "car",
    plate: "KA-02-EF-3456",
    position: [12.9742, 77.5971],
    speed: 51,
    status: "Moving",
  },
  {
    id: "VH-006",
    type: "bus",
    plate: "KA-04-GH-2211",
    position: [12.9679, 77.5942],
    speed: 22,
    status: "Moving",
  },
];

// ===============================
// ICON CREATOR
// ===============================

const createVehicleIcon = (type: VehicleType) => {
  let Icon = Car;

  if (type === "bus") {
    Icon = Bus;
  }

  if (type === "bike") {
    Icon = Bike;
  }

  const html = renderToStaticMarkup(
    <div
      style={{
        width: "38px",
        height: "38px",
        borderRadius: "50%",
        background: "#07111f",
        border: "2px solid #22d3ee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 15px rgba(34,211,238,0.8)",
      }}
    >
      <Icon size={20} color="#22d3ee" strokeWidth={2.5} />
    </div>
  );

  return L.divIcon({
    html,
    className: "",
    iconSize: [38, 38],
    iconAnchor: [19, 19],
  });
};

// ===============================
// INCIDENT ICON
// ===============================

const incidentIcon = L.divIcon({
  html: renderToStaticMarkup(
    <div
      style={{
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        background: "#30100f",
        border: "2px solid #ef4444",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 20px rgba(239,68,68,0.8)",
      }}
    >
      <AlertTriangle
        size={22}
        color="#ef4444"
        strokeWidth={2.5}
      />
    </div>
  ),
  className: "",
  iconSize: [42, 42],
  iconAnchor: [21, 21],
});

// ===============================
// MAP COMPONENT
// ===============================

export default function DigitalTwinMap() {
  const center: [number, number] = [12.9716, 77.5946];

  // Simulated zones
  const zoneA: [number, number][] = [
    [12.975, 77.589],
    [12.975, 77.596],
    [12.970, 77.598],
    [12.968, 77.591],
  ];

  const zoneB: [number, number][] = [
    [12.969, 77.599],
    [12.969, 77.605],
    [12.964, 77.604],
    [12.963, 77.598],
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-950 shadow-2xl">

      {/* ========================= */}
      {/* MAP HEADER */}
      {/* ========================= */}

      <div className="absolute left-4 right-4 top-4 z-[1000] flex items-center justify-between">

        <div className="rounded-xl border border-cyan-400/20 bg-slate-950/90 px-4 py-3 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10">
              <MapPin
                size={19}
                className="text-cyan-400"
              />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                METROPOLIS DIGITAL TWIN
              </h2>

              <p className="text-[11px] text-slate-400">
                Live urban environment simulation
              </p>
            </div>

          </div>
        </div>

        {/* LIVE STATUS */}

        <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-slate-950/90 px-4 py-3 backdrop-blur-md">

          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>

          <span className="text-xs font-semibold tracking-wide text-emerald-400">
            SIMULATION LIVE
          </span>

        </div>

      </div>

      {/* ========================= */}
      {/* MAP */}
      {/* ========================= */}

      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={true}
        className="h-full w-full"
      >

        {/* OPEN STREET MAP */}

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ========================= */}
        {/* ZONE A */}
        {/* ========================= */}

        <Polygon
          positions={zoneA}
          pathOptions={{
            color: "#06b6d4",
            fillColor: "#06b6d4",
            fillOpacity: 0.08,
            weight: 1,
          }}
        >
          <Tooltip sticky>
            Zone A — Central Business District
          </Tooltip>
        </Polygon>

        {/* ========================= */}
        {/* ZONE B */}
        {/* ========================= */}

        <Polygon
          positions={zoneB}
          pathOptions={{
            color: "#8b5cf6",
            fillColor: "#8b5cf6",
            fillOpacity: 0.08,
            weight: 1,
          }}
        >
          <Tooltip sticky>
            Zone B — Residential District
          </Tooltip>
        </Polygon>

        {/* ========================= */}
        {/* SIMULATION AREA */}
        {/* ========================= */}

        <Circle
          center={center}
          radius={650}
          pathOptions={{
            color: "#22d3ee",
            fillColor: "#22d3ee",
            fillOpacity: 0.02,
            weight: 1,
            dashArray: "6 8",
          }}
        />

        {/* ========================= */}
        {/* VEHICLES */}
        {/* ========================= */}

        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            position={vehicle.position}
            icon={createVehicleIcon(vehicle.type)}
          >

            <Popup>

              <div className="min-w-[190px] text-sm">

                <div className="mb-3 flex items-center gap-2">
                  {vehicle.type === "car" && <Car size={18} />}
                  {vehicle.type === "bus" && <Bus size={18} />}
                  {vehicle.type === "bike" && <Bike size={18} />}

                  <strong>{vehicle.id}</strong>
                </div>

                <div className="space-y-1 text-xs">

                  <p>
                    <strong>Number Plate:</strong>{" "}
                    {vehicle.plate}
                  </p>

                  <p>
                    <strong>Type:</strong>{" "}
                    {vehicle.type.toUpperCase()}
                  </p>

                  <p>
                    <strong>Speed:</strong>{" "}
                    {vehicle.speed} km/h
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {vehicle.status}
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {vehicle.position[0].toFixed(4)},{" "}
                    {vehicle.position[1].toFixed(4)}
                  </p>

                </div>

              </div>

            </Popup>

            <Tooltip direction="top">
              {vehicle.id} • {vehicle.plate}
            </Tooltip>

          </Marker>
        ))}

        {/* ========================= */}
        {/* INCIDENT */}
        {/* ========================= */}

        <Marker
          position={[12.9728, 77.5968]}
          icon={incidentIcon}
        >

          <Popup>

            <div className="min-w-[180px]">

              <div className="mb-2 flex items-center gap-2 text-red-500">
                <AlertTriangle size={18} />

                <strong>
                  Traffic Incident
                </strong>
              </div>

              <p className="text-xs">
                Accident detected near Central Junction.
              </p>

              <p className="mt-2 text-xs">
                Severity: <strong>High</strong>
              </p>

            </div>

          </Popup>

          <Tooltip>
            High Severity Incident
          </Tooltip>

        </Marker>

      </MapContainer>

      {/* ========================= */}
      {/* MAP LEGEND */}
      {/* ========================= */}

      <div className="absolute bottom-4 left-4 z-[1000] rounded-xl border border-slate-700/60 bg-slate-950/90 p-3 shadow-xl backdrop-blur-md">

        <div className="mb-2 flex items-center gap-2">
          <Radio
            size={14}
            className="text-cyan-400"
          />

          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
            Live Objects
          </span>
        </div>

        <div className="space-y-2">

          <div className="flex items-center gap-2">
            <Car
              size={14}
              className="text-cyan-400"
            />
            <span className="text-xs text-slate-400">
              Cars
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Bus
              size={14}
              className="text-cyan-400"
            />
            <span className="text-xs text-slate-400">
              Buses
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Bike
              size={14}
              className="text-cyan-400"
            />
            <span className="text-xs text-slate-400">
              Bikes
            </span>
          </div>

          <div className="flex items-center gap-2">
            <AlertTriangle
              size={14}
              className="text-red-400"
            />
            <span className="text-xs text-slate-400">
              Incidents
            </span>
          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* VEHICLE COUNTER */}
      {/* ========================= */}

      <div className="absolute bottom-4 right-4 z-[1000] rounded-xl border border-cyan-500/20 bg-slate-950/90 px-4 py-3 shadow-xl backdrop-blur-md">

        <div className="text-[10px] uppercase tracking-widest text-slate-500">
          Active Vehicles
        </div>

        <div className="mt-1 text-xl font-bold text-cyan-400">
          {vehicles.length}
        </div>

      </div>

    </div>
  );
}