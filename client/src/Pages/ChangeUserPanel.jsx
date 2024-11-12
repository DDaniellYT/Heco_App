import React , { useState } from "react";

import RequestItem from "./Admin/RequestItem"

import styles from "../Styles/ProfileList.module.css";


const ChangeUserPanel = (props)=>{
    const hours = Math.floor(props.item.time/3600);
    const minutes = Math.floor((props.item.time-hours*3600)/60);
    const seconds = props.item.time-hours*3600-minutes*60;

    return <div className={styles.detailsPanelContainer}>
        <div className={styles.detailsPanel}> 
            <div className={styles.detailsPanelPic} style={{
                backgroundImage:`url(${props.user.pic})`
            }}>picture</div>
            <div className={styles.detailsPanelName}>Name: {props.user.userName}</div>
            <div className={styles.detailsPanelRole}>Role: {props.user.role}</div>
            <div className={styles.detailsPanelTime}><label>Clock: _</label>  
                {hours.toString().length<2?`0${hours}`:hours}:
                {minutes.toString().length<2?`0${minutes}`:minutes}:
                {seconds.toString().length<2?`0${seconds}`:seconds}
            </div>
            <div className={styles.detailsPanelDepartment}>
                <div>Role:</div>
                <div>{props.user.role}</div>
            </div>
            <div className={styles.detailsPanelExit} onClick={()=>{
                props.setChangePanel(false);
            }}>X</div>
            <div className={styles.detailsPanelActivity}>
                {props.userActivity.map((item,index)=>{
                    return <RequestItem user={props.user} ipOfServer={props.ipOfServer} key={index} change={props.details} setChange={props.setChange} item={item} index={index+1}/>
                })}
            </div>
        </div>
    </div>;
}

export default ChangeUserPanel;