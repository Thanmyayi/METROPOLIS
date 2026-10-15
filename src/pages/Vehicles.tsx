import {
  Activity,
  CarFront,
  CircleGauge,
  MapPin,
  Navigation,
  Radio,
  Search,
  Signal,
  Square,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useVehicleSimulation } from "../hooks/useVehicleSimulation";

export default function Vehicles() {
  const navigate = useNavigate();

  const { vehicles } =
    useVehicleSimulation();

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<
      "All" | "Moving" | "Stopped"
    >("All");

  /* =========================================================
     FILTERED VEHICLES
  ========================================================= */

  const filteredVehicles = useMemo(() => {
    const query =
      search
        .trim()
        .toLowerCase();

    return vehicles.filter(
      (vehicle) => {
        const matchesSearch =
          query === "" ||
          vehicle.id
            .toLowerCase()
            .includes(query) ||
          vehicle.plate
            .toLowerCase()
            .includes(query) ||
          vehicle.type
            .toLowerCase()
            .includes(query) ||
          vehicle.road
            .toLowerCase()
            .includes(query) ||
          vehicle.zone
            .toLowerCase()
            .includes(query);

        const matchesStatus =
          statusFilter === "All" ||
          vehicle.status ===
            statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      },
    );
  }, [
    vehicles,
    search,
    statusFilter,
  ]);

  /* =========================================================
     FLEET STATISTICS
  ========================================================= */

  const movingVehicles =
    vehicles.filter(
      (vehicle) =>
        vehicle.status ===
        "Moving",
    ).length;

  const stoppedVehicles =
    vehicles.filter(
      (vehicle) =>
        vehicle.status ===
        "Stopped",
    ).length;

  const averageSpeed =
    vehicles.length === 0
      ? 0
      : Math.round(
          vehicles.reduce(
            (
              total,
              vehicle,
            ) =>
              total +
              vehicle.speed,
            0,
          ) /
            vehicles.length,
        );

  /* =========================================================
     OPEN VEHICLE DETAILS
  ========================================================= */

  const openVehicleDetails = (
    vehicleId: string,
  ) => {
    navigate(
      `/vehicles/${encodeURIComponent(
        vehicleId,
      )}`,
    );
  };

  return (
    <div className="metropolis-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="page-header">
        <div>
          <h1 className="page-title">
            Vehicle Intelligence
          </h1>

          <p className="page-subtitle">
            Real-time simulated vehicle
            tracking and information
            management
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />

          LIVE TRACKING
        </div>
      </div>

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <div className="grid-4">
        <VehicleCard
          icon={
            <CarFront size={21} />
          }
          label="Total Vehicles"
          value={vehicles.length.toString()}
          description="Currently simulated"
        />

        <VehicleCard
          icon={
            <Navigation
              size={21}
            />
          }
          label="Moving"
          value={movingVehicles.toString()}
          description="Vehicles in motion"
        />

        <VehicleCard
          icon={
            <Square size={21} />
          }
          label="Stopped"
          value={stoppedVehicles.toString()}
          description="Currently stopped"
        />

        <VehicleCard
          icon={
            <CircleGauge
              size={21}
            />
          }
          label="Average Speed"
          value={`${averageSpeed} km/h`}
          description="Current fleet average"
        />
      </div>

      {/* =====================================================
          SEARCH + FILTER
      ===================================================== */}

      <section
        className="panel"
        style={{
          marginTop: 18,
        }}
      >
        <div
          style={{
            padding: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {/* SEARCH */}

          <div
            style={{
              position:
                "relative",
              flex: 1,
              minWidth: 240,
            }}
          >
            <Search
              size={16}
              style={{
                position:
                  "absolute",
                left: 13,
                top: "50%",
                transform:
                  "translateY(-50%)",
                color: "#64808d",
              }}
            />

            <input
              type="text"
              placeholder="Search vehicle ID, plate, road, zone..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target
                    .value,
                )
              }
              style={
                searchInput
              }
            />
          </div>

          {/* FILTER BUTTONS */}

          <div
            style={{
              display:
                "flex",
              gap: 7,
              flexWrap:
                "wrap",
            }}
          >
            <FilterButton
              active={
                statusFilter ===
                "All"
              }
              onClick={() =>
                setStatusFilter(
                  "All",
                )
              }
            >
              All
            </FilterButton>

            <FilterButton
              active={
                statusFilter ===
                "Moving"
              }
              onClick={() =>
                setStatusFilter(
                  "Moving",
                )
              }
            >
              Moving
            </FilterButton>

            <FilterButton
              active={
                statusFilter ===
                "Stopped"
              }
              onClick={() =>
                setStatusFilter(
                  "Stopped",
                )
              }
            >
              Stopped
            </FilterButton>
          </div>
        </div>
      </section>

      {/* =====================================================
          VEHICLE TABLE
      ===================================================== */}

      <section
        className="panel"
        style={{
          marginTop: 18,
        }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Live Vehicle Registry
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              {
                filteredVehicles.length
              }{" "}
              vehicles currently
              matching the selected
              filters
            </p>
          </div>

          <div
            style={{
              display:
                "flex",
              alignItems:
                "center",
              gap: 7,
            }}
          >
            <Signal size={15} />

            <span className="status status-low">
              CONNECTED
            </span>
          </div>
        </div>

        <div
          style={{
            overflowX:
              "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: 1050,
              borderCollapse:
                "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  color:
                    "#688493",
                  fontSize: 10,
                  textTransform:
                    "uppercase",
                  letterSpacing:
                    ".06em",
                }}
              >
                <th
                  style={
                    tableHeader
                  }
                >
                  Vehicle
                </th>

                <th
                  style={
                    tableHeader
                  }
                >
                  Plate
                </th>

                <th
                  style={
                    tableHeader
                  }
                >
                  Type
                </th>

                <th
                  style={
                    tableHeader
                  }
                >
                  Location
                </th>

                <th
                  style={
                    tableHeader
                  }
                >
                  Road
                </th>

                <th
                  style={
                    tableHeader
                  }
                >
                  Zone
                </th>

                <th
                  style={
                    tableHeader
                  }
                >
                  Speed
                </th>

                <th
                  style={
                    tableHeader
                  }
                >
                  Direction
                </th>

                <th
                  style={
                    tableHeader
                  }
                >
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredVehicles.length >
              0 ? (
                filteredVehicles.map(
                  (
                    vehicle,
                  ) => (
                    <tr
                      key={
                        vehicle.id
                      }
                      onClick={() =>
                        openVehicleDetails(
                          vehicle.id,
                        )
                      }
                      style={{
                        cursor:
                          "pointer",
                        transition:
                          "background .2s ease",
                      }}
                      title={`Open details for ${vehicle.id}`}
                    >
                      {/* ===================================
                          VEHICLE
                      =================================== */}

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
                          <div
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: 8,
                              display:
                                "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                              background:
                                "rgba(20,190,235,.07)",
                            }}
                          >
                            <CarFront
                              size={
                                16
                              }
                            />
                          </div>

                          <div>
                            <strong
                              style={{
                                fontSize: 11,
                              }}
                            >
                              {
                                vehicle.id
                              }
                            </strong>

                            <div
                              className="muted"
                              style={{
                                fontSize: 8,
                                marginTop: 3,
                              }}
                            >
                              VIEW
                              DETAILS
                              →
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* ===================================
                          PLATE
                      =================================== */}

                      <td
                        style={
                          tableCell
                        }
                      >
                        <span
                          style={{
                            fontFamily:
                              "monospace",
                            fontSize: 11,
                            fontWeight:
                              600,
                          }}
                        >
                          {
                            vehicle.plate
                          }
                        </span>
                      </td>

                      {/* ===================================
                          TYPE
                      =================================== */}

                      <td
                        style={
                          tableCell
                        }
                      >
                        {
                          vehicle.type
                        }
                      </td>

                      {/* ===================================
                          LOCATION
                      =================================== */}

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
                          <MapPin
                            size={
                              13
                            }
                          />

                          <span>
                            {formatLocation(
                              vehicle,
                            )}
                          </span>
                        </div>
                      </td>

                      {/* ===================================
                          ROAD
                      =================================== */}

                      <td
                        style={
                          tableCell
                        }
                      >
                        {
                          vehicle.road
                        }
                      </td>

                      {/* ===================================
                          ZONE
                      =================================== */}

                      <td
                        style={
                          tableCell
                        }
                      >
                        <span className="status status-medium">
                          {
                            vehicle.zone
                          }
                        </span>
                      </td>

                      {/* ===================================
                          SPEED
                      =================================== */}

                      <td
                        style={
                          tableCell
                        }
                      >
                        <strong>
                          {
                            vehicle.speed
                          }
                        </strong>{" "}
                        km/h
                      </td>

                      {/* ===================================
                          DIRECTION
                      =================================== */}

                      <td
                        style={
                          tableCell
                        }
                      >
                        {
                          vehicle.direction ||
                          "N/A"
                        }
                      </td>

                      {/* ===================================
                          STATUS
                      =================================== */}

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
                    </tr>
                  ),
                )
              ) : (
                <tr>
                  <td
                    colSpan={
                      9
                    }
                    style={{
                      padding:
                        "45px 20px",
                      textAlign:
                        "center",
                      color:
                        "#64808d",
                      fontSize: 12,
                    }}
                  >
                    No vehicles
                    found
                    matching
                    the
                    selected
                    filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* =====================================================
          VEHICLE ACTIVITY SUMMARY
      ===================================================== */}

      <div
        className="grid-2"
        style={{
          marginTop: 18,
          alignItems:
            "start",
        }}
      >
        {/* ================================================
            LIVE ENGINE
        ================================================= */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Vehicle Simulation
                Engine
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Current digital twin
                engine status
              </p>
            </div>

            <Activity size={18} />
          </div>

          <div
            style={{
              padding: 18,
            }}
          >
            <InfoRow
              icon={
                <Radio
                  size={16}
                />
              }
              title="Simulation Engine"
              value="Running"
              good
            />

            <InfoRow
              icon={
                <Signal
                  size={16}
                />
              }
              title="Vehicle Data Stream"
              value="Connected"
              good
            />

            <InfoRow
              icon={
                <Navigation
                  size={16}
                />
              }
              title="Position Updates"
              value="Active"
              good
            />

            <InfoRow
              icon={
                <CarFront
                  size={16}
                />
              }
              title="Tracked Vehicles"
              value={vehicles.length.toString()}
              good
            />
          </div>
        </section>

        {/* ================================================
            FLEET SUMMARY
        ================================================= */}

        <section className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Fleet Summary
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Current vehicle
                distribution
              </p>
            </div>

            <CarFront size={18} />
          </div>

          <div
            style={{
              padding: 18,
            }}
          >
            <SummaryItem
              label="Total Fleet"
              value={
                vehicles.length
              }
            />

            <SummaryItem
              label="Moving Vehicles"
              value={
                movingVehicles
              }
            />

            <SummaryItem
              label="Stopped Vehicles"
              value={
                stoppedVehicles
              }
            />

            <SummaryItem
              label="Average Speed"
              value={`${averageSpeed} km/h`}
            />
          </div>
        </section>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div
        style={{
          display:
            "flex",
          alignItems:
            "center",
          gap: 8,
          marginTop: 14,
          paddingBottom: 20,
          color:
            "#64808d",
          fontSize: 10,
        }}
      >
        <Activity size={13} />

        METROPOLIS vehicle
        intelligence engine
        continuously
        updates simulated
        vehicle positions
        and status.
      </div>
    </div>
  );
}

