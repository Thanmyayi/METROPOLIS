const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { testDatabaseConnection } = require("./config/db");

const vehicleRoutes = require("./routes/vehicleRoutes");
const trafficRoutes = require("./routes/trafficRoutes");
const incidentRoutes = require("./routes/incidentRoutes");
const zoneRoutes = require("./routes/zoneRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root API
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "METROPOLIS Backend is running",
    version: "1.0.0",
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "online",
    service: "METROPOLIS API",
  });
});

// API Routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/traffic", trafficRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/zones", zoneRoutes);

// Start server
app.listen(PORT, async () => {
  console.log("----------------------------------------");
  console.log("METROPOLIS Backend");
  console.log("----------------------------------------");
  console.log(`Server running on: http://localhost:${PORT}`);
  console.log(
    `Health check: http://localhost:${PORT}/api/health`
  );
  console.log(
    `Vehicle API: http://localhost:${PORT}/api/vehicles`
  );
  console.log(
    `Traffic API: http://localhost:${PORT}/api/traffic`
  );
  console.log(
    `Incident API: http://localhost:${PORT}/api/incidents`
  );
  console.log(
    `Zone API: http://localhost:${PORT}/api/zones`
  );
  console.log("----------------------------------------");

  await testDatabaseConnection();
});