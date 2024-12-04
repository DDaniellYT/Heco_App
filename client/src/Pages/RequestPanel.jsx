import React from "react";
import { useState } from "react";
import styles from '../Styles/Requests.module.css'
import axios from "axios";

function RequestPanel(props){
    const [recieverDropdown,setReceiverDropdown] = useState(false);
    const [importanceDropdown,setImportanceDropdown] = useState(false);

    const [urgency,setUrgency] = useState("Lowest");
    const [reciever,setReceiver] = useState("HResources");
    const [subject,setSubject] = useState("");
    const [message,setMessage] = useState("");

    return <div className={styles.requestBackground} onClick={(e)=>{
                e.stopPropagation(true);
            }}>
            <div className={styles.requestContainer}>
                <div className={styles.requestTitleContainer}>
                    <div className={styles.requestTitle}>RequestPage</div>
                    <div className={styles.requestExit} onClick={(e)=>{
                        props.setRequestPage(false);
                        e.stopPropagation(true);
                    }}>x</div>
                </div>
                <div className={styles.requestRecieverDropdown_Menu} style={recieverDropdown?{
                    backgroundColor:'rgb(0,0,0,0)',
                    border:'0px',
                }:null} onClick={()=>{
                    setReceiverDropdown(true);
                }} onMouseLeave={()=>{
                    setReceiverDropdown(false);
                }}>{reciever}
                {recieverDropdown ? <div style={{
                    color:'white'
                }} className={styles.requestRecieverDropdown}>
                    <div onClick={(e)=>{
                        e.stopPropagation();
                        setReceiver("HResources")
                        setReceiverDropdown(false);
                    }} style={{
                        borderRadius:'5px 5px 0px 0px'
                    }}>HResources</div>
                    <div onClick={(e)=>{
                        e.stopPropagation();
                        setReceiver("Mechanics")
                        setReceiverDropdown(false);
                    }}>Mechanics</div>
                    <div onClick={(e)=>{
                        e.stopPropagation();
                        setReceiver("Chemists")
                        setReceiverDropdown(false);
                    }}>Chemists</div>
                    <div onClick={(e)=>{
                        e.stopPropagation();
                        setReceiver("Workers")
                        setReceiverDropdown(false);
                    }}>Workers</div>
                    <div onClick={(e)=>{
                        e.stopPropagation();
                        setReceiver("Cleaning")
                        setReceiverDropdown(false);
                    }}>Cleaning</div>
                    <div onClick={(e)=>{
                        e.stopPropagation();
                        setReceiver("Security")
                        setReceiverDropdown(false);
                    }} style={{
                        borderRadius:'0px 0px 5px 5px'
                    }}>Security</div>
                </div>:null}</div>
                <div style={importanceDropdown?{
                    backgroundColor:'rgb(0,0,0,0)',
                    border:'0px',
                    color:'rgb(0,0,0,0)'
                }:null} className={styles.requestImportanceDropdown_Menu} onClick={()=>{
                    setImportanceDropdown(true);
                }} onMouseLeave={()=>{
                    setImportanceDropdown(false);
                }}>{urgency}
                {importanceDropdown ? <div style={{
                    color:'white'
                }} className={styles.requestImportanceDropdown}>
                    <div onClick={(e)=>{
                        e.stopPropagation(true);  
                        setUrgency("Lowest");
                        setImportanceDropdown(false);                            
                    }} style={{
                        borderRadius:'5px 5px 0px 0px'
                    }}>Top</div>
                    <div onClick={(e)=>{
                        e.stopPropagation(true);  
                        setUrgency("Low");
                        setImportanceDropdown(false);                            
                    }}>High</div>
                    <div onClick={(e)=>{
                        e.stopPropagation(true);  
                        setUrgency("Somewhat");
                        setImportanceDropdown(false);                            
                    }}>Medium High</div>
                    <div onClick={(e)=>{
                        e.stopPropagation(true);  
                        setUrgency("Lowest");
                        setImportanceDropdown(false);                            
                    }}>Medium</div>
                    <div onClick={(e)=>{
                        e.stopPropagation(true);  
                        setUrgency("High");
                        setImportanceDropdown(false);                            
                    }}>Low</div>
                    <div onClick={(e)=>{
                        e.stopPropagation(true);  
                        setUrgency("Top");
                        setImportanceDropdown(false);                            
                    }} style={{
                        borderRadius:'0px 0px 5px 5px'
                    }}>Lowest</div>
                </div>:null}
                </div>
                <div className={styles.requestSubject}>
                    <input value={subject} maxLength={30} placeholder="Subject" onChange={(e)=>{
                        setSubject(e.target.value);
                    }}/>
                    {subject.length > 19 && subject.length <30 ? <div className={styles.requestSubjectCount}>{30-subject.length} more till limit</div> : subject.length == 30 ? <div className={styles.requestSubjectCount}>limit of 30 reached</div> : null}
                </div>
                <div className={styles.requestMessage}>
                    <textarea value={message} maxLength={300} placeholder="Message" onChange={(e)=>{
                        setMessage(e.target.value);
                    }}/>
                    {message.length > 99 && message.length <300 ? <div className={styles.requestMessageCount}>{300-message.length} more till limit</div> : message.length == 300 ? <div className={styles.requestMessageCount}>limit of 300 reached</div> : null}
                </div>
                <div className={styles.requestSubmitButtonContainer}>
                    <button className={styles.requestSubmitButton} onClick={()=>{
                        axios.put(`http://${props.ipOfServer}:${props.httpPort}/requests`,{
                            subject:`${subject}`,
                            message:`${message}`,
                            reciever_role:`${reciever}`,
                            sender:`${props.user.userName}`,
                            sender_role:`${props.user.role}`,
                            urgency:`${urgency}`
                        }).then(()=>{
                                props.setChange(!props.change);
                                props.setRequestPage(false);
                                setSubject("");
                                setMessage("");
                                setReceiver("HResources");
                                setUrgency("Lowest");
                        })
                    }}>Submit</button>
                </div>
            </div>
        </div>;
}
export default RequestPanel;