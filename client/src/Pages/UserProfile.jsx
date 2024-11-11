import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "../Styles/ProfileList.module.css";
import RequestItem from "./Admin/RequestItem"


const UserProfile = props => {
    const hours = Math.floor(props.item.time/3600);
    const minutes = Math.floor((props.item.time-hours*3600)/60);
    const seconds = props.item.time-hours*3600-minutes*60;

    const [changePanel, setChangePanel] = useState(false);
    const [userActivity, setUserActivity] = useState([]);
    const [user, setUser] = useState({});
    const [sure, setSure] = useState(false);

    return <div className={styles.userProfileContainer}>
        {changePanel?<div className={styles.changePanelContainer}>
            <div className={styles.changePanel}> 
                <div className={styles.changePanelPic} style={{
                    backgroundImage:`url(${user.pic})`
                }}>picture</div>
                <div className={styles.changePanelName}>{user.userName}</div>
                <div className={styles.changePanelRole}>{user.role}</div>
                <div className={styles.changePanelTime}>
                    {hours.toString().length<2?`0${hours}`:hours}:
                    {minutes.toString().length<2?`0${minutes}`:minutes}:
                    {seconds.toString().length<2?`0${seconds}`:seconds}
                </div>
                <div className={styles.changePanelDepartment}>
                    <div>Department:</div>
                    <div>{user.role}</div>
                </div>
                <div className={styles.changePanelExit} onClick={()=>{
                    setSure(true);
                }}>X</div>
                {sure?<div className={styles.changePanelSure}>
                    <div className={styles.sureTitle}>Do you abandon changes?</div>
                    <div className={styles.sureButtonLeft} onClick={()=>{
                        setSure(false);
                        setChangePanel(false);
                    }}>YES</div>
                    <div className={styles.sureButtonRight} onClick={()=>{
                        setSure(false);
                    }}>NO</div>
                </div>:null}
                <div className={styles.changePanelActivity}>
                    {userActivity.map((item,index)=>{
                        return <RequestItem user={user} ipOfServer={props.ipOfServer} key={index} change={props.change} setChange={props.setChange} item={item} index={index+1}/>
                    })}
                </div>
            </div>
        </div>:null}
        <div className={styles.userProfilePic} style={{
                    backgroundImage:`url(${props.item.pic})`
        }}>picture</div>
        <div className={styles.userProfileName}>{props.item.userName}</div>
        <div className={styles.userProfileExistance}>{props.item.existance}</div>                
        <div className={styles.userProfileClockHour}>
            {hours.toString().length<2?`0${hours}`:hours}:
            {minutes.toString().length<2?`0${minutes}`:minutes}:
            {seconds.toString().length<2?`0${seconds}`:seconds}
        </div>
        <div className={styles.userProfileChange} onClick={()=>{
            axios.get(`http://${props.ipOfServer}:8080/user`,{params:{userName:props.item.userName}}).then((req)=>{
                setUser(req.data);
            }).then(()=>{
                axios.get(`http://${props.ipOfServer}:8080/requests`,{params:{reciever:user.userName,accepted:'YES'}}).then((req)=>{
                    setUserActivity(req.data);
                    setChangePanel(true);
                })
            });
        }}>CHANGE</div>
    </div>;
}

export default UserProfile;