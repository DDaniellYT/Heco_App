import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import styles from "../Styles/ErrorPage.module.css";
import { useEffect, useState } from "react";

function ErrorPage(){
    const nav = useNavigate();
    const loc = useLocation();

    const [mouseOver,setMouseOver] = useState(false);

    useEffect(()=>{
        if(loc.pathname != '/error')nav('/error');
    });
    return <div className={styles.errorContainer}>
        <div className={styles.errorBox}>
        <div className={styles.errorScrew}>Screw</div>
        <div className={styles.errorScrew}>Elsewhere.</div>
        <div className={styles.errorNum}>404</div>
        <div className={styles.errorPlace}>This place does NOT exist.</div>
            <button  style={{
                fontWeight:mouseOver?'bold':'normal',
                fontSize:mouseOver?'1rem':'0.8rem'
            }} onMouseOver={()=>{setMouseOver(true)}} onMouseLeave={()=>{setMouseOver(false)}} onClick={()=>{
                nav('/');
            }}>Return to Login</button>
        <div className={styles.errorSuport}>Contact support if needed</div>
        <div className={styles.errorSuportNumber}>07/*somenumber*/</div>
    </div>
    </div>
}
export default ErrorPage;