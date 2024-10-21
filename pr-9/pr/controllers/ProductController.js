const ProductModel = require('../models/productModel')

const addproduct = async(req,res) =>{
    try {
        const {category,name,price,description,} = req.body
        console.log( req.category )
        await ProductModel.create({
            categoryId:category,
            name:name,
            price:price,
            description:description,
        })
        res.status(200).send({
            success: true,
            message: "Product Added Successfully",

        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
    }
}
const viewproduct = async(req,res) =>{
    try {
        const product = await ProductModel.find({})
            res.status(200).send({
            success: true,
            message: "product View Successfully",
            product

        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })
    }
}
module.exports = {
    addproduct,
    viewproduct
}