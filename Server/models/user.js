const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   
    userName:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    googleId:{
        type:String,
        required:true
    },
    userImageUri:{
        type:String
    }
});

const User = mongoose.model('User',userSchema);

module.exports = User;