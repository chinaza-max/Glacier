import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../style/noMatchContainer.css"
import {useEffect,useState } from 'react';
import {useParams} from "react-router-dom";
import AccomodationNav from "./sub-components/AccomodationNav";
import Swal from 'sweetalert2'



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
        setsearch(value.toLowerCase());
    }
    function accomodationFunc(value){
        setsearch2(value);
    }
    function isNumeric(num){
        return !isNaN(num)
    }
    function removeAccomodation(name){
        
        Swal.fire({
            title: 'remove accomodation from database?',
            showCancelButton: true,
            titleColor:"#ED3137",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
                
                    const response=await fetch("/deleteSingleAccomodation/"+name,{
                        headers : { 
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                           }
                    })
                    const body=await response.json()
                    console.log(body.express)   
                    if(body.express=== "No user found"){
                        Swal.fire(
                            'NotDeleted!',
                            'Your file was not deleted.',
                            'Failed'
                        )  

                    }
                    else{
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        ).then(()=>{
                            let newUpdate=accomodation.filter((obj)=>{
                                return    obj.unique!==name
                            })
                            setaccomodation(newUpdate)
                        })   
                       
                    }
            }
        })


    }
    useEffect(()=>{
            const aboutController=new AbortController()
            const signal=aboutController.signal
    async   function init(){
            const response=await fetch("/accomodations",
                {   
                    headers : { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                   }
                },
            {signal:signal})
            const body=await response.json()
            setaccomodation(body.express)
            console.log(body.express)
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
    let resultFound=accomodation.map((data)=>{
        
        if(data==='test'){
             return '' 
        }
        else{
          
            if(data.selection.toLowerCase().indexOf(search)===-1 && data.Address.toLowerCase().indexOf(search)===-1){
        
                if(isNumeric(search) && search.length>0){
                    let convertedNum=Number(search)
                    if( convertedNum<=data.price){
                        return( 
                            <div key={data.unique} className="accomodation_body">
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
                            
                                        {data.id===id ? <button onClick={()=>removeAccomodation(data.unique)}>remove</button>:" "}
                                       
                                    </div>
                                    <div className="price_container">
                                        <h5>price (NGN):{data.price}</h5>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
                else{
                    searchResult="empty"
                    return ''
                }
            }
            else if(search2.toLowerCase()==="All".toLowerCase()){
                
                searchResult="filled";
                return(
                    <div key={data.unique} className="accomodation_body">
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
                    
                                {data.id===id? <button onClick={()=>removeAccomodation(data.unique)}>remove</button>:null}
                            
                            </div>
                            <div className="price_container">
                                <h5>price (NGN):{data.price}</h5>
                            </div>
                        </div>
                    </div>
                )
            }
            else if(data.selection.toLowerCase()===search2.toLowerCase()){
                searchResult="filled";
                return(
                    <div key={data.unique} className="accomodation_body">
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
                    
                                {data.id===id? <button onClick={()=>removeAccomodation(data.unique)}>remove</button>:null}
                            
                            </div>
                            <div className="price_container">
                                <h5>price (NGN):{data.price}</h5>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        return ''
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