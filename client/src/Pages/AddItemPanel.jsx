import React from "react";
import styles from "../Styles/Inventory.module.css";

const AddItemPanel = (props)=>{
    return <div className={styles.addItemPanelContainer}>
        <div className={styles.addItemPanel}>
            <div className={styles.addItemTitle}>
                <label>Add Item</label>
                <div className={styles.addItemExit} onClick={()=>{
                    props.setAddItem(false);
                }}>X</div>
            </div>
            <img className={styles.itemPic} />
            <input className={styles.itemName} placeholder="itemName"/>
            <input className={styles.itemPlace} placeholder="itemPlace"/>
            <input className={styles.itemState} placeholder="itemState"/>
            <input className={styles.itemExistance} placeholder="itemExistance"/>
            <input className={styles.itemLast} placeholder="itemLast"/>
        </div>
    </div>
}
export default AddItemPanel;