const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    blog: {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema)