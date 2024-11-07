import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import styles from "../Styles/DEP_HR.module.css";
import activity from "../Styles/Activity.module.css";
import profile from "../Styles/Profile.module.css";
import stats from "../Styles/Stats.module.css";

import NavBar from "./Admin/NavBar";
import Activity from "./Admin/Activity";
import Profile from "./Admin/Profile";
import Stats from "./Admin/Stats";

const DEP_HR = () => {
    const [requestPage,setRequestPage] = useState(false);
    const [infoRequests,setInfoRequests] = useState([]);
    const [infoAccepted,setInfoAccepted] = useState([]);
    const [change,setChange] = useState(false);

    const [hrProg,setHrProg] = useState(50);

    useEffect(()=>{
        document.getElementById("root").className = styles.root;
        axios.get('http://localhost:8080/requests',{params:{reciever:'hr',accepted:'yes'}}).then(req => setInfoAccepted(req.data));
        axios.get('http://localhost:8080/requests',{params:{reciever:'hr',accepted:'no'}}).then(req => setInfoRequests(req.data));
    },[change]);

    return <div className={styles.container}>
        <NavBar change={change} setChange={setChange} requestPage={requestPage} setRequestPage={setRequestPage}/>
        <div className={activity.info}>
            <Activity change={change} setChange={setChange} requestPage={requestPage} infoRequests={infoRequests} setInfoRequests={setInfoRequests} infoAccepted={infoAccepted} setInfoAccepted={setInfoAccepted}/>    
        </div>
        <div className={profile.profileContainer}>
            {/* <ProfileList change={change} setChange={setChange}/> */}
        </div>
        <div className={stats.quickContainer}>
            <Stats hrProg={hrProg}/>
        </div>
        
        </div>

}

export default DEP_HR;