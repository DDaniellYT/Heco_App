import express, { query } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { WebSocketServer } from "ws";

import sqlite3 from "sqlite3";

sqlite3.verbose();
const factory = new sqlite3.Database('./db/Factory.db');

const app = express();
const port = 8081;

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json({ limit: '10mb', extended: true }));

const server = new WebSocketServer({port});

server.on('connection', (socket)=>{
    console.log('someone connected');
    socket.on('message',(message)=>{
        socket.send('back response from server');
    })
});