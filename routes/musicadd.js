const express = require('express');
const router = express.Router();
const Music=require("../model/Music")
const multer=require('multer')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }    
})
 const upload=multer({storage:storage})

/* GET users listing. */
router.get('/', function(req, res, next) {
res.render('musicadd',{title: 'Musiqa qo\'sish saxifasi',isAbout:true})



});

/*Method Post*/
router.post('/',upload.single('file'),(req,res,next)=>{
    req.checkBody('name',"Iltimos musiqa nomini kiriting").notEmpty();
    req.checkBody('singer',"Iltimos musiqa ijrochisini kiriting").notEmpty();
    req.checkBody('comment',"Iltimos musiqaga izoh yozing").notEmpty();
    req.checkBody('score',"Iltimos musiqaga baxo bering").notEmpty();
    const errors=req.validationErrors()

    if(errors){
        res.render('musicadd',{title:"musiqa qo'shishda validator ishlab yotibti"
        ,errors:errors});
    }
    else{
        const data={
            name:req.body.name,
            singer:req.body.singer,
            comment:req.body.comment,
            score:req.body.score,
            file:req.file.filename
            };
        const music=new Music(data)
        const promise=music.save();
        promise.then( (data)=>{
            req.flash("success",`Musiqa qo'shildi`)
           res.redirect('/')
        })
        .catch((err)=>{
            throw err
        })
    }

    
}) 

module.exports = router;
