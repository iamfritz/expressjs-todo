const express = require("express");
const router = express.Router();
const Todo = require("../models/todo.model");
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller");

module.exports = router;

//get all task
router.get("/todo", getTodos);

//post a new todo
router.post("/todo", createTodo );

//get todo
router.get("/todo/:id", getTodo);

//update todo
router.patch("/todo/update/:id", updateTodo );

//delete todo
router.delete("/todo/delete/:id", deleteTodo);

router.use((req, res, next) => {
  res.status(400).json({ status: "error", message: "Not Found" });
});