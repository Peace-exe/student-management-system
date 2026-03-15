const express = require("express");
const { userAuth } = require("../middlewares/auth");

const studentRouter = express.Router();

studentRouter.post("/createStudent",userAuth,
    (req,res)=>{
        
});