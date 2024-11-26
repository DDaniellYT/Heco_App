import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from '../Styles/AdminPortal.module.css';
import activity from '../Styles/Activity.module.css'
import profile from '../Styles/Profile.module.css'
import stats from "../Styles/Stats.module.css";
import NavBar from "./NavBar";
import Activity from "./Activity";
import Profile from "./Profile";
import Stats from "./Stats";
import Chat from "./Chat";

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

    const nav = useNavigate();
    const navState = useLocation();

    const [state,setState] = useState('chat');
    const [chatState,setChatState] = useState(2);
    const [swapDropDown,setSwapDropDown] = useState(false);

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
                width={props.width}
                height={props.height}
                smallDim={props.smallDim}
                largeDim={props.largeDim}
                ipOfServer={props.ipOfServer} 
                httpPort={props.httpPort}/>
        <div className={styles.footerContainer}>
            <div className={styles.footer}>
            <div className={styles.clockButton} onClick={()=>{
                axios.post(`http://${props.ipOfServer}:${props.httpPort}/user`,{user:{id:user.id,existance:'OUT'}}).then(req => {
                    nav('/',{state:{}});
                })
            }}>Clock OUT</div>
            <div className={styles.chatButton} onClick={()=>{
                setState('chat');
                setChatState(1);
            }}>Chat</div>
            </div>
        </div>
        <div className={styles.interface}>
            <div className={activity.info}>
            {props.width<props.largeDim?<div style={swapDropDown?state==='chat'?{borderRadius:'10px 10px 2px 2px',backgroundColor:'#686D76'}:null:state==='chat'?{backgroundColor:'#686D76'}:null} className={styles.swapMenuButton} onClick={()=>{setSwapDropDown(true)}} onMouseLeave={()=>{setSwapDropDown(false)}}>
                <label>Swap</label>
                {swapDropDown?<div onClick={(e)=>{e.stopPropagation();setState('accepted');setSwapDropDown(false)}} style={{borderRight:'2px solid black',borderLeft:'2px solid black'}} className={styles.swapButton}><label>Accepted</label></div>:null}
                {swapDropDown?<div onClick={(e)=>{e.stopPropagation();setState('stats');setSwapDropDown(false)}} style={{borderRight:'2px solid black',borderLeft:'2px solid black'}} className={styles.swapButton}><label>Stats</label></div>:null}
                {swapDropDown?<div onClick={(e)=>{e.stopPropagation();setState('all');setSwapDropDown(false)}} style={{borderRadius:'0px 0px 10px 10px',borderBottom:'2px solid black',borderRight:'2px solid black',borderLeft:'2px solid black'}} className={styles.swapButton}><label>All</label></div>:null}
            </div>:null}
            {state==='all'?
                <Activity key={0} department={user.department} 
                    title={'All Tasks'}
                    permisions={1}
                    user={user} 
                    change={change} 
                    setChange={setChange} 
                    infoRequests={infoRequests}
                    width={props.width}
                    height={props.height}
                    smallDim={props.smallDim}
                    largeDim={props.largeDim}
                    ipOfServer={props.ipOfServer} 
                    httpPort={props.httpPort}/>
             :state==='stats'?
                <Stats hrProg={hrProg} 
                    mechProg={mechProg} 
                    chemProg={chemProg} 
                    workProg={workProg} 
                    secProg={secProg} 
                    cleanProg={cleanProg}
                    width={props.width}
                    height={props.height}/>
             :state==='accepted'?
                <Activity key={1} department={user.department} 
                    title={'Accepted Tasks'}
                    permisions={3}
                    user={user} 
                    change={change} 
                    setChange={setChange} 
                    infoRequests={infoAccepted}                     
                    width={props.width}
                    height={props.height}
                    smallDim={props.smallDim}
                    largeDim={props.largeDim}
                    ipOfServer={props.ipOfServer} 
                    httpPort={props.httpPort}/>
             :state==='chat'?
                <Chat user={user} 
                    userNames={userNames} 
                    chatState={chatState} 
                    setChatState={setChatState} 
                    ipOfServer={props.ipOfServer} 
                    httpPort={props.httpPort} 
                    wsPort={props.wsPort}/>
                :null}
            </div>
        </div>
    </div>;

}
export default HomePage;