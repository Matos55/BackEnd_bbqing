
// import library
const express = require("express");

// import paths
const controller_meeting = require("../../controllers/controller_meeting.js");

// Fire express.router
const router = express.Router();

// Routes //
// INDEX
router.get("/", controller_meeting.meeting_index);


// CREATE
router.post("/", controller_meeting.meeting_store);

// SHOW by ID
router.get("/:id", controller_meeting.meeting_show);

// DELETE
router.delete("/:id", controller_meeting.meeting_delete);

// PUT
router.put("/:id/update", controller_meeting.meeting_update);

// error default
router.get("/*", controller_meeting.meeting_error);

// exports
module.exports = router;

