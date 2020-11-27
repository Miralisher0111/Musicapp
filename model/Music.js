const mongoose=require('mongoose');
const Schema=mongoose.Schema

const music=new Schema({
    name:{
        type:String,
        required:true,
        default:'unknown'
    },
    singer:{
        type:String,
        required:true,
        default:'somebody' 
    },
    adduser:{
        type:Schema.Types.ObjectId,
        required:true,
         
    },
    comment:{
        type:String,
        required:true,
        default:'somethings'
    },
    score:{
        type:Number,
        required:true,
        default:'0'
    },
    file:{
        type:String,
        
    }
})
 
module.exports=mongoose.model('Newmusic',music)