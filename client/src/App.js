//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import Home from "./component/Home/homeContainer";
import uploadBook from "./component/Book/uploadBook";
import Signup from "./component/account/signup";
import Login from "./component/account/login"; 
import Dashboard from "./component/pages/dashBoard/dashboard";
import Detail from "./component/pages/detailPage/detail";
import UploadPDF from "./component/PDF_Filler/uploadPDF";
import downloadPDF from "./component/PDF_Filler/downloadPDF";
import Setting from "./component/pages/settings";
import Accomodation_Upload from "./component/Accomodation/Accomodation_Upload";
import Accomodation from "./component/Accomodation/Accomodation";
import Accomodation_UploadRequest from "./component/Accomodation/Accomodation_UploadRequest";
import Notification from  "./component/pages/notification";
import Profile from "./component/pages/profile"
import VerifyEmail from "./component/account/verifyEmail"
import ResetPassword from "./component/account/ResetPassword"
import "./style/firstbody.css";

function App() {
    return (
      <Router>
        <Switch>

            <Route path="/"exact component={Home}/>

            <Route path="/login" component={Login}/>
            
            <Route path="/signup" component={Signup}/>

            <Route path="/home/profile" component={Profile}/>
            
            <Route path="/verifyEmail" component={VerifyEmail}/>

            <Route path="/resetPassword/:id" component={ResetPassword}/>

            <Route path="/home/:id/setting" component={Setting}/>
            
            <Route path="/home/:id/dashboard" component={Dashboard}/> 
            
            <Route path="/home/:id/Accomodation" component={Accomodation}/>
            
            <Route path="/home/:id/uploadPDF" component={UploadPDF}/>
            
            <Route path="/home/:id/Accomodation_Upload" component={Accomodation_Upload}/>
            
            <Route path="/home/:id/notification" component={Notification}/>

            <Route path="/home/:id/Accomodation_UploadRequest" component={Accomodation_UploadRequest}/>
           
            <Route path="/home/:id/profile" component={Profile}/>
            
            <Route path="/home/:id/uploadBook" component={uploadBook}/>
           
            <Route path="/home/:id" component={Home}/>
       
            <Route path="/details/:name" component={Detail}/>
            
            <Route path="/downloadPDF/:name" component={downloadPDF}/>
  
        </Switch>
      </Router>
    )
}

export default App;
