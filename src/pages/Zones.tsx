import {
  Activity,
  CarFront,
  ChevronRight,
  CircleAlert,
  MapPin,
  Radio,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

type Zone = {
  name: string;
  description: string;
  traffic: "Low" | "Medium" | "High";
  population: number;
  vehicles: number;
  roads: number;
  incidents: number;
  congestion: number;
  avgSpeed: number;
};

const zones: Zone[] = [
  {
    name: "Zone A",
    description: "Central District",
    traffic: "Medium",
    population: 45000,
    vehicles: 5,
    roads: 8,
    incidents: 2,
    congestion: 48,
    avgSpeed: 34,
  },
  {
    name: "Zone B",
    description: "Business Hub",
    traffic: "High",
    population: 32000,
    vehicles: 2,
    roads: 6,
    incidents: 3,
    congestion: 71,
    avgSpeed: 21,
  },
  {
    name: "Zone C",
    description: "Residential Area",
    traffic: "Low",
    population: 28000,
    vehicles: 1,
    roads: 5,
    incidents: 0,
    congestion: 24,
    avgSpeed: 39,
  },
];

export default function Zones() {
  const [selectedZone, setSelectedZone] = useState<Zone>(
    zones[0]
  );

  const totalPopulation = useMemo(
    () => zones.reduce((sum, zone) => sum + zone.population, 0),
    []
  );

  const totalVehicles = useMemo(
    () => zones.reduce((sum, zone) => sum + zone.vehicles, 0),
    []
  );

  const totalRoads = useMemo(
    () => zones.reduce((sum, zone) => sum + zone.roads, 0),
    []
  );

  const totalIncidents = useMemo(
    () => zones.reduce((sum, zone) => sum + zone.incidents, 0),
    []
  );

  return (
    <div className="metropolis-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Zone Intelligence</h1>

          <p className="page-subtitle">
            Monitor city zones, population, traffic and operational activity
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot" />
          ZONE MONITORING ACTIVE
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid-4">
        <div className="panel kpi-card">
          <MapPin size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Active Zones
          </div>

          <div className="kpi-value">
            {zones.length}
          </div>

          <div className="kpi-change">
            Digital twin sectors
          </div>
        </div>

        <div className="panel kpi-card">
          <Users size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Population
          </div>

          <div className="kpi-value">
            {(totalPopulation / 1000).toFixed(0)}K
          </div>

          <div className="kpi-change">
            Simulated population
          </div>
        </div>

        <div className="panel kpi-card">
          <CarFront size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Active Vehicles
          </div>

          <div className="kpi-value">
            {totalVehicles}
          </div>

          <div className="kpi-change">
            Across all zones
          </div>
        </div>

        <div className="panel kpi-card">
          <CircleAlert size={22} />

          <div
            className="kpi-label"
            style={{ marginTop: 14 }}
          >
            Incidents
          </div>

          <div className="kpi-value">
            {totalIncidents}
          </div>

          <div className="kpi-change">
            Active zone incidents
          </div>
        </div>
      </div>

      {/* ZONE OVERVIEW */}
      <div
        className="panel"
        style={{ marginTop: 18 }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Zone Overview
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Select a zone to inspect its current operational state
            </p>
          </div>

          <Radio size={18} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3, minmax(0, 1fr))",
            gap: 12,
            padding: 16,
          }}
        >
          {zones.map((zone) => (
            <ZoneCard
              key={zone.name}
              zone={zone}
              selected={selectedZone.name === zone.name}
              onClick={() => setSelectedZone(zone)}
            />
          ))}
        </div>
      </div>

      {/* SELECTED ZONE */}
      <div
        className="grid-2"
        style={{
          marginTop: 18,
          alignItems: "start",
        }}
      >
        {/* ZONE DETAILS */}
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                {selectedZone.name}
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                {selectedZone.description}
              </p>
            </div>

            <span
              className={
                selectedZone.traffic === "High"
                  ? "status status-high"
                  : selectedZone.traffic === "Medium"
                    ? "status status-medium"
                    : "status status-low"
              }
            >
              {selectedZone.traffic} Traffic
            </span>
          </div>

          <div style={{ padding: 18 }}>
            {/* METRICS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, minmax(0, 1fr))",
                gap: 10,
              }}
            >
              <ZoneMetric
                icon={<Users size={17} />}
                label="Population"
                value={selectedZone.population.toLocaleString()}
              />

              <ZoneMetric
                icon={<CarFront size={17} />}
                label="Vehicles"
                value={selectedZone.vehicles.toString()}
              />

              <ZoneMetric
                icon={<MapPin size={17} />}
                label="Road Network"
                value={`${selectedZone.roads} roads`}
              />

              <ZoneMetric
                icon={<CircleAlert size={17} />}
                label="Incidents"
                value={selectedZone.incidents.toString()}
              />
            </div>

            {/* CONGESTION */}
            <div
              style={{
                marginTop: 18,
                padding: 15,
                borderRadius: 8,
                border:
                  "1px solid rgba(100,160,190,.08)",
                background: "rgba(5,20,32,.45)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    Congestion Level
                  </div>

                  <div
                    className="muted"
                    style={{
                      marginTop: 4,
                      fontSize: 10,
                    }}
                  >
                    Current simulated road congestion
                  </div>
                </div>

                <strong
                  style={{
                    fontSize: 16,
                  }}
                >
                  {selectedZone.congestion}%
                </strong>
              </div>

              <div
                style={{
                  marginTop: 12,
                  height: 7,
                  borderRadius: 20,
                  background: "rgba(100,160,190,.10)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${selectedZone.congestion}%`,
                    height: "100%",
                    borderRadius: 20,
                    background:
                      selectedZone.congestion >= 65
                        ? "#ef6a78"
                        : selectedZone.congestion >= 40
                          ? "#e5b45b"
                          : "#31d29a",
                  }}
                />
              </div>
            </div>

            {/* SPEED */}
            <div
              style={{
                marginTop: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "13px 15px",
                borderRadius: 8,
                border:
                  "1px solid rgba(100,160,190,.08)",
                background: "rgba(5,20,32,.45)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                }}
              >
                <Activity size={16} />

                <span
                  style={{
                    fontSize: 12,
                  }}
                >
                  Average Speed
                </span>
              </div>

              <strong>
                {selectedZone.avgSpeed} km/h
              </strong>
            </div>
          </div>
        </div>

        {/* DIGITAL ZONE MAP */}
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">
                Digital Zone Map
              </h3>

              <p
                className="muted"
                style={{
                  marginTop: 5,
                  fontSize: 12,
                }}
              >
                Simulated operational area
              </p>
            </div>

            <MapPin size={18} />
          </div>

          <div
            style={{
              padding: 18,
            }}
          >
            <div
              style={{
                height: 340,
                borderRadius: 10,
                overflow: "hidden",
                position: "relative",
                background:
                  "linear-gradient(135deg, #061724, #03101b)",
                border:
                  "1px solid rgba(70,150,190,.12)",
              }}
            >
              {/* GRID */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.22,
                  backgroundImage:
                    "linear-gradient(rgba(70,160,190,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(70,160,190,.16) 1px, transparent 1px)",
                  backgroundSize: "38px 38px",
                }}
              />

              {/* ROADS */}
              <div
                style={{
                  position: "absolute",
                  width: "125%",
                  height: 5,
                  top: "46%",
                  left: "-10%",
                  background:
                    "rgba(82,180,215,.22)",
                  transform: "rotate(-12deg)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  width: "120%",
                  height: 4,
                  top: "63%",
                  left: "-10%",
                  background:
                    "rgba(82,180,215,.15)",
                  transform: "rotate(17deg)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  width: 4,
                  height: "120%",
                  left: "42%",
                  top: "-10%",
                  background:
                    "rgba(82,180,215,.15)",
                  transform: "rotate(9deg)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  width: 4,
                  height: "120%",
                  left: "68%",
                  top: "-10%",
                  background:
                    "rgba(82,180,215,.12)",
                  transform: "rotate(-17deg)",
                }}
              />

              {/* ZONE BOUNDARY */}
              <div
                style={{
                  position: "absolute",
                  width: "58%",
                  height: "58%",
                  left: "21%",
                  top: "21%",
                  borderRadius: 18,
                  border:
                    selectedZone.traffic === "High"
                      ? "1px solid rgba(239,106,120,.48)"
                      : selectedZone.traffic === "Medium"
                        ? "1px solid rgba(229,180,91,.48)"
                        : "1px solid rgba(49,210,154,.45)",
                  background:
                    selectedZone.traffic === "High"
                      ? "rgba(239,106,120,.035)"
                      : selectedZone.traffic === "Medium"
                        ? "rgba(229,180,91,.035)"
                        : "rgba(49,210,154,.035)",
                }}
              />

              {/* ZONE LABEL */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "27%",
                  transform: "translateX(-50%)",
                  fontSize: 11,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  opacity: 0.8,
                }}
              >
                {selectedZone.name}
              </div>

              {/* VEHICLE MARKERS */}
              <ZoneMarker
                left="34%"
                top="47%"
                type="car"
              />

              <ZoneMarker
                left="59%"
                top="40%"
                type="bus"
              />

              <ZoneMarker
                left="48%"
                top="66%"
                type="bike"
              />

              {/* STATUS */}
              <div
                style={{
                  position: "absolute",
                  left: 12,
                  bottom: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  fontSize: 10,
                  color: "#83a6b5",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#31d29a",
                    boxShadow:
                      "0 0 8px rgba(49,210,154,.5)",
                  }}
                />

                SIMULATION ACTIVE
              </div>

              <div
                style={{
                  position: "absolute",
                  right: 12,
                  bottom: 12,
                  fontSize: 10,
                  color: "#6f8e9c",
                }}
              >
                {selectedZone.roads} ROAD NETWORKS
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ZONE COMPARISON */}
      <div
        className="panel"
        style={{ marginTop: 18 }}
      >
        <div className="panel-header">
          <div>
            <h3 className="panel-title">
              Zone Comparison
            </h3>

            <p
              className="muted"
              style={{
                marginTop: 5,
                fontSize: 12,
              }}
            >
              Operational indicators across all monitored zones
            </p>
          </div>

          <ShieldCheck size={18} />
        </div>

        <div style={{ padding: 14 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1.2fr repeat(4, 1fr) 40px",
              gap: 10,
              padding: "10px 12px",
              color: "#688493",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: ".06em",
            }}
          >
            <span>Zone</span>
            <span>Traffic</span>
            <span>Vehicles</span>
            <span>Congestion</span>
            <span>Speed</span>
            <span />
          </div>

          {zones.map((zone) => (
            <button
              type="button"
              key={zone.name}
              onClick={() => setSelectedZone(zone)}
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns:
                  "1.2fr repeat(4, 1fr) 40px",
                gap: 10,
                alignItems: "center",
                padding: "14px 12px",
                marginTop: 5,
                borderRadius: 8,
                border:
                  selectedZone.name === zone.name
                    ? "1px solid rgba(24,201,239,.20)"
                    : "1px solid rgba(100,160,190,.06)",
                background:
                  selectedZone.name === zone.name
                    ? "rgba(20,190,235,.045)"
                    : "rgba(5,20,32,.30)",
                color: "inherit",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <div>
                <strong
                  style={{
                    fontSize: 12,
                  }}
                >
                  {zone.name}
                </strong>

                <div
                  className="muted"
                  style={{
                    marginTop: 3,
                    fontSize: 10,
                  }}
                >
                  {zone.description}
                </div>
              </div>

              <span
                className={
                  zone.traffic === "High"
                    ? "status status-high"
                    : zone.traffic === "Medium"
                      ? "status status-medium"
                      : "status status-low"
                }
                style={{
                  width: "fit-content",
                }}
              >
                {zone.traffic}
              </span>

              <span
                style={{
                  fontSize: 12,
                }}
              >
                {zone.vehicles}
              </span>

              <span
                style={{
                  fontSize: 12,
                }}
              >
                {zone.congestion}%
              </span>

              <span
                style={{
                  fontSize: 12,
                }}
              >
                {zone.avgSpeed} km/h
              </span>

              <ChevronRight
                size={15}
                style={{
                  opacity: 0.45,
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* FOOTER STATUS */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 14,
          padding: "10px 2px",
          color: "#64808d",
          fontSize: 10,
        }}
      >
        <Activity size={13} />

        METROPOLIS zone engine monitoring{" "}
        {totalRoads} connected road segments across{" "}
        {zones.length} simulated zones.
      </div>
    </div>
  );
}

/* =========================================================
   ZONE CARD
   ========================================================= */

function ZoneCard({
  zone,
  selected,
  onClick,
}: {
  zone: Zone;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: "left",
        padding: 16,
        borderRadius: 9,
        border: selected
          ? "1px solid rgba(24,201,239,.35)"
          : "1px solid rgba(100,160,190,.08)",
        background: selected
          ? "rgba(20,190,235,.06)"
          : "rgba(5,20,32,.35)",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "rgba(20,190,235,.07)",
            }}
          >
            <MapPin size={17} />
          </div>

          <div>
            <strong
              style={{
                fontSize: 13,
              }}
            >
              {zone.name}
            </strong>

            <div
              className="muted"
              style={{
                marginTop: 3,
                fontSize: 10,
              }}
            >
              {zone.description}
            </div>
          </div>
        </div>

        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background:
              zone.traffic === "High"
                ? "#ef6a78"
                : zone.traffic === "Medium"
                  ? "#e5b45b"
                  : "#31d29a",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginTop: 15,
        }}
      >
        <MiniValue
          label="Vehicles"
          value={zone.vehicles.toString()}
        />

        <MiniValue
          label="Congestion"
          value={`${zone.congestion}%`}
        />
      </div>
    </button>
  );
}

