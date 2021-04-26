//this style contains styling for both the accomodation body
import {useEffect,useState } from 'react';
import {useParams} from "react-router-dom";
import "../../style/Accomodation_nav.css";

function AccomodationNav(props){
    const[changeNavStyle,setChangeNavStyle]=useState({"height":"250px","transition":"height 0.4s ease-out"})
    const[SearchTitle,setSearchTitle]=useState({"display":"block"})
    const[Accomodation_nav2,setAccomodation_nav2]=useState({"paddingTop":"0px"})
    const[search,setsearch]=useState({"paddingTop":"0px"})

    let {id}=useParams()
    
    function  onchange(e){
        props.filterFunc(e.target.value.toLowerCase())
    }
    function back(){
        props.history.goBack()
    }
    function backToUpLoad(){
        props.history.push("/home/"+id+"/Accomodation_Upload")
    }
    const handleChange=(event)=>{
        const {value}=event.target
        props.accomodationFunc(value)
    }
    function listenForScroll(){
     
        if(window.scrollY>90){
            setChangeNavStyle({"height":"145px","transition":"height 0.6s ease-out"})
            setSearchTitle({"display":"none","padding":"10px"})
            setAccomodation_nav2({"paddingTop":"25px"})
            setsearch({"paddingTop":"10px"})
        }
        else{
            setChangeNavStyle({"height":"250px","transition":"height 0.4s ease-out"})
            setSearchTitle({"display":"block","padding":"0px"})
            setAccomodation_nav2({"paddingTop":"0px"})
            setsearch({"paddingTop":"0px"})
        }
    }
    useEffect(()=>{
        const aboutController=new AbortController()
       
        window.addEventListener('scroll',listenForScroll)
        return ()=> aboutController.abort()
    },[])
    return(
        <div className="Accomodation_nav-container" style={changeNavStyle}>
            <div className="Accomodation_nav_body">
                <div className="title" style={SearchTitle}> Accomodation Search</div>
                <div className="search" style={search}>       
                    <input type="search"  placeholder="Search ....." className="form-control" onChange={onchange} />
                </div>
                <div className="select">
                    <select name="select" id="select" required onChange={handleChange}>
                        <option name="Lodge">All</option>
                        <option name="Lodge">lodge</option>
                        <option name="Hostel">hostel</option>
                    </select>
                </div>
            </div>
            <div className="Accomodation_nav2" style={Accomodation_nav2}>
                <div className="back"><span  className="back" onClick={back}>Back</span></div>
                <div className="Upload-accomodation_container"><span className="Upload-accomodation" onClick={backToUpLoad}>Upload-accomodation</span> </div>
            </div>
        </div>
    )
}
 export default AccomodationNav