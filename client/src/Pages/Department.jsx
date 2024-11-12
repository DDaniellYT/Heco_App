import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";

import styles from "../Styles/Department.module.css";
import activity from "../Styles/Activity.module.css";
import profile from "../Styles/Profile.module.css";
import stats from "../Styles/Stats.module.css";

import NavBar from "./Admin/NavBar";
import Activity from "./Admin/Activity";
import ProfileList from "./ProfileList"
import Stats from "./Stats";

async function getProg(rec,ip){
    var prog = 0;
    await axios.get(`http://${ip}:8080/requests`,{params:{reciever_role:`${rec}`}}).then(async (req,res)=>{
        const tempAll = req.data;
        const tempNo = tempAll.filter((item)=>{
            if(item.accepted == 'NO')return item;
        })
        const tempYes = tempAll.filter((item)=>{
            if(item.accepted == 'YES')return item;
        })
        prog = (tempYes.length+tempNo.length)==0?0:(tempYes.length/(tempYes.length+tempNo.length)*100).toFixed(0);
        console.log(prog);
    });
    return prog;
}
const Department = (props) => {
    const ipOfServer = props.ipOfServer;

    const user = useLocation().state;

    const [requestPage,setRequestPage] = useState(false);
    const [infoRequests,setInfoRequests] = useState([]);
    const [infoAccepted,setInfoAccepted] = useState([]);
    const [change,setChange] = useState(false);

    const [hrProg,setHrProg] = useState(50);

    // console.log(navState.state);
    useEffect(()=>{
        document.getElementById("root").className = styles.root;
        axios.get(`http://${ipOfServer}:8080/requests`,{params:{reciever_role:'HResources',accepted:'YES'}}).then(req => setInfoAccepted(req.data));
        axios.get(`http://${ipOfServer}:8080/requests`,{params:{reciever_role:'HResources',accepted:'NO'}}).then(req => setInfoRequests(req.data));
        getProg('HResources',ipOfServer).then(prog => setHrProg(prog));
    },[change]);

    return <div className={styles.container}>
        <NavBar user={user} ipOfServer={ipOfServer} change={change} setChange={setChange} requestPage={requestPage} setRequestPage={setRequestPage}/>
        <div className={styles.interface}>
            <div className={activity.info}>
                <Activity user={user} ipOfServer={ipOfServer} change={change} setChange={setChange} requestPage={requestPage} infoRequests={infoRequests} setInfoRequests={setInfoRequests} infoAccepted={infoAccepted} setInfoAccepted={setInfoAccepted}/>    
            </div>
            {/* <div className={profileList.}>
            </div> */}
            <ProfileList department={props.department} ipOfServer={ipOfServer} change={change} setChange={setChange}/>
            <div className={stats.quickContainer}>
                <Stats hrProg={hrProg}/>
            </div>
        </div>    
    </div>
}

export default Department;