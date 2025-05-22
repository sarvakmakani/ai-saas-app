const userModel=require('../models/UserModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistTokenModel');

module.exports.authUser=async(req,res,next)=>
{
    const token = req.cookies.token ||  req.headers.authorization?.split(' ')[ 1 ];
    if(!token)
    {
        return res.status(401).json({error:"No token found"});
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });    
    if (isBlacklisted) {
      return res.status(401).json({ error: "Token is blacklisted" });
    }
    try{

    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
     
    req.user=user;
    return next();
    }
    catch(err)
    {
        res.status(401).json({error:err.message});
    }

}
