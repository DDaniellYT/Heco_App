import React , { useState } from "react";
import axios from "axios";

import styles from "../Styles/ProfileList.module.css";


const AddUserPanel = (props)=>{
    const [role, setRole] = useState('');
    const [picture, setPicture] = useState();
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    const [statusMessage, setStatusMessage] = useState('');

    return <div className={styles.userPanelBackground}>
        <div className={styles.userPanel}>
            <div className={styles.userProfilePicContainer}>
                <input id='getFile' type="file" accept="image/png, image/gif, image/jpeg" className={styles.userProfileInput}/>
                <div type='file' className={styles.userProfilePic} onClick={()=>{
                    document.getElementById('getFile').click();
                }}>{picture?null:'Press me to upload Picture!'}</div>
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
                <input maxLength={20} value={password} onChange={(e)=>{
                    setPassword(e.target.value);
                    console.log(e.target.value);
                }}/>
            </div>
            {props.department=='admin'?<div className={styles.userDepartment}>
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
            </div>:null}
            <div style={props.department=='admin'?{
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
                const user = {
                    userName: userName,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    department: props.department,
                    role: role,
                }
                if(user.userName == '' || user.firstName == '' || user.lastName == '' || user.password == '' || user.role == '')setStatusMessage('No empty spaces allowed!');
                else {
                    axios.put(`http://${props.ipOfServer}:8080/user`,{user:user}).then((req)=>{
                        if(req.status == 208) setStatusMessage('User already exists!');
                        if(req.status == 200) props.setUserPanel(false);
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