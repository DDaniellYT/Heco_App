import styles from '../Styles/Login.module.css'
import axios from "axios"

import {useState} from "react"
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom"


function Login(){
    const ipOfServer = '192.168.0.104';
    const nav = useNavigate();
    const [user, setUser] = useState({
        name:'',
        pass:''
    });
    const [checkText,setCheckText] = useState('Waiting . . .');
    useEffect(()=>{
        document.getElementById('root').className = styles.root;  
    });
    
    return <div className={styles.rootCopy} onKeyDown={(e)=>{
                if(e.key === 'Enter'){
                    console.log('enter pressed');
                    if(user.name == '' || user.pass == '')setCheckText('User or Password cannot be empty!');
                    else{
                        axios.get(`http://${ipOfServer}:8080/user`,{params:{userName:user.name}}).then((req,res)=>{
                            if(req.status == 200){
                                if(req.data.userName == user.name && req.data.password == user.pass){
                                    switch(req.data.department){
                                        case 'admin': nav('/admin',{state:req.data});break;
                                        case 'hr': nav('/admin',{state:req.data});break;
                                        case 'mech': nav('/admin',{state:req.data});break;
                                        case 'chem': nav('/admin',{state:req.data});break;
                                        case 'sec': nav('/admin',{state:req.data});break;
                                        case 'work': nav('/admin',{state:req.data});break;
                                        case 'clean': nav('/admin',{state:req.data});break;
                                    }}}
                            else setCheckText('User or Password not found');
                        })
                    }
                }
            }}>
            <div className={styles.container}>
                <div className={styles.fieldName}>Login</div>
                <input className={styles.input} value = {user.name} onChange={(event)=>{
                    setUser({...user, name: event.target.value});
                }}/>
                <input className={styles.input} value = {user.pass} onChange={(event)=>{
                    setUser({...user, pass: event.target.value});
                }}/>
                <button className={styles.button} onClick={()=>{
                    if(user.name == '' || user.pass == '')setCheckText('User or Password cannot be empty!');
                    else{
                        axios.get(`http://${ipOfServer}:8080/user`,{params:{userName:user.name}}).then((req,res)=>{
                            if(req.status == 200){
                                if(req.data.userName == user.name && req.data.password == user.pass){
                                    switch(req.data.department){
                                        case 'admin': nav('/admin',{state:req.data});break;
                                        case 'hr': nav('/admin',{state:req.data});break;
                                        case 'mech': nav('/admin',{state:req.data});break;
                                        case 'chem': nav('/admin',{state:req.data});break;
                                        case 'sec': nav('/admin',{state:req.data});break;
                                        case 'work': nav('/admin',{state:req.data});break;
                                        case 'clean': nav('/admin',{state:req.data});break;
                                    }}}
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