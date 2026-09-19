const db = require("../config/db");

// GET all zones
const getAllZones = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM zones ORDER BY id ASC"
    );

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error("Get all zones error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch zones",
      error: error.message,
    });
  }
};

// GET zone by ID
const getZoneById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM zones WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Zone not found",
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error("Get zone by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch zone",
      error: error.message,
    });
  }
};

// GET zone by name
const getZoneByName = async (req, res) => {
  try {
    const { zoneName } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM zones WHERE zone_name = ?",
      [zoneName]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Zone not found",
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error("Get zone by name error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch zone",
      error: error.message,
    });
  }
};

// CREATE zone
const createZone = async (req, res) => {
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

    const [existing] = await db.query(
      "SELECT id FROM zones WHERE zone_name = ?",
      [zone_name]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Zone already exists",
      });
    }

    const [result] = await db.query(
      `INSERT INTO zones
      (zone_name, description, traffic_level, population, active_vehicles)
      VALUES (?, ?, ?, ?, ?)`,
      [
        zone_name,
        description || null,
        traffic_level || "Low",
        population || 0,
        active_vehicles || 0,
      ]
    );

    const [rows] = await db.query(
      "SELECT * FROM zones WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Zone created successfully",
      data: rows[0],
    });
  } catch (error) {
    console.error("Create zone error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create zone",
      error: error.message,
    });
  }
};

// UPDATE zone
const updateZone = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      zone_name,
      description,
      traffic_level,
      population,
      active_vehicles,
    } = req.body;

    const [existing] = await db.query(
      "SELECT * FROM zones WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Zone not found",
      });
    }

    await db.query(
      `UPDATE zones
       SET zone_name = ?,
           description = ?,
           traffic_level = ?,
           population = ?,
           active_vehicles = ?
       WHERE id = ?`,
      [
        zone_name ?? existing[0].zone_name,
        description ?? existing[0].description,
        traffic_level ?? existing[0].traffic_level,
        population ?? existing[0].population,
        active_vehicles ?? existing[0].active_vehicles,
        id,
      ]
    );

    const [rows] = await db.query(
      "SELECT * FROM zones WHERE id = ?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Zone updated successfully",
      data: rows[0],
    });
  } catch (error) {
    console.error("Update zone error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update zone",
      error: error.message,
    });
  }
};

// DELETE zone
const deleteZone = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await db.query(
      "SELECT id FROM zones WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Zone not found",
      });
    }

    await db.query(
      "DELETE FROM zones WHERE id = ?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Zone deleted successfully",
    });
  } catch (error) {
    console.error("Delete zone error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete zone",
      error: error.message,
    });
  }
};

module.exports = {
  getAllZones,
  getZoneById,
  getZoneByName,
  createZone,
  updateZone,
  deleteZone,
};