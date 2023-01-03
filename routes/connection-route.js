const express = require('express')
const { sendConnectionRequest, acceptConnectionRequest, seeConnectionRequests, seeConnectionsList } = require('../controllers/connections-controller')
const connectRouter = express.Router()

connectRouter.post("/send", sendConnectionRequest)
connectRouter.post("/accept", acceptConnectionRequest)
connectRouter.get("/", seeConnectionRequests)
connectRouter.get("/list", seeConnectionsList)

module.exports = connectRouter