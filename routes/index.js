import {Router} from "express";
import {isloggedin} from "../middlewares/isloggedin.js"

const router=Router()
router.get('/',function (req,res) {
    let error=req.flash("error");
    res.render('index',{error})
})

router.get('/shop',isloggedin,function (req,res) {
    
    res.render('shop')
})
 


export default router