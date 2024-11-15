import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login"
import HomePage from "./Pages/Admin/HomePage"
import RequestPage from "./Pages/RequestPage"
import ResponsePage from "./Pages/ResponsePage"
import ErrorPage from "./Pages/ErrorPage";
import Department from "./Pages/Department";
import Inventory from "./Pages/Inventory";


function App(){
    const ipOfServer = '192.168.0.104';
    return <Router>
        <Routes>
            <Route exact path = "/" element = {<Login ipOfServer={ipOfServer}/>}/>
            <Route path = "/error" element = {<ErrorPage/>}/>
            <Route path = "/home" element = {<HomePage/>}/>
            <Route path = "/inventory" element = {<Inventory ipOfServer={ipOfServer}/>}/>
            <Route path = "/request" element = {<RequestPage/>}/>
            <Route path = "/response" element = {<ResponsePage/>}/>
            <Route path = "/DEP_HR" element = {<Department department='HResources' ipOfServer={ipOfServer} key='HResources'/>}/>
            <Route path = "/DEP_Mechanics" element = {<Department department='Mechanics' ipOfServer={ipOfServer} key='Mechanics'/>}/>
            <Route path = "/DEP_Chemists" element = {<Department department='Chemists' ipOfServer={ipOfServer} key='Chemists'/>}/>
            <Route path = "/DEP_Security" element = {<Department department='Security' ipOfServer={ipOfServer} key='Security'/>}/>
            <Route path = "/DEP_Workers" element = {<Department department='Workers' ipOfServer={ipOfServer} key='Workers'/>}/>
            <Route path = "/DEP_Cleaning" element = {<Department department='Cleaning' ipOfServer={ipOfServer} key='Cleaning'/>}/>
            <Route path = "*" element = {<ErrorPage />}/>
        </Routes>
    </Router>
}

export default App; 