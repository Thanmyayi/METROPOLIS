const mysql = require("mysql2/promise");
require("dotenv").config();

console.log("Checking database environment...");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);
console.log(
  "DB_PASSWORD:",
  process.env.DB_PASSWORD
    ? "Loaded"
    : "NOT LOADED"
);

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "metropolis_db",

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testDatabaseConnection() {
  let connection;

  try {
    connection = await pool.getConnection();

    await connection.query("SELECT 1");

    console.log("MySQL database connected successfully");

    return true;
  } catch (error) {
    console.error("MySQL connection failed:");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);

    return false;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = {
  pool,
  testDatabaseConnection,
};