/* =========================================================
   VEHICLE CARD
========================================================= */

function VehicleCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="panel kpi-card">
      {icon}

      <div
        className="kpi-label"
        style={{
          marginTop: 14,
        }}
      >
        {label}
      </div>

      <div className="kpi-value">
        {value}
      </div>

      <div className="kpi-change">
        {description}
      </div>
    </div>
  );
}

/* =========================================================
   FILTER BUTTON
========================================================= */

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: active
          ? "1px solid rgba(20,190,235,.35)"
          : "1px solid rgba(100,160,190,.10)",
        background: active
          ? "rgba(20,190,235,.09)"
          : "rgba(100,160,190,.035)",
        color: active
          ? "#d8f8ff"
          : "#78929e",
        borderRadius: 7,
        padding:
          "8px 14px",
        fontSize: 10,
        fontWeight: 600,
        cursor:
          "pointer",
      }}
    >
      {children}
    </button>
  );
}

/* =========================================================
   INFO ROW
========================================================= */

function InfoRow({
  icon,
  title,
  value,
  good,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  good: boolean;
}) {
  return (
    <div
      style={{
        display:
          "flex",
        alignItems:
          "center",
        gap: 12,
        padding:
          "12px 0",
        borderBottom:
          "1px solid rgba(100,160,190,.07)",
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
            good
              ? "rgba(49,210,154,.07)"
              : "rgba(239,106,120,.07)",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          flex: 1,
          fontSize: 11,
          fontWeight: 600,
        }}
      >
        {title}
      </div>

      <span
        className={
          good
            ? "status status-low"
            : "status status-medium"
        }
      >
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   SUMMARY ITEM
========================================================= */

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value:
    | string
    | number;
}) {
  return (
    <div
      style={{
        display:
          "flex",
        justifyContent:
          "space-between",
        alignItems:
          "center",
        padding:
          "12px 0",
        borderBottom:
          "1px solid rgba(100,160,190,.07)",
      }}
    >
      <span
        className="muted"
        style={{
          fontSize: 10,
        }}
      >
        {label}
      </span>

      <strong
        style={{
          fontSize: 12,
        }}
      >
        {value}
      </strong>
    </div>
  );
}

