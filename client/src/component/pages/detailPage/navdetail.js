import React from "react";
import {useNavigate} from "react-router-dom";                                                                                                                
import {ArrowBackIcon} from "../../materialUI/icons"


function NavDetail(){
  const navigate=useNavigate()

  function  goBack(){
      navigate(-1)
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