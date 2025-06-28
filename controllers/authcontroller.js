import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generatetoken.js";


export const registerUser = async function(req,res){
    try {
      let { email,password,fullname }=req.body;
       // Check if user already exists
        let user = await userModel.findOne({ email:email });
        if (user) return  res.status(401).send("Account already exists. Please log in.");

        // Hash the password 

      bcrypt.genSalt(10,function (err,salt) {
        bcrypt.hash(password,salt, async function (err,hash) {
            if(err)  return res.send(err.message);
            else {
  let  user=await userModel.create({
        email,
        password:hash,
        fullname
    })
let token=generateToken(user)
res.cookie("token",token)
                res.send("user created successfully....")
            }
        })
      })

 
  } catch (error) {
    res.send(error.message);
    
  }
}

export const loginUser = async function(req,res){
    
      let { email,password }=req.body;
       
        let user = await userModel.findOne({ email:email });
        if (!user) return  res.send("Email or password incorrect");

        bcrypt.compare(password,user.password,function(err,result){
              if(result){
                let token=generateToken(user);
                res.cookie("token",token);
                res.send("login successful");
              }
              else{
                res.send("email or password  incorrect")
              }
        }) ;

}