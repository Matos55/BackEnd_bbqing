
// import library
const express = require("express");

// import paths
const controller_bbq = require("../../controllers/controller_bbq.js");

// Fire express.router
const router = express.Router();

// Routes
/**
 * @swagger
 * /bbq:
 *  get:
 *      description: Use to request all products
 *      responses:
 *          '200': 
 *              description: A sucessful response.
 */
router.get("/", controller_bbq.bbq_index);

/**
 * @swagger
 * /bbq:
 *  post:
 *      description: Use to persist a product
 *      responses:
 *          '201': 
 *              description: A product inserted and stored in DB.
 */
router.post("/", controller_bbq.bbq_store);
router.get("/:id", controller_bbq.bbq_show);
router.delete("/:id", controller_bbq.bbq_delete);

/**
 * @swagger
 * /bbq:
 *  put:
 *      description: Use to update a product
 *      responses:
 *          '201': 
 *              description: A product updated into DB.
 */
router.put("/:id/update", controller_bbq.bbq_update);
router.get("/*", controller_bbq.bbq_error);



// exports
module.exports = router;

