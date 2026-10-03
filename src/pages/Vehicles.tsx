import {
  Bike,
  BusFront,
  CarFront,
  Gauge,
  MapPin,
  Navigation,
  Radio,
  Search,
  SquareActivity,
  Truck,
} from "lucide-react";
import { useMemo, useState } from "react";

import { useVehicleSimulation } from "../hooks/useVehicleSimulation";

export default function Vehicles() {
  const {
    vehicles,
    selectedVehicleId,
    selectVehicle,
    clearVehicleSelection,
  } = useVehicleSimulation();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] =
    useState("All");
  const [zoneFilter, setZoneFilter] =
    useState("All");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const selectedVehicle = vehicles.find(
    (vehicle) =>
      vehicle.id === selectedVehicleId,
  );

  /* =====================================================
     FILTER VEHICLES
  ====================================================== */

  const filteredVehicles = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return vehicles.filter((vehicle) => {
      const matchesSearch =
        !query ||
        [
          vehicle.id,
          vehicle.plate,
          vehicle.type,
          vehicle.model,
          vehicle.road,
          vehicle.zone,
          vehicle.direction,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesType =
        typeFilter === "All" ||
        vehicle.type ===
          typeFilter.toLowerCase();

      const matchesZone =
        zoneFilter === "All" ||
        vehicle.zone === zoneFilter;

      const matchesStatus =
        statusFilter === "All" ||
        vehicle.status === statusFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesZone &&
        matchesStatus
      );
    });
  }, [
    vehicles,
    search,
    typeFilter,
    zoneFilter,
    statusFilter,
  ]);

  /* =====================================================
     KPI DATA
  ====================================================== */

  const totalVehicles =
    vehicles.length;

  const movingVehicles =
    vehicles.filter(
      (vehicle) =>
        vehicle.status === "Moving",
    ).length;

  const stoppedVehicles =
    vehicles.filter(
      (vehicle) =>
        vehicle.status === "Stopped",
    ).length;

  const averageSpeed =
    vehicles.length > 0
      ? Math.round(
          vehicles.reduce(
            (total, vehicle) =>
              total + vehicle.speed,
            0,
          ) / vehicles.length,
        )
      : 0;

  const carCount =
    vehicles.filter(
      (vehicle) =>
        vehicle.type === "car",
    ).length;

  const busCount =
    vehicles.filter(
      (vehicle) =>
        vehicle.type === "bus",
    ).length;

  const bikeCount =
    vehicles.filter(
      (vehicle) =>
        vehicle.type === "bike",
    ).length;

  const zones = Array.from(
    new Set(
      vehicles.map(
        (vehicle) => vehicle.zone,
      ),
    ),
  );

  /* =====================================================
     PAGE
  ====================================================== */

  return (
    <div className="metropolis-page">
      {/* =================================================
          HEADER
      ================================================== */}

      <div className="page-header">
        <div>
          <h1 className="page-title">
            Vehicle Operations
          </h1>

          <p className="page-subtitle">
            Real-time simulated vehicle tracking and information
            management
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />
          VEHICLE ENGINE LIVE
        </div>
      </div>

      {/* =================================================
          KPI CARDS
      ================================================== */}

      <div className="grid-4">
        <VehicleKpi
          icon={<CarFront size={21} />}
          label="Total Vehicles"
          value={totalVehicles.toString()}
          detail="Simulated fleet"
        />

        <VehicleKpi
          icon={<Radio size={21} />}
          label="Moving"
          value={movingVehicles.toString()}
          detail="Currently active"
        />

        <VehicleKpi
          icon={<SquareActivity size={21} />}
          label="Stopped"
          value={stoppedVehicles.toString()}
          detail="Stationary vehicles"
        />

        <VehicleKpi
          icon={<Gauge size={21} />}
          label="Average Speed"
          value={`${averageSpeed} km/h`}
          detail="Fleet average"
        />
      </div>

      {/* =================================================
          VEHICLE TYPE SUMMARY
      ================================================== */}

      <div
        className="grid-3"
        style={{
          marginTop: 18,
        }}
      >
        <TypeSummary
          icon={<CarFront size={20} />}
          label="Cars"
          count={carCount}
          total={totalVehicles}
        />

        <TypeSummary
          icon={<BusFront size={20} />}
          label="Buses"
          count={busCount}
          total={totalVehicles}
        />

        <TypeSummary
          icon={<Bike size={20} />}
          label="Bikes"
          count={bikeCount}
          total={totalVehicles}
        />
      </div>

      {/* =================================================
          SEARCH AND FILTERS
      ================================================== */}

      <section
        className="panel"
        style={{
          marginTop: 18,
        }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Vehicle Search & Filters
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 11,
              }}
            >
              Search by vehicle ID, number plate, road,
              zone or vehicle type
            </p>
          </div>

          <Search size={18} />
        </div>

        <div
          style={{
            padding: 16,
            display: "grid",
            gridTemplateColumns:
              "minmax(240px, 1.8fr) repeat(3, minmax(130px, 1fr))",
            gap: 10,
          }}
        >
          {/* SEARCH */}

          <div
            style={{
              position: "relative",
            }}
          >
            <Search
              size={15}
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform:
                  "translateY(-50%)",
                opacity: 0.55,
              }}
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search vehicle ID or plate..."
              style={inputStyle}
            />
          </div>

          {/* TYPE */}

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(
                event.target.value,
              )
            }
            style={selectStyle}
          >
            <option value="All">
              All Types
            </option>

            <option value="Car">
              Cars
            </option>

            <option value="Bus">
              Buses
            </option>

            <option value="Bike">
              Bikes
            </option>
          </select>

          {/* ZONE */}

          <select
            value={zoneFilter}
            onChange={(event) =>
              setZoneFilter(
                event.target.value,
              )
            }
            style={selectStyle}
          >
            <option value="All">
              All Zones
            </option>

            {zones.map((zone) => (
              <option
                key={zone}
                value={zone}
              >
                {zone}
              </option>
            ))}
          </select>

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value,
              )
            }
            style={selectStyle}
          >
            <option value="All">
              All Status
            </option>

            <option value="Moving">
              Moving
            </option>

            <option value="Stopped">
              Stopped
            </option>
          </select>
        </div>
      </section>

      {/* =================================================
          MAIN VEHICLE AREA
      ================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1fr) 310px",
          gap: 16,
          marginTop: 18,
          alignItems: "start",
        }}
      >
        {/* =================================================
            VEHICLE TABLE
        ================================================== */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Live Vehicle Registry
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 11,
                }}
              >
                {filteredVehicles.length} vehicles
                currently matching the selected filters
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "#31d29a",
                fontSize: 9,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#31d29a",
                  boxShadow:
                    "0 0 8px rgba(49,210,154,.55)",
                }}
              />

              LIVE
            </div>
          </div>

          <div
            style={{
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                minWidth: 780,
                borderCollapse:
                  "collapse",
              }}
            >
              <thead>
                <tr>
                  <TableHeader>
                    Vehicle
                  </TableHeader>

                  <TableHeader>
                    Type
                  </TableHeader>

                  <TableHeader>
                    Location
                  </TableHeader>

                  <TableHeader>
                    Speed
                  </TableHeader>

                  <TableHeader>
                    Direction
                  </TableHeader>

                  <TableHeader>
                    Status
                  </TableHeader>

                  <TableHeader>
                    Action
                  </TableHeader>
                </tr>
              </thead>

              <tbody>
                {filteredVehicles.map(
                  (vehicle) => {
                    const isSelected =
                      vehicle.id ===
                      selectedVehicleId;

                    return (
                      <tr
                        key={
                          vehicle.id
                        }
                        style={{
                          background:
                            isSelected
                              ? "rgba(20,190,235,.045)"
                              : "transparent",
                        }}
                      >
                        {/* VEHICLE */}

                        <td
                          style={
                            tableCell
                          }
                        >
                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: 10,
                            }}
                          >
                            <VehicleTypeIcon
                              type={
                                vehicle.type
                              }
                            />

                            <div>
                              <div
                                style={{
                                  fontWeight: 700,
                                  fontSize: 11,
                                }}
                              >
                                {
                                  vehicle.id
                                }
                              </div>

                              <div
                                className="muted"
                                style={{
                                  marginTop: 3,
                                  fontSize: 9,
                                }}
                              >
                                {
                                  vehicle.plate
                                }
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* TYPE */}

                        <td
                          style={
                            tableCell
                          }
                        >
                          <span
                            style={{
                              textTransform:
                                "capitalize",
                              fontSize: 10,
                            }}
                          >
                            {
                              vehicle.type
                            }
                          </span>
                        </td>

                        {/* LOCATION */}

                        <td
                          style={
                            tableCell
                          }
                        >
                          <div
                            style={{
                              fontSize: 10,
                              fontWeight: 600,
                            }}
                          >
                            {
                              vehicle.road
                            }
                          </div>

                          <div
                            className="muted"
                            style={{
                              marginTop: 3,
                              fontSize: 9,
                            }}
                          >
                            {
                              vehicle.zone
                            }
                          </div>
                        </td>

                        {/* SPEED */}

                        <td
                          style={
                            tableCell
                          }
                        >
                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: 5,
                            }}
                          >
                            <Gauge
                              size={12}
                            />

                            {
                              vehicle.speed
                            }{" "}
                            km/h
                          </div>
                        </td>

                        {/* DIRECTION */}

                        <td
                          style={
                            tableCell
                          }
                        >
                          <div
                            style={{
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: 5,
                            }}
                          >
                            <Navigation
                              size={12}
                            />

                            {
                              vehicle.direction
                            }
                          </div>
                        </td>

                        {/* STATUS */}

                        <td
                          style={
                            tableCell
                          }
                        >
                          <span
                            className={
                              vehicle.status ===
                              "Moving"
                                ? "status status-low"
                                : "status status-medium"
                            }
                          >
                            {
                              vehicle.status
                            }
                          </span>
                        </td>

                        {/* ACTION */}

                        <td
                          style={
                            tableCell
                          }
                        >
                          <button
                            type="button"
                            onClick={() =>
                              selectVehicle(
                                vehicle.id,
                              )
                            }
                            style={{
                              padding:
                                "6px 9px",
                              borderRadius:
                                5,
                              border:
                                isSelected
                                  ? "1px solid rgba(22,201,237,.35)"
                                  : "1px solid rgba(100,160,190,.12)",
                              background:
                                isSelected
                                  ? "rgba(20,190,235,.08)"
                                  : "rgba(5,20,32,.35)",
                              color:
                                isSelected
                                  ? "#5de1ff"
                                  : "#8da9b5",
                              cursor:
                                "pointer",
                              fontSize: 9,
                            }}
                          >
                            {isSelected
                              ? "SELECTED"
                              : "VIEW"}
                          </button>
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>

            {filteredVehicles.length ===
              0 && (
              <div
                style={{
                  padding: 45,
                  textAlign:
                    "center",
                  color: "#66818e",
                  fontSize: 11,
                }}
              >
                No vehicles match your
                search or filters.
              </div>
            )}
          </div>
        </section>

        {/* =================================================
            VEHICLE DETAILS
        ================================================== */}

        <section
          className="panel"
          style={{
            position: "sticky",
            top: 18,
          }}
        >
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Vehicle Information
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 10,
                }}
              >
                Selected vehicle details
              </p>
            </div>

            <MapPin size={18} />
          </div>

          {!selectedVehicle ? (
            <EmptyVehicleState />
          ) : (
            <div
              style={{
                padding: 15,
              }}
            >
              {/* VEHICLE ID */}

              <div
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  gap: 11,
                  paddingBottom: 14,
                  borderBottom:
                    "1px solid rgba(100,160,190,.08)",
                }}
              >
                <VehicleTypeIcon
                  type={
                    selectedVehicle.type
                  }
                  large
                />

                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                    }}
                  >
                    {
                      selectedVehicle.id
                    }
                  </div>

                  <div
                    className="muted"
                    style={{
                      marginTop: 3,
                      fontSize: 10,
                    }}
                  >
                    {
                      selectedVehicle.plate
                    }
                  </div>
                </div>

                <span
                  className={
                    selectedVehicle.status ===
                    "Moving"
                      ? "status status-low"
                      : "status status-medium"
                  }
                >
                  {
                    selectedVehicle.status
                  }
                </span>
              </div>

              {/* DETAILS */}

              <div
                style={{
                  marginTop: 14,
                  display: "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gap: 8,
                }}
              >
                <DetailBox
                  label="Vehicle Type"
                  value={
                    selectedVehicle.type
                  }
                />

                <DetailBox
                  label="Model"
                  value={
                    selectedVehicle.model
                  }
                />

                <DetailBox
                  label="Speed"
                  value={`${selectedVehicle.speed} km/h`}
                />

                <DetailBox
                  label="Direction"
                  value={
                    selectedVehicle.direction
                  }
                />

                <DetailBox
                  label="Road"
                  value={
                    selectedVehicle.road
                  }
                />

                <DetailBox
                  label="Zone"
                  value={
                    selectedVehicle.zone
                  }
                />
              </div>

              {/* POSITION */}

              <div
                style={{
                  marginTop: 10,
                  padding: 11,
                  borderRadius: 7,
                  border:
                    "1px solid rgba(100,160,190,.08)",
                  background:
                    "rgba(5,20,32,.38)",
                }}
              >
                <div
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap: 7,
                    color:
                      "#718b96",
                    fontSize: 9,
                    textTransform:
                      "uppercase",
                    letterSpacing:
                      ".06em",
                  }}
                >
                  <MapPin size={12} />

                  Current Coordinates
                </div>

                <div
                  style={{
                    marginTop: 7,
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {
                    selectedVehicle.position[0]
                  }
                  {" , "}
                  {
                    selectedVehicle.position[1]
                  }
                </div>
              </div>

              {/* SIMULATION STATUS */}

              <div
                style={{
                  marginTop: 10,
                  padding: 11,
                  borderRadius: 7,
                  background:
                    "rgba(49,210,154,.035)",
                  border:
                    "1px solid rgba(49,210,154,.10)",
                }}
              >
                <div
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap: 7,
                    color:
                      "#31d29a",
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >
                  <Radio size={13} />

                  SIMULATION ACTIVE
                </div>

                <div
                  style={{
                    marginTop: 6,
                    color:
                      "#718b96",
                    fontSize: 9,
                    lineHeight:
                      1.5,
                  }}
                >
                  Vehicle position and movement
                  are being updated by the
                  METROPOLIS simulation engine.
                </div>
              </div>

              {/* CLEAR */}

              <button
                type="button"
                onClick={
                  clearVehicleSelection
                }
                style={{
                  width: "100%",
                  marginTop: 12,
                  padding: 9,
                  borderRadius: 6,
                  border:
                    "1px solid rgba(100,160,190,.10)",
                  background:
                    "rgba(5,20,32,.40)",
                  color:
                    "#8da9b5",
                  cursor:
                    "pointer",
                  fontSize: 10,
                }}
              >
                Clear Vehicle Selection
              </button>
            </div>
          )}
        </section>
      </div>

      {/* =================================================
          FOOTER
      ================================================== */}

      <div
        style={{
          display: "flex",
          alignItems:
            "center",
          gap: 7,
          marginTop: 13,
          paddingBottom: 20,
          color: "#607c89",
          fontSize: 10,
        }}
      >
        <Radio size={13} />

        METROPOLIS vehicle intelligence module ·
        simulated real-time data stream active
      </div>
    </div>
  );
}

