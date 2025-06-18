// Needed Resources
const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")
const inventoryController = require("../controllers/inventoryController")
const utilities = require("../utilities")
const invChecks = require("../utilities/inventory-validation")
const { checkEmployeeOrAdmin } = require("../middleware/authMiddleware")

// Classification view
router.get("/type/:classificationId", invController.buildByClassificationId)

// Vehicle detail view
router.get("/detail/:id", utilities.handleErrors(invController.buildDetail))

// Error test route
router.get("/broken", utilities.handleErrors(invController.throwError))

// Management view
router.get("/", utilities.handleErrors(invController.buildManagementView))

// Add classification view
router.get("/newClassification", utilities.handleErrors(invController.newClassificationView))

// Process new classification
router.post(
  "/addClassification",
  invChecks.classificationRule(),
  invChecks.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Add vehicle view
router.get("/newVehicle", utilities.handleErrors(invController.newInventoryView))

// Process new vehicle
router.post(
  "/addInventory",
  invChecks.newInventoryRules(),
  invChecks.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

// Admin-only routes
router.use("/admin", checkEmployeeOrAdmin)
router.get("/admin", inventoryController.adminDashboard)
router.post("/admin/add", inventoryController.addItem)
router.post("/admin/edit/:id", inventoryController.editItem)
router.post("/admin/delete/:id", inventoryController.deleteItem)

module.exports = router
