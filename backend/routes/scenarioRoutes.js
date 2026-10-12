const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// Database
const { pool } = require("./config/db");

// Routes
const vehicleRoutes = require("./routes/vehicleRoutes");
const trafficRoutes = require("./routes/trafficRoutes");
const incidentRoutes = require("./routes/incidentRoutes");
const zoneRoutes = require("./routes/zoneRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
    cors({
        origin: "http://localhost:5174",
        credentials: true
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "METROPOLIS Backend API is running",
        version: "1.0.0",
        status: "online"
    });
});

// Health check
app.get("/api/health", async (req, res) => {
    try {
        await pool.query("SELECT 1");

        res.status(200).json({
            success: true,
            message: "METROPOLIS Backend and MySQL are working",
            database: "connected",
            server: "running"
        });
    } catch (error) {
        console.error("Health check database error:", error.message);

        res.status(500).json({
            success: false,
            message: "Backend is running but MySQL connection failed",
            database: "disconnected",
            error: error.message
        });
    }
});

// API routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/traffic", trafficRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/zones", zoneRoutes);
app.use("/api/analytics", analyticsRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found",
        path: req.originalUrl
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Server error:", err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });
});

// Start server
const startServer = async () => {
    try {
        await pool.query("SELECT 1");

        console.log("----------------------------------------");
        console.log("METROPOLIS Backend");
        console.log("----------------------------------------");
        console.log("MySQL database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on: http://localhost:${PORT}`);
            console.log(`Health check: http://localhost:${PORT}/api/health`);
            console.log(`Vehicle API: http://localhost:${PORT}/api/vehicles`);
            console.log(`Traffic API: http://localhost:${PORT}/api/traffic`);
            console.log(`Incident API: http://localhost:${PORT}/api/incidents`);
            console.log(`Zone API: http://localhost:${PORT}/api/zones`);
            console.log(`Analytics API: http://localhost:${PORT}/api/analytics`);
            console.log("----------------------------------------");
        });
    } catch (error) {
        console.error("----------------------------------------");
        console.error("METROPOLIS Backend failed to start");
        console.error("MySQL connection error:", error.message);
        console.error("----------------------------------------");
        process.exitCode = 1;
    }
};

startServer();