import React from "react";
import {useParams,Link } from "react-router-dom";
import Uploadnav from "./sub-components/upload-component/upload-nav"
import UploadBody2 from "../component/uploadBody2"
import Footer from "./sub-components/footer"
import "../style/footer3.css"
//import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"


function UploadPDF(){
    const {id}=useParams();
    return(
        <div>
             <div className="uploadContainer">
                 <Uploadnav/>
                 <UploadBody2  id={id}/>
              </div> 
              <Footer/>
        </div>
     )
}

export default UploadPDF