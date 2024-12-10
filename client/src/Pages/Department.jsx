import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

import styles from "../Styles/Department.module.css";
import activity from "../Styles/Activity.module.css";
import stats from "../Styles/Stats.module.css";

import NavBar from "./NavBar";
import Activity from "./Activity";
import ProfileList from "./ProfileList"
import Profile from "./Profile"
import Stats from "./Stats";
import Chat from "./Chat"
import AddUserPanel from "./AddUserPanel";

async function getProg(rec,ip,port){
    var prog = 0;
    await axios.get(`http://${ip}:${port}/requests`,{params:{reciever_role:`${rec}`}}).then(async (req,res)=>{
        const tempAll = req.data;
        const tempNo = tempAll.filter((item)=>{
            if(item.accepted == 'NO')return item;
        })
        const tempYes = tempAll.filter((item)=>{
            if(item.accepted == 'YES')return item;
        })
        prog = (tempYes.length+tempNo.length)==0?0:(tempYes.length/(tempYes.length+tempNo.length)*100).toFixed(0);
    });
    return prog;
}
const Department = (props) => {
    const ipOfServer = props.ipOfServer;
    const nav = useNavigate();

    const user = useLocation().state;

    const [clickedUser,setClickedUser] = useState({});
    const [state,setState] = useState('all');
    const [chatState,setChatState] = useState(1);
    const [swapDropDown,setSwapDropDown] = useState(false);

    const [userNames,setUserNames] = useState([]);
    const [image,setImage] = useState(null);

    const [userPanel,setUserPanel] = useState(false);
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

    useEffect(()=>{
        document.getElementById("root").className = styles.root;
        axios.get(`http://${ipOfServer}:${props.httpPort}/requests`,{params:{reciever_role:props.department,accepted:'YES'}}).then(req => setInfoAccepted(req.data));
        axios.get(`http://${ipOfServer}:${props.httpPort}/requests`,{params:{reciever_role:props.department,accepted:'NO'}}).then(req => setInfoRequests(req.data));
        getProg(props.department,ipOfServer,props.httpPort).then(prog => {
            switch (props.department){
                case 'HResources' : setHrProg(prog);break;
                case 'Mechanics' : setMechProg(prog);break;
                case 'Chemists' : setChemProg(prog);break;
                case 'Workers' : setWorkProg(prog);break;
                case 'Security' : setSecProg(prog);break;
                case 'Cleaning' : setCleanProg(prog);break;
            }
        });
        axios.get(`http://${props.ipOfServer}:${props.httpPort}/user`).then((req) => {
            let tempArr = [];
            req.data.map(item =>{
                if(item.userName!==user.userName)
                    tempArr.push(item.userName);
            });
            setUserNames(tempArr);
        });
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
                state={state}
                setState={setState}
                ipOfServer={props.ipOfServer} 
                httpPort={props.httpPort}
                />
        <div className={styles.footerContainer}>
                <div className={styles.footer}>
                <div className={styles.clockButton} onClick={()=>{
                    axios.post(`http://${props.ipOfServer}:${props.httpPort}/user`,{user:{id:user.id,existance:'OUT'}}).then(req => {
                        nav('/',{state:{}});
                    })
                }}>Leave</div>
                <div className={styles.chatButton} onClick={()=>{
                    setState('chat');
                    setChatState(1);
                }}>Chat</div>
                <div style={swapDropDown?{border:'0px',backgroundColor:'rgb(0,0,0,0)'}:null} className={styles.swapMenuButton} onClick={()=>{setSwapDropDown(true)}} onMouseLeave={()=>{setSwapDropDown(false)}}>
                    <label>Swap</label>
                        {swapDropDown?<div className={styles.swapDropDown} style={{
                            transform:'translateY(-15vh)',
                            height:'15vh',
                            gridTemplateRows:'50%',
                            gridAutoRows:'50%'
                        }}>
                        <div onClick={(e)=>{e.stopPropagation();setState('users');setSwapDropDown(false)}} style={{borderRadius:'10px 10px 0px 0px'}} className={styles.swapButton}><label>Users</label></div>
                        <div onClick={(e)=>{e.stopPropagation();setState('all');setSwapDropDown(false)}} style={{borderRadius:'0px 0px 10px 10px'}} className={styles.swapButton}><label>Tasks</label></div>
                    </div>:null}
                </div>
            </div>
        </div>
        <div className={styles.interface}>
            <div className={activity.info}>
            {state === 'all'?
                <Activity key={0} 
                        department={props.department} 
                        title={props.department}
                        permisions={user.department===props.department?'accept':'none'}
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
            :state === 'chat'?
                <Chat user={user} 
                    userNames={userNames}
                    chatState={chatState}
                    setChatState={setChatState}
                    ipOfServer={props.ipOfServer}
                    httpPort={props.httpPort}
                    wsPort={props.wsPort}/>
            :state === 'users'?
                <ProfileList 
                    user={user} 
                    department={props.department} 
                    change={change} 
                    setChange={setChange} 
                    setClickedUser={setClickedUser}
                    setState={setState}
                    ipOfServer={ipOfServer} 
                    httpPort={props.httpPort}/>
            :state === 'stats'?
                <div className={stats.quickContainer}>
                    {hrProg!=undefined?<Stats hrProg={hrProg} />:null}
                    {mechProg!=undefined?<Stats mechProg={mechProg} />:null}
                    {chemProg!=undefined?<Stats chemProg={chemProg} />:null}
                    {workProg!=undefined?<Stats workProg={workProg} />:null}
                    {secProg!=undefined?<Stats secProg={secProg} />:null}
                    {cleanProg!=undefined?<Stats cleanProg={cleanProg} />:null}
                </div>
            :state === 'profile'?
                <Profile user={user}
                    lastTask={infoAccepted.at(infoAccepted.length-1)}
                    ipOfServer={props.ipOfServer}
                    httpPort={props.httpPort}
                />
            :state === 'details'?
                <Profile user={clickedUser}
                    ipOfServer={props.ipOfServer}
                    httpPort={props.httpPort}
                />
            :state === 'add'?
                <AddUserPanel department={props.department}
                    image={image}
                    setImage={setImage}
                    setChange={props.setChange}
                    change={props.change}
                    ipOfServer={props.ipOfServer}
                    userPanel={props.userPanel}
                    setUserPanel={props.setUserPanel}
                    httpPort={props.httpPort}/>
            :null
            }
            </div>
        </div>    
    </div>
}

export default Department;