const express = require('express')
const { sendConnectionRequest, acceptConnectionRequest, seeConnectionRequests, seeConnectionsList, searchUser } = require('../controllers/connections-controller')
const connectRouter = express.Router()

connectRouter.post("/send", sendConnectionRequest)
connectRouter.post("/accept", acceptConnectionRequest)
connectRouter.get("/", seeConnectionRequests)
connectRouter.get("/list", seeConnectionsList)
connectRouter.post("/search", searchUser)


module.exports = connectRouter