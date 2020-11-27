const express=require('express');
const Music = require('../model/Music');
const User = require('../model/User');
const router=express.Router();

router.get('/:id',(req,res,next)=>{
    Music.findById(req.params.id,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
           User.findById(data.adduser,(err,user)=>{
               if(err){
                   console.log(err);
               }
               else{
                   
                   res.render('music',{title:"bu musiqa saxifasi",data,user})
               }
           }) 
        }
    })
   
    
})


module.exports=router;