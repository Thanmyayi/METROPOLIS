const express = require("express");
const router = express.Router();

const db = require("../config/db");

/*
====================================================
METROPOLIS - ZONE ROUTES
====================================================
*/

// ==================================================
// GET ALL ZONES
// GET /api/zones
// ==================================================

router.get("/", async (req, res) => {
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
    console.error("GET ALL ZONES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch zones",
      error: error.message,
    });
  }
});


// ==================================================
// GET ZONE BY NAME
// GET /api/zones/name/Zone%20A
// ==================================================

router.get("/name/:zoneName", async (req, res) => {
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
    console.error("GET ZONE BY NAME ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch zone",
      error: error.message,
    });
  }
});


// ==================================================
// GET ZONE BY ID
// GET /api/zones/1
// ==================================================

router.get("/:id", async (req, res) => {
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
    console.error("GET ZONE BY ID ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch zone",
      error: error.message,
    });
  }
});


// ==================================================
// CREATE ZONE
// POST /api/zones
// ==================================================

router.post("/", async (req, res) => {
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
      (
        zone_name,
        description,
        traffic_level,
        population,
        active_vehicles
      )
      VALUES (?, ?, ?, ?, ?)`,
      [
        zone_name,
        description || null,
        traffic_level || "Low",
        population || 0,
        active_vehicles || 0,
      ]
    );

    const [newZone] = await db.query(
      "SELECT * FROM zones WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Zone created successfully",
      data: newZone[0],
    });

  } catch (error) {
    console.error("CREATE ZONE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create zone",
      error: error.message,
    });
  }
});


// ==================================================
// UPDATE ZONE
// PUT /api/zones/:id
// ==================================================

router.put("/:id", async (req, res) => {
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

    const current = existing[0];

    await db.query(
      `UPDATE zones
       SET
         zone_name = ?,
         description = ?,
         traffic_level = ?,
         population = ?,
         active_vehicles = ?
       WHERE id = ?`,
      [
        zone_name ?? current.zone_name,
        description ?? current.description,
        traffic_level ?? current.traffic_level,
        population ?? current.population,
        active_vehicles ?? current.active_vehicles,
        id,
      ]
    );

    const [updatedZone] = await db.query(
      "SELECT * FROM zones WHERE id = ?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Zone updated successfully",
      data: updatedZone[0],
    });

  } catch (error) {
    console.error("UPDATE ZONE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update zone",
      error: error.message,
    });
  }
});


// ==================================================
// DELETE ZONE
// DELETE /api/zones/:id
// ==================================================

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

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
      "DELETE FROM zones WHERE id = ?",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Zone deleted successfully",
    });

  } catch (error) {
    console.error("DELETE ZONE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete zone",
      error: error.message,
    });
  }
});


// ==================================================
// EXPORT ROUTER
// ==================================================

module.exports = router;