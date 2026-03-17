const express = require("express");
const server = express();
const connectDB= require("./src/config/database");
const cookieParser=require("cookie-parser");
const cors = require("cors");
require('dotenv').config();

const PORT = process.env.PORT;
server.use(cors());
server.use(express.json());
server.use(cookieParser());

const authRouter = require('./src/routes/auth');
const studentRouter = require('./src/routes/student');

server.use("",authRouter);
server.use("",studentRouter);

connectDB()
    .then(()=>{
        console.log("DB connection was establised.");
        server.listen(PORT,()=>{
            console.log(`server is running on port:${PORT}`);
        });
    })
    .catch((err)=>{
        console.error(`couldn't connect to the database :( :\n ${err.message}`);
    });