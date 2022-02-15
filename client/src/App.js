//import logo from './logo.svg';



/*remember that @material-ui/core/styles is in dashboardNav.js*/
import './App.css';
import {BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Home from "./component/Home/homeContainer";
import UploadBook from "./component/Book/uploadBook";
import Signup from "./component/account/signup";
import Login from "./component/account/login"; 
import Dashboard from "./component/pages/dashBoard/dashboard";
import Detail from "./component/pages/detailPage/detail";
import UploadPDF from "./component/PDF_Filler/uploadPDF";
import DownloadPDF from "./component/PDF_Filler/downloadPDF";
import Setting from "./component/pages/settings";
import AccomodationUpload from "./component/Accomodation/Accomodation_Upload";
import Accomodation from "./component/Accomodation/Accomodation";
import AccomodationUploadRequest from "./component/Accomodation/Accomodation_UploadRequest";
import Notification from  "./component/pages/notification";
import Profile from "./component/pages/profile"
import VerifyEmail from "./component/account/verifyEmail"
import ResetPassword from "./component/account/ResetPassword"
import "./style/firstbody.css";






function App() {

    return (
      <Router>
        <Routes>

            <Route path="/"  element={<Home/>}/>

            <Route path="/login" element={<Login/>}/>
            
            <Route path="/signup" element={<Signup/>}/>

            <Route path="/home/profile" element={<Profile/>}/>
            
            <Route path="/verifyEmail" element={<VerifyEmail/>}/>

            <Route path="/resetPassword/:id" element={<ResetPassword/>}/>

            <Route path="/home/:id/setting" element={<Setting/>}/>
            
            <Route path="/home/:id/dashboard" element={<Dashboard/>}/> 
            
            <Route path="/home/:id/Accomodation" element={<Accomodation/>}/>
            
            <Route path="/home/:id/uploadPDF" element={<UploadPDF/>}/>
            
            <Route path="/home/:id/Accomodation_Upload" element={<AccomodationUpload/>}/>
            
            <Route path="/home/:id/notification" element={<Notification/>}/>

            <Route path="/home/:id/Accomodation_UploadRequest" element={<AccomodationUploadRequest/>}/>
           
            <Route path="/home/:id/profile" element={<Profile/>}/>
            
            <Route path="/home/:id/uploadBook" element={<UploadBook/>}/>
           
            <Route path="/home/:id" element={<Home/>}/>
       
            <Route path="/details/:name" element={<Detail/>}/>
            
            <Route path="/downloadPDF/:name" element={<DownloadPDF/>}/>
  
        </Routes>
      </Router>
    )
}

export default App;
