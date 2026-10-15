import {
  Activity,
  ArrowLeft,
  CarFront,
  CircleGauge,
  Compass,
  MapPin,
  Navigation,
  Radio,
  Route,
  Signal,
  Timer,
  Database,
  Gauge,
} from "lucide-react";

import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useVehicleSimulation } from "../hooks/useVehicleSimulation";

export default function VehicleDetails() {
  const { vehicleId } = useParams<{
    vehicleId: string;
  }>();

  const navigate = useNavigate();

  const {
    vehicles,
    loading,
    error,
    selectVehicle,
    clearVehicleSelection,
  } = useVehicleSimulation();

  /* =========================================================
     FIND SELECTED VEHICLE
  ========================================================= */

  const vehicle = useMemo(() => {
    if (!vehicleId) {
      return undefined;
    }

    return vehicles.find(
      (item) =>
        String(item.id).toLowerCase() ===
        String(vehicleId).toLowerCase(),
    );
  }, [vehicles, vehicleId]);

  /* =========================================================
     SELECT VEHICLE
  ========================================================= */

  useEffect(() => {
    if (vehicleId) {
      selectVehicle(vehicleId);
    }

    return () => {
      clearVehicleSelection();
    };
  }, [
    vehicleId,
    selectVehicle,
    clearVehicleSelection,
  ]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading && !vehicle) {
    return (
      <div className="metropolis-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">
              Vehicle Details
            </h1>

            <p className="page-subtitle">
              Loading vehicle information from the
              METROPOLIS vehicle intelligence engine...
            </p>
          </div>

          <div className="live-pill">
            <span className="live-dot" />
            VEHICLE INTELLIGENCE
          </div>
        </div>

        <section className="panel">
          <div
            style={{
              padding: 60,
              textAlign: "center",
            }}
          >
            <Activity
              size={40}
              style={{
                opacity: 0.55,
                marginBottom: 14,
                animation: "pulse 1.5s infinite",
              }}
            />

            <h2
              style={{
                fontSize: 18,
                marginBottom: 8,
              }}
            >
              Loading vehicle
            </h2>

            <p
              className="muted"
              style={{
                fontSize: 12,
              }}
            >
              Fetching live simulated vehicle data...
            </p>
          </div>
        </section>
      </div>
    );
  }

  /* =========================================================
     VEHICLE NOT FOUND
  ========================================================= */

  if (!vehicle) {
    return (
      <div className="metropolis-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">
              Vehicle Not Found
            </h1>

            <p className="page-subtitle">
              The requested vehicle could not be
              found in the METROPOLIS digital twin.
            </p>
          </div>

          <div className="live-pill">
            <span className="live-dot" />
            VEHICLE INTELLIGENCE
          </div>
        </div>

        <section className="panel">
          <div
            style={{
              padding: 50,
              textAlign: "center",
            }}
          >
            <CarFront
              size={42}
              style={{
                marginBottom: 14,
                opacity: 0.45,
              }}
            />

            <h2
              style={{
                fontSize: 18,
                marginBottom: 8,
              }}
            >
              Vehicle unavailable
            </h2>

            <p
              className="muted"
              style={{
                fontSize: 12,
                marginBottom: 8,
              }}
            >
              Vehicle ID{" "}
              <strong>
                {vehicleId || "N/A"}
              </strong>{" "}
              is not currently available.
            </p>

            {error && (
              <p
                style={{
                  color: "#e5b45b",
                  fontSize: 11,
                  marginBottom: 20,
                }}
              >
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={() => navigate("/vehicles")}
              style={backButton}
            >
              <ArrowLeft size={15} />
              Back to Vehicles
            </button>
          </div>
        </section>
      </div>
    );
  }

  /* =========================================================
     STATUS
  ========================================================= */

  const isMoving =
    vehicle.status?.toLowerCase() ===
    "moving";

  const statusClass = isMoving
    ? "status-low"
    : "status-medium";

  /* =========================================================
     VEHICLE TYPE
  ========================================================= */

  const vehicleType =
    String(vehicle.type || "car")
      .charAt(0)
      .toUpperCase() +
    String(vehicle.type || "car").slice(1);

  /* =========================================================
     LOCATION
  ========================================================= */

  const latitude = Number(
    vehicle.latitude,
  ).toFixed(6);

  const longitude = Number(
    vehicle.longitude,
  ).toFixed(6);

  /* =========================================================
     TRAFFIC LEVEL
  ========================================================= */

  const trafficLevel =
    vehicle.status?.toLowerCase() ===
    "stopped"
      ? "High"
      : vehicle.speed < 20
        ? "Moderate"
        : "Low";

  const trafficClass =
    trafficLevel === "High"
      ? "status-high"
      : trafficLevel === "Moderate"
        ? "status-medium"
        : "status-low";

  /* =========================================================
     SPEED BAND
  ========================================================= */

  const speedBand =
    vehicle.speed < 20
      ? "Low"
      : vehicle.speed < 50
        ? "Normal"
        : "High";

  const speedBandClass =
    speedBand === "High"
      ? "status-high"
      : speedBand === "Normal"
        ? "status-low"
        : "status-medium";

  /* =========================================================
     MAIN PAGE
  ========================================================= */

  return (
    <div className="metropolis-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="page-header">
        <div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <button
              type="button"
              onClick={() =>
                navigate("/vehicles")
              }
              style={iconBackButton}
              aria-label="Back to vehicles"
            >
              <ArrowLeft size={16} />
            </button>

            <span
              className="muted"
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: ".08em",
              }}
            >
              Vehicle Registry
            </span>
          </div>

          <h1 className="page-title">
            {vehicle.id}
          </h1>

          <p className="page-subtitle">
            Detailed live information for the
            selected simulated vehicle
          </p>

        </div>

        <div className="live-pill">
          <span className="live-dot" />
          LIVE VEHICLE
        </div>
      </div>

      {/* =====================================================
          VEHICLE IDENTITY
      ===================================================== */}

      <section
        className="panel"
        style={{
          marginBottom: 18,
        }}
      >
        <div
          style={{
            padding: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
          }}
        >

          {/* VEHICLE BASIC INFO */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 15,
            }}
          >

            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "rgba(20,190,235,.08)",
                border:
                  "1px solid rgba(20,190,235,.10)",
              }}
            >
              <CarFront size={27} />
            </div>

            <div>

              <div
                className="muted"
                style={{
                  fontSize: 9,
                  textTransform: "uppercase",
                  letterSpacing: ".08em",
                }}
              >
                Vehicle ID
              </div>

              <h2
                style={{
                  marginTop: 4,
                  fontSize: 20,
                  fontWeight: 750,
                }}
              >
                {vehicle.id}
              </h2>

              <div
                className="muted"
                style={{
                  marginTop: 4,
                  fontSize: 11,
                }}
              >
                {vehicle.model ||
                  "Simulated Vehicle"}
              </div>

            </div>
          </div>

          {/* STATUS */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >

            <span
              className={`status ${statusClass}`}
            >
              {vehicle.status}
            </span>

            <span
              className={`status ${trafficClass}`}
            >
              Traffic: {trafficLevel}
            </span>

            <span className="status status-medium">
              {vehicleType}
            </span>

            <span className="status status-medium">
              {vehicle.zone}
            </span>

          </div>
        </div>
      </section>

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <div className="grid-4">

        <VehicleMetric
          icon={
            <CircleGauge size={21} />
          }
          label="Current Speed"
          value={`${vehicle.speed} km/h`}
          description={
            isMoving
              ? "Vehicle in motion"
              : "Vehicle stopped"
          }
        />

        <VehicleMetric
          icon={
            <Compass size={21} />
          }
          label="Direction"
          value={
            vehicle.direction ||
            "N/A"
          }
          description="Current travel direction"
        />

        <VehicleMetric
          icon={
            <Route size={21} />
          }
          label="Road"
          value={
            vehicle.road ||
            "N/A"
          }
          description="Current road segment"
        />

        <VehicleMetric
          icon={
            <MapPin size={21} />
          }
          label="Zone"
          value={
            vehicle.zone ||
            "N/A"
          }
          description="Current monitored zone"
        />

      </div>

      {/* =====================================================
          MAIN INFORMATION
      ===================================================== */}

      <div
        className="grid-2"
        style={{
          marginTop: 18,
          alignItems: "start",
        }}
      >

        {/* ===================================================
            VEHICLE INFORMATION
        =================================================== */}

        <section className="panel">

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
                Registered simulated vehicle
                information
              </p>
            </div>

            <CarFront size={18} />

          </div>

          <div
            style={{
              padding: 18,
            }}
          >

            <DetailRow
              icon={
                <CarFront size={15} />
              }
              label="Vehicle ID"
              value={vehicle.id}
            />

            <DetailRow
              icon={
                <Radio size={15} />
              }
              label="Vehicle Type"
              value={vehicleType}
            />

            <DetailRow
              icon={
                <CarFront size={15} />
              }
              label="Model"
              value={
                vehicle.model ||
                "Simulated Vehicle"
              }
            />

            <DetailRow
              icon={
                <Signal size={15} />
              }
              label="Plate Number"
              value={
                vehicle.plate ||
                "N/A"
              }
              monospace
            />

            <DetailRow
              icon={
                <Navigation size={15} />
              }
              label="Direction"
              value={
                vehicle.direction ||
                "N/A"
              }
            />

            <DetailRow
              icon={
                <Activity size={15} />
              }
              label="Status"
              value={
                vehicle.status ||
                "Unknown"
              }
              status
              statusClass={
                statusClass
              }
            />

          </div>
        </section>

        {/* ===================================================
            LIVE LOCATION
        =================================================== */}

        <section className="panel">

          <div className="panel-header">

            <div>
              <h3 className="panel-title">
                Live Location
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Current digital twin position
              </p>
            </div>

            <MapPin size={18} />

          </div>

          <div
            style={{
              padding: 18,
            }}
          >

            <DetailRow
              icon={
                <Route size={15} />
              }
              label="Road"
              value={
                vehicle.road ||
                "Main Road"
              }
            />

            <DetailRow
              icon={
                <MapPin size={15} />
              }
              label="Zone"
              value={
                vehicle.zone ||
                "Zone A"
              }
            />

            <DetailRow
              icon={
                <Navigation size={15} />
              }
              label="Latitude"
              value={latitude}
              monospace
            />

            <DetailRow
              icon={
                <Navigation size={15} />
              }
              label="Longitude"
              value={longitude}
              monospace
            />

            <DetailRow
              icon={
                <Timer size={15} />
              }
              label="Last Updated"
              value={
                vehicle.lastUpdated ||
                "Just now"
              }
            />

          </div>
        </section>

      </div>

      {/* =====================================================
          LIVE TELEMETRY
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
              Live Telemetry
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Continuously updated simulated
              vehicle telemetry
            </p>
          </div>

          <Activity size={18} />

        </div>

        <div
          style={{
            padding: 18,
            display: "grid",
            gridTemplateColumns:
              "repeat(4, 1fr)",
            gap: 12,
          }}
        >

          <TelemetryCard
            label="Speed"
            value={String(
              vehicle.speed,
            )}
            unit="km/h"
            icon={
              <CircleGauge size={16} />
            }
          />

          <TelemetryCard
            label="Latitude"
            value={latitude}
            unit=""
            icon={
              <MapPin size={16} />
            }
          />

          <TelemetryCard
            label="Longitude"
            value={longitude}
            unit=""
            icon={
              <MapPin size={16} />
            }
          />

          <TelemetryCard
            label="Route Index"
            value={String(
              vehicle.routeIndex,
            )}
            unit=""
            icon={
              <Route size={16} />
            }
          />

        </div>
      </section>

      {/* =====================================================
          VEHICLE TRAFFIC ANALYSIS
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
              Vehicle Traffic Analysis
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Current traffic interpretation for
              this vehicle
            </p>
          </div>

          <Gauge size={18} />

        </div>

        <div
          style={{
            padding: 18,
            display: "grid",
            gridTemplateColumns:
              "repeat(3, 1fr)",
            gap: 12,
          }}
        >

          <AnalysisCard
            label="Traffic Level"
            value={trafficLevel}
            className={trafficClass}
          />

          <AnalysisCard
            label="Movement"
            value={
              isMoving
                ? "Active"
                : "Stopped"
            }
            className={
              isMoving
                ? "status-low"
                : "status-medium"
            }
          />

          <AnalysisCard
            label="Speed Band"
            value={speedBand}
            className={
              speedBandClass
            }
          />

        </div>
      </section>

      {/* =====================================================
          DATA SOURCE
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
              Vehicle Data Source
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Current METROPOLIS data pipeline
            </p>
          </div>

          <Database size={18} />

        </div>

        <div
          style={{
            padding: 18,
          }}
        >

          <SystemRow
            icon={
              <Database size={16} />
            }
            title="Vehicle Data Stream"
            value={
              error
                ? "Fallback"
                : "Connected"
            }
          />

          <SystemRow
            icon={
              <Navigation size={16} />
            }
            title="Position Engine"
            value="Active"
          />

          <SystemRow
            icon={
              <Activity size={16} />
            }
            title="Simulation Engine"
            value="Running"
          />

          <SystemRow
            icon={
              <Radio size={16} />
            }
            title="Tracking Status"
            value="Live"
          />

        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 14,
          paddingBottom: 20,
          color: "#64808d",
          fontSize: 10,
        }}
      >
        <Activity size={13} />

        METROPOLIS vehicle intelligence engine
        continuously updates the selected
        vehicle's simulated position and status.
      </div>

    </div>
  );
}

/* =========================================================
   VEHICLE METRIC
========================================================= */

function VehicleMetric({
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

      <div
        className="kpi-value"
        style={{
          fontSize:
            value.length > 16
              ? 17
              : undefined,
        }}
      >
        {value}
      </div>

      <div className="kpi-change">
        {description}
      </div>

    </div>
  );
}

/* =========================================================
   DETAIL ROW
========================================================= */

function DetailRow({
  icon,
  label,
  value,
  monospace = false,
  status = false,
  statusClass = "status-low",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  monospace?: boolean;
  status?: boolean;
  statusClass?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "13px 0",
        borderBottom:
          "1px solid rgba(100,160,190,.07)",
      }}
    >

      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "rgba(100,160,190,.045)",
          color: "#78929e",
          flexShrink: 0,
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
          className="muted"
          style={{
            fontSize: 9,
          }}
        >
          {label}
        </div>

        {status ? (
          <div
            style={{
              marginTop: 5,
            }}
          >
            <span
              className={`status ${statusClass}`}
            >
              {value}
            </span>
          </div>
        ) : (
          <div
            style={{
              marginTop: 4,
              fontSize: 11,
              fontWeight: 650,
              fontFamily:
                monospace
                  ? "monospace"
                  : undefined,
            }}
          >
            {value}
          </div>
        )}

      </div>

    </div>
  );
}

