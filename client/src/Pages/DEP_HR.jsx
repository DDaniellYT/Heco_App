import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";

import styles from "../Styles/DEP_HR.module.css";
import activity from "../Styles/Activity.module.css";
import profile from "../Styles/Profile.module.css";
import stats from "../Styles/Stats.module.css";

import NavBar from "./Admin/NavBar";
import Activity from "./Admin/Activity";
import Profile from "./Admin/Profile";
import ProfileList from "./ProfileList"
import Stats from "./Stats";

async function getProg(rec,ip){
    var prog = 0;
    await axios.get(`http://${ip}:8080/requests`,{params:{reciever:`${rec}`}}).then(async (req,res)=>{
        const tempAll = req.data;
        const tempYes = tempAll.filter((item)=>{
            if(item.accepted == 'yes')return item;
        })
        prog = tempAll.length==0?0:(tempYes.length/tempAll.length*100).toFixed(0);
    });
    return prog;
}
const DEP_HR = () => {
    const ipOfServer = '192.168.0.104';

    const [requestPage,setRequestPage] = useState(false);
    const [infoRequests,setInfoRequests] = useState([]);
    const [infoAccepted,setInfoAccepted] = useState([]);
    const [change,setChange] = useState(false);
    const navState = useLocation();

    const [hrProg,setHrProg] = useState(50);

    console.log(navState.state);
    useEffect(()=>{
        document.getElementById("root").className = styles.root;
        axios.get(`http://${ipOfServer}:8080/requests`,{params:{reciever:'HResources',accepted:'yes'}}).then(req => setInfoAccepted(req.data));
        axios.get(`http://${ipOfServer}:8080/requests`,{params:{reciever:'HResources',accepted:'no'}}).then(req => setInfoRequests(req.data));
        getProg('HResources',ipOfServer).then(prog => setHrProg(prog));
    },[change]);

    return <div className={styles.container}>
        <NavBar user={navState.state} ipOfServer={ipOfServer} change={change} setChange={setChange} requestPage={requestPage} setRequestPage={setRequestPage}/>
        <div className={styles.interface}>
            <div className={activity.info}>
                <Activity ipOfServer={ipOfServer} change={change} setChange={setChange} requestPage={requestPage} infoRequests={infoRequests} setInfoRequests={setInfoRequests} infoAccepted={infoAccepted} setInfoAccepted={setInfoAccepted}/>    
            </div>
            {/* <div className={profileList.}>
            </div> */}
            <ProfileList ipOfServer={ipOfServer} change={change} setChange={setChange}/>
            <div className={stats.quickContainer}>
                <Stats hrProg={hrProg}/>
            </div>
        </div>    
    </div>
}

export default DEP_HR;