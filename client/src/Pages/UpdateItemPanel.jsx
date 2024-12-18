import React, { useEffect } from "react";
import { useState } from "react";

import axios from "axios";

import styles from "../Styles/Inventory.module.css"

const UpdateItemPanel = (props)=>{

    const [itemName, setItemName] = useState(props.item.name);
    const [itemDepartment, setItemDepartment] = useState(props.item.department);
    const [itemExistance, setItemExistance] = useState(props.item.existance);
    const [place,setPlace] = useState(JSON.parse(props.item.place));

    const [hallDropDown,setHallDropDown] = useState(false);

    const placementStyle = {
        backgroundColor:'red'
    };

    return <div className={styles.updateItemPanelContainer}>
        <div className={styles.updateItemPanel}>
            <div className={styles.updateItemPanelTitle}>Update Item</div>
            <div className={styles.updateItemPanelExit} onClick={()=>{
                props.setItemChange(false);
            }}>X</div>
            <img className={styles.updateItemPanelPic} alt="no pic exists yet" src="../profileImages/itemtest.png"/>
            <div className={styles.updateItemPanelName}>Name: 
                <input placeholder={props.item.name} value={itemName} onChange={(e)=>{
                    setItemName(e.target.value);
                }}/>
            </div>
            <div className={styles.updateItemPanelDepartment}>Dep: 
                <input placeholder={props.item.department} value={itemDepartment} onChange={(e)=>{
                    setItemDepartment(e.target.value);
                }}/>
            </div>
            <div className={styles.updateItemPanelExistance}>Exist: 
                <input placeholder={props.item.existance} value={itemExistance} onChange={(e)=>{
                    setItemExistance(e.target.value);
                }}/>
            </div>
            <div className={styles.updateItemPanelPlace}>
                <div className={styles.hall} onClick={()=>{
                        setHallDropDown(true);
                    }} onMouseLeave={()=>{
                        setHallDropDown(false);
                    }}>
                    <label>{place[0]}</label>
                    {hallDropDown?<div onClick={(e)=>{
                        e.stopPropagation(true);
                        setPlace(['Hall 1',place[1],place[2]]);
                        setHallDropDown(false);
                    }}>Hall 1</div>:null}
                    {hallDropDown?<div onClick={(e)=>{
                        e.stopPropagation(true);
                        setPlace(['Hall 2',place[1],place[2]]);
                        setHallDropDown(false);
                    }}>Hall 2</div>:null}
                    {hallDropDown?<div onClick={(e)=>{
                        e.stopPropagation(true);
                        setPlace(['Hall 3',place[1],place[2]]);
                        setHallDropDown(false);
                    }}>Hall 3</div>:null}
                    {hallDropDown?<div onClick={(e)=>{
                        e.stopPropagation(true);
                        setPlace(['Hall 4',place[1],place[2]]);
                        setHallDropDown(false);
                    }}>Hall 4</div>:null}
                </div>
                <div className={styles.shelf}>
                    <div className={styles.space} style={place[1]==1&&place[2]==1?placementStyle:null} onClick={()=>{
                        setPlace([place[0],1,1]);
                    }}></div>
                    <div className={styles.space} style={place[1]==1&&place[2]==2?placementStyle:null} onClick={()=>{
                        setPlace([place[0],1,2]);
                    }}></div>
                    <div className={styles.space} style={place[1]==1&&place[2]==3?placementStyle:null} onClick={()=>{
                        setPlace([place[0],1,3]);
                    }}></div>
                </div>
                <div className={styles.shelf}>
                    <div className={styles.space} style={place[1]==2&&place[2]==1?placementStyle:null} onClick={()=>{
                        setPlace([place[0],2,1]);
                    }}></div>
                    <div className={styles.space} style={place[1]==2&&place[2]==2?placementStyle:null} onClick={()=>{
                        setPlace([place[0],2,2]);
                    }}></div>
                    <div className={styles.space} style={place[1]==2&&place[2]==3?placementStyle:null} onClick={()=>{
                        setPlace([place[0],2,3]);
                    }}></div>
                </div>
                <div className={styles.shelf}>
                    <div className={styles.space} style={place[1]==3&&place[2]==1?placementStyle:null} onClick={()=>{
                        setPlace([place[0],3,1]);
                    }}></div>
                    <div className={styles.space} style={place[1]==3&&place[2]==2?placementStyle:null} onClick={()=>{
                        setPlace([place[0],3,2]);
                    }}></div>
                    <div className={styles.space} style={place[1]==3&&place[2]==3?placementStyle:null} onClick={()=>{
                        setPlace([place[0],3,3]);
                    }}></div>
                </div>
            </div>
            <div className={styles.updatePanelButton} onClick={()=>{
                const tempItem = {
                    id:props.item.id,
                    name:itemName,
                    department:itemDepartment,
                    existance:itemExistance,
                    last:props.user.userName,
                    place:JSON.stringify(place)
                }
                console.log(tempItem);
                axios.post(`http://${props.ipOfServer}:${props.httpPort}/inventory`,{item:tempItem}).then((req)=>{
                    console.log('req came back as ', req.status);
                    props.setChange(!props.change);
                    props.setItemChange(false);
                })                
            }}>Update</div>
            <div className={styles.cancelPanelButton} onClick={()=>{
                axios.delete(`http://${props.ipOfServer}:${props.httpPort}/inventory`,{params:{item:{id:props.item.id}}}).then((req)=>{
                    console.log('req came back as ', req.status);
                    props.setChange(!props.change);
                    props.setItemChange(false);
                })
            }}>Delete</div>
        </div>
    </div>
} 
export default UpdateItemPanel;