import React,{useState,useEffect} from 'react';
import {useParams } from "react-router-dom";
import NavDashboard from "./dashboardNav"
import "../../../style/dashBoardSettings.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import DashboardUI from "../../materialUI/dashBoardUI";
import axios from "axios";

function Dashboard(props){
    const[post,setposts]=useState([])
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
    function updateSetposts(data){
        console.log("hdhdhdh")
        //setposts(data)
    }
    useEffect(()=>{
        
    const init =async ()=>{
     
        axios.get('/posts/'+id).then((body) => {
            console.log(body)
            setposts(body.data.express.details)
            setNumberOfItem(body.data.express.details.length)
        });
    }
    init();
    
    },[id])

 
        return(
                <div id="dashBoardContainer">
                    <NavDashboard history={props.history} numberOfItemP={numberOfItem} id={id} dashBoardSortP={dashBoardSort}/>
                    <div id="dashBoardContainer__content">
                        <DashboardUI uploadP={update} updateSetpostsP={updateSetposts()}/>
                    </div>
                </div>
        )
}

export default Dashboard;   