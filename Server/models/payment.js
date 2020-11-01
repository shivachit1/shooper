const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
   
    cardHolderName:{
        type:String,
        required:true
    },
    cardNumber:{
        type:String,
        required:true
    },
    expiryTime:{
        month:{
            type:String,
            required:true
        },
        year:{
            type:String,
            required:true
        }
    },
    cvv:{
        type:String,
        required:true
    }
});

const Payment = mongoose.model('Payment',paymentSchema);

module.exports = Payment;