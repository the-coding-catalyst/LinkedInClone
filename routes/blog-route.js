const express = require('express')
const { getAllBlogs, createABlog, deleteABlog, updateABlog, getBlogById, getBlogByUser, likeBlogInFeed } = require('../controllers/blog-controller')
const blog = require('../model/blog')
const blogRouter = express.Router()

blogRouter.get("/", getAllBlogs)
blogRouter.post("/create", createABlog)
blogRouter.delete("/:id", deleteABlog)
blogRouter.put("/:id", updateABlog)
blogRouter.get("/:id", getBlogById)
blogRouter.get("/user/:id", getBlogByUser)
blogRouter.post("/like", likeBlogInFeed)

module.exports = blogRouter