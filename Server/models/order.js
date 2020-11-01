const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
   
    orderBy:{
        type:String,
        required:true
    },
    orderTo:{
        type:String,
        required:true
    },
    orderTime:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    products:{
        type:Array,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    }
});

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;