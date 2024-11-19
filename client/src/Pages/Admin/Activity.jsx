import React, { useState } from "react";
import styles from '../../Styles/Activity.module.css'
import RequestItem from "./RequestItem";

function Activity(props){

    const [dropDown,setDropDown] = useState(false);
    const priorityOrder = ['Lowest','Low','Somewhat','High','Top'];
    const departmentOrder = ['HResources','Mechanics','Chemists','Workers','Security','Cleaning'];

    return <div className={styles.infoListContainer}>
        {props.infoRequests.length==0?null:<div className={styles.infoTitle}>Activity</div>}
        {/* sorting button to be made */}
        {/* {props.infoRequests.length==0?null:<div className={styles.infoSortButtonContainer}>
            <div className={styles.infoSortButton} onClick={()=>{
                setDropDown(true);
            }} onMouseLeave={()=>{
                setDropDown(false);
            }}>Sort
            {dropDown?<div className={styles.dropDownItem} onClick={()=>{
                props.setInfoRequests(props.infoRequests.sort((a,b)=>{
                    console.log(a.priority);
                    console.log(b.priority);
                    return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
                }));
            }}>By Priority</div>:null}
            {dropDown?<div className={styles.dropDownItem} onClick={()=>{
                props.setInfoRequests(props.infoRequests.sort((a,b)=>{
                    console.log(a.department);
                    console.log(b.department);
                    return departmentOrder.indexOf(a.department) - departmentOrder.indexOf(b.department);
                }));
            }}>By Time Created</div>:null}
            {dropDown?<div className={styles.dropDownItem} onClick={()=>{
                props.setInfoRequests(props.infoRequests.sort((a,b)=>{
                    console.log(a.dateRequested);
                    console.log(b.dateRequested);
                    return a.dateRequested - b.dateRequested;
                }));
            }}>By What Department</div>:null}
            </div> 
        </div>} */}
        {props.infoRequests.length!=0?null:<div className={styles.noActivity}>No Activity Yet</div>}
        {props.infoRequests.length!=0?null:<div className={styles.infoAddMessageContainer}><div className={styles.infoAddMessage}>Add a request from the Requests Tab</div></div>}
        <ul className={styles.infoList}>{
            props.infoRequests.map((item,index)=>{
                return <RequestItem permisions={props.department == props.user.department?props.user.role=='Admin'?2:1:0} ipOfServer={props.ipOfServer} key={index} change={props.change} setChange={props.setChange} item={item} index={index+1}/>
            })}
        </ul>
    </div>;
}
export default Activity;