const invModel = require("../models/invModel");
const utilities = require("../utilities");

async function buildByInvId(req, res, next) {
  try {
    const invId = parseInt(req.params.invId);
    if (isNaN(invId)) {
      return res.status(400).send("Invalid vehicle ID");
    }

    const data = await invModel.getInventoryById(invId);
    if (!data) {
      return next(); // Triggers 404 if no vehicle found
    }

    const viewHtml = utilities.buildVehicleDetailView(data);

    res.render("inventory/detail", {
      title: `${data.inv_make} ${data.inv_model}`,
      viewHtml,
      nav: await utilities.getNav(), // Optional if already set globally
    });
  } catch (error) {
    console.error("Error in buildByInvId:", error);
    next(error);
  }
}

module.exports = {
  buildByInvId,
};




const invController = {}

invController.buildManagementView = async function (req, res, next) {
  try {
    res.render("inventory/management", {
      title: "Inventory Management",
      message: req.flash("notice") // or however you’re passing messages
    })
  } catch (err) {
    next(err)
  }
}

module.exports = invController



const invModel = require("../models/invModel")

// Show the form
invController.showAddClassification = (req, res) => {
  res.render("inventory/add-classification", {
    title: "Add Classification",
    message: req.flash("notice"),
    errors: null
  })
}

// Process the form
invController.processAddClassification = async (req, res) => {
  const { classification_name } = req.body

  try {
    const insertResult = await invModel.addClassification(classification_name)

    if (insertResult) {
      // Update navigation if insertion succeeded
      const nav = await utilities.getNav()
      req.flash("notice", "New classification added successfully.")
      res.status(201).render("inventory/management", {
        title: "Inventory Management",
        nav,
        message: req.flash("notice")
      })
    } else {
      req.flash("notice", "Failed to add classification.")
      res.status(500).render("inventory/add-classification", {
        title: "Add Classification",
        message: req.flash("notice"),
        errors: null
      })
    }
  } catch (error) {
    req.flash("notice", "An error occurred. Try again.")
    res.status(500).render("inventory/add-classification", {
      title: "Add Classification",
      message: req.flash("notice"),
      errors: null
    })
  }
}


const utilities = require("../utilities")
const invModel = require("../models/invModel")

invController.buildAddInventory = async (req, res) => {
  let classificationList = await utilities.buildClassificationList()
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    classificationList,
    message: req.flash("notice"),
    errors: null
  })
}

invController.processAddInventory = async (req, res) => {
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color
  } = req.body

  const invData = {
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color
  }

  try {
    const result = await invModel.addInventory(invData)
    if (result) {
      req.flash("notice", "Vehicle added successfully.")
      const nav = await utilities.getNav()
      res.status(201).render("inventory/management", {
        title: "Inventory Management",
        nav,
        message: req.flash("notice")
      })
    } else {
      throw new Error("Insert failed.")
    }
  } catch (error) {
    let classificationList = await utilities.buildClassificationList(classification_id)
    req.flash("notice", "Failed to add vehicle.")
    res.status(500).render("inventory/add-inventory", {
      title: "Add Inventory",
      classificationList,
      message: req.flash("notice"),
      errors: [],
      ...invData
    })
  }
}
