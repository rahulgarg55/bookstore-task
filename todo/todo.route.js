const express=require("express"); 
const router=express.Router();
const todoController = require("../controller/todo.controller");

router.get("/", todoController.getBooks);
router.get("/booknumber/:booknumber", todoController.getBookByNumber);
router.post("/", todoController.createBook); // Use POST for updating a book
router.put("/", todoController.updateBook);
router.delete("/booknumber/:booknumber", todoController.deleteBook);

module.exports = router;
