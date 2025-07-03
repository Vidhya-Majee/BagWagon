import jwt from "jsonwebtoken";


// Debug process.env.JWT_KEY


const generateToken=(user) => {

   return jwt.sign({email: user.email, id:user._id},process.env.JWT_KEY);
       // Generate JWT token
        


};
// Export the function
export default generateToken;




