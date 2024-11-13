import express, { query } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from 'fs';

import sqlite3 from "sqlite3";
import multer from "multer";

sqlite3.verbose();
const factory = new sqlite3.Database('./db/Factory.db');

const app = express();
const port = 8080;
// const upload = multer({dest: 'profilePics/'});

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json({ limit: '10mb', extended: true }));

const createUsersTable = async (database) => {
  const createUsersQuery = `CREATE TABLE IF NOT EXISTS Users(
    id INTEGER PRIMARY KEY,
    userName TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    role TEXT NOT NULL,
    department TEXT NOT NULL,
    time INTEGER NOT NULL,
    existance TEXT NOT NULL
  )`;
  return new Promise((resolve)=>{
    database.run(createUsersQuery,(err)=>{
      if(err)resolve(503);
      else resolve(200); 
    })
  });
};
const createUserActivityTable = async (database,user)=>{ /// not needed anymore
  const tempUser = await getUser(database,user);
  const createUserActivityTableQuery = `CREATE TABLE IF NOT EXISTS _${tempUser.userName}_${tempUser.id}_(
    id INTEGER PRIMARY KEY,
    globalId INTEGER NOT NULL,
    reciever TEXT NOT NULL,
    sender TEXT NOT NULL,
    sender_role TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    urgency TEXT NOT NULL,
    dateRequested INTEGER NOT NULL,
    dateAccepted INTEGER,
    dateFinished INTEGER 
  )`;
  return new Promise(async (resolve)=>{
    database.run(createUserActivityTableQuery,(err)=>{
      if(err)resolve(503);
      else resolve(200);
    });
  });
};
const createTaskTable = async (database)=>{
  const createActivityTableQuery = `CREATE TABLE IF NOT EXISTS Tasks(
    id INTEGER PRIMARY KEY,
    reciever TEXT,
    reciever_role TEXT NOT NULL,
    sender TEXT NOT NULL,
    sender_role TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    urgency TEXT NOT NULL,
    dateRequested INTEGER NOT NULL,
    dateAccepted INTEGER,
    dateFinished INTEGER,
    accepted TEXT NOT NULL
  )`;
  return new Promise(async (resolve)=>{
    database.run(createActivityTableQuery,(err)=>{
      if(err)resolve(503);
      else resolve(200);
    });
  });
};

const getUser = async (database,user) =>{
  const getUserQuery = `SELECT * FROM Users ${user.userName || user.department?`WHERE(
    ${user.userName?`userName = '${user.userName}'`:` `}
    ${user.userName && user.department ?` AND `:``}
    ${user.department?`department = '${user.department}'`:``}
    )`:``}`;
    console.log(getUserQuery);
  return new Promise((resolve)=>{
    database.all(getUserQuery,(err,rows)=>{
      if(err)resolve(503);
      else resolve(rows);
    });
  });
};
const getUserById = async (database,id) =>{
  const getUserQuery = `SELECT * FROM Users WHERE id = ${id}}`;
  return new Promise((resolve)=>{
    database.all(getUserQuery,(err,rows)=>{
      if(err)resolve(503);
      else resolve(rows[0]);
    });
  });
};
const doesUserExist = async (database,user)=>{
  const userExistQuery = `SELECT * FROM Users WHERE(userName = '${user.userName}')`;
  return new Promise((resolve)=>{
    database.all(userExistQuery,(err,rows)=>{
      if(err)resolve(503);
      else if (rows.length > 0)resolve(200);
      else resolve(204);
    });
  });
};

// try to make images be able to be uploaded
const createUser = async (database,user) => {
  const insertUserQuery = `INSERT INTO Users(userName,password,firstName,lastName,department,role,time,existance) VALUES('${user.userName}','${user.password}','${user.firstName}','${user.lastName}','${user.department}','${user.role}',${new Date().getTime()},'OUT')`;
  return new Promise(async (resolve)=>{
    if(await doesUserExist(database,user) == 200)resolve(208);
    else {
      database.run(insertUserQuery,(err)=>{
        if(err)resolve(503);
        else resolve(200); 
      });
    };
  });
};
const updateUser = async (database,user,userId)=>{
  const tempUser = await getUserById(database,userId)
  const updateQuery = `UPDATE Users SET(
      userName = '${user.userName}',
      password = '${user.password}',
      firstName = '${user.firstName}',
      lastName = '${user.lastName}',
      department = '${user.department}',
      role = '${user.role}',
      time = '${user.time}',
      existance = '${user.existance}')
      WHERE (id = ${user.id})`;
  return new Promise(async (resolve)=>{
    if(await doesUserExist(database,tempUser) == 204)resolve(204);
    else {
      database.run(updateQuery,(err)=>{
        if(err)resolve(503);
        else resolve(200);
      })
    }
  })
}


