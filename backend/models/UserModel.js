const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName:{
          firstName: {
          type: String,
          required: true
          },
          lastName: {
          type: String,
          },
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,

    },
    otp_expiry: {
        type: Date,
        expiresIn: 10
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    image_url: {
        type: String,
    },
    credits: {
    type: Number,
    default: 30,
    },
    lastCreditReset: {
    type: Date,
    default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password, 10);
}

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function(){
   const token=jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
   return token;
}

const User = mongoose.model('User', userSchema)
module.exports = User;