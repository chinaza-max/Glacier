import {useEffect,useState } from 'react';
import { Link } from "react-router-dom";
import '../../../style/section2.css';


function Section2(props){
    const[books,setBooks]=useState([])

     useEffect(()=>{
        const aboutController=new AbortController()
        const signal=aboutController.signal
     async function fetchData(){
            const response=await fetch("/Books",{signal:signal}, {
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
          
              })
            const body=await response.json()
            setBooks(body.express)
            console.log(body.express)
            localStorage.setItem('numberOfBook', JSON.stringify(body.express.length))
       }
      fetchData();

      return ()=> aboutController.abort()
    },[])
    let data=books.map((data)=>{
       if(data==='test'){
            return '' 
       }
       else{
            if(data.name.indexOf(props.searchString2)===-1 && data.title.indexOf(props.searchString2)===-1 && data.author.indexOf(props.searchString2)===-1 && data.faculty.indexOf(props.searchString2)===-1){
                return ' '
            }
        
            else{
                return(
                    <div key={data.name} className="mainBody-sub">
                        
                            <div className="mainBody-subCenter">
                                <Link className="books" to={"/details/"+data.driveURL}>  <img className="bodyImg" src={data.driveURL} alt="file cant show!"/>  </Link>
                            </div>
                            <div className="booksTitle">
                                {data.title}
                            </div>
                    </div>
                )
            }
       }
    })
    return(
        <div className="mainBody-container" id="filler">
            <div className="mainBody">
            {data}
            </div>
        </div>
    )
}

export default Section2