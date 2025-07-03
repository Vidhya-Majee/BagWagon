import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";



export const isloggedin=async function(req, res, next){
    const token = req.cookies.token;
    if (!token) {
        req.flash("error", "You need to log in first.");
        return res.redirect("/");
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel
            .findOne({email: decoded.email})
            .select("-password");
        req.user = user;
        next();
    }
    catch(err){
        req.flash("error", "something went wrong.");
        res.redirect("/");
    }
}

//export default isloggedin;





 