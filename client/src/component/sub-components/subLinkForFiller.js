import { Link } from 'react-scroll';


function SubLinkForFiller(props){
    return(
        <li className="nav-item" >
        <Link className="nav-link" to="filler"  spy={true} smooth={true} offset={50} duration={500} style={{color:"white"}} onClick={props.fillerFuncP}>Filler</Link>
        </li>
    )
}
export default SubLinkForFiller