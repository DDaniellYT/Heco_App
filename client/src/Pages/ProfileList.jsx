import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import UserProfile from "./UserProfile";
import AddUserPanel from "./AddUserPanel";
import styles from "../Styles/ProfileList.module.css";

const ProfileList = (props)=>{
    
    const [users,setUsers] = useState([{userName:'sada'}]);
    const [department,setDepartment] = useState(props.department);
    const [userPanel,setUserPanel] = useState(false);
    
    useEffect(()=>{
        axios.get(`http://${props.ipOfServer}:8080/user`,{params:{department:`${department}`}}).then(req => {
            setUsers(req.data);
        });
    },[props.change]);

    return <div className={styles.container}>
        {userPanel?<AddUserPanel ipOfServer={props.ipOfServer} userPanel={userPanel} setUserPanel={setUserPanel} department={department} setDepartment={setDepartment}/>:null}
        <div className={styles.userProfileTitle}>User List</div>
        <div className={styles.addUserProfile} onClick={()=>{
            setUserPanel(true);
        }}>+ Add</div>
        <ul className={styles.userProfileList}>{users.map((item,index)=>{
            return <UserProfile change={props.change} setChange={props.setChange} ipOfServer={props.ipOfServer} key={index} item={item}/>
        })}
        </ul>
    </div>
}

export default ProfileList;