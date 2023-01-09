const { default: mongoose } = require("mongoose")
const Blog = require("../model/blog")
const User = require("../model/user")
const atob = require('atob')
const jwt = require("jsonwebtoken")
const { loggedInUserInfo } = require("./connections-controller")

const getAllBlogs = async (req, res, next) => {
    console.log(req.user)
    let blogs 
    try{
        blogs = await Blog.find()
    }catch(err){
        return console.log(err)
    }
    if(!blogs) return res.status(404).json({message: "No blogs found"})
    return res.status(200).status(200).json({blogs})
}

async function checkAuthorisation(req, blogUser){
    let token = req.headers.cookie
    // console.log(token, "this is cookie")
    token = token.slice(4, token.length)
    const jwtInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const userEmail = blogUser.email
    console.log(jwtInfo)
    if(userEmail!=jwtInfo.email) return false
    return true
}

const createABlog = async(req, res, next) => {
    const {title, description} = req.body
    let userEmail = loggedInUserInfo(req)
    let blogUser 
    try{
        blogUser = await User.findOne({email: userEmail})
    }catch(err){
        return console.log(err)
    }
    
    if(!blogUser) return res.status(404).json({message: "User doesn't exist"})
    const ifUserAuthorized = await checkAuthorisation(req, blogUser)
    if(!ifUserAuthorized) return res.status(401).json({message: "User Unauthorized"})
    let newBlog
    var currentTime = new Date()
    try{
       newBlog = await new Blog({title, description, user: blogUser, createdAt: currentTime})
    }catch(err){
        return console.log(err)
    }

    try{
        // const session = await mongoose.startSession()
        // session.startTransaction()
        await newBlog.save()
        blogUser.blogs.push(newBlog)
        await blogUser.save()
        // await session.commitTransaction()
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err})
    }
    
    return res.status(201).json({message: "Blog created"})
}

const deleteABlog = async(req, res, next) => {
    let blog
    let blogExist = await Blog.findById(req.params.id)
    if(!blogExist) return res.status(404).json({message: "Blog not found.."})
    try{
        blog = await Blog.findByIdAndRemove(req.params.id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.likedBlogs.pull(blog)
        await blog.user.save()
    }catch(err){
        return console.log(err)
    }
    if(!blog) return res.status(500).json({message: "Internal server error"})
    return res.status(201).json({message: "Successfuly deleted"})
}


const updateABlog = async(req, res, next) => {
    let id = req.params.id
    let blogExist 
    try{
        blogExist  = await Blog.findById(id)
    }catch(err){
        return console.log(err)
    }
    if(!blogExist) return res.status(404).json({message: "Blog not found.."})
    let blog
    const {title, description} = req.body
    try{
        blog = await Blog.findByIdAndUpdate(id, {title, description})
    }catch(err){
        return console.log(err)
    }
    if(!blog) return res.status(500).json("Internal server error..")
    blog.save()
    return res.status(200).json({message: "Blog updated"})
}


const getBlogById = async(req, res, next) => {
    let blog 
    try{
        blog = await Blog.findById(req.params.id)
    }catch(err){
        return console.log(err)
    }
    if(!blog) return res.status(404).json({message: "Blog not found"})
    return res.status(200).json({blog})
}

const getBlogByUser = async (req, res, next) => {
    let blog
    let user
    try{
        user = await User.findById(req.params.id).populate("blogs")
        blog = user.blogs
    }catch(error){
        console.log(error)
        return res.status(500).json({error})
    }
    if(!user) return res.status(404).json({message: "User not found"})
    return res.status(200).json({blog})
}


const likeBlogInFeed = async (req, res, next) => {
    let blog
    try {
        blog = await Blog.findById(req.params.id)
        console.log(blog)
        
    }catch(err){
        console.log(err)
        return res.status(500).json({err})
    }
    if (!blog) return res.status(404).json({message: "Blog doesn't exist"})
    let userEmail = loggedInUserInfo(req)
    let currentUser = await User.findOne({email: userEmail})
    console.log("current user info", currentUser)
    
    blog.likedBy.push(currentUser)
    currentUser.likedBlogs.push(blog)
    await blog.save()
    await currentUser.save()
    

    return res.status(201).json({message: "You have liked this blog"})


}

module.exports = {getAllBlogs, createABlog, deleteABlog, updateABlog, getBlogById, getBlogByUser, likeBlogInFeed}