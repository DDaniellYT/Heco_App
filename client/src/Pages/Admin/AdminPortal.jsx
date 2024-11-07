import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import styles from '../../Styles/AdminPortal.module.css';
import photo from '../../profileImages/heco_slider_img3.jpg';
import axios from "axios";

import NavBar from "./NavBar";
import Activity from "./Activity";
import Profile from "./Profile";

// post request template
// axios.post('http://localhost:8080/requests',{sender:'chem',reciever:'mech',subject:'sssa1123',message:'127932'}).then((req,res)=>{
//     console.log(req.data);
// });

// use this to get all specific or place nothing and get them all
// axios.get('http://localhost:8080/requests',{params:{reciever:'hr',sender:'mech'}}).then((req,res)=>{
//     console.log(req.data);
// })
// for deleting from requests table knowing the id of the wanted item to be deleted
// axios.delete('http://localhost:8080/requests',{params:{id:1}}).then((res)=>{
//     console.log(res.data);
// });

function AdminPortal(){
    const navState= useLocation();
    const [requestPage,setRequestPage] = useState(false);
    const [infoRequests,setInfoRequests] = useState([]);
    const [infoAccepted,setInfoAccepted] = useState([]);
    const [change,setChange] = useState(false);
    const [user,setUser] = useState({userName:navState.state.userName});

    useEffect(()=>{
        document.getElementById("root").className = styles.root;
        axios.get('http://localhost:8080/requests',{params:{accepted:'yes'}}).then(req => setInfoAccepted(req.data));
        axios.get('http://localhost:8080/requests',{params:{accepted:'no'}}).then(req => setInfoRequests(req.data));
        axios.get('http://localhost:8080/users',{params:{userName:user.userName}}).then(req => setUser(req.data));
    },[change])

    return <div className={styles.container}>
        <NavBar change={change} setChange={setChange} requestPage={requestPage} setRequestPage={setRequestPage}/>
        <Activity change={change} setChange={setChange} requestPage={requestPage} infoRequests={infoRequests} setInfoRequests={setInfoRequests} infoAccepted={infoAccepted} setInfoAccepted={setInfoAccepted}/>
        <Profile user={user} setUser={setUser} photoLink={photo} change={change} setChange={setChange} infoAccepted={infoAccepted}/>
        </div>

}
export default AdminPortal;