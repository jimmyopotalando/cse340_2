const invValidation = require("../middleware/invValidation")

const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");

// Route to view individual vehicle details
router.get("/detail/:invId", invController.buildByInvId);

module.exports = router;



// Route for the inventory management view
router.get("/", invController.buildManagementView)

module.exports = router





const router = new express.Router()
const invController = require("../controllers/invController")
const invValidation = require("../middleware/invValidation")

router.get("/", invController.buildManagementView)

router.get("/add-classification", invController.showAddClassification)

router.post(
  "/add-classification",
  invValidation.classificationRules(),
  invValidation.checkClassificationData,
  invController.processAddClassification
)

module.exports = router



const invValidation = require("../middleware/invValidation")

router.get("/add-inventory", invController.buildAddInventory)

router.post(
  "/add-inventory",
  invValidation.inventoryRules(),
  invValidation.checkInventoryData,
  invController.processAddInventory
)
