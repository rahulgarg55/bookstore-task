const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

userschema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    // await dosent wait for bcrypt.hash because bcrypt.hash does not return a promise.
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

userschema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const user = mongoose.model("User", userschema, "login-signup");
module.exports = user;
