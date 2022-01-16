const express = require('express');
const User=require("../mongodb/schema/userSchema")
const Notification=require("../mongodb/schema/notificationSchema")
const allImg=require("../mongodb/schema/allImg")
const router=express.Router();
const fs=require('fs');
const {nameOfFiles,deleteAllFiles,deleteAllPDFFiles,deleteAllAccomodationFiles}=require("../deletefiles");
const mongoConnection=require('mongoose')
const connection=mongoConnection.connection;




router.get('/deleteAllAcc/:AdminId',()=>{deleteAllFiles();deleteAllPostFromNotificattion()},(req,res)=>{

    if(req.params.AdminId===process.env.AdminId){
        connection.db.listCollections().toArray((err,names)=>{
            if(err){
                console.log("check route deleteAllAcc")
                console.log(err)
            }
            else{
                   
                for(i=0;i<names.length; i++){
                        mongoConnection.connection.db.dropCollection(names[i].name, function (err, result) {
                                if (err) {
                                    console.log(err)
                                }
                    })
                
                    if(i==names.length-1){
                        console.log("names")
                        res.send({express:"all account has been deleted"})
                    }
                }
            }
        })
    }
   
    
})

router.get("/deleteSingleAcc/:name",(req,res)=>{
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

router.get("/deleteAllPDF/:id",(req,res)=>{
    deleteAllPDFFiles()
    deleteAllPostFromNotificattion()
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

router.get('/DropSinglePDF/:name/:id',(req,res)=>{
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


router.get("/deleteAllBook",(req,res)=>{

    deleteAllFiles()
    deleteAllPostFromBook();
    deleteAllPostFromNotificattion()
    //this function below helps to delete all file in the directory;
   
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
//Delete single accomodation upload
router.get("/deleteSingleAccomodation/:name",(req,res)=>{
    let imgName=req.params.name
    deletePostFromAccomodationCollection(imgName)
    User.find({"AccomodationImg.unique":req.params.name},async (err,user)=>{
        if(err){
            console.log(err)
        }
        else if(user.length!==0){
            let obj=await user[0].AccomodationImg.find((va)=>{    
                return  va.unique==imgName
            })
          
            if(obj){
                await User.findOneAndUpdate({_id:user[0]._id},
                    {$pull:{AccomodationImg:obj}})
                
                try{
                    if(obj.name=="/accomodationImg/firstImg.jpg"){
                          res.send({express:"succefully Deleted"})
                    }
                    else{
                        fs.unlinkSync("./client/public"+obj.name)
                        res.send({express:"succefully Deleted"})
                    }
                }
                catch(err){
                    console.log("err"+  err)
                }
            
            }

        }
        else{
            res.status(200).send({"express":"does not exit"})
        }
    
    })
})
//Delete single book cover
router.get("/deleteSinglePost/:name",(req,res)=>{
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
             res.status(200).send({"express":"does not exit"})
        }
    
    })
})
router.get("/deleteAllAccomodationPost",(req,res)=>{
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

router.get("/generateAccDetails/:name",(req,res)=>{
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

router.get("/checkValue/:id",(req,res)=>{
    User.find({tel:req.params.id},(err,user)=>{
        if(err){
            console.log(err)
        }
        else if(user.length!==0){
            res.send({express:user[0].check,express2:process.env.Pay_Stack_APIKEY})
        }
        else{
            res.send({express:"no user found"})
        }
    })
}) 

router.post("/updateTel/:id",(req,res)=>{
   
    User.findOneAndUpdate({_id:req.params.id},{tel:req.body.tel},(err,data)=>{
        if(err){
            res.json({express:"problem from server updating phone number"}).status(500)
            console.log(err)
           return 
        }
        else{
            res.json({express:"successfully updated"}).status(300)
        }
    })
})

router.post("/updateCheckValue/:id/:value",(req,res)=>{

    User.findOneAndUpdate({tel:req.params.id},{check:req.params.value},(err,data)=>{
        if(err){
            res.json({express:"problem from server updating phone number"}).status(500)
            console.log(err)
           return 
        }
        else{
           // console.log(data)
            res.json({express:"successfully updated"}).status(300)
        }
    })
})

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
function deleteAllPostFromNotificattion(){

    Notification.find((err,data)=>{
        if(err){
            console.log(err)
        }
        else{
           
            if(data.length!==0){
                Notification.updateMany({_id:data[0]._id},{ $set: {notification:[]}},function(err, affected){
                    if(err){
                        console.log(err)
                        return 
                    }
                    else{
                       // console.log(affected)
                       
                    }
                })
            }
        }
    })
    User.find((err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            
            if(data.length!==0){
                User.updateMany({_id:data[0]._id},{ $set: {notification: []}},function(err, affected){
                    if(err){
                        console.log(err)
                        return 
                    }
                    else{
                        //console.log(affected)
                        
                    }
               })
            }
            else{
                return
            }
        }
    })

}

function deletePostFromAccomodationCollection(name){
    allImg.find({"AccomodationImg.unique":name},async (err,user)=>{
        if(err){
            console.log("err")
            console.log(err)
        }
        else if(user.length!==0){
            let obj=await user[0].AccomodationImg.find((va)=>{    
                return  va.unique==name
            })
            if(obj){
                await allImg.findOneAndUpdate({_id:user[0]._id},
                    {$pull:{AccomodationImg:obj}})
            }
        }
    })
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


module.exports=router