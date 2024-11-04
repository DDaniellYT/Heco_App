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
  accepted INTEGER NOT NULL
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
// factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('mech','hr','HIGH','subj','',0)`);
// factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('hr','hr','HIGH','subj','',0)`);
// factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('sec','clean','HIGH','subj','',0)`);
// factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('work','clean','HIGH','subj','',0)`);
// factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('clean','hr','HIGH','subj','',0)`);
// factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('chem','mech','HIGH','subj','',0)`);
// factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('chem','chem','HIGH','subj','',0)`);
return;
});
async function getUserFromDB(name){
  const query = `SELECT * FROM Users WHERE name = ?`;
  return new Promise((resolve)=>{
    factory.get(query,name,(err,rows)=>{
      resolve(rows);
    });
  });
};
async function getRequestsFromDB(){
  const all = `SELECT * FROM Requests`;
  return new Promise((resolve)=>{
    factory.all(all,(err,rows)=>{
      console.log(rows);
      resolve(rows);  
    });
  });
}
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());

app.post('/login',async (req,res)=>{
  const user = await getUserFromDB(req.body.user.name);
  res.send(user);
});
app.get('/requests',async (req,res)=>{
  const re = await getRequestsFromDB();
  res.send(re);
})
app.post('/requests',async (req,res)=>{
  console.log(req.body);
  factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('${req.body.sender}','${req.body.reciever}','${req.body.urgency}','${req.body.subject}','${req.body.message}',0)`,(err)=>{
    console.log(err);
    res.send(err);
  });
})
app.get('/count',async (req,res)=>{


  // query for every role and count the requests
  // add into the requests endpoint a way to get the requests or number of requests for a certain role
  // or add another endpoint for getting all accepted requests and another one for counting each one, ukwim.


  const countQuery = `SELECT * FROM Requests`
  res.send(factory.run(countQuery));
})


var requests = [];
var accepted = [];

var countHRRequests = 0;
var countMechRequests = 0;
var countChemRequests = 0;
var countWorkRequests = 0;
var countSecRequests = 0;
var countCleanRequests = 0;

var countHRAccepted = 0;
var countMechAccepted = 0;
var countChemAccepted = 0;
var countWorkAccepted = 0;
var countSecAccepted = 0;
var countCleanAccepted = 0;

app.post('/requestAdd',(req,res)=>{
  requests.push(req.body);
  switch(req.body.reciever){
    case 'HResources':countHRRequests++;break;
    case 'Mechanics':countMechRequests++;break;
    case 'Chemists':countChemRequests++;break;
    case 'Workers':countWorkRequests++;break;
    case 'Security':countSecRequests++;break;
    case 'Cleaning':countCleanRequests++;break;
  };
  console.log('reqadd');

  // console.log(countHRRequests, countMechRequests, countChemRequests, countWorkRequests, countSecRequests, countCleanRequests, countHRAccepted, countMechAccepted, countChemAccepted, countWorkAccepted, countSecAccepted, countCleanAccepted);
  res.send("");
});
app.post('/requestRemove',(req,res)=>{
  requests.splice(req.body.index,1);
  switch(req.body.reciever){
    case 'HResources':countHRRequests--;break;
    case 'Mechanics':countMechRequests--;break;
    case 'Chemists':countChemRequests--;break;
    case 'Workers':countWorkRequests--;break;
    case 'Security':countSecRequests--;break;
    case 'Cleaning':countCleanRequests--;break;
  };
  console.log('reqremove');

  // console.log(countHRRequests, countMechRequests, countChemRequests, countWorkRequests, countSecRequests, countCleanRequests, countHRAccepted, countMechAccepted, countChemAccepted, countWorkAccepted, countSecAccepted, countCleanAccepted);
  res.send("");
});
app.post('/acceptedAdd',(req,res)=>{
  accepted.push(req.body);
  switch(req.body.reciever){
    case 'HResources':countHRAccepted++;break;
    case 'Mechanics':countMechAccepted++;break;
    case 'Chemists':countChemAccepted++;break;
    case 'Workers':countWorkAccepted++;break;
    case 'Security':countSecAccepted++;break;
    case 'Cleaning':countCleanAccepted++;break;
  };
  console.log('accadd');

  // console.log(countHRRequests, countMechRequests, countChemRequests, countWorkRequests, countSecRequests, countCleanRequests, countHRAccepted, countMechAccepted, countChemAccepted, countWorkAccepted, countSecAccepted, countCleanAccepted);
  res.send("");
});
app.post('/acceptedRemove',(req,res)=>{
  accepted.splice(req.body.index,1);
  switch(req.body.reciever){
    case 'HResources':countHRAccepted--;break;
    case 'Mechanics':countMechAccepted--;break;
    case 'Chemists':countChemAccepted--;break;
    case 'Workers':countWorkAccepted--;break;
    case 'Security':countSecAccepted--;break;
    case 'Cleaning':countCleanAccepted--;break;
  };
  console.log('accremove');

  // console.log(countHRRequests, countMechRequests, countChemRequests, countWorkRequests, countSecRequests, countCleanRequests, countHRAccepted, countMechAccepted, countChemAccepted, countWorkAccepted, countSecAccepted, countCleanAccepted);
  res.send("");
});
app.get('/lists',(req,res)=>{
  res.send({
    requests,
    accepted,
    countHRAccepted,
    countHRRequests,
    countMechAccepted,
    countMechRequests,
    countChemAccepted,
    countChemRequests,
    countWorkAccepted,
    countWorkRequests,
    countSecAccepted,
    countSecRequests,
    countCleanAccepted,
    countCleanRequests
  });
  console.log('lists');
  // console.log(countHRRequests, countMechRequests, countChemRequests, countWorkRequests, countSecRequests, countCleanRequests, countHRAccepted, countMechAccepted, countChemAccepted, countWorkAccepted, countSecAccepted, countCleanAccepted);
});

app.listen(port, () => {
  console.log(`HecoServer Listening ${port}`)
});

