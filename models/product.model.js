import mongoose ,{Schema} from "mongoose";


const productSchema=mongoose.Schema({
image:String,
name:String,
price:Number,
discount:{
    type:Number,
    default:0
},
bgcolor:String,
panelcolor:String,
textcolor:String
})

  export const product=mongoose.model('product',productSchema);
  