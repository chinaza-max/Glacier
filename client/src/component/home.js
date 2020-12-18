import React from "react";
//import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Nav from "./sub-components/nav";
import Slide from "./sub-components/slide";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"


class Home extends React.Component{
constructor(){
    super()
    this.filterTextFun=this.filterTextFun.bind(this)
    this.state={filteredText:''}
}
filterTextFun(value){
}
    
    render(){
    return(
        <div>
          <Nav  filterTextFunP={this.filterTextFun} />
          <Slide/>
          
        </div> 
    )
    }
}
/*
<Advert/>
<Content/>
<Filler/>
<Footer/>*/
export default Home;          