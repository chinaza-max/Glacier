import { Link } from 'react-scroll';


function NavDashboard(props){

function  goBack(){
    props.history.goBack()
}

function  filler(){
  props.history.push("/home/"+props.id)
}

    return(
        <ul className="nav justify-content-center" style={{backgroundColor: "black"}}>
        <li className="nav-item">
          <div className="nav-link active" onClick={goBack} style={{color: "white"}}>Back</div>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/" style={{color: "white"}}>About</a>
        </li>
   
        
</ul>
    )
}
export default NavDashboard;