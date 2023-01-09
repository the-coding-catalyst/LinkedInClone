const Users = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express()
app.use(cookieParser())



const getAllUsers = async (req, res, next) => {
    
    let users 
    try {
        users = await Users.find()
    } catch (err){
        console.log(err)
    }
    if(!users) return res.status(404).json({message: "User not found"})
    return res.status(200).json({users})
}

const signUpUser = async (req, res, next) => {
    console.log("request was here")
    const {name, email, password} = req.body
    let existingUser
    try{
        existingUser = await Users.findOne({email})
    }catch(err){
        return console.log(err)
    }
    if(existingUser) return res.status(400).json({message: "User already exists.."})
    try{
        const hashedPassword = bcrypt.hashSync(password)
        var user = new Users({
            name, email, password: hashedPassword, followers: [], totalFollowers:0, totalFollowings: 0, followings: [], blogs: [], connections:[], connectionsRequests:[], sentRequests:[]
        })
        await user.save()
    }catch(err){
        return console.log(err)
    }
    return res.status(201).json({user})
    
}

const loginUser = async(req, res, next) => {
    let user
    const {email, password} = req.body
    try{
        user = await Users.findOne({email})
    }catch(err){
        return console.log(err)
    }
    if(!user) return res.status(404).json({message: "User doesn't exist"})
    const isPasswordCorrect = bcrypt.compareSync(password, user.password)
    if(!isPasswordCorrect) return res.status(400).json({message: "incorrect password"})
    let userInfo = {email: email, password: user.password}
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 10000})
    res.cookie("jwt", accessToken)
    
    // console.log(res.cookie, "cookie object info")
    res.status(200).json({message: "Login Successful"})
    
}

module.exports = {signUpUser, getAllUsers, loginUser}

