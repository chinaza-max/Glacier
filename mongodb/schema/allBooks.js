const mongoose=require('mongoose')


let userBook= new mongoose.Schema({
    bookDetails:[],
});



module.exports=mongoose.model("book",userBook);

