//import libraries
const path = require('path');
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// import paths
const bbq = require('./routes/api/bbq.js');
const routeError = require('./routes/api/route_error.js');
require('./database/mongoose.js');

// fire express
var app = express();

/*****  Matos: Swagger needs to be created before using the "app.use('/api-docs')" *****/
// Extended: https://swagger.io/docs/specification/about/#infoObject
const swaggerOptions = {

    swaggerDefinition: {
        info: {
            title: 'Product API',
            description: "Product BBQ API Information",
            contact: {
                name: "The Amazing Matos"
            },
            servers: ["http://localhost:4000"]
        }
    },

    apis: ['routes/api/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

/*
// Middleware: methods/functions/operations that are called BETWEEN processing the Request and sending the Response in your application method.
// Body Parser Middleware ==> used to "read/transport" the BODY request, normally, from POST's requests.
// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
// express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays
*/

app.use(express.json()); // must obey the json rules:   "stric: only parse objects and arrays" + "limit <1mb> - maximum request body size" + "reviver: passed to JSON.parse()"
app.use(express.urlencoded({ extended: false })); // must obey the QueryString encoded rules. Returns middleware that only parses urlencoded with the qs (querystring) module.

// Routes 
app.use("/bbq", bbq);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/*", routeError);

// listen to port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`You are listening to port ${port}`);
});
