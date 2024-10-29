import React, { useEffect } from "react";
import styles from '../../Styles/AdminInfo.module.css'
import axios from 'axios'

function RequestItem(props){
    useEffect(()=>{
        axios.get('http://localhost:8080/lists').then((req,res)=>{
            props.setInfoAccepted(req.data.accepted);
            props.setInfoRequests(req.data.requests);
        });
    },[props.change]);
    const obj = {
        id: props.index,
        subject: props.item.subject,
        reciever: props.item.reciever,
        when: 0
    }
    return <div className={styles.infoItemContainer}>
            <div className={styles.infoId}>{props.index}</div>
            <div className={styles.infoSender}>{props.item.sender}</div>
            <div className={styles.infoReceiver}>{props.item.reciever}</div>
            <div className={styles.infoUrgency}>{props.item.urgency}</div>
            <div className={styles.infoSubject}>{props.item.subject}</div>
            <div className={styles.infoMessage}>{props.item.message}</div>
            <div className={styles.infoAccept} onClick={()=>{
                obj.when = new Date().getHours() + ":" + new Date().getMinutes();
                axios.post('http://localhost:8080/acceptedAdd',obj)
                axios.post('http://localhost:8080/requestRemove',obj);
                props.setChange(true);
            }}>Accept</div>
            <div className={styles.infoRemove} onClick={()=>{
                obj.when = new Date().getHours() + ":" + new Date().getMinutes()
                axios.post('http://localhost:8080/requestRemove',obj);
                props.setChange(true);
            }}>Remove</div>
        </div>
}
export default RequestItem;