const mongoose = require('mongoose'); 
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);



mongoose.connection.on('open', function () {
    console.log('db connected')
})

