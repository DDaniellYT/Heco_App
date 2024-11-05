import React, { useEffect } from "react";
import { useState } from "react";
import styles from '../../Styles/AdminPortal.module.css'
import axios from "axios";

import NavBar from "./NavBar";
import Requests from "./Requests";
import Profile from "./Profile";

// post request template
// axios.post('http://localhost:8080/requests',{sender:'chem',reciever:'mech',subject:'sssa1123',message:'127932'}).then((req,res)=>{
//     console.log(req.data);
// });

// use this to get all specific or place nothing and get them all
// axios.get('http://localhost:8080/requests',{params:{reciever:'hr',sender:'mech'}}).then((req,res)=>{
//     console.log(req.data);
// })

function AdminPortal(){
    const [requestPage,setRequestPage] = useState(false);
    const [infoRequests,setInfoRequests] = useState([]);
    const [infoAccepted,setInfoAccepted] = useState([]);
    const [change,setChange] = useState(false);

    document.getElementById("root").className=styles.root;

    useEffect(()=>{
        axios.get('http://localhost:8080/lists').then((req,res)=>{
            setInfoAccepted(req.data.accepted);
            setInfoRequests(req.data.requests);
        })
        setChange(false);
    },[change])

    return <div className={styles.container}>
            <NavBar change={change} setChange={setChange} requestPage={requestPage} setRequestPage={setRequestPage}/>
            <Requests change={change} setChange={setChange} requestPage={requestPage} infoRequests={infoRequests} setInfoRequests={setInfoRequests} infoAccepted={infoAccepted} setInfoAccepted={setInfoAccepted}/>
            <Profile change={change} setChange={setChange} infoAccepted={infoAccepted}/>
        </div>
}
export default AdminPortal;