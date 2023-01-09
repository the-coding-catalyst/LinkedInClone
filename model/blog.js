const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    user: {
        type:mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    likedBy: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: false
    }],
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: "Comment",
        required: false
    }],
    createdAt: {
        type: Date,
        required: true
    }

})

module.exports = mongoose.model('Blog', blogSchema)