import React from "react";
import {useParams,Link } from "react-router-dom";                                                                                                                


function NavDetail(){

        return(
            <ul className="nav justify-content-center" style={{backgroundColor: "black"}}>
            <li className="nav-item">
              <a className="nav-link active" href="/" style={{color: "white"}}>Active</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/" style={{color: "white"}}>Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/" style={{color: "white"}}>Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="/" tabIndex="-1" aria-disabled="true">Disabled</a>
            </li>
    </ul>
        )
    }

export default NavDetail;          