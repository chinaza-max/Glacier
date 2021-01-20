
import {useParams} from "react-router-dom";

import "../style/downloadPDF.css";
import Uploadnav from "./sub-components/upload-component/upload-nav"


function DownloadPDF(props){
    const {name}=useParams();
    return(
        <div>
             <Uploadnav  history={props.history} />
             <div className="downloadPDF-body">
                
                <object  data= {"/uploadPDFs/"+name} type="application/pdf" width="100%" height="600px">
                <p className="">Your web browser doesn't have a PDF plugin.
                Instead you can <a href={"/uploadPDFs/"+name} download> <br/>click here to
                download the PDF file.</a>
                </p>
                </object>
             </div>
        </div>
    )
}

export default DownloadPDF;