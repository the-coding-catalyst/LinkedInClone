const User = require("../model/user")
const jwt = require('jsonwebtoken')

const loggedInUserInfo = (req) => {
    let token = req.headers.cookie
    token = token.slice(4, token.length)
    const userInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    return userInfo.email
}

const ifRequestAlreadySent = async(firstUser, secondUser) => {
    let firstUserEmail = firstUser.email
    let secondUserEmail = secondUser.email
    
    try{
        let sentRequests = await firstUser.sentRequests
        let connectionRequests = await secondUser.connectionsRequests
        // console.log(firstUserEmail, secondUserEmail, "herer-------------------------")
        if(sentRequests.includes(secondUserEmail) && connectionRequests.includes(firstUserEmail)) return true
        return false
    }catch(err){
        console.log(err)
    }
}
const seeConnectionRequests = async (req, res, next) => {
    let email = loggedInUserInfo(req)
    let user = await User.findOne({email: email})
    let connectionRequests = user.connectionsRequests
    return res.status(200).json({connectionRequests})
}

const seeConnectionsList = async (req, res, next) => {
    let email = loggedInUserInfo(req)
    let user = await User.findOne({email: email})
    let connections = user.connections
    return res.status(200).json({connections})
}
const sendConnectionRequest = async (req, res, next) => {
    let secondUser 
    const email = req.body.email
    try{
        secondUser = await User.findOne({email})
    }catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal Server error"})
    }
    if(!secondUser) res.status(404).json({message: "End User not found.."})
    const currentUserEmail = loggedInUserInfo(req)
    const currentUser = await User.findOne({email: currentUserEmail})
    console.log(currentUser.email, currentUserEmail, "------------------")
    const requestSentAlready = await ifRequestAlreadySent(currentUser, secondUser)
    // console.log(requestSentAlready)
    if(requestSentAlready) return res.status(400).json({message: "Connection Request Already sent"})
    secondUser.connectionsRequests.push(currentUserEmail)
    currentUser.sentRequests.push(secondUser.email)
   
    await currentUser.save()
    await secondUser.save()
    return res.status(200).json({message: "Connection Request sent..."})

}

const acceptConnectionRequest = async (req, res, next) => {
    let newConnection
    try{
        newConnection = await User.findOne({email: req.body.email})
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
    if(!newConnection) return res.status(404).json({message: "User not present.."})
    const currentUserEmail = loggedInUserInfo(req)
    const currentUser = await User.findOne({email: currentUserEmail})
    if(!currentUser.connectionsRequests.includes(req.body.email)) return res.status(400).json({message: "User hasn't requested to connect"})
    currentUser.connections.push(req.body.email)
    newConnection.connections.push(currentUserEmail)
    const indexOne = currentUser.connectionsRequests.indexOf(req.body.email)
    const indexTwo = newConnection.sentRequests.indexOf(currentUserEmail)
    currentUser.connectionsRequests.splice(indexOne)
    newConnection.sentRequests.splice(indexTwo)
    await currentUser.save()
    await newConnection.save()
    return res.status(200).json({message: "Connection Request accepted.."})
}

module.exports = {sendConnectionRequest, acceptConnectionRequest, seeConnectionRequests, seeConnectionsList}