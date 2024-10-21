const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    categoryId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    name : {
        type : String,
        required : true
    },
    qny :{
        type : Number,
        default :1
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
})
const product = mongoose.model('product', productSchema);
module.exports = product


