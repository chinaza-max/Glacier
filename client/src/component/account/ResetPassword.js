import React,{useState} from 'react';
import axios from 'axios'
import {useParams } from "react-router-dom";
import Swal from 'sweetalert2/src/sweetalert2.js'
import "../../style/resetPassword.css"

function ResetPassword(){
        const [eventInfo,setEventInfo]=useState({email:''});
        const {id}=useParams();
        const  {password}=eventInfo

        const handleChange=(event)=>{
            const {name,value}=event.target
            setEventInfo({...eventInfo,[name]:value})
        }
        const visiblePassword=()=>{
            let input=document.getElementById("password");
            if(input.type==="password"){
                input.type="text";
            }
            else{
                input.type="password";
            }
        }
      
    
        const onSubmit=async (e)=>{
            e.preventDefault();
            const formData=new FormData();
            formData.append('password',password);
            formData.append("id",id)
        axios.post('/ResetPassword',formData,{
            headers:{
                'Content-Type':'multipart/form-data'
        }})
        .then(
            (res)=>{
                console.log(res.data.express)
                if(res.data.express==="successfully updated"){
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
                console.log(e.response.data.express)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: e.response.data.express,
                })
            }
        )
    }
    return(
        <div className='resetPasswordConatianer'>
            <form onSubmit={onSubmit}  encType="multipart/form-data">
                <input type="password" id="password" placeholder="Enter new password" name="password" onChange={(e)=>handleChange(e)} required></input>
                <ul>      
                    <li><input type="checkbox" onClick={()=>visiblePassword()}/></li>
                    <li> show password</li>
                </ul>
                <input type="submit"></input>

                <div>    <a href='/login'>back to login page</a></div>
            </form>
        </div>
    )
}
export default ResetPassword;
//  <input type='checkbox' > </input>