import React from "react";
import {useNavigate} from "react-router-dom";
import { useState } from "react";

import axios from "axios";

import styles from '../../Styles/AdminNavBar.module.css'
import RequestPanel from "./RequestPanel";
import ChangeUserPanel from "../ChangeUserPanel";

function NavBar(props){
    const nav = useNavigate();
    const [departmentDropDown,setDepartmentDropDown] = useState(false);
    const [seeProfile,setSeeProfile] = useState(false);
    
    return <div className={styles.navBar}>
    <div className={styles.logo}></div> 
    <div className={styles.department} onMouseOver={()=>{
            setDepartmentDropDown(true);
        }} onMouseLeave={()=>{
            setDepartmentDropDown(false);
        }}> Departments
        {departmentDropDown ? <div className={styles.DepartmentDropdown}>
            <div onClick={()=>{nav('/home',{state:props.user});setDepartmentDropDown(false)}}>Home</div>
            <div onClick={()=>{nav('/DEP_HR',{state:props.user});setDepartmentDropDown(false)}}>Human Resources</div>
            <div onClick={()=>{nav('/DEP_Mechanics',{state:props.user});setDepartmentDropDown(false)}}>Mechanics</div>
            <div onClick={()=>{nav('/DEP_Chemists',{state:props.user});setDepartmentDropDown(false)}}>Chemists</div>
            <div onClick={()=>{nav('/DEP_Workers',{state:props.user});setDepartmentDropDown(false)}}>Workers</div>
            <div onClick={()=>{nav('/DEP_Cleaning',{state:props.user});setDepartmentDropDown(false)}}>Cleaning</div>
            <div onClick={()=>{nav('/DEP_Security',{state:props.user});setDepartmentDropDown(false)}}>Security</div>
        </div>:null}
    <div className={styles.arrow}>⌄</div></div>
    <div className={styles.request} onClick={()=>{ if(!props.requestPage)props.setRequestPage(true) }}>Request
    <div className={styles.arrow}>⌄</div>{
        props.requestPage ? <RequestPanel user={props.user} change={props.change} setChange={props.setChange} requestPage={props.requestPage} setRequestPage={props.setRequestPage} ipOfServer={props.ipOfServer} httpPort={props.httpPort}/> :null
    }</div>
    <div className={styles.inventory} onClick={()=>{nav('/inventory',{state:props.user})}}>Inventory<div className={styles.arrow}>⌄</div></div>
    <div className={styles.contact} onClick={()=>{nav('/contact',{state:props.user})}}>Contact<div className={styles.arrow}>⌄</div></div>
    <div className={styles.profile} onClick={()=>{setSeeProfile(true);}}>
        <label className={styles.smallProfileLabel}>{props.user.userName}</label>
        <img className={styles.smallProfilePic} alt='no profile pic yet' src='../../profileImages/heco_slider_img3.jpg'/>
    </div>
    {seeProfile?<ChangeUserPanel change={props.change} setChange={props.setChange} user={props.user} userItem={props.user} userActivity={props.infoAccepted} setChangePanel={setSeeProfile} ipOfServer={props.ipOfServer} httpPort={props.httpPort}/>:null}
    </div>
}

export default NavBar;