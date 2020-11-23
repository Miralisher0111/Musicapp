const mongoose=require('mongoose')
const dburl=require('../cf/db')

module.exports=()=>{
mongoose.connect(dburl.db,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db =mongoose.connection
db.on('error',(err)=>{
    throw err;
})
db.on('open',()=>{
    console.log('mongodb  connected');
})

}