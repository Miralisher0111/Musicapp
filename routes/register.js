const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const User = require('../model/User');

/* Method GET*/ 
router.get('/register',(req,res,next)=>{
res.render('register',{title:'bu registratsiya sahifasi',isRegister:true
})})

router.post('/register',(req,res,next)=>{
   const {surname,name,email,username,password,password2}=req.body;
    req.checkBody('surname',"Surname maydonchasi to'ldirilmagan").notEmpty();
    req.checkBody('name',"Surname maydonchasi to'ldirilmagan").notEmpty()
    req.checkBody('email',"Surname maydonchasi to'ldirilmagan").notEmpty();;
    req.checkBody('username',"Surname maydonchasi to'ldirilmagan").notEmpty();
    req.checkBody('password',"Surname maydonchasi to'ldirilmagan").notEmpty();
    req.checkBody('password2',"Parolnini qaytadan tasdiqlang").equals(password);

    const errors=req.validationErrors()
    if(errors){
        res.render('register',{errors:errors})
    }
    bcrypt.hash(password,8,(err,hash)=>{
        if(err){
            console.log(err);
        }
        const newuser=new User({
            surname:surname,
            name:name,
            email:email,
            username:username,
            password:hash
        })
        const promise=newuser.save()
        promise.then(()=>{
            req.flash('success','ro\'yxatdan o\'tdingiz')
            res.redirect('/login')
        })
        .catch((err)=>{
           console.log(err);
                
        })
    })

        
    })
  

module.exports=router
