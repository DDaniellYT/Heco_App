import express, { query } from "express";
import cors from "cors";
import bodyParser from "body-parser";


import sqlite3 from "sqlite3";

sqlite3.verbose();
const factory = new sqlite3.Database('./db/Factory.db');

const createUsersTable = `CREATE TABLE IF NOT EXISTS Users(
  id INTEGER PRIMARY KEY,
  userName TEXT,
  firstName TEXT,
  lastName TEXT,
  password TEXT,
  role TEXT,
  time DATE,
  existance TEXT
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
  factory.exec(`INSERT INTO Users(firstName,lastName,userName,password,role,existance,time) VALUES("firstNameTestDb","lastNameTestDb","admin","adminpass","admin",'OUT',0)`);
  factory.exec(`INSERT INTO Users(firstName,lastName,userName,password,role,existance,time) VALUES("firstNameTestDb2","lastNameTestDb2","hrTest2","hrpass2","hr",'OUT',0)`);
  factory.exec(`INSERT INTO Users(firstName,lastName,userName,password,role,existance,time) VALUES("firstNameTestDb","lastNameTestDb","mechTest","mechpass","mech",'OUT',0)`);
  factory.exec(`INSERT INTO Users(firstName,lastName,userName,password,role,existance,time) VALUES("firstNameTestDb","lastNameTestDb","admin2","adminpass2","admin",'OUT',0)`);
  factory.exec(`INSERT INTO Users(firstName,lastName,userName,password,role,existance,time) VALUES("firstNameTestDb","lastNameTestDb","chemTest","chempass","chem",'OUT',0)`);
  factory.exec(`INSERT INTO Users(firstName,lastName,userName,password,role,existance,time) VALUES("firstNameTestDb","lastNameTestDb","workTest","workpass","work",'OUT',0)`);
  factory.exec(`INSERT INTO Users(firstName,lastName,userName,password,role,existance,time) VALUES("firstNameTestDb","lastNameTestDb","secTest","secpass","sec",'OUT',0)`);
  factory.exec(`INSERT INTO Users(firstName,lastName,userName,password,role,existance,time) VALUES("firstNameTestDb","lastNameTestDb","cleanTest","cleanpass","clean",'OUT',0)`);

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
async function getUserFromDB(name,role){
  const userQuery = `SELECT * FROM Users 
  ${name != undefined && role == undefined? 
    ` WHERE userName = '${name}'`: 
    name == undefined && role != undefined ? 
    ` WHERE role = '${role}'`:''}`;
    console.log(userQuery);
  return new Promise((resolve)=>{
    factory.all(userQuery,(err,rows)=>{
      console.log(name,role);
      console.log(rows);
      resolve(rows);
    });
  });
};
async function getRequestsFromDB(params){
  // console.log(params);
  const getQuery = `SELECT * FROM Requests ${Object.keys(params).length==0?'':`WHERE(
    ${params.sender==null?'':`sender='${params.sender}' ${params.reciever!=null || params.urgency!=null || params.subject!=null || params.message!=null || params.accepted!=null?' AND ':' '}`} 
    ${params.reciever==null?'':`reciever='${params.reciever}' ${params.urgency!=null || params.subject!=null || params.message!=null || params.accepted!=null?' AND ':' '}`} 
    ${params.urgency==null?'':`urgency='${params.urgency}' ${params.subject!=null || params.message!=null || params.accepted!=null?' AND ':' '}`} 
    ${params.subject==null?'':`subject='${params.subject}' ${params.message!=null || params.accepted!=null?' AND ':' '}`} 
    ${params.message==null?'':`message='${params.message}' ${params.accepted!=null?' AND ':' '}`} 
    ${params.accepted==null?'':`accepted='${params.accepted}'`})`}`;
  return new Promise((resolve)=>{
    factory.all(getQuery,(err,rows)=>{
      resolve(rows);
    })
  })
};

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());

app.get('/users',async (req,res)=>{
  const users = await getUserFromDB(req.query.userName,req.query.role);
  if(req.query.userName != undefined) res.send(users[0]);
  else res.send(users);
});
app.post('/users',async (req,res)=>{
  console.log(req.body);
  const user = await getUserFromDB(req.body.userName);
  const updateQuery = `UPDATE Users SET existance = '${user.existance=='IN'?'OUT':'IN'}' WHERE (userName = '${req.body.userName}')`;
  factory.exec(updateQuery,(err)=>{
    res.send(err);
  })
})


app.get('/requests',async (req,res)=>{
  // console.log(req.query);
  res.send(await getRequestsFromDB(req.query));
});
app.put('/requests',async (req,res)=>{
  const insertQuery = `INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('${req.body.sender}','${req.body.reciever}','${req.body.urgency}','${req.body.subject}','${req.body.message}','no')`;
  factory.exec(insertQuery,(err)=>{
    res.send(err);
  });
});
app.post('/requests',async (req,res)=>{
  const updateQuery = `UPDATE Requests SET accepted = 'yes' WHERE (id = ${req.body.id})`;
  factory.exec(updateQuery,(err)=>{
    res.send(err);
  })
})
app.delete('/requests',async (req,res)=>{
  const deleteQuery = `DELETE FROM Requests WHERE(id = ${req.query.id})`;
  // console.log(req.query);
  factory.exec(deleteQuery,(err)=>{
    res.send(err);
  })
});


app.listen(port, () => {
  console.log(`HecoServer Listening ${port}`);
});

