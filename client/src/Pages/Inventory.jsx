import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import styles from "../Styles/Inventory.module.css";
import NavBar from "./Admin/NavBar";
import Menu from "./Menu";
import StorageSpace from "./StorageSpace";


const Inventory = (props)=>{

    const navState = useLocation();
    const user = {...navState.state};

    const [items,setItems] = useState([]);

    const [storage1,setStorage1] = useState(false);
    const [storage2,setStorage2] = useState(false);
    const [storage3,setStorage3] = useState(false);
    const [storage4,setStorage4] = useState(false);

    const [change,setChange] = useState(false);
    const [requestPage,setRequestPage] = useState(false);

    const testItem = {
        name:'testingfromclient',
        department:'Chemists',
        state:'Working',
        place:'storage1',
        existance:'yes',
        last:`${user.userName}`
    };

    useEffect(()=>{
        axios.get(`http://${props.ipOfServer}:8080/inventory`).then((req)=>{
            setItems(req.data);
            console.log(req.data);
        });
    },[change]);

    return <div className={styles.container}>
        <NavBar user={user} ipOfServer={props.ipOfServer} change={change} setChange={setChange} requestPage={requestPage} setRequestPage={setRequestPage}/>
        <div className={styles.inventoryContainer}>
            <Menu  setStorage1={setStorage1} setStorage2={setStorage2} setStorage3={setStorage3} setStorage4={setStorage4}/>
            <StorageSpace ipOfServer={props.ipOfServer} items={items} storage1={storage1} storage2={storage2} storage3={storage3} storage4={storage4} change={change} setChange={setChange}/>
        </div>
    </div>;
}
export default Inventory;