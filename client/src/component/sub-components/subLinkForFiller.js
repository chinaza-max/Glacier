import { Link } from 'react-scroll';


function SubLinkForFiller(props){
    return(
       <ul style={{listStyle:'none'}}>
            <li>
                <Link className="filler-link"  to="filler" style={{textDecoration:"none"}} spy={true} smooth={true} offset={50} duration={500} onClick={props.fillerFuncP}>{props.navName}</Link>
            </li>
       </ul>
    )
}
export default SubLinkForFiller


/*
import { Link } from 'react-scroll';


function SubLinkForFiller(props){
    return(
        <li className="nav-item" >
        <Link className="nav-link" to="filler"  spy={true} smooth={true} offset={50} duration={500} style={{color:"white"}} onClick={props.fillerFuncP}>{props.navName}</Link>
        </li>
    )
}
export default SubLinkForFiller*/