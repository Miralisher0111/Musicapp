const mongoose=require('mongoose')

module.exports=()=>{
mongoose.connect('mongodb+srv://apiMovies:123qwe123@movies.raylm.mongodb.net/test2',{
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