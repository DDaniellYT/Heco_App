import React from "react";
import styles from "../Styles/Inventory.module.css"


const Menu = (props)=>{
    return <div className={styles.menuContainer}>
        <div className={styles.menuTitle}>Menu</div>
        <input className={styles.menuSearch} placeholder="Search Item" value={props.searched} onChange={(e)=>{
            props.setSearched(e.target.value);
        }}/>
        <div className={styles.menuPlace} onClick={()=>{
            props.setStorage('Hall 1');
        }}>Hall 1</div>
        <div className={styles.menuPlace} onClick={()=>{
            props.setStorage('Hall 2');
        }}>Hall 2</div>
        <div className={styles.menuPlace} onClick={()=>{
            props.setStorage('Hall 3');
        }}>Hall 3</div>
        <div className={styles.menuPlace} onClick={()=>{
            props.setStorage('Hall 4');
        }}>Hall 4</div>
    </div>
}
export default Menu;