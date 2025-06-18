/* ************************************
 *  Account routes
 *  Unit 4, deliver login view activity
 ************************************/
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const accountsController = require("../controllers/accountsController")
const utilities = require("../utilities")
const regValidate = require("../utilities/account-validation")
const checkJWT = require('../middleware/checkJWT') // middleware to populate req.account

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

// Account Management & Update Views
router.get('/manage', checkJWT, accountsController.accountManagementView)
router.get('/update/:id', checkJWT, accountsController.accountUpdateView)

module.exports = router
