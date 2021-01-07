import React from "react";
import { Link } from "react-router-dom";

import "../../style/nav.css"
                                                                                                                                        

class Nav extends React.Component{
constructor(props){
    super(props)
    this.filterTextHolder=this.filterTextHolder.bind(this)
    this.fillerFunc=this.fillerFunc.bind(this)
    this.state={name:''}
    this.id=props.userId
}

filterTextHolder(e){
    this.props.filterTextFunP(e.target.value)
}
fillerFunc(){
   this.props.mainFillerFuncP('yes')
}

componentDidMount(){
       
        const init=async ()=>{
        const  response= fetch("/names/"+this.id)
        let body=await response.then(res=>res.json())
            
            this.setState({name:body.express})
        }
        init()
            
}

    render(){


    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "black",position: "fixed", width: "100%"}}>
                    <a className="navbar-brand" href="/" style={{color:"white"}}>Bright Mind</a>
                    <button className="navbar-toggler" type="button"   data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"   style={{backgroundColor:"white"}}></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="/"  style={{color:"white"}}>Home <span className="sr-only">(current)</span></a>
                        </li>
                        {this.props.userId ?
                                    ''
                                    :
                                 <li className="nav-item">
                                 <a className="nav-link" href="/"  style={{color:"white"}}> Register</a>
                                 </li>
                        }
                        <li className="nav-item" >
                            <Link style={{color:"white"}} className="nav-link" to={`/upload/${this.props.userId}`}>
                                upload
                            </Link>     
                        </li>
                        {
                            this.props.userId==="5fe33901fa281858e040aafc" ? 
                            <li className="nav-item" >
                                <Link style={{color:"white"}} className="nav-link" to={`/uploadPDF/${this.props.userId}`}>
                                    uploadPDF
                                </Link>     
                             </li>  
                        :
                         ' '
                        }
                        <li className="nav-item" >
                            <a className="nav-link" href="/" style={{color:"white"}}>About</a>
                        </li>
                        <li className="nav-item" >
                            <span className="nav-link" style={{color:"white"}} onClick={this.fillerFunc}>Filler</span>
                        </li>
                        <li className="nav-item">
                        
                            <Link style={{color:"white"}} className="nav-link" to={`/settings/${this.props.userId}`}>
                                settings
                            </Link>  
                        </li>
                        <li className="nav-item" >
                            <span className="nav-link" style={{color:"white"}}>{this.state.name}</span>
                        </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0" action="/logout?_method=DELETE" method="POST">
                            {this.props.userId ? 
                                <li className="nav-item">
                                    <button className="logout"  style={{textDecoration:"none"}}>logout</button>
                                </li>
                            :
                            <div className="registerContainer">
                                <li className="nav-item">
                                    <a className="signup" href="/login" style={{color:"white",textDecoration:"none"}}>login</a>
                                </li>
                                <li className="nav-item" >
                                     <a className="signup" href="/signup" style={{color:"white",textDecoration:"none"}}>signup</a>
                                </li>
                            </div>
                            }
                        <input  onChange={this.filterTextHolder} className="form-control mr-sm-2" type="search" placeholder="Search"/>
                        </form>
                    </div>
                    </nav>  
              </div>
    )
    }
}
export default Nav;          
