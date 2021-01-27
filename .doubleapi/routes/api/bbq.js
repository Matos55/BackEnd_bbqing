
// import library
const express = require("express");

// import paths
const controller_bbq = require("../../controllers/controller_bbq.js");

// Fire express.router
const router = express.Router();

// ROUTES
router.post("/create", controller_bbq.bbq_create);


// exports
module.exports = router;