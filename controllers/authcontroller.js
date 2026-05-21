import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generatetoken.js";


export const registerUser = async function(req,res){
     try{
        let {fullname, email, password} = req.body;

        let isAlreadyCreatedAccount = await userModel.findOne({email: email});
        if (isAlreadyCreatedAccount) {
            req.flash("error", "This email is already registered. Please log in.");
            return res.redirect("/?mode=login");
        }

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, async function(err, hash){
                if(err) res.send(err.message);
                let user = await userModel.create({
                    fullname: fullname,
                    email: email,
                    password: hash
                });
        
                let token = generateToken(user);
                res.cookie("token", token);
               // res.send("user created successfully");
                  req.flash("success", "Account created successfully! Please log in.");
                res.redirect("/"); 
            })
        })
        
    }
    catch(err){
        console.log(err.message);
        req.flash("error", "An unexpected error occurred. Please try again.");
        return res.redirect("/");
    }
    
  }
  


export const loginUser = async function(req,res){
 let {email, password} = req.body;
    
    let user = await userModel.findOne({email});
    if (!user) {
        req.flash("error", "Email or password is incorrect.");
        return res.redirect("/?mode=login");
    }

    bcrypt.compare(password, user.password, function(err, result){
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop");
        }
        else {
            req.flash("error", "Email or password is incorrect.");
            return res.redirect("/?mode=login");
        }
    })
  }


  

export const logout= function (req,res) {
  res.cookie("token","");
  res.redirect("/");
  
}



