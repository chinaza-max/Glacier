import "../../style/Accomodation_UploadRequest.css";
import {useParams} from "react-router-dom";
import React,{useState} from 'react';
import axios from 'axios';
import {ArrowBackIcon} from "../materialUI/icons"
import Swal from 'sweetalert2/src/sweetalert2.js'

function Accomodation_UploadRequest(props){


    const [eventInfo,setEventInfo]=useState({num:0,selection:'',notification:"",select:""});
   
    
    const{num,selection,notification}=eventInfo;
    const id=useParams();
    const handleChange=(event)=>{
        const {name,value}=event.target;  
        if(name==="selection"){
            selectionfilled()
        }
        if(name==="notification"){
            setEventInfo({...eventInfo,[name]:value,num:0+value.length});
        }
        else{
            setEventInfo({...eventInfo,[name]:value});
        }
          
    }
    function selectionEmpty(){
            let selection=document.getElementById("select")
            selection.style.borderColor="red"
            setEventInfo({"select":"require"})
    }
    function selectionfilled(){
        let selection=document.getElementById("select")
        selection.style.borderColor="#007bff"
        setEventInfo({"select":""})
    }   
    const onSubmit=async (e)=>{
        e.preventDefault();
        if(selection===""||selection==="select type of request"){ 
            selectionEmpty()
        }
        else{
            const formData=new FormData();
            formData.append('selection',selection);
            formData.append('notification',notification);
        
            try{
                const res=await axios.post('/uploadRequest/'+id.id,formData,{
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                });
                /*
                Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Your work has been saved',
  showConfirmButton: false,
  timer: 1500
})*/
                const{express,error}=res.data
               // setUploadedFile({express,error})
                if(express==="success"){
                    Swal.fire({
                        position: 'bottom-center',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
                //error.response.data.express
            }
            catch(err){
                if(err){
                    console.log(err.response.data.error)
                   
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                      })
                }
                else{
                    console.log(err.response.data.msg)
                }
            }
        }
    }
    function  goBack(){ 
        props.history.goBack()
    }
    return(
        <div className="request_container">
           <nav>
              <ul>
                  <li>
                        <ul>
                            <li onClick={()=>goBack()}>
                                <ArrowBackIcon />
                            </li>
                            <li>
                                create a request
                            </li>
                        </ul>
                  </li>
                  <li>
                        <input type="submit"  value="Post"  onClick={onSubmit} />
                  </li>
              </ul>
           </nav>

           <div className="request_container__body">
                <div className="request_container__body__center">
                        <div className="request_container__body__center__container">
                            {eventInfo.select}
                            <select name="selection" id="select" onChange={handleChange} >
                                <option name="select1">select type of request </option>
                                <option name="select2">sell bed space </option>
                                <option name="select3">buy bed space</option>
                                <option name="select4">searching for roommate</option>
                            </select>
                        </div>
                        <div className='request_container__body_Description'>  
                            <div className="request_container__body_Description__1">
                                <label>what your request :</label>
                            </div>
                            <div className="request_container__body_Description__1__textAreaContainer">
                                <div>{num?num:0}/250</div>
                                <textarea type="text" placeholder="request....." name="notification"   onChange={handleChange} maxLength={250} required/>
                            
                            </div>
                        </div>
                </div>
             
            </div>
    </div>
    )
}
export default Accomodation_UploadRequest;









/*
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
    /*    }
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

*/