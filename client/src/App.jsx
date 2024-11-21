import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login"
import HomePage from "./Pages/Admin/HomePage"
import ErrorPage from "./Pages/ErrorPage";
import Department from "./Pages/Department";
import Inventory from "./Pages/Inventory";


function App(){
    // const ipOfServer = '192.168.0.104';
    const ipOfServer = 'localhost';
    const httpPort = '8080';
    const wsPort = '8081';

    return <Router>
        <Routes>
            <Route exact path = "/" element = {<Login ipOfServer={ipOfServer} httpPort={httpPort} wsPort={wsPort}/>}/>
            <Route path = "/error" element = {<ErrorPage/>}/>
            <Route path = "/home" element = {<HomePage ipOfServer={ipOfServer} httpPort={httpPort} wsPort={wsPort}/>}/>
            <Route path = "/inventory" element = {<Inventory ipOfServer={ipOfServer} httpPort={httpPort} wsPort={wsPort}/>}/>
            <Route path = "/DEP_HR" element = {<Department department='HResources' ipOfServer={ipOfServer} httpPort={httpPort} wsPort={wsPort} key='HResources'/>}/>
            <Route path = "/DEP_Mechanics" element = {<Department department='Mechanics' ipOfServer={ipOfServer} httpPort={httpPort} wsPort={wsPort} key='Mechanics'/>}/>
            <Route path = "/DEP_Chemists" element = {<Department department='Chemists' ipOfServer={ipOfServer} httpPort={httpPort} wsPort={wsPort} key='Chemists'/>}/>
            <Route path = "/DEP_Security" element = {<Department department='Security' ipOfServer={ipOfServer} httpPort={httpPort} wsPort={wsPort} key='Security'/>}/>
            <Route path = "/DEP_Workers" element = {<Department department='Workers' ipOfServer={ipOfServer} httpPort={httpPort} wsPort={wsPort} key='Workers'/>}/>
            <Route path = "/DEP_Cleaning" element = {<Department department='Cleaning' ipOfServer={ipOfServer} httpPort={httpPort} wsPort={wsPort} key='Cleaning'/>}/>
            <Route path = "*" element = {<ErrorPage />}/>
        </Routes>
    </Router>
}

export default App; 