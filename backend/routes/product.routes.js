const express = require('express')
const productController = require('../controllers/product.controller.js')
const upload = require('../middleware/multer.middleware.js')
const adminAuth = require("../middleware/adminAuth.middleware.js")

const router = express.Router()

router.post('/add',adminAuth,upload.fields([
    {name:"image1" , maxCount:1},
    {name:"image2" , maxCount:1},
    {name:"image3" , maxCount:1},
    {name:"image4" , maxCount:1}
]),productController.addProduct)
router.delete('/remove',adminAuth,productController.removeProduct)
router.get('/single',adminAuth,productController.singleProduct)
router.get('/list',adminAuth,productController.listProducts)

module.exports = router