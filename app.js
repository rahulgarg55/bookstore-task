const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoroutes = require("./todo/todo.route");
const app = express();
const path = require("path"); 
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes'); 

const User = require("./models/user.js"); 
const TodoModel = require("./models/todo.js");

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

app.use(express.static(path.join(__dirname, "views")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/todos", async (req, res) => {
  const { booknumber, title, author } = req.body;

  try {
    const newBook = new TodoModel({ booknumber, title, author });

    const savedBook = await newBook.save();

    return res.status(HttpStatus.StatusCodes.CREATED).json(savedBook);
  } catch (error) {
    console.error("Error adding book:", error);
    return res.sendStatus(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR);
  }
});


app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.sendStatus(HttpStatus.StatusCodes.UNAUTHORIZED);
    }

    const isValidPassword = await user.isValidPassword(password);

    if (!isValidPassword) {
      return res.sendStatus(HttpStatus.StatusCodes.UNAUTHORIZED);
    }
    
    const token = jwt.sign({ userId: user._id }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', { expiresIn: '5h' });

    return res.status(HttpStatus.StatusCodes.OK).json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    return res.sendStatus(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.sendStatus(HttpStatus.StatusCodes.CONFLICT);
    }

    const newUser = new User({ username, password });

    await newUser.save();

    return res.sendStatus(HttpStatus.StatusCodes.CREATED);
  } catch (error) {
    console.error("Signup error:", error);
    return res.sendStatus(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

app.listen(port, () => {
  console.log(`server is now started on http://${host}:${port}`);
});
