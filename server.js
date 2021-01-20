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
const mongoConnection=require('mongoose')
const connection=mongoConnection.connection;
const passport=require('passport')
const bcrypt=require('bcrypt');
const methodOverride=require("method-override")
const passportContol=require("./config/passport-config")
const session=require('express-session')
const flash=require('express-flash')
const User=require("./mongodb/schema/userSchema")
const Book=require("./mongodb/schema/allBooks")
const fs=require('fs');
const { findById } = require('./mongodb/schema/userSchema');
const pdf = require('pdf-parse');

const {nameOfFiles}=require("./deletefiles")
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


app.delete('/logout',(req,res)=>{
    
    if(req.logout()==undefined){
        res.redirect('/login')
    }
    else{
         res.redirect('/signup')
    }
})

app.get('/posts/:id',(req,res)=>{
    User.findById({_id:req.params.id},async(err,data)=>{
    await    res.send({express:data})
    })
})

app.get("/details/:name",(req,res)=>{
    let details=[];
    User.find((err,data)=>{
        if(err){
            console.log("check this route '/details/:id/:name'")
            console.log(err)
        }
        else{
            for(let i=0; i<data.length; i++){
                User.findById(data[i],async(err,user)=>{
                    if(err){
                        console.log("/details/:id")
                        console.log(err)
                    }
                    else{
                        let obj=user.details.find((val)=>{ return val.name==req.params.name})
                        if(obj){
                            details.push({"name":obj.name,"tel":obj.tel,"author":obj.author,
                            "title":obj.title,"faculty":obj.faculty,"description":obj.Description})
                            console.log(details)
                            res.send({express:details})
                            return;
                        }
                    }
                })
            }
           // res.send({express:details})
        }
    })
})
app.get('/Books',(req,res)=>{

    /*former code that i used to return all books in my db
    let mainData=[]
    User.find(async(err,data)=>{
    await    data.forEach(async(data)=>{
    await    data.details.forEach((data)=>{
             mainData.push({'name':data.name,"faculty":data.faculty,"title":data.title,"author":data.author})
           })
        })
        await    res.send({express:mainData})
    })*/
    let mainData=[]
    let reArrangeMainData=[]
    Book.find(async(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(data[0])
            data[0].bookDetails.forEach((data)=>{
                if(data.name){
                    mainData.push({'name':data.name,"faculty":data.faculty,"title":data.title,"author":data.author})
                }
            })
            let len=mainData.length-1
            for(let i=len; 0<=i; i--){
                reArrangeMainData.push(mainData[i])
            }
           await res.send({express:reArrangeMainData})
        }
    })
})

app.get("/names/:id",(req,res)=>{
    
    if(req.params.id){
        User.findById(req.params.id,(err,data)=>{
            if(err){
                console.log("check this route /name/:id")
                console.log(err)
            }
            else{
                
                if(data){
                    res.send({express:data.name,express2:data.tel})
                }
                else{
                    res.send({express:"redirect"})
                }
            }
        })
    }
    else{
        res.send({express:' '})
    }
   
})
/*app.post("/deleteSingleAcc",(req,res)=>{
     
})*/
app.get('/pdfAPI',(req,res)=>{

    User.find((err,data)=>{
        data.forEach((data)=>{
            if(data.pdfs.length!==0){

                res.send({express:data.pdfs})
                console.log(data.pdfs)
                return;
               
            }
        })
    })
})

//settings route
app.get('/deleteAllAcc',(req,res)=>{
    connection.db.listCollections().toArray((err,names)=>{
        if(err){
            console.log("check route deleteAllAcc ")
            console.log(err)
        }
        else{
            for(i=0;i<names.length; i++){
                console.log("current collection "+names[i].name)
                if(names[i].name=="users"){
                    mongoConnection.connection.db.dropCollection("users", function (err, result) {
                            if (err) {
                                console.log(err)
                                
                            }
                            else{
                                res.send({express:"all account has been deleted"})
                            }
                        }

                    )
                }
                else{
                    res.send({express:"No collection of account was found in the dataBase"})
                }
            }
        }
    })
})

