import React from "react";
import Uploadnav from "./setingsNav"
import UploadBody from "./upload-component/uploadbody"
import {useParams} from "react-router-dom";
//import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"




function  Upload(props){

        let {id}=useParams()
    
        return(
           <div>
                <div className="uploadContainer">
                    <Uploadnav history={props.history} idP={id}/>
                    <UploadBody  id={id}/>
                 </div> 
           </div>
        )
}

export default Upload;          