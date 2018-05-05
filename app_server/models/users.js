const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    id: {
        type : String,
        required : true,
        unique : true
    },
    name : String
});

mongoose.model('Users', userScheme);