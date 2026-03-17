const mongoose=require('mongoose');
const validator= require('validator');

const studentSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:1,
        maxLenght:50

    },
    lastName:{
        type:String,
        required:true,
        minLength:1,
        maxLenght:50
    },
    email:{
        unique:true,
        type:String,
        minLength:1,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email format: "+value);
            }
        }
    },
    rollNum:{
        unique:true,
        type:String,
        minLength:1,
        maxLength:50,
        trim:true
    },
    course:{
        type:String,
        minLength:1,
        maxLength:50,

    }
},
{
    timestamps:true
});

const Student = mongoose.model("Student",studentSchema);

module.exports=Student;