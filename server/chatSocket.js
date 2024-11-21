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

const clients = [];

server.on('connection', (socket)=>{
    console.log('someone connected');
    socket.on('message',async (message)=>{
        const data = JSON.parse(message);
        if(data.type === 'set_userName')
            clients[data.userName] = socket;
        else if(data.type === 'chat_message'){
            await axios.put(`http://localhost:${httpPort}/chat`,{item:data.message});
            await axios.get(`http://localhost:${httpPort}/chat`,{params:{sender:data.message.sender,reciever:data.message.reciever,amount:30}}).then(req=>{
                console.log('sent data to clients');
                clients[data.message.sender].send(JSON.stringify(req.data));
                if(clients[data.message.reciever])clients[data.message.reciever].send(JSON.stringify(req.data));
            });
        }
    });
});