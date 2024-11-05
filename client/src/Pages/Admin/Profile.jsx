import React from "react";
import styles from '../../Styles/Profile.module.css'
import axios from "axios";

function Profile(props){
    return <div className={styles.profileContainer}>
        <div className={styles.profileTitle}>Profile</div>
            <div className={styles.profileListContainer}>
                <div className={styles.profilePicture}>picture test</div>
                <div className={styles.profileClock}>button</div>
                <div className={styles.profileChat}>chat</div>
                <div className={styles.profileAccepted}>Accepted Tasks</div>
                    <div className={styles.profileList}>
                        {props.infoAccepted.length==0?<div className={styles.noTasks}>No Tasks</div>:props.infoAccepted.map((item)=>{
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
                                <div className={styles.profileItemId}>{item.id}</div>
                                <div className={styles.profileItemReciever}>{reciever}</div>
                                <div className={styles.profileItemSubject}>{item.subject==""?"Nothing":item.subject}</div>
                                <div className={styles.profileItemWhen}>{item.when}</div>
                                <div className={styles.profileItemDone} onClick={()=>{
                                    props.setChange(!props.change);
                                    axios.post('http://localhost:8080/acceptedRemove',{
                                        id : item.id,
                                        reciever : item.reciever
                                    })
                                }}>Done</div>
                            </div>;
                        })}
                </div>
            </div>
        </div>
}
export default Profile;