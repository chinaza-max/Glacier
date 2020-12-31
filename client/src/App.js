import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./component/home"
import Upload from "./component/sub-components/upload"
import Signup from "./component/signup"
import Login from "./component/login"
import Settings from "./component/settings"
import Detail from "./component/detail"
import "./style/firstbody.css"

function App() {
    return (
      <Router>
        <Switch>
          <Route path="/"exact component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/upload/:id" component={Upload}/>
          <Route path="/home/:id" component={Home}/>
          <Route path="/details/:id/:name" component={Detail}/>
          <Route path="/settings/:id" component={Settings}/>
        </Switch>
      </Router>
    )
}

export default App;
