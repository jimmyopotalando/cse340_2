const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = '<ul class="navigationul">'
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid
  if (data.length > 0) {
    grid = '<ul id="inv-display">'
    data.forEach((vehicle) => {
      grid += '<li>'
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        ' ' +
        vehicle.inv_model +
        ' details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        ' ' +
        vehicle.inv_model +
        ' on CSE Motors"></a>'
      grid += '<div class="namePrice">'
      grid += '<hr>'
      grid += '<h2>'
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        ' ' +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        ' ' +
        vehicle.inv_model +
        '</a>'
      grid += '</h2>'
      grid +=
        '<span>$' +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
 * Build the classification dropdown <select>
 * ************************************ */
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (classification_id != null && row.classification_id == classification_id) {
      classificationList += " selected"
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}

/* **************************************
 * Build the inventory detail HTML
 * ************************************ */
Util.buildSingleVehicleDisplay = async function (data) {
  let grid = '<section id="vehicle-display">'
  grid += `<div>`
  grid += '<section class="imagePrice">'
  grid += `<img src="${data.inv_image}" alt="Image of ${data.inv_make} ${data.inv_model}">`
  grid += '</section>'
  grid += '<section class="vehicleDetail">'
  grid += `<h3>${data.inv_make} ${data.inv_model} Details</h3>`
  grid += '<ul id="vehicle-details">'
  grid += `<li><h4>Price: $${new Intl.NumberFormat("en-US").format(data.inv_price)}</h4></li>`
  grid += `<li><h4>Description:</h4> ${data.inv_description}</li>`
  grid += `<li><h4>Color:</h4> ${data.inv_color}</li>`
  grid += `<li><h4>Miles:</h4> ${new Intl.NumberFormat("en-US").format(data.inv_miles)}</li>`
  grid += "</ul>"
  grid += "</section>"
  grid += `</div>`
  grid += '</section>'
  return grid
}

/* ****************************************
 * Middleware For Handling Errors
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util

const jwt = require("jsonwebtoken")
require("dotenv").config()

function checkLogin(req, res, next) {
  const token = req.cookies.jwt
  if (!token) {
    res.locals.loggedin = false
    return next()
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, accountData) {
    if (err) {
      res.locals.loggedin = false
      return next()
    }

    res.locals.loggedin = true
    res.locals.accountData = accountData // Make name & id available
    next()
  })
}

module.exports = {
  checkLogin,
  // ... other exports
}





