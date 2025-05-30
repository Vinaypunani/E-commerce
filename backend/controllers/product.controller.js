const { json } = require('express')
const productModel = require('../models/product.model.js')
const cloudinary = require('cloudinary').v2

const addProduct = async (req,res) =>{
    try {
        const {name, description,price,category,subCategory,sizes,bestseller} = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=> item !== undefined )

        const imagesUrl = await Promise.all(
            images.map(async(item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:"image"})
                return result.secure_url
            })
        )

        const product = await productModel.create({
            name, 
            description,
            price:Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            date: Date.now(),
            images:imagesUrl
        })

        res.json({success:true,message:"Product Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const listProducts = async (req,res) =>{
    try {
        const products = await productModel.find({})

        res.json({success:true,products})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const removeProduct = async (req,res) =>{
    try {   
        if(req.body.id){
            await productModel.findByIdAndDelete(req.body.id)
        }
        else{
            res.json({success:false ,message:"Something went wrong"})
        }

        res.json({success:true ,message:"Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const singleProduct = async (req,res) =>{
    try {
        const product = await productModel.findById(req.body.id)
        
        if(!product){
            return res.json({success:false,message:"Product Not Found"})
        }

        res.json({success:true,product})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

module.exports = { addProduct,removeProduct,singleProduct,listProducts }