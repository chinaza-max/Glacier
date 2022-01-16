import React from "react";
import {useEffect ,useState, useRef} from 'react';
import { Link,useNavigate} from "react-router-dom";
import "../../style/nav.css";
import SubLinkForFiller from  "../PDF_Filler/subLinkForFiller";                                                                                                                                
import HomeIcon from '@material-ui/icons/Home';
import BackupIcon from '@material-ui/icons/Backup';
import HotelIcon from '@material-ui/icons/Hotel';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {BadgeMax} from '../materialUI/icons';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import PersonIcon from '@material-ui/icons/Person';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import axios from 'axios';
import Swal from 'sweetalert2';




function Nav(props){
    const [userInfo,setUserInfo]=useState({name:'',tel:"",navName:"Filler"});      
    const navigate=useNavigate()
    const id=props.userId
    const node=useRef(null)

    
    function isLogedIn(){
           
        if(window.localStorage.getItem("isAuthenticated")==="true"){
            return
        }
        else{
            navigate("/login")
        }
    }
    function validateTel(value){
         const number=/^[0-9]+$/
       if(value){
             if(!value.match(number)){
        
                 return "numeric character only Re-enter no"
             }
             else if(value.length<11){
                 return "incomplete number Re-enter no";
             }
             else if(value.length>11){
                 return "exceded limit Re-enter no";
             }
             else{
                 return true;
             }
       }
       else{
           return "Enter your phone number to complete your registration"
       }
    }
    function Logout(){
         window.localStorage.setItem('isAuthenticated',false)
         window.localStorage.setItem('id','')
    } 
    function filterTextHolder(e){
        props.filterTextFunP(e.target.value)
    }
    function fillerFunc(){
         if(props.navNameP==='Filler'){
                // this.props.mainFillerFuncP('Book')
                props.updateNavNameP("Book")
         }
         else{
            //this.props.mainFillerFuncP('Filler')
            props.updateNavNameP("Filler")
         }
    }
    function toggle(){
         let element=document.getElementById("small-siz-naz")
         element.classList.toggle("toggle");
     
    }
    function toggle2(){
         let element=document.getElementById("dropDown")
         element.classList.toggle("toggle1")
    }
    function handleClick(e){
         if(node.current){
            if(node.current.contains(e.target)===false){
                let element=document.getElementById("small-siz-naz")
                element.classList.remove("toggle");
            }
        }
    }




    useEffect(()=>{
        let menu_position=document.getElementById("menu_position")
        let menu_position4= document.getElementById("menu_position4")
        let upload2= document.getElementById("upload2")
    
        document.addEventListener("mousedown",handleClick)
        menu_position.addEventListener("click",toggle)
        menu_position4.addEventListener("click",toggle)
      
        if(upload2){
            upload2.addEventListener("click",toggle2)
        }
       


        
        if(id){
            //for login 
            window.localStorage.setItem('id',id)
            window.localStorage.setItem('isAuthenticated',true)
           

        const init=async ()=>{
            const  response= fetch("/names/"+id)
            let body=await response.then(res=>res.json())
        
            if(body.express==="redirect"){
                window.localStorage.setItem('isAuthenticated',false)
                window.localStorage.setItem('id','')
                navigate("/signup")
            }
            else{
               
                setUserInfo({name:body.express,tel:body.express2})
                const formData=new FormData();
                if(body.express2===""){
                    let tel= window.prompt("Enter your phone number to complete your registration")
                   while (userInfo.tel===""){
                        if(validateTel(tel)===true){
                            setUserInfo({tel:tel})
                        }
                        else{
                            tel=window.prompt(validateTel(tel))
                        }
                        
                   }
                   formData.append('tel',userInfo.tel);
                        axios.post('/updateTel/'+id,formData,{
                            headers:{
                                'Content-Type':'multipart/form-data'
                            }
                        })
                        .then((res)=>{
                            if(res.data.express==="successfully updated"){
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title:res.data.express,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                            else{
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: res.data.express,
                                })
                            }
                           
                        }) 
                        .catch((error)=>{
                            console.log(error.response.data.express)
                        }); 
                }
            }
        }
        init()
       }

       return  ()=> {
            menu_position.removeEventListener('click',toggle);
            menu_position4.removeEventListener("click",toggle)
            document.removeEventListener("mousedown",handleClick)
            if(upload2){
                upload2.removeEventListener("click",toggle2)
            }
       
        }
    },[id,userInfo.tel,navigate])

    return(
        <div>
        <nav className="navbar" style={{backgroundColor:"white",position: "fixed", width: "100%"}}>              
            <div className="navContainer third">
                <div className="navContent">
                    <input  onChange={filterTextHolder} className="form-control1 mr-sm-2" type="search" placeholder="Search"/>
                </div>
                {id ? 
                <div className="navContent">
                            <Link className="logout" to="/login" onClick={()=>Logout()}   style={{textDecoration:"none"}}>logout</Link>
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
                    <div className="navContainer first" style={{color:"black"}}>GLAC</div>
                    <div className="search"> <input onChange={filterTextHolder} className="form-control2 mr-sm-2" type="search" placeholder="Search ......"/></div>
                    <div className="menu"  ref={node}>
                        <div id="menu_position">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div className="navContainer second">
                    <div className="navContent resize active"><span className="iconDestop"><HomeIcon/></span> Home </div>
                    { id ?
                        <div className="navContent resize" id="upload">
                            
                            <span  className="iconDestop"><BackupIcon/></span> Upload <span  className="iconDestop"><ArrowDropDownIcon/></span>
                            <ul id="navContent_upLoad_sub">
                                {userInfo.tel===8184724715?
                                     <li>  
                                     <Link className="remove_linkStyle pdID"  style={{color:"white"}}  to={`/home/${id}/uploadPDF`}>
                                         PDF
                                     </Link>  
                                    </li>
                                :""}
                               
                                <li> 
                                    <Link className="remove_linkStyle pdID" id="bookID" style={{color:"white"}}  to={`/home/${id}/uploadBook`}>
                                        Book
                                    </Link>  
                                </li>
                                <li>
                                <Link style={{color:"white"}} id="NotificationID" className="pdID" to={`/home/${id}/Accomodation_UploadRequest`}>
                                    Notification
                                </Link>  
                                </li>
                                <li> 
                                    <Link className="remove_linkStyle pdID" id="AccomodationID"  style={{color:"white"}}  to={`/home/${id}/Accomodation_Upload`}>
                                        Accomodation
                                    </Link> 
                                </li>
                            </ul>
                        </div>
                        :""
                    }

                    <div className="navContent resize">
                        <SubLinkForFiller fillerFuncP={fillerFunc} navNameP={props.navNameP} isLogedInP={isLogedIn}/>
                    </div>
                    <div className="navContent resize" onClick={isLogedIn}>
                        <Link className="nav-link navContent" to={`/home/${id}/Accomodation/`} >
                            <span className="iconDestop"><HotelIcon/></span>Accomodation
                        </Link>  
                    </div>
                    {   id?
                         <div className="navContent resize">
                            <Link className="remove_linkStyle navContent"  to={`/home/${id}/dashboard`}>
                                <span className="iconDestop"><DashboardIcon/></span>Dashboard
                            </Link>
                         </div>
                         :""

                    }
                   
                    <div className="navContent resize" onClick={isLogedIn}>
                        <Link id="NotificationView" className="navContent" to={`/home/${id}/notification`}>
                            <span className="iconDestop"><BadgeMax/></span> Notification
                        </Link> 
                    </div>
                    {userInfo.tel===8184724615 ? 
                        <div className="navContent resize">
                            <Link className="remove_linkStyle navContent"     to={`/home/${id}/Setting`}>
                                <span className="iconDestop"><SettingsApplicationsIcon/></span> Setting
                            </Link>  
                        </div>
                        :
                        ""
                    }
              
                    <div className="navContent resize" >
            
                        {id?
                            <Link className="remove_linkStyle navContent"     to={`/home/${id}/profile`}>
                                <span className="iconDestop"><PersonIcon/></span> About
                            </Link>  
                        :
                            <Link className="remove_linkStyle navContent"     to={`/home/profile`}>
                                <span className="iconDestop"><PersonIcon/></span> About
                            </Link>  
                        }

                    </div>


                    <div className="navContent name resize" style={{color:"black"}}>{userInfo.name}</div>
                </div>
            </div>

           
























           
        </nav> 
              <div id="small-siz-naz" className="pre_toggle" ref={node}>
                    <div className="menu_position2">
                        <div className="menu_position3" id="menu_position4">
                                <div id="bar1"></div>     
                                <div id="bar3"></div>
                        </div>
                    </div>


                    
                    {id ?
                         <div className="navContent">
                             
                                <form  action="/login">
                                    <button className="logout2"  style={{textDecoration:"none"}} onClick={()=>Logout()}>logout</button>
                                </form>
                         </div>
                         : 
                        
                        <div>
                            <div className="navContent">
                                <a className="signupMobile" href="/signup" style={{textDecoration:"none"}}>signup</a>
                            </div>
                            <div className="navContent">
                                <a className="loginMobile" href="/login" style={{textDecoration:"none"}}>login</a>
                            </div>
                        </div>
                         }
                   
                    {id?
                        <div className="navContent" id="upload2">
                             <span className="iconMobile"><BackupIcon/></span>Upload
                             <span  className="iconMobileDropDown"><ArrowDropDownIcon/></span>
                            <ul id="dropDown" className="dropDown_class">
                                {userInfo.tel===8184724715?
                                        <li>  
                                        <Link className="remove_linkStyle pdID"  style={{color:"white"}}  to={`/home/${id}/uploadPDF`}>
                                            PDF
                                        </Link>  
                                        </li>
                                    :""}
                                <li> 
                                    <Link className="remove_linkStyle"   to={`/home/${id}/uploadBook`}>
                                        Book
                                    </Link>  
                                </li>
                                <li style={{color:"white"}}>
                                    <Link className="remove_linkStyle"   to={`/home/${id}/Accomodation_UploadRequest`}>
                                        Notifica
                                    </Link> 
                                  </li>
                                <li id="dropDown_accomodation"> 
                                    <Link className="remove_linkStyle"   to={`/home/${id}/Accomodation_Upload`}>
                                        Accomo
                                    </Link> 
                                </li>
                            </ul>
                        </div>
                    :
                        ""
                    }
                    <div className="navContent filler2">
                        <SubLinkForFiller fillerFuncP={fillerFunc} navNameP={props.navNameP}   isLogedInP={isLogedIn}/>
                    </div>
                    <div className="navContent navphone" onClick={isLogedIn}>
                        <Link className="nav-link" to={`/home/${id}/Accomodation`}>
                            <span className="iconMobile"><HotelIcon/></span>Accomodation
                        </Link> 
                    </div>
                    {id?
                        <div className="navContent navphone">
                             <Link   className="nav-link"  to={`/home/${id}/Dashboard/`}>
                                <span className="iconMobile"><DashboardIcon/></span> Dashboard
                            </Link>
                        </div>
                        :
                        ""
                    }
                    
                    <div className="navContent navphone" onClick={isLogedIn}>
                        <Link className="nav-link" to={`/home/${id}/notification`}> 
                            <span className="iconMobile"><BadgeMax/></span>  Notification
                        </Link>
                    </div>
                    {userInfo.tel===8184724615 ? 
                        
                    <div className="navContent navphone">
                        <Link className="nav-link" to={`/home/${id}/Setting`}>
                            <span className="iconMobile"><SettingsApplicationsIcon/></span> Setting
                        </Link>
                    </div>
                    :
                    ''
                    }
                   
                    <div className="navContent last" >
                        <span className="iconMobile"><PersonIcon/></span> About
                    </div>
                
                </div>
        </div>
    )
}

