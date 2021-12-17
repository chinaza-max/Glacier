import  "../../style/notification.css"
import {useEffect,useState } from 'react';
import {Link ,useParams} from "react-router-dom";
import {ArrowBackIcon} from "../materialUI/icons";
import AddCircleIcon from '@mui/icons-material/AddCircle';
function Notification(props){
    const[changeNavStyle,setChangeNavStyle]=useState({"height":"100px","transition":"height 0.4s ease-out","flexDirection":"column"})
    const[Notification,setNotification]=useState([])
    const[NotificationAmount,setNotificationAmount]=useState()
    let id=useParams()
   

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
    function resetNotificationAlert(){
        let numberOfBook=JSON.parse(localStorage.getItem('numberOfBook'))
        let numberOfPDF=JSON.parse(localStorage.getItem('numberOfPDF'))
        let total=numberOfPDF+numberOfBook
        localStorage.setItem('notificationNumber', JSON.stringify(total))
    } 
    resetNotificationAlert()
    useEffect(()=>{
         
        const aboutController=new AbortController()
        const signal=aboutController.signal
        document.querySelector(".notificationContainerSub").addEventListener('scroll',listenForScroll)

async   function init(){
        const response=await fetch("/notifications",{signal:signal})
        const body=await response.json()
        if(body.express===""){
            return
        }
        else{
            setNotification(body.express)
            setNotificationAmount(body.express2)
        }
        
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
                    <div className="notificationNavContainer" style={changeNavStyle}>{console.log(resultFound)}
                        <div className="homeTag" ><h6 onClick={goBack} className="Home"> <ArrowBackIcon style={{fontSize: 34 + 'px'}}/></h6></div>
                        {resultFound.length===0?'':<div className="notificationTag"><h4>Notification({NotificationAmount})</h4></div>}
                    </div>
                    {resultFound.length===0?<div className="notificationContainerSub__empty">Notification is empty</div>:
                    <div className="notificationBody">
                        {resultFound}
                    </div>
                    }
                  <div className="notificationContainerSub__add"><Link to={`/home/${id.id}/Accomodation_UploadRequest`} className="Link"> <AddCircleIcon style={{"fontSize":"60px"}}/></Link></div>
            </div>
        </div>
    )
}
export default Notification;