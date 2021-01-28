
// import library
const express = require("express");

// import paths
const controller_bbq = require("../../controllers/route_error.js");

// Fire express.router
const router = express.Router();

// ROUTES
router.get("/*", controller_bbq.route_error);

// exports
module.exports = router;
