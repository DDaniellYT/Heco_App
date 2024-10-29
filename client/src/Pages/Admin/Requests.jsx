import React, { useState } from "react";
import { useEffect } from "react";
import styles from '../../Styles/AdminInfo.module.css'
import RequestItem from "./RequestItem";
import axios from "axios";

function Requests(props){
    const [hrProg,setHrProg] = useState(43);
    const [mechProg,setMechProg] = useState(43);
    const [chemProg,setChemProg] = useState(43);
    const [workProg,setWorkProg] = useState(43);
    const [secProg,setSecProg] = useState(43);
    const [cleanProg,setCleanProg] = useState(43);
    
    useEffect(()=>{
        axios.get('http://localhost:8080/lists').then((req)=>{
            const data = req.data;
            props.setInfoAccepted(req.data.accepted);
            props.setInfoRequests(req.data.requests);

            console.log(data);

            setHrProg(data.countHRRequests == 0 && data.countHRAccepted == 0 ? 0 : (data.countHRAccepted/(data.countHRRequests+data.countHRAccepted)*100).toFixed(0));
            setMechProg(data.countMechRequests == 0 && data.countMechAccepted == 0 ? 0 : (data.countMechAccepted/(data.countMechRequests+data.countMechAccepted)*100).toFixed(0));
            setChemProg(data.countChemRequests == 0 && data.countChemAccepted == 0 ? 0 : (data.countChemAccepted/(data.countChemRequests+data.countChemAccepted)*100).toFixed(0));
            setWorkProg(data.countWorkRequests == 0 && data.countWorkAccepted == 0 ? 0 : (data.countWorkAccepted/(data.countWorkRequests+data.countWorkAccepted)*100).toFixed(0));
            setSecProg(data.countSecRequests == 0 && data.countSecAccepted == 0 ? 0 : (data.countSecAccepted/(data.countSecRequests+data.countSecAccepted)*100).toFixed(0));
            setCleanProg(data.countCleanRequests == 0 && data.countCleanAccepted == 0 ? 0 : (data.countCleanAccepted/(data.countCleanRequests+data.countCleanAccepted)*100).toFixed(0));
        })
    },[props.change]);

    return <div className={styles.info}>
            <div className={styles.infoTitle}>Activity</div>
            <div className={styles.infoListContainer}>
                <div className={styles.infoQuick}>
                    <div className={styles.infoQuickTitle}>Quick Info</div>
                    <div className={styles.infoQuickStats}>
                        <div className={styles.infoQuickStatsTitle}>Stats</div>
                        <div className={styles.infoQuickHR}>HR:</div>  
                        <div className={styles.infoQuickMech}>Mech</div>
                        <div className={styles.infoQuickChem}>Chem</div>
                        <div className={styles.infoQuickWork}>Work</div>
                        <div className={styles.infoQuickSec}>Sec</div>
                        <div className={styles.infoQuickClean}>Clean</div>
                        <div className={styles.infoStatHR}>
                            <div style={{
                                width: hrProg+'%',
                                height:'100%',
                                backgroundColor: 'whiteSmoke' ,
                                borderRadius: hrProg>95?'4px':'4px 0px 0px 4px',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center'
                            }}>{hrProg>30?hrProg+'%':null}</div>
                            <div style={{
                                width: 100-hrProg+'%',
                                height:'100%',
                                backgroundColor: 'firebrick' ,
                                borderRadius: hrProg<5?'4px':'0px 4px 4px 0px',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center'
                            }}>{100-hrProg<30?null:100-hrProg+'%'}</div>
                        </div>
                        <div className={styles.infoStatMech}>
                        <div style={{
                                width: mechProg+'%',
                                height:'100%',
                                backgroundColor: 'whiteSmoke' ,
                                borderRadius: mechProg>95?'4px':'4px 0px 0px 4px',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center'
                            }}>{mechProg>30?mechProg+'%':null}</div>
                            <div style={{
                                width: 100-mechProg+'%',
                                height:'100%',
                                backgroundColor: 'firebrick' ,
                                borderRadius: mechProg<5?'4px':'0px 4px 4px 0px',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center'
                            }}>{100-mechProg<30?null:100-mechProg+'%'}</div>
                        </div>
                        <div className={styles.infoStatChem}>
                            <div style={{
                                width: chemProg+'%',
                                height:'100%',
                                backgroundColor: 'whiteSmoke' ,
                                borderRadius: chemProg>95?'4px':'4px 0px 0px 4px',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center'
                            }}>{chemProg>30?chemProg+'%':null}</div>
                            <div style={{
                                width: 100-chemProg+'%',
                                height:'100%',
                                backgroundColor: 'firebrick' ,
                                borderRadius: chemProg<5?'4px':'0px 4px 4px 0px',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center'
                            }}>{100-chemProg<30?null:100-chemProg+'%'}</div>
                        </div>
                        <div className={styles.infoStatWork}>
                            <div style={{
                                width: workProg+'%',
                                height:'100%',
                                backgroundColor: 'whiteSmoke' ,
                                borderRadius: workProg>95?'4px':'4px 0px 0px 4px',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center'
                            }}>{workProg>30?workProg+'%':null}</div>
                            <div style={{
                                width: 100-workProg+'%',
                                height:'100%',
                                backgroundColor: 'firebrick' ,
                                borderRadius: workProg<5?'4px':'0px 4px 4px 0px',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center'
                            }}>{100-workProg<30?null:100-workProg+'%'}</div>
                        </div>
                        <div className={styles.infoStatSec}>
                            <div style={{
                                width: secProg+'%',
                                height:'100%',
                                backgroundColor: 'whiteSmoke' ,
                                borderRadius: secProg>95?'4px':'4px 0px 0px 4px',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center'
                            }}>{secProg>30?secProg+'%':null}</div>
                            <div style={{
                                width: 100-secProg+'%',
                                height:'100%',
                                backgroundColor: 'firebrick' ,
                                borderRadius: secProg<5?'4px':'0px 4px 4px 0px',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center'
                            }}>{100-secProg<30?null:100-secProg+'%'}</div>
                        </div>
                        <div className={styles.infoStatClean}>
                            <div style={{
                                width: cleanProg+'%',
                                height:'100%',
                                backgroundColor: 'whiteSmoke' ,
                                borderRadius: cleanProg>95?'4px':'4px 0px 0px 4px',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center'
                            }}>{cleanProg>30?cleanProg+'%':null}</div>
                            <div style={{
                                width: 100-cleanProg+'%',
                                height:'100%',
                                backgroundColor: 'firebrick' ,
                                borderRadius: cleanProg<5?'4px':'0px 4px 4px 0px',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center'
                            }}>{100-cleanProg<30?null:100-cleanProg+'%'}</div>
                        </div>
                    </div>
                </div>
                <ul className={styles.infoList}>{
                    props.infoRequests.length==0?<div className={styles.noActivity}>No Activity Yet</div>:props.infoRequests.map((item,index)=>{
                        return <RequestItem change={props.change} setChange={props.setChange} infoRequests={props.infoRequests} setInfoRequests={props.setInfoRequests} infoAccepted={props.infoAccepted} setInfoAccepted={props.setInfoAccepted} item={item} index={index+1}/>
                    })
                }</ul>
            </div>
        </div>;
}
export default Requests;