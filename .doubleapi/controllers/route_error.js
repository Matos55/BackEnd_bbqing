// import paths
const Model_bbq = require("../models/model_bbq.js");


// ROUTE ERROR
module.exports.route_error = (req, res) => {
  
    res.status(404).send("Something went wrong, page not found!")
  
  };