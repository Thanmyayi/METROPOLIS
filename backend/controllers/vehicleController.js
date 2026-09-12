const vehicleModel = require("../models/vehicleModel");

// GET /api/vehicles
async function getAllVehicles(req, res) {
  try {
    const vehicles = await vehicleModel.getAllVehicles();

    res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles,
    });
  } catch (error) {
    console.error("Error fetching vehicles:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicles",
      error: error.message,
    });
  }
}

// GET /api/vehicles/:vehicleId
async function getVehicleById(req, res) {
  try {
    const { vehicleId } = req.params;

    const vehicle = await vehicleModel.getVehicleById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: `Vehicle ${vehicleId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    console.error("Error fetching vehicle:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicle",
      error: error.message,
    });
  }
}

// GET /api/vehicles/search?query=...
async function searchVehicles(req, res) {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const vehicles = await vehicleModel.searchVehicles(query.trim());

    res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles,
    });
  } catch (error) {
    console.error("Error searching vehicles:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to search vehicles",
      error: error.message,
    });
  }
}

// POST /api/vehicles
async function createVehicle(req, res) {
  try {
    const {
      vehicle_id,
      plate_number,
      vehicle_type,
      model,
      road,
      zone,
      speed,
      direction,
      status,
      latitude,
      longitude,
    } = req.body;

    // Required fields
    if (!vehicle_id || !plate_number || !vehicle_type) {
      return res.status(400).json({
        success: false,
        message:
          "vehicle_id, plate_number and vehicle_type are required",
      });
    }

    const vehicleId = await vehicleModel.createVehicle({
      vehicle_id,
      plate_number,
      vehicle_type,
      model,
      road,
      zone,
      speed,
      direction,
      status,
      latitude,
      longitude,
    });

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      id: vehicleId,
    });
  } catch (error) {
    console.error("Error creating vehicle:", error.message);

    // Duplicate vehicle ID or number plate
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message:
          "Vehicle ID or number plate already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create vehicle",
      error: error.message,
    });
  }
}

// PUT /api/vehicles/:vehicleId
async function updateVehicle(req, res) {
  try {
    const { vehicleId } = req.params;

    const {
      plate_number,
      vehicle_type,
      model,
      road,
      zone,
      speed,
      direction,
      status,
      latitude,
      longitude,
    } = req.body;

    const affectedRows = await vehicleModel.updateVehicle(
      vehicleId,
      {
        plate_number,
        vehicle_type,
        model,
        road,
        zone,
        speed,
        direction,
        status,
        latitude,
        longitude,
      }
    );

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Vehicle ${vehicleId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
    });
  } catch (error) {
    console.error("Error updating vehicle:", error.message);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Number plate already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update vehicle",
      error: error.message,
    });
  }
}

// DELETE /api/vehicles/:vehicleId
async function deleteVehicle(req, res) {
  try {
    const { vehicleId } = req.params;

    const affectedRows =
      await vehicleModel.deleteVehicle(vehicleId);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Vehicle ${vehicleId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting vehicle:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete vehicle",
      error: error.message,
    });
  }
}

module.exports = {
  getAllVehicles,
  getVehicleById,
  searchVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};