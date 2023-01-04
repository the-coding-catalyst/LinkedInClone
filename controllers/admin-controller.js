const { ConnectionStates } = require('mongoose')
const User = require('../model/user')

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

module.exports = {addConnections}