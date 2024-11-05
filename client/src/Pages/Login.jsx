import styles from '../Styles/Login.module.css'
import axios from "axios"

import {useState} from "react"
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom"


function Login(){
    const nav = useNavigate();
    const [user, setUser] = useState({
        name:'',
        pass:''
    });
    const [checkText,setCheckText] = useState('Waiting . . .');
    useEffect(()=>{
        document.getElementById('root').className = styles.root;  
    })
    
    // const images = [
    //     'https://www.heco-schrauben.de/Karriere/Ferien-und-Aushilfsjobs'
    //     ];

    return <div className={styles.rootCopy} onKeyDown={(e)=>{
                if(e.key === 'Enter'){
                    console.log('enter pressed');
                    axios.post("http://localhost:8080/login",{user}).then((req,res)=>{
                        console.log('inside the then of enter pressed');
                        if(req.data && req.data.constructor === Object && Object.keys(req.data).length !== 0){
                            if(req.data.name == user.name && req.data.password == user.pass){
                                switch(req.data.role){
                                    case 'admin': nav('/admin');break;
                                    case 'hr': nav('/hr');break;
                                    case 'mech': nav('/mech');break;
                                    case 'chem': nav('/chem');break;
                                    case 'sec': nav('/sec');break;
                                    case 'work': nav('/work');break;
                                    case 'clean': nav('/clean');break;
                                }}}
                        else setCheckText('User or Password not found');
                    })
                }
            }}>
            <div className={styles.container}>
                <div className={styles.fieldName}>Login</div>
                <input className={styles.input} value = {user.name} onChange={(event)=>{
                    setUser({...user,
                        name: event.target.value
                    })
                    console.log(user);
                }}/>
                <input className={styles.input} value = {user.pass} onChange={(event)=>{
                    setUser({...user,
                        pass: event.target.value
                    })
                    console.log(user);
                }}/>
                <button className={styles.button} onClick={()=>{
                    console.log('submit pressed');
                    axios.post("http://localhost:8080/login",{user}).then((req,res)=>{
                        console.log('inside the then of submit pressed');
                        if(req.data && req.data.constructor === Object && Object.keys(req.data).length !== 0){
                            if(req.data.name == user.name && req.data.password == user.pass){
                                switch(req.data.role){
                                    case 'admin': nav('/admin');break;
                                    case 'hr': nav('/hr');break;
                                    case 'mech': nav('/mech');break;
                                    case 'chem': nav('/chem');break;
                                    case 'sec': nav('/sec');break;
                                    case 'work': nav('/work');break;
                                    case 'clean': nav('/clean');break;
                                }}}
                        else setCheckText('User or Password not found');
                    })
                }}>Submit</button>
                <div className={styles.carousel}>
                    <div>{checkText}</div>
                </div>
                <footer className={styles.footer}>@Copywright Daniel.Co && Heco.Schrauben {new Date().getFullYear()}-{new Date().getFullYear()+1}</footer>
            </div>
        </div>
}


export default Login;