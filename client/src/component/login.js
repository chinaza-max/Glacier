import React,{useState,useEffect} from 'react';
import axios from 'axios'
import {useHistory } from "react-router-dom";


function Login(){
    const history=useHistory()
    const [eventInfo,setEventInfo]=useState({password:'',email:''});
    const  {password,email}=eventInfo
    const [error,setError]=useState('')

    const handleChange=(event)=>{
        const {name,value}=event.target
        setEventInfo({...eventInfo,[name]:value})
    }
    const googleSignUp=async (e)=>{
        e.preventDefault();
        window.open("http://localhost:5000/auth/google","_self")
    }
    const onSubmit=async (e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('password',password);
        formData.append('email',email);
        try{
                await axios.post('/login',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then((res)=>{
                window.localStorage.setItem('isAuthenticated',res.data.express.isAuthenticated)
                window.localStorage.setItem('id',res.data.express.id)
                
                history.push("/home/"+res.data.express.id)
            })
            .catch((error)=>{
                console.log(error.response.data.express)
                //setError(error.response.data.express)
            })

        }
        catch(err){
            console.log(err)
        }
    } 

    useEffect(()=>{
        if(window.localStorage.getItem("isAuthenticated")==="true"){
            history.push("/home/"+window.localStorage.getItem("id"))
        }
    })
   
    return(
        
        <div>
              <div>
                    {error?error:""}
                    <form  onSubmit={onSubmit}  encType="multipart/form-data">
                    <div>
                    <input type="email" placeholder="name@.com" name="email" onChange={handleChange} required></input>
                    </div>
                    <div>
                    <input type="password" placeholder="passWord ..." name="password" onChange={handleChange} required></input>
                    </div>
                    <button>login</button> 
                    </form>
                    <a href="/" onClick={(e)=>{googleSignUp(e)}}>google</a>
            </div>
              
              
        </div>
    )
}
export default Login; 