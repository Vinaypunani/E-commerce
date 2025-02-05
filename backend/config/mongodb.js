const mongoose = require('mongoose')

const connectDB = async () =>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/forever`)
       console.log("DB connected ...")
    } catch (error) {
        console.log("DB connection error => ",error.message)
    }
}

module.exports = connectDB