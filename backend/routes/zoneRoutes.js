const express = require("express");

const {
  getAllZones,
  getZoneById,
  getZoneByName,
  createZone,
  updateZone,
  deleteZone,
} = require("../controllers/zoneController");

const router = express.Router();

// Get all zones
router.get("/", getAllZones);

// Get zone by name
router.get("/name/:zoneName", getZoneByName);

// Get zone by ID
router.get("/:id", getZoneById);

// Create a new zone
router.post("/", createZone);

// Update a zone
router.put("/:id", updateZone);

// Delete a zone
router.delete("/:id", deleteZone);

module.exports = router;