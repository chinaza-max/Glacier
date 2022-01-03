import "../../style/Accomodation_UploadRequest.css";
import {useParams,useNavigate} from "react-router-dom";
import React,{useState} from 'react';
import axios from 'axios';
import {ArrowBackIcon} from "../materialUI/icons"
import Swal from 'sweetalert2/src/sweetalert2.js'

function Accomodation_UploadRequest(){

    const [eventInfo,setEventInfo]=useState({num:0,selection:'',notification:"",select:""});
    const{num,selection,notification}=eventInfo;
    const id=useParams();
    const navigate = useNavigate();

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

    function clearInput(){
        document.querySelector("#notification").placeholder="request...";
       /* document.querySelector('#select option').prop('selected', function() {
            return this.defaultSelected;
        });*/
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
                const{express}=res.data
        
                if(express==="success"){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Your work has been uploaded',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    clearInput()
                }
                //error.response.data.express
            }
            catch(err){
                if(err){
                    console.log(err)
                   
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
        navigate(-1)
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
                                <textarea type="text" placeholder="request....." name="notification" id="notification"  onChange={handleChange} maxLength={250} required/>
                            
                            </div>
                        </div>
                </div>
             
            </div>
    </div>
    )
}
export default Accomodation_UploadRequest;