/* =========================================================
   ZONE METRIC
   ========================================================= */

function ZoneMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: 13,
        borderRadius: 8,
        background: "rgba(5,20,32,.45)",
        border:
          "1px solid rgba(100,160,190,.08)",
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "rgba(20,190,235,.07)",
        }}
      >
        {icon}
      </div>

      <div>
        <div
          className="muted"
          style={{
            fontSize: 10,
          }}
        >
          {label}
        </div>

        <strong
          style={{
            display: "block",
            marginTop: 3,
            fontSize: 13,
          }}
        >
          {value}
        </strong>
      </div>
    </div>
  );
}

/* =========================================================
   MINI VALUE
   ========================================================= */

function MiniValue({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div
        className="muted"
        style={{
          fontSize: 9,
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: 3,
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =========================================================
   ZONE MAP MARKER
   ========================================================= */

function ZoneMarker({
  left,
  top,
  type,
}: {
  left: string;
  top: string;
  type: "car" | "bus" | "bike";
}) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: 25,
        height: 25,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "rgba(20,190,235,.12)",
        border:
          "1px solid rgba(20,190,235,.38)",
        color: "#6eddf4",
      }}
    >
      {type === "bus" ? (
        <span style={{ fontSize: 10 }}>B</span>
      ) : type === "bike" ? (
        <span style={{ fontSize: 10 }}>●</span>
      ) : (
        <CarFront size={12} />
      )}
    </div>
  );
}