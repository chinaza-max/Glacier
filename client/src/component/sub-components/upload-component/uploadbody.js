import React,{Fragment,useState} from 'react';
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../../../style/uploadBody.css"







const UploadBody=(props)=>{
    const [file,setFile]=useState('');
    const [filename,setFilename]=useState('Choose file');
    const [uploadedFile,setUploadedFile]=useState({});
    const [eventInfo,setEventInfo]=useState({author:'',title:'',faculty:'',Description:'',tel:''});

    const{author,title,faculty,Description,tel}=eventInfo


    const onChange=(e)=>{
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name)
    }
    
    const handleChange=(event)=>{
        const {name,value}=event.target
        setEventInfo({...eventInfo,[name]:value})
    }

    const onSubmit=async (e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('file',file);
        formData.append('author',author);
        formData.append('title',title);
        formData.append('faculty',faculty);
        formData.append('Description',Description);
        formData.append('tel',tel);
        for(let value of formData.values()){
            console.log(value)
        }
        try{
            console.log('props')
            console.log(props.id)
            const res=await axios.post('/upload/'+props.id,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });

            const{fileName,filePath,errMessage}=res.data
            setUploadedFile({fileName,filePath,errMessage})
        }
        catch(err){
            if(err){
                console.log(err)
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
                    <div className="custom-file mt-4">
                        <input type="file" name="file" className="custom-file-input" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03" onChange={onChange} required/>
                        <label className="custom-file-label" htmlFor="inputGroupFile03">{filename}</label>
                    </div>
                    {uploadedFile.errMessage ? <h6 className='error'>{uploadedFile.errMessage}</h6>:null}
                    <div className="Author">  
                        <label>Book Author :</label>
                        {uploadedFile.filePath}
                        <input type="text" name="author" onChange={handleChange} required/>
                    </div>
                    <div className='title'>  
                        <label>Title : </label>
                        <input type="text"  name="title" onChange={handleChange} required />
                    </div>
                    <div className='Book-faculty'>  
                        <label>Book-faculty :</label>
                        <input type="text"  name="faculty" onChange={handleChange} required/>
                    </div>
                    <div className='Description'>  
                        <label>Description :</label>
                        <textarea type="text"  name="Description" onChange={handleChange} required/>
                    </div>
                    <div className='tel'>  
                        <label>tel :</label>
                        <input type="tel"  name="tel" placeholder="your phone NO" onChange={handleChange} required/>
                    </div>
                    <input type="submit" value="Upload"  className="btn btn-primary btn-block  mt-4"/>
                </form>
                {
                uploadedFile.fileName   ? 
                    <div className="row mt-5">
                        <div className="col-md-6 m-auto"> 
                        <img  style={{width:'100%'}} src={uploadedFile.filePath} alt="file cant show"/>
                     </div>
                   </div> : null
                }
       
            </div>
        </Fragment>
    )
}

export default UploadBody;