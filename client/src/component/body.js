
import Section1 from "../component/sub-components/body/section1"
import Section2 from "../component/sub-components/body/section2"
import Filler from "../component/filler"

function Body(props){
    return(
        <div className="firstBody-sub">
            <Section1/>
            
            {
            props.viewP==='Filler' ? <Section2 id={props.id} searchString2={props.searchString}/> :
              <Filler  searchString2={props.searchString}/>
            }
           
        </div>
    )
}

export default Body;
