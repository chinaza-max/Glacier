import React from "react";
import { useNavigate,useParams } from "react-router-dom";
import {useState} from 'react';
import Nav from "./nav";
import Slide from "./slide";
import Body from "./body";
import Footer from "./footer";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../../style/firstbody.css"


function HomeContainer(){
    
    const [HomeAtri,setHomeAtri]=useState({view:'Filler',navName:"Filler"})
    const [filterText,setFilterText]=useState('')
    const navigate=useNavigate()
    const {id}=useParams()
    
    function filterTextFun(value){
        setFilterText(value)
    }
  
    function updateNavName(value){
        setHomeAtri({navName:value,view:value})
    }

    return(
        <div className='firstBody'>
            <Nav  updateNavNameP={updateNavName} navNameP={HomeAtri.navName}  userId={id} filterTextFunP={filterTextFun} history={navigate} />
            <div id="firstBody_sub">
            <svg className="shapeHome" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1440 320"><path className="shapeHome"  fill="#EBCCA4" fillOpacity="1" d="M0,256L18.5,261.3C36.9,267,74,277,111,261.3C147.7,245,185,203,222,165.3C258.5,128,295,96,332,112C369.2,128,406,192,443,224C480,256,517,256,554,229.3C590.8,203,628,149,665,149.3C701.5,149,738,203,775,202.7C812.3,203,849,149,886,112C923.1,75,960,53,997,74.7C1033.8,96,1071,160,1108,154.7C1144.6,149,1182,75,1218,74.7C1255.4,75,1292,149,1329,176C1366.2,203,1403,181,1422,170.7L1440,160L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z"></path></svg>                   
            
                <Slide/>
                <Body updateNavNameP={updateNavName}   id={id} searchString={filterText} viewP={HomeAtri.view} />
                <Footer/>   
            </div>
            <a  className="firstBody-whatsApp" href="https://api.whatsapp.com/send?phone=23408184724615&text=Hello glacier"> <WhatsAppIcon style={{"fontSize":"60px"}}/></a>
        </div> 
    )
}

export default HomeContainer;          







/*
class homeContainer extends React.Component{
constructor({match}){
    super()
    this.filterTextFun=this.filterTextFun.bind(this)
    this.updateNavName=this.updateNavName.bind(this)
    this.state={filteredText:'',view:'Filler',navName:"Filler"}
    this.match=match;
}
    filterTextFun(value){
        this.setState({filteredText:value})
    }
  
    updateNavName(value){
        this.setState({navName:value})
        this.setState({view:value})
    }
    
    render(){
        let id=this.match.url.slice(6);
        return(
            <div className='firstBody'>
                <Nav  updateNavNameP={this.updateNavName} navNameP={this.state.navName}  userId={id} filterTextFunP={this.filterTextFun} history={this.props.history} />
                <div id="firstBody_sub">
                <svg className="shapeHome" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1440 320"><path className="shapeHome"  fill="#EBCCA4" fillOpacity="1" d="M0,256L18.5,261.3C36.9,267,74,277,111,261.3C147.7,245,185,203,222,165.3C258.5,128,295,96,332,112C369.2,128,406,192,443,224C480,256,517,256,554,229.3C590.8,203,628,149,665,149.3C701.5,149,738,203,775,202.7C812.3,203,849,149,886,112C923.1,75,960,53,997,74.7C1033.8,96,1071,160,1108,154.7C1144.6,149,1182,75,1218,74.7C1255.4,75,1292,149,1329,176C1366.2,203,1403,181,1422,170.7L1440,160L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z"></path></svg>                   
                
                    <Slide  />
                    <Body  updateNavNameP={this.updateNavName}   id={id} searchString={this.state.filteredText} viewP={this.state.view} />
                    <Footer/>
                </div>
            </div> 
        )
    }
}
export default homeContainer;          








*/
