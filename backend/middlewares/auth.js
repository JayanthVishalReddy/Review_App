const { sendError } = require("../utilities/helper");
const jwt=require('jsonwebtoken');
const User = require("../models/user");

exports.isAuth= async(req,res,next)=>{
    const token=req.headers?.authorization;
    console.log(token);
    if(!token) return sendError(res,"Invalid Token");
    const jwtToken=token.split("Bearer ")[1];
    if(!jwtToken) return sendError(res,"Invalid Token");
    const decode=jwt.verify(jwtToken,process.env.JWT_SECRET);
    const {userId}=decode;
    const user= await User.findById(userId);
    if(!user){
        return sendError(res,"Unauthorized Access",404);
    }
    req.user=user;
    next();
} 

exports.isAdmin=(req,res,next)=>{
const {user}=req;
if(user.role!=="admin") return sendError(res,"Unauthorized access",404)
    next();
}