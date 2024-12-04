import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../Styles/Profile.module.css'

function Profile(props){

    const [date,setDate] = useState(new Date());

    useEffect(()=>{
        if(props.lastTask)
            setDate(new Date(props.lastTask.dateAccepted));
    },[])

    return <div className={styles.profileContainer}>
        <img alt="no img yet" className={styles.profileImage}/>
        <label className={styles.userName}>{props.user.userName}</label>
        <div className={styles.department}><label>Department:</label><span>{props.user.department}</span></div>
        <div className={styles.role}><label>Role:</label><span>{props.user.role}</span></div>
        <label className={styles.existanceLabel}>Existance:</label>
        <span className={styles.existanceSpan}>{props.user.existance}</span>
        <label className={styles.messageAcceptedLabel}>Task Accepted at :</label>
        <span className={styles.messageAcceptedTime}>{date.toLocaleString('default',{month:'short'})}{'-'}{date.getDate()}{'  '}{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</span>
        {props.lastTask?<div className={styles.lastTask}>
            <div className={styles.subjectLabel}>Subject:</div>
            <div className={styles.subject}>{props.lastTask.subject}</div>
            <div className={styles.messageLabel}>Message:</div>
            <div className={styles.message}>{props.lastTask.message}</div>
        </div>:<div className={styles.noTaskContainer}>
            <label>No Accepted Task</label>
            <span>Get To Work</span>
        </div>}
    </div>

}
export default Profile;