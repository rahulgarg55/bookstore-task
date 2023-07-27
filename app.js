const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const todoroutes = require("./todo/todo.route");
const app = express(); 
const host = "localhost";
const port = 8001;
app.use(cors()); 
app.use(express.json()); 
mongoose
  .connect("mongodb://127.0.0.1:27017/books", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((error) => console.log("error connecting==>", error));
app.use("/todos", todoroutes);


app.listen(port, () => {
  console.log(`server is now started on http://${host}:${port}`);
});
