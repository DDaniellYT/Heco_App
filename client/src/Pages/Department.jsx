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

    const [hrProg,setHrProg] = useState(undefined);
    const [mechProg,setMechProg] = useState(undefined);
    const [chemProg,setChemProg] = useState(undefined);
    const [workProg,setWorkProg] = useState(undefined);
    const [secProg,setSecProg] = useState(undefined);
    const [cleanProg,setCleanProg] = useState(undefined);

    // console.log(navState.state);
    useEffect(()=>{
        document.getElementById("root").className = styles.root;
        axios.get(`http://${ipOfServer}:8080/requests`,{params:{reciever_role:props.department,accepted:'YES'}}).then(req => setInfoAccepted(req.data));
        axios.get(`http://${ipOfServer}:8080/requests`,{params:{reciever_role:props.department,accepted:'NO'}}).then(req => setInfoRequests(req.data));
        getProg(props.department,ipOfServer).then(prog => {
            switch (props.department){
                case 'HResources' : setHrProg(prog);break;
                case 'Mechanics' : setMechProg(prog);break;
                case 'Chemists' : setChemProg(prog);break;
                case 'Workers' : setWorkProg(prog);break;
                case 'Security' : setSecProg(prog);break;
                case 'Cleaning' : setCleanProg(prog);break;
            }
        });
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
                {hrProg!=undefined?<Stats hrProg={hrProg} />:null}
                {mechProg!=undefined?<Stats mechProg={mechProg} />:null}
                {chemProg!=undefined?<Stats chemProg={chemProg} />:null}
                {workProg!=undefined?<Stats workProg={workProg} />:null}
                {secProg!=undefined?<Stats secProg={secProg} />:null}
                {cleanProg!=undefined?<Stats cleanProg={cleanProg} />:null}
            </div>
        </div>    
    </div>
}

export default Department;