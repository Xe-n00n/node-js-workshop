const express=require("express")
const {getAllTasks,getOneTask,createTask,updateTask,deleteTask}=require("./controllers")
const app=express()
app.use(express.json())




app.get("/tasks",getAllTasks)
app.get("/tasks/:id",getOneTask)
app.post("/tasks",createTask)
app.put("/tasks/:id",updateTask)
app.delete("/tasks/:id",deleteTask)

app.listen(8080,()=>{

    console.log("the server is running on port 8080")
})


