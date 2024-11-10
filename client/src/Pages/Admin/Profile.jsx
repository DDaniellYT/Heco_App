import React, { useEffect, useState } from "react";
import styles from '../../Styles/Profile.module.css'
import axios from "axios";

function Profile(props){

    return <div className={styles.profileListContainer}>
        <div className={styles.profilePicture} style={{
            backgroundImage:`url(${props.photoLink})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}></div>
        <div className={styles.profileName}>
            <div>First : {props.user.firstName}</div>
            <div>Last : {props.user.lastName}</div>
            <div>Role : {props.user.role}</div>
        </div>
        <div className={styles.profileClock} onClick={()=>{
            axios.post(`http://${props.ipOfServer}:8080/users`,{userName:props.user.userName}).then(req => props.setChange(!props.change))
        }}>{props.user.existance == 'IN'?'Clock OUT':'Clock IN'}
        </div>
        <div className={styles.profileChat}>Chat</div>
        <div className={styles.profileAccepted}>Accepted Tasks</div>
            <div className={styles.profileList}>{
            props.infoAccepted.length==0?<div className={styles.noTasks}>No Tasks</div>:props.infoAccepted.map((item,index)=>{
                var reciever = "NO1";
                switch(item.reciever){
                    case "HResources": reciever = "HR";break;
                    case "Mechanics": reciever = "MCH";break;
                    case "Chemists": reciever = "CHT";break;
                    case "Workers": reciever = "WRK";break;
                    case "Security": reciever = "SEC";break;
                    case "Cleaning": reciever = "CLN";break;
                }
                return <div className={styles.profileListItem} key={item.id}>
                    <div className={styles.profileItemId}>{index}</div>
                    <div className={styles.profileItemReciever}>{reciever}</div>
                    <div className={styles.profileItemSubject}>{item.subject==""?"Nothing":item.subject}</div>
                    <div className={styles.profileItemWhen}>{item.when}</div>
                    <div className={styles.profileItemDone} onClick={()=>{
                        axios.post(`http://${props.ipOfServer}:8080/requests`,{reciever:props.user.userName,id:item.id,accepted:'DONE'}).then((req)=>{
                            props.setChange(!props.change);
                        });
                    }}>Done</div>
                </div>;
            })}
        </div>
    </div>;
}
export default Profile;