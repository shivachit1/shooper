const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessSchema = new Schema({
    businessOwner:{
        type:String,
        required:true
    },
    businessName:{
        type:String,
        required:true
    },
    businessImageUri:{
        type:String,
        required:true
    },
    businessDescription:{
        type:String,
        required:true
    },
    location:{
        lattitude:{
            type:String,
            required:true
        },
        longitude:{
            type:String,
            required:true
        }
        
    }
});

const Business = mongoose.model('Business',businessSchema);

module.exports = Business;