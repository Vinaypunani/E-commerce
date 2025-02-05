const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

const connectDB = require('./config/mongodb.js')

const userRouter = require("./routes/user.routes.js")

// app config
const app = express()
const PORT = process.env.PORT || 7001
connectDB()

// middleware
app.use(express.json())
app.use(cors())
// app.use(express.urlencoded({extended:true}))

// api endPoints

app.use('/api/user',userRouter)

app.listen(PORT,()=>console.log(`Server Running on ${PORT}`))