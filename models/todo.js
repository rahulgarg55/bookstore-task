const mongoose = require("mongoose");

const todoschema = new mongoose.Schema({
  booknumber: {
    type: Number,
    required: true,
  },
   title: {
    type: String,
    default: false,
  },
  author:{
    type:String,
    default:false,    
  }
});
const Todo = mongoose.model("Todo", todoschema);
module.exports = Todo;