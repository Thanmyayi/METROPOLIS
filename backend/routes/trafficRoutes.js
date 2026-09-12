const express = require("express");

const {
  getAllTraffic,
  getTrafficById,
  getTrafficByZone,
  getTrafficByRoad,
  createTraffic,
  updateTraffic,
  deleteTraffic,
} = require("../controllers/trafficController");

const router = express.Router();

// Get all traffic records
router.get("/", getAllTraffic);

// Get traffic by zone
router.get("/zone/:zoneName", getTrafficByZone);

// Get traffic by road
router.get("/road/:roadName", getTrafficByRoad);

// Get traffic by ID
router.get("/:id", getTrafficById);

// Create traffic record
router.post("/", createTraffic);

// Update traffic record
router.put("/:id", updateTraffic);

// Delete traffic record
router.delete("/:id", deleteTraffic);

module.exports = router;