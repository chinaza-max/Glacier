
import Section1 from "../component/sub-components/body/section1"
import Section2 from "../component/sub-components/body/section2"


function Body(props){

    
    return(
        <div>
            <Section1/>
            <Section2 id={props.id} searchString2={props.searchString}/>
        </div>
    )
}

export default Body;
