import  "../../style/Accomodation_Upload_Nav.css";
import {useParams} from "react-router-dom";
import React,{useState,useEffect} from 'react';
import axios from 'axios'
import AccomodationUploadNav from "../reUse/setingsNav"
import Swal from 'sweetalert2';
import { PaystackButton } from "react-paystack"



function Accomodation_Upload(props){
    const [file,setFile]=useState('');
    const [filename,setFilename]=useState('upload image of building');
    const [uploadedFile,setUploadedFile]=useState({});
    const [eventInfo,setEventInfo]=useState({Price:0,Address:'',selection:'LODGE',tel:''});
    const {Price,Address,selection,tel}=eventInfo
    const [freeUpload,setFreeUpload]=useState(true)
    const [apikeys,setApikey]=useState("")
    const [email,setEmail]=useState("")
    const {id}=useParams()
    let i=0;

    const componentProps = {
        email,
        amount:10000,
        publicKey:apikeys,
        text: "upload now",
        onSuccess: () =>{
        alert("Thanks for doing business with us! Come back soon!!")
        onPayment()
        },
        onClose: () => alert("Wait! You need this oil, don't go!!!!"),
    }

    const onChange=(e)=>{
        if(e.target.files[0]){
            setFile(e.target.files[0]);
            setFilename(e.target.files[0].name)
        }
    }

    const handleChange=(event)=>{
        const {name,value}=event.target
        setEventInfo({...eventInfo,[name]:value})
    }

    const emptyInput=()=>{
        setFilename('Choose file')
        let elem1 = document.getElementById("inputGroupFile03");
        let elem2 = document.getElementById("price");
        let elem3 = document.getElementById("Address");
        let elem4 = document.getElementById("tel");
      
        elem2.value='';
        elem3.value='';
        elem4.value='';
        elem1.value="";
        let elem = document.getElementById("myBar");
        setTimeout(() => {
            elem.style.width = 2+ "%";
            elem.innerHTML= '';
        }, 1000);
    }
    const move=()=>{
        if (i === 0) {
            i = 1;
            let elem = document.getElementById("myBar");
            let width = 1;
            let id = setInterval(frame, 10);
            function frame() {
              if (width >= 100) {
                clearInterval(id);
                i = 0;
              } else {
                width++;
                elem.style.width = width + "%";
                elem.innerHTML= width + "%";
                if(width===100){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Your work has been upload successfully',
                        showConfirmButton: false,
                        timer: 2100
                      }).then(()=>{
                          if(freeUpload){
                                let input=document.querySelectorAll(".input")
                                let submitButton = document.getElementById('submitID');
                                // enable the submit button
                                submitButton.disabled = false;
                                input.forEach((ele)=>{
                                    ele.disabled = false;
                                })
                          }
                      
                      })
                      emptyInput();
                }
              }
            }
          }
    }
    const onPayment=async ()=>{

        const formData=new FormData();
        formData.append('file',file);
        formData.append('Price',Price);
        formData.append('Address',Address);
        formData.append('selection',selection);
        formData.append('tel',tel);
        try{
            const res=await axios.post('/Accomodation_upload/'+id,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });
            const{message,errMessage}=await res.data
            setUploadedFile({errMessage})
            if(message==="success"){
                move()
            }
        }
        catch(err){
            if(err){
                console.log(err)
            }
            else{
                console.log(err.response.data.msg)
            }
        }
    }
    const onSubmit=async (e)=>{
        e.preventDefault();
        if(freeUpload){
            const formData=new FormData();
            formData.append('file',file);
            formData.append('Price',Price);
            formData.append('Address',Address);
            formData.append('selection',selection);
            formData.append('tel',tel);
            try{
                const res=await axios.post('/Accomodation_upload/'+id,formData,{
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                });
                const{message,errMessage}=await res.data
                setUploadedFile({errMessage})
                if(message==="success"){
                    move()
                }
            }
            catch(err){
                if(err){
                   // console.log(err)
                }
                else{
                  //  console.log(err.response.data.msg)
                }
            }
        }
        
    }
     
    useEffect(()=>{
        
    async    function getUpdate(){
                 
        try{
            await axios.get(`/email/${id}`,{
        }).then((res)=>{ 
            setEmail(res.data.express)
        })
        .catch((error)=>{
        // console.log(error.response.data.express)
        })
        }
        catch(err){
            console.log(err)
        }
        
        //for updating check box
        try{
            await axios.get(`/checkValue/${8184724615}`,{
        }).then((res)=>{ 
            setFreeUpload(res.data.express)
            setApikey(res.data.express2)
        })
        .catch((error)=>{
        // console.log(error.response.data.express)
        })
        }
        catch(err){
            console.log(err)
        }
    }

    getUpdate();


        if(freeUpload){
            
            let form = document.getElementById('formID');
            let submitButton = document.getElementById('submitID');
            let input =document.querySelectorAll(".input")
            form.addEventListener('submit', function() {
            // Disable the submit button
            submitButton.setAttribute('disabled', true);
            input.forEach((ele)=>{
                ele.setAttribute('disabled', true);
            })
            // Change the "Submit" text
            submitButton.value = 'Please wait...';             
            }, false);
    
            return form.removeEventListener('submit', function() {
                submitButton.setAttribute('disabled', true);
                submitButton.value = 'Please wait...';             
                })
                
        }
       
    },[id,freeUpload])

    return(
        <div className="container_of_Accomodation_Upload">
            <AccomodationUploadNav  history={props.history} idP={id}/>
            <div className="center">
                <div className="body_of_Accomodation_Upload">
                    <form onSubmit={(e)=>{onSubmit(e); return false}}  id="formID"  encType="multipart/form-data">
                        <div className="custom-file mt-4">
                            <input type="file" name="file" className="custom-file-input input" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03" onChange={onChange} />
                            <label className="custom-file-label" htmlFor="inputGroupFile03">{filename} *Optional</label>
                        </div>
                        {uploadedFile.errMessage ? <h6 className='error'>{uploadedFile.errMessage}</h6>:null}
                        <div className="price">  
                            <label>Price (NGN):</label>
                            <input type="tel" name="Price"  id="price" className="input" onChange={handleChange} placeholder="12000..." minLength={5} maxLength={7} required/>
                        </div>
                    
                        <div className='Address'>  
                            <label>Address_Description :</label>
                            <textarea type="text"  name="Address" id="Address" className="input" className="Address_textarea" placeholder="Location of building.." onChange={handleChange} maxLength={250} required/>
                        </div> 
                        <div className='tel'>  
                            <label>tel :</label>
                            <input type="tel" id="tel" name="tel" className="input" placeholder="your phone NO" onChange={handleChange} minLength={11} maxLength={11} required/>
                        </div>
                        <div className='selection_container'>  
                            <label>select :</label>
                            <select name="selection" id="select" className="input" onChange={handleChange} required>
                                <option name="Lodge">LODGE</option>
                                <option name="Hostel">HOSTEL</option>
                            </select>
                        </div>
                        {freeUpload===false?
                            <PaystackButton className="paystack-button" {...componentProps} />
                            :
                            <input type="submit" value="Upload" id="submitID"  disabled={false}  className="btn btn-primary btn-block  mt-4"/>
                        }
                    </form>
                    
                    <div id="myProgress">
                        <div id="myBar"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Accomodation_Upload;