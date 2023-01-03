const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: "Blog",
        required: true
    }],

    connections : [{
        type: String,
        required: false
    }], 

    connectionsRequests: [{
        type: String,
        required: false
    }],
    sentRequests: [{
        type: String,
        required: false
    }]

})


module.exports = mongoose.model("User", userSchema)