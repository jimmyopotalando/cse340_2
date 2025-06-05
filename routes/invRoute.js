const express = require("express");
const router = express.Router();

const invController = require("../controllers/invController");
const invValidation = require("../middleware/invValidation");

// Route to view individual vehicle details
router.get("/detail/:invId", invController.buildByInvId);

// Route for the inventory management view
router.get("/", invController.buildManagementView);

// Routes for adding classification
router.get("/add-classification", invController.showAddClassification);

router.post(
  "/add-classification",
  invValidation.classificationRules(),
  invValidation.checkClassificationData,
  invController.processAddClassification
);

// Routes for adding inventory
router.get("/add-inventory", invController.buildAddInventory);

router.post(
  "/add-inventory",
  invValidation.inventoryRules(),
  invValidation.checkInventoryData,
  invController.processAddInventory
);

module.exports = router;
