const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
   productOwnerId:{
    type:String,
    required:true
   },
    productName:{
        type:String,
        required:true
    },
    productImageUri:{
        type:String,
        required:true
    },
    productDescription:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    productQuantity:{
        type:Number,
        required:true

    }
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;