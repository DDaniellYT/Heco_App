import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from '../../Styles/AdminPortal.module.css';
import activity from '../../Styles/Activity.module.css'
import profile from '../../Styles/Profile.module.css'
import stats from "../../Styles/Stats.module.css";


import photo from '../../profileImages/heco_slider_img3.jpg';

import NavBar from "./NavBar";
import Activity from "./Activity";
import Profile from "./Profile";
import Stats from "../Stats";

async function getProg(rec,ip){
    var prog = 0;
    await axios.get(`http://${ip}:8080/requests`,{params:{reciever_role:`${rec}`}}).then(async (req,res)=>{
        const tempAll = req.data;
        const tempYes = tempAll.filter((item)=>{
            if(item.accepted == 'yes')return item;
        })
        prog = tempAll.length==0?0:(tempYes.length/tempAll.length*100).toFixed(0);
        console.log(prog);
    });
    return prog;
}

function AdminPortal(){
    const ipOfServer = '192.168.0.104';

    const navState = useLocation();
    const [requestPage,setRequestPage] = useState(false);
    const [infoRequests,setInfoRequests] = useState([]);
    const [infoAccepted,setInfoAccepted] = useState([]);
    const [change,setChange] = useState(false);
    const [user,setUser] = useState({userName:navState.state.userName});

    const [hrProg,setHrProg] = useState(50);
    const [mechProg,setMechProg] = useState(50);
    const [chemProg,setChemProg] = useState(50);
    const [workProg,setWorkProg] = useState(50);
    const [secProg,setSecProg] = useState(50);
    const [cleanProg,setCleanProg] = useState(50);

    useEffect(()=>{
        document.getElementById("root").className = styles.root;
        axios.get(`http://${ipOfServer}:8080/requests`,{params:{accepted:'YES'}}).then(req => setInfoAccepted(req.data));
        axios.get(`http://${ipOfServer}:8080/requests`,{params:{accepted:'NO'}}).then(req => setInfoRequests(req.data));
        axios.get(`http://${ipOfServer}:8080/user`,{params:{userName:user.userName}}).then(req => setUser(req.data));
        getProg('HResources',ipOfServer).then(prog => setHrProg(prog));
        getProg('Mechanics',ipOfServer).then(prog => setMechProg(prog));
        getProg('Chemists',ipOfServer).then(prog => setChemProg(prog));
        getProg('Workers',ipOfServer).then(prog => setWorkProg(prog));
        getProg('Security',ipOfServer).then(prog => setSecProg(prog));
        getProg('Cleaning',ipOfServer).then(prog => setCleanProg(prog));
    },[change]);
    return <div className={styles.container}>
        <NavBar user={user} ipOfServer={ipOfServer} change={change} setChange={setChange} requestPage={requestPage} setRequestPage={setRequestPage}/>
        <div className={styles.interface}>
            <div className={activity.info}>
                <Activity user={user} ipOfServer={ipOfServer} change={change} setChange={setChange} requestPage={requestPage} infoRequests={infoRequests} setInfoRequests={setInfoRequests} infoAccepted={infoAccepted} setInfoAccepted={setInfoAccepted}/> 
            </div>
            <div className={profile.profileContainer}>
                <Profile ipOfServer={ipOfServer} user={user} setUser={setUser} photoLink={photo} change={change} setChange={setChange} infoAccepted={infoAccepted}/>
            </div>
            <div className={stats.quickContainer}>
                <Stats hrProg={hrProg} mechProg={mechProg} chemProg={chemProg} workProg={workProg} secProg={secProg} cleanProg={cleanProg}/>
            </div>
        </div>
    </div>;

}
export default AdminPortal;