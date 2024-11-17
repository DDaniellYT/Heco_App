import React, { useEffect, useState } from "react";
import styles from "../Styles/Inventory.module.css";

import AddItemPanel from "./AddItemPanel";


const Shelf = (props)=>{
    return <div className={styles.storageShelf}>
        <div className={styles.storageItemSpace}>
            <ul className={styles.storageItemList}>{props.items.map((item,index)=>{
                if(JSON.parse(item.place)[0]==props.shelfNum && JSON.parse(item.place)[1]==1)
                    return <div className={styles.storageItem}>{item.name}</div>
                else return null;
            })}</ul>
        </div>
        <div className={styles.storageItemSpace}>
            <ul className={styles.storageItemList}>{props.items.map((item,index)=>{
                if(JSON.parse(item.place)[0]==props.shelfNum && JSON.parse(item.place)[1]==2)
                    return <div className={styles.storageItem}>{item.name}</div>
                else return null;
            })}</ul>
        </div>
        <div className={styles.storageItemSpace}>
            <ul className={styles.storageItemList}>{props.items.map((item,index)=>{
                if(JSON.parse(item.place)[0]==props.shelfNum && JSON.parse(item.place)[1]==3)
                    return <div className={styles.storageItem}>{item.name}</div>
                else return null;
            })}</ul>
        </div>
    </div>
}

const StorageSpace = (props)=>{

    const [addItem,setAddItem] = useState(false);

    return <div className={styles.storageSpaceContainer}>
        {addItem?<AddItemPanel setAddItem={setAddItem} ipOfServer={props.ipOfServer} change={props.change} setChange={props.setChange}/>:null}
        <div className={styles.addItem} onClick={()=>{
            setAddItem(true);
        }}>+ Add</div>
        <div className={styles.storageShelfContainer}>
            <Shelf shelfNum={1} items={props.items}/>
            <Shelf shelfNum={2} items={props.items}/>
            <Shelf shelfNum={3} items={props.items}/>
            <Shelf shelfNum={4} items={props.items}/>
            <Shelf shelfNum={5} items={props.items}/>
            <Shelf shelfNum={6} items={props.items}/>
            <Shelf shelfNum={7} items={props.items}/>
        </div>
    </div>
}
export default StorageSpace;