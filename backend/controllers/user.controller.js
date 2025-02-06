const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model.js')

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if(password.length < 8){ 
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        const hashedPassword = await bcrypt.hash(password ,10)

        const user = await userModel.create({
            name,
            email,
            password:hashedPassword
        })

        const token = createToken(user._id)

        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const loginUser = async (req, res) => {
    try {
        const {email,password} = req.body

        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false ,message:"Email or password is incorrect"})
        }
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false ,message:"Email or password is incorrect"})
        }

        const token = createToken(user._id)

        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const adminLogin = async (req, res) => {
    try {
        const {email,password} = req.body

        if(email.toLowerCase() === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email.toLowerCase()+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Email or password is incorrect"})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

module.exports = { loginUser, registerUser, adminLogin }