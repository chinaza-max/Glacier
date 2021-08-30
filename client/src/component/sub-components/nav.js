import React from "react";
import { Link } from "react-router-dom";
import "../../style/nav.css"
import SubLinkForFiller from  "../sub-components/subLinkForFiller";                                                                                                                                      

class  Nav extends React.Component{
    constructor(props){
        super(props)
        this.filterTextHolder=this.filterTextHolder.bind(this)
        this.fillerFunc=this.fillerFunc.bind(this)
        this.toggle=this.toggle.bind(this)
        this.state={name:'',tel:"",navName:"Filler"}
        this.id=props.userId
    }

    filterTextHolder(e){
        this.props.filterTextFunP(e.target.value)
    }
    fillerFunc(){
    
        if(this.state.navName==='Filler'){
                this.props.mainFillerFuncP('Book')
                this.setState({navName:"Book"})
        }
        else{
            this.props.mainFillerFuncP('Filler')
            this.setState({navName:"Filler"})
        }
    }
    toggle(){
        let element=document.getElementById("small-siz-naz")
        element.classList.toggle("toggle")
    }
    toggle2(){
        let element=document.getElementById("dropDown")
        element.classList.toggle("toggle1")
    }

componentDidMount(){
        document.getElementById("menu_position").addEventListener("click",this.toggle)
        document.getElementById("menu_position4").addEventListener("click",this.toggle)
        
        
        if(this.id){
            document.getElementById("upload2").addEventListener("click",this.toggle2)
        const init=async ()=>{
            const  response= fetch("/names/"+this.id)
            let body=await response.then(res=>res.json())
            if(body.express==="redirect"){
              this.props.history.push("/signup")
            }

            else{
                this.setState({name:body.express,tel:body.express2})
            }
            
        };  
        init()
       }
            
}
componentWillUnmount(){
   /* document.getElementById("menu_position").removeEventListener("click",this.toggle)
    document.getElementById("menu_position4").removeEventListener("click",this.toggle)
    document.getElementById("upload2").removeEventListener("click",this.toggle2)*/

}
    render(){
        return(
            <div>
            <nav className="navbar" style={{backgroundColor:"white",position: "fixed", width: "100%"}}>              
                <div className="navContainer third">
                    <div className="navContent">
                        <input  onChange={this.filterTextHolder} className="form-control1 mr-sm-2" type="search" placeholder="Search"/>
                    </div>
                    {this.props.userId ? 
                    <div className="navContent">
                          <form  action="/logout?_method=DELETE" method="POST">
                                <button className="logout"  style={{textDecoration:"none"}}>logout</button>
                          </form>
                    </div>:
                        <div>    
                              <div className="navContent">
                                    <a className="login" href="/login" style={{color:"black",textDecoration:"none"}}>login</a>
                              </div>
                              <div className="navContent">
                                    <a className="signup" href="/signup" style={{color:"black",textDecoration:"none"}}>signup</a>
                              </div>
                        </div>
                    }
                  
                    
                </div>
               <div className="navbarSubContainer">
                    <div className="navContainer-sz">
                        <div className="navContainer first" style={{color:"black"}}>logo</div>
                        <div className="search"> <input onChange={this.filterTextHolder} className="form-control2 mr-sm-2" type="search" placeholder="Search ......"/></div>
                        <div className="menu">
                            <div id="menu_position" >
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className="navContainer second">
                        <div className="navContent resize active">Home</div>
                        { this.props.userId ?
                            <div className="navContent resize" id="upload">Upload
                                <ul id="navContent_upLoad_sub">
                                    <li>  
                                        <Link className="remove_linkStyle pdID"  style={{color:"white"}}  to={`/home/${this.props.userId}/uploadPDF`}>
                                            PDF
                                        </Link>  
                                    </li>
                                    <li> 
                                        <Link className="remove_linkStyle pdID" id="bookID" style={{color:"white"}}  to={`/home/${this.props.userId}/upload`}>
                                            Book
                                        </Link>  
                                    </li>
                                    <li>
                                    <Link style={{color:"white"}} id="NotificationID" className="pdID" to={`/home/${this.props.userId}/Accomodation_UploadRequest`}>
                                        Notification
                                    </Link>  
                                    </li>
                                    <li> 
                                        <Link className="remove_linkStyle pdID" id="AccomodationID"  style={{color:"white"}}  to={`/home/${this.props.userId}/Accomodation_Upload`}>
                                            Accomodation
                                        </Link> 
                                    </li>
                                </ul>
                            </div>
                            :""
                        }
                        <div className="navContent resize">
                            <SubLinkForFiller fillerFuncP={this.fillerFunc} navName={this.state.navName}/>
                        </div>
                        <div className="navContent resize">
                            <Link className="nav-link" to={`/home/${this.props.userId}/Accomodation/`}>
                                Accomodation
                            </Link>  
                        </div>
                        {   this.props.userId?
                             <div className="navContent resize">
                                <Link className="remove_linkStyle navContent"  to={`/home/${this.props.userId}/dashboard`}>
                                    Dashboard
                                </Link>
                             </div>
                             :""

                        }
                       
                        <div className="navContent resize">
                            <Link id="NotificationView" className="navContent" to={`/home/${this.props.userId}/notification`}>
                                Notification
                            </Link> 
                        </div>
                        {this.state.tel===8184724615 ? 
                            <div className="navContent resize">
                                <Link className="remove_linkStyle navContent"     to={`/home/${this.props.userId}/Setting`}>
                                    Setting
                                </Link>  
                            </div>
                            :
                            ""
                        }
                  
                        <div className="navContent resize">About</div>
                        <div className="navContent name resize" style={{color:"black"}}>chinaza</div>
                    </div>
                </div>

               
            </nav> 
                  <div id="small-siz-naz" className="pre_toggle">
                        <div className="menu_position2">
                            <div className="menu_position3" id="menu_position4">
                                    <div id="bar1"></div>     
                                    <div id="bar3"></div>
                            </div>
                        </div>


                        
                        {this.props.userId ?
                             <div className="navContent">
                                    <form  action="/logout?_method=DELETE" method="POST">
                                        <button className="logout2"  style={{textDecoration:"none"}}>logout</button>
                                    </form>
                             </div>
                             : 
                            
                            <div>
                                <div className="navContent">signUp</div>
                                <div className="navContent">login</div>
                            </div>
                             }
                       
                        {this.props.userId?
                            <div className="navContent" id="upload2">Upload
                                <ul id="dropDown" className="dropDown_class">
                                    <li> 
                                        <Link className="remove_linkStyle" style={{color:"white"}}  to={`/home/${this.props.userId}/uploadPDF`}>
                                            PDF
                                        </Link>  
                                    </li>
                                    <li> 
                                        <Link className="remove_linkStyle" style={{color:"white"}}  to={`/home/${this.props.userId}/upload`}>
                                            Book
                                        </Link>  
                                    </li>
                                    <li style={{color:"white"}}>
                                        <Link className="remove_linkStyle" style={{color:"white"}}  to={`/home/${this.props.userId}/Accomodation_UploadRequest`}>
                                            Notification
                                        </Link> 
                                      </li>
                                    <li id="dropDown_accomodation"> 
                                        <Link className="remove_linkStyle" style={{color:"white"}}  to={`/home/${this.props.userId}/Accomodation_Upload`}>
                                            Accomodation
                                        </Link> 
                                    </li>
                                </ul>
                            </div>
                        :
                            ""
                        }
                        <div className="navContent filler2">
                            <SubLinkForFiller fillerFuncP={this.fillerFunc} navName={this.state.navName}/>
                        </div>
                        <div className="navContent navphone">
                            <Link className="nav-link" to={`/home/${this.props.userId}/Accomodation/`}>
                                Accomodation
                            </Link> 
                        </div>
                        {this.props.userId?
                            <div className="navContent navphone">
                                 <Link   className="nav-link" style={{color:"white"}} to={`/home/${this.props.userId}/Dashboard/`}>
                                    Dashboard
                                </Link>
                            </div>
                            :
                            ""
                        }
                        
                        <div className="navContent navphone">
                            <Link className="nav-link" to={`/home/${this.props.userId}/notification`}> Notification</Link>
                        </div>
                        {this.state.tel===8184724615 ? 
                            
                        <div className="navContent navphone">
                            <Link className="nav-link"     to={`/home/${this.props.userId}/Setting`}>
                                Setting
                            </Link>
                        </div>
                        :
                        ''
                        }
                       
                        <div className="navContent">About</div>
                    
                    </div>
            </div>
        )
    }
}
export default Nav;          