app.get("/deleteSingleAcc/:name",(req,res)=>{
    let listofPostTodelete=[];
    User.find({"details.name":req.params.name},async(err,data)=>{
        
        if(err){
            console.log("err")
            console.log(err)
        }
        else if(data.length!==0){
            let id=data[0]._id
            let name=data[0].name
            let tel=data[0].tel
            data[0].details.forEach((data)=>{
                listofPostTodelete.push(data.name)
            })
            for(let i=0; i<listofPostTodelete.length; i++){
                deletePostFromBookCollection(listofPostTodelete[i])
            }
            //this function send file name to be deleted from the directory
          await  nameOfFiles(listofPostTodelete);
            
            if(id){
                User.findOneAndRemove({_id:id},(err)=>{
                    if(err){
                        console.log(err)
                      return  res.status(500).send('no')
                    }
                    return res.status(200).send({"name":name,"tel":tel})
                })
            }
        }
        else{
            return res.status(200).send({"name":"No user found"})
        }
    })
})


app.get("/deleteAllPDF/:id",(req,res)=>{
    
    User.updateMany({_id:req.params.id},{ $set: { pdfs: [] }},function(err, affected){
        if(err){
            console.log(err)
        }
        else{
            console.log(affected)
            res.send({express:"All PDF removed"})
        }
    })
})

app.get('/DropSinglePDF/:name/:id',(req,res)=>{
    let id=req.params.id
    let imgName=req.params.name
   
    User.findById(id,async(err,user)=>{
       if(err){
           console.log("check post route /deletePost/:id/:name")
           console.log(err)
       }
       else{
            if(user){
                
                let obj=user.pdfs.find((va)=>{    
                    return  va.name==imgName
                })
              
                if(obj){
                    await User.findOneAndUpdate({_id:req.params.id},
                        {$pull:{pdfs:obj}})
                    
                    try{
                        
                        fs.unlinkSync("./client/public/uploadPDFs/"+imgName)
                        console.log("response")
                        res.send({express:"succefully Deleted"})
                    }
                    catch(err){
                        console.log("err"+  err)
                    }
                }
                else{
                    res.send({express:"not found in db"})
                }
            }
       }
    })


})

app.get("/deleteAllPost",(req,res)=>{
    deleteAllPostFromBook();
    User.find((err,data)=>{
       if(err){
            console.log(err)
       }
       else{
        for(let i=0; i<data.length;i++){
            
            User.updateMany({_id:data[i]._id},{ $set: { details: [] }},function(err, affected){
                if(err){
                    console.log(err)
                    return 
                }
            })
        }
        res.send({express:"All post removed"})
       }
    })
})


app.get("/deleteSinglePost/:name",(req,res)=>{
    let imgName=req.params.name
    deletePostFromBookCollection(imgName)
    User.find({"details.name":req.params.name},async (err,user)=>{
        if(err){
            console.log("err")
            console.log(err)
        }
        else if(user.length!==0){
            let obj=await user[0].details.find((va)=>{    
                return  va.name==imgName
            })
          
            if(obj){
                await User.findOneAndUpdate({_id:user[0]._id},
                    {$pull:{details:obj}})
                
                try{
                    console.log(4)
                    fs.unlinkSync("./client/public/uploads/"+imgName)
                    res.send({express:"succefully Deleted"})
                }
                catch(err){
                    console.log("err"+  err)
                }
            
            }

        }
        else{
            console.log(2)
           
             res.status(200).send({"express":"does not exit"})
        }
    
    })
})

