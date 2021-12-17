
function Uploadnav(props) {

function  goBack(){
    props.history.goBack()
}
function  dashboard(){
 
  props.history.replace("/home/"+props.id+"/Dashboard")
  
}

    return (
           <div>
             <ul className="nav justify-content-center" style={{backgroundColor: "black",zIndex:200}}>
                  <li className="nav-item">
                    <div className="nav-link active" onClick={goBack} style={{color: "white"}}>Back</div>
                  </li>
                  {
                  props.id ?  
                   <li className="nav-item">
                      <div className="nav-link" onClick={dashboard} style={{color: "white"}}>Dashboardnnn</div>
                   </li>
                   :
                 ''
                 }
                 
                  <li className="nav-item">
                    <a className="nav-link" href="/" style={{color: "white"}} >About</a>
                  </li>
               
          </ul>
           </div>
    )
    
}

export default Uploadnav;