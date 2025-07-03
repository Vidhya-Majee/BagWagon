
import {Router} from "express";
import upload from "../config/multer-config.js";
import productModel from "../models/product.model.js";

const router=Router()


router.post("/create", upload.single("image"), async function (req, res) {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    try {
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
       });

        req.flash("success", "Product created successfully.");
        res.redirect("/owners/admin");
      
        
    } catch (err) {
        res.send(err.message);
    }
   
});


export default router;
