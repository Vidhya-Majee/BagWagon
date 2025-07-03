import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import expressSession from "express-session";
import flash from "connect-flash";
dotenv.config();

import connectDB from "./db/index.js";

const app=express();

import path from "path";
import { fileURLToPath } from "url";

// Define __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//routes import
// Updated imports with full extensions
import index  from "./routes/index.js";
import ownersRouter from "./routes/ownersRouter.js";
import usersRouter from "./routes/usersRouter.js";
import productsRouter from "./routes/productsRouter.js";

dotenv.config({path:'./env'});

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({

    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET,
})
)
app.use(flash());
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


//routes decleration
app.use("/", index);
app.use('/owners',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);

export{app};

//import {app} from "./app.js";


connectDB()
.then(()=>{
    app.listen(process.env.PORT, () => {
    console.log(`Server running on port :${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("mongodb connection failed!!!",err);
    
});











