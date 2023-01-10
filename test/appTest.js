
const assert = require('chai').assert;
const features = require('../controllers/features-controller');
const Blog = require("../model/blog")
const User = require("../model/user")
const Comment = require("../model/comment");
const expect = require('chai').expect;
const delay = require('delay')
const mongoose = require('mongoose')
describe('features testing', function(done){

    // it('check the blog has valid name.', async function(){
    //     const blog = await Blog.find()
    //     console.log(blog)
    //     done()
    //     // assert.isString(chef.checkMenu(), 'string');
    // })
    mongoose.connect('mongodb+srv://ramit:ramit@cluster0.8fdlu.mongodb.net/Social?retryWrites=true&w=majority', (err)=>{
    console.log("connected to db")
})
    it('check the post has valid name type', async() => {
        const id = "63b7eaa1c04a110c5bbffdcb"
        const blog = await Blog.findById(id)
        // console.log(Blog)
        assert.isString(blog.title, 'string')
        // expect(blog).to.equal('promise resolved');
      });
      


    it('check the post has valid created time', async() => {
    const id = "63bba7a036c1b48d1ea94742"
    const blog = await Blog.findById(id)
    // console.log(Blog)
    const current = new Date()
    expect(blog.createdAt < current)
    // expect(blog).to.equal('promise resolved');
    });

    it("Testing follow feature", async() => {
        const idOne = "63b4ff672072a8cd6ce1c134"
        const idTwo = "63b3cab91cc425ee841781e8"
        const userOne = await User.findById(idOne)
        const userTwo = await User.findById(idTwo)
        const followings = userOne.followings
        const followers = userTwo.followers
        assert.equal(followings.includes(userTwo), followers.includes(userOne))
    })

    it("Checking if post created by user has the same user", async() => {
        const postId = "63b7eaa1c04a110c5bbffdcb"
        const userId = "63b4ff672072a8cd6ce1c134"
        const post = await Blog.findById(postId)
        assert.equal(post.user, userId)
    })
    

    it("Checking if liked post by user has same user id", async () => {
        const postId = "63b7eaa1c04a110c5bbffdcb"
        const userId = "63b5281cd0c6bdb71a2277b4"
        const post = await Blog.findById(postId)
        assert.oneOf(userId, post.likedBy)
    })

    it("Checking if comment posted by user has same user id", async () => {
        const commentId = "63bbc509a68d53a87a32fe55"
        const userId = "63b4ff672072a8cd6ce1c134"
        const comment = await Comment.findById(commentId)
        assert.equal(userId, comment.user)
    })
    // it('check for a dish in menu.', function (){
    //     let dish= chef.checkMenu()
    //     assert.oneOf(dish, chef.dishes)

    // });
    // done()
    
});