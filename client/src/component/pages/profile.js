import React from 'react';
import Nav from "../reUse/setingsNav"
import {useParams,Link,useNavigate} from "react-router-dom";
import "../../style/profile.css";
import bookimg from "../../../src/profileIMG/Ellipse 2.png";
import bookimg2 from "../../../src/profileIMG/book.svg";
import acomodation from "../../../src/profileIMG/home.svg";
import filler from "../../../src/profileIMG/filler.svg";
import Steppers from "../../component/materialUI/stepper"
import account from "../../../src/profileIMG/account.svg";


const step1= [
    {
      label: 'signup or login if you already and account ',
      description: `you can find the sign up and login button
                    at the top right of the home page, you can also
                    find the sign up button here at the button. you now have access to upload`,
    },
    {
      label: 'upload your text book',
      description:
        `Take a picture of the book you want sale. 
        In the nav bar click on upload on the drop 
        down select book, enter the neccesary info and click upload`
    },
    {
      label: 'Done ',
      description: `and your book is live  `,
    },
];

const step2= [
    {
      label: 'signup or login if you already and account ',
      description: `you can find the sign up and login button
                    at the top right of the home page, you can also
                    find the sign up button here at the button. you now have access to upload`,
    },
    {
      label: 'upload your Accomodation',
      description:
        `Take a picture of the space(lodge or hostel) you want sale. 
        In the nav bar click on upload on the drop 
        down select accomodation, enter the neccesary info and click upload`
    },
    {
      label: 'Done ',
      description: `and your space is live  `,
    },
];


const step3= [
    {
      label: 'signup or login if you already and account ',
      description: `you can find the sign up and login button
                    at the top right of the home page, you can also
                    find the sign up button here at the button. you now have access to upload`,
    },
    {
      label: 'make request for roomate or other purpose',
      description:
        `when you search for unavailable accomodation and get empty search request
        click on request accomodation to make your request`
    },
    {
      label: 'Done ',
      description: `and your request is made. it last for a week  `,
    },
];



function Profile(props){
    const {id}=useParams();
    const navigate=useNavigate()

    function isLogedIn(){
        if(window.localStorage.getItem('isAuthenticated')==="true"){
             return
        }
        else{
            navigate("/login")
        }
 
     }
    function goBack(){
        navigate(-1)
    }
    return(
            <div id="container">
                   <Nav history={props.history} idP={id}  isLogedInP={()=>isLogedIn()}/>

                   <div id="container_section1">
                        <ul id="container_section1__conatainer">
                            <li id="container_section1__conatainer__text" className="container_section1__conatainer__class">
                                <h3>Glacier</h3>
                                <p>
                                Glacier is an online school management system 
                                that <strong>help student get their money back</strong>, by<strong> uploading </strong>
                               old school textbook or material for <strong> resales </strong> to other student who are in need <strong>half the
                                original price </strong>. And we also provide additional service like
                                available <strong>acomodation filers for all school CA both new 
                                and old </strong> ones we provide skill and technical writers that will 
                                help you with<strong> Term paper, CA , Project Writer</strong>.
                               
                                </p>
                            </li>
                            <li id="container_section1__conatainer__img"  className="container_section1__conatainer__class">
                                <img src={bookimg} alt="..."/>
                            </li>
                        </ul>
                   </div>   

                   <div id="container_section2">
                        <h3>Service</h3>
                        <p>What we offer</p>

                        <ul id="container_section2__container">
                            <li>
                                <div><img src={bookimg2} alt="..."/> </div>
                                <p>Old and New book available for sales.
                                <i> All user can upload their book for sale</i></p>
                            </li>
                            <li>
                                <div><img src={acomodation} alt="..."/> </div>
                                <p>Lodge and Hostel Accomodation avalable. 
                                  <i> All user can upload available accomodation</i>
                                </p>
                            </li>
                            <li>
                                <div><img src={filler} alt="..."/> </div>
                                <p>Filler for old and new CA available</p>
                            </li>
                        </ul>
                   </div>
                   <div id="section3">
                       <h3>How we work</h3>
                        <ul>
                            <li>
                                <Steppers stepsp={step1}/>
                            </li>
                            <li>
                                <Steppers stepsp={step2}/>
                            </li>
                            <li>
                                <Steppers stepsp={step3}/>
                            </li>
                        </ul>
                   </div>
                   <div id="section4">
                        <ul>
                            <li>
                                <img src={account} alt="..."/>
                            </li>
                            <li>
                                <div>

                                    {id?
                                        <p>Get started now and start selling your old text book check out our list of available acomodation</p>
                                    :   
                                        <p>sign up now and get access to all features and start selling your old text book</p>

                                    }
                                </div>
                               <div>
                                   <div>
                                   {id?
                                        <a href="/signup" >Get Started</a>
                                        :
                                        <a href="/signup" >signup</a>
                                   }
                                    
                                   </div>
                               </div>
                            </li>
                        </ul>
                   </div>

                   <div id="section5">
                       <h3>GLACIER</h3>
                       {id?
                                 <ul id="section5__section1">
                                    <li><Link to="#" onClick={goBack} className="section5__Link">Home</Link></li>
                                </ul>
                                :
                                <ul id="section5__section1">
                                    <li><Link to={`/login`}  className="section5__Link">Home</Link></li>
                                    <li><a href="/signup"  className="section5__Link">Rigister</a></li>
                                    <li onClick={()=>isLogedIn()}><Link to={`/home/${id}/Accomodation/`} className="section5__Link">accomodation</Link></li>
                                </ul>
                             }
                       
                        <ul id="section5__section2" >
                            <li>Privacy</li>
                            <li>Term and conditions </li>
                            <li>copy write</li>
                            <li>Gracier</li>
                        </ul>
                   </div>
            </div>
    )
}

export default   Profile;