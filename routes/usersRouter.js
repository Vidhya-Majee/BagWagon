
import {Router} from "express";
import { registerUser,loginUser,logout } from "../controllers/authcontroller.js";



const router=Router()
router.get('/',function (req,res) {
    
    res.send("hey")    
})

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);


export default router