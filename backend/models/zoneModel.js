const { pool } = require("../config/db");

// ======================================================
// GET ALL ZONES
// ======================================================

async function getAllZones() {
  const [rows] = await pool.query(`
    SELECT
      id,
      zone_name,
      description,
      traffic_level,
      population,
      active_vehicles
    FROM zones
    ORDER BY id ASC
  `);

  return rows;
}

// ======================================================
// GET ZONE BY ID
// ======================================================

async function getZoneById(id) {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      zone_name,
      description,
      traffic_level,
      population,
      active_vehicles
    FROM zones
    WHERE id = ?
    `,
    [id]
  );

  return rows[0];
}

// ======================================================
// CREATE ZONE
// ======================================================

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

// ======================================================
// UPDATE ZONE
// ======================================================

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

// ======================================================
// DELETE ZONE
// ======================================================

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

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  getAllZones,
  getZoneById,
  createZone,
  updateZone,
  deleteZone,
};