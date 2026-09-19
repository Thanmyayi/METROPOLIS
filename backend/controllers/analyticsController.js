const { pool } = require("../config/db");

// ======================================================
// GET ANALYTICS
// ======================================================

const getAnalytics = async (req, res) => {
    try {
        const [analytics] = await pool.query(
            "SELECT * FROM analytics ORDER BY id DESC LIMIT 50"
        );

        res.status(200).json({
            success: true,
            message: "Analytics fetched successfully",
            count: analytics.length,
            data: analytics
        });
    } catch (error) {
        console.error("Analytics error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch analytics",
            error: error.message
        });
    }
};

// ======================================================
// GET ANALYTICS SUMMARY
// ======================================================

const getAnalyticsSummary = async (req, res) => {
    try {
        const [vehicles] = await pool.query(
            "SELECT COUNT(*) AS total_vehicles FROM vehicles"
        );

        const [incidents] = await pool.query(
            "SELECT COUNT(*) AS total_incidents FROM incidents"
        );

        const [zones] = await pool.query(
            "SELECT COUNT(*) AS total_zones FROM zones"
        );

        res.status(200).json({
            success: true,
            message: "Analytics summary fetched successfully",
            data: {
                totalVehicles: vehicles[0].total_vehicles,
                totalIncidents: incidents[0].total_incidents,
                totalZones: zones[0].total_zones
            }
        });
    } catch (error) {
        console.error("Analytics summary error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch analytics summary",
            error: error.message
        });
    }
};

module.exports = {
    getAnalytics,
    getAnalyticsSummary
};