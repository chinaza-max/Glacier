import React from "react";
import {Route } from "react-router-dom";
import Nav from "./sub-components/nav";
import Slide from "./sub-components/slide";
import Body from "../component/body";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"


class Home extends React.Component{
constructor({match}){
    super()
    this.filterTextFun=this.filterTextFun.bind(this)
    this.state={filteredText:''}
    this.match=match
}
    filterTextFun(value){
      
        this.setState({filteredText:value})
    }
    
    render(){
        let id=this.match.url.slice(6);
    return(
        <div className='firstBody'>
          <Nav userId={id} filterTextFunP={this.filterTextFun} />
          <Slide/>
          <Body  id={id} searchString={this.state.filteredText}/>
        </div> 
    )
    }
}
export default Home;          