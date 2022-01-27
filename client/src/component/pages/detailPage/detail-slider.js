import React from "react";
//import Carousel from "react-elastic-carousel";
import MyCarousel from '../../Carousel'
import Item from "../../sub-components/item";
import "../../../style/styles.css";
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
        <Item key={data.name}> <Link className="books" to={"/details/"+data.name}>  <img className="bodyImg" src={data.driveURL} alt="file cant show"/> </Link></Item>
      )
  })
  return (
    <>
      <div className="detailSliderContainer">
        <MyCarousel breakPoints={breakPoints} >
          {data}
        </MyCarousel>
      </div>
    </>
  );
}

export default Details
