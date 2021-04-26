import "../../style/Accomodation_UploadRequest.css";
import {useParams} from "react-router-dom";
import React,{useState} from 'react';
import axios from 'axios';

function Accomodation_UploadRequest(props){


    const [eventInfo,setEventInfo]=useState({num:250,selection:'',notification:""});
    const{num,selection,notification}=eventInfo;
    const id=useParams();
    const handleChange=(event)=>{
        const {name,value}=event.target;
        setEventInfo({...eventInfo,[name]:value});
        console.log(notification)
    
        if(name==="notifications1"){
            setEventInfo({...eventInfo,num:250-value.length});
        }
        
    }
    const onSubmit=async (e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('selection',selection);
        formData.append('notification',notification);
        try{
            const res=await axios.post('/uploadRequest/'+id.id,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });

            /*const{fileName,filePath,errMessage}=res.data
            setUploadedFile({fileName,filePath,errMessage})*/
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
    function  goBack(){ 
        props.history.goBack()
    }
    return(
        <div className="request_container">
           <div>
                <div>
                    <ul className="nav justify-content-center navRequest_container " style={{backgroundColor: "black",zIndex:200}}>
                        <li className="nav-item">
                                <div className="nav-link active"  onClick={goBack} style={{color: "white"}}>Back</div>
                        </li>
                    </ul>
                </div>
           </div>       
           <div className="request_uploadcontainer">
               <div className="request_uploadBody">
                    <div className='Description2'>  
                        <div className="requestContainer">
                            <label>what your request :</label>
                        </div>
                        <div className="textAreaContainer">
                            <div>{num}</div>
                            <textarea type="text" placeholder="request....." name="notification"   onChange={handleChange} maxLength={250} required/>
                         
                        </div>
                    </div>
                    <div className='selection_container'>  
                            <div className="label_select_container">
                                <label className="label_select">select :</label>
                            </div>
                            <div className="select_container">
                                <select name="selection" id="select" onChange={handleChange} required>
                                    <option name="select1">select </option>
                                    <option name="select2">sell bed space </option>
                                    <option name="select3">buy bed space</option>
                                    <option name="select4">searching for roommate</option>
                                </select>
                            </div>
                    </div>
                    <div className="submitDiv">
                        <input type="submit" value="Upload-request"   onClick={onSubmit} className="btn btn-primary btn-block  mt-4"/>
                    </div>
               </div>

           </div>
        </div>
    )
}
export default Accomodation_UploadRequest;