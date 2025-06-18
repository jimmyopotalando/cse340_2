const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

// Classification view
invCont.buildByClassificationId = async function (req, res) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const nav = await utilities.getNav()

  if (!data || data.length === 0) {
    return res.render("./inventory/classification", {
      title: "NO VEHICLES FOUND",
      nav,
      grid: "No vehicles found in this classification."
    })
  }

  const grid = await utilities.buildClassificationGrid(data)
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: `${className} vehicles`,
    nav,
    grid
  })
}

// Detail view
invCont.buildDetail = async function (req, res) {
  const invId = req.params.id
  const vehicle = await invModel.getInventoryById(invId)
  const htmlData = await utilities.buildSingleVehicleDisplay(vehicle)
  const nav = await utilities.getNav()
  const title = `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`

  res.render("./inventory/detail", {
    title,
    nav,
    htmlData,
    message: null
  })
}

// Error test
invCont.throwError = function () {
  throw new Error("This is a test error.")
}

// Management view
invCont.buildManagementView = async function (req, res) {
  const nav = await utilities.getNav()
  const classificationSelect = await utilities.buildClassificationList()
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null,
    classificationSelect
  })
}

// New classification view
invCont.newClassificationView = async function (req, res) {
  const nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null
  })
}

// Add classification
invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body
  const insertResult = await invModel.addClassification(classification_name)
  const nav = await utilities.getNav()

  if (insertResult) {
    req.flash("message success", `The ${insertResult.classification_name} classification was successfully added.`)
    return res.status(201).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
      classificationSelect: await utilities.buildClassificationList()
    })
  }

  req.flash("message warning", "Classification insert failed.")
  res.status(500).render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null
  })
}

// New inventory view
invCont.newInventoryView = async function (req, res) {
  const nav = await utilities.getNav()
  const classificationSelect = await utilities.buildClassificationList()
  res.render("./inventory/add-inventory", {
    title: "Add New Inventory",
    nav,
    classificationSelect,
    errors: null
  })
}

// Add inventory
invCont.addInventory = async function (req, res) {
  const {
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  } = req.body

  const insertResult = await invModel.addInventory(
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  const nav = await utilities.getNav()

  if (insertResult) {
    req.flash("message success", `${insertResult.inv_make} ${insertResult.inv_model} was added.`)
    res.status(201).render("./inventory/management", {
      title: "Inventory Management",
      nav,
      classificationSelect: await utilities.buildClassificationList(),
      errors: null
    })
  } else {
    req.flash("message warning", "Vehicle insert failed.")
    res.status(500).render("./inventory/add-inventory", {
      title: "Add New Inventory",
      nav,
      classificationSelect: await utilities.buildClassificationList(),
      errors: null
    })
  }
}

// JSON for inventory by classification
invCont.getInventoryJSON = async function (req, res, next) {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData && invData.length > 0) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

// Edit inventory view
invCont.editInvItemView = async function (req, res) {
  const inv_id = parseInt(req.params.inv_id)
  const invData = await invModel.getInventoryById(inv_id)
  const nav = await utilities.getNav()
  const classificationSelect = await utilities.buildClassificationList(invData.classification_id)

  const itemName = `${invData.inv_make} ${invData.inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect,
    errors: null,
    ...invData
  })
}

// Update inventory item
invCont.updateInventory = async function (req, res) {
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  } = req.body

  const updateResult = await invModel.updateInventory(
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    req.flash("message success", `${inv_make} ${inv_model} was successfully updated.`)
    return res.redirect("/inv/")
  }

  const nav = await utilities.getNav()
  const classificationSelect = await utilities.buildClassificationList(classification_id)
  req.flash("message warning", "Update failed.")
  res.status(500).render("inventory/edit-inventory", {
    title: "Edit " + `${inv_make} ${inv_model}`,
    nav,
    classificationSelect,
    errors: null,
    ...req.body
  })
}

// Delete confirmation view
invCont.deleteView = async function (req, res) {
  const inv_id = parseInt(req.params.inv_id)
  const itemData = await invModel.getInventoryById(inv_id)
  const nav = await utilities.getNav()
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`

  res.render("./inventory/delete-confirm", {
    title: "Delete " + itemName,
    nav,
    errors: null,
    ...itemData
  })
}

// Delete inventory item
invCont.deleteItem = async function (req, res) {
  const inv_id = parseInt(req.body.inv_id)
  const deleteResult = await invModel.deleteInventoryItem(inv_id)

  if (deleteResult) {
    req.flash("message success", "Vehicle deleted.")
  } else {
    req.flash("message warning", "Delete failed.")
  }

  res.redirect("/inv/")
}

module.exports = invCont
