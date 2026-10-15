const API_BASE_URL = "http://localhost:5000/api";

/* =========================================================
   TYPES
========================================================= */

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

/* =========================================================
   VEHICLE
========================================================= */

export interface Vehicle {
  /* Frontend fields */

  id: string;

  plate?: string;

  type?: string;

  model?: string;

  road?: string;

  zone?: string;

  speed: number;

  direction?: string;

  status: string;

  latitude?: number;

  longitude?: number;

  position?: [
    number,
    number,
  ];

  lastUpdated?: string;

  /* Backend-compatible fields */

  vehicle_id?: string;

  plate_number?: string;

  number_plate?: string;

  vehicle_type?: string;

  road_name?: string;

  zone_name?: string;

  lat?: number;

  lng?: number;

  last_updated?: string;

  vehicle_name?: string;

  name?: string;
}

/* =========================================================
   TRAFFIC
========================================================= */

export interface TrafficData {
  id?: number | string;

  zone?: string;

  level?: string;

  density?: number;

  averageSpeed?: number;

  vehicleCount?: number;

  status?: string;
}

/* =========================================================
   INCIDENT
========================================================= */

export interface Incident {
  id: number | string;

  type: string;

  description: string;

  location: string;

  severity: string;

  status: string;

  timestamp?: string;
}

/* =========================================================
   ZONE
========================================================= */

export interface Zone {
  id: number | string;

  name: string;

  status?: string;

  vehicleCount?: number;

  trafficLevel?: string;

  averageSpeed?: number;
}

/* =========================================================
   ANALYTICS
========================================================= */

export interface AnalyticsData {
  totalVehicles?: number;

  movingVehicles?: number;

  stoppedVehicles?: number;

  averageSpeed?: number;

  incidents?: number;

  congestion?: number;
}

/* =========================================================
   COMMON REQUEST FUNCTION
========================================================= */

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    const response =
      await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
          headers: {
            "Content-Type":
              "application/json",

            ...options.headers,
          },

          ...options,
        },
      );

    const contentType =
      response.headers.get(
        "content-type",
      );

    const result =
      contentType?.includes(
        "application/json",
      )
        ? await response.json()
        : await response.text();

    /* ---------------------------------------------
       API ERROR
    --------------------------------------------- */

    if (!response.ok) {
      const message =
        typeof result ===
          "object" &&
        result?.message
          ? result.message
          : `API request failed: ${response.status}`;

      throw new Error(
        message,
      );
    }

    return result as T;
  } catch (error) {
    console.error(
      `API request failed: ${endpoint}`,
      error,
    );

    throw error;
  }
}

/* =========================================================
   HEALTH
========================================================= */

export async function checkBackendHealth() {
  return apiRequest<{
    success: boolean;

    message: string;

    database?: string;

    server?: string;
  }>("/health");
}

/* =========================================================
   VEHICLES
========================================================= */

/*
 * GET ALL VEHICLES
 *
 * Expected backend response:
 *
 * {
 *   success: true,
 *   data: [...]
 * }
 */

export async function getVehicles() {
  return apiRequest<{
    success: boolean;

    data: Vehicle[];

    message?: string;

    error?: string;
  }>("/vehicles");
}

/*
 * GET SINGLE VEHICLE
 *
 * Expected backend response:
 *
 * {
 *   success: true,
 *   data: {...}
 * }
 */

export async function getVehicle(
  id: string,
) {
  return apiRequest<{
    success: boolean;

    data: Vehicle;

    message?: string;

    error?: string;
  }>(
    `/vehicles/${encodeURIComponent(
      id,
    )}`,
  );
}

/*
 * CREATE VEHICLE
 */

export async function createVehicle(
  vehicle: Partial<Vehicle>,
) {
  return apiRequest<{
    success: boolean;

    data: Vehicle;

    message?: string;
  }>("/vehicles", {
    method: "POST",

    body: JSON.stringify(
      vehicle,
    ),
  });
}

