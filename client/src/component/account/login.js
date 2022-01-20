import React,{useState,useEffect} from 'react';
import axios from 'axios'
import {useNavigate ,Link} from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import "../../style/signUp.css";

function Login(){
    const navigate=useNavigate()
    const [eventInfo,setEventInfo]=useState({password:'',email:''});
    const [error,setError]=useState('')
    const {password,email}=eventInfo
    

    const handleChange=(event)=>{
        const {name,value}=event.target
        setEventInfo({...eventInfo,[name]:value})
    }
    const googleSignUp=async (e)=>{
        e.preventDefault();
        window.open("https://glacier-file.herokuapp.com/auth/google","_self");
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
                navigate("/home/"+res.data.express.id)
            })
            .catch((error)=>{
                
                setError(error.response.data.express)
            })

        }
        catch(err){
            //console.log(err)
        }
    } 

    useEffect(()=>{
        if(window.localStorage.getItem("isAuthenticated")==="true"){
            navigate("/home/"+window.localStorage.getItem("id"))
        }
    })
   
    return(
            <div className='accountContainer'>
                <div className='accountContainerCenter'>
                    <div>
                        <form  onSubmit={onSubmit}  encType="multipart/form-data">
                            <div>
                            <input type="email" placeholder="EmailName@.com" name="email" onChange={handleChange} required></input>
                            </div>
                            <div>
                            <input type="password" placeholder="passWord ..." name="password" onChange={handleChange} required></input>
                            </div>
                           
                            <div className='accountContainerCenter__Section1'>
                                <button>login</button> 
                                <Link to={"/signup"} >signup</Link>
                            </div>


                            <Link to={"/verifyEmail"} className='accountContainerCenter__forgotPassword'>forgot  password</Link>
                            <div className='accountContainerCenter__google'> <a href="/" onClick={(e)=>{googleSignUp(e)}}> <GoogleIcon  style={{"color":"blue"}}/>sign in with google</a></div>
                            <div className='accountContainerCenter__error'>   {error?error:""}</div>
                            <div className='accountContainerCenter__logo'>Glac</div>
                        </form>
                    </div>
                    <div></div>
                </div>
            </div>
        
    )
}
export default Login; 