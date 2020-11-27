const express=require('express');
const router=express.Router();

router.get('/logout',(req,res,next)=>{

    
    req.logout();
    req.flash('success',"Siz tizimdan muvofaqqiyatli chiqdingiz");
    res.redirect('/login');

})


module.exports=router;