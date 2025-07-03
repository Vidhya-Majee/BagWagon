import mongoose ,{Schema} from "mongoose";
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"


const userSchema=mongoose.Schema({
 fullname:String,
 email:String,
 password:String,
 cart:[
   {
    type:mongoose.Schema.Types.ObjectId,
   ref:"product",
 }
],
 
 orders:{
    type:Array,
    default:[]
 },
 contact:Number,
 picture:String
})



   const userModel=mongoose.model("User",userSchema);

export default userModel;