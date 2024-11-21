import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../../Styles/Profile.module.css'
import axios from "axios";

function Profile(props){
    const nav = useNavigate();
    const [chatState,setChatState] = useState(0);

    const chatEndRef = useRef(null);

    const [reciever,setReciever] = useState();
    const [messages,setMessages] = useState();
    const [message,setMessage] = useState('');

    const leftStyle = {
        alignSelf:'flex-start',
        justifyContent:'left'
    }
    const rightStyle = {
        alignSelf:'flex-end',
        justifyContent:'right'
    }

    const socket = useRef(null);

    useEffect(()=>{
        new Promise(async ()=>{
            if(reciever!==undefined){
                await axios.get(`http://${props.ipOfServer}:${props.httpPort}/chat`,{params:{sender:props.user.userName,reciever:reciever.userName}}).then((req)=>{
                    setMessages(req.data);
                    setChatState(2);
                    if(!socket.current){
                        const tempSocket = new WebSocket(`ws://${props.ipOfServer}:${props.wsPort}/`);
                        socket.current = tempSocket;
                        tempSocket.onopen = ()=>{
                            console.log('opened socket');
                        };
                        tempSocket.onclose = ()=>{
                            console.log('closed socket');
                            socket.current = null;
                        }
                        tempSocket.onmessage = (message) => {
                            console.log(message,' <- message from websocket server');
                        }
                    }
                });
            }
        })
    },[props.change]);
    useEffect(()=>{
        chatEndRef.current?.scrollIntoView({behavior:'smooth'});
    },[messages]);


    return <div className={styles.profileListContainer}>
        <div className={styles.profilePicture} style={{
            backgroundImage:props.photo,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>{props.photo?null:'get a picture man'}</div>
        <div className={styles.profileName}>
            <div>First : {props.user.firstName}</div>
            <div>Last : {props.user.lastName}</div>
            <div>Role : {props.user.role}</div>
        </div>
        <div className={styles.profileClock} onClick={()=>{
            axios.post(`http://${props.ipOfServer}:${props.httpPort}/user`,{user:{id:props.user.id,existance:'OUT'}}).then(req => {
                nav('/',{state:{}});
            })
        }}>Clock OUT
        </div>
        <div className={styles.profileChat} onClick={()=>{
                if(chatState===0)setChatState(1);
            }}>
            <label>Chat</label>
            {chatState>0?<div className={styles.chatContainer}>
                <div className={styles.chatTitle}>{chatState===1?'Chat':reciever.userName}</div>
                {chatState===1?<div className={styles.chatUsers}>
                    {props.userNames.map((item)=>{
                        return <label onClick={async ()=>{
                            await axios.get(`http://${props.ipOfServer}:${props.httpPort}/user`,{params:{user:{userName:item}}}).then((req)=>{
                                setReciever(req.data);
                                props.setChange(!props.change);
                            });
                        }}>{item}</label>
                    })
                }</div>:null}
                {chatState===2?<div className={styles.messagesContainer}>
                    <div className={styles.messages}>
                        {messages.map((item)=>{
                            return <label style={item.reciever===props.user.userName?{...leftStyle}:{...rightStyle}}>{item.message}</label>
                        })}
                        <div ref={chatEndRef}></div>
                    </div>
                    <div className={styles.inputArea} onKeyDown={(e)=>{
                            if(e.key==='Enter'){
                                console.log('sent a message to ws');
                                console.log(socket.current);
                                socket.current.send('testing message');
                                const tempMessage = {
                                    sender:props.user.userName,
                                    reciever:reciever.userName,
                                    message:message,
                                    time:new Date().getSeconds()
                                }
                                axios.put(`http://${props.ipOfServer}:${props.httpPort}/chat`,{item:tempMessage}).then((req)=>{
                                    console.log(req.data);
                                    setMessage('');
                                    props.setChange(!props.change);
                                });
                            }
                        }}>
                        <input placeholder="Say something" value={message} onChange={(e)=>{
                            setMessage(e.target.value);
                        }}/>
                        <button className={styles.messageSendButton} onClick={()=>{
                            const tempMessage = {
                                sender:props.user.userName,
                                reciever:reciever.userName,
                                message:message,
                                time:new Date().getSeconds()
                            }
                            axios.put(`http://${props.ipOfServer}:${props.httpPort}/chat`,{item:tempMessage}).then((req)=>{
                                console.log(req.data);
                                setMessage('');
                                props.setChange(!props.change);
                            });
                        }}>Send</button>
                    </div>
                </div>:null}
            </div>:null}
        </div>
        <div className={styles.profileAccepted}>Accepted Tasks</div>
            <div className={styles.profileList}>{
            props.infoAccepted.length==0?<div className={styles.noTasks}>No Tasks</div>:props.infoAccepted.map((item,index)=>{
                let reciever = "NO1";
                switch(item.reciever_role){
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
                    <div className={styles.profileItemWhen}>{item.dateAccepted}</div>
                    <div className={styles.profileItemDone} onClick={()=>{
                        axios.post(`http://${props.ipOfServer}:${props.httpPort}/requests`,{reciever:props.user.userName,id:item.id,accepted:'DONE'}).then((req)=>{
                            props.setChange(!props.change);
                        });
                    }}>Done</div>
                </div>;
            })}
        </div>
    </div>;
}
export default Profile;