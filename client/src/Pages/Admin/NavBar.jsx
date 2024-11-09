import React from "react";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import styles from '../../Styles/AdminNavBar.module.css'

import RequestPanel from "./RequestPanel";

function NavBar(props){
    const nav = useNavigate();
    const [departmentDropDown,setDepartmentDropDown] = useState(false);

    return <div className={styles.navBar}>
    <div className={styles.logo}></div> 
    <div className={styles.department} onMouseOver={()=>{
            setDepartmentDropDown(true);
        }} onMouseLeave={()=>{
            setDepartmentDropDown(false);
        }}> Departments
        {departmentDropDown ? <div className={styles.DepartmentDropdown}>
            <div onClick={()=>{nav('/DEP_HR',{state:props.user})}}>Human Resources</div>
            <div onClick={()=>{nav('/DEP_Mechanics',{state:props.user})}}>Mechanics</div>
            <div onClick={()=>{nav('/DEP_Chemists',{state:props.user})}}>Chemists</div>
            <div onClick={()=>{nav('/DEP_Workers',{state:props.user})}}>Workers</div>
            <div onClick={()=>{nav('/DEP_Cleaning',{state:props.user})}}>Cleaning</div>
            <div onClick={()=>{nav('/DEP_Security',{state:props.user})}}>Security</div>
        </div>:null}
    <div className={styles.arrow}>⌄</div></div>
    <div className={styles.request} onClick={()=>{ if(!props.requestPage)props.setRequestPage(true) }}>Request
    <div className={styles.arrow}>⌄</div>{
        props.requestPage ? <RequestPanel ipOfServer={props.ipOfServer} change={props.change} setChange={props.setChange} requestPage={props.requestPage} setRequestPage={props.setRequestPage}/> :null
    }</div>
    <div className={styles.response} onClick={()=>{nav('/response')}}>Respond<div className={styles.arrow}>⌄</div></div> 
    <div className={styles.inventory} onClick={()=>{nav('/inventory')}}>Inventory<div className={styles.arrow}>⌄</div></div>
    <div className={styles.contact} onClick={()=>{nav('/contact')}}>Contact<div className={styles.arrow}>⌄</div></div>
    <div className={styles.input}>
        <input className={styles.searchInput}/>
        <div className={styles.searchButton} onClick={()=>{
            //search for the thing
        }}>?</div>
        </div>
    </div>
}

export default NavBar;