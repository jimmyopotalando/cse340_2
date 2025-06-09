// Needed Resources 
const express = require("express");
const router = express.Router();

const invController = require("../controllers/invController");
const inventoryController = require("../controllers/inventoryController");

const utilities = require("../utilities");
const invChecks = require("../utilities/inventory-validation");
const { checkEmployeeOrAdmin } = require("../utilities/permissions");

/* ****************************************
 * Route to build inventory by classification view
 **************************************** */
router.get("/type/:classificationId", invController.buildByClassificationId);

/* ****************************************
 * Route to build vehicle detail view
 **************************************** */
router.get("/detail/:id", 
  utilities.handleErrors(invController.buildDetail));

/* ****************************************
 * Error Route
 * Assignment 3, Task 3
 **************************************** */
router.get("/broken", 
  utilities.handleErrors(invController.throwError));

/* ****************************************
 * Build Management View Route
 * Assignment 4, Task 1
 * checkAccountType added Unit 5, Assignment 5, Task 2
 **************************************** */
router.get("/", 
  utilities.handleErrors(invController.buildManagementView));

/* ****************************************
 * Build add-classification View Route
 **************************************** */
router.get("/newClassification", 
  utilities.handleErrors(invController.newClassificationView));

/* ****************************************
 * Process add-classification Route
 **************************************** */
router.post("/addClassification", 
  invChecks.classificationRule(),
  invChecks.checkClassificationData,
  utilities.handleErrors(invController.addClassification));

/* ****************************************
 * Build add-vehicle View Route
 **************************************** */
router.get("/newVehicle", 
  utilities.handleErrors(invController.newInventoryView));

/* ****************************************
 * Process add-vehicle Route
 **************************************** */
router.post("/addInventory", 
  invChecks.newInventoryRules(),
  invChecks.checkInventoryData,
  utilities.handleErrors(invController.addInventory));

/* ****************************************
 * Admin/Employee Protected Inventory Routes
 **************************************** */
router.get("/add-classification", checkEmployeeOrAdmin, inventoryController.buildAddClassification);
router.post("/add-classification", checkEmployeeOrAdmin, inventoryController.addClassification);

router.get("/add-inventory", checkEmployeeOrAdmin, inventoryController.buildAddInventory);
router.post("/add-inventory", checkEmployeeOrAdmin, inventoryController.addInventory);

router.get("/edit/:inv_id", checkEmployeeOrAdmin, inventoryController.buildEditInventory);
router.post("/update/", checkEmployeeOrAdmin, inventoryController.updateInventory);

router.get("/delete/:inv_id", checkEmployeeOrAdmin, inventoryController.buildDeleteInventory);
router.post("/delete/", checkEmployeeOrAdmin, inventoryController.deleteInventory);

module.exports = router;
