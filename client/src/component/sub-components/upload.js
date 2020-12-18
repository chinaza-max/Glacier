import React from "react";
import Uploadnav from "./upload-component/upload-nav"
import UploadBody from "./upload-component/uploadbody"
//import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"




class Upload extends React.Component{


    render(){
        return(
            <div>
             <Uploadnav/>
             <UploadBody/>
            </div> 
        )
    }
}

export default Upload;          