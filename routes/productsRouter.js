
import {Router} from "express";
import productModel from "../models/product.model.js";

const router=Router()
router.get('/',function (req,res) {
    
    res.send("hey")    
})


export default router