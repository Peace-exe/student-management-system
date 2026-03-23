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

studentRouter.get("/getAllStudents", userAuth,
    async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 10;
            const skip = (page - 1) * limit;

            const totalStudents = await Student.countDocuments();
            const students = await Student.find()
                .skip(skip)
                .limit(limit);

            if (students.length === 0) {
                return res.status(404).send({ message: "No students found" });
            }

            res.status(200).send({
                message: "Students fetched successfully",
                currentPage: page,
                totalPages: Math.ceil(totalStudents / limit),
                totalStudents,
                data: students
            });

        } catch (err) {
            res.status(400).send("Error fetching students: " + err.message);
        }
    }
);

studentRouter.post("/updateStudent", userAuth,
    async (req, res) => {
        try {
            const { rollNum } = req.query;
            const updates = req.body;

            const ALLOWED_UPDATES = ["firstName", "lastName", "email", "course"];
            const isUpdateAllowed = Object.keys(updates).every((update) =>
                ALLOWED_UPDATES.includes(update)
            );

            if (!isUpdateAllowed) {
                throw new Error("Invalid updates. Allowed fields: " + ALLOWED_UPDATES.join(", "));
            }

            const student = await Student.findOneAndUpdate(
                { rollNum },
                updates,
                { returnDocument: "after", runValidators: true }
            );

            if (!student) {
                return res.status(404).send({ message: "Student not found" });
            }

            res.status(200).send({ message: "Student updated successfully", data: student });

        } catch (err) {
            res.status(400).send("Error updating student: " + err.message);
        }
    }
);

studentRouter.delete("/deleteStudent/:rollNum", userAuth,
    async (req, res) => {
        try {
            const rollNum = decodeURIComponent(req.params.rollNum);

            const student = await Student.findOneAndDelete({ rollNum });

            if (!student) {
                return res.status(404).send({ message: "Student not found" });
            }

            res.status(200).send({ message: "Student deleted successfully", data: student });

        } catch (err) {
            res.status(400).send("Error deleting student: " + err.message);
        }
    }
);

module.exports = studentRouter;