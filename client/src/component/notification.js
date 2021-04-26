import  "../style/notification.css"
import {useEffect,useState } from 'react';
import {Link } from "react-router-dom";

function Notification(props){
    const[changeNavStyle,setChangeNavStyle]=useState({"height":"100px","transition":"height 0.4s ease-out","flexDirection":"column"})
    const[Notification,setNotification]=useState([])
    const[NotificationAmount,setNotificationAmount]=useState()
    
    function  goBack(){
        props.history.goBack()
    }
    function listenForScroll(){
        let container=document.querySelector(".notificationContainerSub")
        if(container.scrollTop>20){
           setChangeNavStyle({"height":"50px","transition":"height 0.6s ease-out","flexDirection":"row"})
        }
        else{
            setChangeNavStyle({"height":"100px","transition":"height 0.4s ease-out","flexDirection":"column"})
        }
    }   
    useEffect(()=>{
        const aboutController=new AbortController()
        document.querySelector(".notificationContainerSub").addEventListener('scroll',listenForScroll)
        const signal=aboutController.signal
async   function init(){
        const response=await fetch("/notifications",{signal:signal})
        const body=await response.json()
        setNotification(body.express)
        setNotificationAmount(body.express2)
    }
    init()
    return ()=> aboutController.abort()
    },[])
    let resultFound=Notification.map((data)=>{
        if(data==='test'){
            return '' 
        }
       else{
            if(data.faculty==="PDF"){
                return(
                    <div  key={data.notificationID} className="notificationBodyContent">
                        <h4>New PDF uploaded</h4>
                        <p className="notificationBodyContentRequest">course code: {data.title}</p>
                       <h5> <Link to={"/downloadPDF/"+data.bookURL} className="view">view</Link></h5>
                        <div className="notificationTime">
                            <div className="duration"><p>remaining {data.expiringDate}</p></div>
                            <div className="dateposted"><p>{data.monthPosted+"  "+data.datePosted}</p></div>
                        </div>  
                    </div>
                )
            }
           else if(data.faculty){
                return(
                    <div  key={data.notificationID} className="notificationBodyContent">
                        <h4>New Book uploaded</h4>
                        <p className="notificationBodyContentRequest">{data.title +" used by mainly"+data.faculty}</p>
                        <h5><Link to={"/details/"+data.bookURL} className="view" >view</Link></h5>
                        <div className="notificationTime">
                            <div className="duration"><p>remaining {data.expiringDate}</p></div>
                            <div className="dateposted"><p>{data.monthPosted+"  "+data.datePosted}</p></div>
                        </div>
                    </div>
                )
           }
            else if(data.notification){
                return(
                    <div  key={data.notificationID} className="notificationBodyContent">
                        <h4>{data.requestType}</h4>
                        <p className="notificationBodyContentRequest">{data.notification}</p>
                        <h5>{data.tel}</h5>
                        <div className="notificationTime">
                            <div className="duration"><p>remaining {data.expiringDate}</p></div>
                            <div className="dateposted"><p>{data.monthPosted+"  "+data.datePosted}</p></div>
                        </div>
                    </div>
                )
            }
            else{
                return(
                    <div>empty</div>
                )
            }
       }
    })
    return(
        <div  className="notificationContainer">
            <div className="notificationContainerSub">
                    <div className="notificationNavContainer" style={changeNavStyle}>
                        <div className="homeTag" ><h6 onClick={goBack} className="Home">Home</h6></div>
                        <div className="notificationTag"><h4>Notification({NotificationAmount})</h4></div>
                    </div>
                <div className="notificationBody">
                   {resultFound}
                </div>
            </div>
        </div>
    )
}
export default Notification;