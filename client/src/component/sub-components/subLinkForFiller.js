import { Link } from 'react-scroll';
import BookIcon from '@material-ui/icons/Book';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

function SubLinkForFiller(props){

    let display=props.navName==="Filler"? <span className="iconDestop"><PictureAsPdfIcon/></span> :<span className="iconDestop"><BookIcon/> </span>
    return(
       <ul style={{listStyle:'none'}}>
            <li>
                <Link className="filler-link"  to="filler" style={{textDecoration:"none"}} spy={true} smooth={true} offset={50} duration={500} onClick={props.fillerFuncP}>
                  {display}{"    "}{props.navName}
                </Link>
            </li>
       </ul>
    )
}
export default SubLinkForFiller
