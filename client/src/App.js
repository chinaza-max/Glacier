//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import Home from "./component/home";
import uploadBook from "./component/sub-components/uploadBook";
import Signup from "./component/signup";
import Login from "./component/login";
import Dashboard from "./component/dashboard";
import Detail from "./component/detail";
import UploadPDF from "./component/uploadPDF";
import downloadPDF from "./component/downloadPDF";
import Setting from "./component/settings";
import Accomodation_Upload from "./component/Accomodation_Upload";
import Accomodation from "./component/Accomodation";
import Accomodation_UploadRequest from "./component/Accomodation_UploadRequest/Accomodation_UploadRequest";
import Notification from  "./component/notification";
import Profile from "./component/profile"
import "./style/firstbody.css";

function App() {
    return (
      <Router>
        <Switch>
          
            <Route path="/"exact component={Home}/>
            
            <Route path="/login" component={Login}/>
            
            <Route path="/signup" component={Signup}/>

            <Route path="/profile" component={Profile}/>
            
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
//   <Route path="/home/:id/:upload/:dashboard" component={Dashboard}/>
//allow an app through Windows Firewall