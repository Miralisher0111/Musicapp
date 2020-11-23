const express=require('express')
const router=express.Router();
const passport=require('passport')

router.get('/login',(req,res,next)=>{
    res.render('login',{title:"Tizimga xush kelibsiz",isLogin:true})
})

router.post('/login',(req,res,next)=>{
  
})

module.exports=router