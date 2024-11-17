import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from '../../Styles/AdminPortal.module.css';
import activity from '../../Styles/Activity.module.css'
import profile from '../../Styles/Profile.module.css'
import stats from "../../Styles/Stats.module.css";

import NavBar from "./NavBar";
import Activity from "./Activity";
import Profile from "./Profile";
import Stats from "../Stats";

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

function HomePage(props){

    const navState = useLocation();
    const [requestPage,setRequestPage] = useState(false);
    const [infoRequests,setInfoRequests] = useState([]);
    const [infoAccepted,setInfoAccepted] = useState([]);
    const [change,setChange] = useState(false);
    const [photo,setPhoto] = useState(null);

    const user = {...navState.state};

    const [hrProg,setHrProg] = useState(50);
    const [mechProg,setMechProg] = useState(50);
    const [chemProg,setChemProg] = useState(50);
    const [workProg,setWorkProg] = useState(50);
    const [secProg,setSecProg] = useState(50);
    const [cleanProg,setCleanProg] = useState(50);

    useEffect(()=>{
        document.getElementById("root").className = styles.root;
        axios.get(`http://${props.ipOfServer}:8080/requests`,{params:{reciever:user.userName, accepted:'YES'}}).then(req => setInfoAccepted(req.data));
        axios.get(`http://${props.ipOfServer}:8080/requests`,{params:{reciever_role:user.department,accepted:'NO'}}).then(req => setInfoRequests(req.data));
        getProg('HResources',props.ipOfServer).then(prog => setHrProg(prog));
        getProg('Mechanics',props.ipOfServer).then(prog => setMechProg(prog));
        getProg('Chemists',props.ipOfServer).then(prog => setChemProg(prog));
        getProg('Workers',props.ipOfServer).then(prog => setWorkProg(prog));
        getProg('Security',props.ipOfServer).then(prog => setSecProg(prog));
        getProg('Cleaning',props.ipOfServer).then(prog => setCleanProg(prog));
    },[change]);
    
    return <div className={styles.container}>
        <NavBar user={user} ipOfServer={props.ipOfServer} change={change} setChange={setChange} requestPage={requestPage} setRequestPage={setRequestPage}/>
        <div className={styles.interface}>
            <div className={activity.info}>
                <Activity user={user} ipOfServer={props.ipOfServer} change={change} setChange={setChange} requestPage={requestPage} infoRequests={infoRequests} setInfoRequests={setInfoRequests} infoAccepted={infoAccepted} setInfoAccepted={setInfoAccepted}/> 
            </div>
            <div className={profile.profileContainer}>
                <Profile ipOfServer={props.ipOfServer} user={user} photo={photo} change={change} setChange={setChange} infoAccepted={infoAccepted}/>
            </div>
            <div className={stats.quickContainer}>
                <Stats hrProg={hrProg} mechProg={mechProg} chemProg={chemProg} workProg={workProg} secProg={secProg} cleanProg={cleanProg}/>
            </div>
        </div>
    </div>;

}
export default HomePage;