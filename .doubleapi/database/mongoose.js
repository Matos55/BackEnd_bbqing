const mongoose = require('mongoose')

// Mongo: connect to DB
mongoose.connect('mongodb://root:root@localhost:27017/admin', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).catch(error => handleError(error));