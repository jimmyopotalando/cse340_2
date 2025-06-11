/* ************************************
 *  Account Controller
 *  Unit 4 & 5 Activities
 ************************************/

const utilities = require('../utilities')
const accountModel = require('../models/account-model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const accountController = {}

/* ****************************************
*  Deliver login view
* *************************************** */
accountController.buildLogin = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./account/login", {
    title: "Login",
    nav,
  })
}

/* ****************************************
*  Deliver registration view
* *************************************** */
accountController.buildRegister = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./account/register", {
    title: "Register",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Process Registration
* *************************************** */
accountController.registerAccount = async function (req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    return res.status(500).render("./account/register", {
      title: "Registration",
      nav,
      errors: null
    })
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash("notice", `Congratulations, you're registered, ${account_firstname}. Please log in.`)
    res.status(201).render("./account/login", {
      title: "Login",
      nav,
      errors: null
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("./account/register", {
      title: "Registration",
      nav,
      errors: null
    })
  }
}

/* ****************************************
*  Build Account Management View
* *************************************** */
accountController.buildAccountManagement = async function (req, res) {
  try {
    const accountData = res.locals.accountData
    res.render("account/management", {
      title: "Account Management",
      accountData,
    })
  } catch (err) {
    console.error("Error loading management view:", err)
    res.redirect("/account/login")
  }
}

/* ****************************************
*  Show Update View
* *************************************** */
accountController.getUpdateView = async function (req, res) {
  const account_id = req.params.account_id
  const accountData = await accountModel.getAccountById(account_id)

  res.render("account/update", {
    title: "Update Account",
    accountData,
    errors: req.flash("errors"),
    message: req.flash("message")
  })
}

/* ****************************************
*  Process Account Data Update
* *************************************** */
accountController.updateAccount = async function (req, res) {
  const { account_id, firstname, lastname, email } = req.body
  const updateResult = await accountModel.updateAccount(account_id, firstname, lastname, email)

  if (updateResult) {
    req.flash("message", "Account updated successfully.")
  } else {
    req.flash("message", "Account update failed.")
  }

  const accountData = await accountModel.getAccountById(account_id)
  res.render("account/management", {
    title: "Account Management",
    accountData,
    message: req.flash("message")
  })
}

/* ****************************************
*  Process Password Update
* *************************************** */
accountController.updatePassword = async function (req, res) {
  const { account_id, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const updateResult = await accountModel.updatePassword(account_id, hashedPassword)

    if (updateResult) {
      req.flash("message", "Password updated successfully.")
    } else {
      req.flash("message", "Password update failed.")
    }

    const accountData = await accountModel.getAccountById(account_id)
    res.render("account/management", {
      title: "Account Management",
      accountData,
      message: req.flash("message")
    })
  } catch (error) {
    req.flash("message", "An error occurred.")
    res.redirect(`/account/update/${account_id}`)
  }
}

/* ****************************************
*  Logout Controller
* *************************************** */
accountController.logout = function (req, res) {
  res.clearCookie("jwt") // Deletes the token
  req.flash("notice", "You have been logged out.")
  res.redirect("/")
}

module.exports = accountController
