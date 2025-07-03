import { Router } from "express";
import ownerModel from "../models/owners.model.js";

const router = Router();



// Show owner creation/login form
router.get("/create", (req, res) => {
  let error = req.flash("error");
  res.render("owner-login", { error });
});

// if (process.env.NODE_ENV === "development") {
// // Create the first owner (only allowed if no owner exists)
// router.post("/create", async (req, res) => {
//   try {
//     let owners = await ownerModel.find();

//     if (owners.length > 0) {
//       req.flash("error", "You don't have permission to create a new owner.");
//       return res.redirect("/owners/create");
//     }

//     let { fullname, email, password } = req.body;

//     let createdOwner = await ownerModel.create({
//       fullname,
//       email,
//       password,
//     });

//     // Save the owner's ID in the session
//     req.session.owner = createdOwner._id;
//     req.flash("success", "Owner created successfully.");
//     res.redirect("/owners/admin");
//   } catch (err) {
//     console.error(err);
//     req.flash("error", "Something went wrong.");
//     res.redirect("/owners/create");
//   }
// });

// // Only the logged-in owner can access this route
// router.get("/admin", (req, res) => {
//   if (!req.session.owner) {
//     req.flash("error", "Access denied. Please log in as owner.");
//     return res.redirect("/owners/create");
//   }

//   let success = req.flash("success");
//   res.render("createproducts", { success });
// });

// }


if (process.env.NODE_ENV === "development") {
  // Route logic
   router.post('/create',async function (req,res) {
        let owners=await ownerModel.find();
        if(owners.length>0) return res
.status(503)
.send("you don't have permission to craete a new owner.")

let {fullname,email,password}=req.body
       let createdOwner= await ownerModel.create({
                fullname,
                 email,
                password,
                
            })

// res.status(201).send(createdOwner);
 req.flash("success", "Owner created successfully.");
res.redirect("/owners/admin");

    })
}

router.get("/admin", function (req, res) {
    let success = req.flash("success"); // Retrieve the flash message
    res.render("createproducts", { success }); // Pass it to the template
});

export default router;

















