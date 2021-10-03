import {useState,useEffect} from "react"
import { Link } from "react-router-dom";
import "../style/filler.css"

function Filler(props){
    const[PDFs,setPDF]=useState([])


    useEffect(()=>{
        const aboutController=new AbortController()
        const signal=aboutController.signal

        try{
            const init=async()=>{
                const response=await fetch("/pdfAPI",{signal:signal}, {
                    headers : { 
                      'Content-Type': 'application/json',
                      'Accept': 'application/json'
                     }
              
                  })
                const body=await response.json()
                if(body.express.length===0){
                    return
                }
                else{
                   
                    setPDF(body.express)
                }
            }
            init();
        }
        catch(e){
            console.log(e)
        }
        return ()=> aboutController.abort()
    },[])


    let data=PDFs.map((data)=>{
       

        if(data.courseCode.indexOf(props.searchString2.toLowerCase())===-1){
            console.log("data")
            return;
        }
        else{
            return(
                <div key={data.name} className=".mainBody-sub-filler">
                    <div className='PDF'>
                          <Link   className="fillerImg"  download to={"/downloadPDF/"+data.name}>
                                <img className="bodyImg-filler" src="/imgs/pdfImg5.jpg" alt="file cant show"/>     
                                <div className="courseCode-filler"><h3 className="courseCode-filler-sub">{data.courseCode}</h3></div>
                          </Link>
                    </div>
                </div>
            )
        }
      
    })

    return(
            <div className="mainBody-container-filler" id="filler">
                <div className="mainBody-filler">
                {data}
                </div>
            </div>
    
    )
}
export default Filler;


