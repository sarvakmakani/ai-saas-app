const express = require('express');
const router = express.Router();
const {body}=require('express-validator');
const userController=require('../controllers/userController');
const middleware=require('../middleware/middleware');


router.post('/register',[
    body('fullName.firstName').trim().isLength({min:3}).withMessage("Name must be at least 3 characters long"),
    body('email').isEmail(),body('password').trim().isLength({min:8}),
    body('password').trim().isLength({min:8}).withMessage("Password must be at least 8 characters long"),
],userController.registerUser);

router.post('/login',[
    body('email').isEmail(),
    body('password').trim().isLength({min:8}),
],userController.loginUser);

router.get('/profile',middleware.authUser,userController.getProfile);

router.get('/logout',middleware.authUser,userController.logout);

router.post('/verifyOtp',userController.verifyOtp);


module.exports = router;