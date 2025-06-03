// models/inventory-model.js

const pool = require("../database");

// Get all vehicle classifications for navigation
async function getClassifications() {
  try {
    const sql = "SELECT classification_id, classification_name FROM classification ORDER BY classification_name";
    const data = await pool.query(sql);
    return data.rows;
  } catch (error) {
    console.error("Error in getClassifications:", error);
    throw error;
  }
}

// Get inventory item by ID
async function getInventoryById(invId) {
  try {
    const sql = "SELECT * FROM inventory WHERE inv_id = $1";
    const data = await pool.query(sql, [invId]);
    return data.rows[0];
  } catch (error) {
    console.error("Error in getInventoryById:", error);
    throw error;
  }
}

module.exports = {
  getClassifications,
  getInventoryById,
};
