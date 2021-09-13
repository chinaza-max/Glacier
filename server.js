require('./mongodb/db')
const Time=require("./Time");
console.log(Time().year)

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
const allImg=require("./mongodb/schema/allImg")
const Notification=require("./mongodb/schema/notificationSchema")
const fs=require('fs');
const { findById } = require('./mongodb/schema/userSchema');
const pdf = require('pdf-parse');

const {nameOfFiles,deleteAllFiles,deleteAllPDFFiles,deleteAllAccomodationFiles}=require("./deletefiles");
const { response } = require('express');
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

    let mainData=[]
    let reArrangeMainData=[]
    allImg.find(async(err,data)=>{
        if(err){
            console.log(err)
        }
        else{ 
            if(data[0]==undefined){
                await res.send({express:[]})
            }
            else{
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

app.get('/pdfAPI',(req,res)=>{
  
    let reArrangeMainData=[]
    User.find((err,data)=>{
        if(err){
            console.log("check route for error debuging '/pdfAPI'")
            console.log(err)
        }
        else{
               
                if(data[0].pdfs.length!=0){
                   
                    let len=data[0].pdfs.length-1
                    for(let i=len; 0<=i; i--){
                        reArrangeMainData.push(data[0].pdfs[i])
                        if(i==0){
                            res.send({express:reArrangeMainData})
                        }
                    }   
                    
                }
                else{
                    res.send({express:reArrangeMainData})
                }
            
        }
    })

})

//settings route
app.get('/deleteAllAcc',(req,res)=>{
    deleteAllFiles()
    connection.db.listCollections().toArray((err,names)=>{
        if(err){
            console.log("check route deleteAllAcc ")
            console.log(err)
        }
        else{
            for(i=0;i<names.length; i++){
        
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
    deleteAllPDFFiles()
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
    //this function below helps to delete all file in the directory;
    deleteAllFiles()
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
app.get("/deleteAllAccomodationPost",(req,res)=>{
    deleteAllAccomodationPost();
    deleteAllAccomodationFiles();
    User.find((err,data)=>{
        if(err){
             console.log(err)
        }
        else{
         for(let i=0; i<data.length;i++){
             
             User.updateMany({_id:data[i]._id},{ $set: { AccomodationImg: [] }},function(err, affected){
                 if(err){
                     console.log(err)
                     return 
                 }
             })
         }
         res.send({express:"All AccomodationPost removed"})
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

app.get("/accomodations",(req,res)=>{
    let mainData=[]
    let reArrangeMainData=[]
    allImg.find(async(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            if(data.length==0){
                return
            }
            else{
                data[0].AccomodationImg.forEach((data)=>{
                    if(data.name){
                        mainData.push({'name':data.name,"price":data.Price,"Address":data.Address,"selection":data.selection,"tel":data.tel})
                    }
                })
                let len=mainData.length-1
                for(let i=len; 0<=i; i--){
                    reArrangeMainData.push(mainData[i])
                    if(i==0){
                            resfunction()
                    }
                }
            }
        }
    })
 async   function  resfunction(){
        await res.send({express:reArrangeMainData})
    }
})
//this get and also remove due notipfication from database ;
app.get("/notifications",(req,res)=>{
   //deleteAllPostFromNotificattion()


    let mainData=[]
    let reArrangeMainData=[]
    let num=0;
   /* User.find((err,data)=>{
        console.log(data[1].notification)
    })*/
    Notification.find(async(err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            if(data.length==0){
                return
            }
            else{
                data[0].notification.forEach((data)=>{
                 
                    if(data.notification||data.title){
                        //remTime=new Date("july 9,2021 9:00:00").getTime()-data.time;
                        let remTime=data.time-new Date().getTime()
                        let second=1000;
                        let minute=second*60;
                        let hour=minute*60;
                        let day=hour*24;
                        let d=Math.floor(remTime/(day));
                       
                        if(d<1){
                            deletePostFromNotification(data.notificationID,data.userID)
                        }
                       else{
                            mainData.push({'notification':data.notification,"requestType":data.requestType,"name":data.name,
                            "tel":"contact:"+data.phone,"expiringDate":d+" days","monthPosted":data.monthPosted,"datePosted":data.datePosted,
                            "notificationID":data.notificationID,"title":data.title,"faculty":data.faculty,"bookURL":data.bookURL})
                       }
                    }
                })
            }
            let len=mainData.length-1
            for(let i=len; 0<=i; i--){
                reArrangeMainData.push(mainData[i])
                if(i==0){
                        num=reArrangeMainData.length
                        resfunction()
                }
            }
        }
    })
 async   function  resfunction(){
        await res.send({express:reArrangeMainData,express2:num})
    }
})
//this route is public  . it is use by every one ;
app.post('/deletePost/:id/:name',(req,res)=>{
    let id=req.params.id;
    let imgNames=req.params.name.split(",");
    let imgSize=imgNames.length-1
    //console.log(imgName)
    
    for(imgName in imgNames ){
    
        deletePostFromBookCollection(imgNames[imgName]);
    }

    User.findById(id,async(err,user)=>{
       if(err){
           console.log("check post route /deletePost/:id/:name")
           console.log(err)
       }
       else{
            for(imgName in imgNames ){
                let obj=user.details.find((va)=>{    
                    return  va.name== imgNames[imgName]
                })
                if(obj){
                    await User.findOneAndUpdate({_id:req.params.id},
                        {$pull:{details:obj}})
                    
                    try{
                        fs.unlinkSync("./client/public/uploads/"+imgNames[imgName])
                        if(imgName==imgSize){
                            response()
                        }
                       
                    }catch(err){
                        console.log("err"+  err)
                        res({message:"error form server tring to delete file"})
                    }
                }
            }
       }
    })
    function response(){
        res.json({message:"successful"})
    }
})

app.post('/signup',checkNotAuthenticated,async(req,res)=>{
    let user=new User()

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
                       uploadRequest2(req.body.courseCode,"PDF",filename,id)
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
    console.log(file.mimetype.toLowerCase())

    if(file.mimetype.toLowerCase()=="image/jpeg"||file.mimetype.toLowerCase()=="image/png"||file.mimetype.toLowerCase()=="image/jpg"){
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
                    file.date=Time().year + "-" + Time().month + "-" +Time().date
    
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
                        uploadRequest2(req.body.title,req.body.faculty,filename,id)
                        await User.findOneAndUpdate({_id:id},{$push:{details:file}})
                        //initializing book schema to actual get an ID
                        allImg.find(async(err,data)=>{
                            
                           if(err){
                                console.log(err)
                           }
                           else{
                                if(data.length>=1){
                                    allImg.find(async(err,data)=>{
                                        if(err){
                                            console.log(err)
                                        }
                                        else{
                                            await allImg.findOneAndUpdate({_id:data[0].id},{$push:{bookDetails:file}})
                                        }
                                    
                                    })
                                }
                                else{
                                    await new allImg({bookDetails:["test"]}).save()
                                    allImg.find(async(err,data)=>{
                                        if(err){
                                            console.log(err)
                                        }
                                        else{
                                            await allImg.findOneAndUpdate({_id:data[0].id},{$push:{bookDetails:file}})
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
//this route handles users request base on accomodation 
app.post("/uploadRequest/:id",(req,res)=>{
    const {id}=req.params;
  //deleteAllPostFromNotificattion()
    User.findById(id,async(err,user)=>{
        if(err){
            console.log("/uploadRequest/:id")
            console.log(err)
            res.status(500)
        }
        else{
            crypto.randomBytes(16,async (err,buf) => {
                if (err) {
                    return   console.log(err)
                }
                else{
                    const notificationID = buf.toString('hex') + path.extname(id)
                    let endEvent=new Date()
                    endEvent.setDate(new Date().getDate()+10)
                    const file={"title":'',"faculty":'',"bookURL":'',"notificationID":'',
                        "userID":'',"notification":'',"requestType":'',"name":'',"phone":'',
                        "time":'',"monthPosted":'',"datePosted":''}
                    let months=["jan","feb","mar","apr","may","jun","july","aug","sep","oct","nov","dec"]
                    file.notificationID=notificationID
                    file.userID=id
                    file.notification=req.body.notification
                    file.requestType=req.body.selection
                    file.name=await user.name
                    file.phone=await user.tel
                    file.time=endEvent.getTime()
                    file.monthPosted=months[new Date().getMonth()]
                    file.datePosted=new Date().getDate()
                    Notification.find(async(err,data)=>{
                        if(err){
                                console.log(err)
                        }
                        else{
                            await User.findOneAndUpdate({_id:id},{$push:{notification:file}})
                            if(data.length>0){
                                Notification.find(async(err,data)=>{
                                    if(err){
                                        console.log(err)
                                    }
                                    else{
                                        await Notification.findOneAndUpdate({_id:data[0].id},{$push:{notification:file}})
                                    }
                                })
                            }
                            else{
                                await new Notification({notification:["test"]}).save()
                                Notification.find(async(err,data)=>{
                                    if(err){
                                        console.log(err)
                                    }
                                    else{
                                        await Notification.findOneAndUpdate({_id:data[0].id},{$push:{notification:file}})
                                    }
                                
                                })
                            }
                        }
                    })
                }
            })
        }
    })
})

app.post('/Accomodation_upload/:id',async(req,res)=>{
    let id=req.params.id
    
    
    if(req.files==null){
        let file= { name:'',data: '',size: 0,tempFilePath: '',mimetype: '', md5: '',Price: '',Address: '',selection: '',tel: ''}
                file.name="/accomodationImg/firstImg.jpg";
                file.Price=req.body.Price;
                file.Address=req.body.Address.toLowerCase();
                file.selection=req.body.selection.toLowerCase();
                file.tel=req.body.tel;
                    
                res.json({fileName:file.name,filePath:`${file.name}`})
                await User.findOneAndUpdate({_id:id},{$push:{AccomodationImg:file}})
                
                //initializing book schema to actual get an ID
                allImg.find(async(err,data)=>{
                    
                    if(err){
                            console.log(err)
                    }
                    else{
                        if(data.length>=1){
                            allImg.find(async(err,data)=>{
                                if(err){
                                    console.log(err)
                                }
                                else{
                                    await allImg.findOneAndUpdate({_id:data[0].id},{$push:{AccomodationImg:file}})
                                }
                            })
                        }
                        else{
                            await new allImg({AccomodationImg:["test"]}).save()
                            allImg.find(async(err,data)=>{
                                if(err){
                                    console.log(err)
                                }
                                else{
                                    await allImg.findOneAndUpdate({_id:data[0].id},{$push:{AccomodationImg:file}})
                                }
                            
                            })
                        }
                    }
                })
        return
    }
    const file=req.files.file;

    if(file.mimetype.toLowerCase()=="image/jpeg"||file.mimetype.toLowerCase()=="image/png"||file.mimetype.toLowerCase=="image/jpg"){
        crypto.randomBytes(16,async (err,buf) => {
            if (err) {
                return   console.log(err)
            }
            else{
                const filename =await buf.toString('hex') + path.extname(file.name);
          
               
                if(filename){
                    file.name="/Accomodation_upload/"+filename
                    file.Price=req.body.Price
                    file.Address=req.body.Address.toLowerCase()
                    file.selection=req.body.selection.toLowerCase()
                    file.tel=req.body.tel
                    file.mv( `${__dirname}/client/public${file.name}`,async(err)=>{
                        if(err){
                            console.log(err)
                            return res.status(500).send(err)
                        }
                        file.data='';
                        file.size=0;
    
                            res.json({fileName:file.name,filePath:`${file.name}`})
                        })
                        
                        await User.findOneAndUpdate({_id:id},{$push:{AccomodationImg:file}})
                        //initializing book schema to actual get an ID
                        allImg.find(async(err,data)=>{
                            
                           if(err){
                                console.log(err)
                           }
                           else{
                                if(data.length>=1){
                                    allImg.find(async(err,data)=>{
                                        if(err){
                                            console.log(err)
                                        }
                                        else{
                                            await allImg.findOneAndUpdate({_id:data[0].id},{$push:{AccomodationImg:file}})
                                        }
                                    
                                    })
                                }
                                else{
                                    await new allImg({AccomodationImg:["test"]}).save()
                                    allImg.find(async(err,data)=>{
                                        if(err){
                                            console.log(err)
                                        }
                                        else{
                                            await allImg.findOneAndUpdate({_id:data[0].id},{$push:{AccomodationImg:file}})
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

//this function help you upload notification when a user upload text book or pdf
function uploadRequest2(title,faculty,bookURL,id){
    crypto.randomBytes(16,async (err,buf) => {
        if (err) {
            return   console.log(err)
        }
        else{
          
            const notificationID = buf.toString('hex') + path.extname(id)
            const file={"title":'',"faculty":'',"bookURL":'',"notificationID":'',
                "userID":'',"notification":'',"requestType":'',"name":'',"phone":'',
                "time":'',"monthPosted":'',"datePosted":''}
            let months=["jan","feb","mar","apr","may","jun","july","aug","sep","oct","nov","dec"]
            let endEvent=new Date()
            endEvent.setDate(new Date().getDate()+10)
            file.notificationID=notificationID
            file.title=title
            file.faculty=faculty
            file.bookURL=bookURL
            file.userID=id
            file.time=endEvent.getTime()
            file.monthPosted=months[new Date().getMonth()]
            file.datePosted=new Date().getDate()
            Notification.find(async(err,data)=>{
                if(err){
                        console.log(err)
                }
                else{
                    await User.findOneAndUpdate({_id:id},{$push:{notification:file}})
                    if(data.length>0){
                        Notification.find(async(err,data)=>{
                            if(err){
                                console.log(err)
                            }
                            else{
                                await Notification.findOneAndUpdate({_id:data[0].id},{$push:{notification:file}})
                              /*  Notification.find((err,data)=>{
                                    console.log(data[0].notification[5])
                                })*/
                            }
                        })
                    }
                    else{
                        await new Notification({notification:["test"]}).save()
                        Notification.find(async(err,data)=>{
                            if(err){
                                console.log(err)
                            }
                            else{
                                await Notification.findOneAndUpdate({_id:data[0].id},{$push:{notification:file}})
                            }
                        
                        })
                    }
                }
            })
        }
    })
}


function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
       return  res.redirect('/home/'+req.user._id)
    }
    next(); 
}

function deletePostFromBookCollection(name){
    allImg.find({"bookDetails.name":name},async (err,user)=>{
        if(err){
            console.log("err")
            console.log(err)
        }
        else if(user.length!==0){
            let obj=await user[0].bookDetails.find((va)=>{    
                return  va.name==name
            })
            if(obj){
                await allImg.findOneAndUpdate({_id:user[0]._id},
                    {$pull:{bookDetails:obj}})
            }
        }
    })
}
/*
function capitalize(value){
    value=value.toLowerCase().split(' ');
    let capitalize=[];
    for(let i=0;i<value.length;i++){
        capitalize.push(value[i][0].toUpperCase()+value[i].split('').splice(1).join(''));
    } 
   
    return  capitalize
}*/
function deletePostFromNotification(notificationID,id){
    Notification.find({"notification.notificationID":notificationID},async (err,notifications)=>{
        if(err){
            console.log("err")
            console.log(err)
        }
        else if(notifications.length!==0){
            let obj=await notifications[0].notification.find((va)=>{    
                return  va.notificationID==notificationID
            })

            if(obj){
                await Notification.findOneAndUpdate({_id:notifications[0]._id},
                    {$pull:{bookDetails:obj}})
            }
        }
    })



    //this delete all single post from user schema
    User.findById(id,async(err,user)=>{
        if(err){
            console.log(err)
        }
        else{
             if(user){ 
                 let obj=await user.notification.find((va)=>{    
                     return  va.notificationID==notificationID
                 })
               
                 if(obj){
                     await User.findOneAndUpdate({_id:id},
                            {$pull:{notification:obj}})
                }
                else{
                    return
                }
            }
        }
     })
}
function deleteAllPostFromNotificattion(){

    Notification.find((err,data)=>{
        if(err){
            console.log(err)
        }
        else{
         //   console.log(data)
            Notification.updateMany({_id:data[0]._id},{ $set: {notification:[]}},function(err, affected){
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
    User.find((err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            
          User.updateMany({_id:data[0]._id},{ $set: {notification: []}},function(err, affected){
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
function deleteAllPostFromBook(){
    allImg.find((err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            allImg.updateMany({_id:data[0]._id},{ $set: {bookDetails: []}},function(err, affected){
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
function deleteAllAccomodationPost(){
    allImg.find((err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            allImg.updateMany({_id:data[0]._id},{ $set: {AccomodationImg: []}},function(err, affected){
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

