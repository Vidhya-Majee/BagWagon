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

  //export const productModel=mongoose.model('product',productSchema);

   const productModel=mongoose.model("product",productSchema);
  
  export default productModel;
 

  