const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  phone: {
    type: String,
    required: [true, "Please provide mobile number"],
    unique: true
  },
  inactive: {
    type: Boolean,
    default: false,
  },
  oneTimePassword: String,
  oneTimePasswordExpire: Date,
});

UserSchema.methods.getSignedJwtToken = function () {
  // Give options json as 3rd parameter if token should expire after a while 
  // { expiresIn: process.env.JWT_EXPIRE }
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

UserSchema.methods.getOneTimePasswordToken = function () {

  var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 6; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 

  // Hash token (private key) and save to database
  this.oneTimePassword = OTP

  // Set token expire date
  this.oneTimePasswordExpire = Date.now() + (5 * 60 * 1000); // Five Minutes

  return OTP;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
