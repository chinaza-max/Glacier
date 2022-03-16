import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useRef,useEffect,useState} from "react";
//import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';


const defaultProps = {
  color: 'secondary',
  children: <NotificationsIcon />,
};

function BadgeMax() {
  const[alert,setalert]=useState()
  let intervaID = useRef(0);


  useEffect(()=>{
  
    const aboutController=new AbortController()
    const signal=aboutController.signal

 async   function setNotificationAlert(){
      
              fetch('/pdfAPI')
              .then(responsePDF => {
                if (!responsePDF.ok) {
                  throw new Error(responsePDF.statusText)
                }
                const bodyPDF= responsePDF.json()

                bodyPDF.then((bodyPDFP)=>{
                    localStorage.setItem('numberOfPDF', JSON.stringify(bodyPDFP.express.length))
                })
            
              }).catch(err=>{
              console.log(err)
            })
            
            fetch('/Books')
            .then(responseBook => {
              if (!responseBook.ok) {
                throw new Error(responseBook.statusText)
              }
              const bodyBook= responseBook.json()
              bodyBook.then((bodyBookP)=>{
                localStorage.setItem('numberOfBook', JSON.stringify(bodyBookP.express.length))
              })

            }).catch(err=>{
            console.log(err)
          })
           
            fetch('/notifications')
            .then(responseNotifications => {
              if (!responseNotifications.ok) {
                throw new Error(responseNotifications.statusText)
              }
              const bodyNotifications= responseNotifications.json()
             
              localStorage.setItem('numberOfBook', JSON.stringify(bodyNotifications.express.length))
            
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

              }).catch(err=>{
              console.log(err)
            })
        }
        
     intervaID.current=setInterval(() => {
     //setNotificationAlert()
    }, 6000);
    
    return()=> { clearInterval(  intervaID.current); }
    
 
  },[])
  
  
 
  
  return (
    <span >
      {alert<1?
        <Badge badgeContent={0} max={999} {...defaultProps} color="error"/>
        :
        <Badge badgeContent={alert} max={999} {...defaultProps} color="error"/>
        }
    </span>
  );
}


export {ArrowBackIcon,BadgeMax} 