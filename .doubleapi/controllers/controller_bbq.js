// import paths
const Model_bbq = require("../models/model_bbq.js");

/* Matos Notes
// .find({key: req.params.item.replace(/\-/g, " ")}) 
*/

/* API
// create
// index
// show 
// update 
// delete
*/



// CREATE (store)
module.exports.bbq_store = (req, res, next) => {

  const product_bbq = new Model_bbq({
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    date: req.body.date
  });

  // validator new way
  product_bbq.save((err) => {
    if (err) {
      return next(res.status(400).send(err.message));
    } else {
      res.status(201).send("Product_bbq created successfully!");
    }
  });

  /*
   validator old way
   if(!product_bbq.id || !product_bbq.name || !product_bbq.price) {
     return res.status(400).json({msg: 'Please include an ID, a Name and a Price'});  
   }
   */
  
  
};

// INDEX
module.exports.bbq_index = (req, res) => {
  
  Model_bbq.find({}).then((bbq) => {
    res.json(bbq)
  }).catch((e) => {
    console.log(e);
    res.status(400).send(e.message)
  });

};

// SHOW by id                                                              
module.exports.bbq_show= (req, res) => {

  Model_bbq.find({id: req.params.id}).then((bbq) => {
    res.json(bbq)
  }).catch((e) => {
    console.log(e);
    res.status(400).send("Something went wrong, please make sure to give a valid 'ID'!")
    // res.status(400).json(`No product with the id of ${req.params.id}`)
  });

};

// UPDATE (put)
module.exports.bbq_update = (req, res) => {
  
  /*
  find in the DB the first data that matches the criteria: {id: req.params.id}. Then, change the KEY name into VALUE from 'req.body.name'. 
  Note: {new: true} is for the function to return with the updated values and not the original before updating. 
  findOneAndUpdate(conditions, update, options).
  {$set:{name: req.body.name}} for individual items
  */

  Model_bbq.findOneAndUpdate({id: req.params.id}, {$set: req.body}, {new: true}).then((bbq) => {
    res.json(bbq)
  }).catch((e) => {
    // console.log(e);
    res.status(500).send("Something went wrong! Did you pass the correct info?")
  });

};

// DELETE
module.exports.bbq_delete = (req, res) => {
  
  Model_bbq.find({id: req.params.id}).deleteOne().then((bbq) => {
    res.status(204).send();
  }).catch((e) => {
    console.log(e);
    res.status(404).send("Can't delete! Please, doublecheck your URL")
  });

};

// ROUTE ERROR
module.exports.bbq_error = (req, res) => {
  res.status(404).send("ERROR, are you sure you are in the right page?")
};

