import React from "react";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";

import styles from '../Styles/AdminNavBar.module.css'
import RequestPanel from "./RequestPanel";

function NavBar(props){
    const nav = useNavigate();
    const [departmentDropDown,setDepartmentDropDown] = useState(false);
    const [dropDownButtons,setDropDownButtons] = useState(false);

    const departmentAway = useClickAway((e)=>{
        if(e.target.id === 'menuButton')
            setDropDownButtons(true);
        setDepartmentDropDown(false);
    })
    const menuAway = useClickAway((e)=>{
        if(e.target.id !== 'menuButton')
            setDropDownButtons(false);
    })

    // SMALL DEVICES
    if(props.width <= props.smallDim){
        return <div id={'navBar'} className={styles.navBar}>
                {dropDownButtons?<div className={styles.dropDownList} ref={menuAway}>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{nav('/home',{state:props.user});setDropDownButtons(false);props.setRequestPage(false);props.setState('all')}}><label className={styles.button}>Home</label><label className={styles.homeIcon}></label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{setDropDownButtons(false);setDepartmentDropDown(true);props.setRequestPage(false)}}><label className={styles.button}>Departments</label><label className={styles.departmentIcon}></label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{props.setRequestPage(true);props.setState('all');setDropDownButtons(false)}}><label className={styles.button}>Request</label><label className={styles.requestIcon}></label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{nav('/inventory',{state:props.user});setDropDownButtons(false);props.setRequestPage(false)}}><label className={styles.button}>Inventory</label><label className={styles.inventoryIcon}></label></div>
                    <div style={{
                        borderRadius:'0px 0px 15px 10px',   
                        borderBottom:'2px solid black',
                        borderRight:'2px solid black'
                    }} onClick={()=>{nav('/contact',{state:props.user})}}><label className={styles.button}>Contact</label><label className={styles.contactIcon}></label></div>
                </div>:null}
                {departmentDropDown?<div className={styles.dropDownList} ref={departmentAway}>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{nav("/DEP_HR",{state:props.user});setDepartmentDropDown(false);setDropDownButtons(false);}}><label className={styles.button}>HResources</label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{nav("/DEP_Mechanics",{state:props.user});setDepartmentDropDown(false);setDropDownButtons(false);}}><label className={styles.button}>Mechanics</label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{nav("/DEP_Chemists",{state:props.user});setDepartmentDropDown(false);setDropDownButtons(false);}}><label className={styles.button}>Chemists</label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{nav("/DEP_Workers",{state:props.user});setDepartmentDropDown(false);setDropDownButtons(false);}}><label className={styles.button}>Workers</label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{nav("/DEP_Security",{state:props.user});setDepartmentDropDown(false);setDropDownButtons(false);}}><label className={styles.button}>Security</label></div>
                    <div style={{
                        borderRadius:'0px 0px 15px 10px',
                        borderBottom:'2px solid black',
                        borderRight:'2px solid black'
                    }} onClick={()=>{nav("/DEP_Cleaning",{state:props.user});setDepartmentDropDown(false);setDropDownButtons(false);}}><label className={styles.button}>Cleaning</label></div>
                </div>:null}
                <div id={'menuButton'} className={styles.menuDropDown} onClick={()=>{
                    setDropDownButtons(true);
                    setDepartmentDropDown(false);
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
                :null}
            </div>
            <div className={styles.profile} onClick={()=>{props.setState('profile')}}>
                <label className={styles.smallProfileLabel}>{props.user.userName}</label>
                <img className={styles.smallProfilePic} alt='no profile pic yet' src='../../profileImages/heco_slider_img3.jpg'/>
            </div>
        </div>
    }

    // MEDIUM DEVICES
    if(props.width > props.smallDim && props.width < props.largeDim){
        return <div id={'navBar'} className={styles.navBar}>
                {dropDownButtons?<div className={styles.dropDownList} ref={menuAway}>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{nav('/home',{state:props.user});setDropDownButtons(false);props.setState('all')}}><label className={styles.button}>Home</label><label className={styles.homeIcon}></label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{setDropDownButtons(false);setDepartmentDropDown(true);props.setRequestPage(false)}}><label className={styles.button}>Departments</label><label className={styles.departmentIcon}></label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{props.setRequestPage(true);props.setState('all');setDropDownButtons(false)}}><label className={styles.button}>Request</label><label className={styles.requestIcon}></label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{nav('/inventory',{state:props.user});setDropDownButtons(false)}}><label className={styles.button}>Inventory</label><label className={styles.inventoryIcon}></label></div>
                    <div style={{
                        borderRadius:'0px 0px 15px 10px',
                        borderBottom:'2px solid black',
                        borderRight:'2px solid black'
                    }} onClick={()=>{nav('/contact',{state:props.user})}}><label className={styles.button}>Contact</label><label className={styles.contactIcon}></label></div>
                </div>:null}
                {departmentDropDown?<div className={styles.dropDownList} ref={departmentAway}>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{nav("/DEP_HR",{state:props.user});setDepartmentDropDown(false);setDropDownButtons(false);}}><label className={styles.button}>HResources</label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{nav("/DEP_Mechanics",{state:props.user});setDepartmentDropDown(false);setDropDownButtons(false);}}><label className={styles.button}>Mechanics</label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{nav("/DEP_Chemists",{state:props.user});setDepartmentDropDown(false);setDropDownButtons(false);}}><label className={styles.button}>Chemists</label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{nav("/DEP_Workers",{state:props.user});setDepartmentDropDown(false);setDropDownButtons(false);}}><label className={styles.button}>Workers</label></div>
                    <div style={{borderRight:'2px solid black'}} onClick={()=>{nav("/DEP_Security",{state:props.user});setDepartmentDropDown(false);setDropDownButtons(false);}}><label className={styles.button}>Security</label></div>
                    <div style={{
                        borderRadius:'0px 0px 15px 10px',
                        borderBottom:'2px solid black',
                        borderRight:'2px solid black'
                    }} onClick={()=>{nav("/DEP_Cleaning",{state:props.user});setDepartmentDropDown(false);setDropDownButtons(false);}}><label className={styles.button}>Cleaning</label></div>
                </div>:null}
                <div className={styles.menuDropDown} onClick={()=>{
                    setDropDownButtons(true);
                    setDepartmentDropDown(false);
                }} onMouseLeave={(e)=>{
                    setDropDownButtons(false);
                    setDepartmentDropDown(false);
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
        <div className={styles.request} onClick={()=>{props.setRequestPage(props.requestPage?false:true)}}>Request
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
        <div className={styles.profile} onClick={()=>{props.setState(props.state==='profile'?'all':'profile')}}>
            <label className={styles.smallProfileLabel}>{props.user.userName}</label>
            <img className={styles.smallProfilePic} alt='no profile pic yet' src='../../profileImages/heco_slider_img3.jpg'/>
        </div>
        </div>;
    }
}

export default NavBar;