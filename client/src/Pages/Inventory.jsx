import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import styles from "../Styles/Inventory.module.css";
import NavBar from "./Admin/NavBar";
import Menu from "./Menu";
import UpdateItemPanel from "./UpdateItemPanel";
import StorageSpace from "./StorageSpace";


const Inventory = (props)=>{

    const navState = useLocation();
    const user = {...navState.state};

    const [items,setItems] = useState([]);
    const [searched,setSearched] = useState('');
    const [itemChange,setItemChange] = useState(false);
    const [itemToBeChanged,setItemToBeChanged] = useState({});
    const [storageSpace,setStorage] = useState('Hall 1');

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
        axios.get(`http://${props.ipOfServer}:${props.httpPort}/inventory`).then((req)=>{
            setItems(req.data);
        });
    },[change]);

    return <div className={styles.container}>
        <NavBar user={user} ipOfServer={props.ipOfServer} change={change} setChange={setChange} requestPage={requestPage} setRequestPage={setRequestPage} httpPort={props.httpPort}/>
        <div className={styles.inventoryContainer}>
            <Menu searched={searched} setSearched={setSearched} setStorage={setStorage}/>
            <StorageSpace user={user} storageSpace={storageSpace} setItemChange={setItemChange} setItemToBeChanged={setItemToBeChanged} searched={searched} ipOfServer={props.ipOfServer} items={items} change={change} setChange={setChange} httpPort={props.httpPort}/>
            {itemChange?<UpdateItemPanel user={user} change={change} setChange={setChange} setItemChange={setItemChange} ipOfServer={props.ipOfServer} item={itemToBeChanged} httpPort={props.httpPort}/>:null}
        </div>
    </div>;
}
export default Inventory;