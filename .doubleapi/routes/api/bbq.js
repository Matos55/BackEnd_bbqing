
// import library
const express = require("express");

// import paths
const controller_bbq = require("../../controllers/controller_bbq.js");

// Fire express.router
const router = express.Router();

// Routes
/**
 * @swagger
 * components:
 *  schemas: 
 *      Product_bbq:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Number ID of the product. Must be Unique!
 *                  example: 69
 *              name:
 *                  type: string
 *                  description: Name of the product. Must be Unique!
 *                  example: 'Espetadas de Porco'
 *              price:
 *                  type: number
 *                  description: Positive price number!
 *                  example: 2.66 
 */

// INDEX
/**
 * @swagger
 * /bbq:
 *  get:
 *      summary: Get all products
 *      description: Use to request all products
 *      responses:
 *          '200': 
 *              description: A sucessful response.
 *          '500':
 *              description: Error.
 */
router.get("/", controller_bbq.bbq_index);


// CREATE
/** 
 * @swagger
 * /bbq:
 *  post:
 *      summary: Create product
 *      description: Use this method to persist a product into the DataBase.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/Product_bbq'
 *      responses:
 *          '201': 
 *              description: A product was found.
 *          '400':
 *              description: Please double check if the Product ID is correctly filled. 
 */
router.post("/", controller_bbq.bbq_store);

// SHOW by ID
/** 
 * @swagger
 * /bbq/{id}:
 *  get:
 *      summary: Get a singler product.
 *      description: Use this method to fetch a product from the DataBase.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: id of the product.
 *            exemple: 2
 *      responses:
 *          '201': 
 *              description: A product inserted and stored in DB.
 *          '400':
 *              description: Please double check if all requested info is filled and by the rules. 
 */
router.get("/:id", controller_bbq.bbq_show);

// DELETE
/**
 * @swagger
 * /bbq/{id}:
 *  delete:
 *      summary: Delete product
 *      description: delete product
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: integer
 *            required: true
 *            description: id of the product
 *            example: 10
 *      responses:
 *          '200':
 *              description: success
 */
router.delete("/:id", controller_bbq.bbq_delete);

// PUT
/**
 * @swagger
 * /bbq/{id}/update:
 *  put:
 *      summary: Update produt
 *      description: Use this method to update a product by id
 *      consumes:
 *          - application/json
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: id of the product to be updated
 *            example: 69
 *          - in: body
 *            name: body
 *            required: true
 *            description: body object
 *            schema:
 *              $ref: '#/components/schemas/Product_bbq'
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product_bbq'       
 *      responses:
 *          '201': 
 *              description: A product updated into DB.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product_bbq'  
 *          '500':
 *              description: Error.                       
 */
router.put("/:id/update", controller_bbq.bbq_update);

// error default
router.get("/*", controller_bbq.bbq_error);

// exports
module.exports = router;

