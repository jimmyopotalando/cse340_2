const pool = require('../database/');

async function getInventoryById(invId) {
  try {
    const sql = 'SELECT * FROM inventory WHERE inv_id = $1';
    const data = await pool.query(sql, [invId]);
    return data.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = { getInventoryById };
