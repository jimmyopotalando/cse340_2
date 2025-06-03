const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");

// Route to view individual vehicle details
router.get("/detail/:invId", invController.buildByInvId);

module.exports = router;

