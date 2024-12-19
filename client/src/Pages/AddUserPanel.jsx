import React , { useState } from "react";
import axios from "axios";
import CryptoJS from 'crypto-js'

import styles from "../Styles/ProfileList.module.css";


const AddUserPanel = (props)=>{
    const [role, setRole] = useState('');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [addState,setAddState] = useState(0);

    const [password, setPassword] = useState('');

    const [statusMessage, setStatusMessage] = useState('');
    const [passType,setPassType] = useState('');

    if(props.width < props.smallDim){
        return <div className={styles.userPanelBackground}>
            <div className={styles.userPanel}>
                <div className={styles.userProfilePicContainer}>
                    <input id='getFile' type="file" accept="image/png, image/gif, image/jpeg" className={styles.userProfileInput} onChange={(e)=>{
                        const reader = new FileReader();       
                        reader.onload = (e) => {
                            props.setImage(e.target.result);
                        };
                        reader.readAsDataURL(e.target.files[0]);    
                    }}/>
                    <img src={props.image?props.image:null} alt="Press me to upload pic (not yet working)" onClick={()=>{
                        document.getElementById('getFile').click();
                    }} className={styles.userPic}/>
                </div>
                <div className={styles.pageNum}>{addState}</div>
                <div className={styles.statusMessage}>{statusMessage}</div>
                {addState === 0?
                <>
                    <div className={styles.userFirstName}>
                        <label>FirstName:</label> 
                        <input maxLength={20} value={firstName} onChange={(e)=>{
                            setFirstName(e.target.value);
                            console.log(e.target.value);
                        }}/>
                    </div>
                    <div className={styles.userLastName}>
                        <label>LastName:</label> 
                        <input maxLength={20} value={lastName} onChange={(e)=>{
                            setLastName(e.target.value);
                            console.log(e.target.value);
                        }}/>
                    </div>
                </>
                :addState === 1?
                <>
                    <div className={styles.userUserName}>
                        <label>UserName:</label> 
                        <input maxLength={10} value={userName} onChange={(e)=>{
                            setUserName(e.target.value);
                            console.log(e.target.value);
                        }}/>
                    </div>
                    <div className={styles.userPassword}>
                        <label>Password:</label>
                        <input type={passType} maxLength={20} value={password} onChange={(e)=>{
                            setPassword(e.target.value);
                            console.log(e.target.value);
                        }}/>
                        <button onClick={()=>{
                            setPassType(passType==='password'?'':'password');
                        }}>{passType==='password'?'show':'hide'}</button>
                    </div>
                </>
                :addState === 2?
                <>
                    <div className={styles.userRole}>
                        <label>ROLE</label>
                        <div onClick={()=>{
                            setRole('Admin');
                        }}>Admin</div>
                        <div onClick={()=>{
                            setRole('Manager');
                        }}>Manager</div>
                        <div onClick={()=>{
                            setRole('Office');
                        }}>Office</div>
                        <div onClick={()=>{
                            setRole('Worker');
                        }}>Worker</div>
                    </div>
                </>
                :null
                }
                <div className={styles.userSubmit} onClick={()=>{
                    if(addState===0){
                        if(firstName === '' || lastName === ''){
                            setStatusMessage('No Empty Spaces Allowed!');
                        }
                        else{
                            setStatusMessage('');
                            setAddState(addState+1);
                        }
                    }
                    if(addState===1){
                        if(userName === '' || password === ''){
                            setStatusMessage('No Empty Spaces Allowed!');
                        }
                        else{
                            setStatusMessage('');
                            setAddState(addState+1);
                        }
                    }
                    if(addState===2){
                        const user = {
                            userName: userName,
                            password: CryptoJS.SHA256(password).toString(),
                            firstName: firstName,
                            lastName: lastName,
                            department: props.department,
                            role: role,
                        }
                        if(user.role !== '')
                            axios.put(`http://${props.ipOfServer}:${props.httpPort}/user`,{user:user}).then((req)=>{
                                if(req.status === 208) setStatusMessage('User already exists!');
                                if(req.status === 200) props.setState('all');
                                props.setImage(null);
                                props.setChange(!props.change);
                            });
                    }
                }}>{addState+1===3?'SUBMIT':'NEXT'}</div>
                <div className={styles.userBack} onClick={()=>{
                    setStatusMessage('');
                    if(addState-1>=0)
                        setAddState(addState-1);
                }}>BACK</div>
                <div className={styles.userCancel} onClick={()=>{
                    setAddState(0);
                    props.setState('all');
                }}>CANCEL</div>
            </div>
        </div>;
    }
    else{
        return <div className={styles.userPanelBackground}>
            <div className={styles.userPanel}>
                <div className={styles.userProfilePicContainer}>
                    <input id='getFile' type="file" accept="image/png, image/gif, image/jpeg" className={styles.userProfileInput} onChange={(e)=>{
                        const reader = new FileReader();       
                        reader.onload = (e) => {
                            props.setImage(e.target.result);
                        };
                        reader.readAsDataURL(e.target.files[0]);    
                    }}/>
                    <img src={props.image?props.image:null} alt="Press me to upload pic (not yet working)" onClick={()=>{
                        document.getElementById('getFile').click();
                    }} className={styles.userPic}/>
                </div>
                <div className={styles.statusMessage}>{statusMessage}</div>
                    <div style={props.width<800?{width:'100%',borderRadius:'15px 0px 0px 15px'}:null} className={styles.userFirstName}>
                        {props.width>800?<label>FIrstName:</label>:''}
                        <input maxLength={20} placeholder={props.width<800?"FIrstName":null} style={props.width<800?{width:'100%',gridColumn:'1/3'}:null} value={firstName} onChange={(e)=>{
                            setFirstName(e.target.value);
                            console.log(e.target.value);
                        }}/>
                    </div>
                    <div style={props.width<800?{width:'100%',borderRadius:'15px 0px 0px 15px'}:null} className={styles.userLastName}>
                        {props.width>800?<label>LastName:</label>:''}
                        <input maxLength={20} placeholder={props.width<800?"LastName":null} style={props.width<800?{width:'100%',gridColumn:'1/3'}:null} value={lastName} onChange={(e)=>{
                            setLastName(e.target.value);
                            console.log(e.target.value);
                        }}/>
                    </div>
                    <div style={props.width<800?{width:'100%',borderRadius:'0px 15px 15px 0px'}:null} className={styles.userUserName}>
                        {props.width>800?<label>UserName:</label>:''}
                        <input maxLength={10} placeholder={props.width<800?"UserName":null} style={props.width<800?{width:'100%',gridColumn:'1/3'}:null} value={userName} onChange={(e)=>{
                            setUserName(e.target.value);
                            console.log(e.target.value);
                        }}/>
                    </div>
                    <div style={props.width<800?{width:'100%',borderRadius:'0px 15px 15px 0px'}:null} className={styles.userPassword}>
                        {props.width>800?<label>Password:</label>:''}
                        <input type={passType} placeholder={props.width<800?"Password":null} style={props.width<800?{width:'100%',gridColumn:'1/3'}:null} maxLength={20} value={password} onChange={(e)=>{
                            setPassword(e.target.value);
                            console.log(e.target.value);
                        }}/>
                        <div className={styles.userPassButtonContainer}>
                            <button onClick={()=>{
                                setPassType(passType==='password'?'':'password');
                            }}>{passType==='password'?'show':'hide'}</button>
                        </div>
                    </div>
                    <div className={styles.userRole}>
                        <label>ROLE</label>
                        <div onClick={()=>{
                            setRole('Admin');
                        }}>Admin</div>
                        <div onClick={()=>{
                            setRole('Manager');
                        }}>Manager</div>
                        <div onClick={()=>{
                            setRole('Office');
                        }}>Office</div>
                        <div onClick={()=>{
                            setRole('Worker');
                        }}>Worker</div>
                    </div>
                <div className={styles.userSubmit} onClick={()=>{
                    
                    if(userName === '' || password === '' || firstName === '' || lastName === ''){
                        setStatusMessage('No Empty Spaces Allowed!');
                    }
                    else if(role === ''){
                        setStatusMessage('Role Cannot Be Empty!')
                    }
                    else{
                        setStatusMessage('');
                    }
                    if(userName !== '' && password !== '' && firstName !== '' && lastName !== '' && role !== ''){
                        const user = {
                            userName: userName,
                            password: CryptoJS.SHA256(password).toString(),
                            firstName: firstName,
                            lastName: lastName,
                            department: props.department,
                            role: role,
                        }
                        axios.put(`http://${props.ipOfServer}:${props.httpPort}/user`,{user:user}).then((req)=>{
                            if(req.status === 208) setStatusMessage('User already exists!');
                            if(req.status === 200) props.setState('all');
                            props.setImage(null);
                            props.setChange(!props.change);
                        });
                    }
                }}>SUBMIT</div>
                <div className={styles.userCancel} onClick={()=>{
                    setAddState(0);
                    props.setState('all');
                }}>CANCEL</div>
            </div>
        </div>;
    }
}

export default AddUserPanel;