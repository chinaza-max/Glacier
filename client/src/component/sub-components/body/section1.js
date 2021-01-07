import '../../../style/section1.css'
import Carousel from "react-elastic-carousel";
import Item from "../../sub-components/body/item2";
import "../../../style/styles2.css";
import { Link } from "react-router-dom";



const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 340, itemsToShow: 3 },
  { width: 550, itemsToShow: 3 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },

];
function Section1(){
    
    return(
      <div>
        <h5 className="categories-title" style={{zIndex:900000}}>categories</h5>
          <div  className='section1'>
        
              <Carousel breakPoints={breakPoints} autoPlaySpeed={5000} enableAutoPlay={true}>
                  <Item style={{height:160,width:250,}}>Books</Item>
                  <Item style={{height:160,width:250,}}>School Filler</Item>
                  <Item style={{height:160,width:250,}}>Project Helper</Item>
                  <Item style={{height:160,width:250,}}>Term Paper Writer</Item>
                  <Item style={{height:160,width:250,}}>Advert Placement</Item>
              </Carousel>
          </div>
      </div>
    )
}

export default Section1