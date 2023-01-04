const express = require('express')
const { addConnections } = require('../controllers/admin-controller')
const adminRouter = express.Router()

adminRouter.post("/connect", addConnections)
module.exports = adminRouter