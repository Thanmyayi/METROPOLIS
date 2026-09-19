const { pool } = require("../config/db");

// ======================================================
// GET ALL ZONES
// ======================================================

const getZones = async (req, res) => {
    try {
        const [zones] = await pool.query(
            "SELECT * FROM zones ORDER BY id ASC"
        );

        res.status(200).json({
            success: true,
            message: "Zones fetched successfully",
            count: zones.length,
            data: zones
        });
    } catch (error) {
        console.error("Zone fetch error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch zones",
            error: error.message
        });
    }
};

// ======================================================
// GET ZONE BY ID
// ======================================================

const getZoneById = async (req, res) => {
    try {
        const { id } = req.params;

        const [zones] = await pool.query(
            "SELECT * FROM zones WHERE id = ?",
            [id]
        );

        if (zones.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Zone not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Zone fetched successfully",
            data: zones[0]
        });
    } catch (error) {
        console.error("Zone fetch by ID error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch zone",
            error: error.message
        });
    }
};

// ======================================================
// CREATE ZONE
// ======================================================

const createZone = async (req, res) => {
    try {
        const {
            zone_name,
            description,
            traffic_level,
            population,
            active_vehicles
        } = req.body;

        if (!zone_name) {
            return res.status(400).json({
                success: false,
                message: "zone_name is required"
            });
        }

        const [result] = await pool.query(
            `INSERT INTO zones
            (zone_name, description, traffic_level, population, active_vehicles)
            VALUES (?, ?, ?, ?, ?)`,
            [
                zone_name,
                description || null,
                traffic_level || "Low",
                population || 0,
                active_vehicles || 0
            ]
        );

        res.status(201).json({
            success: true,
            message: "Zone created successfully",
            data: {
                id: result.insertId,
                zone_name,
                description,
                traffic_level: traffic_level || "Low",
                population: population || 0,
                active_vehicles: active_vehicles || 0
            }
        });
    } catch (error) {
        console.error("Zone creation error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create zone",
            error: error.message
        });
    }
};

// ======================================================
// UPDATE ZONE
// ======================================================

const updateZone = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            zone_name,
            description,
            traffic_level,
            population,
            active_vehicles
        } = req.body;

        const [result] = await pool.query(
            `UPDATE zones
             SET zone_name = ?,
                 description = ?,
                 traffic_level = ?,
                 population = ?,
                 active_vehicles = ?
             WHERE id = ?`,
            [
                zone_name,
                description,
                traffic_level,
                population,
                active_vehicles,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Zone not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Zone updated successfully"
        });
    } catch (error) {
        console.error("Zone update error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update zone",
            error: error.message
        });
    }
};

// ======================================================
// DELETE ZONE
// ======================================================

const deleteZone = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            "DELETE FROM zones WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Zone not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Zone deleted successfully"
        });
    } catch (error) {
        console.error("Zone deletion error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete zone",
            error: error.message
        });
    }
};

// ======================================================
// EXPORT CONTROLLERS
// ======================================================

module.exports = {
    getZones,
    getZoneById,
    createZone,
    updateZone,
    deleteZone
};