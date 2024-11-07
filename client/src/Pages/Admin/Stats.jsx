import React from "react";
import styles from "../../Styles/Stats.module.css";

const Stats = (props)=>{

    return <div className={styles.quick}>
    <div className={styles.quickTitle}>Quick Info</div>
    <div className={styles.quickStats}>
        <div className={styles.quickStatsTitle}>Stats</div>
        <div className={styles.quickHR}>HR:</div>  
        <div className={styles.quickMech}>Mech</div>
        <div className={styles.quickChem}>Chem</div>
        <div className={styles.quickWork}>Work</div>
        <div className={styles.quickSec}>Sec</div>
        <div className={styles.quickClean}>Clean</div>
        <div className={styles.statHR}>
            <div style={{
                width: props.hrProg+'%',
                height:'100%',
                backgroundColor: 'whiteSmoke' ,
                borderRadius: props.hrProg>95?'4px':'4px 0px 0px 4px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>{props.hrProg>30?props.hrProg+'%':null}</div>
            <div style={{
                width: 100-props.hrProg+'%',
                height:'100%',
                backgroundColor: 'firebrick' ,
                borderRadius: props.hrProg<5?'4px':'0px 4px 4px 0px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>{100-props.hrProg<30?null:100-props.hrProg+'%'}</div>
        </div>
        <div className={styles.statMech}>
        <div style={{
                width: props.mechProg+'%',
                height:'100%',
                backgroundColor: 'whiteSmoke' ,
                borderRadius: props.mechProg>95?'4px':'4px 0px 0px 4px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>{props.mechProg>30?props.mechProg+'%':null}</div>
            <div style={{
                width: 100-props.mechProg+'%',
                height:'100%',
                backgroundColor: 'firebrick' ,
                borderRadius: props.mechProg<5?'4px':'0px 4px 4px 0px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>{100-props.mechProg<30?null:100-props.mechProg+'%'}</div>
        </div>
        <div className={styles.statChem}>
            <div style={{
                width: props.chemProg+'%',
                height:'100%',
                backgroundColor: 'whiteSmoke' ,
                borderRadius: props.chemProg>95?'4px':'4px 0px 0px 4px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>{props.chemProg>30?props.chemProg+'%':null}</div>
            <div style={{
                width: 100-props.chemProg+'%',
                height:'100%',
                backgroundColor: 'firebrick' ,
                borderRadius: props.chemProg<5?'4px':'0px 4px 4px 0px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>{100-props.chemProg<30?null:100-props.chemProg+'%'}</div>
        </div>
        <div className={styles.statWork}>
            <div style={{
                width: props.workProg+'%',
                height:'100%',
                backgroundColor: 'whiteSmoke' ,
                borderRadius: props.workProg>95?'4px':'4px 0px 0px 4px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>{props.workProg>30?props.workProg+'%':null}</div>
            <div style={{
                width: 100-props.workProg+'%',
                height:'100%',
                backgroundColor: 'firebrick' ,
                borderRadius: props.workProg<5?'4px':'0px 4px 4px 0px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>{100-props.workProg<30?null:100-props.workProg+'%'}</div>
        </div>
        <div className={styles.statSec}>
            <div style={{
                width: props.secProg+'%',
                height:'100%',
                backgroundColor: 'whiteSmoke' ,
                borderRadius: props.secProg>95?'4px':'4px 0px 0px 4px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>{props.secProg>30?props.secProg+'%':null}</div>
            <div style={{
                width: 100-props.secProg+'%',
                height:'100%',
                backgroundColor: 'firebrick' ,
                borderRadius: props.secProg<5?'4px':'0px 4px 4px 0px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>{100-props.secProg<30?null:100-props.secProg+'%'}</div>
        </div>
        <div className={styles.statClean}>
            <div style={{
                width: props.cleanProg+'%',
                height:'100%',
                backgroundColor: 'whiteSmoke' ,
                borderRadius: props.cleanProg>95?'4px':'4px 0px 0px 4px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>{props.cleanProg>30?props.cleanProg+'%':null}</div>
            <div style={{
                width: 100-props.cleanProg+'%',
                height:'100%',
                backgroundColor: 'firebrick' ,
                borderRadius: props.cleanProg<5?'4px':'0px 4px 4px 0px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>{100-props.cleanProg<30?null:100-props.cleanProg+'%'}</div>
        </div>
    </div>
</div>
}
export default Stats;