import {
  Car,
  Layers3,
  LocateFixed,
  Minus,
  Plus,
  Radio,
  Search,
  TrafficCone,
  X,
} from "lucide-react";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import { useState } from "react";

import {
  useVehicleSimulation,
} from "../hooks/useVehicleSimulation";

import type {
  Vehicle,
} from "../data/vehicles";


/* =========================================
   VEHICLE COLORS
   ========================================= */

const vehicleColors: Record<string, string> = {
  Car: "#22d3ee",
  Bus: "#a78bfa",
  Bike: "#f472b6",
  Truck: "#fbbf24",
};


/* =========================================
   VEHICLE ICON
   ========================================= */

function createVehicleIcon(
  type: string,
  selected: boolean,
) {
  const color =
    vehicleColors[type] || "#22d3ee";

  const emoji =
    type === "Bus"
      ? "🚌"
      : type === "Bike"
        ? "🏍️"
        : type === "Truck"
          ? "🚚"
          : "🚗";

  return L.divIcon({
    className: "vehicle-marker",

    html: `
      <div
        style="
          position: relative;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >

        ${
          selected
            ? `
              <div
                style="
                  position: absolute;
                  width: 42px;
                  height: 42px;
                  border-radius: 50%;
                  border: 2px solid ${color};
                  animation: vehiclePulse 1.5s infinite;
                  opacity: 0.7;
                "
              ></div>
            `
            : ""
        }

        <div
          style="
            width: 30px;
            height: 30px;
            border-radius: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${color};
            color: #04111d;
            border: 2px solid rgba(255,255,255,0.9);
            box-shadow: 0 0 18px ${color};
            font-size: 14px;
            position: relative;
            z-index: 2;
          "
        >
          ${emoji}
        </div>

      </div>
    `,

    iconSize: [42, 42],

    iconAnchor: [21, 21],
  });
}


/* =========================================
   RECENTER MAP
   ========================================= */

function MapRecenter({
  vehicle,
}: {
  vehicle: Vehicle | null;
}) {
  const map = useMap();

  if (vehicle) {
    map.flyTo(
      [
        vehicle.latitude,
        vehicle.longitude,
      ],
      16,
      {
        duration: 1.2,
      },
    );
  }

  return null;
}


/* =========================================
   LIVE MAP
   ========================================= */

