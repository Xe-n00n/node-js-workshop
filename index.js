const http=require('http')

const{readAll,readOne,Create,Delete,update}=require('./services')

//simple server for handling get requests
//the server accepts 1 method on 3 routes
//1. /hello-world returns Hello world
//2. /tasks returns all tasks
//3. /tasks/:id returns a single task by id


const server=http.createServer((req,res)=>{
    res.setHeader("Content-Type","application/json")
    if(req.url==="/hello-world" && req.method==="GET"){
        res.writeHead(200)
        res.end(JSON.stringify(
        {
            "message":"Hello world"
        }
        ))
    }
    if(req.url==="/tasks" && req.method==="GET"){
        const data=readAll("data.json")
        res.writeHead(200)
        res.end(JSON.stringify({
            "message":"success",
            "data":data
        }))
        
    }
    if(req.url.startsWith("/")&& req.method==="GET"){
    
        const id=req.url.split("/")[2]
        console.log(id)
        const task=readOne("data.json",+id)
        console.log(task)
        res.writeHead(200)
        res.end(JSON.stringify({
            "message":"data found",
            "data":task
        }))
    }


})

server.listen(8080,()=>{
    console.log("server is running on 8080")
})
