const orderModel = require('../models/order.model.js')
const userModel = require('../models/user.model.js')

// COD
const placeOrder = async (req, res) => {
    try {

        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = await orderModel.create(orderData)

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order Placed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Stripe
const placeOrderStripe = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Razorpay
const placeOrderRazorpay = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Order Data for admin
const allOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({})

        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Order Data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body

        const orders = await orderModel.find({ userId })

        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update order status for admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId , status } = req.body

        await orderModel.findByIdAndUpdate(orderId,{status})

        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

module.exports = { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus }

