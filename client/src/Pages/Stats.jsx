import React from "react";
import styles from "../Styles/Stats.module.css";

const acceptedStyleHorz = (prog)=>{
    return {
        width: prog+'%',
        height: '100%',
        backgroundColor: 'whiteSmoke' ,
        borderRadius: prog>95?'4px':'4px 0px 0px 4px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
};
const requestedStyleHorz = (prog)=>{
    return {
        width: 100-prog+'%',
        height: '100%',
        backgroundColor: 'firebrick' ,
        borderRadius: prog>95?'4px':'4px 0px 0px 4px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
};
const acceptedStyleVert = (prog)=>{
    return {
        width: '100%',
        height: prog+'%',
        backgroundColor: 'whiteSmoke' ,
        borderRadius: prog>95?'4px':'4px 0px 0px 4px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
};
const requestedStyleVert = (prog)=>{
    return {
        width: '100%',
        height: 100-prog+'%',
        backgroundColor: 'firebrick' ,
        borderRadius: prog>95?'4px':'4px 0px 0px 4px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
};

const Stats = (props)=>{
    const statBarOne = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        
        width: '70%',
        height: '80%'
    };
    const barLabelOne = {
        width: '73%',
        height: '20%',
        margin: '20% 20px 20% 20px'
    }
    
    return <div className={styles.quick}>
    <div className={styles.quickTitle}>Quick Info</div>
    <div className={styles.quickStats} style={Object.keys(props).length>1?null:statBarOne}>
            {props.hasOwnProperty('hrProg')?<div className={styles.quickHR} style={Object.keys(props).length>1?null:barLabelOne}>HR:</div>:null}
            {props.hasOwnProperty('hrProg')?<div className={styles.statHR} style={Object.keys(props).length>1?null:statBarOne}>
                <div style={Object.keys(props).length>1?acceptedStyleHorz(props.hrProg):acceptedStyleVert(props.hrProg)}>{props.hrProg>30?props.hrProg+'%':null}</div>
                <div style={Object.keys(props).length>1?requestedStyleHorz(props.hrProg):requestedStyleVert(props.hrProg)}>{100-props.hrProg<30?null:100-props.hrProg+'%'}</div>
            </div>:null}
            {props.hasOwnProperty('mechProg')?<div className={styles.quickMech} style={Object.keys(props).length>1?null:barLabelOne}>Mech</div>:null}
            {props.hasOwnProperty('mechProg')?<div className={styles.statMech} style={Object.keys(props).length>1?null:statBarOne}>
                <div style={Object.keys(props).length>1?acceptedStyleHorz(props.mechProg):acceptedStyleVert(props.mechProg)}>{props.mechProg>30?props.mechProg+'%':null}</div>
                <div style={Object.keys(props).length>1?requestedStyleHorz(props.mechProg):requestedStyleVert(props.mechProg)}>{100-props.mechProg<30?null:100-props.mechProg+'%'}</div>
            </div>:null}
            {props.hasOwnProperty('chemProg')?<div className={styles.quickChem} style={Object.keys(props).length>1?null:barLabelOne}>Chem</div>:null}
            {props.hasOwnProperty('chemProg')?<div className={styles.statChem} style={Object.keys(props).length>1?null:statBarOne}>
                <div style={Object.keys(props).length>1?acceptedStyleHorz(props.chemProg):acceptedStyleVert(props.chemProg)}>{props.chemProg>30?props.chemProg+'%':null}</div>
                <div style={Object.keys(props).length>1?requestedStyleHorz(props.chemProg):requestedStyleVert(props.chemProg)}>{100-props.chemProg<30?null:100-props.chemProg+'%'}</div>
            </div>:null}
            {props.hasOwnProperty('workProg')?<div className={styles.quickWork} style={Object.keys(props).length>1?null:barLabelOne}>Work</div>:null}
            {props.hasOwnProperty('workProg')?<div className={styles.statWork} style={Object.keys(props).length>1?null:statBarOne}>
                <div style={Object.keys(props).length>1?acceptedStyleHorz(props.workProg):acceptedStyleVert(props.workProg)}>{props.workProg>30?props.workProg+'%':null}</div>
                <div style={Object.keys(props).length>1?requestedStyleHorz(props.workProg):requestedStyleVert(props.workProg)}>{100-props.workProg<30?null:100-props.workProg+'%'}</div>
            </div>:null}
            {props.hasOwnProperty('secProg')?<div className={styles.quickSec} style={Object.keys(props).length>1?null:barLabelOne}>Sec</div>:null}
            {props.hasOwnProperty('secProg')?<div className={styles.statSec} style={Object.keys(props).length>1?null:statBarOne}>
                <div style={Object.keys(props).length>1?acceptedStyleHorz(props.secProg):acceptedStyleVert(props.secProg)}>{props.secProg>30?props.secProg+'%':null}</div>
                <div style={Object.keys(props).length>1?requestedStyleHorz(props.secProg):requestedStyleVert(props.secProg)}>{100-props.secProg<30?null:100-props.secProg+'%'}</div>
            </div>:null}
            {props.hasOwnProperty('cleanProg')?<div className={styles.quickClean} style={Object.keys(props).length>1?null:barLabelOne}>Clean</div>:null}
            {props.hasOwnProperty('cleanProg')?<div className={styles.statClean} style={Object.keys(props).length>1?null:statBarOne}>
                <div style={Object.keys(props).length>1?acceptedStyleHorz(props.cleanProg):acceptedStyleVert(props.cleanProg)}>{props.cleanProg>30?props.cleanProg+'%':null}</div>
                <div style={Object.keys(props).length>1?requestedStyleHorz(props.cleanProg):requestedStyleVert(props.cleanProg)}>{100-props.cleanProg<30?null:100-props.cleanProg+'%'}</div>
        </div>:null}
    </div>
</div>
}
export default Stats;