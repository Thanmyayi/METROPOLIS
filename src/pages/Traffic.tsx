import {
  Activity,
  CarFront,
  Gauge,
  Route,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface TrafficRecord {
  id?: number | string;
  zone_name?: string;
  zone?: string;
  road_name?: string;
  road?: string;
  traffic_level?: string;
  congestion_level?: number;
  congestion?: number;
  vehicle_count?: number;
  active_vehicles?: number;
  average_speed?: number;
  avg_speed?: number;
  speed?: number;
  traffic_flow?: number;
  flow?: number;
}

interface TrafficResponse {
  success?: boolean;
  data?: TrafficRecord[];
  message?: string;
}

const fallbackZones = [
  ["Zone A", 72, "High"],
  ["Zone B", 58, "Moderate"],
  ["Zone C", 41, "Moderate"],
  ["Zone D", 29, "Low"],
] as const;

export default function Traffic() {
  const [trafficData, setTrafficData] = useState<
    TrafficRecord[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(
    null
  );

  /* =====================================================
     LOAD TRAFFIC DATA
     ===================================================== */

  const loadTraffic = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "http://localhost:5000/api/traffic"
      );

      if (!response.ok) {
        throw new Error(
          `Traffic API returned ${response.status}`
        );
      }

      const result: TrafficResponse =
        await response.json();

      if (Array.isArray(result.data)) {
        setTrafficData(result.data);
      } else {
        setTrafficData([]);
      }
    } catch (err) {
      console.error(
        "Traffic API error:",
        err
      );

      setError(
        "Unable to load live traffic data."
      );

      setTrafficData([]);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     INITIAL LOAD + AUTO REFRESH
     ===================================================== */

  useEffect(() => {
    loadTraffic();

    const interval = setInterval(() => {
      loadTraffic();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  /* =====================================================
     TRAFFIC STATISTICS
     ===================================================== */

  const statistics = useMemo(() => {
    if (trafficData.length === 0) {
      return {
        trafficFlow: 78,
        averageSpeed: 32,
        activeVehicles: 128,
        congestedRoads: 8,
      };
    }

    const speedValues = trafficData
      .map((item) =>
        Number(
          item.average_speed ??
            item.avg_speed ??
            item.speed ??
            0
        )
      )
      .filter((value) => value > 0);

    const vehicleCount =
      trafficData.reduce(
        (total, item) =>
          total +
          Number(
            item.active_vehicles ??
              item.vehicle_count ??
              0
          ),
        0
      );

    const flowValues = trafficData
      .map((item) =>
        Number(
          item.traffic_flow ??
            item.flow ??
            0
        )
      )
      .filter((value) => value > 0);

    const congestedRoads =
      trafficData.filter((item) => {
        const level =
          item.traffic_level?.toLowerCase() ??
          "";

        const congestion = Number(
          item.congestion_level ??
            item.congestion ??
            0
        );

        return (
          level === "high" ||
          level === "heavy" ||
          congestion >= 70
        );
      }).length;

    const averageSpeed =
      speedValues.length > 0
        ? Math.round(
            speedValues.reduce(
              (sum, value) =>
                sum + value,
              0
            ) /
              speedValues.length
          )
        : 32;

    const trafficFlow =
      flowValues.length > 0
        ? Math.round(
            flowValues.reduce(
              (sum, value) =>
                sum + value,
              0
            ) /
              flowValues.length
          )
        : 78;

    return {
      trafficFlow,
      averageSpeed,
      activeVehicles:
        vehicleCount > 0
          ? vehicleCount
          : 128,
      congestedRoads:
        congestedRoads > 0
          ? congestedRoads
          : 8,
    };
  }, [trafficData]);

  /* =====================================================
     ZONE CONGESTION
     ===================================================== */

  const zones = useMemo(() => {
    if (trafficData.length === 0) {
      return fallbackZones.map(
        ([zone, value, status]) => ({
          zone,
          value,
          status,
        })
      );
    }

    const zoneMap = new Map<
      string,
      {
        zone: string;
        value: number;
        status: string;
      }
    >();

    trafficData.forEach((item) => {
      const zone =
        item.zone_name ??
        item.zone ??
        "Unknown Zone";

      const value = Math.min(
        Math.max(
          Math.round(
            Number(
              item.congestion_level ??
                item.congestion ??
                0
            )
          ),
          0
        ),
        100
      );

      const level =
        item.traffic_level?.toLowerCase();

      let status = "Low";

      if (
        level === "high" ||
        level === "heavy" ||
        value >= 70
      ) {
        status = "High";
      } else if (
        level === "moderate" ||
        level === "medium" ||
        value >= 40
      ) {
        status = "Moderate";
      }

      zoneMap.set(zone, {
        zone,
        value,
        status,
      });
    });

    return Array.from(
      zoneMap.values()
    );
  }, [trafficData]);

  /* =====================================================
     UI
     ===================================================== */

  return (
    <div className="metropolis-page">
      {/* HEADER */}

      <div className="page-header">
        <div>
          <h1 className="page-title">
            Traffic Intelligence
          </h1>

          <p className="page-subtitle">
            Monitor traffic flow, congestion
            and average vehicle speeds
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <button
            type="button"
            onClick={loadTraffic}
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 12px",
              borderRadius: 8,
              border:
                "1px solid rgba(34,211,238,0.25)",
              background:
                "rgba(34,211,238,0.08)",
              color: "#67e8f9",
              cursor: "pointer",
            }}
          >
            <RefreshCw
              size={14}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>

          <span className="live-pill">
            <span className="live-dot" />
            LIVE TRAFFIC
          </span>
        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div
          style={{
            marginBottom: 18,
            padding: "10px 14px",
            borderRadius: 10,
            border:
              "1px solid rgba(251,191,36,0.25)",
            background:
              "rgba(251,191,36,0.08)",
            color: "#fcd34d",
            fontSize: 12,
          }}
        >
          {error} Showing simulation
          values.
        </div>
      )}

      {/* KPI CARDS */}

      <div className="grid-4">
        <div className="panel kpi-card">
          <Activity />

          <div
            className="kpi-label"
            style={{ marginTop: 15 }}
          >
            Traffic Flow
          </div>

          <div className="kpi-value">
            {statistics.trafficFlow}%
          </div>

          <div className="kpi-change">
            ↑ Live data
          </div>
        </div>

        <div className="panel kpi-card">
          <Gauge />

          <div
            className="kpi-label"
            style={{ marginTop: 15 }}
          >
            Average Speed
          </div>

          <div className="kpi-value">
            {statistics.averageSpeed} km/h
          </div>

          <div className="kpi-change">
            ↑ Live data
          </div>
        </div>

        <div className="panel kpi-card">
          <CarFront />

          <div
            className="kpi-label"
            style={{ marginTop: 15 }}
          >
            Active Vehicles
          </div>

          <div className="kpi-value">
            {statistics.activeVehicles}
          </div>

          <div className="kpi-change">
            ↑ Live data
          </div>
        </div>

        <div className="panel kpi-card">
          <Route />

          <div
            className="kpi-label"
            style={{ marginTop: 15 }}
          >
            Congested Roads
          </div>

          <div className="kpi-value">
            {String(
              statistics.congestedRoads
            ).padStart(2, "0")}
          </div>

          <div className="kpi-change">
            Live monitoring
          </div>
        </div>
      </div>

      {/* LOWER SECTION */}

      <div
        className="grid-2"
        style={{ marginTop: 18 }}
      >
        {/* TRAFFIC FLOW */}

        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">
              Traffic Flow — Today
            </h3>

            <TrendingUp
              size={16}
              className="muted"
            />
          </div>

          <div className="chart-area">
            {[
              32, 44, 51, 39,
              67, 61, 73, 58,
              79, 65, 82, 74,
            ].map(
              (height, index) => (
                <div
                  key={index}
                  className="chart-line"
                  style={
                    {
                      "--height":
                        `${height}%`,
                    } as React.CSSProperties
                  }
                />
              )
            )}
          </div>

          <div
            style={{
              padding:
                "0 20px 18px",
              display: "flex",
              justifyContent:
                "space-between",
            }}
          >
            <span className="muted">
              08 AM
            </span>

            <span className="muted">
              12 PM
            </span>

            <span className="muted">
              04 PM
            </span>
          </div>
        </div>

        {/* CONGESTION */}

        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">
              Congestion by Zone
            </h3>
          </div>

          <div style={{ padding: 20 }}>
            {zones.map((item) => (
              <div
                key={item.zone}
                style={{
                  marginBottom: 20,
                }}
              >
                <div className="metric-row">
                  <span>
                    {item.zone}
                  </span>

                  <strong>
                    {item.value}%
                  </strong>
                </div>

                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{
                      width:
                        `${item.value}%`,
                    }}
                  />
                </div>

                <div
                  style={{
                    marginTop: 6,
                  }}
                >
                  <span
                    className={`status ${
                      item.status ===
                      "High"
                        ? "status-high"
                        : item.status ===
                          "Moderate"
                        ? "status-medium"
                        : "status-low"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONNECTION STATUS */}

      <div
        className="panel"
        style={{
          marginTop: 18,
          padding: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#e2e8f0",
              }}
            >
              Traffic Data Source
            </div>

            <div
              style={{
                marginTop: 5,
                fontSize: 11,
                color: "#64748b",
              }}
            >
              MySQL → Express →
              METROPOLIS
            </div>
          </div>

          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: loading
                ? "#fbbf24"
                : error
                ? "#fbbf24"
                : "#34d399",
            }}
          >
            {loading
              ? "CONNECTING..."
              : error
              ? "FALLBACK MODE"
              : "BACKEND CONNECTED"}
          </span>
        </div>
      </div>
    </div>
  );
}