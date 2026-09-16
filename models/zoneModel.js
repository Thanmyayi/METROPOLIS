const { pool } = require("../config/db");

// Get all zones
async function getAllZones() {
  const [rows] = await pool.query(`
    SELECT
      id,
      zone_name,
      description,
      traffic_level,
      population,
      active_vehicles,
      created_at
    FROM zones
    ORDER BY zone_name
  `);

  return rows;
}

// Get one zone by ID
async function getZoneById(id) {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      zone_name,
      description,
      traffic_level,
      population,
      active_vehicles,
      created_at
    FROM zones
    WHERE id = ?
    `,
    [id]
  );

  return rows[0];
}

// Get zone by zone name
async function getZoneByName(zoneName) {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      zone_name,
      description,
      traffic_level,
      population,
      active_vehicles,
      created_at
    FROM zones
    WHERE zone_name = ?
    `,
    [zoneName]
  );

  return rows[0];
}

// Create a new zone
async function createZone(zoneData) {
  const {
    zone_name,
    description,
    traffic_level,
    population,
    active_vehicles,
  } = zoneData;

  const [result] = await pool.query(
    `
    INSERT INTO zones
    (
      zone_name,
      description,
      traffic_level,
      population,
      active_vehicles
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      zone_name,
      description,
      traffic_level,
      population,
      active_vehicles,
    ]
  );

  return result.insertId;
}

// Update a zone
async function updateZone(id, zoneData) {
  const {
    zone_name,
    description,
    traffic_level,
    population,
    active_vehicles,
  } = zoneData;

  const [result] = await pool.query(
    `
    UPDATE zones
    SET
      zone_name = ?,
      description = ?,
      traffic_level = ?,
      population = ?,
      active_vehicles = ?
    WHERE id = ?
    `,
    [
      zone_name,
      description,
      traffic_level,
      population,
      active_vehicles,
      id,
    ]
  );

  return result.affectedRows;
}

// Delete a zone
async function deleteZone(id) {
  const [result] = await pool.query(
    `
    DELETE FROM zones
    WHERE id = ?
    `,
    [id]
  );

  return result.affectedRows;
}

module.exports = {
  getAllZones,
  getZoneById,
  getZoneByName,
  createZone,
  updateZone,
  deleteZone,
};