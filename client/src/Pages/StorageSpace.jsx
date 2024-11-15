import React, { useState } from "react";
import styles from "../Styles/Inventory.module.css";

import AddItemPanel from "./AddItemPanel";

const StorageSpace = (props)=>{

    const [addItem,setAddItem] = useState(false);

    return <div className={styles.storageSpaceContainer}>
        {addItem?<AddItemPanel setAddItem={setAddItem} ipOfServer={props.ipOfServer} change={props.change} setChange={props.setChange}/>:null}
        <div className={styles.addItem} onClick={()=>{
            setAddItem(true);
        }}>+ Add</div>
        storage1
        storage2
        storage3 
        .
        .
    </div>
}
export default StorageSpace;