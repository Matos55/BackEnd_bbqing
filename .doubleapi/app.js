//import libraries
const path = require('path');
const express = require('express');

// import paths
const bbq = require('./routes/api/bbq.js');
require('./database/mongoose.js');

// fire express
var app = express();

// Middleware: methods/functions/operations that are called BETWEEN processing the Request and sending the Response in your application method.
// Body Parser Middleware ==> used to "read/transport" the BODY request, normally, from POST's requests.
// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
// express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays
app.use(express.json()); // must obey the json rules:   "stric: only parse objects and arrays" + "limit <1mb> - maximum request body size" + "reviver: passed to JSON.parse()"
app.use(express.urlencoded({ extended: false })); // must obey the QueryString encoded rules. Returns middleware that only parses urlencoded with the qs (querystring) module.

// Routes started with '/bbq' apply 'bbq' settings|path|files
app.use("/bbq", bbq);


// listen to port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`You are listening to port ${port}`);
});

