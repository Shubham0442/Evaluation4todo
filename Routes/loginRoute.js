const { Router } = require("express"); 
require("dotenv").config()
const bcrypt = require("bcrypt");
const { User } = require("../Models/userModel");
const jwt = require("jsonwebtoken")

const loginRouter = Router();


loginRouter.post("/", async(req, res)=>{
      
    const { email, password} = req.body;

    const currentUser = await User.findOne({ email: email});

    bcrypt.compare(password, currentUser.password, function(err, result) {
          
        if(result){
             
            const token = jwt.sign({ userId: currentUser._id, email: currentUser.email }, process.env.KEY) 
            res.send({ "msg": "Login successful", token: token})
        }
        else{
            res.send({"msg": "Please Login Again"})
        }
    });
})

module.exports = { loginRouter }