/* =========================================================
   TELEMETRY CARD
========================================================= */

function TelemetryCard({
  icon,
  label,
  value,
  unit,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div
      style={{
        padding: 14,
        borderRadius: 8,
        background:
          "rgba(100,160,190,.035)",
        border:
          "1px solid rgba(100,160,190,.07)",
      }}
    >

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          color: "#64808d",
          fontSize: 9,
          textTransform: "uppercase",
          letterSpacing: ".06em",
        }}
      >
        {icon}
        {label}
      </div>

      <div
        style={{
          marginTop: 9,
          fontSize: 16,
          fontWeight: 750,
        }}
      >
        {value}

        {unit && (
          <span
            className="muted"
            style={{
              fontSize: 9,
              marginLeft: 5,
              fontWeight: 500,
            }}
          >
            {unit}
          </span>
        )}
      </div>

    </div>
  );
}

/* =========================================================
   ANALYSIS CARD
========================================================= */

function AnalysisCard({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className: string;
}) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 9,
        background:
          "rgba(100,160,190,.035)",
        border:
          "1px solid rgba(100,160,190,.07)",
      }}
    >

      <div
        className="muted"
        style={{
          fontSize: 9,
          textTransform: "uppercase",
          letterSpacing: ".06em",
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: 9,
        }}
      >
        <span
          className={`status ${className}`}
        >
          {value}
        </span>
      </div>

    </div>
  );
}

/* =========================================================
   SYSTEM ROW
========================================================= */

function SystemRow({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 0",
        borderBottom:
          "1px solid rgba(100,160,190,.07)",
      }}
    >

      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "rgba(49,210,154,.07)",
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

      <span className="status status-low">
        {value}
      </span>

    </div>
  );
}

/* =========================================================
   BUTTON STYLES
========================================================= */

const backButton: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  border:
    "1px solid rgba(20,190,235,.20)",
  background:
    "rgba(20,190,235,.07)",
  color: "#d8f8ff",
  borderRadius: 7,
  padding: "9px 15px",
  fontSize: 10,
  fontWeight: 650,
  cursor: "pointer",
};

const iconBackButton: React.CSSProperties = {
  width: 32,
  height: 32,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border:
    "1px solid rgba(100,160,190,.10)",
  background:
    "rgba(100,160,190,.035)",
  color: "#9ab4be",
  borderRadius: 7,
  cursor: "pointer",
};