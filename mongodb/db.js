const mongoose=require('mongoose')


module.exports=mongoose.connect("mongodb://localhost:27017/BookDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  err=>{
      if(!err){
          console.log('connection succeeded')
      }
      else{
          console.log('error in connection '+ err)
      }
    }
)

require("./schema/userSchema")
