const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:String,
    slug:{
        type:String,
        unique:true,
        required:true
    },
    stock:Number,
    price:Number,
    isDeleted:Boolean,
    isActive:Boolean,
    category:{
        type:String,
        enum:['men','women']
    },
    subCategory:{
        type:String,
    },
    imgURL:String
},{timestamps:true})
const Product = mongoose.model('Product', productSchema);

module.exports = Product;