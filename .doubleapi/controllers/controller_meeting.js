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

  // Invoke dataService to not allow bookings during weekends or after labor hour.
  let checkDay = (dataService()).checkDay(req);
  let checkHourStart = (dataService()).checkHourStart(req);
  let checkHourEnd = (dataService()).checkHourEnd(req);

  if(
    (checkDay === 'Sunday' || checkDay === 'Saturday') ||
    (checkHourStart > 17 || checkHourStart < 9) ||
    (checkHourEnd > 17 || checkHourEnd < 9) || 
    (checkHourEnd < checkHourStart)
  ){
    return res.status(403).send(`Please book during the week between: [9h ; 17h], make sure the Meeting_TimeStart is lower than Meeting_TimeEnd`);
  }
  // Invoke dataService to not allow bookings during weekends or after labor hour. END

  // check if user ID already has bookings
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

  // Invoke dataService to not allow bookings during weekends or after labor hour.
  let checkDay = (dataService()).checkDay(req);
  let checkHourStart = (dataService()).checkHourStart(req);
  let checkHourEnd = (dataService()).checkHourEnd(req);

  if(
    (checkDay === 'Sunday' || checkDay === 'Saturday') ||
    (checkHourStart > 17 || checkHourStart < 9) ||
    (checkHourEnd > 17 || checkHourEnd < 9) || 
    (checkHourEnd < checkHourStart)
  ){
    return res.status(403).send(`Please book during the week between: [9h ; 17h], make sure the Meeting_TimeStart is lower than Meeting_TimeEnd`);
  }
   // Invoke dataService to not allow bookings during weekends or after labor hour. END

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



// HELPER FUNCTIONS

const dataService = () => {

  let checkDay = function(req) {
    // Note: the time from the request is in "timestamp" ==> '1829187239'. We need to put it inside 'new Date()' to convert it.
    var day = new Date(req.body.meet_start);
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var result = days[day.getDay()];
    console.log(result);
    return result;
  };
  
  let checkHourStart = function(req) {
    // Note: the time from the request is in "timestamp" ==> '1829187239'. We need to put it inside 'new Date()' to convert it.
    var day = new Date(req.body.meet_start);
    var result = day.getHours();
    console.log(result);
    return result;
  };
  
  let checkHourEnd = function(req) {
    // Note: the time from the request is in "timestamp" ==> '1829187239'. We need to put it inside 'new Date()' to convert it.
    var day = new Date(req.body.meet_end);
    var result = day.getHours();
    console.log(result);
    return result;
  };


  return {
    checkDay: checkDay,
    checkHourStart: checkHourStart,
    checkHourEnd: checkHourEnd
  }

}



