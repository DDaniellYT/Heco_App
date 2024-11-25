import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login"
import HomePage from "./Pages/HomePage"
import ErrorPage from "./Pages/ErrorPage";
import Department from "./Pages/Department";
import Inventory from "./Pages/Inventory";

function App(){
    const ipOfServer= 'localhost';
    // const ipOfServer= '192.168.198.147';
    const httpPort = '8080';
    const wsPort = '8081';

    const smallDim = 450;
    const largeDim = 1000;

    return <Router>
        <Routes>
            <Route exact path = "/" element = {<Login  smallDim={smallDim} largeDim={largeDim} ipOfServer={ipOfServer} httpPort={httpPort} wsPort={wsPort}/>}/>
            <Route path = "/error" element = {<ErrorPage smallDim={smallDim} largeDim={largeDim}/>}/>
            <Route path = "/home" element = {<HomePage  smallDim={smallDim} largeDim={largeDim} ipOfServer={ipOfServer} httpPort={httpPort} wsPort={wsPort}/>}/>
            <Route path = "/inventory" element = {<Inventory  smallDim={smallDim} largeDim={largeDim} ipOfServer={ipOfServer} httpPort={httpPort} wsPort={wsPort}/>}/>
            <Route path = "/DEP_HR" element = {<Department smallDim={smallDim} largeDim={largeDim} department='HResources' ipOfServer={ipOfServer} httpPort={httpPort} wsPort={wsPort} key='HResources'/>}/>
            <Route path = "/DEP_Mechanics" element = {<Department smallDim={smallDim} largeDim={largeDim} department='Mechanics' ipOfServer={ipOfServer} httpPort={httpPort} wsPort={wsPort} key='Mechanics'/>}/>
            <Route path = "/DEP_Chemists" element = {<Department smallDim={smallDim} largeDim={largeDim} department='Chemists' ipOfServer={ipOfServer} httpPort={httpPort} wsPort={wsPort} key='Chemists'/>}/>
            <Route path = "/DEP_Security" element = {<Department smallDim={smallDim} largeDim={largeDim} department='Security' ipOfServer={ipOfServer} httpPort={httpPort} wsPort={wsPort} key='Security'/>}/>
            <Route path = "/DEP_Workers" element = {<Department smallDim={smallDim} largeDim={largeDim} department='Workers' ipOfServer={ipOfServer} httpPort={httpPort} wsPort={wsPort} key='Workers'/>}/>
            <Route path = "/DEP_Cleaning" element = {<Department smallDim={smallDim} largeDim={largeDim} department='Cleaning' ipOfServer={ipOfServer} httpPort={httpPort} wsPort={wsPort} key='Cleaning'/>}/>
            <Route path = "*" element = {<ErrorPage />}/>
        </Routes>
    </Router>
}

export default App; 