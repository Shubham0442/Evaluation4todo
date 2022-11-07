const { Router } = require("express");
const { authenticate } = require("../Middlewares/Authenticate");
const { Todo } = require("../Models/todoModel");

const todoRouter = Router();


todoRouter.get("/", authenticate, async (req, res)=>{
     
    const { userId } = req.body 

    const todo = await Todo.find({ userId: userId })

    res.send({ "todo": todo })
})

todoRouter.get("/:todoId", authenticate, async (req, res)=>{
     
    const { userId } = req.body 

    const todo = await Todo.find({ userId: userId, _id: req.params.todoId})

    res.send({ "todo": todo })
})

todoRouter.get("/?status", authenticate, async (req, res)=>{
     
    const { userId } = req.body 
    const { status } = req.query 

    if(status === "pending"){
        const todo = await Todo.find({userId: userId ,status:status})
        res.send({ "todo": todo })
    }

    
})


todoRouter.post("/create", authenticate, async (req, res)=>{
     
     const { userId } = req.body 

     const newTodo = new Todo({ ...req.body, userId: userId });

     await newTodo.save();

     res.send({ "msg": "Todo created successfully"})
}) 

todoRouter.delete("/delete/:todoId", authenticate ,async (req, res)=>{
     
    const { userId } = req.body 
    
    const deletedTodo = await Todo.findByIdAndDelete({ userId: userId, _id: req.params.todoId })
     
    res.send({ "msg": "Todo deleted successfully"})
})


module.exports = { todoRouter }