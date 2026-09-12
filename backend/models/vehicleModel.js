const { pool } = require("../config/db");

// Get all vehicles
async function getAllVehicles() {
  const [rows] = await pool.query(`
    SELECT
      id,
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
      last_updated,
      created_at
    FROM vehicles
    ORDER BY vehicle_id
  `);

  return rows;
}

// Get one vehicle by Vehicle ID
async function getVehicleById(vehicleId) {
  const [rows] = await pool.query(
    `
    SELECT
      id,
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
      last_updated,
      created_at
    FROM vehicles
    WHERE vehicle_id = ?
    `,
    [vehicleId]
  );

  return rows[0];
}

// Search vehicles
async function searchVehicles(searchTerm) {
  const searchPattern = `%${searchTerm}%`;

  const [rows] = await pool.query(
    `
    SELECT
      id,
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
      last_updated,
      created_at
    FROM vehicles
    WHERE
      vehicle_id LIKE ?
      OR plate_number LIKE ?
      OR vehicle_type LIKE ?
      OR model LIKE ?
      OR road LIKE ?
      OR zone LIKE ?
      OR direction LIKE ?
      OR status LIKE ?
    ORDER BY vehicle_id
    `,
    [
      searchPattern,
      searchPattern,
      searchPattern,
      searchPattern,
      searchPattern,
      searchPattern,
      searchPattern,
      searchPattern,
    ]
  );

  return rows;
}

// Add a new vehicle
async function createVehicle(vehicleData) {
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
  } = vehicleData;

  const [result] = await pool.query(
    `
    INSERT INTO vehicles
    (
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
      longitude
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
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
    ]
  );

  return result.insertId;
}

// Update vehicle
async function updateVehicle(vehicleId, vehicleData) {
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
  } = vehicleData;

  const [result] = await pool.query(
    `
    UPDATE vehicles
    SET
      plate_number = ?,
      vehicle_type = ?,
      model = ?,
      road = ?,
      zone = ?,
      speed = ?,
      direction = ?,
      status = ?,
      latitude = ?,
      longitude = ?
    WHERE vehicle_id = ?
    `,
    [
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
      vehicleId,
    ]
  );

  return result.affectedRows;
}

// Delete vehicle
async function deleteVehicle(vehicleId) {
  const [result] = await pool.query(
    `
    DELETE FROM vehicles
    WHERE vehicle_id = ?
    `,
    [vehicleId]
  );

  return result.affectedRows;
}

module.exports = {
  getAllVehicles,
  getVehicleById,
  searchVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};