export default function LiveMap() {
  const vehicles =
    useVehicleSimulation();

  const [
    selectedVehicle,
    setSelectedVehicle,
  ] = useState<Vehicle | null>(null);

  const [
    search,
    setSearch,
  ] = useState("");


  /* =======================================
     SEARCH FILTER
     ======================================= */

  const filteredVehicles =
    vehicles.filter((vehicle) =>
      `${vehicle.numberPlate}
       ${vehicle.id}
       ${vehicle.road}
       ${vehicle.zone}
       ${vehicle.type}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );


  return (
    <div
      className="
        relative
        h-[calc(100vh-76px)]
        min-h-[650px]
        overflow-hidden
        bg-[#050b14]
      "
    >

      {/* =====================================
          MAP
          ===================================== */}

      <MapContainer
        center={[
          12.972,
          77.596,
        ]}
        zoom={14}
        zoomControl={false}
        className="h-full w-full"
      >

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {/* VEHICLES */}

        {filteredVehicles.map(
          (vehicle) => (
            <Marker
              key={vehicle.id}

              position={[
                vehicle.latitude,
                vehicle.longitude,
              ]}

              icon={createVehicleIcon(
                vehicle.type,
                selectedVehicle?.id ===
                  vehicle.id,
              )}

              eventHandlers={{
                click: () => {
                  setSelectedVehicle(
                    vehicle,
                  );
                },
              }}
            >

              <Popup>

                <div
                  style={{
                    minWidth: "190px",
                  }}
                >

                  <strong>
                    {vehicle.numberPlate}
                  </strong>

                  <br />

                  Vehicle ID:{" "}
                  {vehicle.id}

                  <br />

                  Type:{" "}
                  {vehicle.type}

                  <br />

                  Model:{" "}
                  {vehicle.model}

                  <br />

                  Road:{" "}
                  {vehicle.road}

                  <br />

                  Zone:{" "}
                  {vehicle.zone}

                  <br />

                  Speed:{" "}
                  {vehicle.speed} km/h

                  <br />

                  Direction:{" "}
                  {vehicle.direction}

                </div>

              </Popup>

            </Marker>
          ),
        )}


        <MapRecenter
          vehicle={selectedVehicle}
        />

      </MapContainer>


      {/* =====================================
          MAP HEADER
          ===================================== */}

      <div
        className="
          absolute
          left-5
          top-5
          z-[1000]
        "
      >

        <div
          className="
            rounded-2xl
            border
            border-white/[0.08]
            bg-[#07111e]/90
            p-4
            shadow-2xl
            backdrop-blur-xl
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                rounded-xl
                bg-cyan-400/10
                p-2.5
              "
            >

              <Radio
                size={20}
                className="
                  animate-pulse
                  text-cyan-400
                "
              />

            </div>


            <div>

              <h2
                className="
                  text-sm
                  font-semibold
                  text-white
                "
              >
                Live City Map
              </h2>

              <p
                className="
                  text-[10px]
                  text-slate-500
                "
              >
                Real-time digital twin
              </p>

            </div>


            <div
              className="
                ml-2
                flex
                items-center
                gap-1.5
                rounded-full
                border
                border-emerald-400/20
                bg-emerald-400/10
                px-2
                py-1
              "
            >

              <span
                className="
                  h-1.5
                  w-1.5
                  animate-pulse
                  rounded-full
                  bg-emerald-400
                "
              />

              <span
                className="
                  text-[9px]
                  font-semibold
                  text-emerald-400
                "
              >
                LIVE
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================
          SEARCH
          ===================================== */}

      <div
        className="
          absolute
          right-5
          top-5
          z-[1000]
          w-[310px]
        "
      >

        <div
          className="relative"
        >

          <Search
            size={17}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-slate-500
            "
          />

          <input
            value={search}

            onChange={(event) =>
              setSearch(
                event.target.value,
              )
            }

            placeholder="
              Search vehicle, plate, road...
            "

            className="
              w-full
              rounded-xl
              border
              border-white/[0.08]
              bg-[#07111e]/95
              py-3
              pl-10
              pr-4
              text-xs
              text-white
              outline-none
              backdrop-blur-xl
              placeholder:text-slate-600
              focus:border-cyan-400/40
            "
          />

        </div>


        {/* SEARCH RESULTS */}

        {search && (
          <div
            className="
              mt-2
              max-h-[260px]
              overflow-auto
              rounded-xl
              border
              border-white/[0.08]
              bg-[#07111e]/95
              p-2
              backdrop-blur-xl
            "
          >

            {filteredVehicles.length ===
            0 ? (

              <p
                className="
                  p-3
                  text-xs
                  text-slate-500
                "
              >
                No vehicles found.
              </p>

            ) : (

              filteredVehicles.map(
                (vehicle) => (

                  <button
                    key={vehicle.id}

                    onClick={() => {
                      setSelectedVehicle(
                        vehicle,
                      );

                      setSearch(
                        vehicle.numberPlate,
                      );
                    }}

                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-lg
                      p-2
                      text-left
                      transition
                      hover:bg-cyan-400/10
                    "
                  >

                    <Car
                      size={15}
                      className="
                        text-cyan-400
                      "
                    />

                    <div>

                      <p
                        className="
                          text-xs
                          text-white
                        "
                      >
                        {vehicle.numberPlate}
                      </p>

                      <p
                        className="
                          text-[10px]
                          text-slate-500
                        "
                      >
                        {vehicle.road}
                        {" · "}
                        {vehicle.zone}
                      </p>

                    </div>

                  </button>

                ),
              )

            )}

          </div>
        )}

      </div>


      {/* =====================================
          VEHICLE COUNT
          ===================================== */}

      <div
        className="
          absolute
          bottom-5
          left-5
          z-[1000]
        "
      >

        <div
          className="
            flex
            items-center
            gap-4
            rounded-xl
            border
            border-white/[0.08]
            bg-[#07111e]/90
            px-4
            py-3
            backdrop-blur-xl
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <Car
              size={16}
              className="
                text-cyan-400
              "
            />

            <span
              className="
                text-xs
                text-slate-400
              "
            >
              Vehicles
            </span>

            <span
              className="
                text-sm
                font-bold
                text-white
              "
            >
              {vehicles.length}
            </span>

          </div>


          <div
            className="
              h-4
              w-px
              bg-white/10
            "
          />


          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <TrafficCone
              size={16}
              className="
                text-amber-400
              "
            />

            <span
              className="
                text-xs
                text-slate-400
              "
            >
              Traffic
            </span>

            <span
              className="
                text-xs
                font-medium
                text-amber-400
              "
            >
              Moderate
            </span>

          </div>

        </div>

      </div>


      {/* =====================================
          MAP CONTROLS
          ===================================== */}

      <div
        className="
          absolute
          bottom-5
          right-5
          z-[1000]
          flex
          flex-col
          gap-2
        "
      >

        <button
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-white/[0.08]
            bg-[#07111e]/95
            text-slate-300
            backdrop-blur-xl
            transition
            hover:border-cyan-400/30
            hover:text-cyan-400
          "
          title="Layers"
        >

          <Layers3 size={17} />

        </button>


        <button
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-white/[0.08]
            bg-[#07111e]/95
            text-slate-300
            backdrop-blur-xl
            transition
            hover:border-cyan-400/30
            hover:text-cyan-400
          "
          title="Locate"
        >

          <LocateFixed size={17} />

        </button>


        <button
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-white/[0.08]
            bg-[#07111e]/95
            text-slate-300
            backdrop-blur-xl
            transition
            hover:border-cyan-400/30
            hover:text-cyan-400
          "
          title="Zoom in"
        >

          <Plus size={17} />

        </button>


        <button
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-white/[0.08]
            bg-[#07111e]/95
            text-slate-300
            backdrop-blur-xl
            transition
            hover:border-cyan-400/30
            hover:text-cyan-400
          "
          title="Zoom out"
        >

          <Minus size={17} />

        </button>

      </div>


      {/* =====================================
          SELECTED VEHICLE PANEL
          ===================================== */}

      {selectedVehicle && (

        <div
          className="
            absolute
            bottom-5
            right-[75px]
            z-[1000]
            w-[310px]
            rounded-2xl
            border
            border-cyan-400/20
            bg-[#07111e]/95
            p-4
            shadow-2xl
            backdrop-blur-xl
          "
        >

          <div
            className="
              mb-4
              flex
              items-start
              justify-between
            "
          >

            <div>

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-cyan-400
                "
              >
                Vehicle Selected
              </p>

              <h3
                className="
                  mt-1
                  text-lg
                  font-bold
                  text-white
                "
              >
                {selectedVehicle.numberPlate}
              </h3>

            </div>


            <button
              onClick={() =>
                setSelectedVehicle(null)
              }

              className="
                rounded-lg
                p-1.5
                text-slate-500
                transition
                hover:bg-white/5
                hover:text-white
              "
            >

              <X size={16} />

            </button>

          </div>


          <div
            className="
              grid
              grid-cols-2
              gap-2
            "
          >

            <div
              className="
                rounded-lg
                bg-white/[0.03]
                p-2.5
              "
            >

              <p
                className="
                  text-[9px]
                  text-slate-600
                "
              >
                Vehicle ID
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-300
                "
              >
                {selectedVehicle.id}
              </p>

            </div>


            <div
              className="
                rounded-lg
                bg-white/[0.03]
                p-2.5
              "
            >

              <p
                className="
                  text-[9px]
                  text-slate-600
                "
              >
                Vehicle Type
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-300
                "
              >
                {selectedVehicle.type}
              </p>

            </div>


            <div
              className="
                rounded-lg
                bg-white/[0.03]
                p-2.5
              "
            >

              <p
                className="
                  text-[9px]
                  text-slate-600
                "
              >
                Speed
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-300
                "
              >
                {selectedVehicle.speed}
                {" km/h"}
              </p>

            </div>


            <div
              className="
                rounded-lg
                bg-white/[0.03]
                p-2.5
              "
            >

              <p
                className="
                  text-[9px]
                  text-slate-600
                "
              >
                Direction
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-300
                "
              >
                {selectedVehicle.direction}
              </p>

            </div>


            <div
              className="
                rounded-lg
                bg-white/[0.03]
                p-2.5
              "
            >

              <p
                className="
                  text-[9px]
                  text-slate-600
                "
              >
                Road
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-300
                "
              >
                {selectedVehicle.road}
              </p>

            </div>


            <div
              className="
                rounded-lg
                bg-white/[0.03]
                p-2.5
              "
            >

              <p
                className="
                  text-[9px]
                  text-slate-600
                "
              >
                Zone
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-300
                "
              >
                {selectedVehicle.zone}
              </p>

            </div>

          </div>


          <div
            className="
              mt-3
              flex
              items-center
              justify-between
              rounded-lg
              border
              border-emerald-400/10
              bg-emerald-400/5
              px-3
              py-2
            "
          >

            <span
              className="
                text-[10px]
                text-slate-500
              "
            >
              Status
            </span>

            <span
              className="
                flex
                items-center
                gap-1.5
                text-[10px]
                font-medium
                text-emerald-400
              "
            >

              <span
                className="
                  h-1.5
                  w-1.5
                  animate-pulse
                  rounded-full
                  bg-emerald-400
                "
              />

              {selectedVehicle.status}

            </span>

          </div>

        </div>

      )}

    </div>
  );
}