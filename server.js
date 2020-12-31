require('./mongodb/db')
if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port=5000;
const bodyParser=require("body-parser")
const path=require("path")
const crypto=require("crypto");
const mongoose=require("mongoose")
const passport=require('passport')
const bcrypt=require('bcrypt');
const methodOverride=require("method-override")
const passportContol=require("./config/passport-config")
const session=require('express-session')
const flash=require('express-flash')
const User=require("./mongodb/schema/userSchema")
const fs=require('fs')

app.use(bodyParser.json())
app.use(fileUpload());

app.use(flash())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))

/* this set of code has to be blow this "app.use(flash())"  "app.use(session({})"*/
app.use(passportContol.initialize());
app.use(passportContol.session());
app.use(methodOverride('_method'))



app.get('/posts/:id',(req,res)=>{
    User.findById({_id:req.params.id},async(err,data)=>{
    await    res.send({express:data})
    })
})

app.get("/details/:id/:name",(req,res)=>{
    

    User.findById(req.params.id,async(err,user)=>{
       if(err){
           console.log("/details/:id")
           console.log(err)
       }
       else{
        let obj=user.details.find((val)=>{
            return val.name==req.params.name
        })
        let details=[];
    
        
        if(obj){
            details.push({"name":obj.name,"tel":obj.tel,"author":obj.author,"title":obj.title,"faculty":obj.faculty,"description":obj.Description})
           console.log(details)
            res.send({express:details})
        }
        else{
            res.send({express:details})
        }
       }
        //res.send({express:user})
    })
  
})
app.get('/Books',(req,res)=>{
    let mainData=[]
    User.find(async(err,data)=>{
    await    data.forEach(async(data)=>{
    await       data.details.forEach((data)=>{
             mainData.push({'name':data.name,"faculty":data.faculty,"title":data.title,"author":data.author})
           })
        })
        await    res.send({express:mainData})
    })
})

app.post('/deletePost/:id/:name',(req,res)=>{
    let id=req.params.id
    let imgName=req.params.name
    User.findById(id,async(err,user)=>{
       if(err){
           console.log("check post route /deletePost/:id/:name")
           console.log(err)
       }
       else{
        console.log(user) 
        let obj=user.details.find((va)=>{    
            return  va.name==imgName
           })
           console.log(obj) 
          
          if(obj){
            await User.findOneAndUpdate({_id:req.params.id},
                {$pull:{details:obj}})
            
            try{
                fs.unlinkSync("./client/public/uploads/"+imgName)
            }catch(err){
                console.log("err"+  err)
            }
          }
       }
       })


})

app.post('/signup',checkNotAuthenticated,async(req,res)=>{
    let user=new User( )

    User.find((err,data)=>{
        console.log(data)
    })
    try{
        const hashedPassword=await bcrypt.hash(req.body.password,10)
        user.name=req.body.name,
        user.password=hashedPassword,
        user.email=req.body.email,
        user.state=req.body.state,
        user.tel=req.body.tel
        user.save(function(err,data){
            if(err){
                console.log("check signup route")
                console.log(err)
            }
            else{
                res.json({login:'/login'})
            }
        })
    }
    catch(err){
        console.log(err)
    }
})


app.post('/login',checkNotAuthenticated,
    passport.authenticate('local',{
                        failureRedirect:'/login',
                        failureFlash:true}
    ),(req,res)=>{
         console.log(req.body)
        User.findOne({email:req.body.email},async(err,user)=>{
            res.json({home:"/home/"+user._id})
        })
    }
)

app.post('/upload/:id',(req,res)=>{
    const id=req.params.id

    if(req.files===null){
    return res.status(400).json({msg:"No file uploaded"});
    }
    const file=req.files.file;
   
    if(file.mimetype=="image/jpeg"||file.mimetype=="image/PNG"||file.mimetype=="image/jpeg"||file.mimetype=="image/jpg"){
        crypto.randomBytes(16,async (err,buf) => {
            if (err) {
                return   console.log(err)
            }
            const filename = buf.toString('hex') + path.extname(file.name);
          
            file.name=filename
            file.author=req.body.author.toLowerCase()
            file.title=req.body.title.toLowerCase()
            file.faculty=req.body.faculty.toLowerCase()
            file.Description=req.body.Description.toLowerCase()
            file.tel=req.body.tel

            await filename
            if(filename){
                file.mv( `${__dirname}/client/public/uploads/${file.name}`,(err)=>{
                    if(err){
                        console.log(err)
                        return res.status(500).send(err)
                    }
                        console.log(file)
                        res.json({fileName:file.name,filePath:`/uploads/${file.name}`})
                    })
    
                    await User.findOneAndUpdate({_id:id},
                          {$push:{details:file}})

                          User.findById({_id:id},(err,user)=>{
                              console.log(user)
                          })
            }
        })
    }
    else{
        res.json({fileName:'',filePath:'',errMessage:'file extension not supported '});
    }
       
})



function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
       return  res.redirect('/home/'+req.user._id)
    }
    
    next(); 
}
 

app.listen(port ,()=>console.log(`server started.... ${port}`))