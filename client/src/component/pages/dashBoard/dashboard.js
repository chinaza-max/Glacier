import React,{useState,useEffect} from 'react';
import {useParams,useNavigate } from "react-router-dom";
import NavDashboard from "./dashboardNav"
import "../../../style/dashBoardSettings.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import DashboardUI from "./dashBoardUI";
import axios from "axios";

function Dashboard(props){
    const[post,setposts]=useState([])
    const[fliterText,setFliterText]=useState('')
    const[numberOfItem,setNumberOfItem]=useState('')
    const {id}=useParams();
    const navigate=useNavigate();
    let update=[];


    function dashBoardSort(text){
        setFliterText(text)
    }
    const newPost=post.map((data)=>{
        
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
                e.props.children.author,
                e.props.children.date)
        }
    })

    function creatingObj(name,title,author,date){
        update.push({name,title,author,date})
        //console.log()
    }

    function updateSetposts(data){
        console.log("hdhdhdh")
        //setposts(data)
    }

    useEffect(()=>{

    //this condition help check help if the user is properly login
    if(id==="undefined"){
        navigate("/login")
    }
    const init =async ()=>{
     
        axios.get('/posts/'+id).then((body) => {
            setposts(body.data.express)
            setNumberOfItem(body.data.express.length)
        });
    }
    init();
    
    },[id, navigate])

 
        return(
                <div id="dashBoardContainer">
                    <NavDashboard  numberOfItemP={numberOfItem} id={id} dashBoardSortP={dashBoardSort}/>
                    <div id="dashBoardContainer__content">
                        <DashboardUI uploadP={update} updateSetpostsP={updateSetposts()}/>
                    </div>
                </div>
        )
}

export default Dashboard;   