import React, { useEffect, useState } from "react";
import axios from "axios";

import ChangeUserPanel from "./ChangeUserPanel";
import styles from "../Styles/ProfileList.module.css";

const UserProfile = props => {
    const [userActivity, setUserActivity] = useState([]);
    const [changePanel, setChangePanel] = useState(false);
    // const [user, setUser] = useState({});
    const [sure,setSure] = useState(false);
    
    const hours = 0;
    const minutes = 0;
    const seconds = 0;

    return <div className={styles.userProfileContainer}>
        {changePanel?<ChangeUserPanel user={props.user} item={props.item} userItem={props.item} userActivity={userActivity} setChangePanel={setChangePanel}/>:null}
        <div className={styles.userProfilePic} style={{
                    backgroundImage:`url(${props.item.pic})`
        }}>picture</div>
        <div className={styles.userProfileName}>
            <label>UserName:</label>
            <div>{props.item.userName}</div>
        </div>
        {props.user.role == 'Admin'?<div className={styles.userProfileDelete} onClick={()=>{
            setSure(true);
        }}>DELETE</div>:null}    
        <div className={styles.userProfileClockHour}>
            {hours.toString().length<2?`0${hours}`:hours}:
            {minutes.toString().length<2?`0${minutes}`:minutes}:
            {seconds.toString().length<2?`0${seconds}`:seconds}
        </div>
        <div className={styles.userProfileDetails} style={props.user.role == 'Admin'?null:{
            borderLeft:'2px solid black',
            gridColumn:'4/6',
            backgroundColor:'moccasin'
        }} onClick={async ()=>{
            await axios.get(`http://${props.ipOfServer}:8080/requests`,{params:{reciever:props.item.userName,accepted:'YES'}}).then((req)=>{
                console.log(props.item);
                console.log(req.data);
                setUserActivity(req.data);
                setChangePanel(!props.change);
            })
        }}>DETAILS</div>   
        {sure?<div className={styles.detailsPanelSureContainer}>
            <div className={styles.detailsPanelSure}>
                <div className={styles.sureTitle}>Are you sure?</div>
                <div className={styles.sureButtonLeft} onClick={()=>{
                    axios.delete(`http://${props.ipOfServer}:8080/user`,{params:{user:props.item}}).then((req)=>{
                        console.log(req);
                        props.setChange(!props.change); 
                        setSure(false);
                    })
                }}>Yes</div>
                <div className={styles.sureButtonRight} onClick={()=>{
                    setSure(false);
                }}>Cancel</div>
            </div>
        </div>:null}
    </div>;
}

export default UserProfile;