import React from "react";
import {useNavigate} from "react-router-dom";
import { useState } from "react";

import styles from '../Styles/AdminNavBar.module.css'
import RequestPanel from "./RequestPanel";
import ChangeUserPanel from "./ChangeUserPanel";

function NavBar(props){
    const nav = useNavigate();
    const [departmentDropDown,setDepartmentDropDown] = useState(false);
    const [seeProfile,setSeeProfile] = useState(false);
    const [dropDownButtons,setDropDownButtons] = useState(false);

    // SMALL DEVICES
    if(props.width <= props.smallDim){
        return <div className={styles.navBar}>
                {dropDownButtons?<div className={styles.dropDownList}>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{nav('/home',{state:props.user});setDropDownButtons(false);props.setRequestPage(false);props.setState('all')}}><label className={styles.button}>Home</label><label className={styles.homeIcon}></label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{console.log('create another dropdown for this');setDropDownButtons(false);props.setRequestPage(false)}}><label className={styles.button}>Departments</label><label className={styles.departmentIcon}></label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{props.setRequestPage(true);setDropDownButtons(false)}}><label className={styles.button}>Request</label><label className={styles.requestIcon}></label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{nav('/inventory',{state:props.user});setDropDownButtons(false);props.setRequestPage(false)}}><label className={styles.button}>Inventory</label><label className={styles.inventoryIcon}></label></div>
                    <div style={{
                        borderRadius:'0px 0px 15px 10px',
                        borderBottom:'2px solid black',
                        borderRight:'2px solid black'
                    }} onClick={()=>{nav('/contact',{state:props.user})}}><label className={styles.button}>Contact</label><label className={styles.contactIcon}></label></div>
                </div>:null}
                <div className={styles.menuDropDown} onClick={()=>{
                    setDropDownButtons(true);
                }} onMouseLeave={(e)=>{
                    setDropDownButtons(false);
                }}>{
                    props.requestPage?
                        <RequestPanel 
                            user={props.user}
                            change={props.change}
                            setChange={props.setChange}
                            requestPage={props.requestPage}
                            setRequestPage={props.setRequestPage}
                            width={props.width}
                            smallDim={props.smallDim}
                            ipOfServer={props.ipOfServer}
                            httpPort={props.httpPort}/>
                    :null
                }
            </div>
            <div className={styles.profile} onClick={()=>{props.setState('profile')}}>
                <label className={styles.smallProfileLabel}>{props.user.userName}</label>
                <img className={styles.smallProfilePic} alt='no profile pic yet' src='../../profileImages/heco_slider_img3.jpg'/>
            </div>
        </div>
    }

    // MEDIUM DEVICES
    if(props.width > props.smallDim && props.width < props.largeDim){
        return <div className={styles.navBar}>
                {dropDownButtons?<div className={styles.dropDownList}>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{nav('/home',{state:props.user});setDropDownButtons(false);props.setState('all')}}><label className={styles.button}>Home</label><label className={styles.homeIcon}></label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{console.log('create another dropdown for this');setDropDownButtons(false)}}><label className={styles.button}>Departments</label><label className={styles.departmentIcon}></label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{console.log('create the requests tab');setDropDownButtons(false)}}><label className={styles.button}>Request</label><label className={styles.requestIcon}></label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{nav('/inventory',{state:props.user});setDropDownButtons(false)}}><label className={styles.button}>Inventory</label><label className={styles.inventoryIcon}></label></div>
                    <div style={{
                        borderRadius:'0px 0px 15px 10px',
                        borderBottom:'2px solid black',
                        borderRight:'2px solid black'
                    }} onClick={()=>{nav('/contact',{state:props.user})}}><label className={styles.button}>Contact</label><label className={styles.contactIcon}></label></div>
                </div>:null}
                <div className={styles.menuDropDown} onClick={()=>{
                    setDropDownButtons(true);
                }} onMouseLeave={(e)=>{
                    setDropDownButtons(false);
                }}>
            </div>{
                props.requestPage?
                    <RequestPanel 
                        user={props.user}
                        change={props.change}
                        setChange={props.setChange}
                        requestPage={props.requestPage}
                        setRequestPage={props.setRequestPage}
                        width={props.width}
                        smallDim={props.smallDim}
                        ipOfServer={props.ipOfServer}
                        httpPort={props.httpPort}/>
                :null
            }
            <div className={styles.profile} onClick={()=>{props.setState('profile')}}>
                <label className={styles.smallProfileLabel}>{props.user.userName}</label>
                <img className={styles.smallProfilePic} alt='no profile pic yet' src='../../profileImages/heco_slider_img3.jpg'/>
            </div>
        </div>
    }

    // LARGE DEVICES LIKE LAPTOPS
    if(props.width >= props.largeDim){
        return <div className={styles.navBar}>
        <div className={styles.logo}></div> 
        <div className={styles.department} onMouseOver={()=>{setDepartmentDropDown(true)}} onMouseLeave={()=>{setDepartmentDropDown(false)}}>
            <label>Department<div className={styles.arrow}>⌄</div></label>
            {departmentDropDown?<div style={{borderLeft:'2px solid black',borderRight:'2px solid black'}} className={styles.departmentItem} onClick={()=>{nav('/home',{state:props.user});setDepartmentDropDown(false);props.setState('all')}}><label>Home</label><label className={styles.arrow}></label></div>:null}
            {departmentDropDown?<div style={{borderLeft:'2px solid black',borderRight:'2px solid black'}} className={styles.departmentItem} onClick={()=>{nav('/DEP_HR',{state:props.user});setDepartmentDropDown(false)}}><label>HResources</label><label className={styles.arrow}></label></div>:null}
            {departmentDropDown?<div style={{borderLeft:'2px solid black',borderRight:'2px solid black'}} className={styles.departmentItem} onClick={()=>{nav('/DEP_Mechanics',{state:props.user});setDepartmentDropDown(false)}}><label>Mechanics</label><label className={styles.arrow}></label></div>:null}
            {departmentDropDown?<div style={{borderLeft:'2px solid black',borderRight:'2px solid black'}} className={styles.departmentItem} onClick={()=>{nav('/DEP_Chemists',{state:props.user});setDepartmentDropDown(false)}}><label>Chemists</label><label className={styles.arrow}></label></div>:null}
            {departmentDropDown?<div style={{borderLeft:'2px solid black',borderRight:'2px solid black'}} className={styles.departmentItem} onClick={()=>{nav('/DEP_Workers',{state:props.user});setDepartmentDropDown(false)}}><label>Workers</label><label className={styles.arrow}></label></div>:null}
            {departmentDropDown?<div style={{borderLeft:'2px solid black',borderRight:'2px solid black'}} className={styles.departmentItem} onClick={()=>{nav('/DEP_Cleaning',{state:props.user});setDepartmentDropDown(false)}}><label>Cleaning</label><label className={styles.arrow}></label></div>:null}
            {departmentDropDown?<div style={{borderRadius:'0px 0px 15px 15px',borderLeft:'2px solid black',borderRight:'2px solid black',borderBottom:'2px solid black'}} className={styles.departmentItem} onClick={()=>{nav('/DEP_Security',{state:props.user});setDepartmentDropDown(false)}}><label>Security</label><label className={styles.arrow}></label></div>:null}
        </div>
        <div className={styles.request} onClick={()=>{if(!props.requestPage)props.setRequestPage(true)}}>Request
        <div className={styles.arrow}>⌄</div>{
            props.requestPage?
                <RequestPanel 
                    user={props.user}
                    change={props.change}
                    setChange={props.setChange}
                    requestPage={props.requestPage}
                    setRequestPage={props.setRequestPage}
                    width={props.width}
                    smallDim={props.smallDim}
                    ipOfServer={props.ipOfServer}
                    httpPort={props.httpPort}/>
            :null
        }</div>
        <div className={styles.inventory} onClick={()=>{nav('/inventory',{state:props.user})}}>Inventory<div className={styles.arrow}>⌄</div></div>
        <div className={styles.contact} onClick={()=>{nav('/contact',{state:props.user})}}>Contact<div className={styles.arrow}>⌄</div></div>
        <div className={styles.profile} onClick={()=>{setSeeProfile(true);}}>
            <label className={styles.smallProfileLabel}>{props.user.userName}</label>
            <img className={styles.smallProfilePic} alt='no profile pic yet' src='../../profileImages/heco_slider_img3.jpg'/>
        </div>
        {seeProfile?<ChangeUserPanel change={props.change} setChange={props.setChange} user={props.user} userItem={props.user} userActivity={props.infoAccepted} setChangePanel={setSeeProfile} ipOfServer={props.ipOfServer} httpPort={props.httpPort}/>:null}
        </div>;
    }
}

export default NavBar;