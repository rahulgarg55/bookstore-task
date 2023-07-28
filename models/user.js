const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
});

userschema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const user = mongoose.model("User", userschema, "login-signup");
module.exports = user;
