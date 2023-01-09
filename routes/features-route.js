const express = require('express')
const { createABlog, deleteABlog, likeBlogInFeed, getBlogById } = require('../controllers/blog-controller')
const { loggedInUserInfo } = require('../controllers/connections-controller')
const { followUser, unfollowUser, unlikeBlog, commentOnBlog, postsByCurrentUser } = require('../controllers/features-controller')
const { loginUser } = require('../controllers/user-controller')

const featuresRouter = express.Router()

featuresRouter.post("/authenticate", loginUser)
featuresRouter.post("/follow/:id", followUser)
featuresRouter.post("/unfollow/:id", unfollowUser)
featuresRouter.get("/user", loggedInUserInfo)
featuresRouter.post("/post", createABlog)
featuresRouter.delete("/posts/:id", deleteABlog)
featuresRouter.post("/like/:id", likeBlogInFeed)
featuresRouter.post("/unlike/:id", unlikeBlog)
featuresRouter.post("/comment/:id", commentOnBlog)
featuresRouter.get("/post/:id", getBlogById)
featuresRouter.get("/all_posts", postsByCurrentUser)

module.exports = featuresRouter