const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config();
const User=require('../Models/User')


const verify = (req, res, next) => {
    try {
        const reqHeader = req.header("Authorization").split(" ");
        const token = reqHeader[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decode.userId;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Invalid token" });
    }
};

// const verify=(req,res,next)=>{
    // try {
    //     const jwtToken=req.cookies.jwt;
    //     if(jwtToken){
    //         jwt.verify(jwtToken,process.env.SECRET_KEY,(err,decodedToken)=>{
    //             if(err){
    //                 console.log(err)
    //                 // res.redirect()
    //             }else{
    //                 console.log('verified',decodedToken);
    //                 next();
    //             }
    //         })        

    //     }else{
    //         // res.redirect()
    //         console.log('unauthorized')
    //     }
    // } catch (error) {
    //     res.json({errorMeassge:error})
    // }
// }

module.exports= {
    verify
}