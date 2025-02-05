const express = require("express")
const userController = require("../controllers/user.controller.js")

const router = express.Router()

router.post("/register",userController.registerUser)
router.post("/login",userController.loginUser)
router.post("/admin",userController.adminLogin)

module.exports = router