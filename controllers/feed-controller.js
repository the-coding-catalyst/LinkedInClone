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
            console.log(blogExists, "if blog")
            if(blogExists) feed.push(blog)
            console.log(feed, "this is feed--------")
        })
        
        friend.likedBlogs.forEach(async (blog) => {
            const blogExists = await Blog.findById(blog)
            console.log(blogExists, "if blog")
            if(blogExists) feed.push(blog)
        })
    })
    console.log(feed)
    // await user.save()
    return res.send(feed)

}

module.exports = {showFeed}