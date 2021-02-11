import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import {useEffect,useState } from 'react';

import AccomodationNav from "./sub-components/AccomodationNav"
function Accomodation(props){
    const[accomodation,setaccomodation]=useState([])
    const[search,setsearch]=useState([])
    const[search2,setsearch2]=useState("All")

    function filterFunc(value){
        setsearch(value)
    }
    function accomodationFunc(value){
        setsearch2(value)
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
    let datas=accomodation.map((data,index)=>{
        if(data==='test'){
             return '' 
        }
        else{
            if(data.name.indexOf(search)===-1 && data.selection.indexOf(search)===-1 && data.Address.indexOf(search)===-1 && data.price.indexOf(search)===-1){
                return ' '
            }
        
            else if(search2==="All"){
                console.log(search2)
                return(
                <div key={index} className="accomodation_body">
                    <div className="img_container">
                        <img className="bodyImg" src={"/Accomodation_upload/"+data.name} alt="file cant show"/> 
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
                return(
                    <div key={index} className="accomodation_body">
                        <div className="img_container">
                            <img className="bodyImg" src={"/Accomodation_upload/"+data.name} alt="file cant show"/> 
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
                {datas}
                </div>
            </div>
        </div>
    )
}
export default Accomodation