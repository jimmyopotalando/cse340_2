// models/inventory-model.js

const pool = require("../database"); // Or "../db" — make sure this path is correct!

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

// Add a classification
async function addClassification(classification_name) {
  try {
    const sql = `
      INSERT INTO classification (classification_name)
      VALUES ($1) RETURNING *;
    `;
    const data = await pool.query(sql, [classification_name]);
    return data.rows[0];
  } catch (error) {
    console.error("Database insert error (addClassification):", error);
    return null;
  }
}

// Add a new vehicle to inventory
async function addInventory(data) {
  try {
    const sql = `
      INSERT INTO inventory (classification_id, inv_make, inv_model, inv_year, inv_description, 
        inv_image, inv_thumbnail, inv_price, inv_miles, inv_color) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *;
    `;
    const values = [
      data.classification_id,
      data.inv_make,
      data.inv_model,
      data.inv_year,
      data.inv_description,
      data.inv_image,
      data.inv_thumbnail,
      data.inv_price,
      data.inv_miles,
      data.inv_color
    ];
    const result = await pool.query(sql, values);
    return result.rows[0];
  } catch (error) {
    console.error("DB Error (addInventory):", error);
    return null;
  }
}

// Export all functions from a single place
module.exports = {
  getClassifications,
  getInventoryById,
  addClassification,
  addInventory
};
