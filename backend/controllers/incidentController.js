const incidentModel = require("../models/incidentModel");

// GET /api/incidents
async function getAllIncidents(req, res) {
  try {
    const incidents = await incidentModel.getAllIncidents();

    res.status(200).json({
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

// GET /api/incidents/:id
async function getIncidentById(req, res) {
  try {
    const { id } = req.params;

    const incident = await incidentModel.getIncidentById(id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: `Incident ${id} not found`,
      });
    }

    res.status(200).json({
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

// GET /api/incidents/zone/:zoneName
async function getIncidentsByZone(req, res) {
  try {
    const { zoneName } = req.params;

    const incidents =
      await incidentModel.getIncidentsByZone(zoneName);

    res.status(200).json({
      success: true,
      count: incidents.length,
      zone: zoneName,
      data: incidents,
    });
  } catch (error) {
    console.error(
      "Error fetching zone incidents:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch zone incidents",
      error: error.message,
    });
  }
}

// GET /api/incidents/status/:status
async function getIncidentsByStatus(req, res) {
  try {
    const { status } = req.params;

    const incidents =
      await incidentModel.getIncidentsByStatus(status);

    res.status(200).json({
      success: true,
      count: incidents.length,
      status,
      data: incidents,
    });
  } catch (error) {
    console.error(
      "Error fetching incidents by status:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch incidents by status",
      error: error.message,
    });
  }
}

// POST /api/incidents
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

    if (!incident_type || !severity) {
      return res.status(400).json({
        success: false,
        message: "incident_type and severity are required",
      });
    }

    const incidentId = await incidentModel.createIncident({
      incident_type,
      description,
      road_name,
      zone_name,
      severity,
      latitude,
      longitude,
      status: status || "Active",
    });

    res.status(201).json({
      success: true,
      message: "Incident created successfully",
      id: incidentId,
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

// PUT /api/incidents/:id
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

    const affectedRows =
      await incidentModel.updateIncident(id, {
        incident_type,
        description,
        road_name,
        zone_name,
        severity,
        latitude,
        longitude,
        status,
      });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Incident ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Incident updated successfully",
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

// DELETE /api/incidents/:id
async function deleteIncident(req, res) {
  try {
    const { id } = req.params;

    const affectedRows =
      await incidentModel.deleteIncident(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Incident ${id} not found`,
      });
    }

    res.status(200).json({
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