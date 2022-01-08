const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name : {
        type:String,
        required: [true, 'Please provide name'],
        minlength : 3,
        maxlength : 50,
    },
    email : {
        type:String,
        required: [true, 'Please provide email'],
      match:[ /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Please provide vaild email'],
        unique : true,
    },
    email : {
        type:String,
        required: [true, 'Please provide password'],
        minlength : 6,
        maxlength : 12
     
    }
})

module.exports = mongoose.model("User", UserSchema)