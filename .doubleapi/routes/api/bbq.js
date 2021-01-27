
// import library
const express = require("express");

// import paths
const controller_bbq = require("../../controllers/controller_bbq.js");

// Fire express.router
const router = express.Router();

// ROUTES
router.get("/", controller_bbq.bbq_index);
router.post("/", controller_bbq.bbq_store);
router.get("/:id", controller_bbq.bbq_show);
router.delete("/:id", controller_bbq.bbq_delete);
router.put("/:id/update", controller_bbq.bbq_update);
router.get("/*", controller_bbq.bbq_error);



// exports
module.exports = router;

