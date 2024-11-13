import React , { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login"
import AdminPortal from "./Pages/Admin/AdminPortal"
import RequestPage from "./Pages/RequestPage"
import ResponsePage from "./Pages/ResponsePage"
import ErrorPage from "./Pages/ErrorPage";
import Department from "./Pages/Department";

// import DEP_General from "./Pages/DEP_General";
// import DEP_HumanResources from "./Pages/DEP_HumanResources";


function App(){
    const [user,setUser] = useState({});
    const ipOfServer = '192.168.0.104';
    return <Router>
        <Routes>
            <Route exact path = "/" element = {<Login user={user} ipOfServer={ipOfServer}/>}/>
            <Route path = "/error" element = {<ErrorPage/>}/>
            <Route path = "/admin" element = {<AdminPortal/>}/>
            <Route path = "/request" element = {<RequestPage/>}/>
            <Route path = "/response" element = {<ResponsePage/>}/>
            <Route path = "/DEP_HR" element = {<Department department='HResources' ipOfServer={ipOfServer} key='HResources'/>}/>
            <Route path = "/DEP_Mechanics" element = {<Department department='Mechanics' ipOfServer={ipOfServer} key='Mechanics'/>}/>
            <Route path = "/DEP_Chemists" element = {<Department department='Chemists' ipOfServer={ipOfServer} key='Chemists'/>}/>
            <Route path = "/DEP_Security" element = {<Department department='Security' ipOfServer={ipOfServer} key='Security'/>}/>
            <Route path = "/DEP_Workers" element = {<Department department='Workers' ipOfServer={ipOfServer} key='Workers'/>}/>
            <Route path = "/DEP_Cleaning" element = {<Department department='Cleaning' ipOfServer={ipOfServer} key='Cleaning'/>}/>
        </Routes>
    </Router>
}

export default App; 