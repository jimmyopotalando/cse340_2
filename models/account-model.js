/* ***************************
 *  Account Model
 *  Handles user account DB operations
 * ************************** */

const pool = require("../database") // Corrected import path

/* *****************************
 *  Register new account
 * *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password) {
  try {
    const sql = `
      INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type)
      VALUES ($1, $2, $3, $4, 'Client')
      RETURNING *;
    `
    const result = await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
    return result.rows[0]
  } catch (error) {
    console.error("Registration Error:", error)
    return null
  }
}

/* **********************
 *  Check for existing email
 * ********************* */
async function checkExistingEmail(account_email) {
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1"
    const result = await pool.query(sql, [account_email])
    return result.rowCount > 0
  } catch (error) {
    console.error("Email Check Error:", error)
    return false
  }
}

/* **********************
 *  Get account by ID
 * ********************* */
async function getAccountById(account_id) {
  try {
    const sql = "SELECT * FROM account WHERE account_id = $1"
    const result = await pool.query(sql, [account_id])
    return result.rows[0]
  } catch (error) {
    console.error("Get Account Error:", error)
    return null
  }
}

/* **********************
 *  Update account info (name/email)
 * ********************* */
async function updateAccountInfo(account_id, firstname, lastname, email) {
  try {
    const sql = `
      UPDATE account
      SET account_firstname = $1, account_lastname = $2, account_email = $3
      WHERE account_id = $4
      RETURNING *;
    `
    const result = await pool.query(sql, [firstname, lastname, email, account_id])
    return result.rowCount > 0
  } catch (error) {
    console.error("Update Info Error:", error)
    return false
  }
}

/* **********************
 *  Update password (hashed)
 * ********************* */
async function updatePassword(account_id, hashedPassword) {
  try {
    const sql = `
      UPDATE account
      SET account_password = $1
      WHERE account_id = $2
      RETURNING *;
    `
    const result = await pool.query(sql, [hashedPassword, account_id])
    return result.rowCount > 0
  } catch (error) {
    console.error("Update Password Error:", error)
    return false
  }
}

/* **********************
 *  Export all model functions
 * ********************* */
module.exports = {
  registerAccount,
  checkExistingEmail,
  getAccountById,
  updateAccountInfo,
  updatePassword
}
