import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styles from '../../Styles/Activity.module.css'
import RequestItem from "./RequestItem";
import Stats from "./Stats";

async function getProg(rec){
    var prog = 0;
    await axios.get('http://localhost:8080/requests',{params:{reciever:`${rec}`}}).then(async (req,res)=>{
        const tempAll = req.data;
        const tempYes = tempAll.filter((item)=>{
            if(item.accepted == 'yes')return item;
        })
        prog = tempAll.length==0?0:(tempYes.length/tempAll.length*100).toFixed(0);
        console.log(prog);
    });
    return prog;
}

function Activity(props){
    const [hrProg,setHrProg] = useState(50);
    const [mechProg,setMechProg] = useState(50);
    const [chemProg,setChemProg] = useState(50);
    const [workProg,setWorkProg] = useState(50);
    const [secProg,setSecProg] = useState(50);
    const [cleanProg,setCleanProg] = useState(50);
    
    useEffect(()=>{
        getProg('HResources').then(prog => setHrProg(prog));
        getProg('Mechanics').then(prog => setMechProg(prog));
        getProg('Chemists').then(prog => setChemProg(prog));
        getProg('Workers').then(prog => setWorkProg(prog));
        getProg('Security').then(prog => setSecProg(prog));
        getProg('Cleaning').then(prog => setCleanProg(prog));
    },[props.change]);

    return <div className={styles.info}>
            <div className={styles.infoListContainer}>
                <Stats hrProg={hrProg} mechProg={mechProg} chemProg={chemProg} workProg={workProg} secProg={secProg} cleanProg={cleanProg}/>
                <ul className={styles.infoList}>{
                    props.infoRequests.length==0?<div className={styles.noActivity}>No Activity Yet</div>:props.infoRequests.map((item,index)=>{
                        return <RequestItem key={index} change={props.change} setChange={props.setChange} infoRequests={props.infoRequests} setInfoRequests={props.setInfoRequests} infoAccepted={props.infoAccepted} setInfoAccepted={props.setInfoAccepted} item={item} index={index+1}/>
                    })
                }</ul>
            </div>
        </div>;
}
export default Activity;