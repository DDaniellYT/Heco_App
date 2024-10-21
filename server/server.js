const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());

var requests = [{subject:"testing"},{subject:"tss2"}];
var accepted = [{subject:"ttt1"},{subject:"dettt2"}];

app.post('/login',(req,res)=>{
  if(req.body.user.name == 'admin') res.send({allowed: true});
  else res.send({allowed: false})
});

app.post('/requestItem',(req,res)=>{
  requests.push(req.body);
  res.send("");
});
app.post('/requestArr',(req,res)=>{
  requests = req.body;
  res.send("");
});
app.get('/request',(req,res)=>{
  console.log("get request");
  res.send(requests)
});

app.post('/acceptedItem',(req,res)=>{
  console.log(req.body);
  accepted.push(req.body)
  res.send("");
});
app.post('/acceptedArr',(req,res)=>{
  accepted = req.body;
  res.send("");
});
app.get('/accepted',(req,res)=>{
  console.log('get accepted');
  res.send(accepted);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
