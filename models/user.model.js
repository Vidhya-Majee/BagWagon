import mongoose ,{Schema} from "mongoose";
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"


const userSchema=mongoose.Schema({
 fullname:String,
 email:String,
 password:String,
 cart:{
    type:Array,
    default:[]
 },
 
 orders:{
    type:Array,
    default:[]
 },
 contact:Number,
 picture:String
})



    export const User=mongoose.model("User",userSchema)
