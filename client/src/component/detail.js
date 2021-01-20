import React,{useState,useEffect} from 'react';
import {useParams,Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import NavDetail from './sub-components/navdetail';
import Details from "../component/sub-components/detail-slider"
import "../style/details.css"

function Detail(props){
    const[post,setposts]=useState([])
    const[Books,setBooks]=useState([])

    const {name}=useParams();
 

    useEffect(()=>{
        const aboutController=new AbortController()
        const signal=aboutController.signal
        const init=async ()=>{
            const response=fetch("/details/"+name,{signal:signal})
            const body=await response.then(res=>res.json())
            setposts(body.express)
            
            const response2=await fetch("/Books",{signal:signal})
            const body2=await response2.json()
            setBooks(body2.express)
        }
        init()
 
        return ()=> aboutController.abort()
    },[name])

            console.log(post)
        return(
                <div >
                    <NavDetail  history={props.history} />
                    <div className="detailBodyContainer">
                        
                          {post.map((data)=>{
                              return(
                                  <div key={data.name} className="detailBody">
                                      <div className="bookImgContainer"><img  className="bookImg" src={"/uploads/"+data.name} /> </div>
                                      <div className="content"> 
                                      <div><h3>{data.title}</h3></div>
                                      <div className="callContainer">
                                          <a   className="call" style={{textDecoration:"none"}} href={"tel:"+data.tel}>call now</a>
                                      </div>
                                      <div>
                                          <h5>Description</h5>
                                          <p>{data.description}</p>
                                      </div>
                                      <div>
                                          <h5>Product Details</h5>
                                          <div>
                                              Author  : {data.author}
                                              <br/>
                                              Title : {data.title}
                                              <br/>
                                              Faculty : {data.faculty}
                                              <br/>
                                              Tel : {data.tel}
                                          </div>
                                      </div>
                                      </div>
                                  </div>
                              )

                          })}
                        <Details data={Books} />
                    </div>
                </div>
        )
}
export default Detail;

