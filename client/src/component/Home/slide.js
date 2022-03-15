import React from "react";
import img1 from "../sub-components/img/text-book.jpg"
import img2 from "../sub-components/img/lodge.jpg"
import img3 from "../sub-components/img/text-book2.jpg"
import "../../style/slide.css";
//import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class Slide extends React.Component{
constructor(props){
    super(props)
    this.filterTextFun=this.filterTextFun.bind(this)
    this.state={filteredText:''}
}
filterTextFun(value){
    this.setState({filteredText:value})
}
    render(){
    return(
        <div>
            <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src={img1} className="d-block w-100" alt="..."/>
                    <div className="carousel-caption  d-md-block">
                        <h5>We have collections of reusable text </h5>
                        <p>Search for text book from our collection.</p>
                    </div>
                    </div>
                    <div className="carousel-item">
                    <img src={img2} className="d-block w-100" alt="..."/>
                    <div className="carousel-caption d-md-block">
                        <h5>Get Accomodation</h5>
                        <p>Available accommodation around enugu and Nssuka.</p>
                    </div>
                    </div>
                    <div className="carousel-item">
                    <img src={img3} className="d-block w-100" alt="..."/>
                    <div className="carousel-caption  d-md-block">
                        <h5>Resale your text book</h5>
                        <p>Sale your text book half the prize.</p>
                    </div>
                    </div>
                </div>
                <a className="carousel-control-prev controls" href="#carouselExampleCaptions" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next controls" href="#carouselExampleCaptions" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
    }
}
export default Slide;          