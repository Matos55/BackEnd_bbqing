// import paths
const Model_meeting = require("../models/model_meeting.js");

/* API
// create
// index
// show 
// update 
// delete
*/

// CREATE (store)
module.exports.meeting_store = async (req, res, next) => {

  const find = await Model_meeting.exists({id: parseInt(req.body.id)});

  if(find) {
   return res.status(409).send(`Error: Another Meeting with the User 'ID' ${req.body.id} already exists!`)
  }

  const product_meeting = new Model_meeting({
    id: req.body.id,
    name: req.body.name,
    contact: req.body.contact,
    date_bookat: req.body.date_bookat,
    meet_start: req.body.meet_start,
    meet_end: req.body.meet_end
  });
  
  product_meeting.save((err) => {
    if (err) {
      return next(res.status(400).send(err.message));
    } else {
      res.status(201).send("Meeting created successfully!");
    }
  });

};

// INDEX
module.exports.meeting_index = (req, res) => {
  
  Model_meeting.find({}).then((meeting) => {
    res.json(meeting)
  }).catch((e) => {
    console.log(e);
    res.status(400).send(e.message)
  });

};

// SHOW by id                                                              
module.exports.meeting_show = (req, res) => {

  Model_meeting.exists({id: req.params.id}, function(err, product) {
    if (err) return res.status(500).send("There was a problem while searching for a meeting.");
    if (!product) return res.status(404).send(`No meeting found with User ID: '${req.params.id}'.`);

    Model_meeting.find({id: req.params.id}).then((meeting) => {
      res.status(200).json(meeting);
    });
  });

};

// UPDATE (put)
module.exports.meeting_update = (req, res) => {
  
  Model_meeting.exists({id: parseInt(req.params.id)}, function(err, product) {
    if (err) return res.status(500).send("There was a problem finding/updting the meeting.");
    if (!product) return res.status(404).send(`No meeting found with User ID: '${req.params.id}'.`);

    Model_meeting.findOneAndUpdate({id: req.params.id}, {$set: req.body}, {new: true}).then((meeting) => {
      res.status(201).json(meeting);
    });
  });
  
  /* NOTES
  find in the DB the first data that matches the criteria: {id: req.params.id}. Then, change the KEY name into VALUE from 'req.body.name'. 
  Note: {new: true} is for the function to return with the updated values and not the original before updating. 
  findOneAndUpdate(conditions, update, options).
  {$set:{name: req.body.name}} for individual items
  */

};

// DELETE
module.exports.meeting_delete = (req, res) => {

  Model_meeting.exists({id: parseInt(req.params.id)}, function(err, product) {
    if (err) return res.status(500).send("There was a problem finding/deleting the meeting.");
    if (!product) return res.status(404).send(`No meeting found with User ID: '${req.params.id}'.`);

    Model_meeting.find({id: req.params.id}).deleteOne().then((meeting) => {
      res.status(204).json(meeting);
    });
  });

};

// ROUTE ERROR
module.exports.meeting_error = (req, res) => {
  res.status(404).send("ERROR, are you sure you are in the right page?")
};