export default Nav;  

/*
class  Nav extends React.Component{
    constructor(props){
        super(props)
        this.filterTextHolder=this.filterTextHolder.bind(this)
        this.fillerFunc=this.fillerFunc.bind(this)
        this.toggle=this.toggle.bind(this)
        this.handleClick= this.handleClick.bind(this)
        this.Logout=this.Logout.bind(this)
        this.validateTel=this.validateTel.bind(this)
        this.isLogedIn=this.isLogedIn.bind(this)
        this.state={name:'',tel:"",navName:"Filler"}
        this.id=props.userId
        this.node=React.createRef()
    }
    isLogedIn(){
       console.log( window.localStorage.getItem('isAuthenticated'))
       if(window.localStorage.getItem('isAuthenticated')==="true"){
            return
       }
       else{
        this.props.history.push("/login")
       }

    }
    validateTel(value){
        const number=/^[0-9]+$/
      if(value){
            if(!value.match(number)){
                console.log("typeof value")
                return "numeric character only Re-enter no"
            }
            else if(value.length<11){
                return "incomplete number Re-enter no";
            }
            else if(value.length>11){
                return "exceded limit Re-enter no";
            }
            else{
                return true;
            }
      }
      else{
          return "Enter your phone number to complete your registration"
      }
    }
    Logout(){
        window.localStorage.setItem('isAuthenticated',false)
        window.localStorage.setItem('id','')
    } 
    filterTextHolder(e){
        this.props.filterTextFunP(e.target.value)
    }
    fillerFunc(){
        if(this.props.navNameP==='Filler'){
               // this.props.mainFillerFuncP('Book')
                this.props.updateNavNameP("Book")
        }
        else{
           //this.props.mainFillerFuncP('Filler')
            this.props.updateNavNameP("Filler")
        }
    }
    toggle(){
        let element=document.getElementById("small-siz-naz")
        element.classList.toggle("toggle");
    
    }
    toggle2(){
        let element=document.getElementById("dropDown")
        element.classList.toggle("toggle1")
    }
    handleClick(e){
        if(this.node.current.contains(e.target)===false){
                let element=document.getElementById("small-siz-naz")
                element.classList.remove("toggle");
        }
}
componentDidMount(){
        document.getElementById("menu_position").addEventListener("click",this.toggle)
        document.getElementById("menu_position4").addEventListener("click",this.toggle)
        
        document.addEventListener("mousedown",this.handleClick)
        if(this.id){
            //for login 
            window.localStorage.setItem('id',this.id)
            window.localStorage.setItem('isAuthenticated',true)


            document.getElementById("upload2").addEventListener("click",this.toggle2)

        const init=async ()=>{
            const  response= fetch("/names/"+this.id)
            let body=await response.then(res=>res.json())
            if(body.express==="redirect"){
              this.props.history.push("/signup")
            }
            else{
               
                this.setState({name:body.express,tel:body.express2})
                const formData=new FormData();
                if(body.express2===""){
                    let tel= window.prompt("Enter your phone number to complete your registration")
                   while (this.state.tel===""){
                        if(this.validateTel(tel)===true){
                            this.setState({tel:tel})
                        }
                        else{
                            tel=window.prompt(this.validateTel(tel))
                        }
                        
                   }
                   formData.append('tel',this.state.tel);
                        axios.post('/updateTel/'+this.id,formData,{
                            headers:{
                                'Content-Type':'multipart/form-data'
                            }
                        })
                        .then((res)=>{
                            if(res.data.express==="successfully updated"){
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title:res.data.express,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                            else{
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: res.data.express,
                                })
                            }
                           
                        }) 
                        .catch((error)=>{
                            console.log(error.response.data.express)
                        }); 
                }
            }
        }
        init()
       }
            
}
componentWillUnmount(){
    document.removeEventListener("mousedown",this.handleClick)
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
                                <Link className="logout" to="/login" onClick={()=>this.Logout()}   style={{textDecoration:"none"}}>logout</Link>
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
                        <div className="menu"  ref={this.node}>
                            <div id="menu_position">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className="navContainer second">
                        <div className="navContent resize active"><span className="iconDestop"><HomeIcon/></span> Home </div>
                        { this.props.userId ?
                            <div className="navContent resize" id="upload">
                                
                                <span  className="iconDestop"><BackupIcon/></span> Upload <span  className="iconDestop"><ArrowDropDownIcon/></span>
                                <ul id="navContent_upLoad_sub">
                                    <li>  
                                        <Link className="remove_linkStyle pdID"  style={{color:"white"}}  to={`/home/${this.props.userId}/uploadPDF`}>
                                            PDF
                                        </Link>  
                                    </li>
                                    <li> 
                                        <Link className="remove_linkStyle pdID" id="bookID" style={{color:"white"}}  to={`/home/${this.props.userId}/uploadBook`}>
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
                            <SubLinkForFiller fillerFuncP={this.fillerFunc} navName={this.props.navNameP} isLogedInP={this.isLogedIn}/>
                        </div>
                        <div className="navContent resize" onClick={this.isLogedIn}>
                            <Link className="nav-link navContent" to={`/home/${this.props.userId}/Accomodation/`} >
                                <span className="iconDestop"><HotelIcon/></span>Accomodation
                            </Link>  
                        </div>
                        {   this.props.userId?
                             <div className="navContent resize">
                                <Link className="remove_linkStyle navContent"  to={`/home/${this.props.userId}/dashboard`}>
                                    <span className="iconDestop"><DashboardIcon/></span>Dashboard
                                </Link>
                             </div>
                             :""

                        }
                       
                        <div className="navContent resize" onClick={this.isLogedIn}>
                            <Link id="NotificationView" className="navContent" to={`/home/${this.props.userId}/notification`}>
                                <span className="iconDestop"><BadgeMax/></span> Notification
                            </Link> 
                        </div>
                        {this.state.tel===8184724615 ? 
                            <div className="navContent resize">
                                <Link className="remove_linkStyle navContent"     to={`/home/${this.props.userId}/Setting`}>
                                    <span className="iconDestop"><SettingsApplicationsIcon/></span> Setting
                                </Link>  
                            </div>
                            :
                            ""
                        }
                  
                        <div className="navContent resize" >
                
                            {this.props.userId?
                                <Link className="remove_linkStyle navContent"     to={`/home/${this.props.userId}/profile`}>
                                    <span className="iconDestop"><PersonIcon/></span> About
                                </Link>  
                            :
                                <Link className="remove_linkStyle navContent"     to={`/home/profile`}>
                                    <span className="iconDestop"><PersonIcon/></span> About
                                </Link>  
                            }

                        </div>


                        <div className="navContent name resize" style={{color:"black"}}>{this.state.name}</div>
                    </div>
                </div>

               
            </nav> 
                  <div id="small-siz-naz" className="pre_toggle" ref={this.node}>
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
                                <div className="navContent">
                                    <a className="signupMobile" href="/signup" style={{textDecoration:"none"}}>signup</a>
                                </div>
                                <div className="navContent">
                                    <a className="loginMobile" href="/login" style={{textDecoration:"none"}}>login</a>
                                </div>
                            </div>
                             }
                       
                        {this.props.userId?
                            <div className="navContent" id="upload2">
                                 <span className="iconMobile"><BackupIcon/></span>Upload
                                <ul id="dropDown" className="dropDown_class">
                                    <li> 
                                        <Link className="remove_linkStyle"   to={`/home/${this.props.userId}/uploadPDF`}>
                                            PDF
                                        </Link>  
                                    </li>
                                    <li> 
                                        <Link className="remove_linkStyle"   to={`/home/${this.props.userId}/upload`}>
                                            Book
                                        </Link>  
                                    </li>
                                    <li style={{color:"white"}}>
                                        <Link className="remove_linkStyle"   to={`/home/${this.props.userId}/Accomodation_UploadRequest`}>
                                            Notification
                                        </Link> 
                                      </li>
                                    <li id="dropDown_accomodation"> 
                                        <Link className="remove_linkStyle"   to={`/home/${this.props.userId}/Accomodation_Upload`}>
                                            Accomodation
                                        </Link> 
                                    </li>
                                </ul>
                            </div>
                        :
                            ""
                        }
                        <div className="navContent filler2">
                            <SubLinkForFiller fillerFuncP={this.fillerFunc} navName={this.state.navName}   isLogedInP={this.isLogedIn}/>
                        </div>
                        <div className="navContent navphone" onClick={this.isLogedIn}>
                            <Link className="nav-link" to={`/home/${this.props.userId}/Accomodation/`}>
                                <span className="iconMobile"><HotelIcon/></span>Accomodation
                            </Link> 
                        </div>
                        {this.props.userId?
                            <div className="navContent navphone">
                                 <Link   className="nav-link"  to={`/home/${this.props.userId}/Dashboard/`}>
                                    <span className="iconMobile"><DashboardIcon/></span> Dashboard
                                </Link>
                            </div>
                            :
                            ""
                        }
                        
                        <div className="navContent navphone" onClick={this.isLogedIn}>
                            <Link className="nav-link" to={`/home/${this.props.userId}/notification`}> 
                                <span className="iconMobile"><BadgeMax/></span>  Notification
                            </Link>
                        </div>
                        {this.state.tel===8184724615 ? 
                            
                        <div className="navContent navphone">
                            <Link className="nav-link" to={`/home/${this.props.userId}/Setting`}>
                                <span className="iconMobile"><SettingsApplicationsIcon/></span> Setting
                            </Link>
                        </div>
                        :
                        ''
                        }
                       
                        <div className="navContent last" >
                            <span className="iconMobile"><PersonIcon/></span> About
                        </div>
                    
                    </div>
            </div>
        )
    }
}
export default Nav;          
*/