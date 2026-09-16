const { pool } = require("../config/db");

// Get all incidents
async function getAllIncidents() {
  const [rows] = await pool.query(`
    SELECT
      id,
      incident_type,
      description,
      road_name,
      zone_name,
      severity,
      latitude,
      longitude,
      status,
      reported_at,
      resolved_at
    FROM incidents
    ORDER BY reported_at DESC
  `);

  return rows;
}

// Get one incident by ID
async function getIncidentById(id) {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      incident_type,
      description,
      road_name,
      zone_name,
      severity,
      latitude,
      longitude,
      status,
      reported_at,
      resolved_at
    FROM incidents
    WHERE id = ?
    `,
    [id]
  );

  return rows[0];
}

// Get incidents by zone
async function getIncidentsByZone(zoneName) {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      incident_type,
      description,
      road_name,
      zone_name,
      severity,
      latitude,
      longitude,
      status,
      reported_at,
      resolved_at
    FROM incidents
    WHERE zone_name = ?
    ORDER BY reported_at DESC
    `,
    [zoneName]
  );

  return rows;
}

// Get incidents by status
async function getIncidentsByStatus(status) {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      incident_type,
      description,
      road_name,
      zone_name,
      severity,
      latitude,
      longitude,
      status,
      reported_at,
      resolved_at
    FROM incidents
    WHERE status = ?
    ORDER BY reported_at DESC
    `,
    [status]
  );

  return rows;
}

// Create a new incident
async function createIncident(incidentData) {
  const {
    incident_type,
    description,
    road_name,
    zone_name,
    severity,
    latitude,
    longitude,
    status,
  } = incidentData;

  const [result] = await pool.query(
    `
    INSERT INTO incidents
    (
      incident_type,
      description,
      road_name,
      zone_name,
      severity,
      latitude,
      longitude,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      incident_type,
      description,
      road_name,
      zone_name,
      severity,
      latitude,
      longitude,
      status,
    ]
  );

  return result.insertId;
}

// Update an incident
async function updateIncident(id, incidentData) {
  const {
    incident_type,
    description,
    road_name,
    zone_name,
    severity,
    latitude,
    longitude,
    status,
  } = incidentData;

  const [result] = await pool.query(
    `
    UPDATE incidents
    SET
      incident_type = ?,
      description = ?,
      road_name = ?,
      zone_name = ?,
      severity = ?,
      latitude = ?,
      longitude = ?,
      status = ?,
      resolved_at =
        CASE
          WHEN ? = 'Resolved' THEN CURRENT_TIMESTAMP
          ELSE NULL
        END
    WHERE id = ?
    `,
    [
      incident_type,
      description,
      road_name,
      zone_name,
      severity,
      latitude,
      longitude,
      status,
      status,
      id,
    ]
  );

  return result.affectedRows;
}

// Delete an incident
async function deleteIncident(id) {
  const [result] = await pool.query(
    `
    DELETE FROM incidents
    WHERE id = ?
    `,
    [id]
  );

  return result.affectedRows;
}

module.exports = {
  getAllIncidents,
  getIncidentById,
  getIncidentsByZone,
  getIncidentsByStatus,
  createIncident,
  updateIncident,
  deleteIncident,
};