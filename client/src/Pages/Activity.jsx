import React, { useState } from "react";
import styles from '../Styles/Activity.module.css'
import RequestItem from "./RequestItem";

function Activity(props){

    return <div className={styles.infoListContainer}>
        {props.infoRequests.length===0?null:<div className={styles.infoTitle}>Activity</div>}
        {props.infoRequests.length!==0?null:<div className={styles.noActivity}>No Activity Yet</div>}
        {props.infoRequests.length!==0?null:<div className={styles.infoAddMessageContainer}><div className={styles.infoAddMessage}>Add a request from the Requests Tab</div></div>}
        <ul className={styles.infoList}>{
            props.infoRequests.map((item,index)=>{
                return <RequestItem permisions={props.user.department==='all'?3:props.department === props.user.department?props.user.role==='Admin'?3:1:0} 
                                    user={props.user} 
                                    key={index} 
                                    change={props.change} 
                                    setChange={props.setChange} 
                                    item={item} 
                                    index={index+1}
                                    ipOfServer={props.ipOfServer}
                                    httpPort={props.httpPort}/> 
            })}
        </ul>
    </div>;
}
export default Activity;