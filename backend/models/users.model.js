const mongoose  = require('mongoose');

const Schema =  mongoose.Schema

const userSchema =  new Schema({
    id:{
        type: String,
    required: true,
    unique: true,
    trim: true,
    },
    username:{
        type: String,
    required: true,
    trim: true,
    },
    favdata:{
        type:Array,
        uniqueItems:true,
    },
})


const Users = mongoose.model('Users', userSchema);

module.exports = Users;