import React, { useEffect } from "react";
import styles from '../../Styles/Activity.module.css'
import axios from 'axios'

function RequestItem(props){
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
            axios.post(`http://${props.ipOfServer}:8080/requests`,{reciever:props.user.userName,id:props.item.id,accepted:'YES'}).then((req)=>{
                props.setChange(!props.change);
            });
        }}>Accept</div>
        <div className={styles.infoRemove} onClick={async ()=>{
            obj.when = new Date().getHours() + ":" + new Date().getMinutes()
            await axios.delete(`http://${props.ipOfServer}:8080/requests`,{params:{id:props.item.id}}).then((req)=>{
                props.setChange(!props.change);
            });
        }}>Remove</div>
    </div>
}
export default RequestItem;