/* =========================================================
   LOCATION FORMATTER
========================================================= */

function formatLocation(
  vehicle: any,
) {
  if (
    vehicle.location &&
    typeof vehicle.location ===
      "string"
  ) {
    return vehicle.location;
  }

  if (
    vehicle.latitude !==
      undefined &&
    vehicle.longitude !==
      undefined
  ) {
    return `${Number(
      vehicle.latitude,
    ).toFixed(
      4,
    )}, ${Number(
      vehicle.longitude,
    ).toFixed(
      4,
    )}`;
  }

  return "Digital Twin";
}

/* =========================================================
   TABLE STYLES
========================================================= */

const searchInput: React.CSSProperties =
  {
    width: "100%",
    height: 38,
    boxSizing:
      "border-box",
    border:
      "1px solid rgba(100,160,190,.10)",
    outline: "none",
    borderRadius: 7,
    background:
      "rgba(100,160,190,.035)",
    color: "#d8edf3",
    padding:
      "0 12px 0 38px",
    fontSize: 11,
  };

const tableHeader: React.CSSProperties =
  {
    textAlign:
      "left",
    padding:
      "13px 16px",
    borderBottom:
      "1px solid rgba(100,160,190,.08)",
  };

const tableCell: React.CSSProperties =
  {
    padding:
      "14px 16px",
    borderBottom:
      "1px solid rgba(100,160,190,.06)",
    fontSize: 11,
  };