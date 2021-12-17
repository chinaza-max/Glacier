import React from "react";
import Uploadnav from "../reUse/setingsNav"
import UploadBodyBook from "./UploadBodyBook"
import {useParams} from "react-router-dom";
//import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

function  UploadBook(props){
        let {id}=useParams()

        return(
           <div>
                <div className="uploadContainer">
                    <Uploadnav history={props.history} idP={id}/>
                    <UploadBodyBook  id={id}/>
                 </div> 
           </div>
        )
}
export default UploadBook;          