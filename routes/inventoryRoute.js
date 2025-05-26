const express = require('express');
const router = express.Router();
const invController = require('../controllers/invController');

router.get('/detail/:invId', invController.buildByInvId); // Detail view route

module.exports = router;
