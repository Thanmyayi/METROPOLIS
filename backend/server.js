const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { testDatabaseConnection } = require("./config/db");

const vehicleRoutes = require("./routes/vehicleRoutes");
const trafficRoutes = require("./routes/trafficRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());

// ==========================================
// ROOT ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "METROPOLIS Backend is running",
    version: "1.0.0",
  });
});

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "online",
    service: "METROPOLIS API",
  });
});

// ==========================================
// VEHICLE API
// ==========================================

app.use("/api/vehicles", vehicleRoutes);

// ==========================================
// TRAFFIC API
// ==========================================

app.use("/api/traffic", trafficRoutes);

// ==========================================
// START SERVER
// ==========================================

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
  console.log("----------------------------------------");

  await testDatabaseConnection();
});