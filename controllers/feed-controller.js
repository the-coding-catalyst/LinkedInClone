const User = require('../model/user')
const { loggedInUserInfo } = require('./connections-controller')
const Blog = require("../model/blog")

const showFeed = async(req, res, next) => {
    console.log("request was here..")
    let userEmail = loggedInUserInfo(req)
    let user = await User.findOne({email: userEmail})
    let firstConnections = await user.connections
    var feed = []
    var blogs = []
    firstConnections.forEach(async (connection) => {
        const friend = await User.findOne({email: connection})
        feed = feed.concat(friend.likedBlogs, friend.blogs)
    })

    // blogs.forEach(async (blog)=>{
    //     const ifBlogExists = await Blog.findById(blog)
    //     if(ifBlogExists) feed.push(blog)
    // })

    await user.save()
    
    return res.status(200).json({feed})

}

module.exports = {showFeed}