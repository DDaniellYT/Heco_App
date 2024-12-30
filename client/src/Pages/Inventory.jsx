import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useClickAway } from "@uidotdev/usehooks";
import axios from "axios";

import styles from "../Styles/Inventory.module.css";
import NavBar from "./NavBar";
import Menu from "./Menu";
import UpdateItemPanel from "./UpdateItemPanel";
import StorageSpace from "./StorageSpace";


const Inventory = (props)=>{
    const hallAway = useClickAway((e)=>{
        if(e.target.id !== 'hallButton')
            setHallPressed(false);
    })
    const navState = useLocation();
    const user = {...navState.state};
    const [state,setState] = useState('menu');

    const [hallPressed,setHallPressed] = useState(false);
    const [items,setItems] = useState([]);
    const [searched,setSearched] = useState('');
    const [itemChange,setItemChange] = useState(false);
    const [itemToBeChanged,setItemToBeChanged] = useState({});
    const [storageSpace,setStorage] = useState('Hall 1');

    const [change,setChange] = useState(false);
    const [requestPage,setRequestPage] = useState(false);

    const [infoAccepted,setInfoAccepted] = useState([]);
    
    const testItem = {
        name:'testingfromclient',
        department:'Chemists',
        state:'Working',
        place:'storage1',
        existance:'yes',
        last:`${user.userName}`
    };

    useEffect(()=>{
        axios.get(`http://${props.ipOfServer}:${props.httpPort}/requests`,{params:{reciever_role:props.department,accepted:'YES'}}).then(req => setInfoAccepted(req.data));
        
        axios.get(`http://${props.ipOfServer}:${props.httpPort}/inventory`).then((req)=>{
            setItems(req.data);
        });
    },[change]);

    return <div className={styles.container}>
        <NavBar user={user} 
                infoAccepted={infoAccepted}
                change={change} 
                setChange={setChange} 
                requestPage={requestPage} 
                setRequestPage={setRequestPage} 
                width={props.width}
                height={props.height}
                smallDim={props.smallDim}
                largeDim={props.largeDim}
                state={state}
                setState={setState}
                ipOfServer={props.ipOfServer} 
                httpPort={props.httpPort}
                />
        <div className={styles.interface}>
            {state !== 'menu'?<button className={styles.returnButton} onClick={()=>{setState('menu');setHallPressed(false)}}>Menu</button>:null}
            {state === 'menu'?
                <div className={styles.menuContainer}>
                    <label className={styles.menu}>Menu</label>
                    <input className={styles.searchContainer} placeholder="Search an Item"/>
                    <label id='hallButton' ref={hallAway} className={styles.hallButton} style={{border:'0px',outline:'0px'}} 
                        onClick={()=>{setHallPressed(true)}} 
                        onMouseLeave={()=>{setHallPressed(false)}}>
                        {hallPressed?null:<label style={{border:'1px solid black',borderRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center'}}>Hall</label>}
                        {hallPressed?
                            <>
                                <label onClick={()=>{setState('Hall 1')}} style={{borderTop:'1px solid black',borderRadius:'10px 10px 0px 0px'}}>Hall 1</label>
                                <label onClick={()=>{setState('Hall 2')}}>Hall 2</label>
                                <label onClick={()=>{setState('Upper Hall')}}>Upper Hall</label>
                                <label onClick={()=>{setState('Random Parts')}} style={{borderBottom:'1px solid black',borderRadius:'0px 0px 10px 10px'}}>Random Parts</label>
                            </>
                        :null}
                    </label>
                    <label className={styles.addButton} style={hallPressed?{border:'0px',outline:'0px'}:null}>Add</label>
                </div>
            :state === 'Hall 1'?
                <div className={styles.hallContainer}>
                    <div className={styles.hallRow}>a</div>
                    <div className={styles.hallRow}>a</div>
                    <div className={styles.hallRow}>a</div>
                    <div className={styles.hallRow}>a</div>
                    <div className={styles.hallRow}>a</div>
                    <div className={styles.hallRow}>a</div>
                </div>
            :state === 'Hall 2'?
                <div>hall2</div>
            :state === 'Upper Hall'?
                <div>upper</div>
            :state === 'Random Parts'?
                <div>random</div>
            :null}
            
        </div>
        
        {/* <div className={styles.inventoryContainer}>
            <Menu searched={searched} setSearched={setSearched} setStorage={setStorage}/>
            <StorageSpace user={user} storageSpace={storageSpace} setItemChange={setItemChange} setItemToBeChanged={setItemToBeChanged} searched={searched} ipOfServer={props.ipOfServer} items={items} change={change} setChange={setChange} httpPort={props.httpPort}/>
            {itemChange?<UpdateItemPanel user={user} change={change} setChange={setChange} setItemChange={setItemChange} ipOfServer={props.ipOfServer} item={itemToBeChanged} httpPort={props.httpPort}/>:null}
        </div> */}
    </div>;
}
export default Inventory;