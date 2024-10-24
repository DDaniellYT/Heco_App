import React from "react";
import { useState } from "react";
import styles from '../../Styles/Requests.module.css'
import axios from "axios";

function RequestPanel(props){
    const [recieverDropdown,setReceiverDropdown] = useState(false);
    const [senderDropdown,setSenderDropdown] = useState(false);
    const [importanceDropdown,setImportanceDropdown] = useState(false);

    const [urgency,setUrgency] = useState("Lowest");
    const [reciever,setReceiver] = useState(" Who");
    const [sender,setSender] = useState(" Who");
    const [subject,setSubject] = useState("");
    const [message,setMessage] = useState("");

    return <div className={styles.requestBackground}>
    <div className={styles.requestContainer}>
        <div className={styles.requestTitleContainer}>
            <div className={styles.requestTitle}>RequestPage</div>
            <div className={styles.requestExit} onClick={(e)=>{
                props.setRequestPage(false);
                e.stopPropagation(true);
            }}>x</div>
        </div>
        <div className={styles.requestRecieverDropdown_Menu} onClick={()=>{
            setReceiverDropdown(true);
        }} onMouseLeave={()=>{
            setReceiverDropdown(false);
        }}>To : {reciever}
        {recieverDropdown ? <div className={styles.requestRecieverDropdown}>
            <div onClick={(e)=>{
                e.stopPropagation();
                setReceiver("HResources")
                setReceiverDropdown(false);
            }}>Human Resources</div>
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
            }}>Security</div>
        </div>:null}</div>
        <div className={styles.requestSenderDropdown_Menu} onClick={()=>{
            setSenderDropdown(true);
        }} onMouseLeave={()=>{
            setSenderDropdown(false);
        }}>By : {sender}
        {senderDropdown ? <div className={styles.requestSenderDropdown}>
            <div onClick={(e)=>{
                e.stopPropagation();
                setSender("HResources")
                setSenderDropdown(false);
            }}>Human Resources</div>
            <div onClick={(e)=>{
                e.stopPropagation();
                setSender("Mechanics")
                setSenderDropdown(false);
            }}>Mechanics</div>
            <div onClick={(e)=>{
                e.stopPropagation();
                setSender("Chemists")
                setSenderDropdown(false);
            }}>Chemists</div>
            <div onClick={(e)=>{
                e.stopPropagation();
                setSender("Workers")
                setSenderDropdown(false);
            }}>Workers</div>  
            <div onClick={(e)=>{
                e.stopPropagation();
                setSender("Cleaning")
                setSenderDropdown(false);
            }}>Cleaning</div>
            <div onClick={(e)=>{
                e.stopPropagation();
                setSender("Security")
                setSenderDropdown(false);
            }}>Security</div>
        </div>:null}
        </div>
        <div className={styles.requestImportanceDropdown_Menu} onClick={()=>{
            setImportanceDropdown(true);
        }} onMouseLeave={()=>{
            setImportanceDropdown(false);
        }}>Priority : {urgency}
        {importanceDropdown ? <div className={styles.requestImportanceDropdown}>
            <div onClick={(e)=>{
                e.stopPropagation(true);  
                setUrgency("Lowest");
                setImportanceDropdown(false);                            
            }}>Lowest</div>
            <div onClick={(e)=>{
                e.stopPropagation(true);  
                setUrgency("Low");
                setImportanceDropdown(false);                            
            }}>Low</div>
            <div onClick={(e)=>{
                e.stopPropagation(true);  
                setUrgency("Somewhat");
                setImportanceDropdown(false);                            
            }}>Somewhat</div>
            <div onClick={(e)=>{
                e.stopPropagation(true);  
                setUrgency("High");
                setImportanceDropdown(false);                            
            }}>High</div>
            <div onClick={(e)=>{
                e.stopPropagation(true);  
                setUrgency("Top");
                setImportanceDropdown(false);                            
            }}>Top</div>
        </div>:null}
        </div>
        <div className={styles.requestMessageArea}>
            <input className={styles.requestSubject} value={subject} placeholder="Subject :" onChange={(e)=>{
                setSubject(e.target.value);
            }}/>
            <textarea className={styles.requestMessage} value={message} placeholder="Message :" onChange={(e)=>{
                setMessage(e.target.value);
            }}/>
        </div>
        <div className={styles.requestSubmitButtonContainer}>
            <button className={styles.requestSubmitButton} onClick={()=>{
                props.setChange(true);
                console.log({
                    subject,
                    message,
                    reciever,
                    sender,
                    urgency});
                axios.post('http://localhost:8080/requestAdd',{
                    subject,
                    message,
                    reciever,
                    sender,
                    urgency}).then(()=>{
                        props.setRequestPage(false);
                        setSubject("");
                        setMessage("");
                        setReceiver(" Who");
                        setSender(" Who");
                        setUrgency("Lowest");
                    })
            }}>Submit</button>
        </div>
    </div>
</div>;
}
export default RequestPanel;