import React from "react";
import {useParams } from "react-router-dom";
import Uploadnav from "./sub-components/setingsNav"
import UploadBody2 from "../component/uploadBody2"  
import "../style/footer3.css"
//import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"


function UploadPDF(props){
    const {id}=useParams();
    return(
        <div>
             <div className="uploadContainer">
                 <Uploadnav history={props.history} idP={id}/>
                 <UploadBody2  id={id}/>
              </div> 
        </div>
     )
}

export default UploadPDF