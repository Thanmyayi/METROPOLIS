export interface VehicleApiResponse {
  success?: boolean;
  data?: any[];
  message?: string;
}

export function getVehicles(): Promise<VehicleApiResponse>;