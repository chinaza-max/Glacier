const mongoose=require('mongoose')


let imageSchema= new mongoose.Schema({
    image:[]
});

module.exports=mongoose.model("Image",imageSchema);