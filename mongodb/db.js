const mongoose=require('mongoose')


module.exports=mongoose.connect(process.env.MONGODB_URI||"mongodb+srv://chinaza:chinaza100*@mern.p63a6.mongodb.net/glacierDB?retryWrites=true&w=majority", {
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
