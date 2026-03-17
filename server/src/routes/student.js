const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Student = require("../models/student");
const studentRouter = express.Router();
const validator = require("validator");


studentRouter.post("/createStudent",userAuth,
    async (req, res) => {
    try {
        const { firstName, lastName, email, rollNum, course } = req.body;

        if(!firstName || !lastName){
            throw new Error("First and Last Name is required");
        }
        else if(!validator.isEmail(email)){
            throw new Error("Invalid email");
        }
        else if(!course){
            throw new Error("course is required");
        }
        else if(!(/^[1-9]\d{2}\/[A-Z]{3}\/\d{3}$/.test(rollNum))){
            throw new Error("Invalid roll number format. Expected format: 123/ABC/456");
        }

        const student = new Student({
            firstName,
            lastName,
            email,
            rollNum,
            course
        });

        await student.save();

        res.status(201).send({ message: "Student created successfully", data: student });

    } catch (err) {
        res.status(400).send("Error creating student: " + err.message);
    }
});