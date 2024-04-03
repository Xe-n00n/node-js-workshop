const fs = require("fs");

function readAll(file) {
    const data = fs.readFileSync(file);
    return JSON.parse(data);

}

function readOne(file, id) {

    const data = readAll(file);

    const task = data.find((task) => task.id === id);

    return task;
 
}

function Create(file, object) {
  console.log(object)
    const data = readAll(file);
    object.id = data.length + 1;
    data.push(object);
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    return object;

}

function Delete(file, id) {

    const data = readAll(file);
    const deletedObject = data.filter((task) => task.id !== id);

    fs.writeFileSync(file, JSON.stringify(deletedObject, null, 2));
    return deletedObject;

}

function update(file, id, updatedTask) {

    const tasks = readAll(file);
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedTask };
      fs.writeFileSync(file, JSON.stringify(tasks, null, 2));

      return tasks[index];
    } else {
      return null;
    }

}

module.exports = {
  readAll,
  readOne,
  Create,
  Delete,
  update,
};
