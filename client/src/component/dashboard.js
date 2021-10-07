import React,{useState,useEffect} from 'react';
import {useParams,Link } from "react-router-dom";
import NavDashboard from "./sub-components/dashboard/dashboardNav"
import "../style/dashBoardSettings.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import DashboardUI from "./materialUI/dashBoardUI";
import axios from "axios";

function Dashboard(props){
    const[post,setposts]=useState([])
    const[loader,setLoader]=useState('loader2')
    const[fliterText,setFliterText]=useState('')
    const[numberOfItem,setNumberOfItem]=useState('')
    const {id}=useParams();
    let update=[]
    function dashBoardSort(text){
        setFliterText(text)
    }
    let newPost=post.map((data,index)=>{
        
        if(data.title.toLowerCase().indexOf(fliterText.toLowerCase())===-1&&data.author.toLowerCase().indexOf(fliterText.toLowerCase())===-1){
            return(
                null
            )
        }
        else{
            return(
                <div key={data.name}>{data}</div>
            )
        }
    })


    newPost.forEach((e)=>{
        if(e){
            creatingObj(e.props.children.name,e.props.children.title,
                e.props.children.author,e.props.children.title,
                e.props.children.date)
        }
    })

    function creatingObj(name,title,author,date){
        update.push({name,title,author,date})
    }
    console.log(update)
  async  function onclickHandle(route){
    await fetch(route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        },setLoader(route))
    }

    useEffect(()=>{
    const aboutController=new AbortController()
    const signal=aboutController.signal
    const init =async ()=>{
     
        axios.get('/posts/'+id).then((body) => {
            console.log(body)
            setposts(body.data.express.details)
            setNumberOfItem(body.data.express.details.length)
        });
    }
    init();
      return ()=> aboutController.abort()
    },[loader,id])

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
                <div id="dashBoardContainer">
                    <NavDashboard history={props.history} numberOfItemP={numberOfItem} id={id} dashBoardSortP={dashBoardSort}/>
                    <div id="dashBoardContainer__content">
                        <DashboardUI uploadP={update} setLoaderP={setLoader}/>
                    </div>
                </div>
        )
}

export default Dashboard;   