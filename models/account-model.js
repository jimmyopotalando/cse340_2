/* ***************************
 *  Account model
 *  Unit 4, Process Registration Activity
 * ************************** */

const pool = require("../database/")

/* *****************************
*   Register new account
 *  Unit 4, Process Registration Activity
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
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
async function checkExistingEmail(account_email){
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1"
    const email = await pool.query(sql, [account_email])
    return email.rowCount
  } catch (error) {
    return error.message
  }
}
module.exports = { registerAccount, checkExistingEmail }






const pool = require("../db/");

async function getAccountById(account_id) {
  const result = await pool.query(
    "SELECT account_id, firstname, lastname, email, account_type FROM account WHERE account_id = $1",
    [account_id]
  );
  return result.rows[0];
}



async function updateAccount(account_id, firstname, lastname, email) {
  const result = await pool.query(
    `UPDATE account 
     SET firstname = $1, lastname = $2, email = $3 
     WHERE account_id = $4`,
    [firstname, lastname, email, account_id]
  );
  return result.rowCount > 0;
}




async function updatePassword(account_id, hashedPassword) {
  const result = await pool.query(
    `UPDATE account 
     SET password = $1 
     WHERE account_id = $2`,
    [hashedPassword, account_id]
  );
  return result.rowCount > 0;
}
