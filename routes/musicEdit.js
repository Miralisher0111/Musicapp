const express=require('express');
const Music = require('../model/Music');
const router=express.Router();


router.get('/edit/:id',(req,res,next)=>{

    const music=Music.findById(req.params.id)
    music.then((music)=>{
        
        res.render("musicEdit",{title:"Bu musiqa  sahifasi",music})
        
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.post('/edit/:id',(req,res,next)=>{
    const music=Music.findByIdAndUpdate(req.params.id,req.body)
    music.then(()=>{
        res.redirect('/')
    })
    .catch((err)=>{
        console.log(err);
    })
})

module.exports=router


