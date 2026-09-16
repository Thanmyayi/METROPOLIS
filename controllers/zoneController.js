const zoneModel = require("../models/zoneModel");

// GET /api/zones
async function getAllZones(req, res) {
  try {
    const zones = await zoneModel.getAllZones();

    res.status(200).json({
      success: true,
      count: zones.length,
      data: zones,
    });
  } catch (error) {
    console.error("Error fetching zones:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch zones",
      error: error.message,
    });
  }
}

// GET /api/zones/:id
async function getZoneById(req, res) {
  try {
    const { id } = req.params;

    const zone = await zoneModel.getZoneById(id);

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: `Zone ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: zone,
    });
  } catch (error) {
    console.error("Error fetching zone:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch zone",
      error: error.message,
    });
  }
}

// GET /api/zones/name/:zoneName
async function getZoneByName(req, res) {
  try {
    const { zoneName } = req.params;

    const zone = await zoneModel.getZoneByName(zoneName);

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: `Zone ${zoneName} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: zone,
    });
  } catch (error) {
    console.error("Error fetching zone by name:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch zone",
      error: error.message,
    });
  }
}

// POST /api/zones
async function createZone(req, res) {
  try {
    const {
      zone_name,
      description,
      traffic_level,
      population,
      active_vehicles,
    } = req.body;

    if (!zone_name) {
      return res.status(400).json({
        success: false,
        message: "zone_name is required",
      });
    }

    const zoneId = await zoneModel.createZone({
      zone_name,
      description,
      traffic_level: traffic_level || "Low",
      population: population || 0,
      active_vehicles: active_vehicles || 0,
    });

    res.status(201).json({
      success: true,
      message: "Zone created successfully",
      id: zoneId,
    });
  } catch (error) {
    console.error("Error creating zone:", error.message);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Zone name already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create zone",
      error: error.message,
    });
  }
}

// PUT /api/zones/:id
async function updateZone(req, res) {
  try {
    const { id } = req.params;

    const {
      zone_name,
      description,
      traffic_level,
      population,
      active_vehicles,
    } = req.body;

    const affectedRows = await zoneModel.updateZone(id, {
      zone_name,
      description,
      traffic_level,
      population,
      active_vehicles,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Zone ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Zone updated successfully",
    });
  } catch (error) {
    console.error("Error updating zone:", error.message);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Zone name already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update zone",
      error: error.message,
    });
  }
}

// DELETE /api/zones/:id
async function deleteZone(req, res) {
  try {
    const { id } = req.params;

    const affectedRows = await zoneModel.deleteZone(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Zone ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Zone deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting zone:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete zone",
      error: error.message,
    });
  }
}

module.exports = {
  getAllZones,
  getZoneById,
  getZoneByName,
  createZone,
  updateZone,
  deleteZone,
};