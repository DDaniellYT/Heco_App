import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";

import styles from "../Styles/Inventory.module.css";

const AddItemPanel = (props)=>{

    const navState = useLocation();

    const [dropDownShelf, setDropDownShelf] = useState(false);
    const [dropDownPlace, setDropDownPlace] = useState(false);

    const itemHereStyle = {
        backGroundColor: 'red'
    }

    const [item, setItem] = useState({
        name:'',
        state:'',
        existance:'',
        last:props.user.userName,
        place:[0,0,0],
        department: navState.state.department
    })

    return <div className={styles.addItemPanelContainer}>
        <div className={styles.addItemPanel}>
            <div className={styles.addItemTitle}>
                <label>Add Item</label>
                <div className={styles.addItemExit} onClick={()=>{
                    props.setAddItem(false);
                }}>X</div>
            </div>
            <img className={styles.itemPic} />
            <div className={styles.preview}>
                <div className={styles.shelf}>
                    <div className={styles.space}>
                        <div className={styles.item} onClick={()=>{
                            setItem({
                                ...item,
                                place:[props.hall,1,1]
                            })
                        }} styles={item.place[1]==1?item.place[2]==1?{itemHereStyle}:null:null}>{item.place[1]==1?item.place[2]==1?item.name:null:null}</div>
                    </div>
                    <div className={styles.space}>
                        <div className={styles.item} onClick={()=>{
                            setItem({
                                ...item,
                                place:[props.hall,1,2]
                            })
                        }} styles={item.place[1]==1?item.place[2]==2?{itemHereStyle}:null:null}>{item.place[1]==1?item.place[2]==2?item.name:null:null}</div>
                    </div>
                    <div className={styles.space}>
                        <div className={styles.item} onClick={()=>{
                            setItem({
                                ...item,
                                place:[props.hall,1,3]
                            })
                        }} styles={item.place[1]==1?item.place[2]==3?{itemHereStyle}:null:null}>{item.place[1]==1?item.place[2]==3?item.name:null:null}</div>
                    </div>
                </div>
                <div className={styles.shelf}>
                    <div className={styles.space}>
                        <div className={styles.item} onClick={()=>{
                            setItem({
                                ...item,
                                place:[props.hall,2,1]
                            })
                        }} styles={item.place[1]==2?item.place[2]==1?{itemHereStyle}:null:null}>{item.place[1]==2?item.place[2]==1?item.name:null:null}</div>
                    </div>
                    <div className={styles.space}>
                        <div className={styles.item} onClick={()=>{
                            setItem({
                                ...item,
                                place:[props.hall,2,2]
                            })
                        }} styles={item.place[1]==2?item.place[2]==2?{itemHereStyle}:null:null}>{item.place[1]==2?item.place[2]==2?item.name:null:null}</div>
                    </div>
                    <div className={styles.space}>
                        <div className={styles.item} onClick={()=>{
                            setItem({
                                ...item,
                                place:[props.hall,2,3]
                            })
                        }} styles={item.place[1]==2?item.place[2]==3?{itemHereStyle}:null:null}>{item.place[1]==2?item.place[2]==3?item.name:null:null}</div>
                    </div>
                </div>
                <div className={styles.shelf}>
                    <div className={styles.space}>
                        <div className={styles.item} onClick={()=>{
                            setItem({
                                ...item,
                                place:[props.hall,3,1]
                            })
                        }} styles={item.place[1]==3?item.place[2]==1?{itemHereStyle}:null:null}>{item.place[1]==3?item.place[2]==1?item.name:null:null}</div>
                    </div>
                    <div className={styles.space}>
                        <div className={styles.item} onClick={()=>{
                            setItem({
                                ...item,
                                place:[props.hall,3,2]
                            })
                        }} styles={item.place[1]==3?item.place[2]==2?{itemHereStyle}:null:null}>{item.place[1]==3?item.place[2]==2?item.name:null:null}</div>
                    </div>
                    <div className={styles.space}>
                        <div className={styles.item} onClick={()=>{
                            setItem({
                                ...item,
                                place:[props.hall,3,3]
                            })
                        }} styles={item.place[1]==3?item.place[2]==3?{itemHereStyle}:null:null}>{item.place[1]==3?item.place[2]==3?item.name:null:null}</div>
                    </div>
                </div>
            </div>
            <div className={styles.shelfButton} onClick={()=>setDropDownShelf(true)} onMouseLeave={()=>setDropDownShelf(false)}>
                <label>Select Shelf</label>
                {dropDownShelf?<div className={styles.dropDown}>
                <div className={styles.dropDownItem} onClick={()=>{
                    setItem({
                        ...item,
                        place:[props.hall,1,item.place[1]]
                    })
                }}>Top</div>
                <div className={styles.dropDownItem} onClick={()=>{
                    setItem({
                        ...item,
                        place:[props.hall,2,item.place[1]]
                    })
                }}>Middle</div>
                <div className={styles.dropDownItem} onClick={()=>{
                    setItem({
                        ...item,
                        place:[props.hall,3,item.place[1]]
                    })
                }}>Bottom</div>
            </div>:null}
            </div>  
            <div className={styles.placeButton} onClick={()=>setDropDownPlace(true)} onMouseLeave={()=>setDropDownPlace(false)}>
                <label>Select Place</label>
                {dropDownPlace?<div className={styles.dropDown}>
                <div className={styles.dropDownItem} onClick={()=>{
                    setItem({
                        ...item,
                        place:[props.hall,item.place[0],1]
                    })
                }}>Left</div>
                <div className={styles.dropDownItem} onClick={()=>{
                    setItem({
                        ...item,
                        place:[props.hall,item.place[0],2]
                    })
                }}>Middle</div>
                <div className={styles.dropDownItem} onClick={()=>{
                    setItem({
                        ...item,
                        place:[props.hall,item.place[0],3]
                    })
                }}>Right</div>
            </div>:null}
            </div>
            <input className={styles.itemName} placeholder="itemName" value={item.name} onChange={(e)=>{
                setItem({
                    ...item,
                    name:e.target.value
                });
            }}/>
            <input className={styles.itemState} placeholder="state" value={item.state} onChange={(e)=>{
                setItem({
                    ...item,
                    state:e.target.value
                })
            }}/>
            <input className={styles.itemExistance} placeholder="itemExistance" value={item.existance} onChange={(e)=>{
                setItem({
                    ...item,
                    existance:e.target.value
                })
            }}/>
            <div className={styles.submit} onClick={()=>{
                axios.put(`http://${props.ipOfServer}:${props.httpPort}/inventory`,{item:item}).then((req)=>{
                    props.setAddItem(false);
                    props.setChange(!props.change);
                })
            }}>SUBMIT</div>
            <div className={styles.cancel} onClick={()=>{
                props.setAddItem(false);
            }}>CANCEL</div>
        </div>
    </div>
}
export default AddItemPanel;