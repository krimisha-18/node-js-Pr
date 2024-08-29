const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true
    }
    ,
    image: {
        type: String,
        required: true
    }
})
const user = mongoose.model('bookstore', userSchema);
module.exports = user