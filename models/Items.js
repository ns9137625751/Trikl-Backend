const mongoose = require('mongoose');
const {Schema} = mongoose;
 
const ItemsSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    address:{
        type:String,
        require:true,
    },
    phonenumber: {
        type:Number,
        require:true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('items',ItemsSchema)