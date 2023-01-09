const express = require('express')
const { addConnections, addUser, deleteAll } = require('../controllers/admin-controller')
const adminRouter = express.Router()

adminRouter.post("/connect", addConnections)

adminRouter.get("/signup", addUser)
adminRouter.get("/delete",deleteAll)
module.exports = adminRouter