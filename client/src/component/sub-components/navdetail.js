import React from "react";
import {useParams } from "react-router-dom";                                                                                                                


function NavDetail(props){
  let id=useParams()
 
  function  goBack(){
      props.history.goBack()
  }
  function  setting(){
    props.history.push("/settings/"+id)
  }
        return(
            <ul className="nav justify-content-center" style={{backgroundColor: "black",position:"fixed",width:"100vw"}}>
              <li className="nav-item">
                <div className="nav-link active detailBack" onClick={goBack} style={{color: "white"}}>Back</div>
              </li>
            </ul>
        )
    }

export default NavDetail;          