/*
 * UPDATE VEHICLE
 */

export async function updateVehicle(
  id: string,
  vehicle: Partial<Vehicle>,
) {
  return apiRequest<{
    success: boolean;

    data: Vehicle;

    message?: string;
  }>(
    `/vehicles/${encodeURIComponent(
      id,
    )}`,
    {
      method: "PUT",

      body: JSON.stringify(
        vehicle,
      ),
    },
  );
}

/*
 * DELETE VEHICLE
 */

export async function deleteVehicle(
  id: string,
) {
  return apiRequest<{
    success: boolean;

    message: string;
  }>(
    `/vehicles/${encodeURIComponent(
      id,
    )}`,
    {
      method: "DELETE",
    },
  );
}

/* =========================================================
   TRAFFIC
========================================================= */

export async function getTraffic() {
  return apiRequest<{
    success: boolean;

    data: TrafficData[];

    message?: string;
  }>("/traffic");
}

export async function getTrafficByZone(
  zone: string,
) {
  return apiRequest<{
    success: boolean;

    data: TrafficData;

    message?: string;
  }>(
    `/traffic/${encodeURIComponent(
      zone,
    )}`,
  );
}

/* =========================================================
   INCIDENTS
========================================================= */

export async function getIncidents() {
  return apiRequest<{
    success: boolean;

    data: Incident[];

    message?: string;
  }>("/incidents");
}

export async function getIncident(
  id: string | number,
) {
  return apiRequest<{
    success: boolean;

    data: Incident;

    message?: string;
  }>(
    `/incidents/${encodeURIComponent(
      String(id),
    )}`,
  );
}

export async function createIncident(
  incident: Partial<Incident>,
) {
  return apiRequest<{
    success: boolean;

    data: Incident;

    message?: string;
  }>("/incidents", {
    method: "POST",

    body: JSON.stringify(
      incident,
    ),
  });
}

export async function updateIncident(
  id: string | number,
  incident: Partial<Incident>,
) {
  return apiRequest<{
    success: boolean;

    data: Incident;

    message?: string;
  }>(
    `/incidents/${encodeURIComponent(
      String(id),
    )}`,
    {
      method: "PUT",

      body: JSON.stringify(
        incident,
      ),
    },
  );
}

export async function deleteIncident(
  id: string | number,
) {
  return apiRequest<{
    success: boolean;

    message: string;
  }>(
    `/incidents/${encodeURIComponent(
      String(id),
    )}`,
    {
      method: "DELETE",
    },
  );
}

/* =========================================================
   ZONES
========================================================= */

export async function getZones() {
  return apiRequest<{
    success: boolean;

    data: Zone[];

    message?: string;
  }>("/zones");
}

export async function getZone(
  id: string | number,
) {
  return apiRequest<{
    success: boolean;

    data: Zone;

    message?: string;
  }>(
    `/zones/${encodeURIComponent(
      String(id),
    )}`,
  );
}

/* =========================================================
   ANALYTICS
========================================================= */

export async function getAnalytics() {
  return apiRequest<{
    success: boolean;

    data: AnalyticsData;

    message?: string;
  }>("/analytics");
}

/* =========================================================
   SCENARIO HELPERS
========================================================= */

export async function runScenario(
  scenario: string,
) {
  return apiRequest<{
    success: boolean;

    message: string;

    scenario: string;
  }>("/analytics/scenario", {
    method: "POST",

    body: JSON.stringify({
      scenario,
    }),
  });
}

/* =========================================================
   DEFAULT API OBJECT
========================================================= */

const api = {
  checkBackendHealth,

  getVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,

  getTraffic,
  getTrafficByZone,

  getIncidents,
  getIncident,
  createIncident,
  updateIncident,
  deleteIncident,

  getZones,
  getZone,

  getAnalytics,

  runScenario,
};

export default api;