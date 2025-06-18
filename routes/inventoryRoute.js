// Needed Resources
const express = require("express")
const router = express.Router()
const invController = require("../controllers/inventoryController")
const utilities = require("../utilities")
const invChecks = require("../utilities/inventory-validation")
const { checkEmployeeOrAdmin } = require("../middleware/authMiddleware")

// Classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Vehicle detail view
router.get("/detail/:id", utilities.handleErrors(invController.buildDetail))

// Intentional error test route
router.get("/broken", utilities.handleErrors(invController.throwError))

// Management view
router.get("/", utilities.handleErrors(invController.buildManagementView))

// Add classification view
router.get("/newClassification", checkEmployeeOrAdmin, utilities.handleErrors(invController.newClassificationView))

// Process new classification
router.post(
  "/addClassification",
  checkEmployeeOrAdmin,
  invChecks.classificationRule(),
  invChecks.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Add vehicle view
router.get("/newVehicle", checkEmployeeOrAdmin, utilities.handleErrors(invController.newInventoryView))

// Process new vehicle
router.post(
  "/addInventory",
  checkEmployeeOrAdmin,
  invChecks.newInventoryRules(),
  invChecks.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

// Get inventory list as JSON (for dropdowns etc.)
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Edit inventory view
router.get("/edit/:inv_id", checkEmployeeOrAdmin, utilities.handleErrors(invController.editInvItemView))

// Update inventory item
router.post(
  "/update/",
  checkEmployeeOrAdmin,
  invChecks.newInventoryRules(),
  invChecks.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

// Delete confirmation view
router.get("/delete/:inv_id", checkEmployeeOrAdmin, utilities.handleErrors(invController.deleteView))

// Delete inventory item
router.post("/delete", checkEmployeeOrAdmin, utilities.handleErrors(invController.deleteItem))

module.exports = router
