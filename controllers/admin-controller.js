const { ConnectionStates } = require('mongoose')
const User = require('../model/user')
const users = require("../addUsers")
const Blog = require('../model/blog')

const addConnections = async(req, res, next) => {
    const {emailOne, emailTwo} = req.body
    try{
        var userOne = await User.findOne({email: emailOne})
        var userTwo = await User.findOne({email: emailTwo})
    }catch (err){
        return res.status(500).json({err})
    }if(!userOne || !userTwo) return res.status(404).json({message: "User/Users not found"})
    const connectionsOne = userOne.connections
    if(connectionsOne.includes(emailTwo)) return res.status(400).json({message: "Already a connection"})
    userOne.connections.push(emailTwo)
    userTwo.connections.push(emailOne)
    await userOne.save()
    await userTwo.save()
    return res.status(200).json({message: "Connections added successfully"})
    

}

const addUser = async(req, res, next) => {
    const usersArray = users["users"]
    // console.log(usersArray)
    let user
    usersArray.forEach(async(userInfo) => {
        console.log(userInfo, "userinfo")
        let userExist
    try{
        userExist = await User.findOne({email: userInfo.email})
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
    if(userExist) return res.status(400).json({message: "User already exists..."})
    user = new User({name, email, password, blogs, connections, connectionsRequests, sentRequests, likedBlogs, feed})
    console.log(user, "------------------")
    await user.save()
    })
    
    
    return res.status(201).json({user})
}


const deleteAll = async (req, res, next) => {
    const value = req.body.value
    let toDelete
    if(value == "user") toDelete = await User.deleteMany()
    else toDelete = await Blog.deleteMany() 
    
    return res.status(204).json({message: "deleted"})
}

module.exports = {addConnections, addUser, deleteAll}