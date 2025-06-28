import jwt from "jsonwebtoken";
const generateToken= (user) => {

    let token=jwt.sign({email: user.email, id:user._id},process.env.JWT_KEY)
};

// Export the function
export default generateToken;

