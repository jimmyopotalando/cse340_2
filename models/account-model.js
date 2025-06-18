/* ***************************
 *  Account model
 *  Unit 4, Process Registration Activity
 * ************************** */
const pool = require("../database/")

/* *****************************
 *  Register new account
 *  Unit 4, Process Registration Activity
 * *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password) {
  try {
    const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
    return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
  } catch (error) {
    return error.message
  }
}

/* **********************
 *  Check for existing email
 *  Unit 4, Stickiness Activity
 * ********************* */
async function checkExistingEmail(account_email) {
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1"
    const email = await pool.query(sql, [account_email])
    return email.rowCount
  } catch (error) {
    return error.message
  }
}

module.exports = { registerAccount, checkExistingEmail }

const pool = require('../db/connection') // your DB connection setup

// Get account info by ID
async function getAccountById(account_id) {
  const sql = 'SELECT * FROM account WHERE account_id = $1'
  const result = await pool.query(sql, [account_id])
  return result.rows[0]
}

// Update account info (firstname, lastname, email)
async function updateAccountInfo(account_id, firstname, lastname, email) {
  const sql = `
    UPDATE account
    SET firstname = $1, lastname = $2, email = $3
    WHERE account_id = $4
    RETURNING *;
  `
  const result = await pool.query(sql, [firstname, lastname, email, account_id])
  return result.rowCount > 0
}

// Update password (hashed)
async function updatePassword(account_id, hashedPassword) {
  const sql = `
    UPDATE account
    SET password = $1
    WHERE account_id = $2
    RETURNING *;
  `
  const result = await pool.query(sql, [hashedPassword, account_id])
  return result.rowCount > 0
}

module.exports = {
  getAccountById,
  updateAccountInfo,
  updatePassword,
}
