import React, { useEffect, useState } from "react";
import axios from "axios";

import ChangeUserPanel from "./ChangeUserPanel";
import styles from "../Styles/ProfileList.module.css";

const UserProfile = props => {
    const [userActivity, setUserActivity] = useState([]);
    const [changePanel, setChangePanel] = useState(false);
    const [user, setUser] = useState({});

    const hours = 0;
    const minutes = 0;
    const seconds = 0;

    return <div className={styles.userProfileContainer}>
        {changePanel?<ChangeUserPanel item={props.item} user={user} userActivity={userActivity} setChangePanel={setChangePanel}/>:null}
        <div className={styles.userProfilePic} style={{
                    backgroundImage:`url(${props.item.pic})`
        }}>picture</div>
        <div className={styles.userProfileName}>
            <label>UserName:</label>
            <div>{props.item.userName}</div>
        </div>
        <div className={styles.userProfileExistance}>{props.item.existance}</div>                
        <div className={styles.userProfileClockHour}>
            {hours.toString().length<2?`0${hours}`:hours}:
            {minutes.toString().length<2?`0${minutes}`:minutes}:
            {seconds.toString().length<2?`0${seconds}`:seconds}
        </div>
        <div className={styles.userProfileDetails} onClick={()=>{
            axios.get(`http://${props.ipOfServer}:8080/user`,{params:{userName:props.item.userName}}).then((req)=>{
                setUser(req.data);
            }).then(()=>{
                axios.get(`http://${props.ipOfServer}:8080/requests`,{params:{reciever:user.userName,accepted:'YES'}}).then((req)=>{
                    setUserActivity(req.data);
                    setChangePanel(true);
                })
            });
        }}>DETAILS</div>
    </div>;
}

export default UserProfile;