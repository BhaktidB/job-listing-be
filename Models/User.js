const mongoose=require('mongoose')
const {isEmail}=require('validator')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is require']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Enter valid email']
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minLength:[6,'Enter minimum 6 character']
    },
})

const User=mongoose.model("User",userSchema);

module.exports=User;