import express, { query } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { WebSocketServer } from "ws";
import axios from "axios";

import sqlite3 from "sqlite3";

sqlite3.verbose();
const factory = new sqlite3.Database('./db/Factory.db');

const app = express();
const httpPort = 8080;
const port = 8081;

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json({ limit: '10mb', extended: true }));

const server = new WebSocketServer({port});
const clients = new Map();

await axios.get(`http://localhost:${httpPort}/user`).then((req)=>{
    for(let user of req.data){
        clients.set(user.userName,null);
    }
})


server.on('connection',async (socket)=>{
    console.log('someone connected');
    socket.on('close',async ()=>{
        for(let [key, value] of clients.entries()){
            if(value && value.socket == socket){
                clients.set(key,null);
            }
        }
        console.log(clients,' <-from close');
    })
    socket.on('message',async (message)=>{
        console.log(clients,' <-from message');
        const data = JSON.parse(message);
        if(data.type === 'set_userName')
            clients.set(data.sender,{
                socket: socket,
                state: 1
            });
        if(data.type === 'get_seen'){
            clients.set(data.sender,{...clients.get(data.sender),state:1});
            await axios.get(`http://localhost:${httpPort}/chat`,{params:{sender:data.sender,type:'seen'}}).then((req)=>{
                clients.get(data.sender).socket.send(JSON.stringify({type:data.type,data:req.data}));
            });
        }
        if(data.type === 'add_message'){
            await axios.put(`http://localhost:${httpPort}/chat`,{item:data.message});
            if(clients.get(data.message.reciever).state === 2)
                await axios.post(`http://localhost:${httpPort}/chat`,{item:data.message});
        }
        if(data.type === 'get_chat'){
            clients.get(data.req.sender).state = 2;
            await axios.get(`http://localhost:${httpPort}/chat`,{params:{sender:data.req.sender,reciever:data.req.reciever,amount:30,type:'chat'}}).then(async (req)=>{
                if(clients.get(data.req.sender))clients.get(data.req.sender).socket.send(JSON.stringify({type:'get_chat',data:req.data}));
                if(clients.get(data.req.reciever) && clients.get(data.req.reciever).state === 1){
                    await axios.get(`http://localhost:${httpPort}/chat`,{params:{sender:data.req.reciever,type:'seen'}}).then((req)=>{
                        clients.get(data.req.reciever).socket.send(JSON.stringify({type:'get_seen',data:req.data}));
                    });
                }
                if(clients.get(data.req.reciever) && clients.get(data.req.reciever).state === 2)clients.get(data.req.reciever).socket.send(JSON.stringify({type:'get_chat',data:req.data}));
            })
        }
    });
}); 