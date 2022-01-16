import { Link,useNavigate} from "react-router-dom";
import {ArrowBackIcon} from "../materialUI/icons";

function SettingsNav(props) {
    const navigate = useNavigate();
  
    function  goBack(){
        navigate(-1)
    }
   
        return (
               <div>
              
                  <ul className="navSetting" style={{backgroundColor: "black"}}>
                        <li className="nav-item">
                          <div className="nav-link active" onClick={goBack} style={{color: "white",cursor:"pointer"}}>
                          <ArrowBackIcon style={{fontSize: 50 + 'px',paddingTop: 20 + 'px',position:"absolute",left:-2+"px"}}/>
                          </div>
                        </li>
                        <ul id="nav__setting" >
                            {props.idP===""?" ":
                              <li>
                                    <Link  className="nav__setting__link" to={`/home/${props.idP}/dashboard`}>Dashboard</Link>
                              </li>
                            }
                        </ul>
                        
                  </ul> 
               </div>
        )
        
    }
    
    export default SettingsNav;