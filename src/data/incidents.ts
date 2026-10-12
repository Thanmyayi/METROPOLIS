export type IncidentSeverity = "Low" | "Medium" | "High" | "Critical";
export type IncidentStatus = "Active" | "Resolved";

export interface Incident {
  id: number | string;
  incident_type: string;
  description: string;
  road_name: string;
  zone_name: string;
  severity: IncidentSeverity;
  latitude: number;
  longitude: number;
  status: IncidentStatus;
  reported_at?: string;
  resolved_at?: string | null;
}

export const incidents: Incident[] = [
  {
    id: 1,
    incident_type: "Traffic Congestion",
    description: "Heavy traffic near the central junction.",
    road_name: "MG Road",
    zone_name: "Zone A",
    severity: "High",
    latitude: 12.9756,
    longitude: 77.6066,
    status: "Active",
    reported_at: new Date().toISOString(),
    resolved_at: null,
  },
  {
    id: 2,
    incident_type: "Road Maintenance",
    description: "Scheduled road maintenance is in progress.",
    road_name: "Outer Ring Road",
    zone_name: "Zone B",
    severity: "Medium",
    latitude: 12.9352,
    longitude: 77.6245,
    status: "Active",
    reported_at: new Date().toISOString(),
    resolved_at: null,
  },
  {
    id: 3,
    incident_type: "Vehicle Breakdown",
    description: "A vehicle has stopped near the roadside.",
    road_name: "Central Avenue",
    zone_name: "Zone A",
    severity: "Low",
    latitude: 12.9719,
    longitude: 77.6011,
    status: "Resolved",
    reported_at: new Date().toISOString(),
    resolved_at: new Date().toISOString(),
  },
  {
    id: 4,
    incident_type: "Signal Failure",
    description: "Traffic signal malfunction reported at the intersection.",
    road_name: "Brigade Road",
    zone_name: "Zone B",
    severity: "Critical",
    latitude: 12.9716,
    longitude: 77.6012,
    status: "Active",
    reported_at: new Date().toISOString(),
    resolved_at: null,
  },
  {
    id: 5,
    incident_type: "Waterlogging",
    description: "Water accumulation may slow down traffic.",
    road_name: "Residential Main Road",
    zone_name: "Zone C",
    severity: "Medium",
    latitude: 12.9611,
    longitude: 77.5946,
    status: "Active",
    reported_at: new Date().toISOString(),
    resolved_at: null,
  },
];

export default incidents;