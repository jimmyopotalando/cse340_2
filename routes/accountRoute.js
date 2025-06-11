/* ************************************
 *  Account routes
 *  Unit 4 and 5 activities
 ************************************/

// Needed Resources
const express = require("express")
const router = express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require("../utilities/account-validation")
const validate = require("../utilities/accountValidation") // Used for update routes

// Deliver Login View
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Deliver Registration View
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Process Registration
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process Login
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

// Show Update View
router.get("/update/:account_id", accountController.getUpdateView)

// Process Account Data Update
router.post(
  "/update-account",
  validate.accountUpdateRules(),
  validate.checkAccountUpdateData,
  accountController.updateAccount
)

// Process Password Update
router.post(
  "/update-password",
  validate.passwordRules(),
  validate.checkPasswordData,
  accountController.updatePassword
)

// Logout
router.get("/logout", accountController.logout)

module.exports = router
