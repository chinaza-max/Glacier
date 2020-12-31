
import React,{useState} from 'react';
import axios from 'axios'
import {useHistory } from "react-router-dom";


function Login(){
    const history=useHistory()
    const [eventInfo,setEventInfo]=useState({password:'',email:''});
    const{password,email}=eventInfo


    const handleChange=(event)=>{
        const {name,value}=event.target
        setEventInfo({...eventInfo,[name]:value})
    }
    const onSubmit=async (e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('password',password);
        formData.append('email',email);
        try{
            const res=await axios.post('/login',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });

            const{home}=res.data
            console.log(home)            
            history.push(home)
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
        <div>
            <form  onSubmit={onSubmit}  encType="multipart/form-data">
            <div>
            <input type="email" placeholder="name@.com" name="email" onChange={handleChange}></input>
            </div>
            <div>
            <input type="password" placeholder="passWord ..." name="password" onChange={handleChange}></input>
            </div>
            <button>login</button>
            </form>
        </div>
    )
}
export default Login;