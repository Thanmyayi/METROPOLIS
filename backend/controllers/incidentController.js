const incidentModel = require("../models/incidentModel");

// Get all incidents
async function getAllIncidents(req, res) {
  try {
    const incidents = await incidentModel.getAllIncidents();

    res.json({
      success: true,
      count: incidents.length,
      data: incidents,
    });
  } catch (error) {
    console.error("Error fetching incidents:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch incidents",
      error: error.message,
    });
  }
}

// Get incident by ID
async function getIncidentById(req, res) {
  try {
    const { id } = req.params;

    const incident = await incidentModel.getIncidentById(id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    res.json({
      success: true,
      data: incident,
    });
  } catch (error) {
    console.error("Error fetching incident:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch incident",
      error: error.message,
    });
  }
}

// Get incidents by zone
async function getIncidentsByZone(req, res) {
  try {
    const { zoneName } = req.params;

    const incidents = await incidentModel.getIncidentsByZone(zoneName);

    res.json({
      success: true,
      zone: zoneName,
      count: incidents.length,
      data: incidents,
    });
  } catch (error) {
    console.error("Error fetching zone incidents:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch incidents by zone",
      error: error.message,
    });
  }
}

// Get incidents by status
async function getIncidentsByStatus(req, res) {
  try {
    const { status } = req.params;

    const incidents = await incidentModel.getIncidentsByStatus(status);

    res.json({
      success: true,
      status,
      count: incidents.length,
      data: incidents,
    });
  } catch (error) {
    console.error("Error fetching incidents by status:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch incidents by status",
      error: error.message,
    });
  }
}

// Create incident
async function createIncident(req, res) {
  try {
    const {
      incident_type,
      description,
      road_name,
      zone_name,
      severity,
      latitude,
      longitude,
      status,
    } = req.body;

    if (!incident_type) {
      return res.status(400).json({
        success: false,
        message: "incident_type is required",
      });
    }

    const incidentId = await incidentModel.createIncident({
      incident_type,
      description,
      road_name,
      zone_name,
      severity: severity || "Low",
      latitude,
      longitude,
      status: status || "Active",
    });

    const newIncident = await incidentModel.getIncidentById(incidentId);

    res.status(201).json({
      success: true,
      message: "Incident created successfully",
      data: newIncident,
    });
  } catch (error) {
    console.error("Error creating incident:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create incident",
      error: error.message,
    });
  }
}

// Update incident
async function updateIncident(req, res) {
  try {
    const { id } = req.params;

    const {
      incident_type,
      description,
      road_name,
      zone_name,
      severity,
      latitude,
      longitude,
      status,
    } = req.body;

    const existingIncident = await incidentModel.getIncidentById(id);

    if (!existingIncident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    const affectedRows = await incidentModel.updateIncident(id, {
      incident_type:
        incident_type !== undefined
          ? incident_type
          : existingIncident.incident_type,

      description:
        description !== undefined
          ? description
          : existingIncident.description,

      road_name:
        road_name !== undefined
          ? road_name
          : existingIncident.road_name,

      zone_name:
        zone_name !== undefined
          ? zone_name
          : existingIncident.zone_name,

      severity:
        severity !== undefined
          ? severity
          : existingIncident.severity,

      latitude:
        latitude !== undefined
          ? latitude
          : existingIncident.latitude,

      longitude:
        longitude !== undefined
          ? longitude
          : existingIncident.longitude,

      status:
        status !== undefined
          ? status
          : existingIncident.status,
    });

    if (affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: "No changes were made",
      });
    }

    const updatedIncident = await incidentModel.getIncidentById(id);

    res.json({
      success: true,
      message: "Incident updated successfully",
      data: updatedIncident,
    });
  } catch (error) {
    console.error("Error updating incident:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update incident",
      error: error.message,
    });
  }
}

// Delete incident
async function deleteIncident(req, res) {
  try {
    const { id } = req.params;

    const existingIncident = await incidentModel.getIncidentById(id);

    if (!existingIncident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    const affectedRows = await incidentModel.deleteIncident(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Incident could not be deleted",
      });
    }

    res.json({
      success: true,
      message: "Incident deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting incident:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete incident",
      error: error.message,
    });
  }
}

module.exports = {
  getAllIncidents,
  getIncidentById,
  getIncidentsByZone,
  getIncidentsByStatus,
  createIncident,
  updateIncident,
  deleteIncident,
};