const express = require('express')
const {addToCart,getUserCart,updateCart} = require('../controllers/cart.controller.js')
const authUser = require('../middleware/auth.middleware.js')

const router = express.Router()

router.post('/get',authUser,getUserCart)
router.post('/add',authUser,addToCart)
router.post('/update',authUser,updateCart)

module.exports = router
