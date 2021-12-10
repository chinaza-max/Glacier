import { Link } from "react-router-dom";
import {ArrowBackIcon} from "../materialUI/icons"


function SettingsNav(props) {
  
    function  goBack(){
        props.history.goBack()
    }
    
    
        return (
               <div>
              
                  <ul className="navSetting" style={{backgroundColor: "black"}}>
                        <li className="nav-item">
                          <div className="nav-link active" onClick={goBack} style={{color: "white"}}>
                          <ArrowBackIcon style={{fontSize: 50 + 'px',paddingTop: 20 + 'px',position:"absolute",left:-2+"px"}}/>
                          </div>
                        </li>
                        <ul id="nav__setting" >
                            {props.idP===""?" ":
                              <li>
                              <Link  className="nav__setting__link" to={`/home/${props.idP}/dashboard`}>Dashboard</Link>
                              </li>
                            }
                            <li>
                                <Link  className="nav__setting__link"  id="nav__setting__about" to={"#"}>About</Link>
                            </li>
                        </ul>
                        
                  </ul>
               </div>
        )
        
    }
    
    export default SettingsNav;