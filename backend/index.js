const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const connectCloudinary = require('./config/cloudinary.js')

const connectDB = require('./config/mongodb.js')

const userRouter = require("./routes/user.routes.js")
const productRouter = require('./routes/product.routes.js')
const cartRouter = require('./routes/cart.routes.js')
const orderRouter = require('./routes/order.routes.js')

// app config
const app = express()
const PORT = process.env.PORT || 7001
connectDB()
connectCloudinary()

// middleware
app.use(express.json())
app.use(cors())
// app.use(express.urlencoded({extended:true}))


// api endPoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


app.listen(PORT,()=>console.log(`Server Running on ${PORT}`))