const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port=5000;


const bodyParser=require("body-parser")
const path=require("path")
const crypto=require("crypto");
const mongoose=require("mongoose")
const multer=require("multer")
const GridFsStorage=require("multer-gridfs-storage")
const Grid=require("gridfs-stream")
const methodOverride=require("method-override")

app.use(bodyParser.json())
app.use(methodOverride("_method"))
app.use(fileUpload());

const monogURI="mongodb://localhost:27017/BookDB"

const conn = mongoose.createConnection(monogURI, {useUnifiedTopology: true,useNewUrlParser: true});
let gfs;

conn.once('open',()=>{
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection("uploads")
 
})
/*
 const storage = new GridFsStorage({
    url: monogURI,
    file: (req, file) => {
        console.log(file)
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
              
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads' 
                };
                console.log(fileInfo)
                console.log("fileInfo")
                resolve(fileInfo);
            });
        });
    },
    options: {
        useUnifiedTopology: true,
    }
})
const upload = multer({ storage }).single('file')

*/
app.post('/upload',(req,res)=>{
    console.log(req.files.file)
    console.log(req.body)
    if(req.files===null){
        return res.status(400).json({msg:"No file uploaded"});
    }
    const file=req.files.file;
    const fileName=file.name
    console.log(fileName)
    
    let newName=crypto.randomBytes(16, (err,buf) => {
        if (err) {
            return err
        }
        const filename = buf.toString('hex') + path.extname(fileName);
    
        const fileInfo = {
            filename: filename,
            bucketName: 'uploads' 
        };
       
         return fileInfo
    });

    console.log(newName)
    file.mv( `${__dirname}/client/public/uploads/${file.name}`,(err)=>{
     
        if(err){
          console.log("ran")
          console.log(err)
          return res.status(500).send(err)
        }
      
        res.json({fileName:file.name,filePath:`/uploads/${file.name}`});

      });
})

 

app.listen(port ,()=>console.log(`server started.... ${port}`))