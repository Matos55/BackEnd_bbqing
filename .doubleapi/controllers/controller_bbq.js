// import paths
const Model_bbq = require("../models/model_bbq.js");


// CREATE
module.exports.bbq_create = (req, res, next) => {
  const product_bbq = new Model_bbq({
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    date: req.body.date
  });

  product_bbq.save((err) => {
    if (err) {
      return next(err);
    }
    res.send("Product_bbq created successfully!");
  });
};