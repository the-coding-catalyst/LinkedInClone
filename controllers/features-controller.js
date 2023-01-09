const User = require("../model/user")
const Blog = require("../model/blog")
const Comments = require("../model/comment")
const { loggedInUserInfo } = require("./connections-controller")

const followUser = async (req, res, next) => {
    const id = req.params.id
    let secondUser
    try{
        secondUser = await User.findById(id)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal server error"})
    }
    if(!secondUser) return res.status(404).json({message: "No user found with this id..."})
    let userEmail = loggedInUserInfo(req)
    let user = await User.findOne({email: userEmail})
    if(user.email == secondUser.email) return res.status(400).json({message: "You can't follow yourself"})
    user.followings.push(secondUser)
    secondUser.followers.push(user)
    secondUser.totalFollowers += 1
    user.totalFollowings += 1
    await user.save()
    await secondUser.save()
    return res.status(200).json({message: "User followed successfuly...."})
}


const unfollowUser = async (req, res, next) => {
    const id = req.params.id
    let secondUser
    try{
        secondUser = await User.findById(id)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal server error"})
    }
    if(!secondUser) return res.status(404).json({message: "No user found with this id..."})
    let userEmail = loggedInUserInfo(req)
    let user = await User.findOne({email: userEmail})
    if(user.email == secondUser.email) return res.status(400).json({message: "You can't follow/Unfollow yourself"})
    user.followings.pop(secondUser)
    secondUser.followers.pop(user)
    secondUser.totalFollowers -= 1
    user.totalFollowings -= 1
    await user.save()
    await secondUser.save()
    return res.status(200).json({message: "User Unfollowed successfuly...."})
}


const unlikeBlog = async (req, res, next) => {
    const id = req.params.id
    let blog 
    try{
        blog = await Blog.findById(id)
    }catch(err){
        return res.status(500).json({message: "Internal server error"})
    }
    if(!blog) return res.status(404).json({message: "Blog not found"})
    const userEmail = loggedInUserInfo(req)
    let user = await User.findOne({email: userEmail})
    const likedBlogs = user.likedBlogs
    console.log(likedBlogs, blog, "likedBlogs info---------")
    if(!likedBlogs.includes(blog.id)) return res.status(400).json({message: "Blog has not been liked earlier"})
    blog.likedBy.pop(user)
    user.likedBlogs.pop(blog)
    await blog.save()
    await user.save()
    return res.status(200).json({message: "You have unliked the blog"})
    
}

const commentOnBlog = async (req, res, next) => {
    let blog
    const content = req.body.comment
    const id = req.params.id
    try{
        blog = await Blog.findById(id)
    }catch(err){
        return res.status(500).json({message: "Internal Server error"})
    }
    if(!blog) return res.status(404).json({message: "Blog not found with given id.."})
    const userEmail = loggedInUserInfo(req)
    const user = await User.findOne({email: userEmail})
    const comment = new Comments({user, blog, content})
    blog.comments.push(comment)
    await comment.save()
    await blog.save()
    const commentId = comment.id
    return res.status(201).json({message: "Comment added succesfully",commentId })

}


const postsByCurrentUser = async (req, res, next) => {
    const userEmail = loggedInUserInfo(req)
    const user = await User.findOne({email: userEmail})
    const blogs = user.blogs
    // console.log({id: blog.id, title: blog.title, desc: blog.description, created_at: blog.createdAt, comments: blog.comments, likes: blog.likedBy})
    // return res.status(200).json({blogs})
    const result = []
    blogs.forEach(async(id) => {
        const blog = await Blog.findById(id)
        result.push({id: blog.id, title: blog.title, desc: blog.description, created_at: blog.createdAt, comments: blog.comments, likes: blog.likedBy})
    });
    await user.save()
    return res.status(200).json(result)
}
module.exports = {followUser, unfollowUser, unlikeBlog, commentOnBlog, postsByCurrentUser}