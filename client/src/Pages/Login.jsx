import styles from '../Styles/Login.module.css'
import axios from "axios"
import CryptoJS from 'crypto-js'

import {useState} from "react"
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom"


function Login(props){
    const nav = useNavigate();
    const [user, setUser] = useState({
        name:'',
        pass:''
    });
    const [checkText,setCheckText] = useState('Waiting . . .');
    const [passType,setPassType] = useState('password');
    useEffect(()=>{
        document.getElementById('root').className = styles.root;  
    });
    
    return <div className={styles.rootCopy} onKeyDown={(e)=>{
                if(e.key === 'Enter'){
                    console.log('enter pressed');
                    if(user.name === '' || user.pass === '')setCheckText('User or Password cannot be empty!');
                    else{
                        axios.get(`http://${props.ipOfServer}:${props.httpPort}/user`,{params:{user:{userName:user.name}}}).then(async (req,res)=>{
                            if(req.status === 200){
                                console.log(user.pass, '<- user normal');
                                console.log(CryptoJS.SHA256(user.pass).toString(), '<- user pass hashed');
                                console.log(req.data.password, '<- required pass');
                                if(req.data.userName === user.name && req.data.password === CryptoJS.SHA256(user.pass).toString()){
                                    await axios.post(`http://${props.ipOfServer}:${props.httpPort}/user`,{user:{id:req.data.id,existance:'IN'}});
                                    nav('/home',{state:req.data});
                                }
                            else setCheckText('User or Password not found');}
                        })
                    }
                }
            }}>
            <div className={styles.bigLogo}>HECO <label>©</label></div>
            <div className={styles.container}>
                <div className={styles.fieldName}>Login</div>
                <input className={styles.input} value = {user.name} onChange={(event)=>{
                    setUser({...user, name: event.target.value});
                }}/>
                <div className={styles.passContainer}>
                    <input type={passType} className={styles.input} value = {user.pass} onChange={(event)=>{
                        setUser({...user, pass: event.target.value});
                    }}/>
                    <button className={styles.seePass} onClick={()=>{
                        setPassType(passType==='password'?'':'password');
                    }}>{passType==='password'?'show':'hide'}</button>
                </div>
                <button className={styles.button} onClick={()=>{
                    if(user.name === '' || user.pass === '')setCheckText('User or Password cannot be empty!');
                    else{
                        axios.get(`http://${props.ipOfServer}:${props.httpPort}/user`,{params:{user:{userName:user.name}}}).then(async (req,res)=>{
                            if(req.status === 200)
                                if(req.data.userName === user.name && req.data.password === CryptoJS.SHA256(user.pass).toString()){
                                    await axios.post(`http://${props.ipOfServer}:${props.httpPort}/user`,{user:{id:req.data.id,existance:'IN'}});
                                    nav('/home',{state:req.data});
                                }
                            else setCheckText('User or Password not found');
                        })
                    }
                }}>Submit</button>
                <div className={styles.carousel}>
                    <div>{checkText}</div>
                </div>
                <footer className={styles.footer}>@Copywright Daniel.Co && Heco.Schrauben {new Date().getFullYear()}-{new Date().getFullYear()+1}</footer>
            </div>
        </div>
}
export default Login;