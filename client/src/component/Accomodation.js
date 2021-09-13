import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../style/noMatchContainer.css"
import {useEffect,useState } from 'react';
import {useParams} from "react-router-dom";
import AccomodationNav from "./sub-components/AccomodationNav";


function Accomodation(props){
    const[accomodation,setaccomodation]=useState([]);
    const[search,setsearch]=useState([]);
    const[search2,setsearch2]=useState("All");
    const {id}=useParams(); 
    let searchResult="filled";
  
    function requestAccomodation(){
        props.history.push("/home/"+id+"/Accomodation_UploadRequest")
    }
    function filterFunc(value){
        setsearch(value);
    }
    function accomodationFunc(value){
        setsearch2(value);
    }
    useEffect(()=>{
            const aboutController=new AbortController()
            const signal=aboutController.signal
    async   function init(){
            const response=await fetch("/accomodations",{signal:signal})
            const body=await response.json()
            console.log("body.express")
            console.log(body.express)
            setaccomodation(body.express)
        }
        init()
        return ()=> aboutController.abort()
    },[])
  
    let NoResultFound=()=>{
        return(
            <div className="noMatchContainer">
                <h6 className="sub_noMatchContainer">Does not match any results!</h6>
                <h5 className="sub_noMatchContainer"  id="sub_noMatchContainer_click"onClick={()=>requestAccomodation()}>request accomodation or roommate</h5>
            </div>
        )
    }
    let resultFound=accomodation.map((data,index)=>{
        console.log(data)
        if(data==='test'){
             return '' 
        }
        else{
            if(data.name.indexOf(search)===-1 && data.selection.indexOf(search)===-1 && data.Address.indexOf(search)===-1 && data.price.indexOf(search)===-1){
                searchResult="empty"
                return ''
            }
        
            else if(search2==="All"){
                searchResult="filled";
                return(
                <div key={index} className="accomodation_body">
                    <div className="img_container">
                        <img className="bodyImg" src={data.name} alt={"/accomodationImg/firstImg.jpg"} /> 
                    </div>
                    <div className="info1">
                        <div className="accomodation_type">
                            <h3>{data.selection}</h3>
                        </div>
                        <div className="address_display">
                            {data.Address}
                        </div>
                        <div className="tel_display">
                            {data.tel}
                            
                        </div>
                    </div>
                    <div className="info2">
                        <div className="remove_container">
                            <button>remove</button>
                        </div>
                        <div className="price_container">
                            <h5>price :{data.price}</h5>
                        </div>
                    </div>
                </div>
                )
            }
            else if(data.selection===search2){
                searchResult="filled";
                return(
                    <div key={index} className="accomodation_body">
                        <div className="img_container">
                            <img className="bodyImg" src={data.name} alt="file cant show"/> 
                        </div>
                        <div className="info1">
                            <div className="accomodation_type">
                                <h3>{data.selection}</h3>
                            </div>
                            <div className="address_display">
                                {data.Address}
                              
                            </div>
                               <div className="tel_display">
                                {data.tel}
                                
                            </div>
                        </div>
                        <div className="info2">
                            <div className="remove_container">
                                <button>remove</button>
                            </div>
                            <div className="price_container">
                                 <h5>price :{data.price}</h5>
                            </div>
                        </div>
                    </div>
                )
            }
            else{
                return ''
            }
        }
 
     })
  
    return(
    
        <div className="Accomodation">
            <AccomodationNav filterFunc={filterFunc} accomodationFunc={accomodationFunc} history={props.history}/>
            <div className="accomodation_body_container">
                <div  className="accomodation_body_container_sub">
                  {searchResult!=="empty"?resultFound:
                  <NoResultFound/>}
                </div>
            </div>
        </div>
    )
}
export default Accomodation