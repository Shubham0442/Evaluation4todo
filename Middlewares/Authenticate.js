
const jwt = require("jsonwebtoken");
require("dotenv").config();


const authenticate = (req, res, next)=>{

    const token = req.headers.authorization.split(" ")[1];

    if(!req.headers.authorization){
        return res.send({ "msg": "Something went wrong"})
    } 

    jwt.verify(token, process.env.KEY, function(err, decoded) {
         
         if(err){
            res.send({ "msg": "Something went wrong"})
         }
         else{

              req.body.userId = decoded.userId 
              next()

         }
      });
}

module.exports = { authenticate }