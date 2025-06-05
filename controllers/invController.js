const invModel = require("../models/invModel");
const utilities = require("../utilities");

const invController = {};

// Controller: Vehicle Detail View by Inventory ID
invController.buildByInvId = async function (req, res, next) {
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
      nav: await utilities.getNav(),
    });
  } catch (error) {
    console.error("Error in buildByInvId:", error);
    next(error);
  }
};

// Controller: Inventory Management Page
invController.buildManagementView = async function (req, res, next) {
  try {
    res.render("inventory/management", {
      title: "Inventory Management",
      message: req.flash("notice")
    });
  } catch (err) {
    next(err);
  }
};

// Controller: Show Add Classification Form
invController.showAddClassification = (req, res) => {
  res.render("inventory/add-classification", {
    title: "Add Classification",
    message: req.flash("notice"),
    errors: null
  });
};

// Controller: Process Add Classification Form
invController.processAddClassification = async (req, res) => {
  const { classification_name } = req.body;

  try {
    const insertResult = await invModel.addClassification(classification_name);

    if (insertResult) {
      const nav = await utilities.getNav();
      req.flash("notice", "New classification added successfully.");
      res.status(201).render("inventory/management", {
        title: "Inventory Management",
        nav,
        message: req.flash("notice")
      });
    } else {
      req.flash("notice", "Failed to add classification.");
      res.status(500).render("inventory/add-classification", {
        title: "Add Classification",
        message: req.flash("notice"),
        errors: null
      });
    }
  } catch (error) {
    req.flash("notice", "An error occurred. Try again.");
    res.status(500).render("inventory/add-classification", {
      title: "Add Classification",
      message: req.flash("notice"),
      errors: null
    });
  }
};

// Controller: Show Add Inventory Form
invController.buildAddInventory = async (req, res) => {
  const classificationList = await utilities.buildClassificationList();
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    classificationList,
    message: req.flash("notice"),
    errors: null
  });
};

// Controller: Process Add Inventory Form
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
  } = req.body;

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
  };

  try {
    const result = await invModel.addInventory(invData);
    if (result) {
      req.flash("notice", "Vehicle added successfully.");
      const nav = await utilities.getNav();
      res.status(201).render("inventory/management", {
        title: "Inventory Management",
        nav,
        message: req.flash("notice")
      });
    } else {
      throw new Error("Insert failed.");
    }
  } catch (error) {
    const classificationList = await utilities.buildClassificationList(classification_id);
    req.flash("notice", "Failed to add vehicle.");
    res.status(500).render("inventory/add-inventory", {
      title: "Add Inventory",
      classificationList,
      message: req.flash("notice"),
      errors: [],
      ...invData
    });
  }
};

module.exports = invController;

