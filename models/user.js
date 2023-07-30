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

<<<<<<< HEAD
userschema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

=======
>>>>>>> e8771acb4e27e434e3a2fbca008b9388e42fc855
userschema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const user = mongoose.model("User", userschema, "login-signup");
module.exports = user;
<<<<<<< HEAD


=======
>>>>>>> e8771acb4e27e434e3a2fbca008b9388e42fc855
