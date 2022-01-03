import { Link } from 'react-scroll';
import BookIcon from '@material-ui/icons/Book';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import SwapVertIcon from '@mui/icons-material/SwapVert';

function SubLinkForFiller(props){
  
    let display=props.navNameP==="Filler"? <span className="iconDestop"><PictureAsPdfIcon/></span> :<span className="iconDestop"><BookIcon/> </span>
    
    return(
       <ul style={{listStyle:'none'}}>
            <li>
                <Link className="filler-link"  to="filler" style={{textDecoration:"none"}} spy={true} smooth={true} offset={50} duration={500} onClick={()=>{
                  props.isLogedInP();
                  props.fillerFuncP()
                }}>
                  {display}{"    "}{props.navNameP}<SwapVertIcon style={{"position":"absolute","bottom":"20px","right":"-8px"}}/>
                </Link>
            </li>
       </ul>
    )
}
export default SubLinkForFiller
