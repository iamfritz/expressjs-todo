const Todo = require("../models/todo.model");

const getTodos = async (req, res) => {
  let result = {
    status: "error",
    message: "",
    data: {},
  };

  try {
    const items = await Todo.find();

    if (items) {
      let { page, limit } = req.query;

      page = page ? parseInt(page) : 1;
      page = page <= 0 ? 1 : page;
      limit = limit ? parseInt(limit) : 10;
      limit = limit <= 0 ? 1 : limit;

      // calculating the starting and ending index
      let startIndex = (page - 1) * limit;
      let endIndex = page * limit;
      endIndex = endIndex > items.length ? items.length : endIndex;
      let totalPages = Math.ceil(items.length / limit);

      // Check if the start index is out of bounds
      if (startIndex >= items.length) {
        res
          .status(400)
          .json({ status: "error", message: "Page number out of range" });
      }

      let todoItems = items.slice(startIndex, endIndex);
      result["status"] = "success";
      result["paging"] = {
        total: items.length,
        pages: totalPages,
        page: page,
        limit: limit,
      };
      result["data"] = todoItems;

      res.json(result);
    } else {
      result["status"] = "error";
      result["message"] = `No Record found.`;

      res.status(400).json(result);
    }
  } catch (error) {
    result["status"] = "error";
    result["message"] = error.message;

    res.status(500).json(result);
  }
};

//post a new todo
const createTodo = async (req, res) => {
  let result = {
    status: "error",
    message: "",
    data: {},
  };
  try {
    const data = new Todo({
      title: req.body.title,
      description: req.body.description,
      level: req.body.level,
      status: req.body.status,
    });

    const newTodo = await data.save();
    if (newTodo) {
      result["status"] = "success";
      result["data"] = newTodo;

      res.json(result);
    } else {
      result["status"] = "error";
      result["message"] = `Unable to add a new record.`;
      res.status(401).json(result);
    }
  } catch (error) {
    result["status"] = "error";
    result["message"] = error.message;

    res.status(500).json(result);
  }
};

//get todo
const getTodo = async (req, res) => {
  let result = {
    status: "error",
    message: "",
    data: {},
  };
  try {
    const data = await Todo.findById(req.params.id);
    if (data) {
      result["status"] = "success";
      result["data"] = data;
      res.json(result);
    } else {
      result["status"] = "error";
      result["message"] = `Record not found.`;

      res.status(401).json(result);
    }
  } catch (error) {
    result["status"] = "error";
    result["message"] = error.message;

    res.status(500).json(result);
  }
};

//update todo
const updateTodo = async (req, res) => {
    let result = {
      status: "error",
      message: "",
      data: {},
    };
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const options = { new: true };

        const data = await Todo.findByIdAndUpdate(id, updatedData, options);
        if (data) {
            result["status"]    = "success";
            result["message"]   = `Record has been updated.`;
            result["data"]      = data;

            res.json(result);
        } else {
            result["status"] = "error";
            result["message"] = `Unable to update a record.`;
            res.status(401).json(result);
        }
    } catch (error) {
        result["status"] = "error";
        result["message"] = error.message;

        res.status(500).json(result);
    }
};

//delete todo
const deleteTodo = async (req, res) => {
  let result = {
    status: "error",
    message: "",
    data: {},
  };
  try {
    const data = await Todo.findByIdAndDelete(req.params.id);
    if (data) {
      result["status"] = "success";
      result["message"] = `Record has been deleted.`;
      res.json(result);
    } else {
      result["status"] = "error";
      result["message"] = `Unable to delete a record.`;
      res.status(401).json(result);
    }
  } catch (error) {
    result["status"] = "error";
    result["message"] = error.message;

    res.status(500).json(result);
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
