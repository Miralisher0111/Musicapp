const express=require('express')
const Music = require('../model/Music')
const router=express.Router();
const fs=require('fs')
const path=require('path')

 router.get('/delete/:id',(req,res,next)=>{  
        Music.findById(req.params.id,(err,music)=>{
            if(err){
                console.log(err);
            }
            if(music){
                fs.unlink(path.join('upload',music.file),(err)=>{
                    if(err){
                        console.log(err);
                    }
                    Music.findByIdAndDelete(req.params.id,(err)=>{
                        if(err){
                            console.log(err);
                        }
                        req.flash('success',"musiqa o'chirildi");
                        res.redirect('/')
                    })
                })
            }
        })  

})

module.exports=router