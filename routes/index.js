import express from 'express';
import { logout } from "../controllers/authcontroller.js";
import userModel from "../models/user.model.js";
import productModel from "../models/product.model.js";
import { isloggedin } from '../middlewares/isloggedin.js';


const router = express.Router();

router.get("/", function (req, res) {
    let error = req.flash("error");
    let success = req.flash("success");
    res.render("index", { error,success,isloggedin:false});
});

router.get("/shop", isloggedin, async function(req, res){
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products, success });
})



router.get("/cart", isloggedin, async function(req, res) {
    let user = await userModel
        .findOne({ email: req.user.email })
        .populate("cart");

    // Calculate total bill
    let totalBill = 0;
    let cartWithTotal = user.cart.map(item => {
        let itemTotal = (item.price + 20) - item.discount;
        totalBill += itemTotal;
        return {
            ...item._doc,
            itemTotal // Attach per-item total for display
        };
    });

    res.render("cart", { user, cartItems: cartWithTotal, totalBill });
});


router.get("/addtocart/:productid", isloggedin, async function(req, res){
   let user=await userModel.findOne({email:req.user.email});
   user.cart.push(req.params.productid);
   await user.save();
   req.flash("success","Added to cart");
   res.redirect("/shop")
   
})
router.post("/cart/remove/:productid", isloggedin, async function(req, res) {
    let user = await userModel.findOne({ email: req.user.email });

    // Convert all IDs to strings
    let cart = user.cart.map(id => id.toString());

    // Find the index of the first matching item
    const index = cart.indexOf(req.params.productid);

    // Remove only one matching item
    if (index !== -1) {
        user.cart.splice(index, 1); // removes only the first occurrence
        await user.save();
    }

    res.redirect("/cart");
});




router.get('/account', isloggedin, async (req, res) => {
  try {

    const user = await userModel.findOne({ email: req.user.email });
    const cartCount = user.cart.length;

    res.render('account', { user, cartCount });

    
    
  } catch (err) {
    res.status(500).send("Something went wrong.");
  }
});



router.get("/logout", isloggedin, logout);

export default router;
