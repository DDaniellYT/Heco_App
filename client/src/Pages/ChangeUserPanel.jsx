import React , { useState } from "react";

import RequestItem from "./Admin/RequestItem"

import styles from "../Styles/ProfileList.module.css";


const ChangeUserPanel = (props)=>{
    const hours = Math.floor(props.userItem.time/3600);
    const minutes = Math.floor((props.userItem.time-hours*3600)/60);
    const seconds = props.userItem.time-hours*3600-minutes*60;

    return <div className={styles.detailsPanelContainer}>
        <div className={styles.detailsPanel}> 
            <div className={styles.detailsPanelPic} style={{
                backgroundImage:`url(${props.userItem.pic})`
            }}>picture</div>
            <div className={styles.detailsPanelName}>Name: {props.userItem.userName}</div>
            <div className={styles.detailsPanelRole}>Role: {props.userItem.role}</div>
            <div className={styles.detailsPanelTime}><label>Clock: _</label>  
                {hours.toString().length<2?`0${hours}`:hours}:
                {minutes.toString().length<2?`0${minutes}`:minutes}:
                {seconds.toString().length<2?`0${seconds}`:seconds}
            </div>
            <div className={styles.detailsPanelDepartment}>
                <div>Role:</div>
                <div>{props.userItem.role}</div>
            </div>
            <div className={styles.detailsPanelExit} onClick={()=>{
                props.setChangePanel(false);
            }}>X</div>
            <div className={styles.detailsPanelActivity}>
                {props.userActivity.map((item,index)=>{
                    return <RequestItem permisions={['Admin','Manager'].includes(props.user.role)?2:0} user={props.userItem} key={index} change={props.change} setChange={props.setChange} item={item} index={index+1} ipOfServer={props.ipOfServer} httpPort={props.httpPort}/>
                })}
            </div>
        </div>
    </div>;
}

export default ChangeUserPanel;