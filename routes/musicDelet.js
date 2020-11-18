const express=require('express')
const Music = require('../model/Music')
const router=express.Router()

router.get('/delete/:id',(req,res,next)=>{
 const music=Music.findByIdAndDelete(req.params.id)
 music.then(()=>{
     res.redirect('/')
 })
 .catch((err)=>{
     console.log(err);
 })
})

module.exports=router