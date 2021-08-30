import  "../style/Accomodation_Upload_Nav.css";
import {useParams} from "react-router-dom";
import React,{useState} from 'react';
import axios from 'axios'
import AccomodationUploadNav from "../component/sub-components/setingsNav"

function Accomodation_Upload(props){
    const [file,setFile]=useState('');
    const [filename,setFilename]=useState('upload image of building');
    const [uploadedFile,setUploadedFile]=useState({});
    const [eventInfo,setEventInfo]=useState({Price:0,Address:'',selection:'lodge',tel:''});
    const {Price,Address,selection,tel}=eventInfo
    const {id}=useParams()

    const onChange=(e)=>{
        if(e.target.files[0].name){
            setFile(e.target.files[0]);
            setFilename(e.target.files[0].name)
        }
    }

    const handleChange=(event)=>{
        const {name,value}=event.target
        console.log(name+' '+value)
        setEventInfo({...eventInfo,[name]:value})
        console.log(Price)
    }
    const onSubmit=async (e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('file',file);
        formData.append('Price',Price);
        formData.append('Address',Address);
        formData.append('selection',selection);
        formData.append('tel',tel);
        for(let value of formData.values()){
            console.log(value)
        }
        try{
            console.log(id)
            const res=await axios.post('/Accomodation_upload/'+id,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });

            const{fileName,filePath,errMessage}=await res.data
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
        <div className="container_of_Accomodation_Upload">
            <AccomodationUploadNav  history={props.history} idP={id}/>
            <div className="center">
                <div className="body_of_Accomodation_Upload">
                    <form onSubmit={onSubmit}  encType="multipart/form-data">
                        <div className="custom-file mt-4">
                            <input type="file" name="file" className="custom-file-input" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03" onChange={onChange} />
                            <label className="custom-file-label" htmlFor="inputGroupFile03">{filename} *Optional</label>
                        </div>
                        {uploadedFile.errMessage ? <h6 className='error'>{uploadedFile.errMessage}</h6>:null}
                        <div className="price">  
                            <label>Price :</label>
                            <input type="tel" name="Price"  onChange={handleChange} required/>
                        </div>
                    
                        <div className='Address'>  
                            <label>Address_Description :</label>
                            <textarea type="text"  name="Address" placeholder="Location of building.." onChange={handleChange} required/>
                        </div>
                        <div className='tel'>  
                            <label>tel :</label>
                            <input type="tel"  name="tel" placeholder="your phone NO" onChange={handleChange} required/>
                        </div>
                        <div className='selection_container'>  
                            <label>select :</label>
                            <select name="selection" id="select" onChange={handleChange} required>
                                <option name="Lodge">Lodge</option>
                                <option name="Hostel">Hostel</option>
                            </select>
                        </div>
                        <input type="submit" value="Upload"  className="btn btn-primary btn-block  mt-4"/>
                    </form>
                    {
                    uploadedFile.fileName   ? 
                        <div className="row mt-5 uploadedImg" >
                            <div className="col-md-6 m-auto"  > 
                            <img  style={{width:'30%'}} src={uploadedFile.filePath} alt="file cant show"/>
                        </div>
                    </div> :''
                }
                </div>
            </div>
        </div>
    )
}
export default Accomodation_Upload;