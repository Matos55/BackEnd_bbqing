// import paths
const Model_bbq = require("../models/model_bbq.js");

// create
// index
// show 
// update 
// delete

// Matos Notes
// .find({key: req.params.item.replace(/\-/g, " ")})

// CREATE (store)
module.exports.bbq_store = (req, res, next) => {

  const product_bbq = new Model_bbq({
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    date: req.body.date
  });

  product_bbq.save((err) => {
    if (err) {
      return next(err);
    } else {
      res.status(201).send("Product_bbq created successfully!");
    }
  });

   // MATOS ALERT ===> VALIDATORS
  //   // if we do not have a name or an email, give an error
  //   if(!newMember.name || !newMember.email) {
  //     return res.status(400).json({msg: 'Please include a name and email'});
  //  }
  
};

// INDEX
module.exports.bbq_index = (req, res) => {
  
  Model_bbq.find({}).then((bbq) => {
    res.json(bbq)
  }).catch((e) => {
    console.log(e);
    res.status(500).send("Something went wrong!")
  });

};

// SHOW by id                                                              // MATOS ALERT, create IF on filter to pass erro 400
module.exports.bbq_show = (req, res) => {
  
  Model_bbq.find({id: req.params.id}).then((bbq) => {
    res.json(bbq)
  }).catch((e) => {
    console.log(e);
    res.status(400).send("Something went wrong!")
    // res.status(400).json(`No product with the id of ${req.params.id}`)
  });

};

// UPDATE (put)
module.exports.bbq_update = (req, res) => {
  
  // find in the DB the first data that matches the criteria: {id: req.params.id}. Then, change the KEY name into VALUE from 'req.body.name'. 
  // Note: {new: true} is for the function to return with the updated values and not the original before updating. 
  // findOneAndUpdate(conditions, update, options).
  // {$set:{name: req.body.name}} for individual items
  Model_bbq.findOneAndUpdate({id: req.params.id}, {$set: req.body}, {new: true}).then((bbq) => {
    res.json(bbq)
  }).catch((e) => {
    console.log(e);
    res.status(500).send("Something went wrong!")
  });

};

// DELETE
module.exports.bbq_delete = (req, res) => {
  
  Model_bbq.find({id: req.params.id}).deleteOne().then((bbq) => {
    res.json(bbq)
  }).catch((e) => {
    console.log(e);
    res.status(500).send("Something went wrong!")
  });

};

// ROUTE ERROR
module.exports.bbq_error = (req, res) => {
  res.status(404).send("Something went wrong 404!")
};

