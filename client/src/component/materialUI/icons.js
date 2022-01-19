import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React,{useState,useEffect} from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';

/*
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));
*/
const defaultProps = {
  color: 'secondary',
  children: <NotificationsIcon />,
};

function BadgeMax() {
  const[alert,setalert]=useState()

  useEffect(()=>{
    const aboutController=new AbortController()
    const signal=aboutController.signal

 async   function setNotificationAlert(){
            const responsePDF=await fetch("/pdfAPI")
            const bodyPDF=await responsePDF.json()
            localStorage.setItem('numberOfPDF', JSON.stringify(bodyPDF.express.length))
            
            
            const responseBook=await fetch("/Books")
            const bodyBook=await responseBook.json()
            localStorage.setItem('numberOfBook', JSON.stringify(bodyBook.express.length))

            const responseNotifications=await fetch("/notifications",{signal:signal})
            const bodyNotifications=await responseNotifications.json()

            let numberOfBook=JSON.parse(localStorage.getItem('numberOfBook'))
            let numberOfPDF=JSON.parse(localStorage.getItem('numberOfPDF'))
            let preTotal=JSON.parse(localStorage.getItem('notificationNumber'))
            let total=numberOfPDF+numberOfBook
        
            if(total===preTotal){
                setalert(0)
            }
            else if(bodyNotifications.express2===0){
                setalert(0)
            }
            else{
                if(preTotal===null){
               
                    setalert(bodyNotifications.express2)
                }
                else{
                    let newTotal=total-preTotal
                    if(newTotal>bodyNotifications.express2){
                      setalert(bodyNotifications.express2)
                    }
                    else{
                      setalert(newTotal)
                    }
                   
                }
              
            }
        }
       /* 
    const intervaID=setInterval(() => {
     setNotificationAlert()
    }, 6000);
    
    return()=> { clearInterval(intervaID); }
    */
 
  },[])
  
  
 
  
  return (
    <span >
      <Badge badgeContent={alert} max={999} {...defaultProps} color="error"/>
    </span>
  );
}


export {ArrowBackIcon,BadgeMax} 