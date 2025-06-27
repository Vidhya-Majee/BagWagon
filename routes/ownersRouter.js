import { Router } from "express";
import ownerModel from "../models/owners.model.js";

const router = Router();

router.get("/", function (req, res) {
  res.send("hey my world");
});

if (process.env.NODE_ENV === "development") {
  // Route logic
   router.post('/create',async function (req,res) {
        let owners=await ownerModel.find();
        if(owners.length>0) return res
.status(503)
.send("youdon't have permission to craete a new owner.")

let {fullname,email,password}=req.body
       let createdOwner=     await ownerModel.create({
                fullname,
                 email,
                password,
                
            })

res.status(201).send(createdOwner)
console.log(createdOwner);

    })
}


export default router;



















