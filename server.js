const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userDb = require("./model/user")
const blogRouter = require("./routes/blog-route")
const router = require("./routes/user-route")
const connectRouter = require("./routes/connection-route")
const jwt = require('jsonwebtoken')
const { application } = require('express')
const adminRouter = require('./routes/admin-route')
const feedRouter = require('./routes/feed-route')
const featuresRouter = require('./routes/features-route')

mongoose.connect('mongodb://localhost/Social', {
    useNewUrlParser: true, useUnifiedTopology: true
})



// mongoose.connect('mongodb+srv://ramit:ramit@cluster0.8fdlu.mongodb.net/Social?retryWrites=true&w=majority', (err)=>{
//     console.log("connected to db")
// })
app.all("/*", async (req, res, next) => {
    // console.log("request is here first--------")
    const unrestrictedPaths = ["/api/user/login", "/api/user/signup", "/api/blog"]
    if(!unrestrictedPaths.includes(req.path)){
        let token = req.headers.cookie
        // console.log(token, "this is cookie")
        if(!token) return res.status(403).json({message: "Please log in first"})
        token = token.slice(4, token.length)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
            try{
                if(err){return res.status(403).json({err})}
            }catch(err){
                return console.log(err)
            }
            req.user = user
        })
        
        
    }
    next()
})
app.use(express.json())
app.use("/api/user/feed", feedRouter)
app.use("/api/user", router)
app.use("/api/blog", blogRouter)
app.use("/api/user/connection", connectRouter)
app.use("/admin", adminRouter)
app.use("/api", featuresRouter)

app.listen(process.env.PORT || 5005, ()=> {console.log("Server started at port 5005")})
