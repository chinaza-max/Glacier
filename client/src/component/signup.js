import React,{useState} from 'react';
import axios from 'axios'

import {useHistory } from "react-router-dom";




function Signup(){
    const history=useHistory()
    const [eventInfo,setEventInfo]=useState({name:'',password:'',email:'',tel:''});

    const{name,password,email,tel}=eventInfo

    const handleChange=(event)=>{
        const {name,value}=event.target
        setEventInfo({...eventInfo,[name]:value})
    }

    const onSubmit=async (e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('name',name);
        formData.append('password',password);
        formData.append('email',email);
        formData.append('tel',tel);
       
        try{
            const res=await axios.post('/signup',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });

            const{login}=res.data;
            
            history.push(login)
        }
        catch(err){
            if(err){
                console.log(err)
            }
            else{
                //console.log(err.response.data.msg)
            }
        }
    }
    return(
        <div>
            <form   onSubmit={onSubmit}  encType="multipart/form-data">
                <div>
                <input type="text" placeholder="Enter first name" name="name" onChange={handleChange}></input>
                </div>
                <div>
                <input type="password" placeholder="passWord ..." name="password" onChange={handleChange}></input>
                </div>
                <div>
                <input type="email" placeholder="name@.com" name="email" onChange={handleChange}></input>
                </div>
                <div>
                <input type="tel" placeholder="phone No" name="tel" onChange={handleChange}></input>
                </div>
                 <button>Signup</button>

            </form>
        </div>
    )
}
export default Signup;