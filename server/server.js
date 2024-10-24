const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());

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

app.post('/login',(req,res)=>{
  if(req.body.user.name == 'admin') res.send({allowed: true});
  else res.send({allowed: false});
});

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
  res.send("");
});
app.post('/requestRemove',(req,res)=>{
  console.log(requests);
  requests.splice(req.body.index,1);
  console.log(requests);
  console.log(req.body);
  switch(req.body.reciever){
    case 'HResources':countHRRequests-=1;break;
    case 'Mechanics':countMechRequests-=1;break;
    case 'Chemists':countChemRequests-=1;break;
    case 'Workers':countWorkRequests-=1;break;
    case 'Security':countSecRequests-=1;break;
    case 'Cleaning':countCleanRequests-=1;break;
  };

  console.log(countHRRequests, countMechRequests, countChemRequests, countWorkRequests, countSecRequests, countCleanRequests, countHRAccepted, countMechAccepted, countChemAccepted, countWorkAccepted, countSecAccepted, countCleanAccepted);

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
  res.send("");
});
app.post('/acceptedRemove',(req,res)=>{
  // accepted.splice();
  // requests.splice(req.body.index,1);
  // switch(req.body.reciever){
  //   case 'HResources':countHRAccepted++;break;
  //   case 'Mechanics':countMechAccepted++;break;
  //   case 'Chemists':countChemAccepted++;break;
  //   case 'Workers':countWorkAccepted++;break;
  //   case 'Security':countSecAccepted++;break;
  //   case 'Cleaning':countCleanAccepted++;break;
  // };
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
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
