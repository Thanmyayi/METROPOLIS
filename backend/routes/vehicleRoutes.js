const express = require("express");

const {
  getAllVehicles,
  getVehicleById,
  searchVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicleController");

const router = express.Router();

// Get all vehicles
router.get("/", getAllVehicles);

// Search vehicles
router.get("/search", searchVehicles);

// Get one vehicle
router.get("/:vehicleId", getVehicleById);

// Add a vehicle
router.post("/", createVehicle);

// Update a vehicle
router.put("/:vehicleId", updateVehicle);

// Delete a vehicle
router.delete("/:vehicleId", deleteVehicle);

module.exports = router;