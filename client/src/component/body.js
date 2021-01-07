
import Section1 from "../component/sub-components/body/section1"
import Section2 from "../component/sub-components/body/section2"
import Filler from "../component/filler"

function Body(props){
    return(
        <div>
            <Section1/>
            {
            props.viewP==' ' ? <Section2 id={props.id} searchString2={props.searchString}/> :
              <Filler/>
             }
           
        </div>
    )
}

export default Body;
