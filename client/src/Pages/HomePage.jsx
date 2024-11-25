import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from '../Styles/AdminPortal.module.css';
import activity from '../Styles/Activity.module.css'
import profile from '../Styles/Profile.module.css'
import stats from "../Styles/Stats.module.css";

import NavBar from "./NavBar";
import Activity from "./Activity";
import Profile from "./Profile";
import Stats from "./Stats";

async function getProg(rec,ip,port){
    var prog = 0;
    await axios.get(`http://${ip}:${port}/requests`,{params:{reciever_role:`${rec}`}}).then(async (req,res)=>{
        const tempAll = req.data;
        const tempNo = tempAll.filter( item =>{if(item.accepted === 'NO')return item})
        const tempYes = tempAll.filter( item =>{if(item.accepted === 'YES')return item})
        prog = (tempYes.length+tempNo.length)===0?0:(tempYes.length/(tempYes.length+tempNo.length)*100).toFixed(0);
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

    const [user,setUser] = useState({...navState.state});
    const [userNames,setUserNames] = useState([]);

    const [hrProg,setHrProg] = useState(50);
    const [mechProg,setMechProg] = useState(50);
    const [chemProg,setChemProg] = useState(50);
    const [workProg,setWorkProg] = useState(50);
    const [secProg,setSecProg] = useState(50);
    const [cleanProg,setCleanProg] = useState(50);

    const [windowWidth,setWindowWidth] = useState(window.innerWidth);
    const [windowHeight,setWindowHeight] = useState(window.innerHeight);
    useEffect(()=>{
        window.addEventListener('resize',()=>{
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        })
    })

    useEffect(()=>{
        document.getElementById("root").className = styles.root;
        axios.get(`http://${props.ipOfServer}:${props.httpPort}/requests`,{params:{reciever:user.userName, accepted:'YES'}}).then(req => {
            let tempArr = [];
            for(let i = req.data.length-1; i>=0 ;i--)
                tempArr.push(req.data[i]);
            setInfoAccepted(tempArr);
        });
        axios.get(`http://${props.ipOfServer}:${props.httpPort}/requests`,{params:{reciever_role:user.department,accepted:'NO'}}).then(req => {
            let tempArr = [];
            for(let i = req.data.length-1; i>=0 ;i--)
                tempArr.push(req.data[i]);
            setInfoRequests(tempArr);
        });
        axios.get(`http://${props.ipOfServer}:${props.httpPort}/user`,{params:{user:{id:user.id}}}).then( req => setUser(req.data));
        axios.get(`http://${props.ipOfServer}:${props.httpPort}/user`).then((req) => {
            let tempArr = [];
            req.data.map(item =>{
                if(item.userName!==user.userName)
                    tempArr.push(item.userName);
            });
            setUserNames(tempArr);
        });

        getProg('HResources',props.ipOfServer,props.httpPort).then(prog => setHrProg(prog));
        getProg('Mechanics',props.ipOfServer,props.httpPort).then(prog => setMechProg(prog));
        getProg('Chemists',props.ipOfServer,props.httpPort).then(prog => setChemProg(prog));
        getProg('Workers',props.ipOfServer,props.httpPort).then(prog => setWorkProg(prog));
        getProg('Security',props.ipOfServer,props.httpPort).then(prog => setSecProg(prog));
        getProg('Cleaning',props.ipOfServer,props.httpPort).then(prog => setCleanProg(prog));
    },[change]);
    
    return <div className={styles.container}>
        <NavBar user={user} 
                infoAccepted={infoAccepted}
                change={change} 
                setChange={setChange} 
                requestPage={requestPage} 
                setRequestPage={setRequestPage} 
                width={windowWidth}
                height={windowHeight}
                smallDim={props.smallDim}
                largeDim={props.largeDim}
                ipOfServer={props.ipOfServer} 
                httpPort={props.httpPort}/>

        <div className={styles.interface}>
            <div className={activity.info}>
                <Activity department={user.department} 
                            user={user} 
                            change={change} 
                            setChange={setChange} 
                            requestPage={requestPage} 
                            infoRequests={infoRequests} 
                            setInfoRequests={setInfoRequests} 
                            infoAccepted={infoAccepted} 
                            setInfoAccepted={setInfoAccepted} 
                            width={windowWidth}
                            height={windowHeight}
                            ipOfServer={props.ipOfServer} 
                            httpPort={props.httpPort}/>
            </div>
            {/* <div className={profile.profileContainer}>
                <Profile userNames={userNames} 
                            user={user} 
                            photo={photo} 
                            change={change} 
                            setChange={setChange} 
                            infoAccepted={infoAccepted} 
                            width={windowWidth}
                            height={windowHeight}
                            ipOfServer={props.ipOfServer} 
                            httpPort={props.httpPort} 
                            wsPort={props.wsPort}/>
            </div>
            <div className={stats.quickContainer}>
                <Stats hrProg={hrProg} 
                        mechProg={mechProg} 
                        chemProg={chemProg} 
                        workProg={workProg} 
                        secProg={secProg} 
                        cleanProg={cleanProg}
                        width={windowWidth}
                        height={windowHeight}/>
            </div> */}
        </div>
    </div>;

}
export default HomePage;