/*
id INTEGER PRIMARY KEY,
reciever TEXT,
reciever_role TEXT NOT NULL,
sender TEXT NOT NULL,
sender_role TEXT NOT NULL,
subject TEXT NOT NULL,
message TEXT NOT NULL,
urgency TEXT NOT NULL,
dateRequested INTEGER NOT NULL,
dateAccepted INTEGER,
dateFinished INTEGER,
accepted TEXT NOT NULL
*/

const readTasks = (database,reciever_role,reciever,accepted)=>{
  if(reciever_role == 'all')reciever_role = undefined;
  const getAllQuery = `SELECT * FROM Tasks ${reciever_role || reciever || accepted ? `WHERE(
      ${reciever_role ? `reciever_role = '${reciever_role}'`:' '}
      ${reciever_role && reciever?` AND `:''}
      ${reciever ? `reciever = '${reciever}'`:' '}
      ${reciever_role && reciever || reciever_role && accepted || reciever && accepted?` AND `:''}
      ${accepted ? `accepted = '${accepted}'`:' '}
    )`:''}`;
    // console.log(getAllQuery)
  return new Promise((resolve)=>{
    database.all(getAllQuery,(err,rows)=>{
      // console.log(err);
      if(err)resolve(503);
      else resolve(rows);
    })
  });
};
const createTask = (database,task)=>{
  const insertQuery = `INSERT INTO Tasks(reciever_role,sender,sender_role,subject,message,urgency,dateRequested,dateAccepted,dateFinished,accepted) 
  VALUES('${task.reciever_role}','${task.sender}','${task.sender_role}','${task.subject}','${task.message}','${task.urgency}','${new Date().getTime()}','${0}','${0}','NO')`;
  return new Promise((resolve)=>{
    database.run(insertQuery,(err)=>{
      if(err)resolve(503);
      else resolve(200);
    });
  });
};
const deleteTask = (database,id)=>{
  const deleteQuery = `DELETE FROM Tasks WHERE(id = ${id})`;
  return new Promise((resolve)=>{
    database.run(deleteQuery,(err)=>{
      if(err)resolve(503);
      else resolve(200);
    })
  });
};
const updateTask = (database,reciever,id,accepted)=>{
  const updateQuery = `UPDATE Tasks SET ${accepted=='YES'?`accepted = 'YES',dateAccepted = ${new Date().getTime()}`:`${accepted=='DONE'?`accepted = 'DONE' , dateFinished = ${new Date().getTime()}`:`accepted = 'NO' , dateAccepted = '0' , dateFinished = '0'`}`} ${reciever?`, reciever = '${reciever}'`:``} WHERE (id = ${id})`;
  return new Promise((resolve)=>{
    database.run(updateQuery,(err)=>{
      if(err)resolve(503);
      else resolve(200);
    })
  });
};

const user = {
  userName:'admin3',
  profilePic:null,
  password:'adminpass3',
  firstName:'admin3FirstName',
  lastName:'admin3LastName',
  department:'all',
  role:'admin'
};
const task = {
  globalId: 3,
  reciever: 'unknown',
  reciever_role: 'hr',
  sender: `${user.userName}`,
  sender_role: `${user.role}`,
  subject: 'subjTest',
  message: 'messageTest',
  urgency: 'TOP',
  dateRequested: `${new Date().getTime()}`,
  dateAccepted: '0',
  dateFinished: '0',
  accepted: 'NO'
};



console.log(await createUsersTable(factory));
console.log(await createTaskTable(factory));

console.log(await createUser(factory,user));
console.log(await createTask(factory,task));

// console.log('=====');
// console.log(await createUserActivityTable(factory,user));
// console.log(await createUserActivityEntry(factory,user,task));
// console.log('=====');
// console.log(await getAllUsers(factory));


//not working yet



//working



// CREATE
app.put('/requests', async (req,res)=>{
    const status = await createTask(factory,req.body);
    res.sendStatus(status);
});
// READ
app.get('/requests',async (req,res)=>{
  console.log(req.body);
  const requests = await readTasks(factory,req.query.reciever_role,req.query.reciever,req.query.accepted);
  res.send(requests);
});
// UPDATE
app.post('/requests', async (req,res)=>{
  const status = await updateTask(factory,req.body.reciever,req.body.id,req.body.accepted);
  res.sendStatus(status);
});
// DELETE
app.delete('/requests',async (req,res)=>{
  const status = await deleteTask(factory,req.query.id);
  res.sendStatus(status);
});




// CREATE
app.put('/user',async (req,res)=>{
  const status = await createUser(factory,req.body.user);
  res.sendStatus(status);
});
// READ
app.get('/user',async (req,res)=>{
  const user = await getUser(factory,req.query);
  if(user == undefined) res.status(204).send({});
  else if(user.length>1)
    res.status(200).send(user);
  else 
    res.status(200).send(user[0]);
});
// UPDATE /// maybe not wokring, to be tested
app.post('/user', async (req,res)=>{
  const status = await updateUser(factory,req.body);
  res.sendStatus(status);
});




app.listen(port, () => {
  console.log(`HecoServer Listening ${port}`);
});