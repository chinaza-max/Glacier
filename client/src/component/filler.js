import {useState,useEffect} from "react"
import { Link } from "react-router-dom";
import "../style/filler.css"

function Filler(props){
    const[post,setposts]=useState([])
    const[PDFs,setPDF]=useState([])


    useEffect(()=>{
        const aboutController=new AbortController()
        const signal=aboutController.signal
            const init=async()=>{
            const response=await fetch("/pdfAPI",{signal:signal})
            const body=await response.json()
            setPDF(body.express)
        }
        init();
        return ()=> aboutController.abort()
    },[])


    let data=PDFs.map((data)=>{
        if(data.courseCode.indexOf(props.searchString2)===-1){
            return ' '
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


/*
<a href="/images/myw3schoolsimage.jpg" download>
  <img src="/images/myw3schoolsimage.jpg" alt="W3Schools" width="104" height="142">
</a>
*/
/*
<embed src="files/Brochure.pdf#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" width="100%" height="600px" />*/