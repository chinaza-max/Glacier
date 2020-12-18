import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./component/home"
import Upload from "./component/sub-components/upload"


function App() {
    return (
      <Router>
        <Switch>
          <Route path="/"exact component={Home}/>
          <Route path="/upload" component={Upload}/>
        </Switch>
      </Router>
    )
}

export default App;
