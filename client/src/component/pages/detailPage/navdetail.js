import React from "react";
import {useParams } from "react-router-dom";                                                                                                                
import {ArrowBackIcon} from "../../materialUI/icons"


function NavDetail(props){
  let id=useParams()
 
  function  goBack(){
      props.history.goBack()
  }

        return(
            <ul className="detailNav" style={{backgroundColor: "black",position:"fixed",width:"100vw"}}>
              <li className="detailNavItem">
                <span className="detailNavItemBack" onClick={goBack} style={{color: "white"}}><ArrowBackIcon style={{fontSize:'40px',paddingTop:'10px'}}/></span>
              </li>
            </ul>
        )
    }

export default NavDetail;          