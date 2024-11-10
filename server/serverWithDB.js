import express, { query } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import sqlite3 from "sqlite3";

sqlite3.verbose();
const factory = new sqlite3.Database('./db/Factory.db');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());

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
const getAllUsers = async (database) => {
  const getAllUsersQuery = `SELECT * FROM Users`;
  return new Promise((resolve)=>{
    database.all(getAllUsersQuery,(err,rows)=>{
      if(err)resolve(503);
      else resolve(rows);
    });
  });
};
const getUser = async (database,user) =>{
  const getUserQuery = `SELECT * FROM Users WHERE userName = '${user.userName}'`;
  return new Promise((resolve)=>{
    database.all(getUserQuery,(err,rows)=>{
      if(err)resolve(503);
      else resolve(rows[0]);
    });
  });
};
const createUserEntry = async (database,user) => {
  const timeHours = new Date().getHours()*3600;
  const timeMinutes = new Date().getMinutes()*60;
  const timeSeconds = new Date().getSeconds();
  const time = timeHours+timeMinutes+timeSeconds;

  const insertUserQuery = `INSERT INTO Users(userName,password,firstName,lastName,department,role,time,existance) VALUES('${user.userName}','${user.password}','${user.firstName}','${user.lastName}','${user.department}','${user.role}',${time},'OUT')`;
  return new Promise(async (resolve)=>{
    if(await doesUserExist(factory,user) == 200)resolve(208);
    else {
      database.run(insertUserQuery,(err)=>{
        if(err)resolve(503);
        else resolve(200); 
      });
    };
  });
};

