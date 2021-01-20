const fs=require('fs');


function deleteFileInUpload(name){
    fs.unlinkSync("./client/public/uploads/"+name)
}

function nameOfFiles(namearr){
    for(let i=0; i<namearr.length; i++){
        deleteFileInUpload(namearr[i])
    }
}
function deleteFileInUploadPDFs(name){
    fs.unlinkSync("./client/public/uploads/"+name)
}

function nameOfFiles2(namearr){
    for(let i=0; i<namearr.length; i++){
        deleteFileInUploadPDFs(namearr[i])
    }
}

module.exports={nameOfFiles,nameOfFiles2}