import mongoose ,{Schema} from "mongoose";


const productSchema = mongoose.Schema({
  image: Buffer,
  name: String,
  price: Number,
  discount: {
    type: Number,
    default: 0
  },
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
  inStock: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const productModel = mongoose.model("product", productSchema);

export default productModel;
 

  