const userModel = require("../models/UserModel");
const userService = require("../services/userService");
const {validationResult} = require("express-validator");
const { sendOtpEmail } = require("../services/sendOtpMail");
const blacklistTokenModel = require("../models/blacklistTokenModel");

module.exports.registerUser = async(req,res)=>{

    const error=validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()});
    }

    const {fullName,email,password}=req.body;

    const isUserExist = await userModel.findOne({email});

    if(isUserExist){
        return res.status(400).json({message: "User already exist"});
    }
    const hashPassword=await userModel.hashPassword(password);

    const user = await userService.createUser(
    {
       firstName:fullName.firstName,
       lastName:fullName.lastName,
       email,
       password:hashPassword
    });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    await user.save();
    const token = user.generateToken();
    if(token&&user){
       const response = await sendOtpEmail(email,otp);
       console.log(response);
        
    }

    return res.status(200).json({user,token});
}

module.exports.loginUser = async(req,res)=>{

    const error=validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()});
    }

    const {email,password}=req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).json({message: "User not found"});
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect){
        return res.status(400).json({message: "Invalid password or email"});
    }

    const token = user.generateToken();
    res.cookie('token',token);
    return res.status(200).json({user,token});
}

module.exports.getProfile = async(req,res)=>{
    return res.status(200).json(req.user);
}

module.exports.logout = async(req,res)=>{
    const token = req.headers.authorization?.split(' ')[ 1 ] || req.cookies.token;
    if(!token){
        return res.status(400).json({message: "No token found"});
    }
    const blacklistToken = new blacklistTokenModel({token});
    await blacklistToken.save();
    res.clearCookie('token');
    return res.status(200).json({message: "Logged out successfully"});
}

module.exports.verifyOtp = async(req,res)=>{

    const {email,otp}=req.body;

    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({message: "User not found"});
    }
    if(user.otp !== otp){
        return res.status(400).json({message: "Invalid OTP"});
    }
    user.isVerified = true;
    await user.save();
    return res.status(200).json({message: "OTP verified successfully"});    
}

module.exports.resendOtp = async(req,res)=>{
    const user = await userModel.findOne({email:req.user.email});
    if(!user){
        return res.status(400).json({message: "User not found"});
    }
    if(user.isVerified){
        return res.status(400).json({message: "User already verified"});
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    await user.save();
    const response = await sendOtpEmail(email,otp);
    console.log(response);
    return res.status(200).json({message: "OTP sent successfully"});
}

