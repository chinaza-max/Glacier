const mongoose=require('mongoose')
let userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:'this field is required',
        trim:true
    },
    password:{
        type:String,
        required:"this field is required",
        trim:true
    }, 
    email:{
        type:String,
        required:"this field is required",
        trim:true
    },
    tel:{
        type:Number,
        required:"this field is required",
        minimum:11
    },
    details:[],
    AccomodationImg:[],
    pdfs:[],
    notification:[] 
});

module.exports=mongoose.model("user",userSchema);