const createUserActivityTable = async (database,user)=>{
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
const createActivityTable = async (database)=>{
  const createActivityTableQuery = `CREATE TABLE IF NOT EXISTS Activity(
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
const createActivityEntry = async (database,task)=>{
  const createActivityEntryQuery = `INSERT INTO Activity(reciever_role,sender,sender_role,subject,message,urgency,dateRequested,dateAccepted,dateFinished,accepted) 
                                    VALUES('${task.reciever_role}','${task.sender}','${task.sender_role}','${task.subject}','${task.message}','${task.urgency}','${task.dateRequested}','${task.dateAccepted}','${task.dateFinished}','NO')`;
  return new Promise((resolve)=>{
    database.run(createActivityEntryQuery,(err)=>{
      if(err)resolve(503);
      else resolve(200);
    })
  });
};
const createUserActivityEntry = async (database,user,task)=>{
  const tempUser = await getUser(database,user);
  const createActivityEntryQuery = `INSERT INTO _${tempUser.userName}_${tempUser.id}_ (globalId,reciever_role,sender,sender_role,subject,message,urgency,dateRequested,dateAccepted,dateFinished,accepted) 
                                    VALUES(${task.globalId},'${task.reciever_role}','${task.sender}','${task.sender_role}','${task.subject}','${task.message}','${task.urgency}','${task.dateRequested}','${task.dateAccepted}','${task.dateFinished}','NO')`;
  return new Promise((resolve)=>{
    database.run(createActivityEntryQuery,(err)=>{
      if(err)resolve(503);
      else resolve(200);
    })
  });
};
const getAllActivity = (database,reciever_role,accepted)=>{
  const getAllQuery = `SELECT * FROM Activity ${reciever_role || accepted ? `WHERE(
    ${reciever_role?`reciever_role = '${reciever_role}'`:''} 
    ${reciever_role && accepted ? ' && ':''}
    ${accepted?`accepted = '${accepted}'`:''}
    )`:''}`;
  return new Promise((resolve)=>{
    database.all(getAllQuery,(err,rows)=>{
      if(err)resolve(503);
      else resolve(rows);
    })
  });
};
const deleteActivity = (database,id)=>{
  const deleteQuery = `DELETE FROM Activity WHERE(id = ${id})`;
  return new Promise((resolve)=>{
    database.run(deleteQuery,(err)=>{
      if(err)resolve(503);
      else resolve(200);
    })
  });
};
const setTask = (database,reciever,id,accepted)=>{
  const updateQuery = `UPDATE Activity SET ${accepted=='YES'?`accepted = 'YES',dateAccepted = ${new Date().getTime()}`:`${accepted=='DONE'?`accepted = 'DONE' , dateFinished = ${new Date().getTime()}`:`accepted = 'NO' , dateAccepted = '0' , dateFinished = '0'`}`} ${reciever?`, reciever = '${reciever}'`:``} WHERE (id = ${id})`;
  console.log(updateQuery);
  return new Promise((resolve)=>{
    database.run(updateQuery,(err)=>{
      if(err)resolve(503);
      else resolve(200);
    })
  });
};


const user = {
  userName:'admin3',
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
console.log(await createActivityTable(factory));

// console.log(await createUserEntry(factory,user));
// console.log('=====');
console.log(await createActivityEntry(factory,task));
// console.log('=====');
// console.log(await createUserActivityTable(factory,user));
// console.log(await createUserActivityEntry(factory,user,task));
// console.log('=====');
// console.log(await getAllUsers(factory));


//not working yet

// /// almost works as intended, just the data doesnt get inside the db but no error
// app.put('/requests',async (req,res)=>{          
  //   const insertQueryAll = `INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('${req.body.sender}','${req.body.reciever}','${req.body.urgency}','${req.body.subject}','${req.body.message}','no')`;
  //   const insertQuerySpecific = `INSERT INTO ${req.body.sender}${req.body.id}(task) VALUES('${JSON.stringify(req.body)}')`;
  //   await insertQuery(insertQueryAll);
  //   await insertQuery(insertQuerySpecific);
//   res.send('');
// });
//working


app.post('/requests', async (req,res)=>{
  const status = await setTask(factory,req.body.reciever,req.body.id,req.body.accepted);
  res.sendStatus(status);
});
app.delete('/requests',async (req,res)=>{
  const status = await deleteActivity(factory,req.query.id);
  res.sendStatus(status);
});
app.get('/requests',async (req,res)=>{
  const requests = await getAllActivity(factory,req.query.reciever_role,req.query.accepted);
  res.send(requests);
});
app.get('/user',async (req,res)=>{
  const user = await getUser(factory,req.query);
  if(user == undefined) res.status(204).send({});
  else res.status(200).send(user);
});



app.listen(port, () => {
  console.log(`HecoServer Listening ${port}`);
});

// const createUsersTable = `CREATE TABLE IF NOT EXISTS Users(
//   id INTEGER PRIMARY KEY,
//   userName TEXT,
//   firstName TEXT,
//   lastName TEXT,
//   password TEXT,
//   role TEXT,
//   time INTEGER,
//   existance TEXT
// )`;
// const createRequestsTable = `CREATE TABLE IF NOT EXISTS Requests(
//   id INTEGER PRIMARY KEY,
//   sender TEXT,
//   reciever TEXT,
//   urgency TEXT,
//   subject TEXT,
//   message TEXT,
//   accepted TEXT
// )`;

// var factoryBusy = false;


// await new Promise((resolve)=>{
//   resolve(factory.run(createUsersTable).run(createRequestsTable));
//   console.log('created tables');
// }).then(async ()=>{
//   const allUsers = await getUserFromDB();
//   // console.log(allUsers);
//   allUsers.map(async (item)=>{
//     const createUserActivity = `CREATE TABLE IF NOT EXISTS '${item.userName}${item.id}'(
//       id INTEGER PRIMARY KEY,
//       task TEXT
//     )`
//     // console.log(createUserActivity);
//     await new Promise((resolve)=>{
//       resolve(factory.run(createUserActivity));
//     });
//   })
// }).then(()=>{
  
//   const time = timeHours + timeMinutes + timeSeconds;
//   // get test users
//   // factory.exec(`INSERT INTO Users(firstName,lastName,userName,password,role,existance,time) VALUES("firstNameTestDb","lastNameTestDb","admin","adminpass","admin",'OUT',${time})`);
//   // factory.exec(`INSERT INTO Users(firstName,lastName,userName,password,role,existance,time) VALUES("firstNameTestDb2","lastNameTestDb2","hrTest2","hrpass2","hr",'OUT',${time})`);
//   // factory.exec(`INSERT INTO Users(firstName,lastName,userName,password,role,existance,time) VALUES("firstNameTestDb","lastNameTestDb","mechTest","mechpass","mech",'OUT',${time})`);
//   // factory.exec(`INSERT INTO Users(firstName,lastName,userName,password,role,existance,time) VALUES("firstNameTestDb","lastNameTestDb","admin2","adminpass2","admin",'OUT',${time})`);
//   // factory.exec(`INSERT INTO Users(firstName,lastName,userName,password,role,existance,time) VALUES("firstNameTestDb","lastNameTestDb","chemTest","chempass","chem",'OUT',${time})`);
//   // factory.exec(`INSERT INTO Users(firstName,lastName,userName,password,role,existance,time) VALUES("firstNameTestDb","lastNameTestDb","workTest","workpass","work",'OUT',${time})`);
//   // factory.exec(`INSERT INTO Users(firstName,lastName,userName,password,role,existance,time) VALUES("firstNameTestDb","lastNameTestDb","secTest","secpass","sec",'OUT',${time})`);
//   // factory.exec(`INSERT INTO Users(firstName,lastName,userName,password,role,existance,time) VALUES("firstNameTestDb","lastNameTestDb","cleanTest","cleanpass","clean",'OUT',${time})`);

//   // factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('mech','hr','HIGH','subj','','no')`);
//   // factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('hr','hr','HIGH','subj','','no')`);
//   // factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('sec','clean','HIGH','subj','','no')`);
//   // factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('work','clean','HIGH','subj','','no')`);
//   // factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('clean','hr','HIGH','subj','','no')`);
//   // factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('chem','mech','HIGH','subj','','no')`);
//   // factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('chem','chem','HIGH','subj','','no')`);

//   // factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('clean','hr','HIGH','subj','','yes')`);
//   // factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('chem','hr','LOW','subj','','yes')`);
//   // factory.exec(`INSERT INTO Requests(sender,reciever,urgency,subject,message,accepted) VALUES('chem','mech','MID','subj','','yes')`);
// return;
// });


// app.get('/usersTable',async (req,res)=>{
//   res.send(await getUserActivity(req.query));
// });


