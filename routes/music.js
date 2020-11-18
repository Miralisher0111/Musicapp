const express=require('express');
const Music = require('../model/Music');
const router=express.Router();

router.get('/:id',(req,res,next)=>{
    const music=Music.findById(req.params.id)
    music.then((data)=>{
        
        res.render("music",{title:"Bu musiqa  sahifasi",data})
        
    })
    .catch((err)=>{
        console.log(err);
    })
    
})


module.exports=router;