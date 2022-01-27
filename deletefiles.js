const fs=require('fs');
const path=require("path");
const {google} = require('googleapis');
const directory="./client/public/uploads/";
const oauth2Client=new google.auth.OAuth2(
    process.env.GOOGLE_DRIVE_CLIENT_ID,
    process.env.GOOGLE_DRIVE_CLIENT_SECRET,
    process.env.GOOGLE_DRIVE_REDIRECT_URI
)
const drive=google.drive({
    version:'v3',
    auth:oauth2Client
})

function deleteFileInUpload(name){
    fs.unlinkSync(directory+name)
}

function nameOfFiles(namearr){
    for(let i=0; i<namearr.length; i++){
        deleteFileInUpload(namearr[i])
    }
}

//this handles books only
function deleteAllFiles(){
    
   
    
        const directory="./client/public/uploads/";
        fs.readdir(directory,(err,files)=>{
            if(err){
                throw err
            }
            for(const file of files){
                fs.unlink(path.join(directory,file),(err)=>{
                    if(err){
                        console.log(err)
                    }
                })
            }
        })
        deleteAllAccomodationFiles();
        deleteAllPDFFiles();
    
}
function deleteAllAccomodationFiles(){
    const directory="./client/public/Accomodation_upload/";
    fs.readdir(directory,(err,files)=>{
        if(err){
            throw err
        }
        for(const file of files){
            fs.unlink(path.join(directory,file),(err)=>{
                if(err){
                    console.log(err)
                }
            })
        }
    })
}
function deleteAllPDFFiles(){

    const directory="./client/public/uploadPDFs/";
    fs.readdir(directory,(err,files)=>{
        console.log(files)
        if(err){
            throw err
        }
        for(const file of files){
            fs.unlink(path.join(directory,file),(err)=>{
                if(err){
                    console.log(err)
                }
            })
        }
    })
}


async function deleteDriveFile(id){
    try{
        const res= await drive.files.delete({
            fileId:id
        })
        console.log(id)
    }
    catch(err){
        console.log(err.message)
    }
}



module.exports={nameOfFiles,deleteAllFiles,deleteAllPDFFiles,deleteAllAccomodationFiles,deleteDriveFile}