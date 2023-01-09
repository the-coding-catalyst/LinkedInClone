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
    }],
    likedBlogs: [{
        type: mongoose.Types.ObjectId,
        ref: "Blog",
        required: true
    }],
    feed: [{type: mongoose.Types.ObjectId,
        ref: "Blog",
        required: false
    }],
    followers: [{type: mongoose.Types.ObjectId,
        ref: "Blog",
        required: true}],
    
    followings: [{type: mongoose.Types.ObjectId,
        ref: "Blog",
        required: true}],

    totalFollowers: {
        type: Number,
        required: false,
        default: 0
    },
    totalFollowings: {
        type: Number,
        required: false,
        default: 0
    }
    


})


module.exports = mongoose.model("User", userSchema)