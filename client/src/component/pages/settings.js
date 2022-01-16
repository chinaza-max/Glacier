import React,{useState,useEffect} from 'react';
import {useParams} from "react-router-dom";
import SetingsNav from "../reUse/setingsNav"
import axios from 'axios'   
import "../../style/setting.css"


function Settings(props){
    const[responses,setreponses]=useState({accOneResponse:'',accTwoResponse:'',PDFOneResponse:"",PDFTwoResponse:"",postOneResponse:"",postTwoResponse:"",postResponse:'',userName:'',userTel:'',accomodationPostRespond:""})
    const[fileName,setFileName]=useState({bookName:'',pdfName:''});
    const[number,setNumber]=useState('');
    const[numberAcc,setNumberAcc]=useState('');
    
    const {id}=useParams()
 
  function handleChange(e){
    const {name,value}=e.target
    setFileName({...fileName,[name]:value})
  }
  function empty(){
    setFileName({...fileName,bookName:'',pdfName:''});
  }
    async  function deleteAllAccount(){
            const response=await fetch(`/deleteAllAcc/${number}`)
            const body=await response.json()
            setreponses({...responses,accOneResponse:body.express})
    }
    async  function deleteSingleAccount(){
        
       if(fileName.bookName){
            const response=await fetch("/deleteSingleAcc/"+fileName.bookName)
            const body=await response.json()
            if(body.name=== "No user found"){
                setreponses({...responses,accTwoResponse:body.name})
            }
            else{
                setreponses({...responses,accTwoResponse:body.name+" account has been deleted"})
            }
            empty()
       }
    }

    async  function deleteAllPDF(){
        const response=await fetch("/deleteAllPDF/"+id)     
        let body=await response.json()
        setreponses({...responses,PDFOneResponse:body.express})
        empty()
     }
    async function DropSinglePDF(){
        if(fileName.pdfName){
            const response=await fetch("/DropSinglePDF/"+fileName.pdfName+"/"+id)
            let body=await response.json()
            console.log(body.express)
            setreponses({...responses,PDFTwoResponse:body.express})

        }
    }
    async function deleteSinglePost(){
    
       if(fileName.bookName){
            const response=await fetch("/deleteSinglePost/"+fileName.bookName)
            let body=await response.json()
            setreponses({...responses,postTwoResponse:body.express})
       }
    }
    async function deleteAllBook(){
             const response=await fetch("/deleteAllBook");
             let body=await response.json();
             setreponses({...responses,postResponse:body.express})
    }
    async function  deleteAllAccomodationPost(){
           const response=await fetch("/deleteAllAccomodationPost")
           let body=await response.json();
           setreponses({...responses,accomodationPostRespond:body.express})
       
    }
     async function generateAccDetails(){
        if(fileName.bookName){
            const response=await fetch("/generateAccDetails/"+fileName.bookName);
            let body=await response.json();
            console.log(body.express)
            setreponses({...responses,userName:body.express,userTel:body.express2})
        }
    }
 async   function updatecheckbox(){
        let checkStatus=document.querySelector(".checkbox").checked
        try{
            await axios.post(`/updateCheckValue/${number}/${checkStatus}`,{
        }).then((res)=>{  
            console.log(res.data.express)
        })
        .catch((error)=>{
            console.log(error.response.data.express)
        })
        }
        catch(err){
            console.log(err)
        }
    }
    
    useEffect(()=>{
        async function fetchData() {
            if(id){
                try{
                    await axios.get(`/phone/${id}`,{
                }).then((res)=>{
                    
                    setNumber(res.data.express)
                })
                .catch((error)=>{
                    console.log(error.response.data.express)
                })
                }
                catch(err){
                    console.log(err)
                }

                //for updating check box
                try{
                    await axios.get(`/checkValue/${number}`,{
                }).then((res)=>{ 
    
                    document.querySelector('.checkbox').checked=res.data.express
                })
                .catch((error)=>{
                   // console.log(error.response.data.express)
                })
                }
                catch(err){
                    console.log(err)
                }
            }

            //getting number of account in database
            try{
                await axios.get(`/numberOfAcc`,{
            }).then((res)=>{ 
               setNumberAcc(res.data.express)
            })
            .catch((error)=>{
                //console.log(error.response.data.express)
            })
            }
            catch(err){
                console.log(err)
            }

            
        }

        
       fetchData();
     
    },[id,number])
    return(
        <div className="SetingsContainer">
            
            <SetingsNav history={props.history} idP={id}/>
            <div className="SetingsBody">
                <div className="SetingsBody-sub">

                    <div className="flex-container">
                        <div className="text1">
                            <p>Authorize Free Upload All  </p>
                        </div>
                        <div className="input-container">
                                <input type="checkbox"  name="" className="checkbox" onChange={()=>{updatecheckbox()}} />
                        </div>
                    </div>


                    <div className="flex-container">
                        <div className="text1">
                            <p>Authorize Free Upload Single</p>
                        </div>
                        <div className="input-container">
                                <p className="add">add</p>
                        </div>
                    </div>

                    <div className="flex-container">
                        <div className="text1">
                            <p>Clear All Account</p>
                            <div><h3>{responses.accOneResponse}</h3></div>
                        </div>
                        <div className="input-container">
                                <button onClick={deleteAllAccount}>clear</button>
                        </div>
                    </div>

                    <div className="responses" >{responses.accTwoResponse}</div>
                    <div className="flex-container">
                        <div className="text1">
                            <p>Drop Single Account</p>
                        </div>
                        <div className="input-container" id="DropSingle">
                                <div> <input type="text"  onChange={handleChange} placeholder="paste book name" name="bookName" /></div>
                                <div> <button className="add" onClick={deleteSingleAccount}>Drop</button></div>
                        </div>
                    </div>
               
                    <div className="responses" >{responses.PDFOneResponse}</div>
                    <div className="flex-container">
                        <div className="text1">
                            <p>Clear All PDF</p>
                        </div>
                        <div className="input-container">
                                <button onClick={deleteAllPDF}>clear</button>
                        </div>
                    </div>

                    <div className="responses">{responses.PDFTwoResponse}</div>
                    <div className="flex-container">
                        <div className="text1">
                            <p>Drop Single PDF</p>
                        </div>
                        <div className="input-container" id="singlePDF">
                                <div> <input type="text"  onChange={handleChange} name='pdfName' placeholder="PDF name"/></div>
                                <div> <button className="add"  onClick={DropSinglePDF}>Drop</button></div>
                        </div>
                    </div>

                    <div className="responses"> {responses.postResponse}</div>
                    <div className="flex-container">
                        <div className="text1">
                            <p>clear all post (Books)</p>
                        </div>
                        <div className="input-container"  id="post">
                                <div> <button className="add" onClick={deleteAllBook}>clear</button></div>
                        </div>
                    </div>

                    <div className="responses">{responses.postTwoResponse}</div>
                    <div className="flex-container">
                        <div className="text1">
                            <p>Drop Single Post (Book)</p>
                        </div>
                        <div className="input-container"  id="post">
                                <div> <input type="text"   placeholder="paste name of book"  name="bookName" onChange={handleChange}/></div>
                                <div> <button className="add" onClick={deleteSinglePost}>Drop</button></div>
                        </div>
                    </div>

                    <div className="responses"> {responses.accomodationPostRespond}</div>
                    <div className="flex-container">
                        <div className="text1">
                            <p>clear all accomodation post</p>
                        </div>
                        <div className="input-container"  id="post">
                                <div> <button className="add" onClick={deleteAllAccomodationPost}>clear</button></div>
                        </div>
                    </div>
                    
                    <div className="responses"> {
                      responses.userName  ? <div>Name: {responses.userName} Tel: {responses.userTel}</div>:''
                    }</div>
                    <div className="flex-container">
                        <div className="text1">
                            <p>Generate acc Details</p>
                        </div>
                        <div className="input-container"  id="post">
                                <div> <input type="text" placeholder="name of book posted from url" onChange={handleChange} name="bookName"/></div>
                                <div> <button className="add" onClick={generateAccDetails}>Generate</button></div>
                               
                        </div>
                    </div>

                    <div className="flex-container">
                        <div className="text1">
                            <p>number of account </p>
                        </div>
                        <div className="input-container"  id="post">
                                {numberAcc}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings