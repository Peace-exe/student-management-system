const express = require("express");
const server = express();
const connectDB= require("./src/config/database"); //only after requirng this file here you will be able to connect to the db
const cookieParser=require("cookie-parser");
const cors = require("cors");
require('dotenv').config();

const PORT = process.env.PORT;
server.use(cors());
server.use(express.json());
server.use(cookieParser());

connectDB()
    .then(()=>{
        console.log("DB connection was establised :D");
        server.listen(PORT,()=>{
            console.log(`server is running on port:${PORT}`);
        });
    })
    .catch((err)=>{
        console.error(`couldn't connect to the database :( :\n ${err.message}`);
    });