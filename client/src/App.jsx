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
            <Route path = "/DEP_HR" element = {<Department department='hr' ipOfServer={ipOfServer}/>}/>
            {/* <Route path = "/DEP_General" element = {<DEP_General/>}/>
            <Route path = "/DEP_HumanResources" element = {<DEP_HumanResources/>}/> */}
        </Routes>
    </Router>
}

export default App; 