const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


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
    password : {
        type:String,
        required: [true, 'Please provide password'],
        minlength : 6,
      
     
    }
})

UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);
    next();
})

module.exports = mongoose.model("User", UserSchema)