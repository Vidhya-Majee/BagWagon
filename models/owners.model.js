import mongoose ,{Schema} from "mongoose";


const ownerSchema=mongoose.Schema({
 fullname:{
    type:String,
    required:true,
    minlength:3,
    trim:true
 },
 email:String,
 password:String,
 isadmin:Boolean,
 products:{
    type:Array,
    default:[]
 },
 gstin:String,
 picture:String
})

 
 //export const ownerModel = mongoose.model("owner", ownerSchema);


 const ownerModel = mongoose.model("owner", ownerSchema);

export default ownerModel;