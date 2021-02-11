import React from "react";
//import {Route } from "react-router-dom";
import Nav from "./sub-components/nav";
import Slide from "./sub-components/slide";
import Body from "../component/body";
import Footer from "../component/sub-components/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../style/firstbody.css"

class Home extends React.Component{
constructor({match}){
    super()
    this.filterTextFun=this.filterTextFun.bind(this)
    this.mainFillerFunc=this.mainFillerFunc.bind(this)
    this.state={filteredText:'',view:'Filler'}
    this.match=match
}
    filterTextFun(value){
        this.setState({filteredText:value})
    }
    mainFillerFunc(value){
        this.setState({view:value})
    }
    render(){
        let id=this.match.url.slice(6);
        return(
            <div className='firstBody'>
                <Nav userId={id} filterTextFunP={this.filterTextFun} mainFillerFuncP={this.mainFillerFunc} history={this.props.history} />
                <Slide/>
                <Body  id={id} searchString={this.state.filteredText} viewP={this.state.view}/>
                <Footer/>
            </div> 
        )
    }
}
export default Home;          