/*
  <div>
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "black",position: "fixed", width: "100%"}}>
                    <a className="navbar-brand" href="/" style={{color:"white"}}>Bright Mind</a>
                    <button className="navbar-toggler" type="button"   data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"   style={{backgroundColor:"white"}}></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <div className="nav-link" onClick={this.handleHistory} style={{color:"white"}}>Home <span className="sr-only">(current)</span></div>
                        </li>
                        {this.props.userId ?
                                    ''
                                    :
                                 <li className="nav-item">
                                 <a className="nav-link" href="/"  style={{color:"white"}}> Register</a>
                                 </li>
                        }
                        <li className="nav-item" >
                            <Link style={{color:"white"}} className="nav-link" to={`/home/${this.props.userId}/upload`}>
                                upload
                            </Link>     
                        </li>
                        {
                            this.props.userId ?
                            <li className="nav-item" >
                                <Link style={{color:"white"}} className="nav-link" to={`/home/${this.props.userId}/Accomodation_Upload`}>
                                    Upload-accomodation
                                </Link>     
                             </li>
                            :""
                        }
                       
                        {
                            this.state.tel===8184724615 ? 
                            
                                <li className="nav-item" >
                                    <Link style={{color:"white"}} className="nav-link" to={`/home/${this.props.userId}/uploadPDF`}>
                                        uploadPDF
                                    </Link>     
                                </li>  
                                
                        :
                         ' '
                        }
                           <SubLinkForFiller fillerFuncP={this.fillerFunc} navName={this.state.navName}/>
                           <li className="nav-item">
                                <Link style={{color:"white"}} className="nav-link" to={`/home/${this.props.userId}/Accomodation/`}>
                                    Accomodation
                                </Link>  
                            </li>
                        
                       {
                       this.props.userId?
                            <li className="nav-item">
                                <Link style={{color:"white"}} className="nav-link" to={`/home/${this.props.userId}/Dashboard/`}>
                                    Dashboard
                                </Link>  
                            </li>
                       :''
                       }

                        <li className="nav-item">
                            <Link style={{color:"white"}} className="nav-link" to={`/home/${this.props.userId}/notification`}>
                                Notification
                            </Link>  
                        </li>
                       {
                        this.state.tel===8184724615 ? 
                        <li className="nav-item">
                            <Link style={{color:"white"}} className="nav-link" to={`/home/${this.props.userId}/Setting`}>
                                Setting
                            </Link>  
                        </li>
                        :''
                       }
                           <li className="nav-item" >
                            <a className="nav-link" href="/" style={{color:"white"}}>About</a>
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
              </div>*/
