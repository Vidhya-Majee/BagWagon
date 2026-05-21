import express from 'express';
import { logout } from "../controllers/authcontroller.js";
import userModel from "../models/user.model.js";
import productModel from "../models/product.model.js";
import { isloggedin } from '../middlewares/isloggedin.js';


const router = express.Router();

router.get("/", function (req, res) {
    let error = req.flash("error");
    let success = req.flash("success");
    const mode = typeof req.query.mode === "string" ? req.query.mode : "";
    res.render("index", { error, success, isloggedin: false, mode, navVariant: "landing" });
});

router.get("/shop", isloggedin, async function(req, res){
    const sortby = typeof req.query.sortby === "string" ? req.query.sortby : "popular";
    const collection = typeof req.query.collection === "string" ? req.query.collection : "all";
    const filter = typeof req.query.filter === "string" ? req.query.filter : "";

    const query = {};
    const sort = {};

    if (collection === "discounted") {
        query.discount = { $gt: 0 };
    }

    if (filter === "availability") {
        query.$or = [
            { inStock: true },
            { inStock: { $exists: false } }
        ];
    }

    if (filter === "discount") {
        query.discount = { $gt: 0 };
    }

    if (collection === "new" || sortby === "newest") {
        sort.createdAt = -1;
    } else {
        sort.discount = -1;
        sort.createdAt = -1;
    }

    let products = await productModel.find(query).sort(sort);
    let success = req.flash("success");
    res.render("shop", { products, success, isloggedin: true, sortby, collection, filter });
})


router.get("/cart", isloggedin, async function(req, res) {
    let user = await userModel
        .findOne({ email: req.user.email })
        .populate("cart");

    let success = req.flash("success");
    let error = req.flash("error");

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

    res.render("cart", { user, cartItems: cartWithTotal, totalBill, success, error, isloggedin: true });
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

    res.render('account', { user, cartCount, isloggedin: true });

    
    
  } catch (err) {
    res.status(500).send("Something went wrong.");
  }
});

router.get("/orders", isloggedin, async (req, res) => {
  return res.render("simple-page", {
    title: "My Orders",
    subtitle: "Your past orders will show up here.",
    isloggedin: true,
  });
});

router.get("/wishlist", isloggedin, async (req, res) => {
  return res.render("simple-page", {
    title: "Wishlist",
    subtitle: "Saved items will show up here.",
    isloggedin: true,
  });
});

router.get("/addresses", isloggedin, async (req, res) => {
  return res.render("simple-page", {
    title: "Addresses",
    subtitle: "Your delivery addresses will show up here.",
    isloggedin: true,
  });
});


router.post("/cart/checkout", isloggedin, async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user || !Array.isArray(user.cart) || user.cart.length === 0) {
      req.flash("error", "Your cart is empty.");
      return res.redirect("/cart");
    }

    // Minimal checkout: clear cart and show success.
    // (You can extend this later to create an Order model.)
    user.cart = [];
    await user.save();

    req.flash("success", "Order placed successfully!");
    return res.redirect("/cart");
  } catch (err) {
    req.flash("error", "Checkout failed. Please try again.");
    return res.redirect("/cart");
  }
});
  
  
    


router.get("/logout", isloggedin, logout);

export default router;