app.get("/generateAccDetails/:name",(req,res)=>{
    User.find({"details.name":req.params.name},(err,user)=>{
        if(err){
            console.log(err)
        }
        else if(user.length!==0){
            res.send({express:user[0].name,express2:user[0].tel})
        }
        else{
            res.send({express:"no user found"})
        }
    })
})
//this route is public  . it is use by every one ;
app.post('/deletePost/:id/:name',(req,res)=>{
    let id=req.params.id;
    let imgName=req.params.name;
    deletePostFromBookCollection(imgName);
    User.findById(id,async(err,user)=>{
       if(err){
           console.log("check post route /deletePost/:id/:name")
           console.log(err)
       }
       else{
        
        let obj=user.details.find((va)=>{    
            return  va.name==imgName
           })
          
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
        //console.log(data)
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
         //console.log(req.body)
        User.findOne({email:req.body.email},async(err,user)=>{
            res.json({home:"/home/"+user._id})
        })
    }
)

app.post("/uploadPDF/:id",(req,res)=>{
    const id=req.params.id
   
    if(req.files===null){
    return res.status(400).json({msg:"No file uploaded"});
    }
    const file=req.files.file;
   
    if(file){
        crypto.randomBytes(16,async (err,buf) => {
            if (err) {
                return   console.log(err)
            }
            const filename = buf.toString('hex') + path.extname(file.name);
            await filename
            
            if(filename){
                file.name=filename
                file.courseCode=req.body.courseCode.toLowerCase()
                file.mv( `${__dirname}/client/public/uploadPDFs/${file.name}`,async(err)=>{
                    let dataBuffer = fs.readFileSync( `${__dirname}/client/public/uploadPDFs/${file.name}`)
                    pdf(dataBuffer).then(function(data) {
 
                        // number of pages
                        console.log(data.numpages);
                        // number of rendered pages
                        //console.log(data.numrender);
                        // PDF info
                        console.log(data.info);
                        // PDF metadata
                        console.log(data.metadata);
                        // PDF.js version
                        // check https://mozilla.github.io/pdf.js/getting_started/
                       // console.log(data.version);
                        // PDF text
                        console.log(data.text); 
                            
                    });





                    if(err){
                        console.log(err)
                        return res.status(500).send(err)
                    }
                    else{
                        file.data='';
                        file.size=0;
                       // console.log(file)
                        res.json({fileName:file.name,filePath:`/uploadPDFs/${file.name}`})
                        await User.findOneAndUpdate({_id:id},
                            {$push:{pdfs:file}})
                    }
                })
            }
        })
    }
    else{
        res.json({fileName:'',filePath:'',errMessage:'file extension not supported '});
    }
})


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
            else{
                const filename = buf.toString('hex') + path.extname(file.name);
          
                await filename
                if(filename){
                    file.name=filename
                    file.author=req.body.author.toLowerCase()
                    file.title=req.body.title.toLowerCase()
                    file.faculty=req.body.faculty.toLowerCase()
                    file.Description=req.body.Description.toLowerCase()
                    file.tel=req.body.tel
    
                    file.mv( `${__dirname}/client/public/uploads/${file.name}`,async(err)=>{
                        if(err){
                            console.log(err)
                            return res.status(500).send(err)
                        }
                        file.data='';
                        file.size=0;
                            //console.log(file)
                            res.json({fileName:file.name,filePath:`/uploads/${file.name}`})
                        })
                        
                        await User.findOneAndUpdate({_id:id},{$push:{details:file}})
                        //initializing book schema to actual get an ID
                        Book.find(async(err,data)=>{
                            
                           if(err){
                                console.log(err)
                           }
                           else{
                                if(data.length>=1){
                                    Book.find(async(err,data)=>{
                                        if(err){
                                            console.log(err)
                                        }
                                        else{
                                            await Book.findOneAndUpdate({_id:data[0].id},{$push:{bookDetails:file}})
                                        }
                                    
                                    })
                                }
                                else{
                                    await new Book({bookDetails:["test"]}).save()
                                    Book.find(async(err,data)=>{
                                        if(err){
                                            console.log(err)
                                        }
                                        else{
                                            await Book.findOneAndUpdate({_id:data[0].id},{$push:{bookDetails:file}})
                                        }
                                    
                                    })
                                }
                           }
                        })
                     
                       
                       
                }
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

function deletePostFromBookCollection(name){
    console.log(name)
    Book.find({"bookDetails.name":name},async (err,user)=>{
        console.log(user)
        if(err){
            console.log("err")
            console.log(err)
        }
        else if(user.length!==0){
            let obj=await user[0].bookDetails.find((va)=>{    
                return  va.name==name
            })

            if(obj){
                await Book.findOneAndUpdate({_id:user[0]._id},
                    {$pull:{bookDetails:obj}})
            }

        }
       
    })
}
function deleteAllPostFromBook(){
    Book.find((err,data)=>{
        if(err){
            console.log(err)
        }
        else{
             Book.updateMany({_id:data[0]._id},{ $set: {bookDetails: []}},function(err, affected){
                 if(err){
                     console.log(err)
                     return 
                 }
                 else{
                     console.log(affected)
                    
                 }
             })
        }
    })
}
app.listen(port ,()=>console.log(`server started.... ${port}`))

