//tring to stop an error
import Carousel from "react-elastic-carousel";
class MyCarousel extends Carousel{
   
    componentWillUnmount(){
        this.setState(
            {...this.state,enableAutoPlay:false}
        )
    }
}
export default MyCarousel