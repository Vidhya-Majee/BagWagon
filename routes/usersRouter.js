
import {Router} from "express";

const router=Router()
router.get('/',function (req,res) {
    
    res.send("hey")    
})

router.post('/register',function (req,res) {
    
    let {email,password,fullname}=req.body
})


export default router