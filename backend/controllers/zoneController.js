const zoneModel = require("../models/zoneModel");

// ======================================================
// GET ALL ZONES
// ======================================================

async function getZones(req, res) {
  try {
    const zones = await zoneModel.getAllZones();

    res.status(200).json({
      success: true,
      message: "Zones fetched successfully",
      count: zones.length,
      data: zones,
    });
  } catch (error) {
    console.error("Zone fetch error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch zones",
      error: error.message,
    });
  }
}

// ======================================================
// GET ZONE BY ID
// ======================================================

async function getZoneById(req, res) {
  try {
    const { id } = req.params;

    const zone = await zoneModel.getZoneById(id);

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: "Zone not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Zone fetched successfully",
      data: zone,
    });
  } catch (error) {
    console.error("Zone fetch by ID error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch zone",
      error: error.message,
    });
  }
}

// ======================================================
// CREATE ZONE
// ======================================================

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
      description: description || null,
      traffic_level: traffic_level || "Low",
      population: population ?? 0,
      active_vehicles: active_vehicles ?? 0,
    });

    const newZone = await zoneModel.getZoneById(zoneId);

    res.status(201).json({
      success: true,
      message: "Zone created successfully",
      data: newZone,
    });
  } catch (error) {
    console.error("Zone creation error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create zone",
      error: error.message,
    });
  }
}

// ======================================================
// UPDATE ZONE
// ======================================================

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

    const existingZone = await zoneModel.getZoneById(id);

    if (!existingZone) {
      return res.status(404).json({
        success: false,
        message: "Zone not found",
      });
    }

    const affectedRows = await zoneModel.updateZone(id, {
      zone_name:
        zone_name !== undefined
          ? zone_name
          : existingZone.zone_name,

      description:
        description !== undefined
          ? description
          : existingZone.description,

      traffic_level:
        traffic_level !== undefined
          ? traffic_level
          : existingZone.traffic_level,

      population:
        population !== undefined
          ? population
          : existingZone.population,

      active_vehicles:
        active_vehicles !== undefined
          ? active_vehicles
          : existingZone.active_vehicles,
    });

    if (affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: "No changes were made",
      });
    }

    const updatedZone = await zoneModel.getZoneById(id);

    res.status(200).json({
      success: true,
      message: "Zone updated successfully",
      data: updatedZone,
    });
  } catch (error) {
    console.error("Zone update error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update zone",
      error: error.message,
    });
  }
}

// ======================================================
// DELETE ZONE
// ======================================================

async function deleteZone(req, res) {
  try {
    const { id } = req.params;

    const existingZone = await zoneModel.getZoneById(id);

    if (!existingZone) {
      return res.status(404).json({
        success: false,
        message: "Zone not found",
      });
    }

    const affectedRows = await zoneModel.deleteZone(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Zone could not be deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "Zone deleted successfully",
    });
  } catch (error) {
    console.error("Zone deletion error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete zone",
      error: error.message,
    });
  }
}

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  getZones,
  getZoneById,
  createZone,
  updateZone,
  deleteZone,
};