import React, { useEffect, useState } from "react";
import styles from "../Styles/Inventory.module.css";

import AddItemPanel from "./AddItemPanel";


const Shelf = (props)=>{
    const focusStyle = {
        backgroundColor:'red',
        borderRadius:'10px'
    }

    return <div className={styles.storageShelf}>
        <div className={styles.storageItemSpace}>
            <ul className={styles.storageItemList}>{props.items.map((item,index)=>{
                if(JSON.parse(item.place)[1]==props.shelfNum && JSON.parse(item.place)[2]==1)
                    return <div key={JSON.stringify(item)} className={styles.storageItem} style={item.name.includes(props.searched)&&props.searched!=''?focusStyle:null} onClick={()=>{
                        props.setItemChange(true);
                        props.setItemToBeChanged(item);
                    }}>{item.name}</div>
                else return null;
            })}</ul>
        </div>
        <div className={styles.storageItemSpace}>
            <ul className={styles.storageItemList}>{props.items.map((item,index)=>{
                if(JSON.parse(item.place)[1]==props.shelfNum && JSON.parse(item.place)[2]==2)
                    return <div key={JSON.stringify(item)} className={styles.storageItem} style={item.name.includes(props.searched)&&props.searched!=''?focusStyle:null} onClick={()=>{
                        props.setItemChange(true);
                        props.setItemToBeChanged(item);
                    }}>{item.name}</div>
                else return null;
            })}</ul>
        </div>
        <div className={styles.storageItemSpace}>
            <ul className={styles.storageItemList}>{props.items.map((item,index)=>{
                if(JSON.parse(item.place)[1]==props.shelfNum && JSON.parse(item.place)[2]==3)
                    return <div key={JSON.stringify(item)} className={styles.storageItem} style={item.name.includes(props.searched)&&props.searched!=''?focusStyle:null} onClick={()=>{
                        props.setItemChange(true);
                        props.setItemToBeChanged(item);
                    }}>{item.name}</div>
                else return null;
            })}</ul>
        </div>
    </div>
}
const Hall = (props)=>{
    return <div className={styles.storageShelfContainer}>
        <Shelf setItemChange={props.setItemChange} setItemToBeChanged={props.setItemToBeChanged} searched={props.searched} shelfNum={1} items={props.items}/>
        <Shelf setItemChange={props.setItemChange} setItemToBeChanged={props.setItemToBeChanged} searched={props.searched} shelfNum={2} items={props.items}/>
        <Shelf setItemChange={props.setItemChange} setItemToBeChanged={props.setItemToBeChanged} searched={props.searched} shelfNum={3} items={props.items}/>
    </div>
}
const StorageSpace = (props)=>{
    const [addItem,setAddItem] = useState(false);
    return <div className={styles.storageSpaceContainer}>
        <label className={styles.storageSpace}>{props.storageSpace}</label>
        {addItem?<AddItemPanel hall={props.storageSpace} setAddItem={setAddItem} ipOfServer={props.ipOfServer} change={props.change} setChange={props.setChange}/>:null}
        <div className={styles.addItem} onClick={()=>{
            setAddItem(true);
        }}>+ Add</div>
        {props.storageSpace=='Hall 1'?<Hall setItemChange={props.setItemChange} setItemToBeChanged={props.setItemToBeChanged} searched={props.searched} items={props.items.filter((item)=>{
            return JSON.parse(item.place)[0] == 'Hall 1';
        })}/>:null}
        {props.storageSpace=='Hall 2'?<Hall setItemChange={props.setItemChange} setItemToBeChanged={props.setItemToBeChanged} searched={props.searched} items={props.items.filter((item)=>{
            return JSON.parse(item.place)[0] == 'Hall 2';
        })}/>:null}
        {props.storageSpace=='Hall 3'?<Hall setItemChange={props.setItemChange} setItemToBeChanged={props.setItemToBeChanged} searched={props.searched} items={props.items.filter((item)=>{
            return JSON.parse(item.place)[0] == 'Hall 3';
        })}/>:null}
        {props.storageSpace=='Hall 4'?<Hall setItemChange={props.setItemChange} setItemToBeChanged={props.setItemToBeChanged} searched={props.searched} items={props.items.filter((item)=>{
            return JSON.parse(item.place)[0] == 'Hall 4';
        })}/>:null}
        </div>
}
export default StorageSpace;