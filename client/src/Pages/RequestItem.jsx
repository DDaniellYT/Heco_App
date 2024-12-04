import React from "react";
import styles from '../Styles/Activity.module.css'
import axios from 'axios'

function RequestItem(props){
    const obj = {
        id: props.index,
        subject: props.item.subject,
        reciever: props.item.reciever,
        when: 0
    }
    // console.log()
    return <div className={styles.infoItemContainer}>
        <div className={styles.infoId}>{props.index}</div>
        <div className={styles.infoSender}>{props.item.sender}</div>
        <div className={styles.infoReceiver}>{props.item.reciever_role}</div>
        <div className={styles.infoUrgency}>{props.item.urgency}</div>
        <div className={styles.infoSubject}>{props.item.subject}</div>
        {props.permisions==='done' || props.permisions==='all'?<div style={props.permisions===0?{gridRow:'1/2'}:null} className={styles.infoDone} onClick={()=>{
            axios.post(`http://${props.ipOfServer}:${props.httpPort}/requests`,{reciever:props.user.userName,id:props.item.id,accepted:'DONE'}).then((req)=>{
                props.setChange(!props.change);
            });
        }}>Done</div>:null}
        {props.permisions==='accept' || props.permisions==='all'?<div className={styles.infoAccept} onClick={()=>{
            obj.when = new Date().getHours() + ":" + new Date().getMinutes();
            axios.post(`http://${props.ipOfServer}:${props.httpPort}/requests`,{reciever:props.user.userName,id:props.item.id,accepted:'YES'}).then((req)=>{
                props.setChange(!props.change);
            });
        }}>Accept</div>:null}
        {props.permisions!=='none' || props.permisions==='all'?<div className={styles.infoRemove} onClick={async ()=>{
            obj.when = new Date().getHours() + ":" + new Date().getMinutes()
            await axios.delete(`http://${props.ipOfServer}:${props.httpPort}/requests`,{params:{id:props.item.id}}).then((req)=>{
                props.setChange(!props.change);
            });
        }}>Remove</div>:null}
    </div>
}
export default RequestItem;