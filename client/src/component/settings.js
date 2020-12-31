import React,{useState,useEffect} from 'react';
import {useParams,Link } from "react-router-dom";
import NavSetting from "./sub-components/settings/settingsNav"
import "../style/settings.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"



function Settings(){
    const[post,setposts]=useState([])
    const[loader,setLoader]=useState('loader2')
    const {id}=useParams();



  async  function onclickHandle(route){
 
    await fetch(route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        },setLoader(route))
      
    }

    useEffect(()=>{
    
    const init =async ()=>{
        const response= fetch('/posts/'+id)
        const body = await response.then((res)=>res.json())
        setposts(body.express.details)
      }
      init();
      return ()=>{}
    },[post,loader,id])

    let data=post.map((data)=>{
        return(
            <div  key={data.name} className="BodySettingContainer" >
                    <div className="BodySettingContainer_sub">Title :{data.title}</div>
                    <div className="BodySettingContainer_sub">Author : {data.author}</div>
                    <div className="BodySettingContainer_sub" onClick={()=>{onclickHandle("/deletePost/"+id+"/"+data.name)}}>Delete</div>
             </div>
        )
    })
        return(
                <div >
                    <NavSetting/>
                    
                    <div className='before'></div>

                    {
                        post.length>0  ? 
                        <div className='settingsBody'>
                            {data}
                        </div> :
                        <div className='emptyPostSetting'>NO UPLOAD YET</div>
                     }

                </div>
        )
}
export default Settings;