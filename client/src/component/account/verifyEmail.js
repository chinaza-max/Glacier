import React,{useState} from 'react';
import axios from 'axios'
import "../../style/verify.css";
import {  Link } from "react-router-dom";
import Swal from 'sweetalert2/src/sweetalert2.js'

function VerifyEmail(){
        const [eventInfo,setEventInfo]=useState({email:''});


        const handleChange=(event)=>{
            const {name,value}=event.target
       
            setEventInfo({...eventInfo,[name]:value})
        }
        
        const  {email}=eventInfo
    

    const onSubmit=async (e)=>{
            e.preventDefault();
            const formData=new FormData();
            formData.append('email',email);
            
        axios.post('/verifyEmail',formData,{
            headers:{
                'Content-Type':'multipart/form-data'
        }})
        .then(
            (res)=>{
                
                if(res.data.express==="user does not exit"){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'user does not exit!',
                        footer: '<strong >check email </strong>'
                    })
                }
                else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: res.data.express,
                        showConfirmButton: false,
                    })
                }
            }
        )
        .catch(
            (e)=>{
               // console.log(e)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong check your internet connect!',
                    
                })
            }
        )
    }
    return(
        <div className='verifyContainer'>
            <form onSubmit={onSubmit}  encType="multipart/form-data">
                <input type="email" placeholder="username@gamil.com" name="email" onChange={(e)=>handleChange(e)} required></input>
                <input type="submit"></input>
                <div className='verifyContainer__back'><Link to={"/login"}>Back</Link></div>
            </form>
        </div>
    )
}
export default VerifyEmail;