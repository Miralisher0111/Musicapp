const express=require('express')
const Music = require('../model/Music')
const router=express.Router();
const fs=require('fs')
const path=require('path')

 router.get('/delete/:id',(req,res,next)=>{  
        
    
    Music.findByIdAndDelete(req.params.id,(err)=>{
                 if(err){
                    console.log(err);
                }
                req.flash(`success`,`Musiqa o'chirildi`)
                res.redirect('/');
            })
                    

})

module.exports=router