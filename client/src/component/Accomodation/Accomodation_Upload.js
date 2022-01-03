import  "../../style/Accomodation_Upload_Nav.css";
import {useParams} from "react-router-dom";
import React,{useState,useEffect} from 'react';
import axios from 'axios'
import AccomodationUploadNav from "../reUse/setingsNav"
import Swal from 'sweetalert2';



function Accomodation_Upload(props){
    const [file,setFile]=useState('');
    const [filename,setFilename]=useState('upload image of building');
    const [uploadedFile,setUploadedFile]=useState({});
    const [eventInfo,setEventInfo]=useState({Price:0,Address:'',selection:'LODGE',tel:''});
    const {Price,Address,selection,tel}=eventInfo
    const {id}=useParams()
    let i=0;

   
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
                        let submitButton = document.getElementById('submitID');
                        // enable the submit button
                        submitButton.disabled = false;
                      })
                      emptyInput();
                }
              }
            }
          }
    }
    const onSubmit=async (e)=>{
        e.preventDefault();
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
    
    useEffect(()=>{
        let form = document.getElementById('formID');
        let submitButton = document.getElementById('submitID');
        form.addEventListener('submit', function() {
        // Disable the submit button
        submitButton.setAttribute('disabled', true);
        // Change the "Submit" text
        submitButton.value = 'Please wait...';             
        }, false);

        return form.removeEventListener('submit', function() {
            submitButton.setAttribute('disabled', true);
            submitButton.value = 'Please wait...';             
            })
    },[])

    return(
        <div className="container_of_Accomodation_Upload">
            <AccomodationUploadNav  history={props.history} idP={id}/>
            <div className="center">
                <div className="body_of_Accomodation_Upload">
                    <form onSubmit={onSubmit} id="formID"  encType="multipart/form-data">
                        <div className="custom-file mt-4">
                            <input type="file" name="file" className="custom-file-input" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03" onChange={onChange} />
                            <label className="custom-file-label" htmlFor="inputGroupFile03">{filename} *Optional</label>
                        </div>
                        {uploadedFile.errMessage ? <h6 className='error'>{uploadedFile.errMessage}</h6>:null}
                        <div className="price">  
                            <label>Price (NGN):</label>
                            <input type="tel" name="Price"  id="price" onChange={handleChange} placeholder="12000..." minLength={5} maxLength={7} required/>
                        </div>
                    
                        <div className='Address'>  
                            <label>Address_Description :</label>
                            <textarea type="text"  name="Address" id="Address" className="Address_textarea" placeholder="Location of building.." onChange={handleChange} maxLength={250} required/>
                        </div> 
                        <div className='tel'>  
                            <label>tel :</label>
                            <input type="tel" id="tel" name="tel" placeholder="your phone NO" onChange={handleChange} minLength={11} maxLength={11} required/>
                        </div>
                        <div className='selection_container'>  
                            <label>select :</label>
                            <select name="selection" id="select" onChange={handleChange} required>
                                <option name="Lodge">LODGE</option>
                                <option name="Hostel">HOSTEL</option>
                            </select>
                        </div>
                        <input type="submit" value="Upload" id="submitID"  disabled={false}  className="btn btn-primary btn-block  mt-4"/>
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