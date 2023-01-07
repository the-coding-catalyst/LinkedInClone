const User = require('../model/user')
const { loggedInUserInfo } = require('./connections-controller')
const Blog = require("../model/blog")

const showFeed = async(req, res, next) => {
    console.log("request was here..")
    let userEmail = loggedInUserInfo(req)
    let user = await User.findOne({email: userEmail})
    let firstConnections = user.connections
    var feed = []
    firstConnections.forEach(async (connection) => {
        friend = await User.findOne({email: connection})
        friend.blogs.forEach(async (blog) => {
            const blogExists = await Blog.findById(blog)
            console.log(blogExists==true, "if blog")
            if(blogExists.title != "") feed.push(blog)
        })
        
        friend.likedBlogs.forEach(async (blog) => {
            const blogExists = await Blog.findById(blog)
            console.log(blogExists, "if blog")
            if(blogExists.title != "") feed.push(blog)
        })
    })
    await user.save()
    return res.status(200).json({feed})

}

module.exports = {showFeed}