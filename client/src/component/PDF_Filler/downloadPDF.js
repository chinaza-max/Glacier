
import {useParams} from "react-router-dom";
import "../../style/downloadPDF.css";
import Uploadnav from "../reUse/setingsNav"


function DownloadPDF(props){
    const {name}=useParams();
    return(
        <div>
             <Uploadnav  history={props.history} idP={""}/>
             <div className="downloadPDF-body">
                
                <object  data= {name} type="application/pdf" width="100%" height="600px">
                <p className="">Your web browser doesn't have a PDF plugin to view details of PDF, before download.
                <a href={name} download> <br/>click here to
                download the PDF file directly.</a>
                </p>
                </object>
             </div>
        </div>
    )
}

export default DownloadPDF;