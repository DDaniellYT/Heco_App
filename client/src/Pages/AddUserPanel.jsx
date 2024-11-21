import React , { useState } from "react";
import axios from "axios";
import CryptoJS from 'crypto-js'

import styles from "../Styles/ProfileList.module.css";


const AddUserPanel = (props)=>{
    const [role, setRole] = useState('');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    const [statusMessage, setStatusMessage] = useState('');
    const [passType,setPassType] = useState('');


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
            <div className={styles.userUserName}>
                <label>UserName:</label> 
                <input maxLength={10} value={userName} onChange={(e)=>{
                    setUserName(e.target.value);
                    console.log(e.target.value);
                }}/>
            </div>
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
            <div className={styles.userPassword}>
                <label>Password:</label> 
                <input type={passType} maxLength={20} value={password} onChange={(e)=>{
                    setPassword(e.target.value);
                    console.log(e.target.value);
                }}/>
                <button className={styles.seePass} onClick={()=>{
                    setPassType(passType==='password'?'':'password');
                }}>{passType==='password'?'show':'hide'}</button>
            </div>
            {/* {props.department=='admin'?<div className={styles.userDepartment}>
                <label>DEPARTMENT</label>
                <div onClick={()=>{
                    props.setDepartment('HResources');
                }}>HResources</div>
                <div onClick={()=>{
                    props.setDepartment('Mechanics');
                }}>Mechanics</div>
                <div onClick={()=>{
                    props.setDepartment('Chemists');
                }}>Chemists</div>
                <div onClick={()=>{
                    props.setDepartment('Workers');
                }}>Workers</div>
                <div onClick={()=>{
                    props.setDepartment('Security');
                }}>Security</div>
                <div onClick={()=>{
                    props.setDepartment('Cleaning');
                }}>Cleaning</div>
            </div>:null} */}
            <div style={props.department==='admin'?{
                gridColumn : '3/4'
            }:null} className={styles.userRole}>
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
            <div className={styles.statusMessage}>{statusMessage}</div>
            <div className={styles.userSubmit} onClick={()=>{
                
                // TODO :
                // implement formData to send everything including an image
                // 

                const user = {
                    userName: userName,
                    password: CryptoJS.SHA256(password).toString(),
                    firstName: firstName,
                    lastName: lastName,
                    department: props.department,
                    role: role,
                }
                if(user.userName === '' || user.firstName === '' || user.lastName === '' || user.password === '' || user.role === '')setStatusMessage('No empty spaces allowed!');
                else {
                    axios.put(`http://${props.ipOfServer}:${props.httpPort}/user`,{user:user}).then((req)=>{
                        if(req.status === 208) setStatusMessage('User already exists!');
                        if(req.status === 200) props.setUserPanel(false);
                        props.setImage(null);
                        props.setChange(!props.change);
                    });
                }
            }}>Submit</div>
            <div className={styles.userCancel} onClick={()=>{
                props.setUserPanel(false);
            }}>Cancel</div>
        </div>
    </div>;
}

export default AddUserPanel;