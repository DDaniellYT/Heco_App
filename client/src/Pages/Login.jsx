import styles from '../Styles/Login.module.css'
import axios from "axios"

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
    useEffect(()=>{
        document.getElementById('root').className = styles.root;  
    });
    
    return <div className={styles.rootCopy} onKeyDown={(e)=>{
                if(e.key === 'Enter'){
                    console.log('enter pressed');
                    if(user.name == '' || user.pass == '')setCheckText('User or Password cannot be empty!');
                    else{
                        axios.get(`http://${props.ipOfServer}:8080/user`,{params:{user:{userName:user.name}}}).then(async (req,res)=>{
                            if(req.status == 200)
                                if(req.data.userName == user.name && req.data.password == user.pass){
                                    await axios.post(`http://${props.ipOfServer}:8080/user`,{user:{id:req.data.id,existance:'IN'}}).then((req)=>{
                                        console.log(req.data);
                                    })
                                    nav('/home',{state:req.data});
                                }
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
                        axios.get(`http://${props.ipOfServer}:8080/user`,{params:{user:{userName:user.name}}}).then(async (req,res)=>{
                            if(req.status == 200)
                                if(req.data.userName == user.name && req.data.password == user.pass){
                                    await axios.post(`http://${props.ipOfServer}:8080/user`,{user:{id:req.data.id,existance:'IN'}}).then((req)=>{
                                        console.log(req.data);
                                    })
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