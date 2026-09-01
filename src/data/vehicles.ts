export type VehicleType = "Car" | "Bus" | "Bike" | "Truck";

export type VehicleStatus = "Moving" | "Stopped";

export interface Vehicle {
  id: string;
  numberPlate: string;
  type: VehicleType;
  model: string;
  road: string;
  zone: string;
  latitude: number;
  longitude: number;
  speed: number;
  direction: string;
  status: VehicleStatus;
}

export const vehicles: Vehicle[] = [
  {
    id: "V001",
    numberPlate: "KA-01-AB-1234",
    type: "Car",
    model: "Sedan",
    road: "Main Road",
    zone: "Zone A",
    latitude: 12.9718,
    longitude: 77.5948,
    speed: 32,
    direction: "North-East",
    status: "Moving",
  },

  {
    id: "V002",
    numberPlate: "KA-01-CD-5621",
    type: "Bus",
    model: "City Bus",
    road: "Park Street",
    zone: "Zone B",
    latitude: 12.9732,
    longitude: 77.599,
    speed: 18,
    direction: "East",
    status: "Moving",
  },

  {
    id: "V003",
    numberPlate: "KA-01-EF-8934",
    type: "Car",
    model: "SUV",
    road: "MG Road",
    zone: "Zone A",
    latitude: 12.9688,
    longitude: 77.5915,
    speed: 41,
    direction: "South",
    status: "Moving",
  },

  {
    id: "V004",
    numberPlate: "KA-05-GH-1245",
    type: "Bike",
    model: "Street Bike",
    road: "5th Cross",
    zone: "Zone C",
    latitude: 12.9755,
    longitude: 77.5965,
    speed: 22,
    direction: "West",
    status: "Moving",
  },

  {
    id: "V005",
    numberPlate: "KA-03-JK-7742",
    type: "Truck",
    model: "Cargo Truck",
    road: "Industrial Road",
    zone: "Zone D",
    latitude: 12.966,
    longitude: 77.5985,
    speed: 14,
    direction: "North",
    status: "Moving",
  },

  {
    id: "V006",
    numberPlate: "KA-02-LM-3412",
    type: "Car",
    model: "Hatchback",
    road: "Central Avenue",
    zone: "Zone A",
    latitude: 12.9702,
    longitude: 77.597,
    speed: 28,
    direction: "East",
    status: "Moving",
  },

  {
    id: "V007",
    numberPlate: "KA-04-NP-9812",
    type: "Bus",
    model: "Metro Shuttle",
    road: "Business Road",
    zone: "Zone B",
    latitude: 12.9762,
    longitude: 77.601,
    speed: 25,
    direction: "South-East",
    status: "Moving",
  },

  {
    id: "V008",
    numberPlate: "KA-01-QR-4521",
    type: "Car",
    model: "Sedan",
    road: "Lake Road",
    zone: "Zone C",
    latitude: 12.979,
    longitude: 77.592,
    speed: 36,
    direction: "West",
    status: "Moving",
  },

  {
    id: "V009",
    numberPlate: "KA-05-ST-6732",
    type: "Bike",
    model: "Sports Bike",
    road: "Tech Avenue",
    zone: "Zone D",
    latitude: 12.9648,
    longitude: 77.5955,
    speed: 44,
    direction: "North-East",
    status: "Moving",
  },

  {
    id: "V010",
    numberPlate: "KA-02-UV-2134",
    type: "Car",
    model: "Electric Sedan",
    road: "Main Road",
    zone: "Zone A",
    latitude: 12.9725,
    longitude: 77.5898,
    speed: 30,
    direction: "North",
    status: "Moving",
  },

  {
    id: "V011",
    numberPlate: "KA-03-WX-6412",
    type: "Car",
    model: "Hatchback",
    road: "Ring Road",
    zone: "Zone B",
    latitude: 12.974,
    longitude: 77.5875,
    speed: 27,
    direction: "East",
    status: "Moving",
  },

  {
    id: "V012",
    numberPlate: "KA-04-YZ-2281",
    type: "Bus",
    model: "City Transit",
    road: "Central Avenue",
    zone: "Zone C",
    latitude: 12.967,
    longitude: 77.602,
    speed: 20,
    direction: "North",
    status: "Moving",
  },
];