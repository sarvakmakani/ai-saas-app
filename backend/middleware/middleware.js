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
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        
        req.user = user;
        return next();
    }
    catch(err)
    {
        console.error('Auth error:', err);
        res.status(401).json({error: "Invalid token"});
    }
}
