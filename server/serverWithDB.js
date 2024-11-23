import express, { query } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import sqlite3 from "sqlite3";
import multer from "multer";

sqlite3.verbose();
const factory = new sqlite3.Database('./db/Factory.db');

const app = express();
const port = 8080;
const wsPort = 8081;
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
  return await new Promise(async (resolve)=>{
    database.run(createActivityTableQuery,(err)=>{
      if(err)resolve(503);
      else resolve(200);
    });
  });
};
const createInventoryTable = async (database)=>{
  const createInventoryQuery = `CREATE TABLE IF NOT EXISTS Inventory(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    department TEXT,
    state TEXT NOT NULL,
    place TEXT,
    existance TEXT,
    last TEXT NOT NULL
  )`;
  return await new Promise((resolve)=>{
    database.run(createInventoryQuery,(err)=>{
      if(err)resolve(503);
      else resolve(200);
    })
  })
}



const getUser = async (database,user) =>{
  let getQuery = `SELECT * FROM Users `;
  let queryItems = [];
  let values = [];
  for(let key in user)
    if(user.hasOwnProperty(key))
      if(['id','userName','firstName','lastName','department','role','existance'].includes(key)){
        queryItems.push(`${key} = ? `);
        values.push(user[key]);
      }
    

    getQuery += ` ${user?'WHERE ':''} ` + queryItems.join(' AND ');
  // const getUserQuery = `SELECT * FROM Users ${user.userName || user.department?`WHERE(
  //   ${user.userName?`userName = '${user.userName}'`:` `}
  //   ${user.userName && user.department ?` AND `:``}
  //   ${user.department?`department = '${user.department}'`:``}
  //   )`:``}`;
  //console.log(getQuery, '<- getQuery');
  //console.log(queryItems, '<- queryItems');
  //console.log(values, '<- values');
  return new Promise((resolve)=>{
    database.all(getQuery,values,(err,rows)=>{
      if(err){
        //console.log(err);
        resolve(503);
      }
      else resolve(rows);
    });
  });
};
const getUserById = async (database,id) =>{
  const getUserQuery = `SELECT * FROM Users WHERE id = ${id}`;
  return new Promise((resolve)=>{
    database.all(getUserQuery,(err,rows)=>{
      //console.log(err);
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
const updateUser = async (database,user)=>{
  //console.log(user);
  const tempUser = await getUserById(database,user.id);
  //console.log(tempUser);
  let updateQuery = `UPDATE Users Set `;
  let queryItems = [];
  let values = [];
  for(let key in user)
    if(user.hasOwnProperty(key))
      if(['userName','password','firstName','lastName','department','role','existance'].includes(key)){
        queryItems.push(`${key} = ?`)
        values.push(user[key]);
      }
  values.push(user.id);
  updateQuery += queryItems.join(', ') + ` WHERE id = ?`;
  // const updateQuery = `UPDATE Users SET(
  //     userName = '${user.userName}',
  //     password = '${user.password}',
  //     firstName = '${user.firstName}',
  //     lastName = '${user.lastName}',
  //     department = '${user.department}',
  //     role = '${user.role}',
  //     time = '${user.time}',
  //     existance = '${user.existance}')
  //     WHERE (id = ${user.id})`;

  //console.log(updateQuery,' <- inside updateUser');
  //console.log(queryItems,' <- queryItems');
  //console.log(values,' <- values');
  return new Promise(async (resolve)=>{
    if(await doesUserExist(database,tempUser) == 204)resolve(204);
    else {
      database.run(updateQuery,values,(err)=>{
        //console.log(err);
        if(err)resolve(503);
        else resolve(200);
      })
    }
  })
}
const deleteUser = (database, user)=>{
  const deleteQuery = `DELETE FROM Users WHERE userName='${user.userName}'`;
  // //console.log(deleteQuery);
  // //console.log(user);
  return new Promise(async (resolve)=>{
    if(await doesUserExist(database,user) != 200)resolve(204);
    else{
      database.run(deleteQuery,(err)=>{
        if(err)resolve(503);
        else resolve(200);
      })
    }
  })
}
const readTasks = (database,reciever_role,reciever,accepted)=>{
  if(reciever_role == 'all')reciever_role = undefined;
  const getAllQuery = `SELECT * FROM Tasks ${reciever_role || reciever || accepted ? `WHERE(
      ${reciever_role ? `reciever_role = '${reciever_role}'`:' '}
      ${reciever_role && reciever?` AND `:''}
      ${reciever ? `reciever = '${reciever}'`:' '}
      ${reciever_role && reciever || reciever_role && accepted || reciever && accepted?` AND `:''}
      ${accepted ? `accepted = '${accepted}'`:' '}
    )`:''}`;
    // //console.log(getAllQuery)
  return new Promise((resolve)=>{
    database.all(getAllQuery,(err,rows)=>{
      // //console.log(err);
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



const getItems = async (database,query)=>{
  let getItemsQuery = `SELECT * FROM Inventory`;
  let queryItems = [];
  let values = [];

  for(let key in query){
    if(query.hasOwnProperty(key)){
      if(['name','department','state','place','existance','last'].includes(key)){
        queryItems.push(`${key} = ?`);
        values.push(query[key]);
      }
    }
  }
  if(queryItems.length > 0)
    getItemsQuery += ` WHERE ` + queryItems.join(' AND ');
  return await new Promise((resolve)=>{
    database.all(getItemsQuery,values,(err,rows)=>{
      if(err){
        resolve(503);
      }
      else resolve(rows);
    })
  })
}
const createItem = async (database,item)=>{
  const createItemQuery = `INSERT INTO Inventory(name,department,state,place,existance,last) VALUES('${item.name}','${item.department}','${item.state}','${JSON.stringify(item.place)}','${item.existance}','${item.last}')`;
  return await new Promise((resolve)=>{
    database.run(createItemQuery,(err)=>{
      if(err)resolve(503);
      else resolve(200);
    })
  })
}
const updateItem = async (database,item)=>{
  let updateItemQuery = `UPDATE Inventory SET `;
  let queryItems = [];
  let values = [];

  for(let key in item){
    if(item.hasOwnProperty(key)){
      if(['name','department','state','place','existance','last'].includes(key)){
        queryItems.push(`${key} = ?`);
        values.push(item[key]);
      }
    }
  }
  updateItemQuery += queryItems.join(',') + ` WHERE id = ${item.id}`;
  return await new Promise((resolve)=>{
    database.run(updateItemQuery,values,(err)=>{
      if(err)resolve(503);
      else resolve(200);
    })
  })
}
const deleteItem = async (database,item)=>{
  const deleteItemQuery = `DELETE FROM Inventory WHERE id = ?`;
  return await new Promise((resolve)=>{
    database.run(deleteItemQuery,item.id,(err)=>{
      if(err)resolve(503);
      else resolve(200);
    })
  })
}



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
const item = {
  name:'testComputer',
  department:'HResources', // whos it is
  state:'Working', // if broken, working , in reparation
  place:[1,1], // where its supposed to be
  existance:'yes', // if its there
  last:'admin3' // who last used it
}


//console.log(await createUsersTable(factory) + ' -> usersTabel');
//console.log(await createTaskTable(factory) + ' -> tasksTable');
//console.log(await createInventoryTable(factory) + ' -> inventoryTable');



// // TEST DATA 
// //console.log(await createUser(factory,user) + ' -> createUser');
// //console.log(await createTask(factory,task) + ' -> createTask');
// //console.log(await createItem(factory,item) + ' -> createItem');


// CREATE
app.put('/inventory',async (req,res)=>{
  //console.log(req.body,' <- create endpoint inventory');
  const status = await createItem(factory,req.body.item);
  res.sendStatus(status);
})
// READ
app.get('/inventory', async (req,res)=>{
  //console.log(req.query,' <- read endpoint inventory');
  const items = await getItems(factory,req.query);
  if(items != 204) res.status(200).send(items);
  else res.sendStatus(204);
})
// UPDATE
app.post('/inventory',async (req,res)=>{
  //console.log(req.body,' <- update endpoint inventory');
  const status = await updateItem(factory,req.body.item);
  res.sendStatus(status);
})
// DELETE
app.delete('/inventory', async (req,res)=>{
  //console.log(req.query,' <- delete endpoint inventory');
  const status = await deleteItem(factory,req.query.item);
  res.sendStatus(status);
})



// CREATE
app.put('/requests', async (req,res)=>{
  //console.log(req.body,' <- create endpoint requests')
  const status = await createTask(factory,req.body);
  res.sendStatus(status);
});
// READ
app.get('/requests',async (req,res)=>{
  //console.log(req.query,' <- read endpoint requests')
  const requests = await readTasks(factory,req.query.reciever_role,req.query.reciever,req.query.accepted);
  res.send(requests);
});
// UPDATE
app.post('/requests', async (req,res)=>{
  //console.log(req.body,' <- update endpoint requests')
  const status = await updateTask(factory,req.body.reciever,req.body.id,req.body.accepted);
  res.sendStatus(status);
});
// DELETE
app.delete('/requests',async (req,res)=>{
  //console.log(req.query,' <- delete endpoint requests')
  const status = await deleteTask(factory,req.query.id);
  res.sendStatus(status);
});




// CREATE
app.put('/user',async (req,res)=>{
  //console.log(req.body,' <- create endpoint users');
  const status = await createUser(factory,req.body.user);
  res.sendStatus(status);
});
// READ
app.get('/user',async (req,res)=>{
  //console.log(req.query,' <- read endpoint users');
  const user = await getUser(factory,req.query.user);
  if(user == undefined) res.status(204).send({});
  else if(user.length>1)
    res.status(200).send(user);
  else 
    res.status(200).send(user[0]);
});
// UPDATE /// maybe not wokring, to be tested
app.post('/user', async (req,res)=>{
  //console.log(req.body,' <- update endpoint users');
  const status = await updateUser(factory,req.body.user);
  res.sendStatus(status);
});
// DELETE
app.delete('/user', async (req,res)=>{
  //console.log(req.query,' <- delete endpoint users');
  const status = await deleteUser(factory,req.query.user);
  res.sendStatus(status);
})



/// TO BE TESTED

const createChatTable = async (database,sender,reciever)=>{
const createChatTableSender = `CREATE TABLE IF NOT EXISTS _chat_${sender}(
  id INTEGER PRIMARY KEY,
  sender TEXT NOT NULL,
  reciever TEXT NOT NULL,
  message TEXT NOT NULL,
  seen TEXT,
  time INTEGER
  )`;
const createChatTableReciever = `CREATE TABLE IF NOT EXISTS _chat_${reciever}(
  id INTEGER PRIMARY KEY,
  sender TEXT NOT NULL,
  reciever TEXT NOT NULL,
  message TEXT NOT NULL,
  seen TEXT,
  time INTEGER
  )`;
  const statusSender =  await new Promise((resolve)=>{
    database.run(createChatTableSender,(err)=>{
      if(err){
        //console.log(err);
        resolve(503);
      }
      else resolve(200);
    })
  });
  const statusReciever = await new Promise((resolve)=>{
    database.run(createChatTableReciever,(err)=>{
      if(err){
        //console.log(err);
        resolve(503);
      }
      else resolve(200);
    })
  });
  return [statusReciever,statusSender];
}
const getChatMessages = async (database,sender,reciever,amount,type)=>{
  const getSenderMessages = `SELECT * FROM _chat_${sender} WHERE ${type==='sender'?'sender':'reciever'} = ? ${amount!==undefined?` ORDER BY id DESC LIMIT ${amount}`:''}`;
  const getRecieverMessages = `SELECT * FROM _chat_${reciever} WHERE ${type==='sender'?'sender':'reciever'} = ? ${amount!==undefined?` ORDER BY id DESC LIMIT ${amount}`:''}`;
  let senderMessages = [];
  let recieverMessages = [];

  console.log(getSenderMessages,` ${sender} `,' sendermsg');
  console.log(getSenderMessages,` ${reciever} `,' recievermsg');

  if(type === 'sender' || type === 'all'){
  senderMessages = await new Promise((resolve)=>{
    database.all(getSenderMessages,reciever,(err,rows)=>{
      if(err){
        console.log(err);
        resolve(503);
      }
      else resolve(rows); 
    });
  });}
  if(type === 'reciever' || type === 'all'){
    recieverMessages = await new Promise((resolve)=>{
      database.all(getRecieverMessages,sender,(err,rows)=>{
        if(err){
          console.log(err);
          resolve(503);
        }
        else resolve(rows); 
      });
    });
  }
  const totalMessages = [...senderMessages,...recieverMessages];
  totalMessages.sort((a,b)=>{
    return a.time-b.time;
  })

  return totalMessages.slice(-amount);
};

const createMessage = async (database,item)=>{
  let createMessageSender = `INSERT INTO _chat_${item.sender}(sender,reciever,message,seen,time) VALUES(?,?,?,'YES',?) `;
  let createMessageReciever = `INSERT INTO _chat_${item.reciever}(sender,reciever,message,seen,time) VALUES(?,?,?,'NO',?) `;

  const queryItems = [item.sender,item.reciever,item.message,item.time];
  const statusSender = await new Promise((resolve)=>{
    database.run(createMessageSender,queryItems,(err)=>{
      if(err){
        //console.log(err);
        resolve(503);
      }
      else resolve(200);
    });
  });
  const statusReciever = await new Promise((resolve)=>{
    database.run(createMessageReciever,queryItems,(err)=>{
      if(err){
        //console.log(err);
        resolve(503);
      }
      else resolve(200);
    });
  });
  return [statusSender,statusReciever];
}
const updateSeenMessage = async (database,item)=>{
  let updateQuery = `UPDATE _chat_${item.reciever} SET seen='YES' where sender=?`;
  return await new Promise((resolve)=>{
    database.run(updateQuery,item.sender,(err)=>{
      if(err){
        console.log(err);
        resolve(503);
      }
      else resolve(200);
    });
  });
}

// READ
app.get(`/chat`,async (req,res)=>{
  //console.log(req.query, ' <- read endpoint chat');
  const statuses = await createChatTable(factory,req.query.sender,req.query.reciever);
  if(statuses.includes(503))res.sendStatus(503);
  else{
    const messages = await getChatMessages(factory,req.query.sender,req.query.reciever,req.query.amount,req.query.type);
    res.status(200).send(messages);
  }
});
// CREATE
app.put(`/chat`,async (req,res)=>{
  //console.log(req.body,' <- create endpoint chat');
  const statuses = await createMessage(factory,req.body.item);
  if(statuses.includes(503))res.sendStatus(503);
  else res.sendStatus(200);
});

// UPDATE
app.post('/chat',async (req,res)=>{
  //console.log(req.body,' <- update endpoint chat');
  const status = await updateSeenMessage(factory,req.body.item);
  res.sendStatus(status);
})



const server = app.listen(port, () => {
  //console.log(`HecoServer Listening ${port}`);
});




/// Maybe make it work at some point
/// It just skips to close, no db, also async ad await for db dont do nothing
/// The //console.logs dont even work, not entering the function
// const handleShutDown = async ()=>{
//   //console.log(' recieved shutdown signal ');
//   //console.log(' logging everyone out ');

//   const delogQuery = `UPDATE Users SET existance = 'OUT'`;
//   factory.run(delogQuery,(err)=>{
//     if(err)resolve(err);
//     else resolve(200);
//   })
//   server.close(() => {
//     //console.log(' finished closing in time ');
//     process.exit(0);
//   });

//   setTimeout(() => {
//     console.error(' something happened along, force shutdown ');
//     process.exit(1);
//   }, 10000);
// }

// process.on('SIGTERM',handleShutDown);
// process.on('SIGINT',handleShutDown);
