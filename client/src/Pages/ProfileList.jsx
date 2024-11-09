import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import UserProfile from "./UserProfile";
import styles from "../Styles/ProfileList.module.css";

const ProfileList = (props)=>{

    const [users,setUsers] = useState([{userName:'sada'}]);

    useEffect(()=>{
        axios.get(`http://${props.ipOfServer}:8080/users`,{params:{role:'hr'}}).then(req => {
            setUsers(req.data);
        });
        console.log(users);
    },[props.change]);

    return <div className={styles.container}>
        <div className={styles.userProfileTitle}>User List</div>
        <ul className={styles.userProfileList}>{users.map((item,index)=>{
            return <UserProfile ipOfServer={props.ipOfServer} key={index} item={item}/>
        })}
        </ul>
    </div>
}

export default ProfileList;