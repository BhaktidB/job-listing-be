// mongodb://localhost:27017
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()


mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("job listing db connected")})
.catch(()=>{console.log("something went wrong connecting db")})