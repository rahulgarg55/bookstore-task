const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoroutes = require("./todo/todo.route");
const app = express();
const path = require("path"); 

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
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValidPassword = await user.isValidPassword(password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({ username, password });

    await newUser.save();

    return res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});



app.listen(port, () => {
  console.log(`server is now started on http://${host}:${port}`);
});
