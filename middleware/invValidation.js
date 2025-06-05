// middleware/invValidation.js

const { body, validationResult } = require("express-validator");
const utilities = require("../utilities");

// === Classification Validation ===

const classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isLength({ min: 1 }).withMessage("Classification name is required.")
      .matches(/^[A-Za-z0-9]+$/).withMessage("No spaces or special characters allowed.")
  ];
};

const checkClassificationData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("inventory/add-classification", {
      title: "Add Classification",
      message: null,
      errors: errors.array()
    });
  }
  next();
};

// === Inventory Validation ===

const inventoryRules = () => {
  return [
    body("inv_make").trim().notEmpty().withMessage("Make is required."),
    body("inv_model").trim().notEmpty().withMessage("Model is required."),
    body("inv_year").isInt({ min: 1900, max: 2100 }).withMessage("Year must be 1900–2100."),
    body("inv_description").trim().notEmpty().withMessage("Description is required."),
    body("inv_image").trim().notEmpty().withMessage("Image path required."),
    body("inv_thumbnail").trim().notEmpty().withMessage("Thumbnail path required."),
    body("inv_price").isFloat({ min: 0 }).withMessage("Price must be a positive number."),
    body("inv_miles").isInt({ min: 0 }).withMessage("Miles must be a positive number."),
    body("inv_color").trim().notEmpty().withMessage("Color is required.")
  ];
};

const checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req);
  const classificationList = await utilities.buildClassificationList(req.body.classification_id);
  if (!errors.isEmpty()) {
    return res.render("inventory/add-inventory", {
      title: "Add Inventory",
      classificationList,
      message: null,
      errors: errors.array(),
      ...req.body
    });
  }
  next();
};

// === Exports ===

module.exports = {
  classificationRules,
  checkClassificationData,
  inventoryRules,
  checkInventoryData
};
