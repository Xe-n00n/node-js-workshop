const { readAll, readOne, update, Delete, Create } = require("./services");

function getAllTasks(req, res) {
  try {
    const data = readAll("data.json");

    return res.status(200).json({
      message: "success",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      Content: err.message,
    });
  }
}

function getOneTask(req, res) {
  try {
    const { id } = req.params;
    const task = readOne("data.json", +id);
    console.log(task);
    if (task) {
      return res.status(200).json({
        message: "success",
        data: task,
      });
    }
    return res.status(404).json({
      message: "data not found",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      Content: err.message,
    });
  }
}

function createTask(req, res) {
  try {
    const data = req.body;
    const createdTask = Create("data.json", data);
    res.status(201).json({
      message: "task created successfully",
      data: createdTask,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      Content: err.message,
    });
  }
}

function updateTask(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedTask = update("data.json", +id, data);

    if (updatedTask) {
      return res.status(200).json({
        message: "task updated",
        data: updatedTask,
      });
    }

    return res.status(404).json({
      message: "Task not found",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      Content: err.message,
    });
  }
}

function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const toDelete= readOne("data.json",+id)
    if(!toDelete){
        return res.status(404).json({
            "message":"Task not found"
        })
    }
    const deletedObject= Delete("data.json",+id)
    return res.status(200).json({
        "message":"done"
    })

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      Content: err.message,
    });
  }
}

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
};
