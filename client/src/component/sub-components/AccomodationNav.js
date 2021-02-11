//this style contains styling for both the accomodation body
import {useParams} from "react-router-dom";
import "../../style/Accomodation_nav.css"

function AccomodationNav(props){
    let {id}=useParams()
    function  onchange(e){
        console.log(e.target.value)
        props.filterFunc(e.target.value)
    }
    function back(){
        ///home/6005d19e0282c44308e49ece/Accomodation_Upload
        props.history.goBack()
    }
    function backToUpLoad(){
        props.history.push("/home/"+id+"/Accomodation_Upload")
    }
    const handleChange=(event)=>{
        const {value}=event.target
        props.accomodationFunc(value)
    }

    return(
        <div className="Accomodation_nav-container">
            <div className="Accomodation_nav_body">
                <div className="title"> Accomodation Search</div>
                <div className="search">       
                    <input type="search"  placeholder="Search ....." className="form-control" onChange={onchange} />
                </div>
                <div className="select">
                    <select name="select" id="select" required onChange={handleChange}>
                        <option name="Lodge">All</option>
                        <option name="Lodge">lodge</option>
                        <option name="Hostel">hostel</option>
                    </select>
                </div>
            </div>
            <div className="Accomodation_nav2">
                <div className="back"><span  className="back" onClick={back}>Back</span></div>
                <div className="Upload-accomodation_container"><span className="Upload-accomodation" onClick={backToUpLoad}>Upload-accomodation</span> </div>
            </div>
        </div>
    )
}
 export default AccomodationNav