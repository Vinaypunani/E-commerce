const express = require('express')
const {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus} = require('../controllers/order.controller.js')
const authUser = require('../middleware/auth.middleware.js')
const adminAuth = require('../middleware/adminAuth.middleware.js')

const router = express.Router()

// admin 
router.post('/list',adminAuth,allOrders)
router.post('/status',adminAuth,updateStatus)

// payment
router.post('/place',authUser,placeOrder)
router.post('/stripe',authUser,placeOrderStripe)
router.post('/razorpay',authUser,placeOrderRazorpay)

// user
router.post('/userorders',authUser,userOrders)

module.exports = router
