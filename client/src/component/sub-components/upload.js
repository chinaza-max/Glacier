import React from "react";
import Uploadnav from "./upload-component/upload-nav"
import UploadBody from "./upload-component/uploadbody"
import Footer from "../sub-components/footer"
import "../../style/footer2.css"
//import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"




class Upload extends React.Component{
constructor({match}){
    super()
    this.match=match
}

    render(){
        let id=this.match.url.slice(8)
        console.log(id)
        return(
           <div>
                <div className="uploadContainer">
                    <Uploadnav/>
                    <UploadBody  id={id}/>
                 </div> 
                 <Footer/>
           </div>
        )
    }
}

export default Upload;          