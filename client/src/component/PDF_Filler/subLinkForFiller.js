import { Link } from 'react-scroll';
import BookIcon from '@material-ui/icons/Book';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import {useEffect,useState} from 'react';

let style1={"position":"absolute","bottom":"20px","right":"-13px"}
let style2={"position":"absolute","bottom":"10px","right":"94px"}



function SubLinkForFiller(props){
  const [diswidth,setDiswidth]=useState(true)


    let display=props.navNameP==="Filler"? <span className="iconDestop"><PictureAsPdfIcon/></span> :<span className="iconDestop"><BookIcon/> </span>
    

      
    useEffect(()=>{
      


      if (window.innerWidth > 1024) {
        setDiswidth(true)
      } 
      else {
        setDiswidth(false)
      }
      function scrollFunction() {
  
          if (window.innerWidth > 1024) {
            setDiswidth(true)
          } 
          else {
            setDiswidth(false)
          }
      }


      window.addEventListener("resize",scrollFunction)
      return ()=>{ 
          window.removeEventListener("resize",scrollFunction); 
      }
    },[])
    return(
       <ul style={{listStyle:'none'}}>
            <li>
                <Link className="filler-link"  to="filler" style={{textDecoration:"none"}} spy={true} smooth={true} offset={50} duration={500} onClick={()=>{
                  props.isLogedInP();
                  props.fillerFuncP()
                }}>
                  {display}{"    "}{props.navNameP}<SwapVertIcon style={diswidth===true?style1:style2}   />
                </Link>
            </li>
       </ul>
    )
}
export default SubLinkForFiller
