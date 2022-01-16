import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import {useEffect} from 'react';
import "../../style/scrollTop.css";


function ScrollTop(props){
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        if( props.notificationP==="notification"){
            const container=document.querySelector(".notificationContainerSub")
            container.scrollTop=0;
        }
    }

   
  
    useEffect(()=>{
        
 
        function scrollFunction() {
            
            if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
                
                if(document.querySelector(".scrollTop")){
                    document.querySelector(".scrollTop").style.display = "block";
                }
               
            } 
            else {
                if(document.querySelector(".scrollTop")){
                    document.querySelector(".scrollTop").style.display = "none";
                }
            }
        }
     

        window.addEventListener("scroll",scrollFunction)
        return ()=>{ 
            window.removeEventListener("scroll",scrollFunction); 
        }
    },[])
    return(
        <div className='scrollTop' onClick={()=>topFunction()}>
     
            <ArrowCircleUpIcon style={{"fontSize":"50px"}}/>
        </div>
    )
}

export default ScrollTop;