const trafficModel = require("../models/trafficModel");

// GET /api/traffic
async function getAllTraffic(req, res) {
  try {
    const traffic = await trafficModel.getAllTraffic();

    res.status(200).json({
      success: true,
      count: traffic.length,
      data: traffic,
    });
  } catch (error) {
    console.error("Error fetching traffic:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch traffic data",
      error: error.message,
    });
  }
}

// GET /api/traffic/:id
async function getTrafficById(req, res) {
  try {
    const { id } = req.params;

    const traffic = await trafficModel.getTrafficById(id);

    if (!traffic) {
      return res.status(404).json({
        success: false,
        message: `Traffic record ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: traffic,
    });
  } catch (error) {
    console.error("Error fetching traffic record:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch traffic record",
      error: error.message,
    });
  }
}

// GET /api/traffic/zone/:zoneName
async function getTrafficByZone(req, res) {
  try {
    const { zoneName } = req.params;

    const traffic = await trafficModel.getTrafficByZone(zoneName);

    res.status(200).json({
      success: true,
      count: traffic.length,
      zone: zoneName,
      data: traffic,
    });
  } catch (error) {
    console.error("Error fetching zone traffic:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch zone traffic",
      error: error.message,
    });
  }
}

// GET /api/traffic/road/:roadName
async function getTrafficByRoad(req, res) {
  try {
    const { roadName } = req.params;

    const traffic = await trafficModel.getTrafficByRoad(roadName);

    res.status(200).json({
      success: true,
      count: traffic.length,
      road: roadName,
      data: traffic,
    });
  } catch (error) {
    console.error("Error fetching road traffic:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch road traffic",
      error: error.message,
    });
  }
}

// POST /api/traffic
async function createTraffic(req, res) {
  try {
    const {
      road_name,
      zone_name,
      traffic_level,
      average_speed,
      vehicle_count,
      congestion_percentage,
    } = req.body;

    if (!road_name || !zone_name || !traffic_level) {
      return res.status(400).json({
        success: false,
        message:
          "road_name, zone_name and traffic_level are required",
      });
    }

    const trafficId = await trafficModel.createTraffic({
      road_name,
      zone_name,
      traffic_level,
      average_speed,
      vehicle_count,
      congestion_percentage,
    });

    res.status(201).json({
      success: true,
      message: "Traffic record created successfully",
      id: trafficId,
    });
  } catch (error) {
    console.error("Error creating traffic:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create traffic record",
      error: error.message,
    });
  }
}

// PUT /api/traffic/:id
async function updateTraffic(req, res) {
  try {
    const { id } = req.params;

    const {
      road_name,
      zone_name,
      traffic_level,
      average_speed,
      vehicle_count,
      congestion_percentage,
    } = req.body;

    const affectedRows = await trafficModel.updateTraffic(id, {
      road_name,
      zone_name,
      traffic_level,
      average_speed,
      vehicle_count,
      congestion_percentage,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Traffic record ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Traffic record updated successfully",
    });
  } catch (error) {
    console.error("Error updating traffic:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update traffic record",
      error: error.message,
    });
  }
}

// DELETE /api/traffic/:id
async function deleteTraffic(req, res) {
  try {
    const { id } = req.params;

    const affectedRows = await trafficModel.deleteTraffic(id);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Traffic record ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Traffic record deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting traffic:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete traffic record",
      error: error.message,
    });
  }
}

module.exports = {
  getAllTraffic,
  getTrafficById,
  getTrafficByZone,
  getTrafficByRoad,
  createTraffic,
  updateTraffic,
  deleteTraffic,
};