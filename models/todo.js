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
//- Creates a Mongoose model called Todo based on the todoschema schema. model represents a collection in the MongoDB database and provides an interface for querying and manipulating documents in that collection.
const Todo = mongoose.model("Todo", todoschema);
module.exports = Todo;