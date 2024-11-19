import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import UserProfile from "./UserProfile";
import AddUserPanel from "./AddUserPanel";
import styles from "../Styles/ProfileList.module.css";

const ProfileList = (props)=>{
    
    const [users,setUsers] = useState([]);
    const [userPanel,setUserPanel] = useState(false);
    const [image,setImage] = useState(null);
    
    useEffect(()=>{
        axios.get(`http://${props.ipOfServer}:8080/user`,{params:{user:{department:props.department}}}).then(async req => {
            console.log('from profilelist');
            console.log(req.data);
            if(req.data)
                if(req.data.length>1)setUsers(req.data);
                else setUsers([req.data]);
            else setUsers([]);
        });
    },[props.change]);

    return <div className={styles.container}>
        {userPanel && props.user.role == 'Admin'?<AddUserPanel department={props.department} image={image} setImage={setImage} setChange={props.setChange} change={props.change} ipOfServer={props.ipOfServer} userPanel={userPanel} setUserPanel={setUserPanel}/>:null}
        <div className={styles.userProfileTitle}>User List</div>
        {props.user.role == 'Admin'?<div className={styles.addUserProfile} onClick={()=>{
            setUserPanel(true);
        }}>+ Add</div>:null}
        <ul className={styles.userProfileList}>{
        users.map((item,index)=>{
            return <UserProfile user={props.user} change={props.change} setChange={props.setChange} ipOfServer={props.ipOfServer} key={index} item={item}/>
        })}
        </ul>
    </div>
}

export default ProfileList;