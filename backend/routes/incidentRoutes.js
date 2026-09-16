const express = require("express");

const {
  getAllIncidents,
  getIncidentById,
  getIncidentsByZone,
  getIncidentsByStatus,
  createIncident,
  updateIncident,
  deleteIncident,
} = require("../controllers/incidentController");

const router = express.Router();

// Get all incidents
router.get("/", getAllIncidents);

// Get incidents by zone
router.get("/zone/:zoneName", getIncidentsByZone);

// Get incidents by status
router.get("/status/:status", getIncidentsByStatus);

// Get one incident by ID
router.get("/:id", getIncidentById);

// Create a new incident
router.post("/", createIncident);

// Update an incident
router.put("/:id", updateIncident);

// Delete an incident
router.delete("/:id", deleteIncident);

module.exports = router;