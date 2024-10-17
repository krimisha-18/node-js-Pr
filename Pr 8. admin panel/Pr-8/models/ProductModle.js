const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    },
    exsubcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exsubcategory'
    },
    product: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true

    },
    qnty :{
        type:Number,
        required:true
    },
    price: {
        type: Number,
        required: true
    },
    image:{
        type:String,
        required:true
    },
    status :{
        type: String,
        default :'Active'
    }
})
const product = mongoose.model('product', productSchema);
module.exports = product;