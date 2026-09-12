const { pool } = require("../config/db");

// Get all traffic records
async function getAllTraffic() {
  const [rows] = await pool.query(`
    SELECT
      id,
      road_name,
      zone_name,
      traffic_level,
      average_speed,
      vehicle_count,
      congestion_percentage,
      recorded_at
    FROM traffic
    ORDER BY recorded_at DESC
  `);

  return rows;
}

// Get traffic by ID
async function getTrafficById(id) {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      road_name,
      zone_name,
      traffic_level,
      average_speed,
      vehicle_count,
      congestion_percentage,
      recorded_at
    FROM traffic
    WHERE id = ?
    `,
    [id]
  );

  return rows[0];
}

// Get traffic by zone
async function getTrafficByZone(zoneName) {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      road_name,
      zone_name,
      traffic_level,
      average_speed,
      vehicle_count,
      congestion_percentage,
      recorded_at
    FROM traffic
    WHERE zone_name = ?
    ORDER BY recorded_at DESC
    `,
    [zoneName]
  );

  return rows;
}

// Get traffic by road
async function getTrafficByRoad(roadName) {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      road_name,
      zone_name,
      traffic_level,
      average_speed,
      vehicle_count,
      congestion_percentage,
      recorded_at
    FROM traffic
    WHERE road_name = ?
    ORDER BY recorded_at DESC
    `,
    [roadName]
  );

  return rows;
}

// Add traffic record
async function createTraffic(trafficData) {
  const {
    road_name,
    zone_name,
    traffic_level,
    average_speed,
    vehicle_count,
    congestion_percentage,
  } = trafficData;

  const [result] = await pool.query(
    `
    INSERT INTO traffic
    (
      road_name,
      zone_name,
      traffic_level,
      average_speed,
      vehicle_count,
      congestion_percentage
    )
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      road_name,
      zone_name,
      traffic_level,
      average_speed,
      vehicle_count,
      congestion_percentage,
    ]
  );

  return result.insertId;
}

// Update traffic record
async function updateTraffic(id, trafficData) {
  const {
    road_name,
    zone_name,
    traffic_level,
    average_speed,
    vehicle_count,
    congestion_percentage,
  } = trafficData;

  const [result] = await pool.query(
    `
    UPDATE traffic
    SET
      road_name = ?,
      zone_name = ?,
      traffic_level = ?,
      average_speed = ?,
      vehicle_count = ?,
      congestion_percentage = ?
    WHERE id = ?
    `,
    [
      road_name,
      zone_name,
      traffic_level,
      average_speed,
      vehicle_count,
      congestion_percentage,
      id,
    ]
  );

  return result.affectedRows;
}

// Delete traffic record
async function deleteTraffic(id) {
  const [result] = await pool.query(
    `
    DELETE FROM traffic
    WHERE id = ?
    `,
    [id]
  );

  return result.affectedRows;
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