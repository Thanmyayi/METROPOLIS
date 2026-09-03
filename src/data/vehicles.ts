export type VehicleType = "car" | "bus" | "bike";

export interface VehicleData {
  id: string;
  plate: string;
  type: VehicleType;
  model: string;
  road: string;
  zone: string;
  speed: number;
  direction: string;
  status: "Moving" | "Stopped";
  position: [number, number];
}

export const vehicles: VehicleData[] = [
  {
    id: "VH-001",
    plate: "KA-01-AB-1234",
    type: "car",
    model: "Sedan",
    road: "MG Road",
    zone: "Zone A",
    speed: 42,
    direction: "North",
    status: "Moving",
    position: [12.9718, 77.5945],
  },

  {
    id: "VH-002",
    plate: "KA-01-BX-4589",
    type: "bus",
    model: "City Bus",
    road: "Main Road",
    zone: "Zone A",
    speed: 28,
    direction: "East",
    status: "Moving",
    position: [12.9731, 77.5928],
  },

  {
    id: "VH-003",
    plate: "KA-05-MN-7788",
    type: "bike",
    model: "Street Bike",
    road: "Central Avenue",
    zone: "Zone A",
    speed: 36,
    direction: "South",
    status: "Moving",
    position: [12.9698, 77.5962],
  },

  {
    id: "VH-004",
    plate: "KA-03-CD-9021",
    type: "car",
    model: "Hatchback",
    road: "Park Road",
    zone: "Zone B",
    speed: 12,
    direction: "West",
    status: "Stopped",
    position: [12.9687, 77.5917],
  },

  {
    id: "VH-005",
    plate: "KA-02-EF-3456",
    type: "car",
    model: "SUV",
    road: "Ring Road",
    zone: "Zone A",
    speed: 51,
    direction: "North-East",
    status: "Moving",
    position: [12.9742, 77.5971],
  },

  {
    id: "VH-006",
    plate: "KA-04-GH-2211",
    type: "bus",
    model: "Electric Bus",
    road: "Station Road",
    zone: "Zone B",
    speed: 22,
    direction: "South-East",
    status: "Moving",
    position: [12.9679, 77.5942],
  },

  {
    id: "VH-007",
    plate: "KA-02-JK-6543",
    type: "bike",
    model: "Sports Bike",
    road: "Market Road",
    zone: "Zone A",
    speed: 44,
    direction: "East",
    status: "Moving",
    position: [12.9725, 77.5908],
  },

  {
    id: "VH-008",
    plate: "KA-05-LM-8899",
    type: "car",
    model: "Sedan",
    road: "Airport Road",
    zone: "Zone C",
    speed: 31,
    direction: "South",
    status: "Moving",
    position: [12.9760, 77.5960],
  },
];