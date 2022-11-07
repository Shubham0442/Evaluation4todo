
const express = require("express");
const cors = require("cors");
const { connect } = require("./Config/db");
const { signupRouter } = require("./Routes/signupRoute");
const { loginRouter } = require("./Routes/loginRoute");
const { todoRouter } = require("./Routes/todoRoute");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 5245 

app.use(express.json());

app.use(cors());

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/todo", todoRouter)

app.listen(port, async()=>{
    try{
        await connect 
        console.log(`server is running on http://localhost:${port}`)
    }
    catch(error){
        console.log(error)
    }
})
