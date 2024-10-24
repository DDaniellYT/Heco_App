import React, { useEffect } from "react";
import { useState } from "react";
import styles from '../../Styles/AdminPortal.module.css'
import axios from "axios";

import NavBar from "./NavBar";
import Requests from "./Requests";
import Profile from "./Profile";

function AdminPortal(){
    const [requestPage,setRequestPage] = useState(false);
    const [infoRequests,setInfoRequests] = useState([]);
    const [infoAccepted,setInfoAccepted] = useState([]);
    const [change,setChange] = useState(false);

    document.getElementById("root").className=styles.root;

    useEffect(()=>{
        axios.get('http://localhost:8080/lists').then((req,res)=>{
            setInfoAccepted(req.data.accepted);
            setInfoRequests(req.data.requests);
        })
        setChange(false);
    },[change])

    return <div className={styles.container}>
            <NavBar change={change} setChange={setChange} requestPage={requestPage} setRequestPage={setRequestPage}/>
            <Requests change={change} setChange={setChange} requestPage={requestPage} infoRequests={infoRequests} setInfoRequests={setInfoRequests} infoAccepted={infoAccepted} setInfoAccepted={setInfoAccepted}/>
            <Profile infoAccepted={infoAccepted}/>
        </div>
}
export default AdminPortal;