import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "../sub-components/item";
import "../../style/styles.css";
import { Link } from "react-router-dom";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },

];

function Details(props) {
  let data=props.data.map((data)=>{
 
      return(
        <Item key={data.name}> <a className="books" href={"/details/"+data.name}>  <img className="bodyImg" src={"/uploads/"+data.name} alt="file cant show"/>  </a></Item>
      )
  })
  return (
<>

      <div className="detailSliderContainer">
        <Carousel breakPoints={breakPoints} enableAutoPlay={true} autoPlaySpeed={2000} >
          {data}
        </Carousel>
      </div>
    </>
  );
}

export default Details