/* =========================================================
   KPI CARD
========================================================= */

function VehicleKpi({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="panel kpi-card">
      {icon}

      <div
        className="kpi-label"
        style={{
          marginTop: 13,
        }}
      >
        {label}
      </div>

      <div className="kpi-value">
        {value}
      </div>

      <div
        className="kpi-change"
        style={{
          fontSize: 9,
        }}
      >
        {detail}
      </div>
    </div>
  );
}

/* =========================================================
   TYPE SUMMARY
========================================================= */

function TypeSummary({
  icon,
  label,
  count,
  total,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
  total: number;
}) {
  const percentage =
    total > 0
      ? Math.round(
          (count / total) * 100,
        )
      : 0;

  return (
    <div className="panel">
      <div
        style={{
          padding: 15,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems:
              "center",
            gap: 9,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 7,
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "center",
              background:
                "rgba(20,190,235,.06)",
            }}
          >
            {icon}
          </div>

          <div
            style={{
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              {label}
            </div>

            <div
              className="muted"
              style={{
                marginTop: 3,
                fontSize: 9,
              }}
            >
              {percentage}% of fleet
            </div>
          </div>

          <strong
            style={{
              fontSize: 17,
            }}
          >
            {count}
          </strong>
        </div>

        <div
          style={{
            marginTop: 12,
            height: 5,
            borderRadius: 20,
            background:
              "rgba(100,160,190,.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${percentage}%`,
              height: "100%",
              borderRadius: 20,
              background:
                "#16c9ed",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   VEHICLE ICON
========================================================= */

function VehicleTypeIcon({
  type,
  large = false,
}: {
  type: string;
  large?: boolean;
}) {
  const size = large ? 23 : 16;

  if (type === "bus") {
    return (
      <div
        style={vehicleIconStyle}
      >
        <BusFront size={size} />
      </div>
    );
  }

  if (type === "bike") {
    return (
      <div
        style={vehicleIconStyle}
      >
        <Bike size={size} />
      </div>
    );
  }

  if (type === "truck") {
    return (
      <div
        style={vehicleIconStyle}
      >
        <Truck size={size} />
      </div>
    );
  }

  return (
    <div
      style={vehicleIconStyle}
    >
      <CarFront size={size} />
    </div>
  );
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
        padding: 9,
        borderRadius: 6,
        background:
          "rgba(5,20,32,.42)",
        border:
          "1px solid rgba(100,160,190,.06)",
      }}
    >
      <div
        style={{
          color: "#617b87",
          fontSize: 8,
          textTransform:
            "uppercase",
          letterSpacing:
            ".04em",
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: 5,
          fontSize: 10,
          fontWeight: 600,
          textTransform:
            label ===
            "Vehicle Type"
              ? "capitalize"
              : "none",
          overflow: "hidden",
          textOverflow:
            "ellipsis",
          whiteSpace:
            "nowrap",
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY VEHICLE STATE
========================================================= */

function EmptyVehicleState() {
  return (
    <div
      style={{
        padding: 30,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          margin: "0 auto",
          borderRadius: 10,
          display: "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          background:
            "rgba(20,190,235,.05)",
          border:
            "1px solid rgba(20,190,235,.10)",
        }}
      >
        <MapPin
          size={22}
          style={{
            opacity: 0.7,
          }}
        />
      </div>

      <div
        style={{
          marginTop: 14,
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        No Vehicle Selected
      </div>

      <div
        className="muted"
        style={{
          marginTop: 6,
          fontSize: 10,
          lineHeight: 1.6,
        }}
      >
        Select a vehicle from the registry
        to view its live simulated information.
      </div>
    </div>
  );
}

/* =========================================================
   TABLE HEADER
========================================================= */

function TableHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th
      style={{
        padding:
          "12px 14px",
        textAlign: "left",
        color: "#688493",
        fontSize: 9,
        fontWeight: 600,
        textTransform:
          "uppercase",
        letterSpacing:
          ".06em",
        borderBottom:
          "1px solid rgba(100,160,190,.08)",
      }}
    >
      {children}
    </th>
  );
}

/* =========================================================
   STYLES
========================================================= */

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding:
    "10px 10px 10px 34px",
  borderRadius: 7,
  border:
    "1px solid rgba(80,170,205,.14)",
  background: "#061521",
  color: "#e8f8ff",
  outline: "none",
  fontSize: 11,
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding:
    "10px 10px",
  borderRadius: 7,
  border:
    "1px solid rgba(80,170,205,.14)",
  background: "#061521",
  color: "#c8e0e8",
  outline: "none",
  fontSize: 10,
  cursor: "pointer",
};

const tableCell: React.CSSProperties = {
  padding:
    "13px 14px",
  borderBottom:
    "1px solid rgba(100,160,190,.06)",
  fontSize: 10,
  verticalAlign:
    "middle",
};

const vehicleIconStyle: React.CSSProperties = {
  width: 31,
  height: 31,
  flexShrink: 0,
  borderRadius: 7,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "rgba(20,190,235,.06)",
  color: "#55dfff",
  border:
    "1px solid rgba(20,190,235,.10)",
};