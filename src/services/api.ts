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

export interface Vehicle {
  id: string;
  type: string;
  zone: string;
  speed: number;
  direction?: string;
  status: string;
  location?: string;
  plate?: string;
  lastUpdated?: string;
}

export interface TrafficData {
  id?: number | string;
  zone?: string;
  level?: string;
  density?: number;
  averageSpeed?: number;
  vehicleCount?: number;
  status?: string;
}

export interface Incident {
  id: number | string;
  type: string;
  description: string;
  location: string;
  severity: string;
  status: string;
  timestamp?: string;
}

export interface Zone {
  id: number | string;
  name: string;
  status?: string;
  vehicleCount?: number;
  trafficLevel?: string;
  averageSpeed?: number;
}

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
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    },
  );

  const contentType =
    response.headers.get("content-type");

  const result = contentType?.includes(
    "application/json",
  )
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof result === "object" &&
      result?.message
        ? result.message
        : `API request failed: ${response.status}`;

    throw new Error(message);
  }

  return result as T;
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

export async function getVehicles() {
  return apiRequest<{
    success: boolean;
    data: Vehicle[];
    message?: string;
  }>("/vehicles");
}

export async function getVehicle(
  id: string,
) {
  return apiRequest<Vehicle>(
    `/vehicles/${id}`,
  );
}

export async function createVehicle(
  vehicle: Partial<Vehicle>,
) {
  return apiRequest<Vehicle>(
    "/vehicles",
    {
      method: "POST",
      body: JSON.stringify(vehicle),
    },
  );
}

export async function updateVehicle(
  id: string,
  vehicle: Partial<Vehicle>,
) {
  return apiRequest<Vehicle>(
    `/vehicles/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(vehicle),
    },
  );
}

export async function deleteVehicle(
  id: string,
) {
  return apiRequest<{
    success: boolean;
    message: string;
  }>(
    `/vehicles/${id}`,
    {
      method: "DELETE",
    },
  );
}

/* =========================================================
   TRAFFIC
========================================================= */

export async function getTraffic() {
  return apiRequest<TrafficData[]>(
    "/traffic",
  );
}

export async function getTrafficByZone(
  zone: string,
) {
  return apiRequest<TrafficData>(
    `/traffic/${encodeURIComponent(zone)}`,
  );
}

/* =========================================================
   INCIDENTS
========================================================= */

export async function getIncidents() {
  return apiRequest<Incident[]>(
    "/incidents",
  );
}

export async function getIncident(
  id: string | number,
) {
  return apiRequest<Incident>(
    `/incidents/${id}`,
  );
}

export async function createIncident(
  incident: Partial<Incident>,
) {
  return apiRequest<Incident>(
    "/incidents",
    {
      method: "POST",
      body: JSON.stringify(incident),
    },
  );
}

export async function updateIncident(
  id: string | number,
  incident: Partial<Incident>,
) {
  return apiRequest<Incident>(
    `/incidents/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(incident),
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
    `/incidents/${id}`,
    {
      method: "DELETE",
    },
  );
}

/* =========================================================
   ZONES
========================================================= */

export async function getZones() {
  return apiRequest<Zone[]>(
    "/zones",
  );
}

export async function getZone(
  id: string | number,
) {
  return apiRequest<Zone>(
    `/zones/${id}`,
  );
}

/* =========================================================
   ANALYTICS
========================================================= */

export async function getAnalytics() {
  return apiRequest<AnalyticsData>(
    "/analytics",
  );
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
   EXPORT DEFAULT API OBJECT
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