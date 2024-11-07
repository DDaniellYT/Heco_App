import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login"
import AdminPortal from "./Pages/Admin/AdminPortal"
import RequestPage from "./Pages/RequestPage"
import ResponsePage from "./Pages/ResponsePage"
import ErrorPage from "./Pages/ErrorPage";
import DEP_HR from "./Pages/DEP_HR";

// import DEP_General from "./Pages/DEP_General";
// import DEP_HumanResources from "./Pages/DEP_HumanResources";


function App(){
    return <Router>
        <Routes>
            <Route exact path = "/" element = {<Login/>}/>
            <Route path = "/error" element = {<ErrorPage/>}/>
            <Route path = "/admin" element = {<AdminPortal/>}/>
            <Route path = "/request" element = {<RequestPage/>}/>
            <Route path = "/response" element = {<ResponsePage/>}/>
            <Route path = "/DEP_HR" element = {<DEP_HR/>}/>
            {/* <Route path = "/DEP_General" element = {<DEP_General/>}/>
            <Route path = "/DEP_HumanResources" element = {<DEP_HumanResources/>}/> */}
        </Routes>
    </Router>
}

export default App; 