const express=require('express')
const cors = require('cors')
const dotenv=require('dotenv')
const dbCongif=require('./Config/dbConfig')
const cookieParser = require('cookie-parser')
const authRoutes=require('./Routes/auth')
const jobRoutes=require('./Routes/job')

const app=express()
dotenv.config()

// const corsOptions ={
//     origin:' http://localhost:5173/', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

app.use(cors())

const PORT=process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())


app.get('/health',(req,res)=>{
    res.json({
        service:'Job listing backend api server',
        status:'true',
        time:new Date()
    })
})

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/job',jobRoutes)

app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`server is running at ${PORT}`);
})