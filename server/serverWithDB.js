import express, { query } from "express";
import cors from "cors";
import bodyParser from "body-parser";


import sqlite3 from "sqlite3";

sqlite3.verbose();
const factory = new sqlite3.Database('./db/Factory.db');

const createUsersTable = `CREATE TABLE IF NOT EXISTS Users(
  id INTEGER PRIMARY KEY,
  name TEXT,
  password TEXT,
  role TEXT,
  existance INTEGER NOT NULL
)`;
const createRequestsTable = `CREATE TABLE IF NOT EXISTS Requests(
  id INTEGER PRIMARY KEY,
  sender TEXT,
  reciever TEXT,
  urgency TEXT,
  subject TEXT,
  message TEXT,
  accepted TEXT
)`;
await new Promise((resolve)=>{
  resolve(factory.run(createUsersTable).run(createRequestsTable));
  console.log('created tables');
}).then(()=>{
// get test users
// factory.exec(`INSERT INTO Users(name,password,role,existance) VALUES("admin","adminpass","admin",1)`);
// factory.exec(`INSERT INTO Users(name,password,role,existance) VALUES("hrTest","hrpass","hr",1)`);
// factory.exec(`INSERT INTO Users(name,password,role,existance) VALUES("mechTest","mechpass","mech",1)`);
// factory.exec(`INSERT INTO Users(name,password,role,existance) VALUES("admin2","adminpass2","admin",1)`);
// factory.exec(`INSERT INTO Users(name,password,role,existance) VALUES("chemTest","chempass","chem",1)`);
// factory.exec(`INSERT INTO Users(name,password,role,existance) VALUES("workTest","workpass","work",1)`);
// factory.exec(`INSERT INTO Users(name,password,role,existance) VALUES("secTest","secpass","sec",1)`);
// factory.exec(`INSERT INTO Users(name,password,role,existance) VALUES("cleanTest","cleanpass","clean",1)`);

// get test requests
// factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('mech','hr','HIGH','subj','','no')`);
// factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('hr','hr','HIGH','subj','','no')`);
// factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('sec','clean','HIGH','subj','','no')`);
// factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('work','clean','HIGH','subj','','no')`);
// factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('clean','hr','HIGH','subj','','no')`);
// factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('chem','mech','HIGH','subj','','no')`);
// factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('chem','chem','HIGH','subj','','no')`);

// factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('clean','hr','HIGH','subj','','yes')`);
// factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('chem','hr','LOW','subj','','yes')`);
// factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('chem','mech','MID','subj','','yes')`);
return;
});
async function getUserFromDB(name){
  const userQuery = `SELECT * FROM Users WHERE name = ?`;
  return new Promise((resolve)=>{
    factory.get(userQuery,name,(err,rows)=>{
      // console.log(rows);
      resolve(rows);
    });
  });
};
async function getRequestsFromDB(params){
  console.log(params);
  const getQuery = `SELECT * FROM Requests ${Object.keys(params).length==0?'':`WHERE(
    ${params.sender==null?'':`sender='${params.sender}' ${params.reciever!=null || params.urgency!=null || params.subject!=null || params.message!=null || params.accepted!=null?' AND ':' '}`} 
    ${params.reciever==null?'':`reciever='${params.reciever}' ${params.urgency!=null || params.subject!=null || params.message!=null || params.accepted!=null?' AND ':' '}`} 
    ${params.urgency==null?'':`urgency='${params.urgency}' ${params.subject!=null || params.message!=null || params.accepted!=null?' AND ':' '}`} 
    ${params.subject==null?'':`subject='${params.subject}' ${params.message!=null || params.accepted!=null?' AND ':' '}`} 
    ${params.message==null?'':`message='${params.message}' ${params.accepted!=null?' AND ':' '}`} 
    ${params.accepted==null?'':`accepted='${params.accepted}'`})`}`;
  return new Promise((resolve)=>{
    factory.all(getQuery,(err,rows)=>{
      console.log(rows);
      // console.log(getQuery);
      resolve(rows);
    })
  })
}
async function deleteUserFromDB(name){
  return new Promise((resolve)=>{
    //fix
  })
}
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());

app.get('/login',async (req,res)=>{
  const user = await getUserFromDB(req.query.user.name);
  res.send(user);
});



app.get('/requests',async (req,res)=>{
  // console.log(req.query);
  res.send(await getRequestsFromDB(req.query));
})
app.post('/requests',async (req,res)=>{
  // console.log(req.body);
  const insertQuery = `INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('${req.body.sender}','${req.body.reciever}','${req.body.urgency}','${req.body.subject}','${req.body.message}',0)`;
  factory.exec(insertQuery,(err)=>{
    console.log(err);
    res.send(err);
  });
})
app.delete('/requests',async (req,res)=>{
  const deleteQuery = `DELETE FROM Requests WHERE(id = ${req.query.id})`;
  // console.log(req.query);
  factory.exec(deleteQuery,(err)=>{
    console.log(err);
    res.send(err);
  })
});
app.listen(port, () => {
  console.log(`HecoServer Listening ${port}`)
});

