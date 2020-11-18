const express = require('express');
const router = express.Router();
const Music=require("../model/Music")

/* GET home page. */
router.get('/', function(req, res, next) {
  
  const promise=Music.find({});
  promise.then((musics)=>{
    res.render('index', { title: 'Bosh saxifa',isHome:true,musics});
  })
  .catch((err)=>{console.log(err);})
  
});

module.exports = router;
