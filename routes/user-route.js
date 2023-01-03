const express = require('express')
const {getAllUsers, signUpUser, loginUser} = require('../controllers/user-controller')

const router = express.Router()

router.get("/", getAllUsers)
router.post("/signup", signUpUser)
router.post("/login", loginUser)

module.exports = router
