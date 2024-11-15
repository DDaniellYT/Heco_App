import React from "react";
import styles from "../Styles/Inventory.module.css"


const Menu = (props)=>{
    return <div className={styles.menuContainer}>
        <div className={styles.menuTitle}>Menu</div>
        <input className={styles.menuSearch} placeholder="Search Item"/>
        <div className={styles.menuPlace} onClick={()=>{
            props.setStorage1(true);
            props.setStorage2(false);
            props.setStorage3(false);
            props.setStorage4(false);
        }}>Place1</div>
        <div className={styles.menuPlace} onClick={()=>{
            props.setStorage1(false);
            props.setStorage2(true);
            props.setStorage3(false);
            props.setStorage4(false);
        }}>Place2</div>
        <div className={styles.menuPlace} onClick={()=>{
            props.setStorage1(false);
            props.setStorage2(false);
            props.setStorage3(true);
            props.setStorage4(false);
        }}>Place3</div>
        <div className={styles.menuPlace} onClick={()=>{
            props.setStorage1(false);
            props.setStorage2(false);
            props.setStorage3(false);
            props.setStorage4(true);
        }}>Place4</div>
    </div>
}
export default Menu;