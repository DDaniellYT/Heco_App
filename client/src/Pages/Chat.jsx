import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

import axios from "axios";

import styles from "../Styles/Chat.module.css"

const Chat = (props)=>{
    const [seenMap,setSeenMap] = useState(new Map());
    
    const [recieverName, setRecieverName] = useState('');
    const [messages,setMessages] = useState([]);
    
    const [message,setMessage] = useState('');
    
    const chatStateRef = useRef(props.chatState);
    const chatEndRef = useRef(null);
    
    const leftStyle = {
        minWidth:'fit-content',
        alignSelf:'flex-start',
        backgroundColor:'rgb(173, 56, 219)'
    }
    const rightStyle = {
        minWidth:'fit-content',
        alignSelf:'flex-end',
        backgroundColor:'rgb(56, 176, 219)'
    }

    const socket = useRef(null);

    useEffect(()=>{
        chatStateRef.current = props.chatState;
        console.log(props.chatState,' <- chatstate');
        switch(props.chatState){
            case 1:{ // creating the connection and getting the seen
                if(socket.current && socket.current.readyState === 1){
                    socket.current.send(JSON.stringify({type:'get_seen',sender:props.user.userName}));
                }
                if(!socket.current){
                    setMessages([]);
                    const tempSocket = new WebSocket(`ws://${props.ipOfServer}:${props.wsPort}`);
                    socket.current = tempSocket;

                    tempSocket.onopen = async ()=>{
                        console.log(`socket alive for -> ${props.user.userName}`);
                        socket.current.send(JSON.stringify({type:'set_userName',sender:props.user.userName}));
                        socket.current.send(JSON.stringify({type:'get_seen',sender:props.user.userName}));
                    };
                    tempSocket.onmessage = async (req)=>{
                        const data = JSON.parse(req.data);
                        if(data.type === 'get_seen'){
                            console.log('update from get_seen');
                            const tempMap = new Map();
                            for(let element of data.data){
                                tempMap.set(element.sender,'NO');
                            }
                            setSeenMap(tempMap);
                        }
                        if(data.type === 'get_chat'){
                            console.log(data.data,' <- update from get_chat');
                            setMessages(data.data);
                        }
                    };
                    tempSocket.onclose = async ()=>{
                        console.log(`socket dead for -> ${props.userName}`);
                    };
                    console.log('connecting to websocked');
                }
                break;
            }
            case 2:{ // getting specific user messages
                socket.current.send(JSON.stringify({type:'get_chat',req:{sender:props.user.userName,reciever:recieverName,}}))
                break;
            }
            case 0:{ // closing the connection if one exists
                if(socket.current){
                    socket.current.close();
                    socket.current = null;
                }
                break;
            }
        }
    },[props.change,props.chatState,socket.current?socket.current.readyState:null]);
    useEffect(()=>{
        chatEndRef.current?.scrollIntoView({behavior:'smooth'});
    },[messages]);
    
    if(props.chatState===1){
        return <div className={styles.chatContainer}>
            <label className={styles.chatTitle}>Chat Title</label>
            <div className={styles.chatUserListContainer}>{
                    props.userNames.map((item)=>{
                        // make axios request to get last message and then the seen and time
                        return <div className={styles.chatUser} onClick={()=>{
                                setRecieverName(item);
                                props.setChatState(2);
                            }}>
                            <img className={styles.chatUserPic} alt="img of user"/>
                            <label className={styles.chatUserName}>{item}</label>
                            <label className={styles.chatLastMessage}>Lorem ipsum sadsad mnunds s ... </label>
                            <label className={styles.chatLastMessageTime}>19:02</label>
                            <label className={styles.chatSeen}>seen</label>
                        </div>
                    })
                }
            </div>
        </div>;
    }
    if(props.chatState===2){
        return <div className={styles.chatContainer}>
            <label className={styles.chatExit} onClick={()=>{
                props.setChatState(props.chatState-1)
                setMessages([]);
            }}>X</label>
            <label className={styles.chatTitle}>{recieverName}</label>
            <div className={styles.chatMessages}>{
                messages.map((item)=>{
                    return <div style={item.reciever === props.user.userName?leftStyle:rightStyle} className={styles.chatMessageContainer}>
                            <div style={props.user.userName===item.sender?{justifyContent:'right',alignSelf:'center'}:{justifyContent:'left',alignSelf:'center'}} className={styles.chatInternalUserName}>{props.user.userName===item.sender?'you':item.sender}</div>
                            <label style={item.reciever === props.user.userName?leftStyle:rightStyle} className={styles.chatMessage}>{item.message}</label>
                        </div>
                })}
                <div ref={chatEndRef}></div>
            </div>
            <div className={styles.chatInputArea}>
                <input id={'chat_input'} className={styles.chatInput} placeHolder='Say something!' value={message} onChange={(e)=>{
                    setMessage(e.target.value);
                }} onKeyDown={(e)=>{
                    if(e.key === 'Enter'){
                        const tempMessage = {
                            sender: props.user.userName,
                            reciever: recieverName,
                            message: message,
                            time: new Date().getTime()
                        }
                        if(tempMessage.message!==''){
                            socket.current.send(JSON.stringify({type:'add_message',message:tempMessage}));
                            socket.current.send(JSON.stringify({type:'get_chat',req:{sender:props.user.userName,reciever:recieverName}}));
                            setMessage('');
                            document.getElementById('chat_input').focus();
                        }
                        console.log('sent message');
                    }
                }}/>
                <button className={styles.chatSend} onClick={()=>{
                    const tempMessage = {
                        sender: props.user.userName,
                        reciever: recieverName,
                        message: message,
                        time: new Date().getTime()
                    }
                    if(tempMessage.message!==''){
                        socket.current.send(JSON.stringify({type:'add_message',message:tempMessage}));
                        socket.current.send(JSON.stringify({type:'get_chat',req:{sender:props.user.userName,reciever:recieverName}}));
                        setMessage('');
                        document.getElementById('chat_input').focus();
                    }
                    console.log('sent message');
                }}>Send</button>
            </div>
        </div>
    }

    // return <div className={styles.chatContainer}>
    //     <div className={styles.chatTitle}>{props.chatState===1?<label className={styles.chatLabel}>Chat</label>:<label className={styles.chatLabel}>{reciever.userName}</label>}
    //         <label className={styles.chatExit} onClick={()=>{
    //             props.setChatState(props.chatState-1);
    //             setMessages([]);
    //             setReciever(null);
    //         }}>X</label>
    //     </div>
    //     {props.chatState===1?<div className={styles.chatUsers}>
    //         {props.userNames.map((item)=>{
    //             return <label key={item} onClick={async ()=>{
    //                 setReciever(item);
    //                 props.setChatState(2);
    //                 await axios.get(`http://${props.ipOfServer}:${props.httpPort}/chat`,{params:{sender:props.user.userName,reciever:item,amount:30,type:'chat'}}).then(async (req)=>{
    //                     setMessages(req.data);
    //                     if(req.data.length>0 && req.data[req.data.length-1].reciever===props.user.userName)
    //                         await axios.post(`http://${props.ipOfServer}:${props.httpPort}/chat`,{item:{sender:item,reciever:props.user.userName}}).then((req)=>{
    //                             let tempMap = seenMap;
    //                             tempMap.set(item,'YES');
    //                             setSeenMap(tempMap);
    //                         });
    //                 });
    //                 props.setChange(!props.change);
    //             }}><div>{item}</div><label className={styles.chatUsersNewMessage}>{seenMap.get(item)==='NO'?'new':'seen'}</label><label>{'>'}</label></label>
    //         })
    //     }</div>:null}
    //     {props.chatState===2?<div className={styles.messagesContainer}>
    //         <div className={styles.messages}>
    //             {messages?messages.map((item)=>{
    //                 return <label key={JSON.stringify(item)} style={item.reciever===props.user.userName?{...leftStyle}:{...rightStyle}}>{item.message}</label>
    //             }):null}
    //             <div ref={chatEndRef}></div>
    //         </div>
    //         <div className={styles.inputArea} onKeyDown={(e)=>{
    //                 if(e.key==='Enter'){
    //                     const tempMessage = {
    //                         sender:props.user.userName,
    //                         reciever:reciever,
    //                         message:message,
    //                         time:new Date().getTime()
    //                     }
    //                     if(tempMessage.message!==''){
    //                         socket.current.send(JSON.stringify({type:'add_message',message:tempMessage}));
    //                         socket.current.send(JSON.stringify({type:'get_chat',req:{sender:props.user.userName,reciever:reciever}}))
    //                     }
    //                     setMessage('');
    //                 }
    //             }}>
    //             <input placeholder="Say something" value={message} onChange={(e)=>{
    //                 setMessage(e.target.value);
    //             }}/>
    //             <button className={styles.messageSendButton} onClick={()=>{
    //                 const tempMessage = {
    //                     sender:props.user.userName,
    //                     reciever:reciever.userName,
    //                     message:message,
    //                     time:new Date().getTime()
    //                 }
    //                 if(tempMessage.message!=='')
    //                     socket.current.send(JSON.stringify({type:'add_message',message:tempMessage}));
    //                 setMessage('');
    //             }}>Send</button>
    //         </div>
    //     </div>:null}
    // </div>
}
export default Chat;