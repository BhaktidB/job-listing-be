const express=require('express');
const router=express.Router();
const authController=require('../Controllers/auth')

router.post('/register',authController.register_post)

router.post('/login',authController.login_post)

router.get('/logout',authController.logout_get)

module.exports=router
