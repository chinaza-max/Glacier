import React,{Fragment,useState} from 'react';
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";


const UploadBody=()=>{
    const [file,setFile]=useState('');
    const [filename,setFilename]=useState('Choose file');
    const [uploadedFile,setUploadedFile]=useState({});


    const onChange=(e)=>{
        console.log(e.target.files)
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name)
    }
    const onSubmit=async (e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('file',file);
        formData.append('more',"chinaza this shit works");
        for(let value of formData.values()){
            console.log(value)
        }
        try{
            const res=await axios.post('/upload',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });

            const{fileName,filePath}=res.data;
            setUploadedFile({fileName,filePath});
        }
        catch(err){
            if(err.response.status===5000){
                console.log("there was a problem with the server ")
            }
            else{
                console.log(err.response.data.msg)
            }
        }
    }
    return(
        <Fragment>
            <div className="container">
    
                <form onSubmit={onSubmit}  encType="multipart/form-data">
              
                    <input type="text"  className="mt-4" name="infor"/>
                    <div className="custom-file mt-4">
                        <input type="file" name="file" className="custom-file-input" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03" onChange={onChange}/>
                        <label className="custom-file-label" htmlFor="inputGroupFile03">{filename}</label>
                    </div>

                    <input type="submit" value="Upload"  className="btn btn-primary btn-block  mt-4"/>
                </form>
                {uploadedFile.fileName   ? 
                    <div className="row mt-5">
                        <div className="col-md-6 m-auto"> 
                        <h3 className="text-center">{uploadedFile.fileName} </h3>
                        <img  style={{width:'100%'}} src={uploadedFile.filePath} alt="file cant show"/>
                     </div>
                   </div> : null
                }
       
            </div>
        </Fragment>
    )
}

export default UploadBody;