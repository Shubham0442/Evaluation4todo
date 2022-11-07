const { Router } = require("express"); 

const bcrypt = require("bcrypt");
const { User } = require("../Models/userModel");
const signupRouter = Router();


signupRouter.post("/", async(req, res)=>{
      
     const { name, email, password } = req.body;
     
     bcrypt.hash(password, 5, async function(err, hash) {
         
         if(err){
            res.send({ "msg": "Something went wrong"})
         }
         else{
             
             const newUser = new User({
                 name: name,
                 email: email,
                 password: hash
             })

             await newUser.save();
             res.send({ "msg": "Signup successful"})
         }
    });

}) 

module.exports = { signupRouter }