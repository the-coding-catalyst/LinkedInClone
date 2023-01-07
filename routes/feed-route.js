const express = require('express')
const { showFeed } = require('../controllers/feed-controller')
const feedRouter = express.Router()

feedRouter.get("/", showFeed)

module.exports = feedRouter