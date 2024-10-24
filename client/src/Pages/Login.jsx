import styles from '../Styles/Login.module.css'
import axios from "axios"

import "react-responsive-carousel/lib/styles/carousel.min.css"

import {useState} from "react"
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom"


function Login(){
    const nav = useNavigate();
    const [user, setUser] = useState({
        name:'',
        pass:''
    });
    useEffect(()=>{
        document.getElementById('root').className = styles.root;  
    })
    
    const images = [
        'https://www.heco-schrauben.de/Karriere/Ferien-und-Aushilfsjobs'
        ];

    return <div className={styles.rootCopy} onKeyDown={(e)=>{
                if(e.key === 'Enter'){
                    axios.post("http://localhost:8080/login",{user}).then((req,res)=>{
                        if(req.data.allowed === false)nav('/err');
                        else nav('/admin');
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
                    axios.post("http://localhost:8080/login",{user}).then((req,res)=>{
                        if(req.data.allowed === false)nav('/errorPage');
                        else nav('/admin');
                    })
                }}>Submit</button>
                <div className={styles.carousel}>
                    <div>In place of carousel</div>
                    {/* <Carousel>
                        <div>
                            elem1
                        </div>
                    </Carousel> */}
                </div>
                <footer className={styles.footer}>@Copywright Daniel.Co && Heco.Schrauben {new Date().getFullYear()}-{new Date().getFullYear()+1}</footer>
            </div>
        </div>
}


export default Login;